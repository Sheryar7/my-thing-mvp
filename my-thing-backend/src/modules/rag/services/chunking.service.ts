import { Injectable, Logger } from '@nestjs/common';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

@Injectable()
export class ChunkingService {
  private readonly logger = new Logger(ChunkingService.name);

  /**
   * Splits raw text into chunks using RecursiveCharacterTextSplitter.
   */
  async splitText(
    text: string,
    chunkSize: number = 1000,
    chunkOverlap: number = 200,
  ): Promise<string[]> {
    this.logger.log(`Splitting document content (Length: ${text.length} chars)`);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    });

    const chunks = await splitter.splitText(text);
    this.logger.log(`Generated ${chunks.length} chunks.`);

    return chunks;
  }
}