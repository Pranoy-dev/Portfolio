import { Anton, Hanken_Grotesk } from "next/font/google"
import { cn } from "@/lib/utils"

const display = Anton({
  weight: "400",
  subsets: ["latin"],
})

const wordmark = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
})

export type PortfolioLogoVariant = "mark" | "stacked" | "inline"

export function PortfolioLogo({
  variant = "stacked",
  className,
  active = false,
}: {
  variant?: PortfolioLogoVariant
  className?: string
  active?: boolean
}) {
  if (variant === "mark") {
    return (
      <span
        className={cn(
          wordmark.className,
          "relative flex size-9 shrink-0 flex-col items-center justify-center overflow-hidden rounded-[11px] bg-[#161617] text-white",
          "shadow-[0_4px_14px_rgba(0,0,0,0.2)] ring-1 ring-white/10",
          active && "ring-[#43aa5e]/45 shadow-[0_4px_18px_rgba(67,170,94,0.25)]",
          className,
        )}
        aria-hidden
      >
        <span
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#43aa5e] via-[#7c6cf0] to-[#43aa5e]"
          aria-hidden
        />
        <span className="flex items-baseline font-bold leading-none tracking-[-0.06em]">
          <span className="text-[11px]">P</span>
          <span className="text-[9px] opacity-80">M</span>
        </span>
      </span>
    )
  }

  if (variant === "inline") {
    return (
      <span
        className={cn(
          wordmark.className,
          "inline-block min-w-0 font-bold leading-none tracking-[-0.04em]",
          "text-[15px] text-[#1d1d1f] sm:text-base",
          "dark:text-[#f5f5f7]",
          active && "text-[#1d1d1f] dark:text-white",
          className,
        )}
      >
        Pranoy Mathew
      </span>
    )
  }

  return (
    <span className={cn(display.className, "flex min-w-0 flex-col leading-none", className)}>
      <span
        className={cn(
          "bg-gradient-to-r from-[#1d1d1f] via-[#2d6a4f] to-[#1d1d1f] bg-clip-text text-[1.05rem] uppercase tracking-[0.05em] text-transparent",
          "dark:from-[#f5f5f7] dark:via-[#6fcf7a] dark:to-[#f5f5f7]",
          active && "via-[#43aa5e]",
        )}
      >
        Pranoy
      </span>
      <span className="mt-1.5 flex items-center gap-2">
        <span
          className="h-px w-4 bg-gradient-to-r from-[#43aa5e] via-[#7c6cf0] to-transparent"
          aria-hidden
        />
        <span className="text-[9px] uppercase tracking-[0.34em] text-[#86868b]">Mathew</span>
      </span>
    </span>
  )
}
