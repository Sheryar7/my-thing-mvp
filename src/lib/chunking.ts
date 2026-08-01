import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

/**
 * Splits text into overlapping chunks optimal for semantic vector search.
 * Target chunk size: ~1000 characters (~200 words) with 200 char overlap.
 */
export async function chunkText(
  text: string,
  chunkSize: number = 1000,
  chunkOverlap: number = 200
): Promise<string[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
    separators: ["\n\n", "\n", ". ", " ", ""],
  });

  const docs = await splitter.createDocuments([text]);
  return docs.map((doc) => doc.pageContent);
}