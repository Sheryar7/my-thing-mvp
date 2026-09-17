import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GenerateOutlineDto {
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  topic: string;
}

export class GenerateScriptDto {
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  outlineId: string;

  @IsOptional()
  @IsString()
  title?: string;
}

export class UpdateScriptDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  title?: string;
}
