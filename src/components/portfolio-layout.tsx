"use client"

import { PortfolioHeader } from "@/components/portfolio-header"
import { headerNavClearance } from "@/lib/layout-tokens"
import { cn } from "@/lib/utils"

export function PortfolioLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("min-h-svh bg-background", className)}>
      <PortfolioHeader />
      <main className={cn("min-h-0 flex-1", headerNavClearance)}>{children}</main>
    </div>
  )
}
