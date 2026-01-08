"use client"

import { useState } from "react"
import { Download, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Resume() {
  const [scale, setScale] = useState(1)
  const resumePath = "/Prince_Rathod_Resume.pdf"
  const downloadFileName = "Prince_Rathod_Resume.pdf"

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = resumePath
    link.download = downloadFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleReset = () => {
    setScale(1)
  }

  return (
    <div className="h-full w-full flex flex-col">
      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-gray-800 p-1 md:p-4 scrollbar-hide">
        <div className="flex justify-center items-start min-h-full">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              transition: "transform 0.2s ease-in-out",
            }}
            className="shadow-2xl w-full max-w-[210mm] scrollbar-hide"
          >
            <iframe
              src={`${resumePath}#toolbars=0&navpanes=0&scrollbar=0`}
              className="w-full h-[calc(100vh-2rem)] md:h-[297mm] scrollbar-hide rounded-md"
              title="Prince Rathod's Resume"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
