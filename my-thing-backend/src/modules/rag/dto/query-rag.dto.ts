import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QueryRagDto {
  @IsString()
  @IsNotEmpty()
  question!: string;

  @IsString()
  @IsNotEmpty()
  workspaceId!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  documentIds?: string[];
}