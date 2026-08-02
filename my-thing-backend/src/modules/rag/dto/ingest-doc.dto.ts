import { IsNotEmpty, IsString } from 'class-validator';

export class IngestDocDto {
  @IsString()
  @IsNotEmpty()
  workspaceId!: string;

  @IsString()
  @IsNotEmpty()
  documentId!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}