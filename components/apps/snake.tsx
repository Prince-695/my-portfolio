"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, RotateCcw, Pause, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

// Define types for game elements
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }

export default function Snake() {
  // Game settings
  const CANVAS_WIDTH = 500
  const CANVAS_HEIGHT = 500
  const GRID_SIZE = 20
  const CELL_SIZE = CANVAS_WIDTH / GRID_SIZE
  const GAME_SPEED = 100
  const INITIAL_SNAKE = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]

  // Game state
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>({ x: 5, y: 5 })
  const [direction, setDirection] = useState<Direction>("UP")
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<number | null>(null)
  const isMobile = useIsMobile()

  // Handle direction change
  const handleDirectionChange = (newDirection: Direction) => {
    if (gameOver) return
    
    switch (newDirection) {
      case "UP":
        if (direction !== "DOWN") setDirection("UP")
        break
      case "DOWN":
        if (direction !== "UP") setDirection("DOWN")
        break
      case "LEFT":
        if (direction !== "RIGHT") setDirection("LEFT")
        break
      case "RIGHT":
        if (direction !== "LEFT") setDirection("RIGHT")
        break
    }
  }

  // Generate random food position
  const generateFood = useCallback((): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }

    // Make sure food doesn't spawn on snake
    if (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)) {
      return generateFood()
    }

    return newFood
  }, [snake, GRID_SIZE])

  // Draw game on canvas
  const drawGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT)
    gradient.addColorStop(0, "#1a1a2e")
    gradient.addColorStop(1, "#0f3460")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid with subtle lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
    ctx.lineWidth = 1
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, CANVAS_HEIGHT)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(CANVAS_WIDTH, i * CELL_SIZE)
      ctx.stroke()
    }

    // Draw snake with gradient and glow
    snake.forEach((segment, index) => {
      const isHead = index === 0

      // Add glow effect
      ctx.shadowBlur = 15
      ctx.shadowColor = "#16a34a"

      // Snake segment gradient
      const segmentGradient = ctx.createRadialGradient(
        segment.x * CELL_SIZE + CELL_SIZE / 2,
        segment.y * CELL_SIZE + CELL_SIZE / 2,
        0,
        segment.x * CELL_SIZE + CELL_SIZE / 2,
        segment.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2
      )
      
      if (isHead) {
        segmentGradient.addColorStop(0, "#22c55e")
        segmentGradient.addColorStop(1, "#16a34a")
      } else {
        segmentGradient.addColorStop(0, "#4ade80")
        segmentGradient.addColorStop(1, "#22c55e")
      }

      ctx.fillStyle = segmentGradient
      
      // Draw rounded rectangle for snake segment
      const x = segment.x * CELL_SIZE
      const y = segment.y * CELL_SIZE
      const radius = CELL_SIZE / 4
      
      ctx.beginPath()
      ctx.roundRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4, radius)
      ctx.fill()

      // Draw eyes on head
      if (isHead) {
        ctx.shadowBlur = 0
        ctx.fillStyle = "#ffffff"
        const eyeSize = CELL_SIZE / 8
        const eyeOffset = CELL_SIZE / 3
        
        if (direction === "UP" || direction === "DOWN") {
          ctx.beginPath()
          ctx.arc(x + eyeOffset, y + CELL_SIZE / 3, eyeSize, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(x + CELL_SIZE - eyeOffset, y + CELL_SIZE / 3, eyeSize, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(x + CELL_SIZE - CELL_SIZE / 3, y + eyeOffset, eyeSize, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(x + CELL_SIZE - CELL_SIZE / 3, y + CELL_SIZE - eyeOffset, eyeSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    })

    // Reset shadow
    ctx.shadowBlur = 0

    // Draw food with pulsing effect and glow
    const time = Date.now() / 1000
    const pulseScale = 1 + Math.sin(time * 5) * 0.1
    
    ctx.shadowBlur = 20
    ctx.shadowColor = "#ef4444"

    const foodGradient = ctx.createRadialGradient(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      0,
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      (CELL_SIZE / 2) * pulseScale
    )
    foodGradient.addColorStop(0, "#fca5a5")
    foodGradient.addColorStop(0.5, "#ef4444")
    foodGradient.addColorStop(1, "#dc2626")

    ctx.fillStyle = foodGradient
    ctx.beginPath()
    const centerX = food.x * CELL_SIZE + CELL_SIZE / 2
    const centerY = food.y * CELL_SIZE + CELL_SIZE / 2
    ctx.arc(centerX, centerY, (CELL_SIZE / 2 - 2) * pulseScale, 0, 2 * Math.PI)
    ctx.fill()

    // Reset shadow
    ctx.shadowBlur = 0

    // Draw game over overlay
    if (gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#FFFFFF"
      ctx.strokeStyle = "#ef4444"
      ctx.lineWidth = 4
      ctx.font = "bold 48px Arial"
      ctx.textAlign = "center"
      ctx.strokeText("Game Over!", canvas.width / 2, canvas.height / 2 - 40)
      ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 40)

      ctx.strokeStyle = "#22c55e"
      ctx.lineWidth = 3
      ctx.font = "bold 24px Arial"
      ctx.strokeText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10)
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10)

      ctx.strokeStyle = "#fbbf24"
      ctx.strokeText(`Best: ${highScore}`, canvas.width / 2, canvas.height / 2 + 50)
      ctx.fillText(`Best: ${highScore}`, canvas.width / 2, canvas.height / 2 + 50)
    }

    // Draw pause overlay
    if (isPaused && !gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#FFFFFF"
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 3
      ctx.font = "bold 36px Arial"
      ctx.textAlign = "center"
      ctx.strokeText("Press Play to Start", canvas.width / 2, canvas.height / 2)
      ctx.fillText("Press Play to Start", canvas.width / 2, canvas.height / 2)
    }
  }, [
    snake,
    food,
    gameOver,
    isPaused,
    score,
    highScore,
    direction,
    CELL_SIZE,
    GRID_SIZE,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
  ])

  // Game loop
  const gameLoop = useCallback(() => {
    if (isPaused || gameOver) return

    // Move snake
    const head = { ...snake[0] }
    switch (direction) {
      case "UP":
        head.y -= 1
        break
      case "DOWN":
        head.y += 1
        break
      case "LEFT":
        head.x -= 1
        break
      case "RIGHT":
        head.x += 1
        break
    }

    // Check for collisions with walls
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setGameOver(true)
      return
    }

    // Check for collisions with self
    if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true)
      return
    }

    // Check if snake eats food
    const newSnake = [head, ...snake]
    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood())
      setScore((prevScore) => prevScore + 10)
      setHighScore((prevHighScore) => Math.max(prevHighScore, score + 10))
    } else {
      newSnake.pop() // Remove tail if no food eaten
    }

    setSnake(newSnake)
  }, [direction, food, gameOver, generateFood, isPaused, score, snake, GRID_SIZE])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return

      switch (e.key) {
        case "ArrowUp":
          handleDirectionChange("UP")
          break
        case "ArrowDown":
          handleDirectionChange("DOWN")
          break
        case "ArrowLeft":
          handleDirectionChange("LEFT")
          break
        case "ArrowRight":
          handleDirectionChange("RIGHT")
          break
        case " ": // Space bar to pause/resume
          setIsPaused((prev) => !prev)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [direction, gameOver])

  // Start/stop game loop
  useEffect(() => {
    if (!isPaused && !gameOver) {
      gameLoopRef.current = window.setInterval(gameLoop, GAME_SPEED)
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current)
      gameLoopRef.current = null
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [isPaused, gameOver, gameLoop, GAME_SPEED])

  // Draw game whenever state changes
  useEffect(() => {
    drawGame()
  }, [snake, food, gameOver, score, drawGame])

  // Initialize high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("snakeHighScore")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore, 10))
    }
  }, [])

  // Save high score to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("snakeHighScore", highScore.toString())
  }, [highScore])

  // Reset game
  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(generateFood())
    setDirection("UP")
    setGameOver(false)
    setScore(0)
    setIsPaused(true)
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Top bar with controls - compact */}
      <div className="w-full max-w-[500px] mb-1 sm:mb-2 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 px-2">
        {/* Left - Score display */}
        <div className="flex items-center gap-2 sm:gap-4 order-1">
          <div className="text-xs sm:text-sm font-bold text-white">
            Score: <span className="text-green-400">{score}</span>
          </div>
          <div className="text-xs sm:text-sm font-bold text-white">
            Best: <span className="text-yellow-400">{highScore}</span>
          </div>
        </div>

        {/* Right - Control buttons */}
        <div className="flex gap-1 sm:gap-2 order-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
            disabled={gameOver}
            className="bg-blue-600 hover:bg-blue-700 text-white border-blue-700 text-xs py-1 px-2"
          >
            {isPaused ? <Play className="w-3 h-3 mr-1" /> : <Pause className="w-3 h-3 mr-1" />}
            {isPaused ? "Play" : "Pause"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetGame} 
            className="bg-green-600 hover:bg-green-700 text-white border-green-700 text-xs py-1 px-2"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Restart
          </Button>
        </div>
      </div>

      {/* Game canvas */}
      <div className="relative shadow-2xl sm:rounded-lg overflow-hidden max-w-full">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="max-w-full h-auto"
        />
      </div>

      {/* Instructions - compact */}
      <div className="mt-1 sm:mt-2 text-center text-[10px] sm:text-xs text-gray-300 max-w-[500px] px-2">
        <p>{isMobile ? "Use the arrow buttons below to move" : "Use arrow keys to move • Space to pause/resume"}</p>
      </div>

      {/* Mobile Controls */}
      {isMobile && (
        <div className="mt-3 flex flex-col items-center gap-2">
          {/* Up button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDirectionChange("UP")}
            disabled={gameOver || isPaused}
            className="bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700 w-12 h-12 p-0"
          >
            <ArrowUp className="w-6 h-6" />
          </Button>
          
          {/* Left, Down, Right buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDirectionChange("LEFT")}
              disabled={gameOver || isPaused}
              className="bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700 w-12 h-12 p-0"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDirectionChange("DOWN")}
              disabled={gameOver || isPaused}
              className="bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700 w-12 h-12 p-0"
            >
              <ArrowDown className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDirectionChange("RIGHT")}
              disabled={gameOver || isPaused}
              className="bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700 w-12 h-12 p-0"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
