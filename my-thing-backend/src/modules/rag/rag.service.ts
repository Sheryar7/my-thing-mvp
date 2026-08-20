import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { QueryRagDto } from './dto/query-rag.dto';
import { IngestDocDto } from './dto/ingest-doc.dto';
import { SupabaseProvider } from './providers/supabase.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { ChunkingService } from './services/chunking.service';

interface DocumentChunkRecord {
  document_id: string;
  workspace_id: string;
  content: string;
  embedding: number[];
  embedding_model?: string;
}

@Injectable()
export class RagService {
  private readonly logger = new Logger(RagService.name);

  constructor(
    private readonly supabaseProvider: SupabaseProvider,
    private readonly geminiProvider: GeminiProvider,
    private readonly chunkingService: ChunkingService,
  ) { }

  private extractEmbeddingVector(response: unknown): number[] | null {
    const embeddingResponse = response as {
      embedding?: { values?: unknown[] } | null;
      embeddings?: Array<{ values?: unknown[] } | null> | null;
    };

    const embedding = embeddingResponse.embedding ?? embeddingResponse.embeddings?.[0];
    const values = embedding?.values;

    if (!Array.isArray(values)) {
      return null;
    }

    const normalizedValues = values
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value));

    return normalizedValues.length > 0 ? normalizedValues : null;
  }

  private async embedTextWithFallback(
    text: string,
    context: string
  ): Promise<{ embeddingValues: number[]; model: string }> {
    const candidateModels = ['gemini-embedding-001', 'text-embedding-004', 'embedding-001'];

    for (const model of candidateModels) {
      try {
        const response = await this.geminiProvider.ai.models.embedContent({
          model,
          contents: text,
          config: {
            outputDimensionality: 768,
          },
        } as any);

        const embeddingValues = this.extractEmbeddingVector(response);

        if (embeddingValues && embeddingValues.length > 0) {
          this.logger.log(`Generated embedding with model ${model} for ${context}.`);
          return { embeddingValues, model };
        }

        this.logger.warn(`Embedding model ${model} returned no values for ${context}.`);
      } catch (error: any) {
        const message = error?.message || String(error);
        const isModelIssue = /not found|unsupported|404|invalid model|model .* not/i.test(message);

        if (isModelIssue) {
          this.logger.warn(`Embedding model ${model} failed for ${context}: ${message}`);
          continue;
        }

        this.logger.error(`Embedding request failed for ${context} with model ${model}: ${message}`, error?.stack);
        throw error;
      }
    }

    throw new Error(`Unable to generate embeddings for ${context} using supported models.`);
  }

  /**
   * Ingests a document: chunks text, generates embeddings, and saves to Supabase (pgvector).
   */
  async handleIngest(ingestDto: IngestDocDto) {
    const { workspaceId, documentId, content } = ingestDto;
    this.logger.log(`Ingesting document ${documentId} in workspace: ${workspaceId}`);

    try {
      const chunks = await this.chunkingService.splitText(content);
      const recordsToInsert: DocumentChunkRecord[] = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunkText = chunks[i];
        const { embeddingValues, model } = await this.embedTextWithFallback(
          chunkText,
          `ingestion chunk ${i} for document ${documentId}`,
        );

        recordsToInsert.push({
          document_id: documentId,
          workspace_id: workspaceId,
          content: chunkText,
          embedding: embeddingValues,
          embedding_model: model,
        });
      }

      const { error } = await this.supabaseProvider.client
        .from('document_chunks')
        .insert(recordsToInsert);

      if (error) {
        this.logger.error(`Supabase insert error: ${error.message}`);
        throw new InternalServerErrorException('Failed to store document chunks');
      }

      this.logger.log(`Successfully ingested ${recordsToInsert.length} chunks into vector DB.`);

      return {
        success: true,
        message: `Successfully ingested ${recordsToInsert.length} chunks for document ${documentId}`,
        totalChunks: recordsToInsert.length,
      };
    } catch (err: any) {
      this.logger.error(`Error during ingestion: ${err.message}`, err.stack);
      throw new InternalServerErrorException(err.message || 'Ingestion failed');
    }
  }

  /**
   * Queries RAG system: embeds input question, retrieves matching chunks, and calls LLM.
   */
  async handleQuery(queryDto: QueryRagDto) {
    const { question, workspaceId, documentIds } = queryDto;
    this.logger.log(`Processing RAG query for workspace: ${workspaceId}`);

    try {
      const { embeddingValues } = await this.embedTextWithFallback(
        question,
        `query for workspace ${workspaceId}`,
      );

      const rpcPayload: Record<string, unknown> = {
        query_embedding: embeddingValues,
        match_threshold: 0.3,
        match_count: 5,
        filter_workspace_id: workspaceId,
      };

      if (documentIds && documentIds.length > 0) {
        rpcPayload.filter_document_ids = documentIds;
        this.logger.log(`Filtering RPC search to specific document IDs: ${documentIds.join(', ')}`);
      }

      const { data: matchedChunks, error: rpcError } = await this.supabaseProvider.client.rpc(
        'match_document_chunks',
        rpcPayload,
      );

      if (rpcError) {
        this.logger.error(`Supabase RPC vector match error: ${rpcError.message}`);
        throw new InternalServerErrorException('Error executing vector search');
      }

      const contextText = matchedChunks && matchedChunks.length > 0
        ? matchedChunks.map((c: any) => `[Document: ${c.document_id ?? 'unknown'}]\n${c.content}`).join('\n\n---\n\n')
        : 'No relevant context found.';

      const prompt = `You are a helpful AI Assistant. Answer the question strictly using the provided context below.

Context:
${contextText}

Question: ${question}`;

      const textModels = ['gemini-flash-latest', 'gemini-2.0-flash', 'gemini-1.5-flash'];
      let generateResponse: any = null;
      let usedModel = '';

      for (const model of textModels) {
        try {
          generateResponse = await this.geminiProvider.ai.models.generateContent({
            model,
            contents: prompt,
          });
          usedModel = model;
          break;
        } catch (err: any) {
          const message = err?.message || String(err);
          const isQuotaError = err?.status === 'RESOURCE_EXHAUSTED' || message.includes('429');

          if (isQuotaError) {
            this.logger.warn(`Model ${model} hit quota rate limits. Falling back to next candidate...`);
            continue;
          }
          throw err;
        }
      }

      if (!generateResponse) {
        throw new InternalServerErrorException('All candidate text models failed or hit quota limits.');
      }

      return {
        success: true,
        answer: generateResponse.text || 'No answer generated.',
        workspaceId,
        modelUsed: usedModel,
        documentsUsed: documentIds || [],
        chunksRetrieved: matchedChunks?.length || 0,
      };
    } catch (err: any) {
      this.logger.error(`Error during RAG query processing: ${err.message}`, err.stack);
      throw new InternalServerErrorException(err.message || 'RAG query failed');
    }
  }
}