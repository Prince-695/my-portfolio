export interface ProfileData {
  name: string
  title: string
  headline: string
  eyebrow: string
  shortBio: string
  bio: string
  location: string
  contact: {
    email: string
    github: string
    linkedin: string
    instagram: string
    twitter: string
    resumeUrl: string
  }
  approach: string[]
  socials: Array<{
    title: string
    href: string
    iconType: "github" | "linkedin" | "mail" | "instagram" | "twitter"
  }>
}

export const profileData: ProfileData = {
  name: "Prince Rathod",
  title: "Full Stack Developer · AI/ML Engineer · Researcher",
  headline: "Building high-performance software & intelligent user experiences.",
  eyebrow: "FULL STACK ENGINEER & AI/ML SPECIALIST",
  shortBio: "B.Tech Computer Science (AI-ML) @ Adani University · Co-founder & Lead Full Stack Developer @ SPIFFY.",
  bio: "I'm a B.Tech Computer Science and Technology student specializing in AI & ML at Adani University, passionate about building scalable, high-performance web applications and intelligent software products. My work spans full-stack engineering, modern web technologies, and AI-driven solutions, with a focus on turning ideas into reliable, production-ready applications. Alongside software development, I explore applied AI/ML research, particularly in speech and language technologies, bridging the gap between research and real-world applications.",
  location: "Ahmedabad, Gujarat, India",
  contact: {
    email: "rathodprince411@gmail.com",
    github: "https://github.com/Prince-695",
    linkedin: "https://www.linkedin.com/in/prince-rathod-3a9b1b2b8/",
    instagram: "https://www.instagram.com/prince_rathod695",
    twitter: "https://x.com/Prince_Rathod69",
    resumeUrl: "/Prince_Rathod_Resume.pdf",
  },
  approach: [
    "Engineering scalable, production-ready applications using Next.js, TypeScript, React, and modern backend architectures",
    "Building AI-powered products with LLM integrations, Generative AI, intelligent agents, and API-driven workflows",
    "Crafting intuitive, pixel-perfect interfaces with Tailwind CSS, shadcn/ui, Framer Motion, and GSAP",
    "Exploring applied AI/ML research in speech processing, low-resource language technologies, and deep learning",
    "Optimizing application performance, designing modular systems, and delivering maintainable, reliable software",
  ],
  socials: [
    {
      title: "GitHub",
      href: "https://github.com/Prince-695",
      iconType: "github",
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/prince-rathod-3a9b1b2b8/",
      iconType: "linkedin",
    },
    {
      title: "Mail",
      href: "mailto:rathodprince411@gmail.com",
      iconType: "mail",
    },
    {
      title: "Instagram",
      href: "https://www.instagram.com/prince_rathod695",
      iconType: "instagram",
    },
    {
      title: "Twitter",
      href: "https://x.com/Prince_Rathod69",
      iconType: "twitter",
    },
  ],
}
