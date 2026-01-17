"use client"

import BootScreen from '@/components/boot-screen'
import Desktop from '@/components/desktop'
import { useEffect, useState } from 'react'

type SystemState = "booting" | "desktop"

export default function Page() {
  const [systemState, setSystemState] = useState<SystemState>("booting")
  const [showDesktopAlert, setShowDesktopAlert] = useState(false)

  // Check if device is mobile/tablet
  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth < 1024 // less than lg breakpoint
      if (isMobile && systemState === "desktop") {
        setShowDesktopAlert(true)
      }
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [systemState])

  // Handle boot completion
  const handleBootComplete = () => {
    setSystemState("desktop")
  }

  const renderScreen = () => {
    switch (systemState) {
      case "booting":
        return <BootScreen onLoadComplete={handleBootComplete} />

      case "desktop":
        return <Desktop />

      default:
        return <BootScreen onLoadComplete={handleBootComplete} />
    }
  }

  return (
    <div className='relative'>
      {renderScreen()}
    </div>
  )
}