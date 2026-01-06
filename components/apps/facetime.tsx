"use client"

import { useState, useRef, useEffect } from "react"
import { ImageIcon, Trash2, Download, Camera, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FaceTime() {
  const [isCameraAvailable, setIsCameraAvailable] = useState(false)
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([])
  const [viewingPhoto, setViewingPhoto] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const bgColor = "bg-white"
  const textColor = "text-gray-800"
  const buttonBg = "bg-gray-100 hover:bg-gray-200"

  // Start camera automatically when component mounts
  useEffect(() => {
    startCamera()

    // Clean up function to ensure camera is turned off when component unmounts
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      // Store stream reference for cleanup
      streamRef.current = stream
      setIsCameraAvailable(true)
    } catch (err) {
      console.error("Error accessing camera:", err)
      setIsCameraAvailable(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop()
      })
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw current video frame to canvas
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to data URL and save to state
        const photoUrl = canvas.toDataURL("image/png")
        setCapturedPhotos((prev) => [...prev, photoUrl])
        
        // Close camera and show the captured photo
        setShowCamera(false)
        stopCamera()
      }
    }
  }

  const deletePhoto = (index: number) => {
    setCapturedPhotos((prev) => prev.filter((_, i) => i !== index))
    // If viewing the deleted photo, close the viewer
    if (viewingPhoto === capturedPhotos[index]) {
      setViewingPhoto(null)
    }
  }

  const downloadPhoto = (photoUrl: string, index: number) => {
    const link = document.createElement("a")
    link.href = photoUrl
    link.download = `captured-photo-${index + 1}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const openCamera = async () => {
    setShowCamera(true)
    setViewingPhoto(null)
    await startCamera()
  }

  const handlePhotoClick = (photo: string) => {
    setViewingPhoto(photo)
    setShowCamera(false)
    stopCamera()
  }

  return (
    <div className={`h-full flex flex-col ${bgColor} ${textColor}`}>
      <div className="flex-1 flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden">
        {/* Camera View */}
        {showCamera && (
          <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
            {isCameraAvailable ? (
              <>
                <video ref={videoRef} autoPlay playsInline className="w-full max-w-2xl h-auto rounded-lg md:rounded-xl bg-black" />
                
                {/* Capture button */}
                <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
                  <Button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white hover:bg-gray-200 text-black" onClick={capturePhoto}>
                    <ImageIcon className="w-6 h-6 md:w-8 md:h-8" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="w-full max-w-2xl aspect-video rounded-lg md:rounded-xl bg-black flex items-center justify-center">
                <p className="text-white text-center p-3 md:p-4 text-sm md:text-base">
                  Camera access is not available. Please check your browser permissions.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Photo Viewer */}
        {viewingPhoto && !showCamera && (
          <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4 bg-black">
            <img
              src={viewingPhoto}
              alt="Viewing captured photo"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Close button */}
            <button
              className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
              onClick={() => setViewingPhoto(null)}
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Download and Delete buttons when viewing */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4"
                onClick={() => downloadPhoto(viewingPhoto, capturedPhotos.indexOf(viewingPhoto))}
              >
                <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Download
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4"
                onClick={() => {
                  const index = capturedPhotos.indexOf(viewingPhoto)
                  deletePhoto(index)
                }}
              >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Hidden canvas for capturing photos */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Bottom bar with camera button and thumbnails */}
      <div className={`p-2 md:p-4 border-t border-gray-200 bg-gray-50`}>
        <div className="flex items-center gap-3">
          {/* Camera button */}
          <Button
            className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full ${
              showCamera ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
            onClick={openCamera}
          >
            <Camera className="w-5 h-5 md:w-6 md:h-6" />
          </Button>

          {/* Captured photos thumbnails */}
          {capturedPhotos.length > 0 && (
            <div className="flex overflow-x-auto space-x-2 md:space-x-3 pb-1 flex-1">
              {capturedPhotos.map((photo, index) => (
                <div key={index} className="relative group shrink-0">
                  <img
                    src={photo}
                    alt={`Captured photo ${index + 1}`}
                    className="h-12 md:h-16 w-auto rounded cursor-pointer hover:ring-2 ring-blue-500 transition-all"
                    onClick={() => handlePhotoClick(photo)}
                  />
                  {/* Download button - left side */}
                  <button
                    className="absolute top-0.5 left-0.5 md:top-1 md:left-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      downloadPhoto(photo, index)
                    }}
                  >
                    <Download className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  </button>
                  {/* Delete button - right side */}
                  <button
                    className="absolute top-0.5 right-0.5 md:top-1 md:right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      deletePhoto(index)
                    }}
                  >
                    <Trash2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
