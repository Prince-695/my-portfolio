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
              <div className={`absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-1 h-2 ${isCharging ? "bg-green-500" : "bg-gray-500"} rounded-r-sm`}></div>
              {isCharging && <div className="absolute inset-0 flex items-center justify-center text-xs">⚡</div>}
            </div>
          </div>

          {/* <div className="relative">
            <button className="wifi-icon hover:opacity-70 transition-opacity" onClick={toggleWifiPopup}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                {wifiEnabled ? (
                  <>
                    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                    <circle cx="12" cy="20" r="1" />
                  </>
                ) : (
                  <>
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                    <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                    <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
                    <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                    <circle cx="12" cy="20" r="1" />
                  </>
                )}
              </svg>
            </button>

            {showWifiToggle && (
              <div
                ref={wifiRef}
                className="absolute top-6 right-0 bg-white/90 backdrop-blur-md rounded-lg shadow-xl text-gray-800 py-3 px-4 w-64 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Wi-Fi</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={wifiEnabled} onChange={toggleWifi} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            )}
          </div> */}

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
