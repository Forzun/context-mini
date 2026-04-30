import { QueryResult, ExecutionTraceEntry, KnowledgeChunk } from "@/types"

export const mockKnowledgeChunks: KnowledgeChunk[] = [
  {
    id: "1",
    content:
      "Redis is an open-source, in-memory data structure store that supports strings, hashes, lists, sets, and sorted sets. It is commonly used for caching, session storage, real-time analytics, and pub/sub messaging.",
    similarity: 0.94,
    source: "Redis Documentation",
  },
  {
    id: "2",
    content:
      "Redis uses a single-threaded event loop architecture for high performance. Data is stored in RAM for fast access, but can be persisted to disk using RDB or AOF formats to prevent data loss.",
    similarity: 0.87,
    source: "Redis Performance Guide",
  },
  {
    id: "3",
    content:
      "Redis supports atomic operations, transactions with MULTI/EXEC, and Lua scripting for complex operations. TTL (Time To Live) can be set on keys for automatic expiration.",
    similarity: 0.82,
    source: "Redis Advanced Features",
  },
]

export const mockExecutionTrace: ExecutionTraceEntry[] = [
  {
    timestamp: "14:32:01",
    message: 'Query received: "What is Redis used for?"',
    type: "info",
  },
  {
    timestamp: "14:32:01",
    message: "Embedding query with openai/text-embedding-3-small",
    type: "info",
  },
  {
    timestamp: "14:32:02",
    message: "Query embedding computed (768 dimensions)",
    type: "success",
  },
  {
    timestamp: "14:32:02",
    message: "Searching vector store for similar chunks...",
    type: "info",
  },
  {
    timestamp: "14:32:03",
    message: "Found 4 relevant chunks",
    type: "success",
  },
  {
    timestamp: "14:32:03",
    message: "Building prompt with top 3 chunks (similarity > 0.80)",
    type: "info",
  },
  {
    timestamp: "14:32:04",
    message: "Sending to Claude 3.5 Sonnet...",
    type: "info",
  },
  {
    timestamp: "14:32:06",
    message: "Response generated (342 tokens)",
    type: "success",
  },
  {
    timestamp: "14:32:06",
    message: "Grounding check passed: Answer supported by evidence",
    type: "success",
  },
]

export const mockQueryResult: QueryResult = {
  query: "What is Redis used for?",
  answer:
    "Redis is a versatile in-memory data store that serves multiple purposes. Primarily, it's used for caching frequently accessed data to reduce database load and improve application performance. It also excels as a session store for web applications, enabling fast user session management. Beyond caching and sessions, Redis powers real-time analytics, leaderboards, and counters. It's also widely used for pub/sub messaging, allowing applications to implement real-time notifications and message-driven architectures. The in-memory nature makes it lightning-fast, though data persistence can be configured for durability.",
  chunks: mockKnowledgeChunks,
  confidence: 0.94,
  topMatch: "Redis Documentation",
  grounded: true,
  trace: mockExecutionTrace,
}

export const leftPanelStats = [
  { label: "Chunks Indexed", value: "2,847", unit: "" },
  { label: "Duplicates Skipped", value: "312", unit: "" },
  { label: "Embedding Model", value: "text-embedding-3-small", unit: "" },
  { label: "Vector Store", value: "Pinecone", unit: "" },
]

export const activityLog: ExecutionTraceEntry[] = [
  {
    timestamp: "14:28:15",
    message: 'Ingested chunk: "Introduction to Vector Databases"',
    type: "success",
  },
  {
    timestamp: "14:29:42",
    message: "Computed embedding for 156 chunks",
    type: "success",
  },
  {
    timestamp: "14:30:08",
    message: "Duplicate detected in chunk_2847, skipped",
    type: "warning",
  },
  {
    timestamp: "14:31:21",
    message: "Vector store sync completed",
    type: "success",
  },
  { timestamp: "14:32:01", message: "Query received from user", type: "info" },
]

export const rightPanelStats = [
  { label: "Confidence Score", value: "94%", unit: "" },
  { label: "Top Similarity", value: "0.94", unit: "" },
  { label: "Grounding Status", value: "Passed", unit: "" },
]
