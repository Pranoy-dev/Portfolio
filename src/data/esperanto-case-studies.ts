import { Camera, Palette, Monitor, Lightbulb, Users, Globe, Zap, FileText, Code, Play, Shield, BarChart3, TrendingUp } from "lucide-react"

/**
 * Case Study Data Structure
 * 
 * IMPORTANT: All step descriptions in the "What I did" section MUST have content.
 * Empty descriptions will result in only images being displayed, which may not be
 * the intended user experience. The validation functions below will warn you in
 * development mode if descriptions are missing.
 * 
 * Required fields for each step:
 * - title: string (required)
 * - description: string (required, must not be empty)
 * - image: string (optional)
 * - imageAlt: string (optional)
 * - imageCaption: string (optional)
 */

/**
 * Validates that a step description is not empty.
 * Logs a warning in development mode if description is empty.
 * 
 * @param stepTitle - The title of the step (for error messaging)
 * @param description - The description to validate
 * @param stepNumber - Optional step number for better error messages
 */
function validateStepDescription(stepTitle: string, description: string, stepNumber?: string): void {
  if (process.env.NODE_ENV === 'development' && (!description || description.trim().length === 0)) {
    const stepInfo = stepNumber ? `Step ${stepNumber} (${stepTitle})` : stepTitle
    console.error(
      `⚠️ Missing description for "${stepInfo}" in case study data.\n` +
      `Please add a description to ensure proper content display.`
    )
  }
}

/**
 * Validates all steps in a "What I did" section to ensure descriptions are present.
 * This helps catch missing content early in development.
 */
function validateWhatIDidSteps(steps: Array<{ number: string; title: string; description: string }>): void {
  if (process.env.NODE_ENV === 'development') {
    steps.forEach(step => {
      validateStepDescription(step.title, step.description, step.number)
    })
  }
}

/** One paragraph per image in Visma neo-bank case study “What I did” modals. */
const VISMA_CS3_WHAT_I_DID_MODAL_CAPTIONS = [
  "First and foremost, like all other projects, the goal was to learn about the users. For that, we started messaging people on LinkedIn, attending events and meetups, and finding future users through Facebook groups. Within weeks of starting the project, I was on a mission to meet as many people as possible and understand their businesses, routines, workflows, and pain points.",
  "It was my responsibility to understand where the product could help and identify the low-hanging, high-impact ideas we should aim for in the beginning. These insights were later presented to the team so we could brainstorm the details and plan future execution together.",
  "We ran short design sprints that lasted only seven days at a time. Once we had a list of features to create, I sat down with the senior developer and started building the first iterations. We usually worked in the same room from morning until evening, discussing ideas, writing on the whiteboard, and pushing hard to create the smallest MVP possible for testing. This became a great learning experience for me, not only in design but also in learning React and developing alongside him.",
  "Every MVP was tested with the user group we collected through UX interviews, and feedback was continuously gathered. Sometimes, to challenge ourselves, we aimed for harder features that could create maximum value for users. We called this process Crazy 8's, where the team voted on which ideas to prioritise first. Although we built many different products, I will not be able to present everything here, as many projects were protected under non-disclosure agreements.",
] as const

/** Badge terms for each caption above (short phrases and keywords that appear in that paragraph). */
export const VISMA_CS3_WHAT_I_DID_MODAL_EXTRA_KEYWORDS: string[][] = [
  ["Facebook groups", "LinkedIn", "meetups", "users", "mission", "pain points", "workflows"],
  ["responsibility", "insights", "brainstorm", "low-hanging", "high-impact", "execution"],
  ["seven days", "sprints", "MVP", "React", "whiteboard", "iterations", "learning experience"],
  ["UX interviews", "feedback", "maximum value", "MVP", "prioritise", "non-disclosure agreements", "challenge"],
]

/** “What I did” → UI design modal only (Visma case study 3). */
const VISMA_CS3_UI_DESIGN_MODAL_CAPTIONS = [
  "UI design had very limited space within this project due to the short sprint cycles, where we had to produce many different iterations in a short amount of time. I studied banking apps and online resources to create mockups that suited our needs.",
  "Our north star in design was trust. It was important for users to feel confident that the platform handled their money and businesses carefully. Because of that, we focused heavily on micro-interactions and messaging that reinforced clarity and reliability.",
  "Another important UI principle was simplicity. We collected only the absolute minimum information during onboarding and gradually gathered the rest through KYC processes when specific events triggered background checks.",
  "Many different apps were built and tested. Some focused on advisory services, some on invoicing, and others on bookkeeping. The more we tested our hypotheses, the more we understood the users and their perceived needs. We also realised that people were hesitant to take advice from AI, especially back in 2019, long before tools like ChatGPT or Claude became mainstream. Another insight was that users preferred using a web app over a mobile experience for business-related transactions. This was often connected to traditional belief systems within certain age groups regarding perceived trust and value, similar to the preference for human customer support over AI. I found this especially fascinating.",
] as const

export const VISMA_CS3_UI_DESIGN_MODAL_EXTRA_KEYWORDS: string[][] = [
  ["sprint cycles", "iterations", "mockups", "banking apps", "limited space"],
  ["north star", "trust", "micro-interactions", "reliability", "clarity"],
  ["simplicity", "onboarding", "KYC", "minimum information"],
  ["hypotheses", "ChatGPT", "Claude", "bookkeeping", "invoicing", "advisory services", "web app", "mobile experience", "customer support", "fascinating", "perceived trust"],
]

/** “What I did” → Methods modal only (Visma case study 3). */
const VISMA_CS3_METHODS_MODAL_CAPTIONS = [
  "This was the first place where I came across the book Sprint by Jake Knapp, which focused on solving difficult early-stage startup problems through design sprints. The method was developed by Google Ventures for their venture projects. While it shared similarities with other design processes such as understand, define, sketch, decide, prototype, and validate, the main focus was on momentum and decision-making. This approach matched our timeline perfectly.",
  "Over many months, we found, developed, and tested numerous ideas. Some failed, some succeeded, and some showed great potential. But the biggest positive outcome was the learning process itself. By continuously building and delivering products back-to-back, we learned a great deal about both the users and our own capabilities. This eventually helped us discover a few truly valuable ideas.",
  "When it came to research, we tried to map out as much as possible. Many ideas fail because of weak initial hypotheses, and sometimes speaking to only a few users is not enough. You need surveys, focus groups, and direct exposure to the environments where users spend their time. Over time, many of our best insights came simply from being around the users, allowing us to move from assumptions to more validated understanding.",
  "Another key aspect of the experience was defining the user properly and thinking broadly about the end-to-end user experience while connecting it to sustainable business models. We believed the best approach was to create experiences compelling enough that users would naturally recommend them to friends and family. To achieve that, we had to build for real user needs, not just market assumptions.",
] as const

export const VISMA_CS3_METHODS_MODAL_EXTRA_KEYWORDS: string[][] = [
  ["Sprint", "Jake Knapp", "Google Ventures", "design sprints", "momentum", "decision-making"],
  ["learning process", "back-to-back", "valuable ideas", "capabilities"],
  ["surveys", "focus groups", "hypotheses", "assumptions", "validated understanding"],
  ["end-to-end", "business models", "real user needs", "friends and family"],
]

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
            image: "/Images/Case study 1/The challenges/evolving context.png",
            imageAlt: "Evolving context",
            imageCaption: "Understanding interconnected systems across countries"
          },
          {
            title: "Challenge 2: Changing priorities",
            description: "With large systems, priorities move fast. Plans change, market needs shift, and technical constraints show up late. In this project, product design had to create clarity, make calls with imperfect information, and keep the team moving.\n\nOne thing that made it harder was trust. The development team did not fully trust leadership, so the direction of the platform kept changing. At one point, there were serious talks about going fully API-first and not redesigning the UI at all, because it felt like the smarter use of time.\n\nBut that push to remove the UI was not based on real user needs. It came from not seeing the full use case. Once we did the research, it was clear that core users across departments rely heavily on the conversation-style UI to troubleshoot and configure software updates. When we showed that, the direction became much easier to align on.",
            image: "/Images/Case study 1/The challenges/changing priorities 13.09.48.png",
            imageAlt: "Changing priorities",
            imageCaption: "Adapting to shifting priorities and constraints"
          },
          {
            title: "Challenge 3: Low UX maturity",
            description: "The team was strongly engineering-led and focused on hard infrastructure work more than flow and experience improvements. A big part of my role became building shared understanding, using strategy and empathy, and gradually shifting the mindset so we could land a better outcome together.",
            image: "/Images/Case study 1/The challenges/Uxmaturity.png",
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
            image: "/Images/Case study 1/What I did/UX research.png",
            imageAlt: "UX research",
            imageCaption: "Interviewing stakeholders and analyzing user sessions",
            additionalImages: [
              {
                src: "/Images/Case study 1/What I did/User persona.png",
                alt: "User persona",
                layout: "left" // image on left, text on right
              },
              {
                src: "/Images/Case study 1/What I did/UX research.png",
                alt: "UX research insights",
                layout: "top" // image on top, text below
              }
            ]
          },
          {
            number: "2",
            title: "UI design",
            description: "",
            image: "/Images/Case study 1/What I did/UI design.png",
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
        keywords: ["Information architecture", "Wireframe", "Design"],
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
        description: "Getting out of my comfort zone",
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
  },
  {
    id: 2,
    title: "Ambient Lighting Experience",
    subtitle: "Research and development of Internal software",
    description: "Rapid prototyping and visual UX improvements for ambient lighting systems.",
    heroImage: "/Images/DDW.jpg",
    role: ["Senior UX Designer"],
    team: ["6 designers", "cross functional teams", "20 developers"],
    client: "Automotive",
    date: "2024 - 4 Months",
    websiteUrl: undefined,
    sections: {
      about: {
        title: "Research and Design for DDW lighting experience",
        description: "This was an R&D project at Scania, built into one of their core systems called Digital Driver Workspace. The DDW is positioned as one of the most premium cabin experiences in the automotive space, combining hardware, software, and interaction design to shape how drivers experience the cabin.\n\nThe ambient lighting concept did not start with me. It had been in the making for years and was driven by the business unit, backed by extensive user research. Those studies showed that expectations around in-cabin lighting were changing, and that customers wanted more than just aesthetics. The success of the concept was measured through customer satisfaction and increased demand for premium lighting options in the cabin."
      },
      challenge: {
        title: "The challenge",
        description: "Scania R&D is full of strong talent, but it is also a place where priorities constantly compete. At any given time, multiple initiatives are running in parallel, all fighting for development time and attention.",
        keywords: ["Decision making", "Crossfunctional Chaos", "Information overload"],
        content: [
          {
            title: "Challenge 1: Decision making",
            description: "When a product is made of many interconnected features, tied to hardware roadmaps and business plans, decisions naturally get harder. Add a heavy approval process on top, and things slow down even more. Almost everything gets blocked at some point.\n\nGetting everyone involved sounds smart, especially when you want to protect quality and standards. But in practice, it often took time from everyone and made decisions harder. More perspectives were not always helpful, especially with tight deadlines and upcoming launches. It became surprisingly difficult to take a good idea from start to finish, even when it clearly improved the user experience.",
            image: "/Images/Case study 2/The challenge/Decision making.jpg",
            imageAlt: "Decision making",
            imageCaption: "Understanding interconnected systems across countries"
          },
          {
            title: "Challenge 2: Crossfunctional Chaos",
            description: "Most R&D features required input from many teams and departments. While this should create clarity, it often added more ambiguity. In some cases, bringing stakeholders in too early led to endless discussions, lost momentum, and eventually dropped initiatives.",
            image: "/Images/Case study 2/The challenge/Crossfunctional.jpg",
            imageAlt: "Crossfunctional Chaos",
            imageCaption: "Adapting to shifting priorities and constraints"
          },
          {
            title: "Challenge 3: Information overload",
            description: "New information was constant. Every week there were updates about new technologies, research, or future concepts. While interesting, it often pulled focus away from real priorities. Long presentations, sometimes three to four hours at a time, were meant to align everyone. In reality, they drained energy and attention from the work people were actually responsible for.",
            image: "/Images/Case study 2/The challenge/Overload.jpg",
            imageAlt: "Information overload",
            imageCaption: "Building shared understanding and shifting mindset"
          }
        ]
      },
      realProblems: {
        title: "The real problems",
        description: "After going through existing research, interviewing users, and benchmarking competitors, a few patterns became clear. These were also validated by experts inside Scania.",
        keywords: ["Unused capabilities", "Lack of a shared vision", "Functional misalignment"],
        problems: [
          {
            title: "Problem 1: Unused capabilities",
            description: "The technology needed to create a premium lighting experience already existed in the newer trucks. The latest platform, with its advanced electrical architecture (SESSAM 7), had far more potential than earlier generations. But because priorities kept shifting, that capability was never used to improve the cabin lighting experience. Instead, the same lighting controls were carried over again and again into new truck generations.",
            evidence: "Advanced electrical architecture (SESSAM 7) had far more potential than earlier generations"
          },
          {
            title: "Problem 2: Lack of a shared vision",
            description: "The issue was not a lack of ideas. It was a lack of focus. There were many opinions on how the lighting system should work and what it should achieve, but no single, shared vision to bring them together and push it through the organization. Without clear ownership, ideas lost momentum before they ever reached development.",
            evidence: "No single, shared vision to bring ideas together and push through the organization"
          },
          {
            title: "Problem 3: Functional misalignment",
            description: "Like in many large organizations, important information often got stuck halfway. Teams were full of smart and motivated people, but they were not always aligned or connected in the right way. That misalignment made it harder for anyone to go the extra step needed to build something truly exceptional.",
            evidence: "Teams were not always aligned or connected in the right way"
          }
        ]
      },
      whatIDid: {
        title: "What I did",
        description: "To make this feel like a great Scania experience, I focused on three things: research, design and prototyping.",
        keywords: ["UX research", "UI design", "Methods"],
        steps: [
          {
            number: "1",
            title: "UX research",
            description: "",
            image: "",
            imageAlt: "UX research",
            imageCaption: "",
            additionalImages: [
              {
                src: "/Images/Case study 2/What I did/UX research/Image 1.png",
                alt: "UX research image 1",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/UX research/Image 2.png",
                alt: "UX research image 2",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/UX research/image 3.png",
                alt: "UX research image 3",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/UX research/Image 4.png",
                alt: "UX research image 4",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/UX research/image 5.png",
                alt: "UX research image 5",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/UX research/Image 6.png",
                alt: "UX research image 6",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/UX research/Image 7.png",
                alt: "UX research image 7",
                layout: "top"
              }
            ]
          },
          {
            number: "2",
            title: "UI design",
            description: "",
            image: "/Images/Case study 1/What I did/UI design.png",
            imageAlt: "UI design",
            imageCaption: "Designing with Scania's Tegel design system",
            additionalImages: [
              {
                src: "/Images/Case study 2/What I did/UI design/Image 1.png",
                alt: "UI design image 1",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/UI design/Image 2.png",
                alt: "UI design image 2",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/UI design/Image 3.png",
                alt: "UI design image 3",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/UI design/Image 4.png",
                alt: "UI design image 4",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/UI design/Image 5.png",
                alt: "UI design image 5",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/UI design/image 6.png",
                alt: "UI design image 6",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/UI design/image 7.png",
                alt: "UI design image 7",
                layout: "top"
              }
            ]
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
            imageCaption: "Applying various research and design methods",
            additionalImages: [
              {
                src: "/Images/Case study 2/What I did/Methods/Image 1.png",
                alt: "Methods image 1",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/Methods/Image 2.png",
                alt: "Methods image 2",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/Methods/Image 3.png",
                alt: "Methods image 3",
                layout: "top"
              },
              {
                src: "/Images/Case study 2/What I did/Methods/Image 4.webp",
                alt: "Methods image 4",
                layout: "top"
              }
            ]
          }
        ]
      },
      designSolutions: {
        title: "Design solutions",
        description: "Creating a unique and memorable experience that enables confident decision-making. The interface prioritizes context visibility and reduces friction in the approval process.",
        keywords: ["Information architecture", "Wireframe", "Design"],
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
        description: "Getting out of my comfort zone",
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
  },
  {
    id: 3,
    title: "Visma's Neo Bank concept",
    subtitle: "Neo bank R&D for early-stage startups at SpeedLedger (Visma)",
    description: "R&D exploration of simplified banking and automated bookkeeping for small businesses, from research through design solutions.",
    heroImage: "/Images/Banking.jpg",
    role: ["First designer"],
    team: ["Senior developer", "Product owner"],
    client: "SpeedLedger (Visma)",
    date: "R&D — SpeedLedger era",
    websiteUrl: undefined,
    sections: {
      about: {
        title: "Simplified Banking and Automated Bookkeeping",
        description: "This was an R&D project at SpeedLedger, later acquired by Visma. The goal was to study early-stage entrepreneurs and explore how a neo bank could better support their financial workflows. I joined as the first designer in a small team together with a senior developer and product owner.\n\nWe worked with rapid research, prototyping, and testing to validate ideas quickly. The initiative was treated as a moonshot project within the company."
      },
      challenge: {
        title: "The challenge",
        description: "The biggest challenge was making fast decisions while balancing risk and uncertainty. We worked like an early-stage startup, building for a niche that was still being defined.",
        keywords: ["Speed", "Balancing risk", "Uncertainty"],
        content: [
          {
            title: "Challenge 1: Speed",
            description: "We rarely had perfect information about the market or the product surface area. The team had to choose directions, cut scope, and still keep momentum. I helped make tradeoffs visible with lightweight prototypes and short research cycles so we could align on the next bet without stalling in analysis.",
            image: "/Images/Case study 3/speed.jpg",
            imageAlt: "Speed",
            imageCaption: "Fast decisions with imperfect information"
          },
          {
            title: "Challenge 2: Balancing risk",
            description: "Banking and bookkeeping operate in heavily regulated environments, which meant we had to balance speed with responsibility. We could not move recklessly, but we also could not slow down to the point where experimentation and learning stopped. To manage this, we worked in small and testable product slices, where legal, compliance, and product discussions stayed grounded in real user scenarios instead of abstract assumptions.",
            image: "/Images/Case study 3/risk.jpg",
            imageAlt: "Balancing risk",
            imageCaption: "Compliance without killing learning speed"
          },
          {
            title: "Challenge 3: Uncertainty",
            description: "Another major challenge was understanding the diversity within early-stage startups. Founders, freelancers, consultants, and small business owners often shared similar financial frustrations, but their workflows, priorities, and risk tolerance were very different. We had to stay focused enough to design for a clear target group while also recognizing the complexity and variation within that audience.",
            image: "/Images/Case study 3/Uncertainity.jpg",
            imageAlt: "Uncertainty",
            imageCaption: "A moving target that still needed a clear story"
          }
        ]
      },
      realProblems: {
        title: "The real problems",
        description: "Internal assumptions and biases sometimes affected the direction of the project. It showed how difficult it can be for organizations to accept when early assumptions are wrong.",
        keywords: ["Assumptions", "Bias", "Organizational learning"],
        problems: [
          {
            title: "Problem 1: Assumptions",
            description:
              "We often anchored on the first plausible story about what founders needed. That helped us move fast in the beginning, but it also made it harder to fully hear contradictory evidence later. It also became challenging when early prototypes, built on assumptions, had already been presented by management internally. This created friction within the larger organization between following real user evidence or protecting ideas that looked good on paper.",
            evidence: "Early hypotheses were sticky even when new data appeared",
            image: "/Images/Case study 3/Assumptions.jpg"
          },
          {
            title: "Problem 2: Internal Bias",
            description:
              "Comfortable patterns from existing products also leaked into new concepts, even when we were trying to think from zero. People had strong opinions on how things should be shaped, even when those patterns did not necessarily create an edge for this new product. We repeatedly had to ask whether a solution was \"true for users\" or simply \"true because it matched what we already knew how to build.\"",
            evidence: "Familiar UI patterns reappeared before problems were fully reframed",
            image: "/Images/Case study 3/InternalBias.jpg"
          },
          {
            title: "Problem 3: Learning",
            description:
              "The project also reinforced that organizations celebrate learning in theory, but admitting a wrong bet can still feel costly in practice. User value, while often described as a core product principle, can sometimes be pushed aside for short-term business wins. This experience showed how much product and design work is actually about communication, alignment, and diplomacy. Creating enough safety within a team to change direction without losing credibility became an important part of the process.",
            evidence: "Pivot moments were emotionally harder than technically hard",
            image: "/Images/Case study 3/Learning.jpg"
          }
        ]
      },
      whatIDid: {
        title: "What I did",
        description: "We worked using the Google Design Sprint methodology and a build-measure-learn approach. I actively researched users, conducted interviews, created prototypes, and continuously tested ideas with target users.",
        keywords: ["Google Design Sprint", "Build-measure-learn", "Interviews", "Prototypes"],
        steps: [
          {
            number: "1",
            title: "UX research",
            description: "",
            image: "/Images/Case study 3/UX/UX 1.1.png",
            imageAlt: "UX research",
            imageCaption: "",
            additionalImages: [
              { src: "/Images/Case study 3/UX/UX 1.1.png", alt: "UX research", layout: "top" as const, caption: VISMA_CS3_WHAT_I_DID_MODAL_CAPTIONS[0] },
              { src: "/Images/Case study 3/UX/UX 2.png", alt: "UX research", layout: "top" as const, caption: VISMA_CS3_WHAT_I_DID_MODAL_CAPTIONS[1] },
              { src: "/Images/Case study 3/UX/UX 3.png", alt: "UX research", layout: "top" as const, caption: VISMA_CS3_WHAT_I_DID_MODAL_CAPTIONS[2] },
              { src: "/Images/Case study 3/UX/UX 4.png", alt: "UX research", layout: "top" as const, caption: VISMA_CS3_WHAT_I_DID_MODAL_CAPTIONS[3] },
            ] as { src: string; alt: string; layout: "top"; caption?: string }[],
          },
          {
            number: "2",
            title: "UI design",
            description: "",
            image: "/Images/Case study 3/UI/UI 1.png",
            imageAlt: "UI design",
            imageCaption: "Prototypes and flows for core banking and bookkeeping moments",
            additionalImages: [
              { src: "/Images/Case study 3/UI/UI 1.png", alt: "UI design", layout: "top" as const, caption: VISMA_CS3_UI_DESIGN_MODAL_CAPTIONS[0] },
              { src: "/Images/Case study 3/UI/UI 1.1.png", alt: "UI design", layout: "top" as const, caption: VISMA_CS3_UI_DESIGN_MODAL_CAPTIONS[1] },
              { src: "/Images/Case study 3/UI/UI 2.png", alt: "UI design", layout: "top" as const, caption: VISMA_CS3_UI_DESIGN_MODAL_CAPTIONS[2] },
              { src: "/Images/Case study 3/UI/UI 3.png", alt: "UI design", layout: "top" as const, caption: VISMA_CS3_UI_DESIGN_MODAL_CAPTIONS[3] },
            ] as { src: string; alt: string; layout: "top"; caption?: string }[],
          },
          {
            number: "3",
            title: "User testing",
            description: "",
            image: "/Images/Banking.jpg",
            imageAlt: "User testing",
            imageCaption: "Testing ideas with target users"
          },
          {
            number: "4",
            title: "Methods",
            description: "",
            image: "/Images/Case study 3/Methods/Method 1.png",
            imageAlt: "Methods",
            imageCaption: "Design sprints and iterative delivery",
            additionalImages: [
              { src: "/Images/Case study 3/Methods/Method 1.png", alt: "Methods", layout: "top" as const, caption: VISMA_CS3_METHODS_MODAL_CAPTIONS[0] },
              { src: "/Images/Case study 3/Methods/method 1.1.png", alt: "Methods", layout: "top" as const, caption: VISMA_CS3_METHODS_MODAL_CAPTIONS[1] },
              { src: "/Images/Case study 3/Methods/Method 1.2.png", alt: "Methods", layout: "top" as const, caption: VISMA_CS3_METHODS_MODAL_CAPTIONS[2] },
              { src: "/Images/Case study 3/Methods/method 2.png", alt: "Methods", layout: "top" as const, caption: VISMA_CS3_METHODS_MODAL_CAPTIONS[3] },
            ] as { src: string; alt: string; layout: "top"; caption?: string }[],
          }
        ]
      },
      designSolutions: {
        title: "Design solutions",
        description: "The product focused on simplicity, clarity, and building trust with users. We designed systems that provided guidance and financial clarity during important moments.",
        keywords: ["Simplicity", "Clarity", "Trust", "Guidance"],
        features: []
      },
      learnings: {
        description: "What this moonshot changed for me",
        keywords: ["Focus", "Core problems", "Restraint"],
        items: [
          {
            title: "Focus in high-risk environments",
            description: "The project taught me how important focus is in high-risk startup environments. When timelines and credibility are fragile, a sharp problem statement is a strategy.\n\nSpreading attention across too many hypotheses diluted both the product story and the research signal. Narrowing the bet made the work easier to explain and easier to test.",
            icon: Lightbulb,
            image: "/Images/Banking.jpg",
          },
          {
            title: "Core problems first",
            description: "Solving core user problems well is often more valuable than trying to solve too many problems at once.\n\nUsers rewarded clarity in the basics: understanding balances, knowing what happens next, and feeling guided through intimidating tasks. The \"extra\" features mattered less than we initially assumed.",
            icon: Users,
            image: "/Images/Banking.jpg",
          },
          {
            title: "Restraint as craft",
            description: "Restraint became a design skill: choosing what not to build, what not to explain yet, and what to keep calm on screen.\n\nIn a neo bank concept, confidence often comes from fewer words, fewer choices, and fewer surprises — not from more surface area.",
            icon: Zap,
            image: "/Images/Banking.jpg",
          }
        ]
      },
      impact: {
        title: "Impact",
        description: "As an R&D initiative, impact was measured in learning velocity and stakeholder alignment as much as shipped code. The work informed how the organization thinks about small-business financial workflows and neo-bank concepts.",
        keywords: ["Validated direction", "Shared language", "Faster learning"],
        metrics: [
          { value: "Sprint", label: "Research rhythm", change: "Weekly" },
          { value: "3", label: "Core journeys", change: "Prioritized" },
          { value: "10+", label: "Ideas explored", change: "Moonshot" },
          { value: "1", label: "Design seat", change: "From zero" }
        ],
        testimonials: [
          {
            name: "Product owner",
            role: "SpeedLedger R&D",
            location: "🇸🇪",
            quote: "Having design in the room from day one changed how fast we could test whether founders actually wanted this.",
            avatar: undefined
          }
        ]
      },
      awards: []
    }
  }
]

// Validate all case studies in development mode to catch missing descriptions early
if (process.env.NODE_ENV === 'development') {
  esperantoCaseStudies.forEach((study, index) => {
    if (study.sections.whatIDid?.steps) {
      validateWhatIDidSteps(study.sections.whatIDid.steps)
    }
  })
}
