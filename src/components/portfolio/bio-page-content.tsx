"use client"

import Image from "next/image"
import Link from "next/link"
import { Anton } from "next/font/google"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"
import { PortfolioLayout } from "@/components/portfolio-layout"
import { cn } from "@/lib/utils"
import { heroName } from "@/data/portfolio-home"

import {
  bioEducation,
  bioExperience,
  bioFeaturedWork,
  bioLanguages,
  bioLinks,
  bioProcess,
  bioProfile,
  bioSkillPillars,
  bioTools,
} from "@/data/bio"

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-home-display",
})

/* ─── palette ─── */
const violet = "#6b5ce7"
const forest = "#2d6a4f"
const slate   = "#2a3638"
const ink     = "#1d1d1f"
const fog     = "#86868b"

const companyColors: Record<string, string> = {
  "Knightec Group":     violet,
  "Scania":             forest,
  "Adventure Box":      "#b45309",
  "Speedledger (Visma)": "#0066cc",
}

const skillAccents = [violet, forest, "#b45309", slate, "#0066cc", "#c2410c"]

/* ─── card bases (match home thumbnails) ─── */
const card =
  "rounded-2xl overflow-hidden transition-transform duration-200 ease-out hover:scale-[1.015]"

const tileClass =
  "relative flex h-full min-h-0 flex-col overflow-hidden rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_10px_32px_rgba(0,0,0,0.12)]"

/** Bio-only poster gradients — same 168° poster style, distinct from home tiles */
const companiesGradient =
  "linear-gradient(168deg, #a89bf5 0%, #6b5ce7 32%, #5241c9 65%, #362a8f 100%)"

const educationGradient =
  "linear-gradient(168deg, #5ec6e8 0%, #2892b8 38%, #1a6a85 72%, #0f4458 100%)"

function BioPosterTile({
  title,
  caption,
  gradientCss,
}: {
  title: string
  caption: string
  gradientCss: string
}) {
  return (
    <article
      className={cn(tileClass, "hover:translate-y-[-2px]")}
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
      <div className="relative z-10 flex h-full min-h-0 flex-1 flex-col justify-end px-5 pb-6 pt-8 md:px-6 md:pb-7 md:pt-10">
        <h2
          className={cn(
            display.className,
            "text-[clamp(1.5rem,3.2vw,2.125rem)] uppercase leading-[0.95] tracking-[0.02em] text-white",
          )}
        >
          {title}
        </h2>
        <hr className="mt-3 border-0 border-t border-white/45" />
        <p className="mt-3 text-[15px] font-medium leading-snug text-white/95 md:text-base">
          {caption}
        </p>
      </div>
    </article>
  )
}

/* ════════════════════════════════════════
   HERO COMPONENTS
════════════════════════════════════════ */

/* Portrait — left tall card with name overlay */
function PortraitCard() {
  const [err, setErr] = useState(false)
  return (
    <div
      className={cn(tileClass, "relative flex h-full min-h-[360px] flex-col justify-end lg:min-h-0")}
      style={{ background: violet }}
    >
      {!err ? (
        <Image
          src={bioProfile.portraitSrc}
          alt={bioProfile.portraitAlt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 90vw, 28vw"
          priority
          onError={() => setErr(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="flex size-32 items-center justify-center rounded-full text-6xl font-black text-white"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            P
          </span>
        </div>
      )}
      {/* gradient scrim — deeper for legibility */}
      <div className="absolute inset-x-0 bottom-0 h-[190px] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      {/* overlay text */}
      <div className="relative z-10 p-6">
        <p className="font-sans text-[12px] font-medium italic leading-none tracking-wide text-white/70">
          Im,
        </p>
        <p
          className="mt-1 font-sans font-black leading-[0.9] tracking-[-0.03em] text-white drop-shadow-sm"
          style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)" }}
        >
          Pranoy
          <br />
          Mathew
        </p>
        <p className="mt-2 text-[13px] font-medium text-white/80">{bioProfile.role}</p>
        <a
          href={`mailto:${bioLinks.email}`}
          className="mt-1.5 block text-[12px] font-medium text-white/60 underline-offset-2 transition-colors hover:text-white hover:underline"
        >
          {bioLinks.email}
        </a>
      </div>
    </div>
  )
}

/* Lead — white thumbnail (matches home HeroThumbnailCard) */
function LeadCard() {
  return (
    <article
      className={cn(
        tileClass,
        "bg-white ring-1 ring-black/[0.04] hover:translate-y-[-1px] dark:bg-[#1d1d1f] dark:ring-white/[0.08]",
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
            {bioProfile.role}
          </p>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-center px-5 py-4 md:px-6 md:py-5">
        <p className="text-[clamp(1rem,1.8vw,1.25rem)] font-semibold leading-[1.35] tracking-[-0.02em] text-[#1d1d1f] dark:text-[#f5f5f7]">
          {bioProfile.lead}
        </p>
      </div>

      <footer className="shrink-0 border-t border-black/[0.06] px-5 py-3.5 md:px-6 dark:border-white/[0.08]">
        <div className="flex flex-wrap gap-2">
          <a
            href={`mailto:${bioLinks.email}`}
            className="rounded-full border border-black/10 px-3 py-1 text-[11px] font-medium text-[#1d1d1f] transition-colors hover:bg-[#1d1d1f] hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-[#1d1d1f]"
          >
            Email
          </a>
          <a
            href={bioLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/10 px-3 py-1 text-[11px] font-medium text-[#1d1d1f] transition-colors hover:bg-[#1d1d1f] hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-[#1d1d1f]"
          >
            LinkedIn
          </a>
          <a
            href={bioLinks.resumePdf}
            download
            className="rounded-full px-3 py-1 text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: violet }}
          >
            Résumé ↓
          </a>
        </div>
        <p className="mt-2.5 text-[10px] font-semibold uppercase leading-snug tracking-[0.08em] text-[#86868b]">
          {bioProfile.location}
        </p>
      </footer>
    </article>
  )
}

function CompaniesCard() {
  return (
    <BioPosterTile
      title="Companies"
      caption="Knightec · Scania · Adventure Box · Visma"
      gradientCss={companiesGradient}
    />
  )
}

function EducationHeroCard() {
  return (
    <BioPosterTile
      title="Education"
      caption="MSc Information Engineering · BSc Electronics & Instrumentation"
      gradientCss={educationGradient}
    />
  )
}

/* ════════════════════════════════════════
   LOWER SECTION COMPONENTS
════════════════════════════════════════ */

function ExperienceSection() {
  return (
    <div className="rounded-2xl bg-white p-6 dark:bg-[#1d1d1f] md:p-8">
      <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: fog }}>
        Career
      </p>
      <ul className="divide-y divide-black/[0.05] dark:divide-white/[0.07]">
        {bioExperience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="flex gap-4 py-5 first:pt-0 last:pb-0">
            <div
              className="mt-1 w-[3px] shrink-0 rounded-full"
              style={{ background: companyColors[job.company] ?? fog }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <p className="font-sans text-[16px] font-semibold text-[#1d1d1f] dark:text-white">
                  {job.role}
                </p>
                <p className="text-[13px]" style={{ color: fog }}>{job.period}</p>
              </div>
              <p className="mt-0.5 text-[14px]" style={{ color: fog }}>
                {job.company} · {job.location}
              </p>
              <ul className="mt-2.5 space-y-1">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-[14px] leading-relaxed" style={{ color: fog }}>
                    <span
                      className="mt-[6px] size-1 shrink-0 rounded-full"
                      style={{ background: companyColors[job.company] ?? fog }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SkillsGrid() {
  return (
    <div>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: fog }}>
        Capabilities
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {bioSkillPillars.map((skill, i) => (
          <div
            key={skill.title}
            className={cn(card, "bg-white p-5 dark:bg-[#1d1d1f]")}
            style={{ borderTop: `4px solid ${skillAccents[i % skillAccents.length]}` }}
          >
            <p className="font-sans text-[15px] font-semibold text-[#1d1d1f] dark:text-white">
              {skill.title}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: fog }}>
              {skill.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeaturedWorkGrid() {
  return (
    <div>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: fog }}>
        Featured work
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {bioFeaturedWork.map((project) => (
          <Link
            key={project.title}
            href={project.href}
            className={cn(card, "group flex flex-col justify-between p-5 text-white")}
            style={{ background: ink }}
          >
            <div>
              <p className="font-sans text-[16px] font-semibold text-white">{project.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">{project.description}</p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-[13px] font-medium text-white/60 transition-colors group-hover:text-white">
              View project
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function ToolsEduRow() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className={cn(card, "bg-white p-5 dark:bg-[#1d1d1f]")}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: fog }}>
          Tools
        </p>
        <ul className="space-y-2">
          {bioTools.map((t) => (
            <li key={t.name} className="flex items-baseline justify-between gap-2 text-[13px]">
              <span className="font-medium text-[#1d1d1f] dark:text-white">{t.name}</span>
              <span style={{ color: fog }}>{t.note}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={cn(card, "bg-white p-5 dark:bg-[#1d1d1f]")}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: fog }}>
          Languages
        </p>
        <ul className="space-y-2">
          {bioLanguages.map((l) => (
            <li key={l.language} className="flex items-baseline justify-between gap-2 text-[13px]">
              <span className="font-medium text-[#1d1d1f] dark:text-white">{l.language}</span>
              <span style={{ color: fog }}>{l.level}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={cn(card, "bg-white p-5 dark:bg-[#1d1d1f]")}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: fog }}>
          Education
        </p>
        <ul className="space-y-3">
          {bioEducation.map((e) => (
            <li key={e.school}>
              <p className="text-[13px] font-medium text-[#1d1d1f] dark:text-white">{e.school}</p>
              <p className="text-[12px]" style={{ color: fog }}>{e.degree}</p>
              <p className="text-[12px]" style={{ color: fog }}>{e.period}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProcessCard() {
  return (
    <div className={cn(card, "p-6 md:p-8 text-white")} style={{ background: forest }}>
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
        How I work
      </p>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {bioProcess.map((step, i) => (
          <li key={step} className="flex gap-3">
            <span className="mt-0.5 font-mono text-[12px] text-white/35">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[15px] leading-snug text-white/90">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function ConnectCard() {
  return (
    <div
      className={cn(card, "flex flex-col items-start justify-between gap-6 p-6 text-white md:flex-row md:items-center md:p-8")}
      style={{ background: violet }}
    >
      <div>
        <p className="font-sans text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold">
          Let&rsquo;s work together.
        </p>
        <p className="mt-1 text-[15px] text-white/65">{bioLinks.email} · {bioLinks.phone}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-3">
        <a
          href={`mailto:${bioLinks.email}`}
          className="rounded-full bg-white px-5 py-2 text-[14px] font-semibold transition-opacity hover:opacity-90"
          style={{ color: violet }}
        >
          Email me
        </a>
        <a
          href={bioLinks.resumePdf}
          download
          className="rounded-full border border-white/35 px-5 py-2 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
        >
          Download resume
        </a>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   PAGE
════════════════════════════════════════ */
export function BioPageContent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 50)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <PortfolioLayout className={cn(display.variable, "min-h-svh bg-[#f5f5f7] dark:bg-black")}>
      <main
        className={cn(
          "mx-auto w-full max-w-[1280px] px-3 pb-10 pt-6 sm:px-4 sm:pb-12 sm:pt-8 md:px-5 lg:px-6",
          "transition-[opacity,transform] duration-700 ease-out",
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        )}
      >
        {/* ── Hero bento: portrait left (2-row span) + 2-col right ── */}
        <div
          className={cn(
            "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4",
            "lg:grid-cols-[minmax(0,1fr)_2fr_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-4",
            "lg:h-[clamp(32rem,58vh,42rem)]",
          )}
        >

          {/* Portrait — spans both rows */}
          <div className="min-h-[360px] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-0 lg:h-full">
            <PortraitCard />
          </div>

          {/* Row 1: Lead card spans cols 2 + 3 */}
          <div className="min-h-[200px] sm:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:min-h-0 lg:h-full">
            <LeadCard />
          </div>

          {/* Row 2: Companies | Education side-by-side */}
          <div className="min-h-[180px] lg:col-start-2 lg:row-start-2 lg:min-h-0 lg:h-full">
            <CompaniesCard />
          </div>
          <div className="min-h-[180px] lg:col-start-3 lg:row-start-2 lg:min-h-0 lg:h-full">
            <EducationHeroCard />
          </div>
        </div>

        {/* ── Experience ── */}
        <div className="mt-3">
          <ExperienceSection />
        </div>

        {/* ── Skills + Featured work ── */}
        <div className="mt-10 space-y-10">
          <SkillsGrid />
          <FeaturedWorkGrid />
        </div>

        {/* ── Tools / Languages / Education detail ── */}
        <div className="mt-3">
          <ToolsEduRow />
        </div>

        {/* ── Process ── */}
        <div className="mt-3">
          <ProcessCard />
        </div>

        {/* ── Connect ── */}
        <div className="mt-3 pb-4">
          <ConnectCard />
        </div>
      </main>
    </PortfolioLayout>
  )
}
