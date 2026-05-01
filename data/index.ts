import { ExecutionTraceEntry } from "@/types"

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
