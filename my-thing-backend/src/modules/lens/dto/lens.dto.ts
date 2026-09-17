import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ValidateScriptDto {
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  scriptId: string;

  @IsOptional()
  @IsString()
  recordingId?: string;
}
