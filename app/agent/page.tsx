"use client"

import { AnimatedBackground } from "@/components/dashboard/AnimatedBackground"
import { LeftSidebar } from "@/components/dashboard/LeftSidebar"
import { CenterPanel } from "@/components/dashboard/CenterPanel"
import { RightSidebar } from "@/components/dashboard/RightSidebar"
import { mockQueryResult } from "@/lib/mockData"

export default function Dashboard() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <AnimatedBackground />

      {/* Main content */}
      <div className="relative z-10 flex h-full gap-4 p-4">
        <div className="flex w-1/4 min-w-0 flex-col rounded-xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm">
          <LeftSidebar />
        </div>

        <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm">
          <CenterPanel result={mockQueryResult} />
        </div>

        <div className="flex w-1/4 min-w-0 flex-col rounded-xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm">
          <RightSidebar
            confidence={mockQueryResult.confidence}
            topMatch={mockQueryResult.topMatch}
            grounded={mockQueryResult.grounded}
            trace={mockQueryResult.trace}
          />
        </div>
      </div>
    </div>
  )
}
