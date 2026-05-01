"use client"

import { AnimatedBackground } from "@/components/dashboard/AnimatedBackground"
import { LeftSidebar } from "@/components/dashboard/LeftSidebar"
import { CenterPanel } from "@/components/dashboard/CenterPanel"
import { RightSidebar } from "@/components/dashboard/RightSidebar"
import { useQuery } from "@/hooks/use-query"

export default function Dashboard() {
  const { queryResult, getContext } = useQuery()

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <AnimatedBackground />

      <div className="relative z-10 flex h-full gap-4 p-4">
        <div className="no-scrollbar flex w-1/4 min-w-0 flex-col rounded-xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm">
          <LeftSidebar />
        </div>

        <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm">
          <CenterPanel />
        </div>

        <div className="flex w-1/4 min-w-0 flex-col rounded-xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm">
          {queryResult && (
            <RightSidebar
              confidence={queryResult?.confidence}
              topMatch={queryResult?.topMatch}
              grounded={queryResult?.grounded}
              trace={queryResult?.trace}
            />
          )}
        </div>
      </div>
    </div>
  )
}
