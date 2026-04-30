"use client"

import { TerminalLog } from "./Terminallog"
import { GlowingCard } from "./GlowingCard"
import { ExecutionTraceEntry } from "@/types"
import { motion } from "framer-motion"

interface RightSidebarProps {
  confidence: number
  topMatch: string
  grounded: boolean
  trace: ExecutionTraceEntry[]
}

export function RightSidebar({
  confidence,
  topMatch,
  grounded,
  trace,
}: RightSidebarProps) {
  const confidencePercent = Math.round(confidence * 100)

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto pl-2">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-foreground">Observability</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Query execution trace
        </p>
      </div>

      {/* Status cards */}
      <div className="space-y-2">
        {/* Confidence Score */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 backdrop-blur-sm"
        >
          <div className="text-xs font-semibold tracking-wider text-foreground uppercase">
            Confidence
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <div className="text-3xl font-bold text-green-400">
              {confidencePercent}%
            </div>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border/40">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidencePercent}%` }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
            />
          </div>
        </motion.div>

        {/* Top Similarity */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 backdrop-blur-sm"
        >
          <div className="text-xs font-semibold tracking-wider text-foreground uppercase">
            Top Match
          </div>
          <div className="mt-2 text-sm font-medium text-blue-300">
            {topMatch}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Highest similarity score: 0.94
          </div>
        </motion.div>

        {/* Grounding Status */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`rounded-lg border p-3 backdrop-blur-sm ${
            grounded
              ? "border-emerald-500/30 bg-emerald-500/5"
              : "border-amber-500/30 bg-amber-500/5"
          }`}
        >
          <div className="text-xs font-semibold tracking-wider text-foreground uppercase">
            Grounding
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${grounded ? "bg-emerald-400" : "bg-amber-400"}`}
            />
            <span
              className={`text-sm font-medium ${grounded ? "text-emerald-300" : "text-amber-300"}`}
            >
              {grounded ? "Passed" : "Partial"}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Execution trace */}
      <div className="flex min-h-0 flex-1 flex-col">
        <h3 className="mb-2 text-xs font-semibold tracking-wider text-foreground uppercase">
          Trace
        </h3>
        <TerminalLog entries={trace} maxHeight="flex-1 min-h-0" />
      </div>
    </div>
  )
}
