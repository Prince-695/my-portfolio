"use client"

import React from "react"
import { X, Sparkles, Cpu, Award, GraduationCap, Github, Linkedin, FileText } from "lucide-react"
import { feedback } from "@/lib/sound-feedback"
import { profileData } from "@/data"

interface SystemInfoModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenResume?: () => void
}

export default function SystemInfoModal({ isOpen, onClose, onOpenResume }: SystemInfoModalProps) {
  if (!isOpen) return null

  const handleClose = () => {
    feedback("click", 8)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div 
        className="w-full max-w-md rounded-2xl bg-white/95 backdrop-blur-2xl border border-gray-200 shadow-2xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Titlebar */}
        <div className="h-9 px-4 bg-gray-100/80 border-b border-gray-200/80 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
            >
              <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
            </button>
            <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-60" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-60" />
          </div>
          <span className="text-xs font-semibold text-gray-700 font-georama">About PrinceOS</span>
          <div className="w-12" />
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Logo / Avatar */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-4">
            <span className="text-3xl font-orbitron font-extrabold text-white">PR</span>
          </div>

          <h2 className="text-2xl font-bold font-orbitron text-gray-900">{profileData.name}</h2>
          <p className="text-sm font-medium text-blue-600 font-georama mt-0.5">
            {profileData.title}
          </p>
          <p className="text-xs text-gray-500 mt-1">PrinceOS Sequoia · Version 15.2</p>

          {/* Specs Card */}
          <div className="mt-5 text-left bg-gray-50/80 rounded-xl p-3.5 border border-gray-200/70 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 flex items-center gap-1.5 font-medium">
                <Cpu className="w-3.5 h-3.5 text-indigo-500" /> Architecture
              </span>
              <span className="font-semibold text-gray-800">Full Stack & AI-ML Engine</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 flex items-center gap-1.5 font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-blue-500" /> Education
              </span>
              <span className="font-semibold text-gray-800">Adani University (B.Tech CS)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 flex items-center gap-1.5 font-medium">
                <Award className="w-3.5 h-3.5 text-amber-500" /> Hackathons
              </span>
              <span className="font-semibold text-gray-800">TIC TECH TOE 🥉 · DotSlash 🏅</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" /> Primary Core
              </span>
              <span className="font-semibold text-gray-800">Next.js · TypeScript · AI APIs</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {onOpenResume && (
              <button
                onClick={() => {
                  feedback("click", 8)
                  onClose()
                  onOpenResume()
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                View Resume
              </button>
            )}
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => feedback("subtle", 6)}
              className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-gray-300"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => feedback("subtle", 6)}
              className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-gray-300"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-600" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
