import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UploadRecordingDto {
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsOptional()
  @IsString()
  scriptId?: string;

  @IsNotEmpty()
  @IsString()
  audioStoragePath: string;

  @IsOptional()
  @IsNumber()
  durationSeconds?: number;
}

export class TeleprompterProgressDto {
  @IsNotEmpty()
  @IsNumber()
  currentBlockIndex: number;

  @IsNotEmpty()
  @IsNumber()
  elapsedSeconds: number;
}
