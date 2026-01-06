"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion";

const Loader = () => {
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
        initial={{ pathLength: 0, fill: "var(--fill-initial)" }}
        animate={{ pathLength: 1, fill: "var(--fill-final)" }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
      />
    </motion.svg>
  );
};

export default function BootScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    // <div className="h-screen w-screen bg-[#F9F9F9] flex flex-col items-center justify-center">
    //   <Icon />
    //   <div className="w-64 h-3 bg-white border-3 border-gray-800  rounded-full overflow-hidden">
    //     <div
    //       className="h-full bg-gray-800 rounded-full transition-all duration-300 ease-out"
    //       style={{ width: `${progress}%` }}
    //     />
    //   </div>
    //   <p className="mt-2 text-gray-800 font-georama font-medium text-lg">Loading... {progress}%</p>
    // </div>
    <div className="h-screen w-screen bg-[#F9F9F9] flex flex-col items-center justify-center">
      <Loader />
      <p className="mt-2 text-gray-800 font-georama font-medium text-lg">Loading... {progress}%</p>
    </div>
  )
}
