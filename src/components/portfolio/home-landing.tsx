"use client"

import Link from "next/link"
import { Anton } from "next/font/google"
import { useEffect, useState } from "react"
import { PortfolioLayout } from "@/components/portfolio-layout"
import { cn } from "@/lib/utils"
import {
  homeHeroHeadline,
  heroLocation,
  heroName,
  heroRole,
  heroStatement,
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
    visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
  )

function HomeHeroHeadline({ visible }: { visible: boolean }) {
  return (
    <header className={cn(heroTextMeasure, "text-left")}>
      <p
        className={cn(
          "mb-2 font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.12em] text-[#86868b]",
          reveal(visible)
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
          reveal(visible)
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
          reveal(visible)
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

function HeroThumbnailCard() {
  return (
    <Link
      href="/bio"
      aria-label="Bio — about Pranoy Mathew"
      className={cn(
        tileClass,
        "group bg-white ring-1 ring-black/[0.04] hover:translate-y-[-1px] dark:bg-[#1d1d1f] dark:ring-white/[0.08]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d1d1f]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f7] dark:focus-visible:ring-white/40 dark:focus-visible:ring-offset-black"
      )}
    >
      <header className="flex shrink-0 items-start gap-3 px-5 pt-5 md:px-6 md:pt-6">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[#1d1d1f]/90 bg-white text-[11px] font-black text-[#1d1d1f] dark:border-[#f5f5f7]/90 dark:text-[#f5f5f7]"
          aria-hidden
        >
          P
        </span>
        <div className="min-w-0 pt-0.5 leading-none">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#1d1d1f] dark:text-[#f5f5f7]">
            {heroName}
          </p>
          <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#86868b]">
            {heroRole}
          </p>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-center px-5 py-5 md:px-6 md:py-6">
        <h2 className="text-[clamp(1.125rem,2.2vw,1.5rem)] font-black uppercase leading-[1.08] tracking-[-0.01em] text-[#1d1d1f] dark:text-[#f5f5f7]">
          {heroStatement}
        </h2>
      </div>

      <footer className="shrink-0 border-t border-black/[0.06] px-5 py-3.5 md:px-6 dark:border-white/[0.08]">
        <p className="text-[10px] font-semibold uppercase leading-snug tracking-[0.08em] text-[#86868b]">
          {heroLocation}
        </p>
      </footer>
    </Link>
  )
}

function NavThumbnailCard({
  href,
  title,
  caption,
  gradientCss,
}: (typeof homeThumbnailCards)[number]) {
  return (
    <Link
      href={href}
      aria-label={title}
      className={cn(
        tileClass,
        "group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f7] hover:translate-y-[-2px] dark:focus-visible:ring-offset-black"
      )}
      style={{ background: gradientCss }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_35%,rgba(255,255,255,0.22)_0%,transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-end px-5 pb-5 pt-8 md:px-6 md:pb-6 md:pt-10">
        <h4
          className={cn(
            display.className,
            "text-[clamp(1.5rem,3.2vw,2.125rem)] uppercase leading-[0.95] tracking-[0.02em] text-white"
          )}
        >
          {title}
        </h4>
        <hr className="mt-3 border-0 border-t border-white/45" />
        <p className="mt-3 text-[15px] font-medium leading-snug text-white/95 md:text-base">
          {caption}
        </p>
      </div>
    </Link>
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
          isVisible ? "opacity-100" : "opacity-0"
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
              "grid h-[clamp(15rem,34vh,21rem)] grid-cols-1 gap-3 sm:grid-cols-2 sm:h-[clamp(16rem,36vh,22rem)] sm:gap-4 lg:grid-cols-3 lg:gap-4"
            )}
          >
            <HeroThumbnailCard />
            {homeThumbnailCards.map((card) => (
              <NavThumbnailCard key={card.id} {...card} />
            ))}
          </div>
        </section>
      </div>
    </PortfolioLayout>
  )
}
