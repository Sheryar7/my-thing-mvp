import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiProvider {
  public ai: GoogleGenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY') || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('Missing GEMINI_API_KEY environment variable.');
    }

    this.ai = new GoogleGenAI({ apiKey });
  }
}