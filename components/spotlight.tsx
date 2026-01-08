"use client"

import { useState, useEffect, useRef } from "react"
import type { AppWindow } from "@/types"
import { FiChrome } from "react-icons/fi"
import { FaRegNoteSticky } from "react-icons/fa6"
import { TbBrandVscode } from "react-icons/tb"
import { FaCameraRetro } from "react-icons/fa"
import { MdTerminal } from "react-icons/md"
import { GiSnake } from "react-icons/gi"
import { LuBird } from "react-icons/lu"
import { HiPaintBrush } from "react-icons/hi2"
import { WiDayHail } from "react-icons/wi"
import { BsStars } from "react-icons/bs"
import { HiDocumentText } from "react-icons/hi2"

const spotlightApps = [
  { id: "aboutme", title: "About Me", icon: (<FaRegNoteSticky className="w-6 h-6 text-gray-700" />), component: "Notes" },
  { id: "browser", title: "Browser", icon: (<FiChrome className="w-6 h-6 text-gray-700" />), component: "Safari" },
  { id: "terminal", title: "Terminal", icon: (<MdTerminal className="w-6 h-6 text-gray-700" />), component: "Terminal" },
  { id: "vscode", title: "VS Code", icon: (<TbBrandVscode className="w-6 h-6 text-gray-700" />), component: "VSCode" },
  { id: "facetime", title: "Camera", icon: (<FaCameraRetro className="w-6 h-6 text-gray-700" />), component: "FaceTime" },
  { id: "resume", title: "Resume", icon: (<HiDocumentText className="w-6 h-6 text-gray-700" />), component: "Resume" },
  { id: "snake", title: "Snake", icon: (<GiSnake className="w-6 h-6 text-gray-700" />), component: "Snake" },
  { id: "flappybird", title: "Flappy Bird", icon: (<LuBird className="w-6 h-6 text-gray-700" />), component: "FlappyBird" },
  { id: "paint", title: "Paint", icon: (<HiPaintBrush className="w-6 h-6 text-gray-700" />), component: "Paint" },
  { id: "weather", title: "Weather", icon: (<WiDayHail className="w-6 h-6 text-gray-700" />), component: "Weather" },
  { id: "vibe", title: "Vibe", icon: (<BsStars className="w-6 h-6 text-red-600" />), component: "Vibe" },
  
  // Commented out extra apps - uncomment if needed in the future
  // { id: "mail", title: "Mail", icon: (<FaRegEnvelope className="w-6 h-6 text-gray-700" />), component: "Mail" },
  // { id: "github", title: "GitHub", icon: (<FaGithub className="w-6 h-6 text-gray-700" />), component: "GitHub" },
  // { id: "youtube", title: "YouTube", icon: (<FaYoutube className="w-6 h-6 text-red-600" />), component: "YouTube" },
  // { id: "spotify", title: "Spotify", icon: (<FaSpotify className="w-6 h-6 text-green-600" />), component: "Spotify" },
  // { id: "music", title: "Music", icon: (<FaMusic className="w-6 h-6 text-gray-700" />), component: "Music" },
]

interface SpotlightProps {
  onClose: () => void
  onAppClick: (app: AppWindow) => void
}

export default function Spotlight({ onClose, onAppClick }: SpotlightProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredApps, setFilteredApps] = useState(spotlightApps)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Focus the input when spotlight opens
    inputRef.current?.focus()

    // Handle escape key to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev < filteredApps.length - 1 ? prev + 1 : prev))
        e.preventDefault()
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        e.preventDefault()
      } else if (e.key === "Enter" && filteredApps.length > 0) {
        handleAppClick(filteredApps[selectedIndex])
        e.preventDefault()
      }
    }

    // Handle clicks outside spotlight to close
    const handleClickOutside = (e: MouseEvent) => {
      if (spotlightRef.current && !spotlightRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [filteredApps, selectedIndex, onClose])

  useEffect(() => {
    if (searchTerm) {
      const filtered = spotlightApps.filter((app) => app.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredApps(filtered)
      setSelectedIndex(0) // Reset selection when search changes
    } else {
      setFilteredApps(spotlightApps)
    }
  }, [searchTerm])

  const handleAppClick = (app: (typeof spotlightApps)[0]) => {
    onAppClick({
      id: app.id,
      title: app.title,
      component: app.component,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 100 + 50 },
      size: { width: 800, height: 600 },
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-transparent z-40 flex items-center justify-center pointer-events-none">
      <div
        ref={spotlightRef}
        className="w-full max-w-2xl backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
      >
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-gray-800 border-0 py-4 pl-12 pr-4 focus:outline-none text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredApps.length > 0 && (
          <>
            <div ref={scrollContainerRef} className="max-h-80 overflow-y-auto scrollbar-hide">
              {filteredApps.map((app, index) => (
                <div
                  key={app.id}
                  className={`flex items-center px-4 py-3  ${
                    index === selectedIndex ? "bg-black/30" : ""
                  }`}
                  onClick={() => handleAppClick(app)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="w-8 h-8 flex items-center justify-center mr-3 bg-white rounded-lg p-1">
                    {app.icon}
                  </div>
                  <span className="text-gray-800">{app.title}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
