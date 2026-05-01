export interface KnowledgeChunk {
  id?: string
  content: string
  similarity: number
  source: string
}

export interface ExecutionTraceEntry {
  timestamp: string
  message: string
  type: "info" | "success" | "warning" | "error"
}

export interface QueryResult {
  query: string
  answer: string
  chunks: KnowledgeChunk[]
  confidence: number
  topMatch: string
  grounded: boolean
  trace: ExecutionTraceEntry[]
}

export interface StatCard {
  label: string
  value: string | number
  unit?: string
}
