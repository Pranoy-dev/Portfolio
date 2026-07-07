"use client"

import { useEffect, useState } from "react"
import { PortfolioLayout } from "@/components/portfolio-layout"
import { pageSectionShell } from "@/lib/layout-tokens"
import { cn } from "@/lib/utils"

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(false)
    const timer = window.setTimeout(() => setIsVisible(true), 50)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <PortfolioLayout>
      <div
        className={cn(
          pageSectionShell,
          "transition-[opacity,transform] duration-700 ease-out",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          className,
        )}
      >
        {children}
      </div>
    </PortfolioLayout>
  )
}
