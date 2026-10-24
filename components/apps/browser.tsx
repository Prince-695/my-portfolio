"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, RefreshCw, Home, Star, ExternalLink, Github } from "lucide-react"
import { projectsData, type Project } from "@/data"
import { feedback } from "@/lib/sound-feedback"

type ViewType = 'home' | 'details'

export default function Safari() {
  const [view, setView] = useState<ViewType>('home')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    feedback("click", 6)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const goBack = () => {
    feedback("click", 6)
    if (view === 'details') {
      setView('home')
      setSelectedProject(null)
    }
  }

  const goHome = () => {
    feedback("click", 6)
    setView('home')
    setSelectedProject(null)
  }

  const selectProject = (project: Project) => {
    feedback("click", 8)
    setSelectedProject(project)
    setView('details')
  }

  const getCurrentUrl = () => {
    if (view === 'home') return 'prince://projects'
    if (view === 'details' && selectedProject) return `prince://projects/${selectedProject.slug || selectedProject.id}`
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
                {projectsData.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => selectProject(project)}
                    className="p-3 md:p-4 flex flex-row justify-between items-center hover:bg-neutral-50 rounded-xl border border-gray-200 transition-colors cursor-pointer"
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
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-neutral-800 text-sm md:text-base truncate">
                            {project.title}
                          </h3>
                          {project.featured && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
                              Featured
                            </span>
                          )}
                        </div>
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

                {/* Metrics if available */}
                {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {selectedProject.metrics.map((metric, idx) => (
                      <div key={idx} className="px-3.5 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs">
                        <span className="text-gray-500 font-medium">{metric.label}: </span>
                        <span className="text-blue-700 font-bold">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                )}

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
                      onClick={() => {
                        feedback("click", 6)
                        window.open(selectedProject.url, '_blank', 'noopener,noreferrer')
                      }}
                      className="w-full md:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Visit Site
                    </button>
                  )}
                  
                  {selectedProject.githubUrl && (
                    <button
                      onClick={() => {
                        feedback("click", 6)
                        window.open(selectedProject.githubUrl, '_blank', 'noopener,noreferrer')
                      }}
                      className="w-full md:flex-1 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
