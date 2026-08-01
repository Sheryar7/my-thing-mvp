import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { supabase } from "@/lib/supabase";
import { chunkText } from "@/lib/chunking";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: Request) {
    try {
        const { title, content, workspaceId } = await req.json();

        if (!title || !content || !workspaceId) {
            return NextResponse.json(
                { error: "Missing required fields: title, content, workspaceId" },
                { status: 400 }
            );
        }

        // 1. Save main document
        const { data: doc, error: docError } = await supabase
            .from("documents")
            .insert({
                title,
                raw_content: content,
                workspace_id: workspaceId,
            })
            .select()
            .single();

        if (docError) throw new Error(`Document save error: ${docError.message}`);

        // 2. Chunk text
        const chunks = await chunkText(content);

        // 3. Generate embeddings & format records
        const chunkRecords = await Promise.all(
            chunks.map(async (chunk) => {
                const response = await ai.models.embedContent({
                    model: "gemini-embedding-001",
                    contents: chunk,
                    config: {
                        outputDimensionality: 768, // Matches our Supabase VECTOR(768) schema
                    },
                });

                // Extract embedding values
                const embeddingValues =
                    (response as any).embedding?.values ||
                    (response as any).embeddings?.[0]?.values;

                return {
                    document_id: doc.id,
                    workspace_id: workspaceId,
                    content: chunk,
                    embedding: embeddingValues,
                    embedding_model: "gemini-embedding-001",
                };
            })
        );

        // 4. Batch insert chunks into Postgres (vector table)
        const { error: chunkError } = await supabase
            .from("document_chunks")
            .insert(chunkRecords);

        if (chunkError) throw new Error(`Chunk insert error: ${chunkError.message}`);

        return NextResponse.json({
            success: true,
            documentId: doc.id,
            chunksProcessed: chunks.length,
        });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}