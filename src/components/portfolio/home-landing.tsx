"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Anton } from "next/font/google"
import { useEffect, useState } from "react"
import { PortfolioLayout } from "@/components/portfolio-layout"
import { cn } from "@/lib/utils"
import {
  homeHeroHeadline,
  homeThumbnailCards,
} from "@/data/portfolio-home"

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-home-display",
})

/** Shared horizontal alignment with the tile grid below. */
const homeContent = "mx-auto w-full max-w-[1280px] px-3 sm:px-4 md:px-5 lg:px-6"

/** Shared typographic measure — Apple keeps hero copy in a tight column. */
const heroTextMeasure = "w-full max-w-[40rem]"

const appleEase = "cubic-bezier(0.25, 0.1, 0.25, 1)"

const reveal = (visible: boolean) =>
  cn(
    "transition-[opacity,transform] duration-[750ms]",
    visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
  )

function HomeHeroHeadline({ visible }: { visible: boolean }) {
  return (
    <header className={cn(heroTextMeasure, "text-left")}>
      <p
        className={cn(
          "mb-2 font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.12em] text-[#86868b]",
          reveal(visible),
        )}
        style={{ transitionTimingFunction: appleEase }}
      >
        {homeHeroHeadline.eyebrow}
      </p>
      <h1
        id="home-hero-title"
        className={cn(
          "font-sans font-semibold text-balance text-[#1d1d1f] dark:text-[#f5f5f7]",
          "text-[clamp(2rem,4.2vw,3rem)] leading-[1.05] tracking-[-0.04em]",
          reveal(visible),
        )}
        style={{ transitionTimingFunction: appleEase }}
      >
        {homeHeroHeadline.lead}
      </h1>
      <p
        className={cn(
          "mt-3 font-sans font-normal text-[#86868b] dark:text-[#a1a1a6]",
          "text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-[1.4] tracking-[-0.016em]",
          "whitespace-nowrap max-md:whitespace-normal max-md:text-balance",
          reveal(visible),
        )}
        style={{
          transitionTimingFunction: appleEase,
          transitionDelay: visible ? "75ms" : "0ms",
        }}
      >
        {homeHeroHeadline.support}
      </p>
    </header>
  )
}

const tileClass =
  "relative flex h-full min-h-0 flex-col overflow-hidden rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_10px_32px_rgba(0,0,0,0.12)]"

/** Seamless infinite marquee — each half is long enough to cover the card width. */
function MarqueeStrip({
  text,
  keywords,
}: {
  text?: string
  keywords?: readonly string[]
}) {
  const phrase = keywords?.length
    ? `${keywords.map((word) => word.toUpperCase()).join(" · ")} · `
    : `${text ?? ""}\u00a0`
  const repeatCount = keywords?.length ? 6 : 14
  const segment = phrase.repeat(repeatCount)

  return (
    <span
      className={cn(
        "inline-flex w-max will-change-transform",
        "group-hover:animate-[marquee_48s_linear_infinite] group-focus-within:animate-[marquee_48s_linear_infinite]",
        "motion-reduce:group-hover:animate-none motion-reduce:group-focus-within:animate-none",
      )}
    >
      <span className="shrink-0">{segment}</span>
      <span className="shrink-0" aria-hidden>
        {segment}
      </span>
    </span>
  )
}

function NavThumbnailCard({
  href,
  title,
  caption,
  details,
  hoverWord,
  marquee,
  marqueeKeywords,
  marqueeAlwaysVisible = false,
  showHoverWord = true,
  ctaLabel,
  gradientCss,
}: (typeof homeThumbnailCards)[number]) {
  return (
    <div className="group relative h-full min-h-0">
      <Link
        href={href}
        aria-label={`Open ${title}: ${caption}`}
        title={`${ctaLabel} — ${title}`}
        className={cn(
          tileClass,
          "h-full cursor-pointer transition-[transform,box-shadow] duration-300",
          "hover:translate-y-[-3px] hover:shadow-[0_16px_44px_rgba(0,0,0,0.22)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f7] dark:focus-visible:ring-offset-black",
        )}
        style={{ background: gradientCss }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_35%,rgba(255,255,255,0.22)_0%,transparent_65%)]"
          aria-hidden
        />

        <div
          className={cn(
            display.className,
            "pointer-events-none absolute inset-x-0 top-[18%] z-[1] w-full overflow-hidden",
            "text-[clamp(1.5rem,3.5vw,2.25rem)] uppercase leading-none tracking-[0.08em] motion-reduce:hidden",
            marqueeAlwaysVisible
              ? "text-white/30 opacity-100"
              : "text-white/[0.07] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          )}
          aria-hidden
        >
          <MarqueeStrip text={marquee} keywords={marqueeKeywords} />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[55%] bg-gradient-to-t from-black/70 via-black/35 to-transparent"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-end px-5 py-5 md:px-6 md:py-6">
          <div>
            <h2
              className={cn(
                display.className,
                "text-[clamp(1.5rem,3.2vw,2.125rem)] uppercase leading-[0.95] tracking-[0.02em] text-white",
              )}
            >
              {title}
              <span className="text-white/90">.</span>
            </h2>
            <hr className="mt-3 border-0 border-t border-white/45" />
            <p className="mt-3 text-[13px] font-normal leading-snug text-white/95 text-balance sm:text-[14px] md:text-[15px]">
              {caption}
            </p>
            {details ? (
              <p className="mt-2 text-[13px] leading-snug text-white/70 md:text-[14px]">{details}</p>
            ) : null}
            <span
              className={cn(
                "pointer-events-none mt-3 inline-flex items-center gap-1 rounded-full",
                "bg-white px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1d1d1f] sm:text-[11px]",
                "shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-shadow duration-300 group-hover:shadow-[0_3px_14px_rgba(0,0,0,0.28)]",
              )}
              aria-hidden
            >
              {ctaLabel}
              <ArrowRight className="size-3" strokeWidth={2.25} />
            </span>
          </div>
        </div>
      </Link>

      {showHoverWord ? (
        <p
          className={cn(
            display.className,
            "pointer-events-none absolute left-1/2 top-[42%] z-[3] -translate-x-1/2",
            "text-[clamp(1.75rem,4vw,2.75rem)] uppercase leading-none tracking-[0.04em] text-white",
            "translate-y-8 opacity-0 transition-all duration-300 ease-out",
            "group-hover:translate-y-0 group-hover:opacity-100",
            "drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] motion-reduce:hidden",
          )}
          aria-hidden
        >
          {hoverWord}
        </p>
      ) : null}
    </div>
  )
}

export function HomeLanding() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(false)
    const timer = window.setTimeout(() => setIsVisible(true), 50)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <PortfolioLayout className="min-h-svh bg-[#f5f5f7] dark:bg-black">
      <div
        className={cn(
          display.variable,
          "flex min-h-0 flex-1 flex-col",
          "transition-opacity duration-700 ease-out",
          isVisible ? "opacity-100" : "opacity-0",
        )}
      >
        <section
          aria-labelledby="home-hero-title"
          className="shrink-0 bg-[#fbfbfd] py-8 dark:bg-[#161617] sm:py-10 md:py-12"
        >
          <div className={homeContent}>
            <HomeHeroHeadline visible={isVisible} />
          </div>
        </section>

        <section className="shrink-0 bg-[#f5f5f7] pb-8 pt-4 dark:bg-black sm:pb-10 sm:pt-5 md:pt-6">
          <div
            className={cn(
              homeContent,
              "grid h-[clamp(20rem,42vh,26rem)] grid-cols-1 gap-3 sm:grid-cols-2 sm:h-[clamp(21rem,44vh,27rem)] sm:gap-4 lg:gap-4",
            )}
          >
            {homeThumbnailCards.map((card) => (
              <NavThumbnailCard key={card.id} {...card} />
            ))}
          </div>
        </section>
      </div>
    </PortfolioLayout>
  )
}
