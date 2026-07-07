"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Anton } from "next/font/google"
import { useEffect, useState } from "react"
import { PortfolioLayout } from "@/components/portfolio-layout"
import { pageContent } from "@/lib/layout-tokens"
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

/** Shared typographic measure — Apple keeps hero copy in a tight column. */
const heroTextMeasure = "w-full max-w-[40rem]"

const appleEase = "cubic-bezier(0.25, 0.1, 0.25, 1)"

const reveal = (visible: boolean) =>
  cn(
    "transition-[opacity,transform] duration-[750ms]",
    visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
  )

const cardTitle =
  "text-[clamp(1.25rem,min(4.5cqw,5vw),2.125rem)] uppercase leading-[0.95] tracking-[0.02em] text-white"
const cardCaption =
  "text-[clamp(0.75rem,min(3.2cqw,3.5vw),0.9375rem)] font-normal leading-snug text-white/95 text-balance"
const cardDetails =
  "text-[clamp(0.75rem,min(2.8cqw,3vw),0.875rem)] leading-snug text-white/70"
const cardCopyPad = "px-[clamp(1rem,5cqw,1.5rem)] py-[clamp(1rem,4.5cqw,1.5rem)]"

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
          "text-[clamp(1.75rem,5vw,3rem)] leading-[1.05] tracking-[-0.04em]",
          reveal(visible),
        )}
        style={{ transitionTimingFunction: appleEase }}
      >
        {homeHeroHeadline.lead}
      </h1>
      <p
        className={cn(
          "mt-3 font-sans font-normal text-balance text-[#86868b] dark:text-[#a1a1a6]",
          "text-[clamp(1rem,2.8vw,1.25rem)] leading-[1.4] tracking-[-0.016em]",
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
  "relative flex h-full min-h-0 flex-col overflow-hidden rounded-[clamp(14px,3.5cqw,20px)] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_10px_32px_rgba(0,0,0,0.12)] motion-reduce:transition-none"

/** Seamless infinite marquee — animates via globals.css (.marquee-track). */
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
    <span className="marquee-track">
      <span className="shrink-0">{segment}</span>
      <span className="shrink-0" aria-hidden>
        {segment}
      </span>
    </span>
  )
}

function NavThumbnailCard({
  id,
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
  backgroundImage,
  gradientCss,
}: (typeof homeThumbnailCards)[number]) {
  const hasBackgroundImage = Boolean(backgroundImage)

  return (
    <div className="group @container relative h-full min-h-[clamp(19rem,46vh,24rem)] sm:min-h-0">
      <Link
        href={href}
        aria-label={`Open ${title}: ${caption}`}
        title={`${ctaLabel} — ${title}`}
        className={cn(
          tileClass,
          "h-full cursor-pointer transition-[transform,box-shadow] duration-300",
          "hover:translate-y-[-3px] hover:shadow-[0_16px_44px_rgba(0,0,0,0.22)] motion-reduce:hover:translate-y-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f7] dark:focus-visible:ring-offset-black",
        )}
        style={hasBackgroundImage ? undefined : { background: gradientCss }}
      >
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={id === "bio"}
          />
        ) : null}

        {!hasBackgroundImage ? (
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_35%,rgba(255,255,255,0.22)_0%,transparent_65%)]"
            aria-hidden
          />
        ) : null}

        {!hasBackgroundImage ? (
          <div
            className={cn(
              display.className,
              "pointer-events-none absolute inset-x-0 top-[18%] z-[1] w-full overflow-hidden",
              "text-[clamp(1.125rem,min(5cqw,3.5vw),2.25rem)] uppercase leading-none tracking-[0.08em] motion-reduce:hidden",
              marqueeAlwaysVisible
                ? "text-white/30 opacity-100"
                : "text-white/[0.07] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            )}
            aria-hidden
          >
            <MarqueeStrip text={marquee} keywords={marqueeKeywords} />
          </div>
        ) : null}

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 z-[2]",
            hasBackgroundImage ? "h-[50%] bg-gradient-to-t from-black/95 via-black/70 to-transparent" : "h-[55%] bg-gradient-to-t from-black/70 via-black/35 to-transparent",
          )}
          aria-hidden
        />

        <div
          className={cn(
            "relative z-10 flex min-h-0 flex-1 flex-col justify-end",
            cardCopyPad,
          )}
        >
          <div>
            <h2 className={cn(display.className, cardTitle)}>
              {title}
              <span className="text-white/90">.</span>
            </h2>
            <hr className="mt-[clamp(0.625rem,2.5cqw,0.75rem)] border-0 border-t border-white/45" />
            <p className={cn(cardCaption, "mt-[clamp(0.625rem,2.5cqw,0.75rem)]")}>{caption}</p>
            {details ? (
              <p className={cn(cardDetails, "mt-[clamp(0.375rem,1.5cqw,0.5rem)]")}>{details}</p>
            ) : null}
            <span
              className={cn(
                "pointer-events-none mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-full",
                "bg-white px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1d1d1f] sm:text-[11px]",
                "shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-shadow duration-300 group-hover:shadow-[0_3px_14px_rgba(0,0,0,0.28)]",
              )}
              aria-hidden
            >
              {ctaLabel}
              <ArrowRight className="size-3.5 shrink-0" strokeWidth={2.25} />
            </span>
          </div>
        </div>
      </Link>

      {showHoverWord ? (
        <p
          className={cn(
            display.className,
            "pointer-events-none absolute left-1/2 top-[42%] z-[3] -translate-x-1/2",
            "text-[clamp(1.5rem,min(7cqw,4vw),2.75rem)] uppercase leading-none tracking-[0.04em] text-white",
            "translate-y-8 opacity-0 transition-all duration-300 ease-out",
            "group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:hidden",
            "drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]",
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
          className="shrink-0 py-8 sm:py-10 md:py-12"
        >
          <div className={pageContent}>
            <HomeHeroHeadline visible={isVisible} />
          </div>
        </section>

        <section className="shrink-0 bg-[#f5f5f7] pb-8 pt-4 dark:bg-black sm:pb-10 sm:pt-5 md:pt-6">
          <div
            className={cn(
              pageContent,
              "grid h-auto grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:h-[clamp(26rem,52vh,32rem)] lg:grid-cols-3 lg:gap-4",
              "[&>*:last-child]:sm:col-span-2 [&>*:last-child]:lg:col-span-1",
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
