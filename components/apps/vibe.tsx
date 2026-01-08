import React from 'react'
import { BsStars } from "react-icons/bs"

const Vibe = () => {
  return (
    <div className="h-full w-full bg-white flex flex-col items-center justify-center">
      <BsStars className="w-24 h-24 text-red-600 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800">Coming Soon . . . .</h2>
    </div>
  )
}

export default Vibe