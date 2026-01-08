"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

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
        "Welcome to Terminal",
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
      executeCommand(input)
      setCommandHistory((prev) => [...prev, input])
      setHistoryIndex(-1)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      navigateHistory(-1)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
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
          "  help - Show this help message",
          "  clear - Clear the terminal",
          "  echo [text] - Print text",
          "  date - Show current date and time",
          "  ls - List files",
          "  whoami - Show current user",
          "  about - About me",
          "  skills - My technical skills",
          "  contact - Contact information",
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
        setHistory((prev) => [...prev, "About me", "Projects", "Experience", "Services", "Qualifications", "Contact", ""])
        break

      case "whoami":
        setHistory((prev) => [...prev, "Prince Rathod", ""])
        break

      case "about":
        setHistory((prev) => [
          ...prev,
          "",
          { text: "ABOUT ME", isHeading: true },
          "",
          "• I'm a passionate Full Stack developer with expertise",
          "  in creating beautiful, responsive, and user-friendly",
          "  applications. I love working with modern",
          "  frameworks and technologies to build",
          "  seamless user experiences. I have a strong",
          "  background in both frontend and backend",
          "  development, and I'm always eager to learn",
          "  new skills and improve my craft.",
          "• Currently, I'm exploring the exciting world",
          "  of Artificial Intelligence and Machine Learning,",
          "  integrating AI/ML solutions into web applications",
          "  to create smarter and more intuitive user experiences.",
          "",
        ])
        break

        case "skills":
          setHistory((prev) => [
            ...prev,
            "",
            { text: "SKILLS & EXPERTISE", isHeading: true },
            "",
            "-----Frontend-----",
            "• React / Next.js",
            "• TypeScript / JavaScript",
            "• Tailwind CSS / SCSS",
            "• UI/UX Design",
            "• Responsive Web Development",
            "• Vite / Webpack",
            "• Figma, Sketch etc.",
            "",

            "-----Backend-----",
            "• Node.js / Express",
            "• TRPC / REST APIs",
            "• Python / Flask",
            "• Prisma ORM / Drizzle ORM",
            "• SQL (MySQL, PostgreSQL)",
            "• NoSQL (MongoDB)",
            "• Clerk / BetterAuth",
            "• JWT / OAuth",
            "• Inngest Agent Kit",
            "",

            "-----AI/ML-----",
            "• Python",
            "• Scikit-learn / Pandas / NumPy",
            "• Mathplotlib / Seaborn",
            "• OpenAI API / Gemini API",
            "• Machine Learning Concepts",
            "• Data Preprocessing & Analysis",
            "• Model Training & Evaluation",
            "",

            "-----DevOps & Tools-----",
            "• Git / GitHub",
            "• CI/CD Pipelines",
            "• Windows / Linux",
            "• Vercel / Netlify / Render",
            "• Docker / Containerization",
            "• AWS / Cloud Services",
            "",
          ])
          break

      case "contact":
        setHistory((prev) => [
          ...prev,
          "",
          { text: "CONTACT INFORMATION", isHeading: true },
          "",
          "Email: rathodprince411@gmail.com",
          "GitHub: github.com/prince-695",
          "LinkedIn: linkedin.com/in/prince-rathod-3a9b1b2b8/",
          "Website: princerathod.me",
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
