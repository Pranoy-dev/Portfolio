"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { 
  ArrowLeft, 
  ExternalLink, 
  FileText, 
  Code, 
  Play, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Globe, 
  Clock, 
  Zap, 
  Shield, 
  BarChart3,
  Camera,
  Palette,
  Monitor,
  Lightbulb,
  Award,
  Mail,
  ArrowRight,
  ChevronDown
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Scroll Reveal Wrapper Component
function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const { elementRef, isVisible } = useScrollReveal({ threshold: 0.1, rootMargin: "0px 0px -100px 0px" })
  
  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Scroll Indicator Component - Shows only initially before sections are visible
function ScrollIndicator({ sectionsRef }: { sectionsRef?: React.RefObject<HTMLDivElement> }) {
  const [showIndicator, setShowIndicator] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min((scrollTop / scrollHeight) * 100, 100)
      setScrollProgress(progress)
      
      // Hide indicator if user has scrolled significantly
      if (scrollTop > 400) {
        setShowIndicator(false)
      }
    }

    // Use IntersectionObserver to detect when sections container becomes visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Hide indicator when sections become visible
          if (entry.isIntersecting) {
            setShowIndicator(false)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px 0px 0px'
      }
    )

    if (sectionsRef?.current) {
      observer.observe(sectionsRef.current)
    }

    window.addEventListener("scroll", handleScroll)
    
    return () => {
      if (sectionsRef?.current) {
        observer.unobserve(sectionsRef.current)
      }
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sectionsRef])

  if (!showIndicator) return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500">
      <div className="text-xs text-muted-foreground animate-bounce">Scroll</div>
      <div className="w-6 h-10 rounded-full border-2 border-border/50 flex items-start justify-center p-2">
        <div className="w-1 h-3 rounded-full bg-primary/60 animate-pulse" />
      </div>
      <div className="w-1 h-16 bg-border/30 rounded-full overflow-hidden">
        <div 
          className="w-full bg-primary/60 rounded-full transition-all duration-300"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>
    </div>
  )
}

// Collapsible Section Component with Alternating Grey Shades
function CollapsibleSection({ 
  number, 
  title, 
  subtitle, 
  keywords,
  children, 
  defaultOpen = false,
  isLast = false,
  theme = "light" // "light" (lighter grey) or "dark" (darker grey)
}: { 
  number: string
  title: string
  subtitle?: string
  keywords?: string[]
  children: React.ReactNode
  defaultOpen?: boolean
  isLast?: boolean
  theme?: "light" | "dark"
}) {
  const { elementRef, isVisible } = useScrollReveal({ threshold: 0.2 })
  const isDark = theme === "dark"
  
  return (
    <div className="relative">
      {/* Minimal timeline connector */}
      {!isLast && (
        <div className={`absolute left-[18px] top-20 bottom-0 w-px ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />
      )}
      
      <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Minimal timeline dot */}
          <div className={`absolute left-4 top-6 w-2 h-2 rounded-full ${isDark ? 'bg-white/90' : 'bg-black/70'} border-2 ${isDark ? 'border-zinc-900' : 'border-zinc-50'} z-10`} />
          
          <CollapsibleTrigger className="w-full text-left">
            <div className={`relative overflow-hidden rounded-2xl p-6 md:p-8 transition-all duration-300 ml-8 ${
              isDark 
                ? 'bg-zinc-900 text-white border border-zinc-800/50 hover:border-zinc-700 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30' 
                : 'bg-zinc-50 text-zinc-900 border border-zinc-200/50 hover:border-zinc-300 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10'
            }`}>
              {/* Grid pattern background - subtle */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, ${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'} 1px, transparent 1px),
                                    linear-gradient(to bottom, ${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'} 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />
              
              {/* Additional horizontal lines for more structure - subtle */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to bottom, ${isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'} 1px, transparent 1px)`,
                  backgroundSize: '100% 40px'
                }}
              />
              
              {/* Minimal hover effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-white/[0.03]' : 'from-black/[0.02]'} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-baseline gap-4">
                      <span className={`text-lg md:text-xl font-mono tracking-wider tabular-nums font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{number}</span>
                      <h2 className={`text-xl md:text-2xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>{title}</h2>
                    </div>
                    {subtitle && (
                      <p className={`text-sm leading-relaxed max-w-3xl pl-10 ${isDark ? 'text-white/90' : 'text-zinc-800'}`}>{subtitle}</p>
                    )}
                    {keywords && keywords.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1.5 pl-10">
                        <span className={`text-xs font-semibold ${isDark ? 'text-white/70' : 'text-zinc-600'}`}>What to expect:</span>
                        {keywords.map((keyword, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className={`px-2 py-0.5 text-xs font-medium transition-colors ${
                              isDark 
                                ? 'bg-white/15 border-white/30 text-white/90 hover:bg-white/20' 
                                : 'bg-black/8 border-zinc-400/60 text-zinc-800 hover:bg-black/12'
                            }`}
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div 
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 group-data-[state=open]/collapsible:rotate-180 shrink-0 ${
                      isDark 
                        ? 'bg-white/10 group-hover:bg-white/20 border border-white/20' 
                        : 'bg-black/5 group-hover:bg-black/10 border border-black/10'
                    }`}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                      isDark ? 'text-white' : 'text-zinc-900'
                    }`} />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
            <div className={`ml-8 mt-4 pl-5 border-l ${isDark ? 'border-white/15' : 'border-zinc-300/50'}`}>
              {children}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  )
}

// Process Step Component - Within Section
function ProcessStep({ 
  number, 
  title, 
  description, 
  image, 
  imageAlt,
  imageCaption,
  index = 0
}: { 
  number: string
  title: string
  description: string
  image?: string
  imageAlt?: string
  imageCaption?: string
  index?: number
}) {
  const { elementRef, isVisible } = useScrollReveal({ threshold: 0.15 })
  
  return (
    <div 
      ref={elementRef}
      className={`space-y-6 transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
          <span className="text-lg font-bold text-primary">{number}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      {image && (
        <div className={`relative rounded-2xl overflow-hidden border border-border/50 mt-6 transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        }`} style={{ transitionDelay: `${index * 150 + 200}ms` }}>
          <div className="relative aspect-video w-full">
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
          {imageCaption && (
            <p className="text-sm text-muted-foreground p-4 bg-muted/30">{imageCaption}</p>
          )}
        </div>
      )}
    </div>
  )
}

// Color Palette Component
function ColorPalette({ colors }: { colors: Array<{ name: string, value: string }> }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {colors.map((color, i) => (
        <div key={i} className="space-y-2">
          <div 
            className="w-full h-24 rounded-xl border border-border/50 shadow-sm"
            style={{ backgroundColor: color.value }}
          />
          <div>
            <p className="text-sm font-semibold">{color.name}</p>
            <p className="text-xs text-muted-foreground font-mono">{color.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Testimonial Component
function Testimonial({ 
  name, 
  role, 
  location, 
  quote, 
  avatar 
}: { 
  name: string
  role: string
  location: string
  quote: string
  avatar?: string
}) {
  return (
    <Card className="rounded-xl border border-border/50 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          {avatar && (
            <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border border-border/50">
              <Image
                src={avatar}
                alt={name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className="text-sm font-semibold">{name}</h4>
              <span className="text-xs text-muted-foreground">{location}</span>
            </div>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-foreground/90">"{quote}"</p>
      </CardContent>
    </Card>
  )
}

// Learning Point Component
function LearningPoint({ title, description, icon: Icon }: { title: string, description: string, icon: any }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-base text-muted-foreground leading-relaxed pl-[52px]">{description}</p>
    </div>
  )
}

interface EsperantoCaseStudyProps {
  project: {
    id: number
    title: string
    subtitle: string
    description: string
    heroImage: string
    role: string[]
    client: string
    date: string
    websiteUrl?: string
    sections: {
      about?: {
        title: string
        description: string
      }
      challenge?: {
        title: string
        description: string
        content?: Array<{
          title: string
          description: string
          image?: string
          imageAlt?: string
          imageCaption?: string
        }>
      }
      realProblems?: {
        title: string
        description: string
        problems?: Array<{
          title: string
          description: string
          evidence?: string
        }>
      }
      whatIDid?: {
        title: string
        description: string
        steps?: Array<{
          number: string
          title: string
          description: string
          image?: string
          imageAlt?: string
          imageCaption?: string
        }>
      }
      designSolutions?: {
        title: string
        description: string
        features?: Array<{
          title: string
          description: string
          image?: string
          imageAlt?: string
          imageCaption?: string
        }>
      }
      learnings?: {
        keywords?: string[]
        items?: Array<{
          title: string
          description: string
          icon: any
        }>
      }
      challenge?: {
        title: string
        description: string
        keywords?: string[]
        content?: Array<{
          title: string
          description: string
          image?: string
          imageAlt?: string
          imageCaption?: string
        }>
      }
      realProblems?: {
        title: string
        description: string
        keywords?: string[]
        problems?: Array<{
          title: string
          description: string
          evidence?: string
        }>
      }
      whatIDid?: {
        title: string
        description: string
        keywords?: string[]
        steps?: Array<{
          number: string
          title: string
          description: string
          image?: string
          imageAlt?: string
          imageCaption?: string
        }>
      }
      designSolutions?: {
        title: string
        description: string
        keywords?: string[]
        features?: Array<{
          title: string
          description: string
          image?: string
          imageAlt?: string
          imageCaption?: string
        }>
      }
      impact?: {
        title: string
        description: string
        keywords?: string[]
        metrics?: Array<{
          value: string
          label: string
          change?: string
        }>
        testimonials?: Array<{
          name: string
          role: string
          location: string
          quote: string
          avatar?: string
        }>
      }
      awards?: Array<{
        name: string
        organization: string
      }>
    }
  }
}

// Header component that responds to sidebar state
function HeaderWithSidebarState({ projectTitle }: { projectTitle: string }) {
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
              <BreadcrumbPage>{projectTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}

// Component to handle sidebar collapse on case study pages
function SidebarCollapseHandler() {
  const { setOpen, isMobile } = useSidebar()
  const pathname = usePathname()
  const hasCollapsedRef = useRef(false)

  useEffect(() => {
    // Minimize sidebar to icon-only mode when component mounts (only on desktop)
    // Only collapse once per page load, don't interfere with manual toggling
    if (!isMobile && !hasCollapsedRef.current) {
      const timer = setTimeout(() => {
        setOpen(false) // Collapses to icon-only mode on desktop, hides on mobile
        hasCollapsedRef.current = true
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [setOpen, isMobile, pathname])

  // Reset the ref when pathname changes so it can collapse on new pages
  useEffect(() => {
    hasCollapsedRef.current = false
  }, [pathname])

  return null
}

export function EsperantoCaseStudy({ project }: EsperantoCaseStudyProps) {
  const router = useRouter()
  const sectionsRef = useRef<HTMLDivElement>(null)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarCollapseHandler />
      <SidebarInset className="overflow-x-hidden">
        <ScrollIndicator sectionsRef={sectionsRef} />
        <HeaderWithSidebarState projectTitle={project.title} />

        <div className="flex flex-1 flex-col gap-12 p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full min-w-0 pb-24">
          {/* Hero Section - Compact */}
          <section className="space-y-6 mt-16 md:mt-20">
            {/* Project Title with Logo */}
            <ScrollReveal delay={100}>
              <div className="flex items-center gap-6 mb-6">
                {/* Scania Logo */}
                <div className="flex-shrink-0">
                  <Image
                    src="/Images/Scania_Logo.svg"
                    alt="Scania Logo"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                </div>
                {/* Title */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                    {project.title}
                  </h1>
                </div>
              </div>
            </ScrollReveal>
            
            {/* About the project & Metadata - Compact Card */}
            <ScrollReveal delay={200}>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background via-muted/30 to-background border border-border/40 p-6 md:p-8 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-300">
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                
                <div className="space-y-4 relative z-10">
                  {/* About the project - Collapsible */}
                  {project.sections.about && (
                    <Collapsible defaultOpen={false}>
                      <CollapsibleTrigger className="w-full text-left group">
                        <div className="space-y-2">
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            About the project
                          </h3>
                          <div className="flex items-center justify-between">
                            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                              {project.sections.about.title}
                            </h2>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted/50 hover:bg-muted border border-border/50 transition-all duration-300 group-data-[state=open]:rotate-180 shrink-0">
                              <ChevronDown className="h-4 w-4 text-foreground transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                        <div className="pt-3 space-y-3">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.sections.about.description}
                          </p>
                          {project.websiteUrl && (
                            <Button asChild className="gap-2" size="sm">
                              <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                                Visit the website
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  {/* Metadata - Compact Badges */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/20">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Role:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.role.map((r, i) => (
                          <Badge key={i} variant="outline" className="px-2 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm border-border/30 hover:bg-background hover:border-border/50 transition-all duration-200">
                            {r}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          <div ref={sectionsRef} className="space-y-8">
          {/* Section 01: The challenge */}
          {project.sections.challenge && (
            <CollapsibleSection
              number="01"
              title="The challenge"
              subtitle={project.sections.challenge.description}
              keywords={project.sections.challenge.keywords}
              isLast={false}
              theme="dark"
            >
              <div className="space-y-6">
                {project.sections.challenge.content && project.sections.challenge.content.length > 0 && (
                  <div className="space-y-8">
                    {project.sections.challenge.content.map((item, index) => (
                      <ProcessStep 
                        key={index} 
                        number={String(index + 1)} 
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        imageAlt={item.imageAlt}
                        imageCaption={item.imageCaption}
                        index={index}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CollapsibleSection>
          )}

          {/* Section 02: The real problems */}
          {project.sections.realProblems && (
            <CollapsibleSection
              number="02"
              title="The real problems"
              subtitle={project.sections.realProblems.description}
              keywords={project.sections.realProblems.keywords}
              isLast={false}
              theme="light"
            >
              <div className="space-y-6">
                {project.sections.realProblems.problems && project.sections.realProblems.problems.map((problem, index) => (
                  <ScrollReveal key={index} delay={index * 100}>
                    <div className="space-y-2 pb-4 border-b border-border/20 last:border-0">
                      <h3 className="text-lg font-semibold">{problem.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
                      {problem.evidence && (
                        <p className="text-xs text-muted-foreground italic mt-1.5">Evidence: {problem.evidence}</p>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Section 03: What I did */}
          {project.sections.whatIDid && (
            <CollapsibleSection
              number="03"
              title="What I did"
              subtitle={project.sections.whatIDid.description}
              keywords={project.sections.whatIDid.keywords}
              isLast={false}
              theme="dark"
            >
              <div className="space-y-8">
                {project.sections.whatIDid.steps && project.sections.whatIDid.steps.map((step, index) => (
                  <ProcessStep key={index} {...step} index={index} />
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Section 04: Design solutions */}
          {project.sections.designSolutions && (
            <CollapsibleSection
              number="04"
              title="Design solutions"
              subtitle={project.sections.designSolutions.description}
              keywords={project.sections.designSolutions.keywords}
              isLast={false}
              theme="light"
            >
              <div className="space-y-6">
                {project.sections.designSolutions.features && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {project.sections.designSolutions.features.map((feature, index) => (
                      <ScrollReveal key={index} delay={index * 150}>
                        <div className="space-y-3">
                          {feature.image && (
                            <div className="relative rounded-xl overflow-hidden border border-border/50">
                              <div className="relative aspect-video w-full">
                                <Image
                                  src={feature.image}
                                  alt={feature.imageAlt || feature.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                              </div>
                              {feature.imageCaption && (
                                <p className="text-xs text-muted-foreground p-3 bg-muted/30">
                                  {feature.imageCaption}
                                </p>
                              )}
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg font-semibold mb-1.5">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                )}
              </div>
            </CollapsibleSection>
          )}

          {/* Section 05: What did I learn */}
          {project.sections.learnings && project.sections.learnings.items && project.sections.learnings.items.length > 0 && (
            <CollapsibleSection
              number="05"
              title="What did I learn"
              subtitle="Getting out of my comfort zone"
              keywords={project.sections.learnings.keywords}
              isLast={false}
              theme="dark"
            >
              <div className="space-y-6">
                {project.sections.learnings.items.map((learning, index) => (
                  <ScrollReveal key={index} delay={index * 100}>
                    <LearningPoint {...learning} />
                  </ScrollReveal>
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Section 06: Impact */}
          {project.sections.impact && (
            <CollapsibleSection
              number="06"
              title="Impact"
              subtitle={project.sections.impact.description}
              keywords={project.sections.impact.keywords}
              isLast={true}
              theme="light"
            >
              <div className="space-y-8">
                <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
                  {project.sections.impact.description}
                </p>

                {project.sections.impact.metrics && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {project.sections.impact.metrics.map((metric, index) => (
                      <ScrollReveal key={index} delay={index * 100}>
                        <Card className="rounded-xl border border-border/50">
                          <CardContent className="p-4 text-center">
                            <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1.5">
                              {metric.value}
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                              {metric.label}
                            </p>
                            {metric.change && (
                              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 mt-1.5">
                                <TrendingUp className="h-3 w-3" />
                                <span className="text-xs font-semibold">{metric.change}</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </ScrollReveal>
                    ))}
                  </div>
                )}

                {project.sections.impact.testimonials && (
                  <ScrollReveal delay={200}>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Testimonials</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {project.sections.impact.testimonials.map((testimonial, index) => (
                          <ScrollReveal key={index} delay={index * 100}>
                            <Testimonial {...testimonial} />
                          </ScrollReveal>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </CollapsibleSection>
          )}
          </div>

          {/* Awards Section */}
          {project.sections.awards && project.sections.awards.length > 0 && (
            <section>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Awards</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {project.sections.awards.map((award, index) => (
                    <Card key={index} className="rounded-2xl border border-border/50">
                      <CardContent className="p-6">
                        <p className="font-semibold mb-1">{award.name}</p>
                        <p className="text-sm text-muted-foreground">{award.organization}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="space-y-8 pt-12 border-t border-border/50">
            <ScrollReveal>
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Let's work together!</h2>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Enjoyed the journey?</h3>
                  <p className="text-base text-muted-foreground">
                    Hit me up at{" "}
                    <a href="mailto:your.email@example.com" className="text-primary hover:underline">
                      your.email@example.com
                    </a>
                    {" "}and let's embark on a new design adventure together!
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" onClick={() => router.push("/")} className="gap-2">
                  Keep scrolling or click to go to my next project
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </ScrollReveal>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
