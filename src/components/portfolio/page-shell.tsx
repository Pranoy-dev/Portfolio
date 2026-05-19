"use client"

import { useEffect, useState } from "react"
import { PortfolioLayout } from "@/components/portfolio-layout"
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
          "flex flex-1 flex-col gap-10 p-6 md:p-12 max-w-5xl mx-auto md:mt-6 mt-16 w-full min-w-0 transition-all duration-300 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          className
        )}
      >
        {children}
      </div>
    </PortfolioLayout>
  )
}
