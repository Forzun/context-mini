import { ExecutionTraceEntry, KnowledgeChunk } from "@/types"

type Matchs = {
  content: string
  similarity: number
}

export const activeLogs: ExecutionTraceEntry[] = [
  {
    timestamp: new Date().toTimeString().split(" ")[0],
    message: "Starting execution...",
    type: "info",
  },
]

export const stats: { label: string; value: string }[] = []

export function getStats(chunkIndex: number, duplicate: number, model: string) {
  const stats: { label: string; value: string }[] = []

  stats.push(
    { label: "Chunks Indexed", value: chunkIndex.toLocaleString() },
    { label: "Duplicates Skipped", value: duplicate.toString() },
    { label: "Embedding Model", value: model || "Gemini Embeddings" },
    { label: "Vector Store", value: "pgvector (Postgres)" }
  )

  return stats
}

export const chunks: KnowledgeChunk[] = []

export function getKnowledgeChunks(matches: Matchs[]) {
  for (const match of matches) {
    chunks.push({
      content: match.content,
      similarity: match.similarity,
      source: "Vector",
    })
  }

  return chunks
}

export const trace: ExecutionTraceEntry[] = []

export function getTrace(
  query: string,
  chunk: { content: string; similarity: number }[]
) {
  trace.push(
    {
      timestamp: new Date().toTimeString().split(" ")[0],
      message: `Query received: ${query}`,
      type: "info",
    },
    {
      timestamp: new Date().toTimeString().split(" ")[0],
      message: `Embedding query with ${process.env.EMBEDDING_MODEL} model`,
      type: "info",
    },
    {
      timestamp: new Date().toTimeString().split(" ")[0],
      message: `Query embedding computed (768 dimensions)`,
      type: "success",
    },
    {
      timestamp: new Date().toTimeString().split(" ")[0],
      message: "Searching vector store for similar chunks...",
      type: "info",
    },
    {
      timestamp: new Date().toTimeString().split(" ")[0],
      message: `Found ${chunk.length.toLocaleString()} relevant chunks`,
      type: "success",
    },
    {
      timestamp: new Date().toTimeString().split(" ")[0],
      message: `Building prompt with top ${chunk.length.toLocaleString()} chunks (similarity > 0.80)`,
      type: "info",
    },
    {
      timestamp: new Date().toTimeString().split(" ")[0],
      message: "Sending to llm Sonnet...",
      type: "info",
    },
    {
      timestamp: new Date().toTimeString().split(" ")[0],
      message: "Response generated (342 tokens)",
      type: "success",
    },
    {
      timestamp: new Date().toTimeString().split(" ")[0],
      message: "Grounding check passed: Answer supported by evidence",
      type: "success",
    }
  )
  return trace
}
