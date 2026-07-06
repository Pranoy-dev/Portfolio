"use client"

import Image from "next/image"
import Link from "next/link"
import { Anton } from "next/font/google"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  GraduationCap,
  MapPin,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react"
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { PortfolioLayout } from "@/components/portfolio-layout"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

import {
  bioEducation,
  bioExperience,
  bioLinks,
  bioProfile,
  bioSkillPillars,
  bioTools,
  type BioCareerProject,
  type BioSkillPillar,
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
const fog     = "#86868b"

const companyColors: Record<string, string> = {
  "Knightec Group":     violet,
  "Medela":             "#be185d",
  "Scania":             forest,
  Kogama:               "#b45309",
  "Speedledger (Visma)": "#0066cc",
}

/* ─── card bases (match home thumbnails) ─── */
const card =
  "rounded-2xl overflow-hidden transition-transform duration-200 ease-out hover:scale-[1.015]"

const tileClass =
  "relative flex h-full min-h-0 flex-col overflow-hidden rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_10px_32px_rgba(0,0,0,0.12)]"

const educationGradient =
  "linear-gradient(168deg, #5ec6e8 0%, #2892b8 38%, #1a6a85 72%, #0f4458 100%)"

function BioPageSection({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
}: {
  id: string
  eyebrow: string
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  contentClassName?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-6 border-t border-black/[0.08] pt-10 sm:pt-12 dark:border-white/[0.08]",
        className,
      )}
    >
      <header className="mb-8 sm:mb-10">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: fog }}
        >
          {eyebrow}
        </p>
        <h2
          className={cn(
            display.className,
            "mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] uppercase leading-[0.95] tracking-[0.02em] text-[#1d1d1f] dark:text-[#f5f5f7]",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: fog }}>
            {description}
          </p>
        ) : null}
      </header>
      <div className={contentClassName}>{children}</div>
    </section>
  )
}

function getCareerTimelineLabel(
  period: string,
  index: number,
  timelineDate?: string,
): string {
  if (timelineDate) return timelineDate
  if (index === 0 && /ongoing/i.test(period)) return "Today"

  const parts = period.split(/\s*[–-]\s*/)
  const end = parts[parts.length - 1]?.trim()
  if (!end || /ongoing/i.test(end)) return "Today"
  return end
}

const careerTimelineGrid =
  "grid grid-cols-[4.25rem_0.75rem_minmax(0,1fr)] items-start gap-x-3 md:grid-cols-[5.5rem_0.75rem_minmax(0,1fr)] md:gap-x-4"
const careerTimelineLine = "left-[5.375rem] md:left-[6.875rem]"
const careerExpandedPanel =
  "rounded-2xl border border-zinc-200/60 bg-white p-5 text-zinc-900 md:p-6 dark:border-zinc-200/60 dark:bg-white dark:text-zinc-900"

const companyLogos = [
  { name: "Knightec", src: "/Images/bio/Knightec logo.png" },
  { name: "Scania", src: "/Images/Scania_Logo.svg" },
  { name: "Medela", src: "/Images/bio/Medela-squared-removebg-preview.png" },
  { name: "KoGaMa", src: "/Images/bio/KoGaMa_-_Logo.png" },
  { name: "Visma", src: "/Images/bio/Visma_logo_bio.png" },
  { name: "Zeekr", src: "/Images/bio/27e270dd6bc23f1a364299387c3c8e66.avif" },
] as const

const largerCompanyLogos = new Set(["Medela", "Visma", "Zeekr"])
function careerBadgeClass(isDark: boolean) {
  return cn(
    "shrink-0 px-2 py-0.5 text-xs font-medium transition-colors",
    isDark
      ? "border-white/30 bg-white/15 text-white/90 hover:bg-white/20"
      : "border-zinc-400/60 bg-black/8 text-zinc-800 hover:bg-black/12",
  )
}

function CompaniesCard() {
  return (
    <article
      className={cn(
        tileClass,
        "bg-white ring-1 ring-black/[0.04] hover:translate-y-[-1px] dark:bg-[#1d1d1f] dark:ring-white/[0.08]",
      )}
    >
      <div className="relative z-10 flex h-full min-h-0 flex-col px-5 pb-4 pt-5 md:px-6 md:pb-5 md:pt-6">
        <div className="shrink-0 border-b border-black/[0.06] pb-3 md:pb-4 dark:border-white/[0.08]">
          <h2
            className={cn(
              display.className,
              "text-[clamp(1.25rem,2.4vw,1.75rem)] uppercase leading-[0.95] tracking-[0.02em] text-[#1d1d1f] dark:text-[#f5f5f7]",
            )}
          >
            Companies
          </h2>
        </div>

        <div className="mt-3 grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-2.5 md:mt-4 md:gap-3">
          {companyLogos.map((logo) => (
            <div
              key={logo.name}
              className="group relative flex h-full min-h-[3.25rem] items-center justify-center p-2 transition-transform duration-200 hover:scale-[1.05] sm:min-h-[3.75rem] md:p-3 lg:min-h-[4.25rem]"
              title={logo.name}
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={largerCompanyLogos.has(logo.name) ? 112 : 96}
                height={largerCompanyLogos.has(logo.name) ? 112 : 96}
                className={cn(
                  "relative z-10 w-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-transform duration-200 group-hover:scale-105",
                  largerCompanyLogos.has(logo.name)
                    ? "h-12 max-w-[6rem] sm:h-14 md:h-16 md:max-w-[7.5rem] lg:h-[4.5rem] lg:max-w-[8rem]"
                    : "h-11 max-w-[5.5rem] sm:h-12 md:h-14 md:max-w-[6.5rem] lg:h-16 lg:max-w-[7rem]",
                )}
              />
            </div>
          ))}
        </div>
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
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(bioLinks.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

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
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <a
            href={`mailto:${bioLinks.email}`}
            className="text-[13px] font-medium text-white underline-offset-2 transition-colors hover:underline"
          >
            {bioLinks.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            aria-label="Copy email address"
          >
            {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
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
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 px-5 pt-5 md:px-6 md:pt-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f]/[0.07] ring-1 ring-black/[0.08] dark:bg-white/[0.12] dark:ring-white/[0.12]">
            <MapPin
              className="size-4 text-[#1d1d1f] dark:text-[#f5f5f7]"
              strokeWidth={2.25}
              aria-hidden
            />
          </span>
          <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#1d1d1f] dark:text-[#f5f5f7]">
            {bioProfile.location}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={bioLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/10 px-3 py-1 text-[11px] font-medium text-[#1d1d1f] transition-colors hover:bg-[#1d1d1f] hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-[#1d1d1f]"
          >
            LinkedIn
          </a>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2 px-5 py-4 md:px-6 md:py-5">
        {bioProfile.lead.map((line) => (
          <p
            key={line}
            className="text-[clamp(1rem,1.8vw,1.25rem)] font-semibold leading-[1.35] tracking-[-0.02em] text-[#1d1d1f] dark:text-[#f5f5f7]"
          >
            {line}
          </p>
        ))}
      </div>

      <footer className="shrink-0 border-t border-black/[0.06] px-5 py-3.5 md:px-6 dark:border-white/[0.08]">
        <div className="flex min-w-0 flex-wrap gap-2">
          {bioSkillPillars.map((skill) => (
            <span
              key={skill.title}
              className="rounded-full border border-black/10 px-3 py-1 text-[11px] font-medium text-[#1d1d1f] dark:border-white/15 dark:text-[#f5f5f7]"
            >
              {skill.title}
            </span>
          ))}
        </div>
      </footer>
    </article>
  )
}

function EducationHeroCard() {
  return (
    <article
      className={cn(tileClass, "hover:translate-y-[-2px]")}
      style={{ background: educationGradient }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_35%,rgba(255,255,255,0.22)_0%,transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-0 flex-col px-5 pb-4 pt-5 md:px-6 md:pb-5 md:pt-6">
        <div className="shrink-0 border-b border-white/25 pb-3 md:pb-4">
          <h2
            className={cn(
              display.className,
              "text-[clamp(1.25rem,2.4vw,1.75rem)] uppercase leading-[0.95] tracking-[0.02em] text-white",
            )}
          >
            Education
          </h2>
        </div>

        <div className="mt-3 flex min-h-0 flex-1 flex-col justify-center gap-1 md:mt-4">
          <p className="text-[14px] font-medium leading-snug text-white/95 md:text-[15px]">
            MSc Information Engineering
          </p>
          <p className="text-[14px] font-medium leading-snug text-white/95 md:text-[15px]">
            B.Tech Electronics
          </p>
        </div>
      </div>
    </article>
  )
}

/* ════════════════════════════════════════
   LOWER SECTION COMPONENTS
════════════════════════════════════════ */

function CareerProjectThumbnail({
  project,
  isDark,
}: {
  project: BioCareerProject
  isDark: boolean
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = project.image && !imageFailed

  const cardBody = (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        {showImage ? (
          <Image
            src={project.image!}
            alt={project.imageAlt ?? project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                project.gradient ??
                "linear-gradient(145deg, #334155 0%, #0f172a 100%)",
            }}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-3 md:p-3.5">
        <p
          className={cn(
            "text-sm font-semibold leading-snug md:text-[15px]",
            isDark ? "text-white" : "text-zinc-900",
          )}
        >
          {project.title}
        </p>
        <p
          className={cn(
            "mt-1.5 line-clamp-3 text-xs leading-relaxed md:text-[13px]",
            isDark ? "text-white/70" : "text-zinc-600",
          )}
        >
          {project.description}
        </p>
        {project.href ? (
          <span
            className={cn(
              "mt-auto flex items-center gap-1 pt-3 text-xs font-medium transition-colors",
              isDark
                ? "text-white/60 group-hover:text-white"
                : "text-zinc-500 group-hover:text-zinc-900",
            )}
          >
            View project
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        ) : null}
      </div>
    </>
  )

  const cardClass = cn(
    "group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
    isDark
      ? "border-zinc-800/60 bg-zinc-900/80 hover:border-zinc-700"
      : "border-zinc-200/80 bg-white hover:border-zinc-300",
    project.href && "cursor-pointer",
  )

  if (project.href) {
    return (
      <Link href={project.href} className={cardClass}>
        {cardBody}
      </Link>
    )
  }

  return <article className={cardClass}>{cardBody}</article>
}

function CareerExperienceItem({
  job,
  index,
}: {
  job: (typeof bioExperience)[number]
  index: number
}) {
  const isDark = index % 2 === 0
  const number = String(index + 1).padStart(2, "0")
  const preview = [job.location, job.period].filter(Boolean).join(" · ")
  const timelineLabel = getCareerTimelineLabel(job.period, index, job.timelineDate)

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
                {job.role}
              </h2>
            </div>

            <div className="flex items-center gap-2.5 pl-8">
              <Badge variant="outline" className={careerBadgeClass(isDark)}>
                {job.company}
              </Badge>
              {job.companyDescriptor ? (
                <Badge variant="outline" className={careerBadgeClass(isDark)}>
                  {job.companyDescriptor}
                </Badge>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 pl-8 pt-1">
              <div className={cn("h-px w-full", isDark ? "bg-white/10" : "bg-black/10")} />
              <p
                className={cn(
                  "text-sm leading-relaxed",
                  isDark ? "text-white/90" : "text-zinc-800",
                )}
              >
                {preview}
              </p>
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
    <div className={careerTimelineGrid}>
      <p
        className={cn(
          "pt-6 text-right text-[10px] font-semibold uppercase leading-none tracking-[0.06em] tabular-nums md:text-[11px]",
          isDark ? "text-[#86868b]" : "text-[#86868b]",
        )}
      >
        {timelineLabel}
      </p>

      <div className="relative z-10 flex justify-center pt-6">
        <div
          className={cn(
            "h-3 w-3 shrink-0 rounded-full border-2",
            isDark ? "border-zinc-900 bg-white" : "border-zinc-50 bg-black",
          )}
          aria-hidden
        />
      </div>

      <div className="min-w-0">
        <Collapsible defaultOpen={index === 0} className="group/collapsible">
          <CollapsibleTrigger className="w-full text-left">{headerCard}</CollapsibleTrigger>

          <CollapsibleContent className="mt-8 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <div className="space-y-4">
              <div className={careerExpandedPanel}>
                <ul className="space-y-3">
                  {(job.responsibilities ?? job.highlights).map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-zinc-700 md:text-[15px]"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full"
                        style={{ background: companyColors[job.company] ?? fog }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {job.projects && job.projects.length > 0 ? (
                <section className={careerExpandedPanel}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                    {job.company} Assignments
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
                    {job.projects.map((project) => (
                      <CareerProjectThumbnail
                        key={project.title}
                        project={project}
                        isDark={false}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

function ExperienceSection() {
  return (
    <div className="relative space-y-8">
      <div
        className={cn(
          "pointer-events-none absolute top-0 bottom-0 z-0 w-px bg-black/10 dark:bg-white/15",
          careerTimelineLine,
        )}
      />
      {bioExperience.map((job, index) => (
        <CareerExperienceItem key={`${job.company}-${job.period}`} job={job} index={index} />
      ))}
    </div>
  )
}

function SkillDetailModal({
  skill,
  isOpen,
  onClose,
}: {
  skill: BioSkillPillar | null
  isOpen: boolean
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!mounted || !isOpen || !skill) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xl" />
      <div
        className="relative z-10 flex max-h-[min(90vh,32rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-zinc-200/60 bg-white shadow-2xl shadow-black/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200/60 px-6 py-5">
          <h2 className="font-sans text-xl font-bold tracking-tight text-[#1d1d1f] md:text-2xl">
            {skill.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-zinc-200/80 bg-white text-zinc-700 transition-colors hover:bg-zinc-50"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="overflow-y-auto">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100">
            <Image
              src={skill.image}
              alt={skill.imageAlt ?? skill.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 32rem"
            />
          </div>
          <div className="px-6 py-5">
            <p className="text-[15px] leading-relaxed text-zinc-600 md:text-base">{skill.description}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function SkillCard({
  skill,
  onOpen,
}: {
  skill: BioSkillPillar
  onOpen: () => void
}) {
  return (
    <article className="overflow-hidden rounded-[18px] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.07)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
      <button
        type="button"
        onClick={onOpen}
        className="group relative block w-full overflow-hidden text-left"
      >
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={skill.image}
            alt={skill.imageAlt ?? skill.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/5" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5">
            <h3 className="font-sans text-[clamp(0.95rem,1.5vw,1.15rem)] font-bold leading-tight tracking-tight text-white">
              {skill.title}
            </h3>
            <ArrowRight className="size-4 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </button>
    </article>
  )
}

function SkillsGrid() {
  const [selectedSkill, setSelectedSkill] = useState<BioSkillPillar | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {bioSkillPillars.map((skill) => (
          <SkillCard
            key={skill.title}
            skill={skill}
            onOpen={() => setSelectedSkill(skill)}
          />
        ))}
      </div>
      <SkillDetailModal
        skill={selectedSkill}
        isOpen={selectedSkill !== null}
        onClose={() => setSelectedSkill(null)}
      />
    </>
  )
}

function ToolsEduRow() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ListPanelCard title="Tools" headerIcon={Wrench}>
        <ul className="divide-y divide-zinc-100 dark:divide-white/10">
          {bioTools.map((tool) => (
            <ListPanelRow
              key={tool.name}
              title={tool.name}
              subtitle={tool.note}
            />
          ))}
        </ul>
      </ListPanelCard>

      <ListPanelCard title="Education" headerIcon={GraduationCap}>
        <ul className="divide-y divide-zinc-100 dark:divide-white/10">
          {bioEducation.map((entry) => (
            <ListPanelRow
              key={entry.school}
              title={entry.degree}
              subtitle={entry.school}
              badge={entry.period}
            />
          ))}
        </ul>
      </ListPanelCard>
    </div>
  )
}

function ListPanelCard({
  title,
  headerIcon: HeaderIcon,
  children,
}: {
  title: string
  headerIcon: LucideIcon
  children: React.ReactNode
}) {
  return (
    <div className="rounded-[24px] border border-zinc-200/80 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#1d1d1f]">
      <div className="mb-1 flex items-center gap-2 border-b border-zinc-100 pb-4 dark:border-white/10">
        <HeaderIcon className="size-4 text-zinc-700 dark:text-zinc-300" />
        <h3 className="text-[15px] font-semibold text-[#1d1d1f] dark:text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function ListPanelRow({
  title,
  subtitle,
  badge,
}: {
  title: string
  subtitle: string
  badge?: string
}) {
  return (
    <li className="flex items-center gap-3 py-3.5">
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold leading-snug text-[#1d1d1f] dark:text-white">
          {title}
        </p>
        <p className="truncate text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
          {subtitle}
        </p>
      </div>
      {badge ? (
        <span className="shrink-0 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
          {badge}
        </span>
      ) : null}
    </li>
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

        <BioPageSection
          id="experience"
          eyebrow="Career"
          title="Experience"
          description="Roles across automotive, biotech, gaming, and fintech."
        >
          <ExperienceSection />
        </BioPageSection>

        <BioPageSection id="capabilities" eyebrow="What I do" title="Capabilities">
          <SkillsGrid />
        </BioPageSection>

        <BioPageSection
          id="background"
          eyebrow="Background"
          title="Tools & education"
          className="pb-4"
        >
          <ToolsEduRow />
        </BioPageSection>
      </main>
    </PortfolioLayout>
  )
}
