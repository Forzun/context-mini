import { ExecutionTraceEntry } from "@/types"

export const activeLogs: ExecutionTraceEntry[] = [
  {
    timestamp: new Date().toTimeString().split(" ")[0],
    message: "Starting execution...",
    type: "info",
  },
]
