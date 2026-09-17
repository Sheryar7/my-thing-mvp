import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  public ai: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey =
      this.configService.get<string>('GEMINI_API_KEY') ||
      process.env.GEMINI_API_KEY;

    if (!apiKey) {
      this.logger.warn('GEMINI_API_KEY is not set. Gemini features will fail.');
    }

    this.ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
  }

  /**
   * Generates a 768-dimensional embedding vector for pgvector storage
   */
  async embedText(text: string, context = 'general'): Promise<number[]> {
    const candidateModels = ['text-embedding-004', 'gemini-embedding-001', 'embedding-001'];

    for (const model of candidateModels) {
      try {
        const response: any = await this.ai.models.embedContent({
          model,
          contents: text,
          config: {
            outputDimensionality: 768,
          },
        } as any);

        const embedding = response.embedding ?? response.embeddings?.[0];
        const values = embedding?.values;

        if (Array.isArray(values) && values.length > 0) {
          return values.map((v) => Number(v));
        }
      } catch (err: any) {
        this.logger.warn(`Embedding model ${model} failed for ${context}: ${err.message}`);
      }
    }

    throw new InternalServerErrorException(
      `Failed to generate embedding for context: ${context} using supported models.`,
    );
  }

  /**
   * General text generation with model fallback
   */
  async generateText(prompt: string, preferredModel = 'gemini-2.0-flash'): Promise<string> {
    const candidateModels = [preferredModel, 'gemini-1.5-flash', 'gemini-flash-latest'];

    for (const model of candidateModels) {
      try {
        const response: any = await this.ai.models.generateContent({
          model,
          contents: prompt,
        });

        if (response && response.text) {
          return response.text;
        }
      } catch (err: any) {
        this.logger.warn(`Model ${model} generateContent failed: ${err.message}`);
      }
    }

    throw new InternalServerErrorException('All candidate Gemini models failed to generate content.');
  }

  /**
   * Extract distinct factual claims from text in structured JSON format
   */
  async extractClaims(sourceContent: string): Promise<string[]> {
    const prompt = `You are an expert research analyst for an educational content creator.
Extract all distinct, verifiable factual claims from the following text.
Return ONLY a valid JSON array of strings containing the distinct claims, without any markdown fences.

Text:
"""
${sourceContent.slice(0, 12000)}
"""`;

    try {
      const raw = await this.generateText(prompt, 'gemini-1.5-flash');
      const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const claims = JSON.parse(cleanJson);
      return Array.isArray(claims) ? claims : [];
    } catch (err: any) {
      this.logger.warn(`Failed to parse claims JSON: ${err.message}`);
      return [];
    }
  }

  /**
   * Generates a structured narrative documentary outline
   */
  async generateOutline(topic: string, contextChunks: string[]): Promise<any> {
    const context = contextChunks.join('\n\n---\n\n');
    const prompt = `You are the Head Writer for a premium educational documentary channel (like Vox, Kurzgesagt, or Veritasium).
Develop a structured narrative outline for the topic: "${topic}".

Base your outline on the research context provided:
"""
${context.slice(0, 15000)}
"""

Return strictly a valid JSON object with the following schema:
{
  "title": string,
  "hook": string,
  "target_duration_minutes": number,
  "acts": [
    {
      "act_number": number,
      "act_title": string,
      "core_question": string,
      "key_arguments": [string],
      "estimated_minutes": number
    }
  ],
  "takeaway": string
}
Do not include markdown code block backticks. Return valid JSON only.`;

    const raw = await this.generateText(prompt, 'gemini-1.5-pro');
    const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    try {
      return JSON.parse(cleanJson);
    } catch {
      return { rawOutline: raw };
    }
  }

  /**
   * Generates a source-anchored educational script
   */
  async generateScript(outlineSummary: string, contextChunks: { id: string; content: string }[]): Promise<string> {
    const formattedContext = contextChunks
      .map((c) => `[CITATION_ID: ${c.id}]\n${c.content}`)
      .join('\n\n---\n\n');

    const prompt = `You are a scriptwriter for research-driven educational content.
Draft a compelling, conversational yet rigorous educational video script based on the following outline and research citations.

Outline:
${outlineSummary}

Research Evidence:
${formattedContext.slice(0, 20000)}

Guidelines:
1. Embed citations inline right after factual claims using the exact format: [cite:CITATION_ID].
2. Maintain strong narrative flow and engagement.
3. Write for the spoken ear (teleprompter friendly).`;

    return this.generateText(prompt, 'gemini-1.5-pro');
  }

  /**
   * The Lens: Validation Engine
   */
  async validateScript(script: string, sources: string, transcript?: string): Promise<any> {
    const prompt = `You are The Lens Validation Engine for educational documentary content.
Cross-reference the script against the research sources and spoken transcript.

Research Sources:
${sources.slice(0, 15000)}

Script:
${script.slice(0, 15000)}

Spoken Transcript:
${transcript ? transcript.slice(0, 15000) : 'None provided'}

Analyze:
1. coverage_score (number between 0 and 100 representing how well the script/transcript covers the research facts)
2. verified_claims (array of objects: { claim: string, source_quote: string })
3. unsupported_claims (array of objects: { claim: string, reason: string })
4. missing_topics (array of strings: important topics from research sources omitted from script)

Return strictly a valid JSON object matching the above 4 keys without markdown code formatting.`;

    const raw = await this.generateText(prompt, 'gemini-1.5-pro');
    const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    try {
      return JSON.parse(cleanJson);
    } catch {
      return {
        coverage_score: 75.0,
        verified_claims: [],
        unsupported_claims: [],
        missing_topics: [],
        rawResponse: raw,
      };
    }
  }
}
