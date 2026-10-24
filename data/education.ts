export interface EducationData {
  degree: string
  institution: string
  faculty: string
  location: string
  duration: string
  cgpa: string
  focusAreas: string[]
}

export interface AchievementItem {
  id: string
  title: string
  issuer: string
  date: string
  type: "award" | "certification" | "hackathon"
  badgeIcon: string
  description?: string
}

export const educationData: EducationData = {
  degree: "Bachelor of Technology in Computer Science and Technology (AI-ML)",
  institution: "Adani University",
  faculty: "Faculty of Engineering Science and Technology",
  location: "Ahmedabad, Gujarat, India",
  duration: "July 2023 – Present",
  cgpa: "8 / 10",
  focusAreas: [
    "Full Stack Engineering — Next.js, React, TypeScript, Scalable Web Applications",
    "Backend & Distributed Systems — Go, Node.js, FastAPI, REST APIs, Microservices",
    "Artificial Intelligence & Generative AI — LLM Integration, AI Agents, Model Fine-tuning",
    "Speech & Language AI Research — Deep Learning, Transformers, Low-Resource Languages",
    "Database Engineering — PostgreSQL, MongoDB, Redis, Schema Design, Data Migration",
    "Software Architecture & DevOps — System Design, Docker, CI/CD, Cloud Deployment",
    "Data Structures & Algorithms — Problem Solving, Algorithmic Optimization",
    "Operating Systems & Computer Networks — Linux, Process Management, Networking Fundamentals",
  ],
}

export const certificationsData: AchievementItem[] = [
  {
    id: "anthropic-ai-fluency",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "Jun 2026",
    type: "certification",
    badgeIcon: "🤖",
    description:
      "Explores effective, efficient, ethical, and safe collaboration with AI systems through Anthropic's AI Fluency framework.",
  },
  {
    id: "claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    date: "Jun 2026",
    type: "certification",
    badgeIcon: "🧠",
    description:
      "An introductory course covering effective prompting, Claude Projects, Skills, Artifacts, connected tools, research workflows, and practical AI-assisted work.",
  },
  {
    id: "3dvss-2026",
    title: "3D Vision Summer School (3DVSS 2026)",
    issuer: "BITS Pilani, Goa Campus",
    date: "Jun 2026",
    type: "certification",
    badgeIcon: "🎓",
    description:
      "A summer school focused on 3D computer vision, 3D representations, geometry processing, deep learning, and emerging vision applications.",
  },
  {
    id: "aws-cloud-practitioner",
    title: "Amazon Web Services Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "Apr 2026",
    type: "certification",
    badgeIcon: "☁️",
    description:
      "Cloud learning credential listed on LinkedIn. Verify the exact credential title and certification status against the original AWS record before publishing.",
  },
  {
    id: "forage-deloitte",
    title: "Deloitte Australia - Technology Job Simulation",
    issuer: "Forage",
    date: "Jul 2025",
    type: "certification",
    badgeIcon: "📜",
    description:
      "A virtual technology job simulation focused on practical technology consulting and problem-solving tasks.",
  },
  {
    id: "mern-pregrad",
    title: "MERN Stack Developer Certification",
    issuer: "Pregrad",
    date: "Nov 2024",
    type: "certification",
    badgeIcon: "💻",
    description:
      "MERN stack specialization covering MongoDB, Express.js, React, and Node.js application development.",
  },
  {
    id: "daiict-bootcamp",
    title: "WEBDEV'24 Bootcamp Certification",
    issuer: "IEEE SB, DAIICT Gandhinagar",
    date: "Aug 2024",
    type: "certification",
    badgeIcon: "🌐",
    description:
      "Web development bootcamp covering practical web development concepts, application building, and modern web technologies.",
  },
];

export const hackathonsData: AchievementItem[] = [
  {
    id: "dotslash-9",
    title: "DotSlash 9.0",
    issuer: "SVNIT, Surat",
    date: "Mar 2026",
    type: "hackathon",
    badgeIcon: "🏆",
    description:
      "Hackathon participation and credential listed on LinkedIn. Add a finalist position, rank, or award only if confirmed by the official results.",
  },
  {
    id: "tic-tech-toe-2025",
    title: "TIC TECH TOE 2025",
    issuer: "DAIICT, Gandhinagar",
    date: "Apr 2025",
    type: "hackathon",
    badgeIcon: "💡",
    description:
      "Hackathon credential listed on LinkedIn. Add the project name and competition result if you want to highlight a specific achievement.",
  },
  {
    id: "dotslash-hackathon",
    title: "Top 40 Finalist — DotSlash 8.0",
    issuer: "SVNIT, Surat",
    date: "Feb 2025",
    type: "hackathon",
    badgeIcon: "🏅",
    description:
      "Ranked among the Top 40 teams at DotSlash 8.0, a national-level hackathon, for developing an innovative technical solution.",
  },
  {
    id: "tic-tech-toe",
    title: "2nd Runner-up — TIC TECH TOE'24",
    issuer: "DAIICT, Gandhinagar",
    date: "Sep 2024",
    type: "hackathon",
    badgeIcon: "🥉",
    description:
      "Secured second runner-up at the university hackathon by developing and presenting a full-stack prototype.",
  },
];

export const technicalImpactData: string[] = [
  "Built and shipped full-stack products spanning AI-powered developer tools, database infrastructure, and SaaS platforms.",
  "Developed production applications handling 7,500+ visits and 1,500+ sign-ups during Muzik Skill House's launch week.",
  "Engineered backend services in Go and TypeScript, with experience in REST APIs, authentication, RBAC, PostgreSQL, Redis, and microservice architectures.",
  "Built AI-powered applications and developer tools using LLM integrations, prompt engineering, multi-provider model support, and real-time streaming.",
  "Experience with Next.js, React, TypeScript, PostgreSQL, Docker, GitHub Actions, cloud deployments, and modern UI animation systems.",
];