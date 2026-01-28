"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
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
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowRight, FileText, Code, Layout, Play, ChevronDown } from "lucide-react"
import Image from "next/image"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// Overview data
const headline = "Design is all about tradeoffs. Hide too much and people get lost. Show too much and nothing is clear.\n\nThis portfolio shows how I work: I break complexity into clear steps and reveal details only when they matter. I built it in Next.js using cursor."

const credibilityStrip = {
  title: "I am a Senior UX/UI Designer building tools and platforms across automotive, gaming, and fintech. I have been designing for around 7 years, and I spend most of my time solving real-world problems, from building a simple app to track my groceries to coding an agentic communication layer for modern work. I genuinely love both design and engineering.",
  skills: ["Complex systems UX", "User research", "UI design + front-end build", "Rapid AI prototyping"]
}

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
    imagePattern: "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.3), transparent 50%)",
    image: "/Images/Conversion.jpg"
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
    imagePattern: "radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.3), transparent 50%), radial-gradient(circle at 70% 70%, rgba(20, 184, 166, 0.3), transparent 50%)",
    image: "/Images/DDW.jpg"
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
    imagePattern: "radial-gradient(circle at 25% 60%, rgba(245, 158, 11, 0.3), transparent 50%), radial-gradient(circle at 75% 30%, rgba(249, 115, 22, 0.3), transparent 50%)",
    image: "/Images/Banking.jpg"
  }
]

const howIWork = [
  "Start with constraints and decision log",
  "Prototype to kill risk early",
  "Ship, measure, iterate",
  "Systems > screens"
]

function DynamicHeader() {
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
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}

export default function Home() {
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHeadlineExpanded, setIsHeadlineExpanded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])



  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-x-hidden">
        <DynamicHeader />
        
        <div 
          className={cn(
            "flex flex-1 flex-col gap-12 p-6 md:p-12 max-w-5xl mx-auto mt-20 w-full min-w-0 transition-opacity duration-300 ease-in-out transition-transform duration-300 ease-in-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {/* 1. Headline */}
          <section className="max-w-3xl">
            <div className="text-2xl md:text-3xl font-semibold tracking-tight leading-relaxed space-y-6 text-foreground">
              <p className="text-foreground inline-flex items-start gap-3 flex-wrap">
                <span>{headline.split('\n\n')[0]}</span>
                {!isHeadlineExpanded && (
                  <button
                    onClick={() => setIsHeadlineExpanded(true)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group/btn shrink-0 -mt-0.5"
                    aria-label="Read more"
                  >
                    <span>Read more</span>
                    <ChevronDown className="h-4 w-4 transition-all duration-300 ease-in-out" />
                  </button>
                )}
              </p>
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-500 ease-in-out",
                  isHeadlineExpanded ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-muted-foreground inline-flex items-start gap-3 flex-wrap">
                  <span>{headline.split('\n\n')[1]}</span>
                  {isHeadlineExpanded && (
                    <button
                      onClick={() => setIsHeadlineExpanded(false)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group/btn shrink-0 -mt-0.5"
                      aria-label="Read less"
                    >
                      <span>Read less</span>
                      <ChevronDown className="h-4 w-4 transition-all duration-300 ease-in-out rotate-180" />
                    </button>
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* 2. Case Studies */}
          <Collapsible 
            defaultOpen={false} 
            className="group/collapsible w-full"
            onOpenChange={(open) => {
              setIsCaseStudiesOpen(open)
            }}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full py-4 group/trigger border-b border-border/50 hover:border-border transition-colors">
                <h2 className="text-2xl font-semibold">Case studies</h2>
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-all duration-300 group-data-[state=open]/collapsible:rotate-180 group-hover/trigger:scale-110 group-hover/trigger:text-foreground shrink-0 animate-pulse-subtle" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up will-change-[height] w-full">
              <div className="pt-6">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background via-muted/30 to-background border border-border/40 p-8 md:p-10 backdrop-blur-xl shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
                  <div className="relative z-10">
                    <div className="grid gap-5 md:grid-cols-3">
              {caseStudies.map((study) => (
                <div
                  key={study.id}
                  onClick={() => {
                    // Add fade-out animation to the main content
                    const mainContent = document.querySelector('main') as HTMLElement
                    const sidebarInset = document.querySelector('[class*="sidebar-inset"]') as HTMLElement
                    const targetElement = sidebarInset || mainContent
                    
                    if (targetElement) {
                      targetElement.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
                      targetElement.style.opacity = '0'
                      targetElement.style.transform = 'translateY(8px)'
                    }
                    
                    // Navigate after fade-out animation
                    setTimeout(() => {
                      router.push(`/case-study/${study.id}`)
                    }, 300)
                  }}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${study.gradient} border ${study.borderColor} hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 hover:-translate-y-1 flex flex-col cursor-pointer`}
                >
                  {/* Image Section */}
                  <div 
                    className={`relative h-48 bg-gradient-to-br ${study.imageGradient} overflow-hidden`}
                  >
                    {/* Background image with overlay */}
                    <Image
                      src={study.image}
                      alt={study.problem}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Subtle gradient overlay - reduced opacity */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10"
                    />
                    {/* Shimmer effect - reduced opacity */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-5 relative z-10 flex-1 flex flex-col">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Problem</p>
                      <p className="text-base font-semibold leading-snug text-foreground">{study.problem}</p>
                    </div>
                    <div className="pt-2 border-t border-border/20">
                      <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Role</p>
                      <p className="text-sm text-foreground/80">{study.role}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-3 mt-auto">
                      {study.tags.map((tag) => (
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

                  {/* Premium gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${study.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                </div>
              ))}
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* 3. Who is Pranoy? */}
          <Collapsible defaultOpen={false} className="group/collapsible w-full">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full py-4 border-b border-border/50 hover:border-border transition-colors group/trigger">
                <h2 className="text-2xl font-semibold">Who is Pranoy?</h2>
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-all duration-300 group-data-[state=open]/collapsible:rotate-180 group-hover/trigger:scale-110 group-hover/trigger:text-foreground shrink-0 animate-pulse-subtle" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up will-change-[height] w-full">
              <div className="pt-6">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background via-muted/30 to-background border border-border/40 p-8 md:p-10 backdrop-blur-xl shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
                  
                  <div className="space-y-6 relative z-10">
                    <p className="text-lg font-medium text-foreground leading-relaxed tracking-tight">
                      {credibilityStrip.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-border/20">
                      {credibilityStrip.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="px-4 py-2 text-xs font-medium rounded-full bg-background/80 backdrop-blur-sm border-border/30 hover:bg-background hover:border-border/50 hover:shadow-sm transition-all duration-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* 4. How I Work */}
          <Collapsible defaultOpen={false} className="group/collapsible">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full py-4 border-b border-border/50 hover:border-border transition-colors group/trigger">
                <h2 className="text-2xl font-semibold">How I Work?</h2>
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-all duration-300 group-data-[state=open]/collapsible:rotate-180 group-hover/trigger:scale-110 group-hover/trigger:text-foreground shrink-0 animate-pulse-subtle" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up will-change-[height]">
              <div className="pt-6">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background via-muted/30 to-background border border-border/40 p-8 md:p-10 backdrop-blur-xl shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
                  <div className="relative z-10">
                    <div className="grid gap-4 md:grid-cols-2">
              {howIWork.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <p className="text-base leading-relaxed">{item}</p>
                </div>
              ))}
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* 7. CTA */}
          <section className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1 sm:flex-initial">
              Open a case study
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="flex-1 sm:flex-initial">
              Contact
            </Button>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
