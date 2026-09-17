import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSourceDto {
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsNotEmpty()
  @IsString()
  sourceType: 'web' | 'pdf' | 'youtube' | 'note' | 'text';

  @IsNotEmpty()
  @IsString()
  content: string;
}
