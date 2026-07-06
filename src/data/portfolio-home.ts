/** Apple-style home hero — kicker, lead, single-line subcopy. */
export const homeHeroHeadline = {
  eyebrow: "Design philosophy",
  lead: "Design is about tradeoffs.",
  support: "Too much distracts. Too little hides what matters.",
} as const

export const headline = `${homeHeroHeadline.lead} ${homeHeroHeadline.support}`

export const headlineExtended =
  "This portfolio shows how I work: I break complexity into clear steps and reveal details only when they matter. I built it in Next.js using cursor."

export const heroStatement =
  "I'm the hidden expert behind your everyday digital experiences"

export const heroLocation = "Freelance Product Designer · Systems, research & build"

export const heroName = "Pranoy Mathew"
export const heroRole = "Senior UX/UI Product Design Generalist"

export type HomeThumbnailCard = {
  id: string
  href: string
  title: string
  caption: string
  details?: string
  hoverWord: string
  /** Marquee text behind the graphic (Jonathan-style). */
  marquee?: string
  /** Short keywords for marquee strip (joined with ·). Overrides marquee when set. */
  marqueeKeywords?: readonly string[]
  /** Show marquee strip without hover (default: hover only). */
  marqueeAlwaysVisible?: boolean
  /** Show large hover word overlay (default: true). */
  showHoverWord?: boolean
  /** Short CTA on the card (visual only — whole card is the link). */
  ctaLabel: string
  /** Full CSS background (gradient) for poster tiles. */
  gradientCss: string
}

/** Home navigation tiles — Bio & case studies. */
export const homeThumbnailCards: HomeThumbnailCard[] = [
  {
    id: "bio",
    href: "/bio",
    title: "Bio",
    caption: "Senior designer who can code.",
    details: "8 years in automotive, biotech and fintech, Stockholm.",
    hoverWord: "BUILD!",
    marqueeKeywords: [
      "Design",
      "Code",
      "Research",
      "Stockholm",
      "Fintech",
      "Automotive",
      "Biotech",
      "Systems",
    ],
    marqueeAlwaysVisible: true,
    showHoverWord: false,
    ctaLabel: "View bio",
    gradientCss:
      "linear-gradient(168deg, #6fcf7a 0%, #43aa5e 38%, #2d6a4f 72%, #1b4332 100%)",
  },
  {
    id: "interest",
    href: "/interest",
    title: "Case studies",
    caption: "Complex systems made clear.",
    details: "Fleet OTA, connected health, neo-banking products.",
    hoverWord: "DESIGN!",
    marqueeKeywords: [
      "Systems",
      "Fleet OTA",
      "Health",
      "Fintech",
      "Governance",
      "Trust",
      "Prototypes",
      "Ship",
    ],
    marqueeAlwaysVisible: true,
    showHoverWord: false,
    ctaLabel: "View work",
    gradientCss:
      "linear-gradient(168deg, #5c6b6e 0%, #3d4f52 35%, #2a3638 68%, #1a2224 100%)",
  },
]

export const credibilityStrip = {
  title:
    "I am a Senior UX/UI Designer building tools and platforms across automotive, gaming, and fintech. I have been designing for around 7 years, and I spend most of my time solving real-world problems, from building a simple app to track my groceries to coding an agentic communication layer for modern work. I genuinely love both design and engineering.",
  skills: [
    "Complex systems UX",
    "User research",
    "UI design + front-end build",
    "Rapid AI prototyping",
  ],
}

export type CaseStudyCard = {
  id: number
  problem: string
  role: string
  impact: string
  tags: string[]
  gradient: string
  borderColor: string
  hoverGradient: string
  imageGradient: string
  image: string
}

export const caseStudies: CaseStudyCard[] = [
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
  },
]

export const howIWork = [
  "Start with constraints and decision log",
  "Prototype to kill risk early",
  "Ship, measure, iterate",
  "Systems > screens",
]

export const homeNavDestinations = [
  {
    id: "interest" as const,
    href: "/interest",
    label: "Case studies",
    repeat: "PORTFOLIO PORTFOLIO PORTFOLIO",
    tagline: "Case studies that ship clarity.",
    sfx: "DESIGN",
  },
  {
    id: "bio" as const,
    href: "/bio",
    label: "Bio",
    repeat: "ABOUT ABOUT ABOUT",
    tagline: "Who is Pranoy, and how I work.",
    sfx: "HELLO",
  },
]
