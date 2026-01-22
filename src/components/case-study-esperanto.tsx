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
function HighlightedText({ text, isDark = false }: { text: string; isDark?: boolean }) {
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
    "moonshot improvements",
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
    "product team"
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

// Modal Component for What I Did Steps - Apple Design
function StepModal({ 
  step, 
  isOpen, 
  onClose 
}: { 
  step: { title: string; description: string; image?: string; imageAlt?: string; imageCaption?: string } | null
  isOpen: boolean
  onClose: () => void
}) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setShowFullDescription(false)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !step) return null

  const descriptionLines = step.description.split('\n\n')
  const previewText = descriptionLines[0]
  const fullText = step.description

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop with strong blur - Apple style */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
      
      {/* Modal Content - Apple Design */}
      <div 
        className="relative z-10 w-full max-w-5xl max-h-[95vh] overflow-hidden rounded-3xl bg-gradient-to-br from-background via-background to-muted/20 border border-border/30 shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Apple style */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-background/90 backdrop-blur-md border border-border/40 flex items-center justify-center hover:bg-background transition-all duration-200 hover:scale-110"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hero Image Section */}
        {step.image && (
          <div className="relative w-full aspect-[21/9] overflow-hidden">
            <Image
              src={step.image}
              alt={step.imageAlt || step.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />
          </div>
        )}

        {/* Content Section */}
        <div className="p-8 md:p-12 overflow-y-auto max-h-[calc(95vh-300px)]">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight leading-tight">{step.title}</h2>
          
          <div className="space-y-4">
            {!showFullDescription ? (
              <>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <HighlightedText text={previewText} />
                </p>
                {descriptionLines.length > 1 && (
                  <Button
                    onClick={() => setShowFullDescription(true)}
                    variant="outline"
                    className="mt-4"
                  >
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </>
            ) : (
              <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                <HighlightedText text={fullText} />
                <Button
                  onClick={() => setShowFullDescription(false)}
                  variant="ghost"
                  size="sm"
                  className="mt-4"
                >
                  Show less
                </Button>
              </div>
            )}
          </div>

          {step.imageCaption && (
            <div className="mt-8 pt-8 border-t border-border/20">
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                {step.imageCaption}
              </p>
            </div>
          )}
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
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
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
                        
                        {/* Apple TV-style subtle gradient overlay at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
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
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
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
                    <button
                      onClick={() => setSelectedStep(index)}
                      className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 text-white font-semibold hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer"
                      style={{
                        background: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(12px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span className="text-sm font-medium tracking-tight">{step.title}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1 shrink-0" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CollapsibleSection>

      {/* Modal */}
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
      </PageTransitionWrapper>
    </SidebarProvider>
  )
}
