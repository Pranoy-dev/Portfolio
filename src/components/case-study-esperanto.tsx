"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
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
  ChevronDown,
  X
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Scroll Reveal Wrapper Component - No animation, always visible
function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

// Highlight Keywords Component - Subtle badge styling for important terms
export function HighlightedText({ text, isDark = false }: { text: string; isDark?: boolean }) {
  const keywords = [
    "monolith systems",
    "highly technical platform",
    "user studies",
    "redesign",
    "confident software update decisions",
    "searching for context",
    "lack of guidance",
    "context and guidance",
    "decision time dropped by half",
    "old giant",
    "heavily outdated",
    "difficult to change",
    "documentation is thin",
    "infrastructure improvements",
    "user experience",
    "internal legacy system",
    "interconnected truck systems",
    "new complexity",
    "quick wins",
    "moonshot opportunities",
    "moonshot improvements",
    "Conversion",
    "technology and features",
    "good design decisions",
    "structured and unstructured interviews",
    "product owner",
    "real knowledge",
    "Miro",
    "FigJam",
    "power users",
    "research restrictions",
    "prototypes",
    "changing priorities",
    "large systems",
    "priorities move fast",
    "plans change",
    "market needs shift",
    "technical constraints",
    "imperfect information",
    "low UX maturity",
    "engineering-led",
    "infrastructure work",
    "flow and experience improvements",
    "shared understanding",
    "strategy and empathy",
    "shifting the mindset",
    "stakeholder interviews",
    "feedback surveys",
    "screen recordings",
    "patterns were hard to ignore",
    "context gap",
    "no traceability",
    "broken flows",
    "jumping between systems",
    "60%+ of their time",
    "hunting for context",
    "approving updates",
    "who did what",
    "when, and why",
    "lack of traceability",
    "20% of downtime",
    "two decades",
    "half-finished flows",
    "technical workarounds",
    "50% for common tasks",
    "research, design, prototyping, and testing",
    "existing manuals",
    "product documentation",
    "key stakeholders",
    "field engineers",
    "business analysts",
    "product owners",
    "Hotjar",
    "record sessions",
    "feedback loop",
    "hundreds of flows",
    "wireframes",
    "final design",
    "permission model",
    "better integration",
    "three-eyes principle",
    "governance requirements",
    "Scania's design system",
    "Tegel",
    "documented patterns",
    "Figma",
    "Jira",
    "dedicated test environment",
    "heuristics",
    "usability checks",
    "adjacent systems",
    "product team",
    "design system",
    "Tegel",
    "core components",
    "login screens",
    "table variations",
    "foundation",
    "brand palette",
    "color tones",
    "component library",
    "wireframes",
    "make UI when needed",
    "ready-to-build",
    "think and feel",
    "do not match",
    "judge",
    "landing page",
    "search entry point",
    "simplicity",
    "Order view",
    "filtering",
    "high-graphics",
    "fancy UI",
    "Figma",
    "Jira",
    "design system",
    "evolving fast",
    "patterns",
    "table variations",
    "foundation",
    "get comfortable",
    "brand palette",
    "color tones",
    "component library",
    "translating wireframes",
    "landing page",
    "search entry point",
    "decision-making",
    "simplicity",
    "Order view",
    "complexity",
    "filtering",
    "actions",
    "clean way",
    "team confusion",
    "User testing",
    "user testing",
    "Hotjar",
    "user sessions",
    "session recordings",
    "heatmaps",
    "rage clicks",
    "U-turns",
    "NPS",
    "surveys",
    "built-in surveys",
    "feedback loop",
    "wireframes",
    "clickable prototypes",
    "real builds",
    "ongoing habit",
    "sources of truth",
    "quantitative direction",
    "real behaviour",
    "simplification and optimization",
    "broken flows",
    "prioritize fixes",
    "Double Diamond",
    "UX designer",
    "user experience",
    "usability",
    "UX maturity",
    "R&D teams",
    "design-mature",
    "engineering-led teams",
    "agile setup",
    "sprints",
    "backlog",
    "ongoing delivery",
    "front-end assets",
    "user journey maps",
    "complex flows",
    "behavioural data",
    "empathy layer",
    "user profiles",
    "product team",
    "validating solutions",
    "information moves",
    "systems and features",
    "design with confidence",
    "information flows",
    "internal information flows",
    "mock data",
    "mapped the systems",
    "send and receive data",
    "data is exchanged",
    "product experts",
    "UML-style flow map",
    "UML",
    "flow map",
    "backbone",
    "workshops",
    "data exchange",
    "data flows",
    "information architecture",
    "system mapping",
    "data mapping",
    "internal system",
    "complex internal system"
  ]

  // Sort keywords by length (longest first) to prioritize longer matches
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length)
  
  // Find all matches with their positions
  const matches: Array<{ start: number; end: number; text: string }> = []
  
  sortedKeywords.forEach(keyword => {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escapedKeyword, 'gi')
    const textLower = text.toLowerCase()
    const keywordLower = keyword.toLowerCase()
    let searchIndex = 0
    
    while (searchIndex < text.length) {
      const index = textLower.indexOf(keywordLower, searchIndex)
      if (index === -1) break
      
      const end = index + keyword.length
      // Check if this range overlaps with existing matches
      const overlaps = matches.some(m => 
        (index >= m.start && index < m.end) ||
        (end > m.start && end <= m.end) ||
        (index <= m.start && end >= m.end)
      )
      
      if (!overlaps) {
        matches.push({
          start: index,
          end: end,
          text: text.substring(index, end)
        })
      }
      searchIndex = index + 1
    }
  })
  
  // Sort matches by start position
  matches.sort((a, b) => a.start - b.start)
  
  // Build parts array
  const parts: Array<{ text: string; isKeyword: boolean }> = []
  let lastIndex = 0
  
  matches.forEach(match => {
    if (match.start > lastIndex) {
      parts.push({ text: text.substring(lastIndex, match.start), isKeyword: false })
    }
    parts.push({ text: match.text, isKeyword: true })
    lastIndex = match.end
  })
  
  if (lastIndex < text.length) {
    parts.push({ text: text.substring(lastIndex), isKeyword: false })
  }
  
  // If no matches, return original text
  if (parts.length === 0) {
    parts.push({ text, isKeyword: false })
  }

  return (
    <>
      {parts.map((part, index) => {
        if (part.isKeyword) {
          return (
            <span
              key={index}
              className={`inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded-md font-medium text-xs leading-tight border transition-colors duration-200 ${
                isDark
                  ? 'bg-white/15 text-white border-white/30 hover:bg-white/20'
                  : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/15'
              }`}
            >
              {part.text}
            </span>
          )
        }
        return <span key={index}>{part.text}</span>
      })}
    </>
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
  const isDark = theme === "dark"
  
  return (
    <div className="relative">
      <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
        <div>
          {/* Timeline dot - aligned with continuous timeline line */}
          <div className={`absolute -left-8 md:-left-12 top-6 w-3 h-3 rounded-full ${isDark ? 'bg-white' : 'bg-black'} border-2 ${isDark ? 'border-zinc-900' : 'border-zinc-50'} z-10`} style={{ transform: 'translateX(-50%)' }} />
          
          <CollapsibleTrigger className="w-full text-left">
            <div className={`relative overflow-hidden rounded-2xl p-4 md:p-6 transition-all duration-300 w-full min-w-0 max-w-full ${
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
              
              <div className="relative z-10 space-y-3 min-w-0">
                <div className="flex items-start justify-between gap-4 min-w-0">
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span className={`text-base md:text-lg font-mono tracking-wider tabular-nums font-bold shrink-0 ${isDark ? 'text-white' : 'text-zinc-900'}`}>{number}</span>
                      <h2 className={`text-lg md:text-xl font-bold tracking-tight leading-tight min-w-0 ${isDark ? 'text-white' : 'text-zinc-900'}`}>{title}</h2>
                    </div>
                    {subtitle && (
                      <div className={`overflow-hidden transition-all duration-300 group-data-[state=closed]/collapsible:max-h-0 group-data-[state=closed]/collapsible:opacity-0 group-data-[state=open]/collapsible:max-h-[200px] group-data-[state=open]/collapsible:opacity-100`}>
                        <p className={`text-sm leading-relaxed max-w-full pl-8 min-w-0 ${isDark ? 'text-white/90' : 'text-zinc-800'}`}>
                          <HighlightedText text={subtitle} isDark={isDark} />
                        </p>
                      </div>
                    )}
                    {keywords && keywords.length > 0 && (
                      <div className="flex flex-col gap-3 pt-4 pl-8">
                        <div className={`h-px w-full ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`text-xs font-semibold ${isDark ? 'text-white/70' : 'text-zinc-600'}`}>Subsections:</span>
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
          <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up mt-8">
            {children}
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
  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background via-muted/30 to-background border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 group">
        {/* Subtle shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-0 items-stretch min-h-0">
          {image && (
            <div className="flex-shrink-0 w-full md:w-2/5 relative overflow-hidden min-h-[200px] md:min-h-[250px]">
              <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                <Image
                  src={image}
                  alt={imageAlt || title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 400px"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-background/0 via-background/5 to-background/20 md:bg-gradient-to-r md:from-background/0 md:via-background/10 md:to-background/30 pointer-events-none" />
              </div>
            </div>
          )}
          <div className="flex-1 space-y-4 min-w-0 p-5 md:p-6">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 tracking-tight">{title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                <HighlightedText text={description} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Modal Component for What I Did Steps - Scrollable Document Style
function StepModal({ 
  step, 
  isOpen, 
  onClose 
}: { 
  step: { 
    title: string
    description: string
    image?: string
    imageAlt?: string
    imageCaption?: string
    additionalImages?: Array<{
      src: string
      alt: string
      layout?: 'left' | 'top'
    }>
  } | null
  isOpen: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !step) return null

  const descriptionLines = step.description.split('\n\n')
  
  // For UX research, we'll insert images at strategic points matching the text
  const isUXResearch = step.title.toLowerCase().includes('ux research')
  const isUIDesign = step.title.toLowerCase().includes('ui design')
  const isUserTesting = step.title.toLowerCase().includes('user testing')
  const isMethods = step.title.toLowerCase().includes('methods')
  const uxResearchImages: Array<{ src: string; alt: string; layout: 'left' | 'top'; insertAfter: number }> = isUXResearch ? [
    { src: '/Images/UX research/Manual.png', alt: 'Reading manuals and product documentation', layout: 'left', insertAfter: 0 },
    { src: '/Images/UX research/Previous designers.png', alt: 'Reviewing previous designer work', layout: 'top', insertAfter: 2 },
    { src: '/Images/UX research/Figjam.png', alt: 'Capturing insights in Miro and FigJam', layout: 'top', insertAfter: 3 },
    { src: '/Images/UX research/Survey.png', alt: 'Surveys sent after prototypes were ready', layout: 'left', insertAfter: 4 }
  ] : []
  
  // For UI design, show all images from the UI design folder
  const uiDesignImages: Array<{ src: string; alt: string; layout: 'left' | 'top'; insertAfter?: number }> = isUIDesign ? [
    { src: '/Images/UI design/Login page.png', alt: 'Scania login page design', layout: 'top' },
    { src: '/Images/UI design/Main colors.png', alt: 'Scania main colors', layout: 'top' },
    { src: '/Images/UI design/UI components.png', alt: 'Scania component library', layout: 'top' },
    { src: '/Images/UI design/Single search entry.png', alt: 'Simple landing page with single search entry point', layout: 'top' },
    { src: '/Images/UI design/Order.png', alt: 'Order view with complex information and filtering', layout: 'top' },
    { src: '/Images/UI design/Mobile UI.png', alt: 'Mobile UI design', layout: 'top' }
  ] : []
  
  // For User testing, show all images from the User testing folder
  const userTestingImages: Array<{ src: string; alt: string; layout: 'left' | 'top'; insertAfter?: number }> = isUserTesting ? [
    { src: '/Images/User testing/User sessions.png', alt: 'User sessions overview', layout: 'top' },
    { src: '/Images/User testing/recordings.png', alt: 'User session recordings', layout: 'top' },
    { src: '/Images/User testing/headmap.png', alt: 'User testing heatmap', layout: 'top' },
    { src: '/Images/User testing/Rage clicks.png', alt: 'Rage clicks analysis', layout: 'top' },
    { src: '/Images/User testing/NPS.png', alt: 'Net Promoter Score', layout: 'top' }
  ] : []
  
  // For Methods, show all images from the Methods folder
  const methodsImages: Array<{ src: string; alt: string; layout: 'left' | 'top'; insertAfter?: number }> = isMethods ? [
    { src: '/Images/Methods/The_Double_Diamond_from_the_Fountain_Institute-min.webp', alt: 'Double Diamond design process', layout: 'top' },
    { src: '/Images/Methods/Agile.png', alt: 'Agile methodology', layout: 'top' },
    { src: '/Images/Methods/user journey.png', alt: 'User journey mapping', layout: 'top' },
    { src: '/Images/Methods/Emphathy method.jpeg', alt: 'Empathy method', layout: 'top' },
    { src: '/Images/Methods/User persona.png', alt: 'User persona', layout: 'top' }
  ] : []
  
  // Use UX research images if it's UX research, UI design images if it's UI design, User testing images if it's User testing, Methods images if it's Methods, otherwise use additionalImages
  const allImages: Array<{ src: string; alt: string; layout: 'left' | 'top'; insertAfter?: number }> = isUXResearch 
    ? uxResearchImages 
    : (isUIDesign 
      ? uiDesignImages 
      : (isUserTesting
        ? userTestingImages
        : (isMethods
          ? methodsImages
          : (step.additionalImages || []).map(img => ({ ...img, insertAfter: undefined }))
        )
      )
    )

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0"
      onClick={onClose}
    >
      {/* Backdrop with strong blur - Apple style */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
      
      {/* Modal Content - Document Style, Scrollable */}
      <div 
        className="relative z-10 w-full h-full max-w-4xl max-h-[95vh] overflow-hidden rounded-none md:rounded-3xl bg-background border border-border/30 shadow-2xl shadow-black/50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between px-6 md:px-8 py-4">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight truncate pr-4">
              {step.title}
            </h2>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-background/90 backdrop-blur-md border border-border/40 flex items-center justify-center hover:bg-background transition-all duration-200 hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area - Document Style */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-10 py-8 md:py-12">
            {/* Hero Image Section - Only show if not UX research, UI design, User testing, or Methods */}
            {step.image && !isUXResearch && !isUIDesign && !isUserTesting && !isMethods && (
              <div className="mb-12 rounded-lg overflow-hidden border border-border/20">
                <div className="relative w-full" style={{ minHeight: '400px' }}>
                  <Image
                    src={step.image}
                    alt={step.imageAlt || step.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Document Content with Academic Paper Layout */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="space-y-8 text-base md:text-lg leading-relaxed text-foreground">
                {descriptionLines.map((paragraph, index) => {
                  // Check if this paragraph is shown on the right of a previous left-layout image
                  const leftImageWithThisOnRight = allImages.find((img) => {
                    if (img.layout !== 'left') return false
                    const isFirstParaOnRight = img.insertAfter + 1 === index
                    const isSurveySecondPara = img.src.includes('Survey') && img.insertAfter + 2 === index
                    return isFirstParaOnRight || isSurveySecondPara
                  })
                  if (leftImageWithThisOnRight) {
                    return null // Skip - already shown on the right
                  }
                  
                  // Find image that should be inserted after this paragraph
                  const imageToInsert = allImages.find((img) => img.insertAfter === index)
                  
                  // If there's a left-layout image after this paragraph, show image with next paragraph(s) on right
                  if (imageToInsert && imageToInsert.layout === 'left') {
                    // Check if this is the Survey image - show 2 paragraphs on right
                    const isSurveyImage = imageToInsert.src.includes('Survey')
                    const paragraphsToShow = isSurveyImage ? 2 : 1
                    
                    return (
                      <div key={index} className="my-8">
                        {/* Show image on left with next paragraph(s) on right */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 items-start">
                          <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '400px' }}>
                            <Image
                              src={imageToInsert.src}
                              alt={imageToInsert.alt}
                              fill
                              className="object-contain p-4"
                              sizes="(max-width: 768px) 100vw, 35vw"
                              unoptimized
                            />
                          </div>
                          <div className="md:pl-4">
                            {/* Show next paragraph(s) text on the right */}
                            {Array.from({ length: paragraphsToShow }).map((_, i) => {
                              const paraIndex = index + 1 + i
                              if (paraIndex < descriptionLines.length) {
                                return (
                                  <p key={i} className="mb-6">
                                    <HighlightedText text={descriptionLines[paraIndex]} />
                                  </p>
                                )
                              }
                              return null
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  }
                  
                  // Normal paragraph rendering
                  return (
                    <div key={index}>
                      {/* Paragraph text */}
                      <p className="mb-6">
                        <HighlightedText text={paragraph} />
                      </p>
                      
                      {/* Insert image after paragraph (for top layout) */}
                      {imageToInsert && imageToInsert.layout === 'top' && (
                        <div className="my-8">
                          <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                            <Image
                              src={imageToInsert.src}
                              alt={imageToInsert.alt}
                              fill
                              className="object-contain p-4"
                              sizes="(max-width: 768px) 100vw, 80vw"
                              unoptimized
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
                
                {/* Display any remaining images that weren't inserted */}
                {allImages.filter(img => img.insertAfter === undefined || !descriptionLines.some((_, idx) => idx === img.insertAfter)).length > 0 && (
                  <div className="mt-12 space-y-8">
                    {(() => {
                      const filteredImages = allImages.filter(img => img.insertAfter === undefined || !descriptionLines.some((_, idx) => idx === img.insertAfter))
                      const mainColorsIndex = filteredImages.findIndex(img => img.src.includes('Main colors'))
                      const uiComponentsIndex = filteredImages.findIndex(img => img.src.includes('UI components'))
                      const loginPageIndex = filteredImages.findIndex(img => img.src.includes('Login page'))
                      const singleSearchIndex = filteredImages.findIndex(img => img.src.includes('Single search entry'))
                      const orderIndex = filteredImages.findIndex(img => img.src.includes('Order.png'))
                      const mobileUIIndex = filteredImages.findIndex(img => img.src.includes('Mobile UI'))
                      const userSessionsIndex = filteredImages.findIndex(img => img.src.includes('User sessions'))
                      const recordingsIndex = filteredImages.findIndex(img => img.src.includes('recordings'))
                      const headmapIndex = filteredImages.findIndex(img => img.src.includes('headmap'))
                      const rageClicksIndex = filteredImages.findIndex(img => img.src.includes('Rage clicks'))
                      const npsIndex = filteredImages.findIndex(img => img.src.includes('NPS'))
                      const doubleDiamondIndex = filteredImages.findIndex(img => img.src.includes('Double_Diamond'))
                      const agileIndex = filteredImages.findIndex(img => img.src.includes('Agile.png'))
                      const userJourneyIndex = filteredImages.findIndex(img => img.src.includes('user journey'))
                      const empathyMethodIndex = filteredImages.findIndex(img => img.src.includes('Emphathy method'))
                      const userPersonaIndex = filteredImages.findIndex(img => img.src.includes('User persona'))
                      const isUIDesignPair = isUIDesign && mainColorsIndex !== -1 && uiComponentsIndex !== -1 && Math.abs(mainColorsIndex - uiComponentsIndex) === 1
                      
                      return filteredImages.map((img, imgIndex) => {
                        // Skip UI components if it's right after Main colors (will be rendered together)
                        if (isUIDesignPair && imgIndex === uiComponentsIndex && uiComponentsIndex === mainColorsIndex + 1) {
                          return null
                        }
                        
                        // Render Login page image with text below it
                        if (isUIDesign && imgIndex === loginPageIndex && loginPageIndex === 0) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="Scania has its own design system, and honestly, I think it is very cool and evolving fast. Most of what we needed was already there, from core components to patterns like login screens. Sometimes we still had to build a few things ourselves, like more complex table variations, but the foundation was strong." />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render Main colors and UI components side by side
                        if (isUIDesignPair && imgIndex === mainColorsIndex) {
                          const mainColorsImg = filteredImages[mainColorsIndex]
                          const uiComponentsImg = filteredImages[uiComponentsIndex]
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '400px' }}>
                                  <Image
                                    src={mainColorsImg.src}
                                    alt={mainColorsImg.alt}
                                    fill
                                    className="object-contain p-4"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    unoptimized
                                  />
                                </div>
                                <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '400px' }}>
                                  <Image
                                    src={uiComponentsImg.src}
                                    alt={uiComponentsImg.alt}
                                    fill
                                    className="object-contain p-4"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    unoptimized
                                  />
                                </div>
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="The first thing I did was get comfortable with the system. I studied the brand palette and color tones, then went through the component library to understand what is used where, and why." />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render Single search entry image with text below it
                        if (isUIDesign && imgIndex === singleSearchIndex) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="Once I had that, I started translating wireframes into UI. One of my favourite moments was designing a landing page that felt almost too simple: the user basically sees one main thing, a single search entry point. It looks obvious now, but getting there took a lot of discussion and decision-making. That simplicity was earned." />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render Order image with text below it
                        if (isUIDesign && imgIndex === orderIndex) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text={'On the other side, we had screens that look calm at first glance but carry a lot of complexity under the hood. The "Order" view is a good example. It is packed with information, filtering, and actions. The challenge with these screens is not adding features, it is understanding what connects to what, then communicating it in a clean way, and defending that simplicity through multiple loops of team confusion and change.'} />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render Mobile UI image with text below it
                        if (isUIDesign && imgIndex === mobileUIIndex) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="And if you are wondering where the high-graphics, fancy UI is: I love that too, and we do use it sometimes. It just was not the right fit for this project." />
                              </p>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="You can find more UI-related information in the next section called Design solution." />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render User sessions image with text above and below
                        if (isUserTesting && imgIndex === userSessionsIndex) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="User testing happened throughout the project, in whatever form made sense at the time. We tested early to understand what was working and what was not. We tested again when the first wireframes were ready. We tested clickable prototypes before sending anything to development. And we kept testing once we had real builds in place. I am describing it here as one track, but it was really an ongoing habit." />
                              </p>
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text={'One of my favourite tools for this was Hotjar. It was approved by Scania IT, and I was the one driving the setup so we could use it inside internal products. Within a few weeks, we started collecting what Hotjar calls "user sessions", and it quickly became one of our most useful sources of truth.'} />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render recordings image with text below
                        if (isUserTesting && imgIndex === recordingsIndex) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="Session recordings gave us a real view of how people moved through the system. Recordings were random, with sensitive data removed and user IDs blurred. I watched these sessions to spot patterns and form hypotheses. It was great quantitative direction, it helped us see where to look. But it did not always explain the why, so it worked best when paired with conversations." />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render headmap image with text below
                        if (isUserTesting && imgIndex === headmapIndex) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="Heatmaps helped us understand what people actually used on key pages, and what they ignored. This made it much easier to argue for simplification and optimization, because we could point to real behaviour instead of opinions." />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render Rage clicks image with text below
                        if (isUserTesting && imgIndex === rageClicksIndex) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="We also looked for signals like rage clicks and U-turns. Those usually showed friction, broken flows, or areas that were not properly tested. In a large internal system like Conversion, these signals were common, and they helped us prioritize fixes fast." />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render NPS image with text below
                        if (isUserTesting && imgIndex === npsIndex) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="Alongside Hotjar, we used surveys and NPS to answer specific questions as they came up. The built-in surveys were also a good way to find users who were willing to help us improve the system, and to keep a feedback loop open as the product evolved." />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render Double Diamond image with text below
                        if (isMethods && imgIndex === doubleDiamondIndex) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text={'A responsibility that often comes with being a UX designer is helping the team understand user experience, usability, and how to build it into the process. That said, UX maturity at Scania is not the same everywhere. Some R&D teams I have worked with were much more design-mature than many purely engineering-led teams. In this project, me and my teammate introduced the Double Diamond to the team. We used it to show that design is not just "make UI when needed", it is about understanding the problem properly before jumping into solutions.'} />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render Agile image with text below
                        if (isMethods && imgIndex === agileIndex) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="We then blended that into the agile setup the team already had: sprints, backlog, and ongoing delivery. The main change was that design started being developed a few steps ahead, so developers always had clear, ready-to-build front-end assets when they reached that stage." />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render User journey image with text below
                        if (isMethods && imgIndex === userJourneyIndex) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="We also relied heavily on user journey maps to make sense of complex flows. These maps were built from everything we learned: interviews, surveys, and behavioural data from other systems." />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render Empathy method image with text below
                        if (isMethods && imgIndex === empathyMethodIndex) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="One thing we always added was an empathy layer. We documented not just what users do, but what they think and feel while moving through the system. Often those things do not match, and that is where the real insights show up. As a designer, I try to be careful here. You cannot follow every signal blindly, you have to judge what matters." />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render User persona image with text below
                        if (isMethods && imgIndex === userPersonaIndex) {
                          return (
                            <div key={imgIndex} className="space-y-6">
                              <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ height: '500px' }}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain p-4"
                                  sizes="(max-width: 768px) 100vw, 80vw"
                                  unoptimized
                                />
                              </div>
                              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6">
                                <HighlightedText text="We also explored user profiles to make research and testing more efficient. We did not fully implement it because of time and limited interest from the product team, but we still kept the idea in mind while designing and validating solutions." />
                              </p>
                            </div>
                          )
                        }
                        
                        // Render other images normally
                        return (
                          <div key={imgIndex} className={img.layout === 'left' ? 'grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 items-start' : ''}>
                            <div className={`relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20 ${img.layout === 'left' ? '' : 'mb-4'}`} style={{ height: img.layout === 'left' ? '400px' : '500px' }}>
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-contain p-4"
                                sizes={img.layout === 'left' ? '(max-width: 768px) 100vw, 35vw' : '(max-width: 768px) 100vw, 80vw'}
                                unoptimized
                              />
                            </div>
                          </div>
                        )
                      })
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Design Solutions Section with Thumbnails
function DesignSolutionsSection({
  description,
  keywords
}: {
  description?: string
  keywords?: string[]
}) {
  const [selectedStep, setSelectedStep] = useState<number | null>(null)

  // Define the 4 steps for Design solutions
  const steps = [
    { title: "Information architecture", description: "" },
    { title: "wireframe", description: "" },
    { title: "Prototyping", description: "" },
    { title: "Design", description: "" }
  ]

  return (
    <>
      <CollapsibleSection
        number="04"
        title="Design solutions"
        subtitle={description}
        keywords={keywords}
        isLast={false}
        theme="light"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {steps.map((step, index) => {
              // Different gradient colors for variety
              const gradients = [
                'from-blue-900/80 via-blue-950/90 to-black',
                'from-purple-900/80 via-purple-950/90 to-black',
                'from-indigo-900/80 via-indigo-950/90 to-black',
                'from-violet-900/80 via-violet-950/90 to-black',
              ]
              const glows = [
                'bg-blue-500/30',
                'bg-purple-500/30',
                'bg-indigo-500/30',
                'bg-violet-500/30',
              ]
              const gradient = gradients[index % gradients.length]
              const glow = glows[index % glows.length]
              
              // Different animation styles for each card
              const animations = [
                {
                  glow: 'animate-[glow-pulse-1_3s_ease-in-out_infinite]',
                  wave: 'animate-[wave-1_5s_ease-in-out_infinite]',
                  gradient: 'bg-[length:200%_200%] animate-[gradient-shift-1_6s_ease_infinite]',
                },
                {
                  glow: 'animate-[glow-pulse-2_3.5s_ease-in-out_infinite]',
                  wave: 'animate-[wave-2_5.5s_ease-in-out_infinite]',
                  gradient: 'bg-[length:200%_200%] animate-[gradient-shift-2_7s_ease_infinite]',
                },
                {
                  glow: 'animate-[glow-pulse-3_3.2s_ease-in-out_infinite]',
                  wave: 'animate-[wave-3_5.2s_ease-in-out_infinite]',
                  gradient: 'bg-[length:200%_200%] animate-[gradient-shift-3_6.5s_ease_infinite]',
                },
                {
                  glow: 'animate-[glow-pulse-4_3.8s_ease-in-out_infinite]',
                  wave: 'animate-[wave-4_5.8s_ease-in-out_infinite]',
                  gradient: 'bg-[length:200%_200%] animate-[gradient-shift-4_7.5s_ease_infinite]',
                },
              ]
              const anim = animations[index % animations.length]
              
              // Check if card has video
              const hasVideo = step.title.toLowerCase().includes('information architecture')
              
              return (
                <div
                  key={index}
                  onClick={() => setSelectedStep(index)}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  {/* Apple TV-style card container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    {/* Video for Information architecture card - Apple TV style */}
                    {hasVideo && (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                      >
                        <source src="/Images/Design solution/Information Architecture/Information Architecture.mov" type="video/quicktime" />
                        <source src="/Images/Design solution/Information Architecture/Information Architecture.mov" type="video/mp4" />
                      </video>
                    )}
                    
                    {/* Animated glows only for cards without videos */}
                    {!hasVideo && (
                    <>
                      {/* Animated soft glowing oval at the top */}
                      <div 
                        className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full ${glow} opacity-70 group-hover:opacity-90 transition-opacity duration-500 ${anim.glow}`} 
                        style={{
                          animationDelay: `${index * 0.3}s`
                        }} 
                      />
                      
                      {/* Secondary glow for depth with wave animation */}
                      <div 
                        className={`absolute top-8 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full ${glow} opacity-40 ${anim.wave}`}
                        style={{
                          animationDelay: `${index * 0.3 + 0.5}s`
                        }} 
                      />
                      
                      {/* Third glow layer for more depth */}
                      <div 
                        className={`absolute top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full ${glow} opacity-25 ${anim.glow}`}
                        style={{
                          animationDelay: `${index * 0.3 + 1}s`,
                          animationDuration: '4s'
                        }} 
                      />
                    </>
                    )}
                    
                    {/* Glass blur overlay - Bottom 25% only */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none"
                      style={{
                        height: '25%',
                        overflow: 'hidden',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                      }}
                    >
                      <div 
                        className="absolute bottom-0 left-0 right-0"
                        style={{
                          height: '100%',
                          width: '100%',
                          background: 'linear-gradient(to top, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
                          transform: 'translateZ(0)',
                          isolation: 'isolate',
                        }}
                      />
                      
                      {/* Top edge highlight */}
                      <div className="absolute top-0 left-0 right-0 h-px z-10">
                        <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      </div>
                    </div>
                    
                    {/* Apple TV-style content section - Bottom */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedStep(index)
                      }}
                      className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 text-white font-semibold flex items-center justify-center gap-2 group/btn cursor-pointer overflow-hidden"
                      style={{
                        background: 'rgba(0, 0, 0, 1)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
                        transform: 'scale(1)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)'
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 1)'
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
                        e.currentTarget.style.borderTop = '1px solid rgba(255, 255, 255, 0.25)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) translateY(0)'
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 1)'
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
                        e.currentTarget.style.borderTop = '1px solid rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      {/* Subtle shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover/btn:from-white/5 group-hover/btn:via-white/3 group-hover/btn:to-white/0 transition-all duration-500 pointer-events-none" />
                      
                      {/* Top edge highlight */}
                      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none">
                        <div className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/btn:via-white/60 transition-all duration-300" />
                      </div>
                      
                      {/* Content */}
                      <span className="text-sm font-medium tracking-tight relative z-10 group-hover/btn:tracking-tighter transition-all duration-300">
                        {step.title}
                      </span>
                      <ArrowRight className="h-4 w-4 relative z-10 shrink-0 transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CollapsibleSection>

      {/* Modal - Scrollable document style */}
      {selectedStep !== null && steps && (
        <DesignSolutionModal
          step={steps[selectedStep]}
          isOpen={selectedStep !== null}
          onClose={() => setSelectedStep(null)}
        />
      )}
    </>
  )
}

// Modal Component for Design Solutions Steps
function DesignSolutionModal({ 
  step, 
  isOpen, 
  onClose 
}: { 
  step: { title: string; description: string }
  isOpen: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !step) return null

  // Get images based on step title
  const getImagesForStep = (title: string) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('information architecture')) {
      return [
        { src: '/Images/Design solution/Information Architecture/Information UML.png', alt: 'Information UML', layout: 'top' as const },
        { src: '/Images/Design solution/Information Architecture/Notes.png', alt: 'Notes', layout: 'top' as const },
        { src: '/Images/Design solution/Information Architecture/All platforms.png', alt: 'All platforms', layout: 'top' as const }
      ]
    } else if (titleLower.includes('wireframe')) {
      return [
        { src: '/Images/Design solution/Wireframe 1.png', alt: 'Wireframe 1', layout: 'top' as const },
        { src: '/Images/Design solution/wireframe1.png', alt: 'Wireframe 1', layout: 'top' as const },
        { src: '/Images/Design solution/wireframe2.jpeg', alt: 'Wireframe 2', layout: 'top' as const },
        { src: '/Images/Design solution/wireframe3.png', alt: 'Wireframe 3', layout: 'top' as const },
        { src: '/Images/Design solution/wireframe4.png', alt: 'Wireframe 4', layout: 'top' as const }
      ]
    } else if (titleLower.includes('prototyping')) {
      return [
        { src: '/Images/Design solution/UI1.jpeg', alt: 'Prototyping UI 1', layout: 'top' as const }
      ]
    } else if (titleLower.includes('design')) {
      return [
        { src: '/Images/Design solution/Ui2.png', alt: 'UI design 2', layout: 'top' as const },
        { src: '/Images/Design solution/UI3.png', alt: 'UI design 3', layout: 'top' as const },
        { src: '/Images/Design solution/UI4.png', alt: 'UI design 4', layout: 'top' as const }
      ]
    }
    return []
  }

  const allImages = getImagesForStep(step.title)

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0"
      onClick={onClose}
    >
      {/* Backdrop with strong blur - Apple style */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
      
      {/* Modal Content - Document Style, Scrollable */}
      <div 
        className="relative z-10 w-full h-full max-w-4xl max-h-[95vh] overflow-hidden rounded-none md:rounded-3xl bg-background border border-border/30 shadow-2xl shadow-black/50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between px-6 md:px-8 py-4">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight truncate pr-4">
              {step.title}
            </h2>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-background/90 backdrop-blur-md border border-border/40 flex items-center justify-center hover:bg-background transition-all duration-200 hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area - Document Style */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-10 py-8 md:py-12">
            {/* Document Content with Academic Paper Layout */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="space-y-8 text-base md:text-lg leading-relaxed text-foreground">
                {/* Display all images */}
                {allImages.length > 0 && (
                  <div className="space-y-8">
                    {allImages.map((img, imgIndex) => {
                      const isInformationArchitecture = step.title.toLowerCase().includes('information architecture')
                      const isInformationUML = img.alt.toLowerCase().includes('information uml')
                      const isNotes = img.alt.toLowerCase().includes('notes')
                      const isAllPlatforms = img.alt.toLowerCase().includes('all platforms')
                      
                      return (
                        <div key={imgIndex} className="space-y-6">
                          <div className="relative w-full rounded-lg overflow-hidden border border-border/20 bg-muted/20" style={{ minHeight: '500px' }}>
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-contain p-4"
                              sizes="(max-width: 768px) 100vw, 80vw"
                              unoptimized
                            />
                          </div>
                          
                          {/* Text below images for Information Architecture */}
                          {isInformationArchitecture && isInformationUML && (
                            <p className="text-base md:text-lg leading-relaxed text-foreground">
                              <HighlightedText text="This is one of the biggest responsibilities in UX, especially in a complex internal system. If you do not understand how information moves between systems and features, you cannot design with confidence. Once you do understand it, you gain a lot more flexibility and influence over the solution. Because Scania is sensitive about internal information flows, I have recreated parts of this work using mock data. But early in the project, we did something very practical: we mapped the systems that send and receive data from Conversion, then dug into what data is exchanged, why it is sent, and who depends on it." />
                            </p>
                          )}
                          
                          {isInformationArchitecture && isNotes && (
                            <p className="text-base md:text-lg leading-relaxed text-foreground">
                              <HighlightedText text="We ran workshops with business analysts and product experts to walk through these flows together. They helped clarify what was being collected today, what was missing, and what needed to improve." />
                            </p>
                          )}
                          
                          {isInformationArchitecture && isAllPlatforms && (
                            <p className="text-base md:text-lg leading-relaxed text-foreground">
                              <HighlightedText text="From those sessions, we built a UML-style flow map. That became the backbone for the redesign and guided a lot of our decisions going forward." />
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// What I Did Section with Thumbnails
function WhatIDidSection({
  steps,
  description,
  keywords
}: {
  steps?: Array<{ title: string; description: string; image?: string; imageAlt?: string; imageCaption?: string }>
  description?: string
  keywords?: string[]
}) {
  const [selectedStep, setSelectedStep] = useState<number | null>(null)

  if (!steps) return null

  return (
    <>
      <CollapsibleSection
        number="03"
        title="What I did"
        subtitle={description}
        keywords={keywords}
        isLast={false}
        theme="dark"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {steps.map((step, index) => {
              // Different gradient colors for variety
              const gradients = [
                'from-blue-900/80 via-blue-950/90 to-black',
                'from-purple-900/80 via-purple-950/90 to-black',
                'from-indigo-900/80 via-indigo-950/90 to-black',
                'from-violet-900/80 via-violet-950/90 to-black',
              ]
              const glows = [
                'bg-blue-500/30',
                'bg-purple-500/30',
                'bg-indigo-500/30',
                'bg-violet-500/30',
              ]
              const gradient = gradients[index % gradients.length]
              const glow = glows[index % glows.length]
              
              // Different animation styles for each card - Movement inside only
              const animations = [
                {
                  glow: 'animate-[glow-pulse-1_3s_ease-in-out_infinite]',
                  wave: 'animate-[wave-1_5s_ease-in-out_infinite]',
                  gradient: 'bg-[length:200%_200%] animate-[gradient-shift-1_6s_ease_infinite]',
                },
                {
                  glow: 'animate-[glow-pulse-2_3.5s_ease-in-out_infinite]',
                  wave: 'animate-[wave-2_5.5s_ease-in-out_infinite]',
                  gradient: 'bg-[length:200%_200%] animate-[gradient-shift-2_7s_ease_infinite]',
                },
                {
                  glow: 'animate-[glow-pulse-3_3.2s_ease-in-out_infinite]',
                  wave: 'animate-[wave-3_5.2s_ease-in-out_infinite]',
                  gradient: 'bg-[length:200%_200%] animate-[gradient-shift-3_6.5s_ease_infinite]',
                },
                {
                  glow: 'animate-[glow-pulse-4_3.8s_ease-in-out_infinite]',
                  wave: 'animate-[wave-4_5.8s_ease-in-out_infinite]',
                  gradient: 'bg-[length:200%_200%] animate-[gradient-shift-4_7.5s_ease_infinite]',
                },
              ]
              const anim = animations[index % animations.length]
              
              // Check if card has video
              const hasVideo = step.title.toLowerCase().includes('ux research') || 
                              step.title.toLowerCase().includes('ui design') || 
                              step.title.toLowerCase().includes('user testing') || 
                              step.title.toLowerCase().includes('method')
              
              return (
                <div
                  key={index}
                  onClick={() => setSelectedStep(index)}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  {/* Apple TV-style card container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    {/* Video for cards with available videos - Apple TV style */}
                    {hasVideo && (
                      <>
                        {step.title.toLowerCase().includes('ux research') && (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                          >
                            <source src="/Images/What I did/UX research.mov" type="video/quicktime" />
                            <source src="/Images/What I did/UX research.mov" type="video/mp4" />
                          </video>
                        )}
                        
                        {step.title.toLowerCase().includes('ui design') && (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                          >
                            <source src="/Images/What I did/UI design.mov" type="video/quicktime" />
                            <source src="/Images/What I did/UI design.mov" type="video/mp4" />
                          </video>
                        )}
                        
                        {step.title.toLowerCase().includes('user testing') && (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                          >
                            <source src="/Images/What I did/User testing.mov" type="video/quicktime" />
                            <source src="/Images/What I did/User testing.mov" type="video/mp4" />
                          </video>
                        )}
                        
                        {step.title.toLowerCase().includes('method') && (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                          >
                            <source src="/Images/What I did/Methods.mov" type="video/quicktime" />
                            <source src="/Images/What I did/Methods.mov" type="video/mp4" />
                          </video>
                        )}
                      </>
                    )}
                    
                    {/* Animated glows only for cards without videos - no blur effects */}
                    {!hasVideo && (
                      <>
                        {/* Animated soft glowing oval at the top - Strong movement */}
                        <div 
                          className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full ${glow} opacity-70 group-hover:opacity-90 transition-opacity duration-500 ${anim.glow}`} 
                          style={{
                            animationDelay: `${index * 0.3}s`
                          }} 
                        />
                        
                        {/* Secondary glow for depth with wave animation */}
                        <div 
                          className={`absolute top-8 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full ${glow} opacity-40 ${anim.wave}`}
                          style={{
                            animationDelay: `${index * 0.3 + 0.5}s`
                          }} 
                        />
                        
                        {/* Third glow layer for more depth */}
                        <div 
                          className={`absolute top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full ${glow} opacity-25 ${anim.glow}`}
                          style={{
                            animationDelay: `${index * 0.3 + 1}s`,
                            animationDuration: '4s'
                          }} 
                        />
                      </>
                    )}
                    
                    {/* Glass blur overlay - Bottom 25% only (Apple TV style) */}
                    {/* Isolated blur layer that only affects the bottom 25% */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none"
                      style={{
                        height: '25%',
                        overflow: 'hidden',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                      }}
                    >
                      {/* Glass blur effect - creates new stacking context */}
                      <div 
                        className="absolute bottom-0 left-0 right-0"
                        style={{
                          height: '100%',
                          width: '100%',
                          background: 'linear-gradient(to top, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
                          transform: 'translateZ(0)',
                          isolation: 'isolate',
                        }}
                      />
                      
                      {/* Top edge highlight - simulates light reflection */}
                      <div className="absolute top-0 left-0 right-0 h-px z-10">
                        <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      </div>
                    </div>
                    
                    {/* Apple TV-style content section - Bottom - Entire block as button */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedStep(index)
                      }}
                      className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 text-white font-semibold flex items-center justify-center gap-2 group/btn cursor-pointer overflow-hidden"
                      style={{
                        background: 'rgba(0, 0, 0, 1)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
                        transform: 'scale(1)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)'
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 1)'
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
                        e.currentTarget.style.borderTop = '1px solid rgba(255, 255, 255, 0.25)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) translateY(0)'
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 1)'
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
                        e.currentTarget.style.borderTop = '1px solid rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      {/* Subtle shine effect on hover - Apple style */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover/btn:from-white/5 group-hover/btn:via-white/3 group-hover/btn:to-white/0 transition-all duration-500 pointer-events-none" />
                      
                      {/* Top edge highlight - Apple glass effect */}
                      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none">
                        <div className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/btn:via-white/60 transition-all duration-300" />
                      </div>
                      
                      {/* Content */}
                      <span className="text-sm font-medium tracking-tight relative z-10 group-hover/btn:tracking-tighter transition-all duration-300">
                        {step.title}
                      </span>
                      <ArrowRight className="h-4 w-4 relative z-10 shrink-0 transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CollapsibleSection>

      {/* Modal - Scrollable document style */}
      {selectedStep !== null && steps && (
        <StepModal
          step={steps[selectedStep]}
          isOpen={selectedStep !== null}
          onClose={() => setSelectedStep(null)}
        />
      )}
    </>
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
    team?: string[]
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

// Page Transition Wrapper Component
function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}

// Header component that responds to sidebar state
function HeaderWithSidebarState({ projectTitle }: { projectTitle: string }) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleOverviewClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsNavigating(true)
    
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
      router.push('/')
    }, 300)
  }

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
              <BreadcrumbLink 
                href="/" 
                onClick={handleOverviewClick}
                className={cn(
                  "hover:text-foreground transition-colors",
                  isNavigating && "opacity-50 pointer-events-none"
                )}
              >
                Overview
              </BreadcrumbLink>
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
      <PageTransitionWrapper>
        <SidebarInset className="overflow-x-hidden">
          <ScrollIndicator sectionsRef={sectionsRef} />
          <HeaderWithSidebarState projectTitle={project.title} />

        <div className="flex flex-1 flex-col gap-12 pl-6 md:pl-8 lg:pl-10 pr-12 md:pr-16 lg:pr-20 pt-6 md:pt-8 lg:pt-10 pb-24 max-w-7xl mx-auto w-full min-w-0">
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
                        <div className="pt-3 space-y-4">
                          {project.sections.about.description.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                              <HighlightedText text={paragraph} />
                            </p>
                          ))}
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
                          <Badge key={i} className="px-2 py-1 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-all duration-200">
                            {r}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {project.team && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Team:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.team.map((t, i) => (
                            <Badge key={i} className="px-2 py-1 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-all duration-200">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          <div ref={sectionsRef} className="space-y-8 relative pl-8 md:pl-12">
            {/* Continuous timeline line - subtle, connects all sections from 01 to 06 */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border/60 z-0" />
            
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
              {project.sections.realProblems.problems && (
                <div className="space-y-8">
                  {project.sections.realProblems.problems.map((problem, index) => (
                    <div key={index} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background via-muted/30 to-background border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 group">
                      {/* Subtle shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
                      <div className="relative z-10 space-y-3 p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-semibold tracking-tight">{problem.title}</h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          <HighlightedText text={problem.description} />
                        </p>
                        {problem.evidence && (
                          <p className="text-base text-muted-foreground mt-1.5">
                            <span className="font-semibold">Data:</span> <span className="font-bold">{problem.evidence}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CollapsibleSection>
          )}

          {/* Section 03: What I did */}
          {project.sections.whatIDid && (
            <WhatIDidSection 
              steps={project.sections.whatIDid.steps}
              description={project.sections.whatIDid.description}
              keywords={project.sections.whatIDid.keywords}
            />
          )}

          {/* Section 04: Design solutions */}
          {project.sections.designSolutions && (
            <DesignSolutionsSection
              description={project.sections.designSolutions.description}
              keywords={project.sections.designSolutions.keywords}
            />
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
      </PageTransitionWrapper>
    </SidebarProvider>
  )
}
