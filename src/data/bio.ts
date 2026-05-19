import { howIWork } from "@/data/portfolio-home"

export const bioProfile = {
  name: "Pranoy Mathew",
  role: "Senior UX/UI Designer",
  location: "Stockholm, Sweden",
  lead: "I design clarity into complex products—across automotive, fintech, and systems at scale.",
  portraitSrc: "/Images/bio/profile image.jpeg",
  portraitAlt: "Portrait of Pranoy Mathew",
} as const

export const bioQuote = {
  text: "Simplicity is the ultimate sophistication.",
  attribution: "Leonardo da Vinci",
} as const

export const bioAbout = [
  "I'm a Senior UX/UI designer with experience across automotive, fintech, and product teams in Stockholm. I work on end-to-end flows—from research and journey maps to UI, design systems, and prototypes—often alongside engineering.",
  "I bring a design-and-build mindset: React experience, Cursor for agentic prototyping, and a habit of validating ideas early. Whether it's in-cabin experiences at Scania or trust-driven fintech flows, I focus on what people need to decide, not everything else on the screen.",
] as const

export type BioExperience = {
  company: string
  role: string
  period: string
  location: string
  highlights: string[]
}

export const bioExperience: BioExperience[] = [
  {
    company: "Knightec Group",
    role: "Senior UX designer",
    period: "Nov 2021 – Ongoing",
    location: "Stockholm",
    highlights: [
      "Consulting assignments with Scania on strategic design efforts.",
      "Mentoring junior designers and facilitating UX workshops.",
    ],
  },
  {
    company: "Scania",
    role: "Senior UX designer",
    period: "Nov 2021 – Dec 2025",
    location: "Stockholm",
    highlights: [
      "DDW, Conversion systems, and internal platforms for global truck operations.",
      "UX for TRATON partners (International trucks); research via user tests, Hotjar, and workshops.",
      "UI across multiple design systems; journey maps, wireframes, and prototyping.",
    ],
  },
  {
    company: "Adventure Box",
    role: "UX designer",
    period: "Sep 2019 – Nov 2021",
    location: "Stockholm",
    highlights: [
      "Led UX: research, personas, journey maps, wireframes, and high-fidelity UI in Adobe XD.",
      "User tests, surveys, and international interviews; advocated for UX within engineering.",
    ],
  },
  {
    company: "Speedledger (Visma)",
    role: "UX Engineer",
    period: "Jan 2019 – Aug 2019",
    location: "Gothenburg",
    highlights: [
      "Designed and built interfaces in React; lean startup methodology.",
      "NPS, surveys, focus groups; UML, wireframes, and prototypes for UX tasks.",
    ],
  },
]

export type BioFeaturedWork = {
  title: string
  description: string
  href: string
  external?: boolean
}

export const bioFeaturedWork: BioFeaturedWork[] = [
  {
    title: "Scania Conversion Systems",
    description: "Software update backbone for trucks—efficiency and reliability at global scale.",
    href: "/case-study/1",
  },
  {
    title: "Scania DDW",
    description: "Premium digital driver workspace and in-cabin experience.",
    href: "/case-study/2",
  },
  {
    title: "Visma — Digital banking",
    description: "Trust-driven fintech flows for entrepreneurs.",
    href: "/case-study/3",
  },
  {
    title: "International design systems",
    description: "Modernizing UX and design systems for TRATON / International trucks.",
    href: "/interest",
  },
]

export type BioSkillPillar = {
  title: string
  description: string
}

export const bioSkillPillars: BioSkillPillar[] = [
  {
    title: "UX design",
    description:
      "Wireframing, information architecture, and clear communication across complex flows.",
  },
  {
    title: "UI design",
    description:
      "Design libraries, visual systems, and modern tooling with a detail-oriented eye.",
  },
  {
    title: "UX research",
    description:
      "Frameworks and methods across teams—user tests, surveys, Hotjar, and workshops.",
  },
  {
    title: "Development",
    description:
      "React.js experience and a developer mindset for realistic, shippable interfaces.",
  },
  {
    title: "AI research",
    description:
      "Using AI tools for faster market, product, and user research to inform decisions.",
  },
  {
    title: "AI prototyping",
    description:
      "Rapid interactive prototypes with Cursor to test ideas and validate user value.",
  },
]

export const bioTools = [
  { name: "Figma", note: "UI/UX" },
  { name: "Cursor", note: "Agentic prototyping" },
  { name: "Adobe XD", note: "UI/UX" },
  { name: "Hotjar", note: "UX research" },
  { name: "Miro", note: "Workshops" },
  { name: "Jira", note: "Project management" },
  { name: "Visual Studio Code", note: "Development" },
] as const

export const bioLanguages = [
  { language: "English", level: "Fluent" },
  { language: "Malayalam / Hindi", level: "Native" },
  { language: "Swedish", level: "Intermediate" },
] as const

export type BioEducation = {
  school: string
  degree: string
  period: string
}

export const bioEducation: BioEducation[] = [
  {
    school: "Jönköping University",
    degree: "MSc Information Engineering",
    period: "2015 – 2018",
  },
  {
    school: "CEVT (Zeekr)",
    degree: "Master thesis — Route prediction using ML",
    period: "2017 – 2018",
  },
  {
    school: "Amrita University",
    degree: "BSc Electronics & Instrumentation",
    period: "2009 – 2013",
  },
]

export const bioProcess = howIWork

export const bioLinks = {
  email: "pranoymathew1990@gmail.com",
  phone: "(+46) 721587184",
  website: "https://www.pranoymathew.com",
  linkedin: "https://www.linkedin.com/in/pranoy-mathew",
  resumePdf: "/Pranoy_Resume_2026.pdf",
} as const
