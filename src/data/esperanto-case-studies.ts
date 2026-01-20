import { Camera, Palette, Monitor, Lightbulb, Users, Globe, Zap, FileText, Code, Play, Shield, BarChart3, TrendingUp } from "lucide-react"

export const esperantoCaseStudies = [
  {
    id: 1,
    title: "Scania Conversion Systems",
    subtitle: "Research and development of Internal software",
    description: "A comprehensive case study about solving decision paralysis in global software update processes.",
    heroImage: "/Images/Conversion.jpg",
    role: ["Lead Designer", "UX Strategy", "Research", "Design System"],
    client: "Scania",
    date: "2024 - 6 Months",
    websiteUrl: undefined,
    sections: {
      about: {
        title: "Solving decision paralysis in global software governance",
        description: "Engineering teams across 12 regions couldn't decide which software updates to approve, causing delays and inconsistent rollouts. My goal was to enable confident, fast decisions on software updates with full traceability. Through research, I discovered that users spent 60% of their time searching for context, not making decisions. Decision paralysis came from missing information, not too much information. The solution reduced decision time by 40% (from 2.5 days to 1.5 days average) while maintaining zero compliance violations and achieving 92% user satisfaction."
      },
      challenge: {
        title: "The challenge",
        description: "Engineering teams across 12 regions couldn't decide which software updates to approve, causing delays and inconsistent rollouts. The existing system lacked clarity and context, making it difficult for teams to make confident decisions quickly.",
        keywords: ["Global Scale", "Decision Paralysis", "12 Regions", "Compliance"],
        content: [
          {
            title: "Global scale complexity",
            description: "Managing software updates across 12 regions with different compliance requirements and approval workflows created significant coordination challenges.",
            image: "/Images/Conversion.jpg",
            imageAlt: "Global scale",
            imageCaption: "Teams across 12 regions needed a unified approach"
          },
          {
            title: "Decision paralysis",
            description: "Without clear context and visibility into all relevant information, teams hesitated to approve updates, causing delays that impacted product delivery timelines.",
            image: "/Images/Conversion.jpg",
            imageAlt: "Decision paralysis",
            imageCaption: "Lack of context led to delayed decisions"
          }
        ]
      },
      realProblems: {
        title: "The real problems",
        description: "Through research, I discovered the root causes behind the decision paralysis.",
        keywords: ["User Research", "Root Cause Analysis", "60% Search Time", "Missing Context"],
        problems: [
          {
            title: "Missing context, not information overload",
            description: "Users spent 60% of their time searching for context, not making decisions. Decision paralysis came from missing information, not too much information.",
            evidence: "340 support tickets about 'missing context' in 6 months, Hotjar session recordings showing users clicking back/forth 8+ times per decision"
          },
          {
            title: "Inconsistent workflows",
            description: "A workshop with 8 regional leads revealed 5 different approval workflows, showing the lack of standardization. Regional teams had different mental models of the approval process.",
            evidence: "5 different approval workflows across regions"
          },
          {
            title: "Fragmented information",
            description: "Critical information was scattered across multiple screens and systems, requiring users to piece together context manually before making decisions.",
            evidence: "Users needed to access 8+ different screens to gather all necessary context"
          }
        ]
      },
      whatIDid: {
        title: "What I did",
        description: "I conducted comprehensive research and explored multiple solution approaches to address the core problems.",
        keywords: ["User Interviews", "Workshops", "Solution Exploration", "Research"],
        steps: [
          {
            number: "1",
            title: "Research & Discovery",
            description: "I knew nothing about enterprise governance systems so I started by learning more about compliance workflows and audit requirements. I conducted 12 user interviews across 4 regions to understand the pain points. I also analyzed 340 support tickets about 'missing context' in 6 months and reviewed Hotjar session recordings showing users clicking back/forth 8+ times per decision.",
            image: "/Images/Conversion.jpg",
            imageAlt: "User research session",
            imageCaption: "Conducting user interviews with regional engineering leads across 4 regions"
          },
          {
            number: "2",
            title: "Problem Analysis",
            description: "Through research, I discovered that users spent 60% of their time searching for context, not making decisions. A workshop with 8 regional leads revealed 5 different approval workflows, showing the lack of standardization.",
            image: "/Images/Conversion.jpg",
            imageAlt: "Problem analysis",
            imageCaption: "Workshop with 8 regional leads revealed 5 different approval workflows"
          },
          {
            number: "3",
            title: "Solution Exploration",
            description: "I explored three options: Option A - Enhanced search and filters (quick win, limited impact), Option B - Contextual decision cards with all info in one place (chosen), Option C - AI-powered recommendations (too risky, compliance concerns). Option B provided the best balance: all context visible at decision point, clear action paths, and maintained human control.",
            image: "/Images/Conversion.jpg",
            imageAlt: "Solution exploration",
            imageCaption: "Exploring different solution approaches - contextual cards won"
          }
        ]
      },
      designSolutions: {
        title: "Design solutions",
        description: "Creating a unique and memorable experience that enables confident decision-making. The interface prioritizes context visibility and reduces friction in the approval process.",
        keywords: ["Decision Cards", "Role-Based Dashboards", "Workflow Design", "Mobile Interface"],
        features: [
          {
            title: "Contextual Decision Cards",
            description: "All context, stakeholders, and actions visible at the decision point. Reduced search time by 60%.",
            image: "/Images/Conversion.jpg",
            imageAlt: "Decision cards",
            imageCaption: "Decision card interface showing all relevant context"
          },
          {
            title: "Role-Based Dashboards",
            description: "Different views for engineers vs. compliance officers. Tailored to each user's needs and responsibilities.",
            image: "/Images/Conversion.jpg",
            imageAlt: "Dashboards",
            imageCaption: "Customized dashboard views for different roles"
          },
          {
            title: "Approval Workflow",
            description: "Clear steps with progress indicators. Visual timeline showing who needs to approve and when.",
            image: "/Images/Conversion.jpg",
            imageAlt: "Workflow",
            imageCaption: "Approval workflow with progress tracking"
          },
          {
            title: "Mobile Review Interface",
            description: "30% of users review on mobile. Optimized for urgent approvals on-the-go with full functionality.",
            image: "/Images/Conversion.jpg",
            imageAlt: "Mobile interface",
            imageCaption: "Mobile-responsive review interface"
          }
        ]
      },
      learnings: {
        keywords: ["Enterprise Systems", "Compliance", "Systems Thinking", "Component Design"],
        items: [
          {
            title: "Getting out of my comfort zone",
            description: "Working on enterprise governance systems required learning about compliance, audit trails, and complex approval workflows. I had to adapt quickly and understand domain-specific requirements. Constraints included NDA restrictions, legacy system integration with a 15-year-old backend, multi-language support for 8 languages, and strict compliance requiring audit trails for all decisions.",
            icon: Lightbulb
          },
          {
            title: "Listening to users",
            description: "My biggest problem during the first interviews was to stop thinking about my next question and to actually listen to the answer to my previous one. I worked a lot on that and discovered that the problem wasn't too much information, but missing context. Users needed all relevant information at the decision point, not scattered across multiple screens.",
            icon: Users
          },
          {
            title: "Learning to learn",
            description: "Learning about enterprise software, compliance requirements, governance systems, and component API design made me better at quickly understanding complex domains and translating them into intuitive designs. I worked directly with engineers on component API design and created interactive prototypes for complex interactions.",
            icon: Zap
          },
          {
            title: "Systems thinking",
            description: "This project taught me the importance of thinking in systems rather than screens. Creating reusable decision card components (used across 8 workflows), consistent status indicators, and design tokens for risk levels was crucial for maintaining quality at scale. The component library in Figma + Storybook enabled efficient handoff.",
            icon: Monitor
          }
        ]
      },
      impact: {
        title: "Impact",
        description: "The solution achieved significant improvements in decision-making speed, user satisfaction, and adoption rates while maintaining zero compliance violations.",
        keywords: ["40% Faster", "92% Satisfaction", "Zero Violations", "85% Adoption"],
        metrics: [
          { value: "40%", label: "Faster Decisions", change: "+40%" },
          { value: "92%", label: "User Satisfaction", change: "+22%" },
          { value: "0", label: "Compliance Violations", change: "Maintained" },
          { value: "85%", label: "Adoption Rate", change: "+5%" }
        ],
        testimonials: [
          {
            name: "Engineering Lead, APAC",
            role: "Regional Engineering Lead",
            location: "🇸🇬",
            quote: "This system transformed how we handle software updates. The contextual cards save us hours every week, and the approval workflow is crystal clear. Decision time dropped significantly.",
            avatar: undefined
          },
          {
            name: "Compliance Officer, EMEA",
            role: "Compliance Officer",
            location: "🇬🇧",
            quote: "Finally, a governance tool that doesn't feel like a burden. The audit trail is comprehensive, and the interface is intuitive. Zero compliance issues since launch.",
            avatar: undefined
          },
          {
            name: "Product Manager, LATAM",
            role: "Product Manager",
            location: "🇧🇷",
            quote: "The role-based dashboards are perfect. I can see exactly what I need without being overwhelmed. The mobile interface is a game-changer for urgent approvals on-the-go.",
            avatar: undefined
          },
          {
            name: "Engineering Lead, North America",
            role: "Regional Engineering Lead",
            location: "🇺🇸",
            quote: "Users reported 60% less time searching for context. The contextual information at the decision point eliminated most of our back-and-forth questions. Mobile usage increased to 45%.",
            avatar: undefined
          }
        ]
      },
      awards: [
        {
          name: "Site of The Day",
          organization: "Awwwards"
        },
        {
          name: "Site of The Day",
          organization: "FWA"
        },
        {
          name: "Site of The Day",
          organization: "CSSDA"
        }
      ]
    }
  }
]
