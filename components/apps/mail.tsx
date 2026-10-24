"use client"

import { useState } from "react"
import { Mail, Copy, Check, Send, Sparkles } from "lucide-react"
import { profileData } from "@/data"
import { feedback } from "@/lib/sound-feedback"

export default function MailApp() {
  const [copied, setCopied] = useState(false)
  const [subject, setSubject] = useState("Project Inquiry / Collaboration")
  const [message, setMessage] = useState("")

  const email = profileData.contact.email

  const handleCopy = () => {
    feedback("click", 8)
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSend = () => {
    feedback("click", 10)
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    window.location.href = mailto
  }

  return (
    <div className="h-full bg-white text-gray-800 flex flex-col">
      {/* Mail toolbar */}
      <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-sm">New Message to {profileData.name}</span>
        </div>
        <button
          onClick={handleSend}
          className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          Send Email
        </button>
      </div>

      {/* Compose form */}
      <div className="p-4 md:p-6 space-y-4 flex-1 overflow-auto">
        {/* Recipient */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400 font-medium">To:</span>
            <span className="font-semibold text-gray-800">{email}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 transition-colors cursor-pointer"
            title="Copy email address"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-gray-500" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Subject */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2 text-sm">
          <span className="text-gray-400 font-medium">Subject:</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-800 font-medium"
            placeholder="Subject of your message..."
          />
        </div>

        {/* Message body */}
        <div className="flex-1 flex flex-col pt-1 min-h-[160px]">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Hi ${profileData.name},\n\nI came across your portfolio and wanted to reach out regarding...`}
            className="w-full flex-1 p-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none resize-none text-sm leading-relaxed"
            rows={7}
          />
        </div>

        {/* Quick subject tags */}
        <div className="flex items-center gap-2 flex-wrap pt-2 text-xs">
          <span className="text-gray-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Quick topic:
          </span>
          {["Project Inquiry", "Full-Time Opportunity", "Freelance / SPIFFY", "Tech Chat"].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                feedback("subtle", 4)
                setSubject(tag)
              }}
              className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 transition-colors cursor-pointer text-gray-600"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
