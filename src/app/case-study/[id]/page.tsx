"use client"

import { useParams, useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { EsperantoCaseStudy } from "@/components/case-study-esperanto"
import { esperantoCaseStudies } from "@/data/esperanto-case-studies"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, FileText, Code, Play, CheckCircle2, TrendingUp, Users, Globe, Clock, Zap, Shield, BarChart3, ChevronDown } from "lucide-react"
import Image from "next/image"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// Decision Log Component - Apple-inspired
function DecisionLog({ decision, alternatives, whyThis, risk, result, index }: {
  decision: string
  alternatives: string[]
  whyThis: string
  risk: string
  result: string
  index: number
}) {
  return (
    <div className="relative">
      {/* Timeline connector */}
      {index > 0 && (
        <div className="absolute left-8 top-0 bottom-full w-0.5 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent h-12" />
      )}
      
      <Card className="relative rounded-3xl border-l-4 border-l-primary/50 bg-white/60 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
        <CardContent className="p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <span className="text-lg font-bold text-primary">{index + 1}</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Decision</p>
              <h4 className="text-xl font-bold tracking-tight mb-4">{decision}</h4>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Alternatives Considered</p>
              <ul className="space-y-2">
                {alternatives.map((alt, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>{alt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Why This</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{whyThis}</p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 pt-4 border-t border-border/20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Risk</p>
              <p className="text-sm text-foreground/80">{risk}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Result</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm font-semibold">{result}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Stat Card Component
function StatCard({ value, label, icon: Icon, description }: {
  value: string
  label: string
  icon: any
  description?: string
}) {
  return (
    <Card className="rounded-3xl bg-white/60 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="text-5xl md:text-6xl font-bold tracking-tight mb-2 text-foreground">
          {value}
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
          {label}
        </p>
        {description && (
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

// Bento Card Component
function BentoCard({ title, description, image, span = 1, icon: Icon }: {
  title: string
  description: string
  image?: string
  span?: 1 | 2
  icon?: any
}) {
  return (
    <Card className={`rounded-3xl bg-white/60 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] overflow-hidden ${span === 2 ? 'md:col-span-2' : ''}`}>
      {image && (
        <div className="relative h-48 md:h-64 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}
      <CardContent className="p-8">
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <h3 className="text-2xl font-bold tracking-tight mb-3">{title}</h3>
        <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

// Accordion Section Component - Apple-Inspired Design
function AccordionSection({ 
  title, 
  preview, 
  children, 
  defaultOpen = false,
  icon: Icon,
  badge
}: { 
  title: string
  preview: string
  children: React.ReactNode
  defaultOpen?: boolean
  icon?: any
  badge?: string
}) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
      <CollapsibleTrigger className="w-full text-left">
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-border/50 hover:border-border hover:bg-white/90 transition-all duration-300 hover:shadow-md overflow-hidden">
          <div className="px-5 py-4 md:px-6 md:py-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {Icon && (
                  <div className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-200">
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
                      {title}
                    </h3>
                    {badge && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                        {badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2">
                    {preview}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-300 ease-out group-data-[state=open]/collapsible:rotate-180" />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
        <div className="pt-4 px-5 md:px-6 pb-6 md:pb-8">
          <div className="border-t border-border/30 pt-6">
            {children}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// Case study data
const caseStudies = [
  {
    id: 1,
    problem: "Global software updates create decision paralysis.",
    role: "Lead Designer",
    impact: "40% faster decisions",
    tags: ["governance", "traceability", "global scale"],
    gradient: "from-blue-500/10 via-purple-500/5 to-pink-500/10",
    borderColor: "border-blue-500/20",
    hoverGradient: "from-blue-500/15 via-purple-500/10 to-pink-500/15",
    imageGradient: "from-blue-500/20 via-purple-500/15 to-pink-500/20",
    image: "/Images/Conversion.jpg",
    title: "Global Software Updates",
    description: "A comprehensive case study about solving decision paralysis in global software update processes.",
    // Detailed case study content
    heroSummary: {
      title: "Scania Conversion Systems",
      subtitle: "Research and development of Internal software",
      impact: "",
      problem: "Engineering teams across 12 regions couldn't decide which software updates to approve, causing delays and inconsistent rollouts.",
      role: "Lead Designer — Owned UX strategy, research, IA, and design system integration",
      context: {
        product: "Enterprise Software Governance Platform",
        users: "Regional engineering leads, compliance officers, product managers (150+ users)",
        timeline: "6 months (Q2–Q3 2024)",
        team: "1 designer (me), 2 engineers, 1 PM, 1 researcher"
      },
      constraints: [
        "NDA restrictions — cannot show actual product screens",
        "Legacy system integration — must work with 15-year-old backend",
        "Multi-language support — 8 languages required",
        "Strict compliance — audit trail mandatory for all decisions"
      ]
    },
    stats: [
      { value: "6", label: "User Roles", icon: Users, description: "Six different User roles" },
      { value: "6", label: "Continents", icon: Globe, description: "Used in 6 continents" },
      { value: "100k", label: "Updates", icon: Zap, description: "100k software updates per month" }
    ],
    framing: {
      goal: "Enable confident, fast decisions on software updates with full traceability",
      nonGoals: [
        "Replacing the entire governance system",
        "Automating all decisions (human oversight required)",
        "Building new backend infrastructure"
      ],
      successMetrics: [
        "Decision time < 2 days (from 2.5 days baseline)",
        "90%+ user satisfaction score",
        "Zero compliance violations",
        "80%+ adoption within 3 months"
      ],
      keyTradeoffs: [
        "Speed vs. Detail: Prioritized quick access to key info over comprehensive documentation",
        "Flexibility vs. Structure: Chose structured workflows over free-form processes",
        "Global vs. Local: Standardized core flows while allowing regional customization"
      ]
    },
    signals: {
      learnings: [
        "Users spent 60% of time searching for context, not making decisions",
        "Decision paralysis came from missing information, not too much information",
        "Regional teams had different mental models of the approval process"
      ],
      evidence: [
        "12 user interviews across 4 regions",
        "Support ticket analysis: 340 tickets about 'missing context' in 6 months",
        "Hotjar session recordings showing users clicking back/forth 8+ times per decision",
        "Workshop with 8 regional leads revealed 5 different approval workflows"
      ]
    },
    solutions: {
      explored: [
        "Option A: Enhanced search and filters (quick win, limited impact)",
        "Option B: Contextual decision cards with all info in one place (chosen)",
        "Option C: AI-powered recommendations (too risky, compliance concerns)"
      ],
      decisionLogic: "Option B provided the best balance: all context visible at decision point, clear action paths, and maintained human control. Option A was too incremental. Option C introduced too much risk for compliance-sensitive workflows."
    },
    design: {
      flows: [
        "Decision card view — all context, stakeholders, and actions in one place",
        "Role-based dashboard — different views for engineers vs. compliance officers",
        "Approval workflow — clear steps with progress indicators"
      ],
      keyScreens: [
        "Contextual decision cards with embedded risk assessment",
        "Stakeholder timeline showing who needs to approve and when",
        "Comparison view for similar past decisions"
      ],
      edgeCases: [
        "Multi-region approvals requiring different compliance rules",
        "Urgent updates needing expedited review",
        "Conflicting stakeholder feedback"
      ],
      systemThinking: [
        "Reusable decision card component (used across 8 workflows)",
        "Consistent status indicators (pending, approved, rejected, escalated)",
        "Design tokens for risk levels (low/medium/high/critical)",
        "Responsive patterns for mobile review (30% of users)"
      ]
    },
    delivery: {
      handoffApproach: "Component library in Figma + Storybook, detailed interaction specs, and weekly syncs with engineers",
      shipped: [
        "Decision card interface",
        "Role-based dashboards",
        "Approval workflow engine",
        "Mobile-responsive review interface"
      ],
      notShipped: [
        "AI recommendations (deferred to Phase 2)",
        "Advanced analytics dashboard (out of scope)"
      ],
      collaboration: "Worked directly with engineers on component API design, conducted design reviews during sprints, and created interactive prototypes for complex interactions"
    },
    results: {
      impact: "40% faster decisions (2.5 days → 1.5 days average), 92% user satisfaction, zero compliance violations, 85% adoption in 3 months",
      metrics: [
        { value: "40%", label: "Faster Decisions", change: "+40%" },
        { value: "92%", label: "User Satisfaction", change: "+22%" },
        { value: "0", label: "Compliance Violations", change: "Maintained" },
        { value: "85%", label: "Adoption Rate", change: "+5%" }
      ],
      nextSteps: [
        "Add AI-powered context suggestions (Phase 2)",
        "Expand to hardware update approvals",
        "Build analytics dashboard for decision patterns"
      ]
    },
    decisionLogs: [
      {
        decision: "Use contextual cards instead of traditional list view",
        alternatives: ["Enhanced search/filters", "AI recommendations", "Traditional table view"],
        whyThis: "Cards surface all context at decision point, reducing cognitive load and search time",
        risk: "Cards might feel cluttered with too much info",
        result: "Users reported 60% less time searching for context, cards well-received"
      },
      {
        decision: "Standardize core workflow, allow regional customization",
        alternatives: ["Fully standardized", "Fully customizable per region"],
        whyThis: "Balance between global consistency and local needs, reduces maintenance overhead",
        risk: "Customization might create inconsistencies",
        result: "85% adoption rate, regional teams happy with customization options"
      },
      {
        decision: "Mobile-first review interface",
        alternatives: ["Desktop-only", "Responsive desktop design"],
        whyThis: "30% of users review on mobile, critical for urgent approvals",
        risk: "Complex workflows might be hard on mobile",
        result: "Mobile usage increased to 45%, users appreciate on-the-go access"
      }
    ],
    artifacts: [
      { label: "Interactive Prototype", icon: Play, url: "#" },
      { label: "Decision Flow Diagram", icon: FileText, url: "#" },
      { label: "Research Snapshot", icon: FileText, url: "#" },
      { label: "Design System Tokens", icon: Code, url: "#" }
    ]
  },
  {
    id: 2,
    problem: "Ambient lighting experience lags behind competitors.",
    role: "Senior UX Designer",
    impact: "4 concepts shipped",
    tags: ["0→1", "rapid prototyping", "visual UX"],
    gradient: "from-emerald-500/10 via-teal-500/5 to-cyan-500/10",
    borderColor: "border-emerald-500/20",
    hoverGradient: "from-emerald-500/15 via-teal-500/10 to-cyan-500/15",
    imageGradient: "from-emerald-500/20 via-teal-500/15 to-cyan-500/20",
    image: "/Images/DDW.jpg",
    title: "Ambient Lighting Experience",
    description: "Rapid prototyping and visual UX improvements for ambient lighting systems."
  },
  {
    id: 3,
    problem: "Entrepreneurs do not trust digital banks.",
    role: "UX Designer",
    impact: "3 products shipped",
    tags: ["fintech", "onboarding", "trust UX", "core flows"],
    gradient: "from-amber-500/10 via-orange-500/5 to-red-500/10",
    borderColor: "border-amber-500/20",
    hoverGradient: "from-amber-500/15 via-orange-500/10 to-red-500/15",
    imageGradient: "from-amber-500/20 via-orange-500/15 to-red-500/20",
    image: "/Images/Banking.jpg",
    title: "Digital Banking Trust",
    description: "Building trust through improved onboarding and core user flows in fintech."
  }
]

// Dynamic Header Component
function DynamicHeader({ caseStudyTitle }: { caseStudyTitle: string }) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[left] duration-200 ease-linear",
        isCollapsed 
          ? "md:left-[var(--sidebar-width-icon)]" 
          : "md:left-[var(--sidebar-width)]"
      )}
    >
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="flex-1">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Overview</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{caseStudyTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}

export default function CaseStudyPage() {
  const params = useParams()
  const router = useRouter()
  const caseStudyId = parseInt(params.id as string)
  const caseStudy = caseStudies.find(study => study.id === caseStudyId)

  if (!caseStudy) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DynamicHeader caseStudyTitle="Case Study Not Found" />
          <div className="flex flex-1 flex-col gap-12 p-6 md:p-12 max-w-5xl mx-auto mt-20 w-full min-w-0">
            <p>Case study not found</p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  // Check if this is case study 1 or 2 - use Esperanto style
  const esperantoCaseStudy = esperantoCaseStudies.find(study => study.id === caseStudyId)
  if ((caseStudyId === 1 || caseStudyId === 2) && esperantoCaseStudy) {
    return <EsperantoCaseStudy project={esperantoCaseStudy} />
  }

  // Check if this is the detailed case study (id: 1)
  const isDetailedCaseStudy = caseStudy.id === 1 && caseStudy.heroSummary

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-x-hidden">
        <DynamicHeader caseStudyTitle={caseStudy.title} />
        
        <div className="flex flex-1 flex-col gap-20 p-6 md:p-12 lg:p-16 max-w-7xl mx-auto mt-4 md:mt-6 w-full min-w-0 pb-32">
          {isDetailedCaseStudy ? (
            // Redesigned detailed case study view with Accordions
            <div className="space-y-4">
              {/* Hero Section - Always Visible */}
              <section className="space-y-6">
                {/* Hero - Compact Layout */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Image - Smaller, Left Side */}
                  <div className={`relative h-[200px] md:h-[240px] rounded-2xl overflow-hidden bg-gradient-to-br ${caseStudy.imageGradient} border ${caseStudy.borderColor} shadow-lg`}>
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.problem}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/5 to-transparent" />
                  </div>
                  
                  {/* Title & Subtitle - Right Side */}
                  <div className="md:col-span-2 flex flex-col justify-center space-y-3">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                      {caseStudy.heroSummary.title}
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {caseStudy.heroSummary.subtitle}
                    </p>
                  </div>
                </div>
              </section>

              {/* Stats - Accordion */}
              <AccordionSection
                title="Key Metrics"
                preview={`${caseStudy.stats?.map(s => `${s.value} ${s.label}`).join(' • ') || ''}`}
                icon={BarChart3}
                badge="3 Metrics"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {caseStudy.stats?.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                  ))}
                </div>
              </AccordionSection>

              {/* The Problem - Accordion */}
              <AccordionSection
                title="The Problem"
                preview={caseStudy.heroSummary.problem}
                icon={Shield}
                badge="Challenge"
              >
                <div className="space-y-6">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {caseStudy.heroSummary.problem}
                  </p>
                  
                  {/* Before/After Visual */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="rounded-2xl bg-red-50/50 dark:bg-red-950/20 border-red-200/50 dark:border-red-900/30">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <h3 className="text-lg font-bold">Before</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>2.5 days average decision time</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>60% of time spent searching for context</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>5 different approval workflows across regions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>340 support tickets about missing context</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-900/30">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-3 h-3 rounded-full bg-emerald-500" />
                          <h3 className="text-lg font-bold">After</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                            <span>1.5 days average decision time (40% faster)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                            <span>All context visible at decision point</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                            <span>Standardized workflow with regional customization</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                            <span>92% user satisfaction score</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </AccordionSection>

              {/* What We Built - Accordion */}
              <AccordionSection
                title="The Solution"
                preview="Contextual decision cards • Role-based dashboards • Mobile interface • Approval workflow"
                icon={Zap}
                badge="4 Features"
              >
                <div className="space-y-6">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    A visual-first approach to decision-making at scale
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <BentoCard
                      span={2}
                      title="Contextual Decision Cards"
                      description="All context, stakeholders, and actions visible at the decision point. Reduced search time by 60%."
                      image={caseStudy.image}
                      icon={Shield}
                    />
                    <BentoCard
                      title="Role-Based Dashboards"
                      description="Different views for engineers vs. compliance officers. Tailored to each user's needs."
                      icon={Users}
                    />
                    <BentoCard
                      title="Approval Workflow"
                      description="Clear steps with progress indicators. Visual timeline showing who needs to approve and when."
                      icon={BarChart3}
                    />
                    <BentoCard
                      title="Mobile Review Interface"
                      description="30% of users review on mobile. Optimized for urgent approvals on-the-go."
                      icon={Zap}
                    />
                  </div>
                </div>
              </AccordionSection>

              {/* Decision Log Timeline - Accordion */}
              {caseStudy.decisionLogs && caseStudy.decisionLogs.length > 0 && (
                <AccordionSection
                  title="Key Decisions"
                  preview={`${caseStudy.decisionLogs.length} major decisions made during design`}
                  icon={FileText}
                  badge={`${caseStudy.decisionLogs.length} Decisions`}
                >
                  <div className="space-y-6 relative pl-8">
                    {caseStudy.decisionLogs.map((log, i) => (
                      <DecisionLog key={i} {...log} index={i} />
                    ))}
                  </div>
                </AccordionSection>
              )}

              {/* Results & Impact - Accordion */}
              <AccordionSection
                title="Results"
                preview={`${caseStudy.results.metrics?.map(m => `${m.value} ${m.label}`).join(' • ') || ''}`}
                icon={TrendingUp}
                badge="Impact"
              >
                <div className="space-y-6">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {caseStudy.results.impact}
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {caseStudy.results.metrics?.map((metric, i) => (
                      <Card key={i} className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                        <CardContent className="p-6 text-center">
                          <div className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-foreground">
                            {metric.value}
                          </div>
                          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                            {metric.label}
                          </p>
                          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                            <TrendingUp className="h-3 w-3" />
                            <span className="text-xs font-semibold">{metric.change}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Next Steps */}
                  <Card className="rounded-2xl bg-muted/30 border">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3">What's Next</h3>
                      <ul className="space-y-2">
                        {caseStudy.results.nextSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <span className="text-primary font-bold">{i + 1}.</span>
                            <span className="text-muted-foreground">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </AccordionSection>

              {/* Artifacts Shelf - Accordion */}
              {caseStudy.artifacts && caseStudy.artifacts.length > 0 && (
                <AccordionSection
                  title="Artifacts"
                  preview={`${caseStudy.artifacts.map(a => a.label).join(' • ')}`}
                  icon={Code}
                  badge={`${caseStudy.artifacts.length} Items`}
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {caseStudy.artifacts.map((artifact, i) => {
                      const Icon = artifact.icon
                      return (
                        <Card key={i} className="rounded-2xl border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
                          <CardContent className="p-6">
                            <a href={artifact.url} className="flex flex-col items-center text-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Icon className="h-6 w-6 text-primary" />
                              </div>
                              <span className="text-sm font-semibold">{artifact.label}</span>
                              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                            </a>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </AccordionSection>
              )}
            </div>
          ) : (
            // Simple case study view for others
            <div className="space-y-16">
              <div className={`relative h-64 md:h-96 rounded-3xl overflow-hidden bg-gradient-to-br ${caseStudy.imageGradient} border ${caseStudy.borderColor}`}>
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.problem}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10" />
              </div>

              <div className="text-center space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                  {caseStudy.title}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                  {caseStudy.description}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="rounded-3xl">
                  <CardContent className="p-8">
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Problem</p>
                    <p className="text-base font-semibold leading-snug text-foreground">{caseStudy.problem}</p>
                  </CardContent>
                </Card>
                <Card className="rounded-3xl">
                  <CardContent className="p-8">
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Role</p>
                    <p className="text-sm text-foreground/80">{caseStudy.role}</p>
                  </CardContent>
                </Card>
                <Card className="rounded-3xl">
                  <CardContent className="p-8">
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Impact</p>
                    <p className="text-lg font-semibold text-primary leading-tight">{caseStudy.impact}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Tags</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {caseStudy.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs font-medium rounded-full px-3 py-1 bg-background/60 backdrop-blur-sm border-border/40 hover:bg-background/80 hover:border-border/60 transition-all"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Card className="rounded-3xl">
                <CardContent className="p-12 text-center">
                  <h2 className="text-2xl font-semibold mb-4">Case Study Details</h2>
                  <p className="text-muted-foreground">
                    Detailed case study content coming soon. This case study is currently being developed.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
