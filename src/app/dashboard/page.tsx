"use client"

import { pageSectionShell } from "@/lib/layout-tokens"
import { PortfolioLayout } from "@/components/portfolio-layout"

export default function Page() {
  return (
    <PortfolioLayout>
      <div className={pageSectionShell}>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </PortfolioLayout>
  )
}
