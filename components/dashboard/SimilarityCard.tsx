"use client"

import { KnowledgeChunk } from "@/types"
import { motion } from "framer-motion"

interface SimilarityCardProps {
  chunk: KnowledgeChunk
  index: number
}

export function SimilarityCard({ chunk, index }: SimilarityCardProps) {
  const similarityPercent = Math.round(chunk.similarity * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-lg border border-border/40 bg-card/30 p-4 backdrop-blur-sm transition-all hover:border-border/60 hover:bg-card/50"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex-1">
          <h4 className="line-clamp-2 text-sm font-medium text-foreground">
            {chunk.source}
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">{chunk.id}</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex-shrink-0 rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-purple-500/20 px-3 py-1"
        >
          <div className="text-sm font-bold text-blue-400">
            {similarityPercent}%
          </div>
        </motion.div>
      </div>

      {/* Similarity progress bar */}
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-border/40">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${similarityPercent}%` }}
          transition={{
            delay: index * 0.1 + 0.3,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50"
        />
      </div>

      {/* Content preview */}
      <p className="line-clamp-3 text-sm text-foreground/70">{chunk.content}</p>
    </motion.div>
  )
}
