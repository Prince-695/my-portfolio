"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, RefreshCw, Home, Star, ExternalLink, Github } from "lucide-react"
import Image from "next/image"

// Portfolio projects data
const projects = [
  {
    id: 1,
    title: "Uify AI",
    url: "https://uify-one.vercel.app",
    githubUrl: "https://github.com/prince-695/ecommerce-platform",
    description: "A full-stack e-commerce platform built with Next.js and TypeScript. Features include user authentication, product catalog, shopping cart, checkout process with Stripe integration, order management, and admin dashboard. The platform is fully responsive and optimized for performance with server-side rendering and static generation.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "MongoDB"],
    image: "",
  },
  {
    id: 2,
    title: "Aspire AI",
    url: "https://aspire-ai-mauve.vercel.app",
    githubUrl: "https://github.com/prince-695/task-manager",
    description: "Real-time collaborative task management application with drag-and-drop functionality. Built with React and Firebase for real-time updates. Features include task boards, priority levels, due dates, team collaboration, and activity tracking. The interface is intuitive and designed for maximum productivity.",
    tech: ["React", "Firebase", "Material-UI", "Redux", "Framer Motion"],
    image: "",
  },
  {
    id: 3,
    title: "Xenith - Zentry.com clone",
    url: "https://zentry-xenith.vercel.app",
    description: "Personal portfolio showcasing projects and skills with a macOS-inspired design. Built with Next.js and Framer Motion for smooth animations. Features include interactive UI, project showcase, contact form, and responsive design that works seamlessly across all devices.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    image: "",
  },
  {
    id: 4,
    title: "Storix - Drive clone",
    url: "https://example-social.vercel.app",
    githubUrl: "https://github.com/prince-695/social-dashboard",
    description: "Comprehensive analytics dashboard for social media metrics and insights. Visualizes data from multiple platforms with beautiful charts and graphs. Includes real-time updates, custom date ranges, export functionality, and detailed reports. Built with modern web technologies for optimal performance.",
    tech: ["React", "Chart.js", "Node.js", "Express", "PostgreSQL"],
    image: "",
  },
  {
    id: 5,
    title: "Wordly - Modern Blogging Platform",
    url: "https://wordly-iota.vercel.app/",
    githubUrl: "https://github.com/prince-695/social-dashboard",
    description: "Comprehensive analytics dashboard for social media metrics and insights. Visualizes data from multiple platforms with beautiful charts and graphs. Includes real-time updates, custom date ranges, export functionality, and detailed reports. Built with modern web technologies for optimal performance.",
    tech: ["React", "Chart.js", "Node.js", "Express", "PostgreSQL"],
    image: "",
  },
    {
    id: 6,
    title: "My old Portfolio",
    url: "https://wordly-iota.vercel.app/",
    githubUrl: "https://github.com/prince-695/social-dashboard",
    description: "Comprehensive analytics dashboard for social media metrics and insights. Visualizes data from multiple platforms with beautiful charts and graphs. Includes real-time updates, custom date ranges, export functionality, and detailed reports. Built with modern web technologies for optimal performance.",
    tech: ["React", "Chart.js", "Node.js", "Express", "PostgreSQL"],
    image: "/chatgpt.png",
  },
]

const TrendingSites =  [
  {
    id: 1,
    title: "Example Site 1",
    url: "https://example1.com",
    image: "/example1.png",
  },
  {
    id: 2,
    title: "Example Site 2",
    url: "https://example2.com",
    image: "/example2.png",
  },
  {
    id: 3,
    title: "Example Site 3",
    url: "https://example3.com",
    image: "/example3.png",
  },
  {
    id: 4,
    title: "Example Site 4",
    url: "https://example4.com",
    image: "/example4.png",
  },
]

type ViewType = 'home' | 'details' | 'live'

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
    if (view === 'live') {
      setView('details')
    } else if (view === 'details') {
      setView('home')
      setSelectedProject(null)
    }
  }

  const goHome = () => {
    setView('home')
    setSelectedProject(null)
  }

  const openInNewTab = () => {
    if (selectedProject) {
      window.open(selectedProject.url, '_blank', 'noopener,noreferrer')
    }
  }

  const selectProject = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setView('details')
  }

  const viewLiveProject = () => {
    if (selectedProject) {
      window.open(selectedProject.url, '_blank', 'noopener,noreferrer')
    }
  }

  const getCurrentUrl = () => {
    if (view === 'home') return 'prince://projects'
    if (view === 'details' && selectedProject) return `prince://projects/${selectedProject.id}`
    if (view === 'live' && selectedProject) return selectedProject.url
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
        
        {/* External link button - only show when viewing details or live */}
        {(view === 'details' || view === 'live') && (
          <button 
            className="p-1 rounded hover:bg-gray-200 text-blue-600"
            onClick={openInNewTab}
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-white scrollbar-hide">
        {/* HOME VIEW - Project Grid */}
        {view === 'home' && (
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Projects</h1>
              <p className="text-gray-600 mb-8">Explore my portfolio of web applications and projects</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => selectProject(project)}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all"
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center mb-4">
                      {/* <span className="text-6xl">{project.image}</span> */}
                      <Image src={project.image} alt={project.title} width={400} height={225} className="max-w-full max-h-full object-contain rounded-lg" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DETAILS VIEW - Project Info */}
        {view === 'details' && selectedProject && (
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedProject.title}</h1>
                
                {/* Project preview */}
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center mb-6 border-2 border-gray-200">
                  <div className="text-center">
                    <Image src={selectedProject.image} alt={selectedProject.title} width={800} height={400} className="max-w-full max-h-full object-contain rounded-lg" />
                    {/* <p className="text-gray-500 font-medium">{selectedProject.title}</p> */}
                  </div>
                </div>

                {/* About */}
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">About This Project</h2>
                  <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Tech Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={viewLiveProject}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Live Project
                  </button>
                  
                  {selectedProject.githubUrl && (
                    <button
                      onClick={() => window.open(selectedProject.githubUrl, '_blank', 'noopener,noreferrer')}
                      className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      View GitHub Repository
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
