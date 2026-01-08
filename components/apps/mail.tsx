"use client"

import { useEffect } from "react"
import { Mail } from "lucide-react"

export default function MailApp() {
  const textColor = "text-gray-800"
  const bgColor = "bg-white"

  // Open mailto link when the app is opened
  useEffect(() => {
    const mailtoLink = "mailto:mail@rathodprince411@gmail.com"
    window.location.href = mailtoLink
  }, [])

  return (
    <div className={`h-full ${bgColor} ${textColor} p-4 md:p-6 flex items-center justify-center`}>
      <div className="text-center">
        <Mail className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4" />
        <h2 className="text-lg md:text-xl font-semibold mb-2">Opening Mail...</h2>
        <p className="text-sm md:text-base">Redirecting to your default mail application</p>
      </div>
    </div>
  )
}
