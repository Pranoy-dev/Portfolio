import { CaseStudiesGrid } from "@/components/portfolio/case-studies-grid"
import { PageShell } from "@/components/portfolio/page-shell"

export default function InterestPage() {
  return (
    <PageShell>
      <header className="space-y-2 border-b border-border/50 pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
          Case studies
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Case studies</h1>
        <p className="text-muted-foreground max-w-2xl">
          Selected work across automotive, in-cabin experience, and fintech — problems where
          clarity and trust had to be designed in, not added later.
        </p>
      </header>
      <CaseStudiesGrid />
    </PageShell>
  )
}
