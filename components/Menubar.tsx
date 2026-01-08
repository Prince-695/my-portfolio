"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import Image from 'next/image'

interface MenubarProps {
  onSpotlightClick?: () => void
}

const Menubar = ({ onSpotlightClick }: MenubarProps) => {
  const [batteryLevel, setBatteryLevel] = useState()
  const [isCharging, setIsCharging] = useState(false)
  const [showWifiToggle, setShowWifiToggle] = useState(false)
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const wifiRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Try to get battery information if available
    if ("getBattery" in navigator) {
      // @ts-ignore - getBattery is not in the standard navigator type
      navigator
        .getBattery()
        .then((battery: any) => {
          updateBatteryStatus(battery)

          // Listen for battery status changes
          battery.addEventListener("levelchange", () => updateBatteryStatus(battery))
          battery.addEventListener("chargingchange", () => updateBatteryStatus(battery))
        })
        .catch(() => {
          // If there's an error, default to 100%
          setBatteryLevel(100)
          setIsCharging(false)
        })
    }

    // Load WiFi state from localStorage
    const savedWifi = localStorage.getItem("wifiEnabled")
    if (savedWifi !== null) {
      setWifiEnabled(savedWifi === "true")
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wifiRef.current &&
        !wifiRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".wifi-icon")
      ) {
        setShowWifiToggle(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      clearInterval(timeInterval)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const updateBatteryStatus = (battery: any) => {
    setBatteryLevel(Math.round(battery.level * 100))
    setIsCharging(battery.charging)
  }

  const toggleWifi = () => {
    const newState = !wifiEnabled
    setWifiEnabled(newState)
    localStorage.setItem("wifiEnabled", newState.toString())
  }

  const toggleWifiPopup = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowWifiToggle(!showWifiToggle)
  }

  const formattedTime = currentTime.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return (
    <section className='fixed top-0 left-2 right-3 h-auto p-1 bg-transparent rounded-md flex items-center px-3 z-30 text-gray-800'>
      <div className='h-full w-full flex items-center justify-between'>
        <div>
          <p className='font-orbitron font-bold text-lg text-gray-800'>PR</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="mr-1">{batteryLevel}%</span>
          <div className="relative">
            <div className="w-7 h-4 relative">
              <div className={`absolute top-0 left-0 bottom-0 rounded ${isCharging ? "bg-green-500" : "bg-gray-500"}`} style={{ width: `${batteryLevel}%` }}></div>
              {isCharging && <div className="absolute inset-0 flex items-center justify-center text-xs">⚡</div>}
            </div>
          </div>

          <button className="hover:opacity-70 transition-opacity" onClick={onSpotlightClick}>
            <Search className="w-4 h-4 font-medium text-gray-500" />
          </button>

          <span className="text-xs font-medium text-gray-500">{formattedTime}</span>
        </div>
      </div>
    </section>
  )
}

export default Menubar
