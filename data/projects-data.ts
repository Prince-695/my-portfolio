export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  id: number
  slug: string
  title: string
  category: string
  period?: string
  description: string
  fullDescription?: string
  highlights?: string[]
  tech: string[]
  image?: string
  url?: string
  githubUrl?: string
  featured?: boolean
  role?: string
  metrics?: ProjectMetric[]
}

export const projectsData: Project[] = [
  {
    id: 11,
    slug: "strim-labs",
    title: "STRIM Labs",
    category: "Full Stack",
    period: "Oct 2026 – Present",
    description:
      "An API load testing, capacity benchmarking, and runtime intelligence platform built to help engineering teams understand application performance under pressure.",
    fullDescription:
      "STRIM Labs is a performance engineering platform designed to make API load testing and capacity analysis more accessible to developers. It combines a multi-worker test execution engine with real-time telemetry, allowing teams to inspect throughput, latency, errors, and performance regressions. The platform brings test configuration, execution, live monitoring, and historical comparisons into one cohesive developer experience.",
    highlights: [
      "Built a multi-worker API load testing engine using Bun.",
      "Designed real-time telemetry streaming with Server-Sent Events.",
      "Developed a modern Next.js dashboard for test execution and performance analysis.",
      "Integrated PostgreSQL and Prisma for structured test and result management.",
      "Designed performance regression comparisons to help identify changes between test runs.",
      "Focused on reliable test execution, actionable metrics, and developer experience.",
    ],
    tech: [
      "TypeScript",
      "Bun",
      "Hono",
      "Next.js",
      "React",
      "PostgreSQL",
      "Prisma",
      "Server-Sent Events",
    ],
    image: "/browser/strim-labs.png",
    url: "https://strim-labs.vercel.app",
    githubUrl: "https://github.com/Prince-695/strim-labs",
    featured: true,
    role: "Product Engineer & System Architect",
  },
  {
    id: 10,
    slug: "seasyn",
    title: "Seasyn",
    category: "Full Stack",
    period: "Aug 2026",
    description:
      "A universal database migration and live data studio platform designed to simplify database transfers, schema management, and real-time operational visibility.",
    fullDescription:
      "Seasyn is a database engineering platform focused on bringing database migration and live data management into one interface. It aims to simplify workflows across PostgreSQL, MySQL, MongoDB, and SQLite through schema inspection, migration planning, data transfer, and operational telemetry. The architecture combines a Go backend with a modern web frontend, emphasizing controlled data processing, security, and a scalable foundation for multi-tenant usage.",
    highlights: [
      "Designed a database migration and live data management experience.",
      "Developed backend services using Go and Fiber.",
      "Built a React and Vite frontend for database workflows.",
      "Worked on schema synthesis and cross-database migration workflows.",
      "Designed bounded streaming and Server-Sent Events for operational telemetry.",
      "Incorporated multi-tenant access control and AES-256-GCM encryption into the platform architecture.",
    ],
    tech: [
      "Go",
      "Fiber",
      "React",
      "TypeScript",
      "Vite",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQLite",
      "Docker",
      "Server-Sent Events",
    ],
    image: "/browser/seasyn.png",
    url: "https://seasyn.vercel.app",
    githubUrl: "https://github.com/Prince-695/seasyn",
    featured: true,
    role: "Full-Stack Engineer & Product Architect",
  },
  {
    id: 9,
    slug: "bloom",
    title: "Bloom",
    category: "AI & Tools",
    period: "Jun 2026",
    description:
      "A terminal-first AI coding agent with planning and execution modes, multi-provider LLM support, and controlled local tool execution.",
    fullDescription:
      "Bloom is an AI-powered coding agent designed around a terminal-first workflow. Its Build and Plan modes support different stages of software development, while integrations with multiple language model providers let developers choose between available models. The system combines a terminal interface, backend services, a web application, and persistent data storage to support AI-assisted development workflows.",
    highlights: [
      "Designed a terminal-first experience for AI-assisted software development.",
      "Implemented distinct Build and Plan workflows.",
      "Integrated six LLMs across Google and Groq providers.",
      "Built local tool execution workflows with an emphasis on controlled operations.",
      "Used OpenTUI and Bun for the terminal-oriented application stack.",
      "Integrated a web interface, database persistence, and GitHub Actions workflows.",
    ],
    tech: [
      "TypeScript",
      "Bun",
      "OpenTUI",
      "Hono",
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "Vercel AI SDK",
      "Google AI",
      "Groq",
      "GitHub Actions",
    ],
    image: "/browser/bloom.png",
    url: "https://bloom-web-amber.vercel.app",
    githubUrl: "https://github.com/Prince-695/Bloom",
    featured: true,
    role: "AI Product Engineer",
  },
  {
    id: 8,
    slug: "draft-io",
    title: "Draft.IO",
    category: "AI & Tools",
    period: "Jan 2026",
    description:
      "An AI-powered publishing platform combining intelligent writing assistance, personalized content discovery, and real-time communication.",
    fullDescription:
      "Draft.IO is a content and publishing platform designed to support the writing and content discovery lifecycle. It combines AI-assisted writing with recommendation capabilities and real-time messaging. Its backend architecture uses multiple services to separate key responsibilities, with a database and caching layer supporting the platform's application workflows.",
    highlights: [
      "Designed an AI-assisted writing and publishing experience.",
      "Structured backend functionality around a multi-service architecture.",
      "Integrated AI-powered writing and content recommendation workflows.",
      "Implemented real-time messaging capabilities using Socket.IO.",
      "Used PostgreSQL, MongoDB, and Redis for different data and application needs.",
      "Containerized application components with Docker.",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Bun",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "OpenAI",
      "Socket.IO",
      "Docker",
    ],
    image: "/browser/draft-io.png",
    githubUrl: "https://github.com/Prince-695/Draft.IO",
    featured: true,
    role: "Full-Stack & AI Engineer",
  },
  {
    id: 1,
    slug: "muzik-skill-house",
    title: "Muzik Skill House",
    category: "Full Stack",
    description:
      "A full-stack learning management platform built to deliver online courses, video-based learning, and integrated payments.",
    fullDescription:
      "Muzik Skill House is a learning management platform focused on delivering structured educational content through a modern web experience. The application brings together course management, authentication, video delivery, and payment workflows. Its stack combines Next.js and the T3 ecosystem with PostgreSQL, Prisma, NextAuth, VdoCipher, and Razorpay.",
    metrics: [
      { label: "Launch-week visits", value: "7,500+" },
      { label: "Sign-ups", value: "1,500+" },
      { label: "Peak daily active users", value: "500+" },
    ],
    highlights: [
      "Built a full-stack learning management experience.",
      "Integrated authentication and PostgreSQL-backed data management.",
      "Integrated VdoCipher for video delivery.",
      "Implemented payment workflows using Razorpay.",
      "Designed course and learning interfaces with Next.js.",
      "Supported substantial early user activity following launch.",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "VdoCipher",
      "Razorpay",
      "Tailwind CSS",
    ],
    image: "/browser/msh.png",
    url: "https://muzikskillhouse.com",
    featured: true,
    role: "Full-Stack Engineer",
  },
  {
    id: 2,
    slug: "aspire-ai",
    title: "Aspire AI",
    category: "AI & Tools",
    description:
      "An AI-powered application built with Next.js and Gemini, combining conversational AI with authentication and persistent data storage.",
    fullDescription:
      "Aspire AI is an AI-powered web application built around Google's Gemini API. The platform combines a modern Next.js interface with user authentication and database-backed application functionality. Prisma and NeonDB provide the data layer, while Clerk supports authentication and account management.",
    highlights: [
      "Integrated Google's Gemini API into an interactive web application.",
      "Built the application using the Next.js App Router.",
      "Integrated Clerk for authentication.",
      "Used Prisma and NeonDB for database-backed functionality.",
      "Developed a responsive interface for AI-powered interactions.",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Gemini API",
      "Prisma",
      "NeonDB",
      "Clerk",
      "Tailwind CSS",
    ],
    image: "/browser/aspire.png",
    url: "https://aspire-ai-mauve.vercel.app/",
    githubUrl: "https://github.com/prince-695/aspire-ai",
    featured: true,
    role: "Full-Stack AI Engineer",
  },
  {
    id: 3,
    slug: "uify-ai",
    title: "Uify AI",
    category: "AI & Tools",
    description:
      "An AI-focused web application designed to bring intelligent functionality into a streamlined, modern user experience.",
    fullDescription:
      "Uify AI is an AI-oriented web project built with a focus on a polished user interface and an accessible application experience. The project explores how AI capabilities can be presented through a modern web application, combining interactive frontend components with a contemporary React-based development stack.",
    highlights: [
      "Developed an AI-focused web application.",
      "Built an interactive interface using modern frontend technologies.",
      "Focused on responsive layouts and a streamlined user experience.",
      "Explored the integration of AI capabilities into a web product.",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    image: "/browser/uify.png",
    url: "https://uify-one.vercel.app/",
    featured: true,
    role: "Frontend & AI Engineer",
  },
  {
    id: 4,
    slug: "xenith",
    title: "Xenith",
    category: "Creative Dev",
    description:
      "An immersive, animation-driven web experience inspired by modern creative development and interactive digital storytelling.",
    fullDescription:
      "Xenith is a creative frontend project focused on bringing visual storytelling and motion design into a responsive web experience. The project explores polished layouts, interactive sections, and animation-led transitions to create a more engaging interface.",
    highlights: [
      "Developed a visually rich, interactive frontend.",
      "Explored animation-driven layouts and transitions.",
      "Focused on responsive design and polished interface details.",
      "Built the experience with a modern React-based web stack.",
    ],
    tech: [
      "Next.js",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    image: "/browser/xenith.png",
    url: "https://zentry-xenith.vercel.app",
    githubUrl: "https://github.com/Prince-695/Zentry-Clone--Xenith",
    featured: true,
    role: "Frontend Developer",
  },
  {
    id: 5,
    slug: "storix",
    title: "Storix",
    category: "Full Stack",
    description:
      "A cloud-storage-inspired web application focused on organizing, accessing, and managing digital files through a modern interface.",
    fullDescription:
      "Storix is a full-stack storage application inspired by familiar cloud-drive experiences. The project explores file-oriented workflows, clean interface design, and the application structure needed to support a more organized digital workspace.",
    highlights: [
      "Built a cloud-storage-inspired web interface.",
      "Focused on file organization and intuitive navigation.",
      "Developed reusable frontend components.",
      "Explored full-stack application architecture and data-driven UI patterns.",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    image: "/browser/storix.png",
    githubUrl: "https://github.com/prince-695/storix",
    featured: false,
    role: "Full-Stack Developer",
  },
  {
    id: 6,
    slug: "wordly",
    title: "Wordly",
    category: "Full Stack",
    description:
      "A web application built to deliver an interactive product experience through a modern, responsive frontend.",
    fullDescription:
      "Wordly is a web development project built with a modern React-based stack. The project emphasizes an accessible interface, reusable UI components, and a responsive experience across screen sizes.",
    highlights: [
      "Developed a modern web application using Next.js.",
      "Built responsive and reusable UI components.",
      "Focused on clear navigation and user-facing interactions.",
      "Deployed the application for public access.",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    image: "/browser/wordly.png",
    url: "https://wordly-iota.vercel.app/",
    githubUrl: "https://github.com/prince-695/wordly",
    featured: false,
    role: "Full-Stack Developer",
  },
  {
    id: 7,
    slug: "old-portfolio",
    title: "Previous Portfolio",
    category: "Creative Dev",
    description:
      "An earlier personal portfolio showcasing development projects, technical skills, and experience through a custom-built website.",
    fullDescription:
      "The previous version of my personal portfolio was built to present my projects, technical skills, and development journey in one place. It served as an earlier iteration of my online developer identity and provided a foundation for subsequent improvements in design, architecture, and presentation.",
    highlights: [
      "Created a personal website to showcase projects and technical skills.",
      "Organized development work into a dedicated portfolio experience.",
      "Deployed the website publicly.",
      "Used the project as a foundation for continued portfolio improvements.",
    ],
    tech: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    image: "/browser/old-portfolio.png",
    url: "https://princerathod-portfolio-old.vercel.app",
    githubUrl: "https://github.com/Prince-695/princerathod-portfolio-old",
    featured: false,
    role: "Designer & Developer",
  },
]