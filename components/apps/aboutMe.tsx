"use client"

import { useState, useEffect } from "react"
import AboutSection from "./about/AboutSection"
import EducationSection from "./about/EducationSection"
import SkillsSection from "./about/SkillsSection"
import ExperienceSection from "./about/ExperienceSection"
import AchievementsSection from "./about/AchievementsSection"

export default function Notes() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [selectedNoteId, setSelectedNoteId] = useState(1)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }
    return date.toLocaleDateString('en-US', options)
  }

  const notes = [
    { id: 1, title: "About Me", preview: "👋 Hello, I'm" },
    { id: 2, title: "Education", preview: "🎓 B-Tech in Computer Science (AI-ML)" },
    { id: 3, title: "Skills", preview: "💻 Tech Stack & Skills" },
    { id: 4, title: "Experience", preview: "💼 Professional Experience" },
    { id: 5, title: "Achievements & Certifications", preview: "🏆 Certifications & Achievements" },
  ]

  const handleNoteSelect = (id: number) => {
    setSelectedNoteId(id)
    setIsMobileSidebarOpen(false)
  }

  const renderSection = () => {
    switch (selectedNoteId) {
      case 1:
        return <AboutSection />
      case 2:
        return <EducationSection />
      case 3:
        return <SkillsSection />
      case 4:
        return <ExperienceSection />
      case 5:
        return <AchievementsSection />
      default:
        return <AboutSection />
    }
  }

  const selectedNote = notes.find((note) => note.id === selectedNoteId)

  return (
    <div className="flex h-full bg-white text-gray-800 relative">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileSidebarOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 md:relative md:w-64 bg-gray-100 border-r border-gray-200 flex-col transform transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } flex`}>
        <div className="p-3 border-b border-gray-300 flex justify-between items-center">
          <h2 className="font-medium">Notes</h2>
          <button 
            className="md:hidden p-1 hover:bg-gray-300 rounded transition-colors duration-200"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 scrollbar-hide">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 cursor-pointer transition-colors duration-200 ${
                selectedNoteId === note.id ? 'bg-gray-300' : 'hover:bg-gray-200'
              }`}
              onClick={() => handleNoteSelect(note.id)}
            >
              <h3 className="font-medium truncate">{note.title}</h3>
              <p className="text-sm mt-1 truncate text-gray-600">{note.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Note content */}
      <div className="flex-1 flex flex-col">
        {selectedNote && (
          <>
            <div className="p-2.5 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <button 
                  className="md:hidden p-1 hover:bg-gray-200 rounded"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h2 className="font-medium text-lg">{selectedNote.title}</h2>
              </div>
              <div className="text-xs text-gray-500">
                {formatDateTime(currentDateTime)}
              </div>
            </div>
            <div className="flex-1 p-4 md:p-6 overflow-auto scrollbar-hide">
              <div className="prose prose-sm md:prose-base max-w-none">
                {renderSection()}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
