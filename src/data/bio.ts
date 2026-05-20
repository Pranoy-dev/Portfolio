import { howIWork } from "@/data/portfolio-home"

export const bioProfile = {
  name: "Pranoy Mathew",
  role: "Senior UX/UI Designer",
  location: "Stockholm, Sweden",
  lead: [
    "8 years designing across Automotive, Fintech, Biotech, and Gaming.",
    "An engineer by training who moves fast and delivers value in many forms: quick decisions, polished UI, rapid wireframes, frontend code, and clear guidance.",
  ],
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

export type BioCareerProject = {
  title: string
  description: string
  href?: string
  image?: string
  imageAlt?: string
  gradient?: string
}

export type BioExperience = {
  company: string
  role: string
  period: string
  location: string
  highlights: string[]
  timelineDate?: string
  companyDescriptor?: string
  logoSrc?: string
  responsibilities?: string[]
  projects?: BioCareerProject[]
}

export const bioExperience: BioExperience[] = [
  {
    company: "Knightec Group",
    role: "Senior UX designer",
    period: "Nov 2021 – Ongoing",
    location: "Stockholm",
    companyDescriptor: "Technology consultancy",
    logoSrc: "/Images/bio/Knightec logo.png",
    highlights: ["Assignments with Scania", "Mentoring", "UX workshops"],
    responsibilities: [
      "Technology consultant, embedded full time where my skillset matters most.",
      "Three clients: Scania, International Trucks, and Medela.",
      "Beyond delivery, I mentor junior designers in UX research, team building, and AI-powered development.",
    ],
  },
  {
    company: "Medela",
    role: "Senior UX designer",
    period: "Jan 2026 – Ongoing",
    timelineDate: "JAN 2026",
    location: "Stockholm",
    companyDescriptor: "Biotech",
    logoSrc: "/Images/bio/Medela-squared-removebg-preview.png",
    highlights: ["Biotech UX", "Connected devices", "Mobile app", "User research"],
    responsibilities: [
      "Embedded via Knightec to lead UX for Medela's connected breastfeeding and pump ecosystem.",
      "Designed mobile and device companion flows for parents and clinical support teams.",
      "Built research-backed prototypes to validate onboarding, pairing, and daily usage routines.",
      "Partnered with hardware and software teams to align UI with regulatory and accessibility requirements.",
    ],
    projects: [
      {
        title: "Medela Family App",
        description:
          "Companion app helping parents track feeding, pumping, and device settings with calm, reassuring UX.",
        image: "/Images/bio/Medela-squared-removebg-preview.png",
        imageAlt: "Medela Family App",
        gradient: "linear-gradient(145deg, #fce7f3 0%, #be185d 100%)",
      },
      {
        title: "Smart Pump Connectivity",
        description:
          "End-to-end pairing and status flows connecting breast pumps with the app for real-time usage insights.",
        imageAlt: "Medela Smart Pump Connectivity",
        gradient: "linear-gradient(145deg, #fdf2f8 0%, #9d174d 100%)",
      },
    ],
  },
  {
    company: "Scania",
    role: "Senior UX designer",
    period: "Nov 2021 – Dec 2025",
    location: "Stockholm",
    companyDescriptor: "Automotive",
    logoSrc: "/Images/bio/scania_logo_bio.png",
    highlights: [
      "Strategic design",
      "DDW & Conversion",
      "TRATON / International",
      "UX research",
      "UI design systems",
    ],
    responsibilities: [
      "Lead designer on Scania Conversions, the OTA update infrastructure powering their entire truck fleet.",
      "Led R&D design projects for the latest Scania truck.",
      "Drove UX technology transfer from Scania to International Trucks within the Traton Group.",
      "Researched and designed the Scania Workshop Suite end to end.",
    ],
    projects: [
      {
        title: "Scania Conversion Systems",
        description:
          "The Scania Conversion system, a backbone of its trucks, manages thousands of daily software updates, ensuring efficiency and reliability.",
        href: "/case-study-esperanto/1",
        image: "/Images/Conversion.jpg",
        imageAlt: "Scania Conversion Systems",
        gradient: "linear-gradient(145deg, #1e3a5f 0%, #0f172a 100%)",
      },
      {
        title: "Scania DDW",
        description:
          "A top-secret R&D project spearheaded by Scania in collaboration with the company's most advanced future technology teams.",
        href: "/case-study-esperanto/2",
        image: "/Images/DDW.jpg",
        imageAlt: "Scania Digital Driver Workspace",
        gradient: "linear-gradient(145deg, #14532d 0%, #052e16 100%)",
      },
      {
        title: "International Design Systems",
        description:
          "Helping International, an American transportation brand, modernize their user experience, technology, and design system.",
        href: "/interest",
        imageAlt: "International Design Systems",
        gradient: "linear-gradient(145deg, #1e40af 0%, #172554 100%)",
      },
      {
        title: "Scania SWS",
        description:
          "Scania's Workshop system provides real-time, paperless service information integrated with the Dealer Management System.",
        imageAlt: "Scania Workshop System",
        gradient: "linear-gradient(145deg, #78350f 0%, #451a03 100%)",
      },
    ],
  },
  {
    company: "Kogama",
    role: "UX designer",
    period: "Sep 2019 – Nov 2021",
    location: "Stockholm",
    companyDescriptor: "Gaming",
    highlights: ["Led UX", "Research", "Wireframes & UI", "Adobe XD"],
    responsibilities: [
      "Led UX efforts across research, user journey maps, personas, wireframes, and prototypes.",
      "Conducted UX research via user tests, surveys, and international interviews.",
      "Designed high-fidelity UI using Adobe XD.",
      "Integrated UX design seamlessly into the development process and advocated within the engineering team.",
    ],
  },
  {
    company: "Speedledger (Visma)",
    role: "UX Engineer",
    period: "Jan 2019 – Aug 2019",
    location: "Gothenburg",
    companyDescriptor: "Fintech",
    logoSrc: "/Images/bio/Visma_logo_bio.png",
    highlights: ["React", "Lean startup", "UX research", "Wireframes"],
    responsibilities: [
      "Designed and built interfaces using the React framework.",
      "Followed lean startup methodology.",
      "Conducted UX research via NPS, surveys, and focus groups.",
      "Created user journey maps, personas, UML diagrams, wireframes, and prototypes for UX design tasks.",
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
