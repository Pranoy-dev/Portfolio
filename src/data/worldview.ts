/** Home card + page content for worldview. */
export const worldviewHero = {
  eyebrow: "Perspective",
  title: "My world view",
  lead: "How I see work, life, and achievement.",
} as const

export type WorldviewFaqItem = {
  id: string
  question: string
  answer: string
}

export const worldviewFaq: WorldviewFaqItem[] = [
  {
    id: "success",
    question: "How do I define success in my work?",
    answer:
      "My definition of success keeps changing as I get older. At this point, success is personal development for me — being able to learn from people better than me and stay at the forefront of technology, solving problems that matter. Feeling useful to the world gives me purpose and meaning.",
  },
  {
    id: "colleagues",
    question: "What do colleagues mean to me?",
    answer:
      "It's important to have a personal relationship with the people I spend time with — colleagues are no different. I like being able to speak freely about ideas, life, and the future with them, and to be a great listener to their story. I believe being helpful, kind, and compassionate comes before anything transactional. I like to lead when needed, and follow when that's required.",
  },
  {
    id: "communication",
    question: "What do I think about communication?",
    answer:
      "Communication is an art. Some are naturally good at it, others train themselves. Either way, it's the most important skill a team can have. I'm good at conveying ideas without overwhelming people, and I like to inspire others through words. I'm a big fan of great communicators and often learn from how effortlessly they influence others.",
  },
  {
    id: "disagreement",
    question: "How do I handle disagreement?",
    answer:
      "I have strong opinions — on work, life, skills, expectations. I like holding people accountable so the team performs better. At the same time, I understand people are unique: different temperaments, different pasts, different goals. That creates disagreement, but I see it as how relationships evolve. I never hold grudges, jealousy, or anger toward people. Conflict is a necessary part of work and life — it's how the most resilient ideas survive.",
  },
  {
    id: "product-design",
    question: "Why did I choose product design?",
    answer:
      "I'm an artist at heart, and design is part of my personal expression. I love the influence design has on people's lives — not just aesthetic experiences, but the way it simplifies life. I'm a big fan of Apple's products, the depth they go to for a truly considered user experience. I believe in the future, the difference between a great product and a life-changing product will come down to how it's designed.",
  },
  {
    id: "ai",
    question: "Where do I stand with AI?",
    answer:
      "Just like electricity and the internet reshaped human society, AI will be a major shift in how people interact with the world and each other. It will change how people work, how value is created, how markets function, and ultimately how we all live day to day. Embracing AI is part of the natural evolution of society, and I'm simply a fan of the technology.",
  },
  {
    id: "ux-future",
    question: "What is the future of user experience for products?",
    answer:
      "No one can predict the future, but you can spot probable trends from existing innovation. Button-pressing interfaces will fade, and voice as an interface will grow in the coming years. Alongside that, agentic experiences will become more prominent — where everything a user needs is automatically curated and gathered by a personal assistant. User experience never truly disappears, because everyone will always have their own experience with what they use — but the graphical layer of it will change radically.",
  },
  {
    id: "work-future",
    question: "What is the future of work?",
    answer:
      "The future of work is small teams solving very important problems in the world — groups of intelligent, tech-savvy people with no standard job titles, working together to maximize the rise of AI and build immensely valuable companies. But as general intelligence advances further, even that will shift. Decades from now, I believe only the truly passionate will keep working, and it won't be for money.",
  },
  {
    id: "tech-sectors",
    question: "What technology sectors will be most valuable in the near future?",
    answer:
      "Infrastructure is the first big pillar — power, computing, and more. Next comes hyper-personalization of every experience, no matter the product. After that, how identities are protected, and autonomous governance systems that facilitate resource allocation. Further out, how different societies form around their own food and power resources. There are many possible directions the world could go. The only certainty is that change is inevitable.",
  },
]
