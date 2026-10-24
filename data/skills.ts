
export interface SkillCategory {
  category: string
  skills: Array<{
    name: string
    badgeUrl?: string
    level?: "Advanced" | "Proficient" | "Familiar"
    iconName?: string
  }>
}

export const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "TypeScript", badgeUrl: "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white", level: "Advanced" },
      { name: "JavaScript", badgeUrl: "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E", level: "Advanced" },
      { name: "Go", badgeUrl: "https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white", level: "Proficient" },
      { name: "Python", badgeUrl: "https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54", level: "Advanced" },
      { name: "Java", badgeUrl: "https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white", level: "Familiar" },
      { name: "SQL", badgeUrl: "https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white", level: "Proficient" },
      { name: "HTML5", badgeUrl: "https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white", level: "Advanced" },
      { name: "CSS3", badgeUrl: "https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white", level: "Advanced" },
    ],
  },
  {
    category: "Frontend Technologies",
    skills: [
      { name: "React", badgeUrl: "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB", level: "Advanced" },
      { name: "Next.js", badgeUrl: "https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white", level: "Advanced" },
      { name: "Tailwind CSS", badgeUrl: "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white", level: "Advanced" },
      { name: "Shadcn UI", badgeUrl: "https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white", level: "Proficient" },
      { name: "Radix UI", badgeUrl: "https://img.shields.io/badge/radix%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white", level: "Proficient" },
      { name: "Framer Motion", badgeUrl: "https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue", level: "Advanced" },
      { name: "GSAP", badgeUrl: "https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white", level: "Proficient" },
      { name: "Vite", badgeUrl: "https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white", level: "Advanced" },
      { name: "OpenTUI", badgeUrl: "https://img.shields.io/badge/OpenTUI-222222?style=for-the-badge&logo=gnometerminal&logoColor=white", level: "Proficient" },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "Node.js", badgeUrl: "https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white", level: "Advanced" },
      { name: "Express.js", badgeUrl: "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB", level: "Advanced" },
      { name: "FastAPI", badgeUrl: "https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white", level: "Proficient" },
      { name: "Fiber", badgeUrl: "https://img.shields.io/badge/Fiber-00ADD8?style=for-the-badge&logo=go&logoColor=white", level: "Proficient" },
      { name: "Hono", badgeUrl: "https://img.shields.io/badge/Hono-E36002?style=for-the-badge&logo=hono&logoColor=white", level: "Proficient" },
      { name: "tRPC", badgeUrl: "https://img.shields.io/badge/tRPC-%232596BE.svg?style=for-the-badge&logo=tRPC&logoColor=white", level: "Advanced" },
      { name: "REST APIs", badgeUrl: "https://img.shields.io/badge/REST-02569B?style=for-the-badge&logo=fastapi&logoColor=white", level: "Advanced" },
      { name: "gRPC", badgeUrl: "https://img.shields.io/badge/gRPC-244C5A?style=for-the-badge&logo=grpc&logoColor=white", level: "Familiar" },
      { name: "OpenAPI", badgeUrl: "https://img.shields.io/badge/OpenAPI-6BA539?style=for-the-badge&logo=openapiinitiative&logoColor=white", level: "Proficient" },
      { name: "WebSockets", badgeUrl: "https://img.shields.io/badge/WebSockets-010101?style=for-the-badge&logo=socketdotio&logoColor=white", level: "Proficient" },
      { name: "React Query", badgeUrl: "https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white", level: "Advanced" },
      { name: "Inngest", badgeUrl: "https://img.shields.io/badge/Inngest-000000?style=for-the-badge&logo=inngest&logoColor=white", level: "Proficient" },
      { name: "JWT & OAuth", badgeUrl: "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens", level: "Proficient" },
      { name: "Microservices", badgeUrl: "https://img.shields.io/badge/Microservices-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white", level: "Proficient" },
    ],
  },
  {
    category: "AI, Machine Learning & Speech Research",
    skills: [
      { name: "OpenAI API", badgeUrl: "https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white", level: "Advanced" },
      { name: "Google Gemini API", badgeUrl: "https://img.shields.io/badge/Google_Gemini-8E75C4?style=for-the-badge&logo=google&logoColor=white", level: "Advanced" },
      { name: "Vercel AI SDK", badgeUrl: "https://img.shields.io/badge/Vercel_AI_SDK-000000?style=for-the-badge&logo=vercel&logoColor=white", level: "Proficient" },
      { name: "Hugging Face", badgeUrl: "https://img.shields.io/badge/Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black", level: "Proficient" },
      { name: "Transformers", badgeUrl: "https://img.shields.io/badge/Transformers-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black", level: "Proficient" },
      { name: "PyTorch", badgeUrl: "https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white", level: "Proficient" },
      { name: "TensorFlow", badgeUrl: "https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white", level: "Proficient" },
      { name: "Keras", badgeUrl: "https://img.shields.io/badge/Keras-D00000?style=for-the-badge&logo=keras&logoColor=white", level: "Proficient" },
      { name: "Scikit-Learn", badgeUrl: "https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white", level: "Proficient" },
      { name: "Pandas", badgeUrl: "https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white", level: "Proficient" },
      { name: "Librosa", badgeUrl: "https://img.shields.io/badge/Librosa-3776AB?style=for-the-badge&logo=python&logoColor=white", level: "Proficient" },
      { name: "Speech Processing", badgeUrl: "https://img.shields.io/badge/Speech_Processing-00897B?style=for-the-badge&logo=python&logoColor=white", level: "Proficient" },
      { name: "Neural Networks", badgeUrl: "https://img.shields.io/badge/Neural_Networks-8E44AD?style=for-the-badge&logo=pytorch&logoColor=white", level: "Proficient" },
      { name: "Ollama", badgeUrl: "https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white", level: "Proficient" },
      { name: "E2B Sandbox", badgeUrl: "https://img.shields.io/badge/E2B_Sandbox-FF8800?style=for-the-badge&logo=box&logoColor=white", level: "Proficient" },
    ],
  },
  {
    category: "Databases & Data Engineering",
    skills: [
      { name: "PostgreSQL", badgeUrl: "https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white", level: "Advanced" },
      { name: "NeonDB", badgeUrl: "https://img.shields.io/badge/NeonDB-00E599?style=for-the-badge&logo=postgresql&logoColor=black", level: "Advanced" },
      { name: "MongoDB", badgeUrl: "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white", level: "Proficient" },
      { name: "MySQL", badgeUrl: "https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white", level: "Proficient" },
      { name: "Redis", badgeUrl: "https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white", level: "Proficient" },
      { name: "SQLite", badgeUrl: "https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white", level: "Proficient" },
      { name: "Prisma ORM", badgeUrl: "https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white", level: "Advanced" },
      { name: "Drizzle ORM", badgeUrl: "https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black", level: "Proficient" },
      { name: "Supabase", badgeUrl: "https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white", level: "Proficient" },
      { name: "Appwrite", badgeUrl: "https://img.shields.io/badge/Appwrite-%23FD366E.svg?style=for-the-badge&logo=appwrite&logoColor=white", level: "Proficient" },
    ],
  },
  {
    category: "DevOps, Cloud & Developer Tools",
    skills: [
      { name: "Git", badgeUrl: "https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white", level: "Advanced" },
      { name: "GitHub", badgeUrl: "https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white", level: "Advanced" },
      { name: "GitHub Actions", badgeUrl: "https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white", level: "Proficient" },
      { name: "Docker", badgeUrl: "https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white", level: "Proficient" },
      { name: "Vercel", badgeUrl: "https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white", level: "Advanced" },
      { name: "Render", badgeUrl: "https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white", level: "Proficient" },
      { name: "Cloudflare", badgeUrl: "https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white", level: "Proficient" },
      { name: "AWS", badgeUrl: "https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white", level: "Proficient" },
      { name: "Google Cloud", badgeUrl: "https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white", level: "Familiar" },
      { name: "Linux", badgeUrl: "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black", level: "Proficient" },
      { name: "Bun", badgeUrl: "https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white", level: "Advanced" },
      { name: "pnpm", badgeUrl: "https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white", level: "Proficient" },
      { name: "Turborepo", badgeUrl: "https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white", level: "Proficient" },
      { name: "Postman", badgeUrl: "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white", level: "Proficient" },
      { name: "Figma", badgeUrl: "https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white", level: "Proficient" },
    ],
  },
]
