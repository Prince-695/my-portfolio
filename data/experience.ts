export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  location: string
  isCurrent: boolean
  description: string
  highlights: string[]
  techStack: string[]
  metrics?: { label: string; value: string }[]
}

export const experienceData: ExperienceItem[] = [
  {
    id: "adani-research",
    role: "Research Intern",
    company: "Adani University",
    period: "Jun 2026 – Aug 2026",
    location: "Ahmedabad, India",
    isCurrent: false,
    description:
      "Conducted research on low-resource Gujarati dialect identification from speech, benchmarking deep learning and transformer architectures to improve speech classification across underrepresented dialects.",
    highlights: [
      "Developed a speech preprocessing and acoustic feature extraction pipeline using Python and Librosa, including 16 kHz resampling and SpecAugment-based data augmentation.",
      "Expanded the training dataset from 241 to 964 samples through data augmentation and evaluated models using speaker-disjoint validation.",
      "Benchmarked CRNN, multimodal CRNN, and Wav2Vec2 architectures using PyTorch and Keras for Gujarati dialect classification.",
      "Integrated prosodic features to improve dialect discrimination, achieving a 48% improvement in Macro F1 and 100% recall on unseen dialect speech in the evaluated setting.",
      "Contributed to research analysis and academic paper development for low-resource Indian language speech technologies.",
    ],
    techStack: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Librosa",
      "Wav2Vec2",
      "CRNN",
      "Speech Processing",
      "Deep Learning",
    ],
    metrics: [
      { label: "Dataset Expansion", value: "4×" },
      { label: "Unseen-Dialect Recall", value: "100%" },
    ],
  },
  {
    id: "auraverse",
    role: "Software Engineering Intern",
    company: "AURAVERSE",
    period: "Mar 2026 – Jun 2026",
    location: "Remote",
    isCurrent: false,
    description:
      "Led frontend architecture and development for Presio CRM while contributing to backend API engineering, automated CI workflows, and production deployment.",
    highlights: [
      "Architected and developed the Presio CRM frontend, building a scalable, maintainable application architecture for production use.",
      "Engineered 10+ REST APIs in Go covering authentication, user registration, JWT-based security, and role-based access control (RBAC).",
      "Established automated CI workflows using GitHub Actions to improve code quality, build reliability, and development efficiency.",
      "Contributed 5 GitHub Actions workflows and participated in 20+ code reviews to strengthen engineering practices and delivery quality.",
      "Supported production deployments and infrastructure configuration using Cloudflare.",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Go",
      "REST APIs",
      "JWT",
      "RBAC",
      "GitHub Actions",
      "Cloudflare",
    ],
    metrics: [
      { label: "REST APIs", value: "10+" },
      { label: "Code Reviews", value: "20+" },
      { label: "CI Workflows", value: "5" },
    ],
  },
  {
    id: "techyez",
    role: "Frontend Tech Intern",
    company: "TECHYEZ",
    period: "Nov 2025 – Dec 2025",
    location: "Bengaluru, India (Remote)",
    isCurrent: false,
    description:
      "Built interactive, real-time code visualizers in Next.js to teach computer science concepts visually and intuitively.",
    highlights: [
      "Developed interactive visualizers for variable declaration, variable tracing, and loop execution.",
      "Visualized JavaScript concepts including scope, hoisting, increment operations, and call stack execution.",
      "Created fluid animations using Framer Motion and GSAP to make programming concepts easier to understand.",
      "Collaborated on reusable and accessible UI components for interactive learning experiences.",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
    ],
    metrics: [
      { label: "Focus", value: "Interactive Learning" },
      { label: "Animation", value: "Motion & GSAP" },
    ],
  },
  {
    id: "spiffy",
    role: "Full Stack Developer",
    company: "SPIFFY",
    period: "Feb 2025 – Present",
    location: "Ahmedabad, India",
    isCurrent: false,
    description:
      "Built full-stack web applications and production-ready digital products, spanning frontend engineering, backend integration, AI-powered features, and deployment.",
    highlights: [
      "Developed end-to-end web applications using Next.js, TypeScript, modern backend services, and relational databases.",
      "Contributed to Muzik Skill House LMS, which recorded 7,500+ visits and 1,500+ student sign-ups during its launch week.",
      "Integrated OpenAI and Google Gemini APIs to deliver AI-powered functionality and automated workflows.",
      "Designed responsive user interfaces, modular application architectures, and API integrations for production environments.",
      "Worked across product development, technical implementation, and deployment from concept to delivery.",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "OpenAI API",
      "Gemini API",
      "REST APIs",
    ],
    metrics: [
      { label: "Launch Visits", value: "7,500+" },
      { label: "Student Sign-ups", value: "1,500+" },
    ],
  },
];

export const availability = {
  status: "Open to Opportunities",
  roles: [
    "Software Engineer",
    "Full Stack Developer",
    "AI/ML Engineer",
    "Research Intern",
    "Research Assistant",
  ],
  interests: [
    "Full-Stack Engineering",
    "Applied AI/ML Research",
    "Speech and Language Technologies",
    "Generative AI",
  ],
};