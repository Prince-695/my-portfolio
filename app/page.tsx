"use client"

import BootScreen from '@/components/boot-screen'
import Desktop from '@/components/desktop'
import { useEffect, useState } from 'react'

type SystemState = "booting" | "desktop"

export default function Page() {
  const [systemState, setSystemState] = useState<SystemState>("booting")

  // Simulate boot sequence
  useEffect(() => {
    if (systemState === "booting") {
      const timer = setTimeout(() => {
        setSystemState("desktop")
      }, 3000) // 3 seconds boot sequence

      return () => clearTimeout(timer)
    }
  }, [systemState])

  const renderScreen = () => {
    switch (systemState) {
      case "booting":
        return <BootScreen />

      case "desktop":
        return <Desktop />

      default:
        return <BootScreen />
    }
  }

  return (
    <div className='relative'>
      {renderScreen()}
    </div>
  )
}