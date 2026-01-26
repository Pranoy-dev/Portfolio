import { Camera, Palette, Monitor, Lightbulb, Users, Globe, Zap, FileText, Code, Play, Shield, BarChart3, TrendingUp } from "lucide-react"

export const esperantoCaseStudies = [
  {
    id: 1,
    title: "Scania Conversion Systems",
    subtitle: "Research and development of Internal software",
    description: "A comprehensive case study about solving decision paralysis in global software update processes.",
    heroImage: "/Images/Conversion.jpg",
    role: ["Lead designer"],
    team: ["2 designers", "20 developers"],
    client: "Scania",
    date: "2024 - 6 Months",
    websiteUrl: undefined,
    sections: {
      about: {
        title: "Research and redesign for Scania's internal software system",
        description: "Conversion is one of Scania's oldest and biggest monolith systems. It has been around for almost 20 years, and the team finally decided it was time to modernize it, because the impact on Scania IT worldwide is huge. I was brought in to understand this highly technical platform, run user studies across roles, and redesign it into a clearer, more modern system. My goal was simple: enable fast, confident software update decisions with full traceability.\n\nResearch showed the real problem was not too much information. Users spent around 60% of their time searching for context, and decision paralysis came from missing information and lack of guidance at key moments. The solution focused on bringing context and guidance into the right places. As a result, decision time dropped by half, and understanding the \"why\" behind each update became twice as easy."
      },
      challenge: {
        title: "The challenge",
        description: "They call Conversion the old giant. It is complex, heavily outdated, and difficult to change. Documentation is thin, and most engineering effort naturally goes into infrastructure improvements rather than user experience. That is the reality of working on an internal legacy system.",
        keywords: ["Evolving context", "Changing priorities", "Low UX maturity"],
        content: [
          {
            title: "Challenge 1: Evolving context",
            description: "Scania's push for more interconnected truck systems kept adding new complexity. I was not asked to study Conversion in isolation. I had to interview users across countries and connected systems, then identify both quick wins and bigger \"moonshot\" improvements.\n\nOn top of that, the IT landscape was not just large, it was changing faster than it had in the past. Scania was moving more towards a software-as-a-service way of working, which meant the platform had to keep evolving while we were redesigning it. And at the same time, new regulatory requirements from the EU and US kept coming in, especially around data security, user management, and how users can access and interact with stored information.",
            image: "/Images/evolving context.png",
            imageAlt: "Evolving context",
            imageCaption: "Understanding interconnected systems across countries"
          },
          {
            title: "Challenge 2: Changing priorities",
            description: "With large systems, priorities move fast. Plans change, market needs shift, and technical constraints show up late. In this project, product design had to create clarity, make calls with imperfect information, and keep the team moving.\n\nOne thing that made it harder was trust. The development team did not fully trust leadership, so the direction of the platform kept changing. At one point, there were serious talks about going fully API-first and not redesigning the UI at all, because it felt like the smarter use of time.\n\nBut that push to remove the UI was not based on real user needs. It came from not seeing the full use case. Once we did the research, it was clear that core users across departments rely heavily on the conversation-style UI to troubleshoot and configure software updates. When we showed that, the direction became much easier to align on.",
            image: "/Images/changing priorities.png",
            imageAlt: "Changing priorities",
            imageCaption: "Adapting to shifting priorities and constraints"
          },
          {
            title: "Challenge 3: Low UX maturity",
            description: "The team was strongly engineering-led and focused on hard infrastructure work more than flow and experience improvements. A big part of my role became building shared understanding, using strategy and empathy, and gradually shifting the mindset so we could land a better outcome together.",
            image: "/Images/Uxmaturity.png",
            imageAlt: "Low UX maturity",
            imageCaption: "Building shared understanding and shifting mindset"
          }
        ]
      },
      realProblems: {
        title: "The real problems",
        description: "After a bunch of stakeholder interviews, feedback surveys, and screen recordings from users around the world, the patterns were hard to ignore.",
        keywords: ["Context gap", "No traceability", "Broken flows"],
        problems: [
          {
            title: "Problem 1: Context gap",
            description: "Most users did not struggle with the decision itself. They struggled with getting the information needed to make it. They kept jumping between systems just to understand what an update meant, what changed, and what to do next. A lot of people also did not know some of the existing tools even existed. The result was slow approvals and extra troubleshooting. In reality, users were spending 60%+ of their time hunting for context instead of approving updates.",
            evidence: "Users spending 60%+ of their time hunting for context instead of approving updates"
          },
          {
            title: "Problem 2: No traceability",
            description: "The process worked on trust, until it did not. At Scania's scale, it became really hard to see who did what, when, and why. That lack of traceability created stress in the team and led to avoidable breakdowns. We estimated around 20% of downtime was tied to this kind of \"who changed what?\" problem.",
            evidence: "Around 20% of downtime was tied to traceability issues"
          },
          {
            title: "Problem 3: Broken flows",
            description: "Conversion was built over two decades, and it shows. Features were added as demands came in from different regions, which meant a lot of half-finished flows and technical workarounds. People lost time just completing basic tasks, fixing bugs, and planning new features. My takeaway was simple: if we clean up the core flows, we can remove a lot of wasted effort, likely cutting update work time by around 50% for common tasks.",
            evidence: "Cleaning up core flows could cut update work time by around 50% for common tasks"
          }
        ]
      },
      whatIDid: {
        title: "What I did",
        description: "To make this feel like a great Scania experience, I focused on four things: research, design, prototyping, and testing.",
        keywords: ["UX research", "UI design", "User testing", "Methods"],
        steps: [
          {
            number: "1",
            title: "UX research",
            description: "Since the goal was to understand Conversion and find both quick wins and moonshot opportunities, we started with the basics: reading the manuals. I genuinely believe that without a solid understanding of the technology and features, it is hard to make good design decisions.\n\nSince the goal was to understand Conversion and find both quick wins and moonshot opportunities, we started with the basics: reading the manuals. I genuinely believe that without a solid understanding of the technology and features, it is hard to make good design decisions.\n\nNext, I reviewed the work from the previous designer and their findings. I wanted to build on what already existed, without getting stuck in suggestions that were not fully documented.\n\nAfter that, we spoke to users through a mix of structured and unstructured interviews. I talked with the product owner to understand the vision, engineers across different regions who work with the system daily, and business analysts who have supported the platform for years. One thing became clear fast: most of the real knowledge lives with a small group of people who have been close to Conversion for a long time.\n\nI captured insights first in Miro and later in FigJam, and shared learnings in regular sessions with the team. A lot of the conversations were about how flows actually work today, personal workarounds, what frustrates people, and what they wish the system could do next.\n\nWe also built a small group of \"power users\" and kept coming back to them at every stage to validate direction and decisions. They played a big role in shaping the final design.\n\nDue to Scania's research restrictions, we could not run surveys at the start. We did send them later, once early prototypes were ready.",
            image: "/Images/What I did/UX research.png",
            imageAlt: "UX research",
            imageCaption: "Interviewing stakeholders and analyzing user sessions",
            additionalImages: [
              {
                src: "/Images/What I did/User persona.png",
                alt: "User persona",
                layout: "left" // image on left, text on right
              },
              {
                src: "/Images/What I did/UX research.png",
                alt: "UX research insights",
                layout: "top" // image on top, text below
              }
            ]
          },
          {
            number: "2",
            title: "UI design",
            description: "",
            image: "/Images/UI design.png",
            imageAlt: "UI design",
            imageCaption: "Designing with Scania's Tegel design system"
          },
          {
            number: "3",
            title: "User testing",
            description: "",
            image: "/Images/Conversion.jpg",
            imageAlt: "User testing",
            imageCaption: "Continuous testing and user feedback collection"
          },
          {
            number: "4",
            title: "Methods",
            description: "",
            image: "/Images/Conversion.jpg",
            imageAlt: "Methods",
            imageCaption: "Applying various research and design methods"
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
            title: "Managing ambiguity",
            description: "Ambiguity was everywhere in this project, and it was not the inspiring kind. It was the day-to-day kind where priorities shift, constraints appear late, and everyone has a different version of what the platform should become. Conversion touched so many systems that no single person had the full picture. Some weeks the goal felt like \"modernize the UI,\" and other weeks it was \"do not touch the UI, go API-first.\" As a designer, I could not wait for a perfect plan. I had to work with what was real in front of us and help the team find direction.\n\nThe way I handled it was simple: I kept grounding decisions in user reality. I talked to the people who actually approve updates and troubleshoot problems, and I used quick wireframes and prototypes to make fuzzy conversations tangible. When someone said \"we should remove this screen,\" I could show what users would lose and where the decision would break. When someone wanted to add more info, I could point out that the issue was missing context in the right place, not more data everywhere. In the end, my role was not just designing screens, it was reducing uncertainty and somehow I really enjoyed it",
            icon: Lightbulb
          },
          {
            title: "Building trust",
            description: "Building trust ended up being one of the most important parts of the work, and it was not something you fix with a nicer UI. Inside the product, people were making decisions that had real consequences, but they often did not feel confident because the system could not answer basic questions like \"who changed this?\" or \"why did we approve that?\" When the platform cannot explain itself, users start relying on personal trust and memory, and that breaks quickly at Scania's scale. A big UX goal for me became making the system feel dependable, not just usable.\n\nTrust also mattered inside the team. There were moments where direction was shaky and opinions were loud, so I leaned on transparency. I brought recordings, patterns from user sessions, and clear prototypes into the room so we could talk about the same reality. I made tradeoffs explicit, wrote down decisions, and kept looping in a small group of power users to validate what we were building. Over time, that consistency helped both sides: users trusted the product more because it was traceable and predictable, and the team trusted the direction more because it was grounded in evidence",
            icon: Users
          },
          {
            title: "Momentum",
            description: "Momentum became a design problem as much as a delivery problem. In a system this big, it is easy to get stuck in endless discussions, competing priorities, and \"we will fix it later\" decisions. I learned that UX can either slow a product down, or speed it up, depending on how you structure the work. If every question becomes a debate, progress dies. So my focus was to make the next step obvious, for users and for the team.\n\nWhat helped was keeping everything concrete and moving in small steps. I used wireframes and prototypes to turn unclear discussions into clear decisions. I kept the scope tight around flows blocking approvals, and validated early so we did not build the wrong thing.\n\nI agree completely: the person who protects momentum shapes the future of the product, because momentum decides what actually ships, what gets adopted, and what becomes the new normal.",
            icon: Zap
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
