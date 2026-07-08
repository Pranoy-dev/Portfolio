import { CaseStudiesGrid } from "@/components/portfolio/case-studies-grid"
import { PageShell } from "@/components/portfolio/page-shell"
import { pageMetadata } from "@/lib/site-metadata"

export const metadata = pageMetadata(
  "Case studies",
  "Selected work across automotive, in-cabin experience, and fintech.",
)

export default function InterestPage() {
  return (
    <PageShell>
      <header className="space-y-3 border-b border-border/50 pb-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
          Projects
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Case studies
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Selected work across automotive, in-cabin experience, and fintech.
        </p>
      </header>
      <CaseStudiesGrid />
    </PageShell>
  )
}
