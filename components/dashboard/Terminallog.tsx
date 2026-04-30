"use client"

import { ExecutionTraceEntry } from "@/types"
import { motion } from "motion/react"

interface TerminalLogProps {
  entries: ExecutionTraceEntry[]
  maxHeight?: string
}

const getTypeColor = (type: ExecutionTraceEntry["type"]) => {
  switch (type) {
    case "success":
      return "text-green-400"
    case "error":
      return "text-red-400"
    case "warning":
      return "text-yellow-400"
    case "info":
    default:
      return "text-blue-400"
  }
}

const getTypePrefix = (type: ExecutionTraceEntry["type"]) => {
  switch (type) {
    case "success":
      return "✓"
    case "error":
      return "✗"
    case "warning":
      return "⚠"
    case "info":
    default:
      return "→"
  }
}

export function TerminalLog({
  entries,
  maxHeight = "max-h-96",
}: TerminalLogProps) {
  return (
    <div
      className={`${maxHeight} overflow-y-auto rounded-xl border border-border/40 bg-black/20 p-4 font-mono text-sm backdrop-blur-sm`}
    >
      <div className="space-y-1">
        {entries.map((entry, index) => (
          <motion.div
            key={`${entry.timestamp}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex gap-2 text-foreground/80"
          >
            <span className="whitespace-nowrap text-muted-foreground">
              [{entry.timestamp}]
            </span>
            <span className={`${getTypeColor(entry.type)} whitespace-nowrap`}>
              {getTypePrefix(entry.type)}
            </span>
            <span className="flex-1 text-foreground/70">{entry.message}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
