"use client"

import { useState, useRef } from "react"
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas"
import { Eraser, Trash2, Undo2, Redo2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function Paint() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null)
  const [strokeColor, setStrokeColor] = useState("#000000")
  const [strokeWidth, setStrokeWidth] = useState(4)
  const [eraserMode, setEraserMode] = useState(false)

  const colors = [
    "#000000", // Black
    "#FF0000", // Red
    "#0000FF", // Blue
    "#00FF00", // Green
    "#FFFF00", // Yellow
    "#FFA500", // Orange
    "#800080", // Purple
    "#FFC0CB", // Pink
  ]

  const handleUndo = () => {
    canvasRef.current?.undo()
  }

  const handleRedo = () => {
    canvasRef.current?.redo()
  }

  const handleClear = () => {
    canvasRef.current?.clearCanvas()
  }

  const handleEraser = () => {
    setEraserMode(!eraserMode)
    if (!eraserMode) {
      canvasRef.current?.eraseMode(true)
    } else {
      canvasRef.current?.eraseMode(false)
    }
  }

  const handleColorChange = (color: string) => {
    setStrokeColor(color)
    setEraserMode(false)
    canvasRef.current?.eraseMode(false)
  }

  const handleExport = async () => {
    const canvas = canvasRef.current
    if (canvas) {
      const dataUrl = await canvas.exportImage("png")
      const link = document.createElement("a")
      link.download = `paint-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    }
  }

  return (
    <div className="h-full w-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-3 px-2 sm:px-3 py-2 bg-white border-b border-gray-200">
        {/* Left: Tools */}
        <div className="flex items-center gap-1.5 order-1">
          <Button
            onClick={handleUndo}
            variant="outline"
            size="sm"
            className="h-7 w-7 p-0"
            title="Undo"
          >
            <Undo2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            onClick={handleRedo}
            variant="outline"
            size="sm"
            className="h-7 w-7 p-0"
            title="Redo"
          >
            <Redo2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            onClick={handleEraser}
            variant={eraserMode ? "default" : "outline"}
            size="sm"
            className="h-7 w-7 p-0"
            title="Eraser"
          >
            <Eraser className="h-3.5 w-3.5" />
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            size="sm"
            className="h-7 w-7 p-0"
            title="Clear Canvas"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            className="h-7 w-7 p-0"
            title="Export as PNG"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Center: Color Palette */}
        <div className="flex items-center gap-1 order-3 sm:order-2 w-full sm:w-auto justify-center">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`w-6 h-6 rounded border-2 transition-all hover:scale-110 ${
                strokeColor === color && !eraserMode
                  ? "border-blue-500 shadow-md scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        {/* Right: Brush Size */}
        <div className="flex items-center gap-2 order-2 sm:order-3">
          <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
            Size:
          </span>
          <Slider
            value={[strokeWidth]}
            onValueChange={(value) => setStrokeWidth(value[0])}
            min={1}
            max={20}
            step={1}
            className="w-16 sm:w-24"
          />
          <span className="text-xs font-medium text-gray-900 w-6 text-center">
            {strokeWidth}
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-2 sm:p-4 overflow-hidden">
        <div className="h-full w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <ReactSketchCanvas
            ref={canvasRef}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            canvasColor="#FFFFFF"
            exportWithBackgroundImage={true}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  )
}
