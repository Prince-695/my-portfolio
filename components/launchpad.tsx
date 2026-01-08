"use client"

import { useState, useEffect } from "react"
import type { AppWindow } from "@/types"
import { FiChrome } from "react-icons/fi"
import { FaRegNoteSticky } from "react-icons/fa6"
import { TbBrandVscode } from "react-icons/tb"
import { FaCameraRetro } from "react-icons/fa";
import { MdTerminal } from "react-icons/md"
import { GiSnake } from "react-icons/gi";
import { LuBird } from "react-icons/lu";
import { HiPaintBrush } from "react-icons/hi2";
import { WiDayHail } from "react-icons/wi";
import { BsStars } from "react-icons/bs";
import { HiDocumentText } from "react-icons/hi2";

// Same apps as dock, except launchpad itself
const launchpadApps = [
  { id: "aboutme", title: "About Me", icon: (<FaRegNoteSticky className="w-12 h-12 text-gray-700" />), component: "Notes" },
  { id: "safari", title: "Safari", icon: (<FiChrome  className="w-12 h-12 text-gray-700" />), component: "Safari" },
  { id: "terminal", title: "Terminal", icon: (<MdTerminal className="w-12 h-12 text-gray-700" />), component: "Terminal" },
  { id: "vscode", title: "VS Code", icon: (<TbBrandVscode className="w-12 h-12 text-gray-700" />), component: "VSCode" },
  { id: "facetime", title: "Camera", icon: (<FaCameraRetro className="w-12 h-12 text-gray-700" />), component: "FaceTime" },
  { id: "resume", title: "Resume", icon: (<HiDocumentText className="w-12 h-12 text-gray-700" />), component: "Resume" },
  { id: "snake", title: "Snake", icon: (<GiSnake className="w-12 h-12 text-gray-700" />), component: "Snake" },
  { id: "flappybird", title: "Flappy Bird", icon: (<LuBird className="w-12 h-12 text-gray-700" />), component: "FlappyBird" },
  { id: "paint", title: "Paint", icon: (<HiPaintBrush className="w-12 h-12 text-gray-700" />), component: "Paint" },
  { id: "weather", title: "Weather", icon: (<WiDayHail className="w-12 h-12 text-gray-700" />), component: "Weather" },
  { id: "vibe", title: "Vibe", icon: (<BsStars className="w-12 h-12 text-red-600" />), component: "Vibe" }
]

interface LaunchpadProps {
  onAppClick: (app: AppWindow) => void
  onClose: () => void
}

// Improve Launchpad appearance
export default function Launchpad({ onAppClick, onClose }: LaunchpadProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredApps, setFilteredApps] = useState(launchpadApps)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation effect
    setIsVisible(true)

    if (searchTerm) {
      setFilteredApps(launchpadApps.filter((app) => app.title.toLowerCase().includes(searchTerm.toLowerCase())))
    } else {
      setFilteredApps(launchpadApps)
    }
  }, [searchTerm])

  const handleAppClick = (app: (typeof launchpadApps)[0]) => {
    onAppClick({
      id: app.id,
      title: app.title,
      component: app.component,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 100 + 50 },
      size: { width: 800, height: 600 },
    })
    onClose()
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for animation to complete
  }

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-md z-40 flex flex-col items-center justify-center
        transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-4xl px-8 py-12 transition-transform duration-300 
          ${isVisible ? "translate-y-0" : "translate-y-10"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-64 mx-auto mb-12">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-white/20 backdrop-blur-md text-white border-0 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
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
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-8">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="flex flex-col items-center justify-center group"
              onClick={() => handleAppClick(app)}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2 rounded-xl bg-white  p-2 group-hover:scale-110 transition-transform duration-200">
                {/* <img src={app.icon || "/placeholder.svg"} alt={app.title} className="w-12 h-12 object-contain" /> */}
                {app.icon}
              </div>
              <span className="text-white text-sm text-center">{app.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
