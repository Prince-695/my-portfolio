"use client"

import BootScreen from '@/components/boot-screen'
import Desktop from '@/components/desktop'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Monitor } from "lucide-react"
import { Button } from '@/components/ui/button'

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
      
      {/* Desktop View Recommendation Dialog */}
      <Dialog open={showDesktopAlert} onOpenChange={setShowDesktopAlert}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <Monitor className="w-8 h-8 text-gray-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              Best Viewed on Desktop
            </DialogTitle>
            <DialogDescription className="text-center text-base mt-2">
              For the best experience, we recommend viewing this portfolio on a desktop or laptop computer. While it's responsive and works on all devices, the desktop view offers the full OS-inspired experience.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-2">
            <Button
              onClick={() => setShowDesktopAlert(false)}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-xs font-medium transition-colors"
            >
              Got it, Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}