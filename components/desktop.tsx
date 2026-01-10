"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Window from "@/components/window"
import Launchpad from "@/components/launchpad"
import Spotlight from "@/components/spotlight"
import type { AppWindow } from "@/types"
import Menubar from "./Menubar"
import Dock from "./Dock"
import { Boxes } from "./ui/background-boxes"
import MainText from "./MainText"
import Socials from "./Socials"

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const [showLaunchpad, setShowLaunchpad] = useState(false)
  const [showSpotlight, setShowSpotlight] = useState(false)
  const [hasMaximizedWindow, setHasMaximizedWindow] = useState(false)
  const desktopRef = useRef<HTMLDivElement>(null)

  const toggleSpotlight = () => {
    setShowSpotlight(!showSpotlight)
    if (showLaunchpad) setShowLaunchpad(false)
  }

  // Spotlight keyboard shortcut (Cmd+Space or Ctrl+Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault()
        toggleSpotlight()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showSpotlight, toggleSpotlight])

  const openApp = (app: AppWindow) => {
    // Check if app is already open
    const isOpen = openWindows.some((window) => window.id === app.id)

    if (!isOpen) {
      setOpenWindows((prev) => [...prev, app])
    }

    // Set as active window
    setActiveWindowId(app.id)

    // Close launchpad if open
    if (showLaunchpad) {
      setShowLaunchpad(false)
    }
    if (showSpotlight) {
      setShowSpotlight(false)
    }
  }

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((window) => window.id !== id))

    // If we closed the active window, set the last window as active
    if (activeWindowId === id && openWindows.length > 1) {
      const remainingWindows = openWindows.filter((window) => window.id !== id)
      setActiveWindowId(remainingWindows[remainingWindows.length - 1].id)
    } else if (openWindows.length <= 1) {
      setActiveWindowId(null)
    }
  }

  const setActiveWindow = (id: string) => {
    setActiveWindowId(id)
  }

  const toggleLaunchpad = () => {
    setShowLaunchpad(!showLaunchpad)
    if (showSpotlight) setShowSpotlight(false)
  }

  const handleDesktopClick = (e: React.MouseEvent) => {
    // Only handle clicks directly on the desktop, not on children
    if (e.target === desktopRef.current) {
      setActiveWindowId(null)
      if (showSpotlight) setShowSpotlight(false)
    }
  }

  return (
    <div className="h-screen relative w-full bg-[#f9f9f9] overflow-hidden flex flex-col items-center justify-center">
      <Menubar onSpotlightClick={toggleSpotlight} />
      <div className="absolute inset-0 w-full h-full pointer-events-none" />
      <Boxes />
      
      {/* Main Text (only show when no windows are open) */}
      {openWindows.length === 0 && <MainText />}

      {/* Windows */}
      {openWindows.length > 0 && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          {openWindows.map((window) => (
              <Window
                key={window.id}
                window={window}
                isActive={activeWindowId === window.id}
                onClose={() => closeWindow(window.id)}
                onFocus={() => setActiveWindow(window.id)}
                onMaximizeChange={(isMaximized) => setHasMaximizedWindow(isMaximized)}
              />
            ))}
        </div>
      )}

      {/* Launchpad */}
      {showLaunchpad && (
        <div className="pointer-events-auto z-40">
          <Launchpad onAppClick={openApp} onClose={() => setShowLaunchpad(false)} />
        </div>
      )}

      {/* Spotlight */}
      {showSpotlight && (
        <div className="pointer-events-auto z-40">
          <Spotlight onClose={() => setShowSpotlight(false)} onAppClick={openApp} />
        </div>
      )}

      {/* Dock */}
      <div className={`bottom-5 fixed md:left-1/2 left-5 md:-translate-x-1/2 transition-all ${
        showLaunchpad || showSpotlight 
          ? '-z-10' 
          : hasMaximizedWindow 
            ? 'z-50' 
            : 'z-0'
      }`}>
        <Dock
          onAppClick={openApp}
          onLaunchpadClick={toggleLaunchpad}
          activeAppIds={openWindows.map((w) => w.id)}
        />
      </div>

      {/* Socials */}
      <div className=''>
        <Socials />
      </div>
    </div>
  )
}
