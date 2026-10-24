"use client"

import React, { useState, useRef, useEffect } from "react"
import { profileData, skillsData, projectsData, experienceData } from "@/data"
import { feedback } from "@/lib/sound-feedback"

export default function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Array<string | { text: string; isHeading?: boolean }>>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Terminal is always dark
  const bgColor = "bg-white"
  const textColor = "text-green-600"

  useEffect(() => {
    // Focus input when terminal is clicked
    const handleClick = () => {
      inputRef.current?.focus()
    }

    const terminal = terminalRef.current
    if (terminal) {
      terminal.addEventListener("click", handleClick)

      // Initial welcome message
      setHistory([
        "Last login: " + new Date().toLocaleString(),
        `Welcome to ${profileData.name}'s Terminal`,
        "Type 'help' to see available commands",
        "",
      ])
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener("click", handleClick)
      }
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      feedback("click", 6)
      executeCommand(input)
      setCommandHistory((prev) => [...prev, input])
      setHistoryIndex(-1)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      feedback("subtle", 3)
      navigateHistory(-1)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      feedback("subtle", 3)
      navigateHistory(1)
    }
  }

  const navigateHistory = (direction: number) => {
    if (commandHistory.length === 0) return

    const newIndex = historyIndex + direction

    if (newIndex >= commandHistory.length) {
      setHistoryIndex(-1)
      setInput("")
    } else if (newIndex >= 0) {
      setHistoryIndex(newIndex)
      setInput(commandHistory[commandHistory.length - 1 - newIndex])
    }
  }

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    const args = command.split(" ")
    const mainCommand = args[0]

    // Add command to history
    setHistory((prev) => [...prev, `PrinceRathod@home ~ $ ${cmd}`, ""])

    // Process command
    switch (mainCommand) {
      case "help":
        setHistory((prev) => [
          ...prev,
          "Available commands:",
          "  help        - Show this help message",
          "  clear       - Clear the terminal",
          "  whoami      - Show current user and role",
          "  about       - About Prince Rathod",
          "  skills      - Technical skills breakdown",
          "  projects    - List all production projects",
          "  experience  - Professional engineering history",
          "  contact     - Contact and social channels",
          "  date        - Show current date and time",
          "  ls          - List sections",
          "",
        ])
        break

      case "clear":
        setHistory([""])
        break

      case "echo":
        const echoText = args.slice(1).join(" ")
        setHistory((prev) => [...prev, echoText, ""])
        break

      case "date":
        setHistory((prev) => [...prev, new Date().toString(), ""])
        break

      case "ls":
        setHistory((prev) => [...prev, "About", "Projects", "Experience", "Skills", "Education", "Achievements", "Resume", "Contact", ""])
        break

      case "whoami":
        setHistory((prev) => [...prev, `${profileData.name} — ${profileData.title}`, ""])
        break

      case "about":
        setHistory((prev) => [
          ...prev,
          "",
          { text: "ABOUT PRINCE RATHOD", isHeading: true },
          "",
          profileData.bio,
          "",
          "Key Focus Areas:",
          ...profileData.approach.map((a) => `• ${a}`),
          "",
        ])
        break

      case "skills":
        setHistory((prev) => [
          ...prev,
          "",
          { text: "SKILLS & EXPERTISE", isHeading: true },
          "",
          ...skillsData.flatMap((cat) => [
            `----- ${cat.category} -----`,
            ...cat.skills.map((s) => `• ${s.name}`),
            "",
          ]),
        ])
        break

      case "projects":
        setHistory((prev) => [
          ...prev,
          "",
          { text: "PROJECTS", isHeading: true },
          "",
          ...projectsData.map((p) => `• ${p.title} (${p.category}) — ${p.description}`),
          "",
        ])
        break

      case "experience":
        setHistory((prev) => [
          ...prev,
          "",
          { text: "EXPERIENCE", isHeading: true },
          "",
          ...experienceData.flatMap((exp) => [
            `• ${exp.role} @ ${exp.company} (${exp.period})`,
            `  ${exp.description}`,
            ...exp.highlights.slice(0, 2).map((h) => `    - ${h}`),
            "",
          ]),
        ])
        break

      case "contact":
        setHistory((prev) => [
          ...prev,
          "",
          { text: "CONTACT INFORMATION", isHeading: true },
          "",
          `Email:    ${profileData.contact.email}`,
          `GitHub:   ${profileData.contact.github}`,
          `LinkedIn: ${profileData.contact.linkedin}`,
          `Twitter:  ${profileData.contact.twitter}`,
          "",
        ])
        break

      default:
        setHistory((prev) => [
          ...prev,
          `Command not found: ${mainCommand}`,
          'Type "help" to see available commands',
          "",
        ])
    }
  }

  return (
    <div ref={terminalRef} className={`h-full ${bgColor} ${textColor} p-2 md:p-4 font-mono text-xs md:text-sm overflow-auto scrollbar-hide`}>
      {history.map((line, index) => {
        const isHeadingLine = typeof line === 'object' && line.isHeading
        const text = typeof line === 'string' ? line : line.text
        
        return (
          <div 
            key={index} 
            className={`whitespace-pre-wrap break-words ${
              isHeadingLine ? 'text-base md:text-xl font-bold text-green-500 my-1' : ''
            }`}
          >
            {text}
          </div>
        )
      })}

      <div className="flex">
        <span className="mr-1 md:mr-2 shrink-0">PrinceRathod@home ~ $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none caret-green-600 text-green-600 min-w-0"
          autoFocus
        />
      </div>
    </div>
  )
}
