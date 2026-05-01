"use client"

import { motion } from "framer-motion"

interface GlowingCardProps {
  label: string
  value: string | number
  unit?: string
  glow?: boolean
}

export function GlowingCard({ label, value, glow = false }: GlowingCardProps) {
  return (
    <motion.div
      whileHover={glow ? { scale: 1.02 } : undefined}
      className={`rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 ${
        glow
          ? "border-blue-500/40 bg-blue-500/5 shadow-lg hover:border-blue-500/60 hover:bg-blue-500/10 hover:shadow-blue-500/20"
          : "border-border/40 bg-card/50 hover:border-border/60"
      }`}
    >
      <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <div className="text-2xl font-bold text-foreground">{value}</div>
      </div>
    </motion.div>
  )
}
