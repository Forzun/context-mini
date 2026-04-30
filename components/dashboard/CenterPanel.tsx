"use client"

import { SimilarityCard } from "./SimilarityCard"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { QueryResult } from "@/types"
import { motion } from "framer-motion"
import { Send, ChevronDown } from "lucide-react"
import { useState } from "react"

interface CenterPanelProps {
  result: QueryResult
}

export function CenterPanel({ result }: CenterPanelProps) {
  const [query, setQuery] = useState(result.query)

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto px-2">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-foreground">Query Workspace</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          RAG-powered question answering
        </p>
      </div>

      {/* Query input section - sticky */}
      <div className="sticky top-0 space-y-2 bg-background/80 pb-2 backdrop-blur-sm">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about your knowledge base..."
            className="flex-1 rounded-lg border border-border/40 bg-card/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 focus:outline-none"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-blue-600 px-4 text-white hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Answer section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border/40 bg-gradient-to-br from-card/60 to-card/30 p-4 backdrop-blur-sm"
      >
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Answer</h3>
          <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2 py-1 text-xs text-green-400">
            Grounded
          </span>
        </div>
        <p className="text-sm leading-relaxed text-foreground/80">
          {result.answer}
        </p>
      </motion.div>

      {/* Evidence section */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Evidence ({result.chunks.length} chunks)
        </h3>
        <div className="space-y-2">
          {result.chunks.map((chunk, idx) => (
            <SimilarityCard key={chunk.id} chunk={chunk} index={idx} />
          ))}
        </div>
      </div>

      {/* Expandable inspect retrieval section */}
      <Accordion className="w-full">
        <AccordionItem value="inspect" className="border-border/40">
          <AccordionTrigger className="text-sm font-medium text-foreground hover:text-foreground/80 hover:no-underline">
            <div className="flex items-center gap-2">
              <ChevronDown className="h-4 w-4" />
              Inspect Retrieval
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {/* Retrieved Context */}
            <div>
              <h4 className="mb-2 text-xs font-semibold tracking-wider text-foreground uppercase">
                Retrieved Context
              </h4>
              <div className="max-h-48 overflow-y-auto rounded-lg border border-border/40 bg-black/30 p-3 font-mono text-xs text-foreground/70">
                <div className="space-y-2">
                  {result.chunks.slice(0, 2).map((chunk, idx) => (
                    <div key={chunk.id} className="text-foreground/60">
                      <span className="text-blue-400">[Chunk {idx + 1}]</span>{" "}
                      {chunk.content.substring(0, 100)}...
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prompt used */}
            <div>
              <h4 className="mb-2 text-xs font-semibold tracking-wider text-foreground uppercase">
                Final Prompt
              </h4>
              <div className="max-h-40 overflow-y-auto rounded-lg border border-border/40 bg-black/30 p-3 font-mono text-xs text-foreground/70">
                <span className="text-green-400">
                  You are a helpful AI assistant.
                </span>
                <br />
                <br />
                Based on the following context:
                <br />
                {result.chunks
                  .slice(0, 3)
                  .map((chunk, idx) => `[${idx + 1}] ${chunk.source}`)
                  .join("\n")}
                <br />
                <br />
                <span className="text-yellow-400">
                  Answer this question:
                </span>{" "}
                {query}
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-xs font-semibold tracking-wider text-foreground uppercase">
                Why These Chunks
              </h4>
              <div className="space-y-1 text-xs text-foreground/70">
                {result.chunks.slice(0, 3).map((chunk) => (
                  <div key={chunk.id} className="flex justify-between">
                    <span>{chunk.source}</span>
                    <span className="text-blue-400">
                      {Math.round(chunk.similarity * 100)}% match
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Spacer */}
      <div className="h-4" />
    </div>
  )
}
