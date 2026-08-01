import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { supabase } from "@/lib/supabase";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: Request) {
    try {
        const { question, workspaceId } = await req.json();

        if (!question || !workspaceId) {
            return NextResponse.json(
                { error: "Missing required fields: question, workspaceId" },
                { status: 400 }
            );
        }

        // 1. Convert user's question into a query vector (768 dimensions)
        const embeddingResponse = await ai.models.embedContent({
            model: "gemini-embedding-001",
            contents: question,
            config: {
                outputDimensionality: 768,
            },
        });

        const queryVector =
            (embeddingResponse as any).embedding?.values ||
            (embeddingResponse as any).embeddings?.[0]?.values;

        if (!queryVector) {
            throw new Error("Failed to generate embedding vector for query.");
        }

        // 2. Call Supabase RPC function for similarity search
        const { data: matchedChunks, error: searchError } = await supabase.rpc(
            "match_document_chunks",
            {
                query_vector: queryVector,
                target_workspace_id: workspaceId,
                match_count: 4,
                match_threshold: 0.2, // Cosine similarity threshold
            }
        );

        if (searchError) throw new Error(`Vector search error: ${searchError.message}`);

        // Extract match context
        const contextText = matchedChunks && matchedChunks.length > 0
            ? matchedChunks.map((chunk: any) => chunk.content).join("\n\n---\n\n")
            : "No relevant document context found.";

        // 3. Construct prompt with grounded context
        const prompt = `
You are an AI assistant answering questions based on workspace context.

Context from documents:
${contextText}

User Question: ${question}

Instructions:
Answer the question concisely using ONLY the provided context. If the context does not contain enough information, state clearly that you don't have enough context.
`;

        // 4. Generate answer using Gemini
        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
        });

        return NextResponse.json({
            success: true,
            answer: response.text,
            matchedChunks: matchedChunks || [],
        });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}