"use client"

import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { PortfolioLayout } from "@/components/portfolio-layout"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { worldviewFaq, worldviewHero } from "@/data/worldview"
import { pageSectionShell } from "@/lib/layout-tokens"
import { cn } from "@/lib/utils"

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string
  answer: string
  index: number
}) {
  const isDark = index % 2 === 0
  const number = String(index + 1).padStart(2, "0")

  const headerCard = (
    <div
      className={cn(
        "group relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl border p-4 transition-all duration-300 md:p-6",
        isDark
          ? "border-zinc-800/50 bg-zinc-900 text-white shadow-lg shadow-black/20 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/30"
          : "border-zinc-200/50 bg-zinc-50 text-zinc-900 shadow-lg shadow-black/5 hover:border-zinc-300 hover:shadow-xl hover:shadow-black/10",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)"} 1px, transparent 1px),
                            linear-gradient(to bottom, ${isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)"} 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          isDark ? "from-white/[0.03]" : "from-black/[0.02]",
        )}
        aria-hidden
      />

      <div className="relative z-10 min-w-0 space-y-3">
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex min-w-0 items-baseline gap-3">
              <span
                className={cn(
                  "shrink-0 font-mono text-base tabular-nums font-bold tracking-wider md:text-lg",
                  isDark ? "text-white" : "text-zinc-900",
                )}
              >
                {number}
              </span>
              <h2
                className={cn(
                  "min-w-0 text-lg font-bold leading-tight tracking-tight md:text-xl",
                  isDark ? "text-white" : "text-zinc-900",
                )}
              >
                {question}
              </h2>
            </div>
          </div>

          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-data-[state=open]/collapsible:rotate-180",
              isDark
                ? "border-white/20 bg-white/10 group-hover:bg-white/20"
                : "border-black/10 bg-black/5 group-hover:bg-black/10",
            )}
          >
            <ChevronDown
              className={cn("h-4 w-4", isDark ? "text-white" : "text-zinc-900")}
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative">
      <div
        className={cn(
          "absolute top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2",
          isDark ? "border-zinc-900 bg-white" : "border-zinc-50 bg-black",
          "-left-8 md:-left-12",
        )}
        aria-hidden
      />

      <Collapsible defaultOpen={false} className="group/collapsible">
        <CollapsibleTrigger className="w-full text-left">{headerCard}</CollapsibleTrigger>

        <CollapsibleContent className="mt-8 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div
            className={cn(
              "rounded-2xl border p-5 md:p-6",
              isDark
                ? "border-zinc-800/60 bg-zinc-950/80 text-white/90"
                : "border-zinc-200/80 bg-white text-zinc-700",
            )}
          >
            <p className="text-sm leading-relaxed md:text-[15px] md:leading-7">{answer}</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export function WorldviewPageContent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const timer = window.setTimeout(() => setVisible(true), 50)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <PortfolioLayout className="min-h-svh bg-background">
      <div
        className={cn(
          pageSectionShell,
          "transition-[opacity,transform] duration-700 ease-out",
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        )}
      >
        <header className="space-y-3 border-b border-border/50 pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            {worldviewHero.eyebrow}
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {worldviewHero.title}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            {worldviewHero.lead}
          </p>
        </header>

        <section aria-label="World view questions">
          <div className="relative space-y-8 pl-4 md:pl-12">
            <div
              className="absolute bottom-0 left-0 top-0 z-0 w-px bg-border/60"
              aria-hidden
            />

            {worldviewFaq.map((item, index) => (
              <FaqItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))}
          </div>
        </section>
      </div>
    </PortfolioLayout>
  )
}
