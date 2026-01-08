"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, RefreshCw, Home, Star, ExternalLink, Github } from "lucide-react"

// Portfolio projects data
const projects = [
  {
    id: 1,
    title: "Uify AI",
    url: "https://uify-one.vercel.app",
    description: "AI-powered frontend generation platform",
    fullDescription: "An AI-driven platform that transforms natural language prompts into fully responsive React and Next.js components. Leverages OpenAI for intelligent code synthesis and design recommendations, enabling instant visual prototyping. Features automated background tasks with Inngest, containerized code previews using Docker and E2B Sandbox, and a type-safe API layer built with tRPC. The backend utilizes NeonDB with Prisma ORM for efficient data handling and scalability.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "ShadcnUI", "OpenAI API", "Docker", "TRPC", "Clerk", "Prisma", "NeonDB", "Inngest", "Tanstack Query", "E2B Sandbox"],
    image: "/browser/uify.png",
  },
  {
    id: 2,
    title: "Aspire AI",
    url: "https://aspire-ai-mauve.vercel.app",
    githubUrl: "https://github.com/prince-695/aspire-ai",
    description: "AI Career Coach & Study Planner",
    fullDescription: "An intelligent career coaching platform that generates personalized study plans and skill roadmaps tailored to individual goals. Powered by Gemini API for conversational AI capabilities, offering topic explanations, summaries, and guided learning interactions. Features secure authentication via Clerk, automated roadmap generation through Inngest workflows, and efficient progress tracking with NeonDB and Prisma. Built with Next.js for optimal performance and smooth user experience.",
    tech: ["Next.js", "JavaScript", "TailwindCSS", "ShadcnUI", "Gemini API", "NeonDB", "Prisma", "Inngest", "Clerk"],
    image: "/browser/aspire.png",
  },
  {
    id: 3,
    title: "Xenith - Zentry.com clone",
    url: "https://zentry-xenith.vercel.app",
    githubUrl: "https://github.com/prince-695/xenith",
    description: "Visually rich animated frontend clone",
    fullDescription: "A stunning frontend recreation of Zentry.com showcasing advanced UI animations and smooth transitions. Features pixel-perfect layouts with scroll-triggered parallax effects and motion animations using GSAP and Framer Motion. Built with React and TailwindCSS for responsive design across all devices. Demonstrates mastery of modern animation practices and frontend craftsmanship with immersive visual storytelling.",
    tech: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "GSAP"],
    image: "/browser/xenith.png",
  },
  {
    id: 4,
    title: "Storix - Drive clone",
    githubUrl: "https://github.com/prince-695/storix",
    description: "Cloud storage solution inspired by Google Drive",
    fullDescription: "A full-featured cloud storage web application with secure file uploads, folder creation, and hierarchical organization. Built with Next.js and TypeScript, utilizing Appwrite for authentication, file storage, and database management. Features a modern, accessible interface designed with Shadcn UI and TailwindCSS, offering smooth animations and polished user experience. Implements scalable session management, metadata tracking, and data consistency through Appwrite APIs.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Appwrite", "ShadcnUI"],
    image: "/browser/storix.png",
  },
  {
    id: 5,
    title: "Wordly - Modern Blogging Platform",
    url: "https://wordly-iota.vercel.app/",
    githubUrl: "https://github.com/prince-695/wordly",
    description: "A blogging platform for everyone.",
    fullDescription: "A modern blogging platform with rich text editor, markdown support, and social features. Includes user authentication, comment system, tags, categories, and search functionality. Built for content creators who want a clean and powerful blogging experience.",
    tech: ["Next.js", "TailwindCSS", "Typescript", "ShadcnUI", "TRPC", "NextAuth", "Markdown", "Drizle", "NeonDB", "Tanstack Query"],
    image: "/browser/wordly.png",
  },
  {
    id: 6,
    title: "My old Portfolio",
    url: "https://old-portfolio.vercel.app/",
    githubUrl: "https://github.com/prince-695/old-portfolio",
    description: "Previous portfolio design",
    fullDescription: "My previous portfolio website showcasing earlier projects and design philosophy. Features smooth animations, project showcases, and contact information. Built with modern web technologies and creative design patterns.",
    tech: ["Next.js", "JavaScript", "Tailwind CSS", "Framer Motion"],
    image: "/browser/old-portfolio.png",
  },
]

type ViewType = 'home' | 'details'

export default function Safari() {
  const [view, setView] = useState<ViewType>('home')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const goBack = () => {
    if (view === 'details') {
      setView('home')
      setSelectedProject(null)
    }
  }

  const goHome = () => {
    setView('home')
    setSelectedProject(null)
  }

  const selectProject = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setView('details')
  }

  const getCurrentUrl = () => {
    if (view === 'home') return 'prince://projects'
    if (view === 'details' && selectedProject) return `prince://projects/${selectedProject.id}`
    return 'prince://projects'
  }

  return (
    <div className="h-full flex flex-col bg-white text-gray-800">
      {/* Toolbar */}
      <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center space-x-2">
        <button
          className={`p-1 rounded hover:bg-gray-200 ${view === 'home' ? 'opacity-40 cursor-not-allowed' : ''}`}
          onClick={goBack}
          disabled={view === 'home'}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200 opacity-40 cursor-not-allowed" disabled>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200" onClick={handleRefresh}>
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
        <button className="p-1 rounded hover:bg-gray-200" onClick={goHome}>
          <Home className="w-4 h-4" />
        </button>

        {/* Read-only URL bar */}
        <div className="flex-1 flex items-center bg-gray-200 rounded px-3 py-1.5">
          <span className="text-xs text-gray-500 mr-2">🔒</span>
          <input
            type="text"
            value={getCurrentUrl()}
            readOnly
            className="w-full bg-transparent focus:outline-none text-sm text-gray-700 cursor-default select-all"
          />
        </div>

        <button className="p-1 rounded hover:bg-gray-200">
          <Star className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-white scrollbar-hide">
        {/* HOME VIEW - Project List */}
        {view === 'home' && (
          <div className="p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Projects</h1>
              <p className="text-gray-600 mb-6 md:mb-8">Explore my portfolio of web applications and projects</p>
              
              <div className="space-y-3 md:space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => selectProject(project)}
                    className="p-3 md:p-4 flex flex-row justify-between items-center hover:bg-neutral-50 rounded-xl cursor-pointer border border-gray-200 transition-colors"
                  >
                    <div className="flex gap-3 md:gap-4 flex-row flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-14 w-14 rounded-lg object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <h3 className="font-medium text-neutral-800 text-sm md:text-base truncate">
                          {project.title}
                        </h3>
                        <p className="text-neutral-600 text-xs md:text-sm mt-1 line-clamp-1 md:line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <button className="flex-shrink-0 ml-3 px-3 md:px-4 py-2 text-xs md:text-sm rounded-full font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors whitespace-nowrap">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DETAILS VIEW - Project Info */}
        {view === 'details' && selectedProject && (
          <div className="p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 md:mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{selectedProject.title}</h1>
                
                {/* Project preview */}
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center mb-4 md:mb-6 border-2 border-gray-200 overflow-hidden">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* About */}
                <div className="mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">About This Project</h2>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">{selectedProject.fullDescription}</p>
                </div>

                {/* Tech Stack */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Tech Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-700 rounded-lg text-xs md:text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                  {selectedProject.url && (
                    <button
                      onClick={() => window.open(selectedProject.url, '_blank', 'noopener,noreferrer')}
                      className="w-full md:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Visit Site
                    </button>
                  )}
                  
                  {selectedProject.githubUrl && (
                    <button
                      onClick={() => window.open(selectedProject.githubUrl, '_blank', 'noopener,noreferrer')}
                      className="w-full md:flex-1 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      GitHub
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
