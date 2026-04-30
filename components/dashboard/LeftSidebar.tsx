"use client"

import { TerminalLog } from "./Terminallog"
import { GlowingCard } from "./GlowingCard"
import { Button } from "@/components/ui/button"
import { leftPanelStats, activityLog } from "@/lib/mockData"
import { Upload } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export function LeftSidebar() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div className="no-scrollbar flex h-full flex-col gap-4 overflow-y-auto pr-2">
      <div>
        <h2 className="text-lg font-bold text-foreground">Knowledge Base</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Manage your context documents
        </p>
      </div>

      <motion.div
        whileHover={{ borderColor: "rgba(59, 130, 246, 0.4)" }}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        className={`rounded-lg border-2 border-dashed p-4 transition-all ${
          isDragging
            ? "border-blue-500/60 bg-blue-500/10"
            : "border-border/40 bg-card/20"
        }`}
      >
        <div className="flex flex-col items-center gap-2 py-4">
          <Upload className="h-5 w-5 text-muted-foreground" />
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Paste documents here
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              or drag and drop
            </p>
          </div>
        </div>
        <textarea
          placeholder="Paste your knowledge documents, PDFs, or text content here..."
          className="h-32 w-full resize-none rounded-lg border border-border/40 bg-background/50 p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 focus:outline-none"
        />
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
          Ingest Documents
        </Button>
      </motion.div>

      <div className="relative">
        <h3 className="mb-2 text-xs font-semibold tracking-wider text-foreground uppercase">
          Activity
        </h3>
        <TerminalLog entries={activityLog} maxHeight="flex-1 min-h-0" />
      </div>

      <div className="relative">
        <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase">
          Stats
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {leftPanelStats.map((stat, idx) => (
            <GlowingCard
              key={idx}
              label={stat.label}
              value={stat.value}
              unit={stat.unit}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
