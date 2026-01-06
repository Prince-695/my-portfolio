"use client"

import { useEffect, useState } from "react"
import Icon from "./icon"

interface ShutdownScreenProps {
  onBoot: () => void
}

export default function ShutdownScreen({ onBoot }: ShutdownScreenProps) {
  const [showBootText, setShowBootText] = useState(false)

  useEffect(() => {
    // Show the "Click to boot" text after a delay
    const timer = setTimeout(() => {
      setShowBootText(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="h-screen w-screen bg-black flex flex-col items-center justify-center cursor-pointer"
      onClick={onBoot}
    >
      {showBootText ? (
        <div className="flex flex-col items-center">
          <Icon />
          <p className="text-white text-lg animate-pulse">Click to boot</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-white text-lg mb-4">Your computer has been shut down</p>
          <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
