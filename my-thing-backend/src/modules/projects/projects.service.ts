import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { resolveProjectId } from '../../common/id-resolver';

export interface ProjectResponse {
  id: string;
  name: string;
  category: string;
  description?: string;
  sourcesCount: number;
  membersCount: number;
  aiStatus: string;
  updatedAtLabel: string;
  status: string;
  stage: 'Archive' | 'Workshop' | 'Forge' | 'Lens';
  progress: number;
  collaborators: { id: string; name: string; avatarUrl: string }[];
}

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  async listProjects(): Promise<ProjectResponse[]> {
    const supabase = this.supabaseService.getClient();

    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      this.logger.error(`Error fetching projects: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve projects');
    }

    if (!projects || projects.length === 0) {
      return [];
    }

    // Fetch counts from sources and scripts for each project
    const enrichedProjects: ProjectResponse[] = await Promise.all(
      projects.map(async (p, idx) => {
        const { count: sourcesCount } = await supabase
          .from('sources')
          .select('*', { count: 'exact', head: true })
          .eq('project_id', p.id);

        const { data: latestScript } = await supabase
          .from('scripts')
          .select('id, title, updated_at')
          .eq('project_id', p.id)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        const { data: latestValidation } = await supabase
          .from('validation_reports')
          .select('id, coverage_score')
          .eq('project_id', p.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        let stage: 'Archive' | 'Workshop' | 'Forge' | 'Lens' = 'Archive';
        let progress = 25;
        let aiStatus = 'AI Processing...';

        if (latestValidation) {
          stage = 'Lens';
          progress = 95;
          aiStatus = 'Validation Ready ✓';
        } else if (latestScript) {
          stage = 'Workshop';
          progress = 70;
          aiStatus = 'Script Generated ✓';
        } else if (sourcesCount && sourcesCount > 0) {
          stage = 'Archive';
          progress = 40;
          aiStatus = 'Ready for Script Generation';
        }

        const mockAvatars = [
          [
            { id: '1', name: 'Prof. Thorne', avatarUrl: 'https://i.pravatar.cc/100?img=11' },
            { id: '2', name: 'Sara', avatarUrl: 'https://i.pravatar.cc/100?img=5' },
            { id: '3', name: 'Dr. Hawking', avatarUrl: 'https://i.pravatar.cc/100?img=9' },
          ],
          [
            { id: '1', name: 'Dr. Chen', avatarUrl: 'https://i.pravatar.cc/100?img=11' },
            { id: '2', name: 'Sara', avatarUrl: 'https://i.pravatar.cc/100?img=5' },
            { id: '3', name: 'Alex', avatarUrl: 'https://i.pravatar.cc/100?img=9' },
          ],
          [
            { id: '1', name: 'Marcus', avatarUrl: 'https://i.pravatar.cc/100?img=12' },
            { id: '2', name: 'Elena', avatarUrl: 'https://i.pravatar.cc/100?img=8' },
            { id: '3', name: 'John', avatarUrl: 'https://i.pravatar.cc/100?img=11' },
          ],
          [
            { id: '1', name: 'Dr. Doudna', avatarUrl: 'https://i.pravatar.cc/100?img=5' },
            { id: '2', name: 'Michael', avatarUrl: 'https://i.pravatar.cc/100?img=15' },
            { id: '3', name: 'Emma', avatarUrl: 'https://i.pravatar.cc/100?img=20' },
          ],
          [
            { id: '1', name: 'Andrew', avatarUrl: 'https://i.pravatar.cc/100?img=3' },
            { id: '2', name: 'Sara', avatarUrl: 'https://i.pravatar.cc/100?img=5' },
          ],
        ];

        return {
          id: p.id,
          name: p.title,
          category: p.description?.split('|')[0]?.trim() || 'General Research',
          description: p.description || '',
          sourcesCount: sourcesCount || 0,
          membersCount: 3 + (idx % 3),
          aiStatus,
          updatedAtLabel: 'Updated recently',
          status: (p.description?.includes('Completed') ? 'Completed' : 'Active'),
          stage,
          progress,
          collaborators: mockAvatars[idx % mockAvatars.length],
        };
      }),
    );

    return enrichedProjects;
  }

  async getProjectById(id: string): Promise<ProjectResponse> {
    const supabase = this.supabaseService.getClient();

    const resolvedId = resolveProjectId(id);
    const { data: p, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', resolvedId)
      .single();

    if (error || !p) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const { count: sourcesCount } = await supabase
      .from('sources')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', p.id);

    return {
      id: p.id,
      name: p.title,
      category: p.description?.split('|')[0]?.trim() || 'General Research',
      description: p.description || '',
      sourcesCount: sourcesCount || 0,
      membersCount: 4,
      aiStatus: 'Ready for Script Generation',
      updatedAtLabel: 'Updated recently',
      status: 'Active',
      stage: 'Archive',
      progress: 50,
      collaborators: [
        { id: '1', name: 'Lead Researcher', avatarUrl: 'https://i.pravatar.cc/100?img=11' },
        { id: '2', name: 'AI Writer', avatarUrl: 'https://i.pravatar.cc/100?img=5' },
      ],
    };
  }

  async createProject(dto: CreateProjectDto, userId: string = '00000000-0000-0000-0000-000000000000') {
    const supabase = this.supabaseService.getClient();

    const description = dto.category ? `${dto.category} | ${dto.description || ''}` : dto.description || '';

    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: userId,
        title: dto.title,
        description,
        target_duration_minutes: dto.targetDurationMinutes || 10,
      })
      .select()
      .single();

    if (error) {
      this.logger.error(`Error creating project: ${error.message}`);
      throw new InternalServerErrorException('Failed to create project');
    }

    return data;
  }
}
