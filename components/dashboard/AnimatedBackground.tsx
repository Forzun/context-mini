"use client"

import { motion, useComposedRefs } from "framer-motion"
import { useEffect, useMemo, useState, useSyncExternalStore } from "react"

export function AnimatedBackground() {
  const [randomValue] = useState(() => Math.random())
  const [mounted, setMounted] = useState(false)

  const useIsClient = () =>
    useSyncExternalStore(
      () => () => {}, // no subscribe needed
      () => true, // client value
      () => false // server value
    )

  const [particles] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      xOffset: (Math.random() - 0.5) * 50,
    }))
  )

  const clientOnly = useIsClient()
  if (!clientOnly) {
    return null
  }

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-background"
      suppressHydrationWarning
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 right-0 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0.1,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, particle.xOffset * 50 - 25, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Glow effects at edges */}
      <div className="pointer-events-none absolute -top-1/2 -left-1/2 h-full w-full rounded-full opacity-[0.02] blur-3xl" />
      <div className="pointer-events-none absolute -right-1/2 -bottom-1/2 h-full w-full rounded-full opacity-[0.02] blur-3xl" />
    </div>
  )
}
