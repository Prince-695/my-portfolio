"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion";

interface LoaderProps {
  progress: number
}

const Loader = ({ progress }: LoaderProps) => {
  // Calculate path length based on progress (0 to 1)
  const pathProgress = progress / 100
  
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-40 w-40 stroke-neutral-500 [--fill-final:var(--color-orange-400)] [--fill-initial:var(--color-neutral-50)]"
    >
      <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path
        animate={{ 
          pathLength: pathProgress,
          fill: pathProgress > 0.8 ? "var(--fill-final)" : "var(--fill-initial)"
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
      />
    </motion.svg>
  );
};

interface BootScreenProps {
  onLoadComplete?: () => void
}

export default function BootScreen({ onLoadComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0)
  const [loadingStage, setLoadingStage] = useState("Initializing...")

  useEffect(() => {
    let mounted = true
    const loadingStages = [
      { progress: 20, stage: "Loading resources..." },
      { progress: 40, stage: "Loading fonts..." },
      { progress: 60, stage: "Rendering components..." },
      { progress: 80, stage: "Finalizing..." },
      { progress: 100, stage: "Ready!" },
    ]

    // Track DOM ready state
    if (document.readyState === "loading") {
      const onDOMReady = () => {
        if (mounted) {
          setProgress(20)
          setLoadingStage("Loading resources...")
        }
      }
      document.addEventListener("DOMContentLoaded", onDOMReady)
    } else {
      setProgress(20)
      setLoadingStage("Loading resources...")
    }

    // Track resource loading
    const checkResourcesLoaded = () => {
      if (!mounted) return

      // Check if fonts are loaded
      if (document.fonts) {
        document.fonts.ready.then(() => {
          if (mounted) {
            setProgress(40)
            setLoadingStage("Loading fonts...")
          }
        })
      } else {
        setTimeout(() => {
          if (mounted) {
            setProgress(40)
            setLoadingStage("Loading fonts...")
          }
        }, 300)
      }

      // Simulate component rendering time
      setTimeout(() => {
        if (mounted) {
          setProgress(60)
          setLoadingStage("Rendering components...")
        }
      }, 500)

      setTimeout(() => {
        if (mounted) {
          setProgress(80)
          setLoadingStage("Finalizing...")
        }
      }, 800)
    }

    // Track window load (all resources including images)
    const onWindowLoad = () => {
      if (!mounted) return
      checkResourcesLoaded()
      
      // Final stage
      setTimeout(() => {
        if (mounted) {
          setProgress(100)
          setLoadingStage("Ready!")
          
          // Notify parent that loading is complete
          setTimeout(() => {
            if (mounted && onLoadComplete) {
              onLoadComplete()
            }
          }, 500)
        }
      }, 1000)
    }

    if (document.readyState === "complete") {
      onWindowLoad()
    } else {
      window.addEventListener("load", onWindowLoad)
    }

    return () => {
      mounted = false
      window.removeEventListener("load", onWindowLoad)
    }
  }, [onLoadComplete])

  return (
    <div className="h-screen w-screen bg-[#F9F9F9] flex flex-col items-center justify-center">
      <Loader progress={progress} />
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mt-8">
        <motion.div
          className="h-full bg-gray-800 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      <p className="mt-4 text-gray-800 font-georama font-medium text-lg">{loadingStage}</p>
      <p className="mt-1 text-gray-500 font-georama font-normal text-sm">{progress}%</p>
    </div>
  )
}
