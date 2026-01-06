"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

type Position = { x: number; y: number }
type Pipe = { x: number; gap: number; height: number }

export default function FlappyBird() {
  // Game settings
  const CANVAS_WIDTH = 500
  const CANVAS_HEIGHT = 700
  const BIRD_SIZE = 30
  const PIPE_WIDTH = 60
  const PIPE_GAP = 160
  const GRAVITY = 0.3
  const JUMP_STRENGTH = -5
  const MAX_FALL_SPEED = 5
  const PIPE_SPEED = 3
  const PIPE_SPACING = 280

  // Game state
  const [birdY, setBirdY] = useState(CANVAS_HEIGHT / 2)
  const [birdVelocity, setBirdVelocity] = useState(0)
  const [pipes, setPipes] = useState<Pipe[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<number | null>(null)
  const lastPipeXRef = useRef(CANVAS_WIDTH)

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("flappyBirdHighScore")
    if (saved) setHighScore(parseInt(saved))
  }, [])

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem("flappyBirdHighScore", score.toString())
    }
  }, [score, highScore])

  // Handle spacebar press
  const jump = useCallback(() => {
    if (gameOver) return
    if (!gameStarted) {
      setGameStarted(true)
    }
    setBirdVelocity(JUMP_STRENGTH)
  }, [gameOver, gameStarted, JUMP_STRENGTH])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        jump()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [jump])

  // Generate initial pipes
  const generatePipe = useCallback((x: number): Pipe => {
    const minHeight = 50
    const maxHeight = CANVAS_HEIGHT - PIPE_GAP - minHeight
    const height = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight)
    
    return {
      x,
      gap: PIPE_GAP,
      height,
    }
  }, [CANVAS_HEIGHT, PIPE_GAP])

  // Initialize pipes
  useEffect(() => {
    if (gameStarted && pipes.length === 0) {
      const initialPipes = [
        generatePipe(CANVAS_WIDTH + 100),
        generatePipe(CANVAS_WIDTH + 100 + PIPE_SPACING),
        generatePipe(CANVAS_WIDTH + 100 + PIPE_SPACING * 2),
      ]
      setPipes(initialPipes)
      lastPipeXRef.current = initialPipes[initialPipes.length - 1].x
    }
  }, [gameStarted, pipes.length, generatePipe, CANVAS_WIDTH, PIPE_SPACING])

  // Check collision
  const checkCollision = useCallback((y: number, currentPipes: Pipe[]): boolean => {
    const birdX = 80
    const birdTop = y
    const birdBottom = y + BIRD_SIZE
    const birdLeft = birdX
    const birdRight = birdX + BIRD_SIZE

    // Check ground and ceiling collision
    if (birdTop <= 0 || birdBottom >= CANVAS_HEIGHT) {
      return true
    }

    // Check pipe collision
    for (const pipe of currentPipes) {
      const pipeLeft = pipe.x
      const pipeRight = pipe.x + PIPE_WIDTH

      // Check if bird is in the horizontal range of the pipe
      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        // Check if bird hits top or bottom pipe
        if (birdTop < pipe.height || birdBottom > pipe.height + pipe.gap) {
          return true
        }
      }
    }

    return false
  }, [BIRD_SIZE, CANVAS_HEIGHT, PIPE_WIDTH])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
        gameLoopRef.current = null
      }
      return
    }

    const animate = () => {
      // Update bird position
      setBirdVelocity((v) => {
        const newVelocity = v + GRAVITY
        // Cap the fall speed to prevent sudden drops
        return Math.min(newVelocity, MAX_FALL_SPEED)
      })

      setBirdY((y) => {
        const newY = y + birdVelocity
        return newY
      })

      // Update pipes
      setPipes((currentPipes) => {
        let newPipes = currentPipes.map((pipe) => ({
          ...pipe,
          x: pipe.x - PIPE_SPEED,
        }))

        // Remove pipes that are off screen
        newPipes = newPipes.filter((pipe) => pipe.x > -PIPE_WIDTH)

        // Add new pipes
        const lastPipe = newPipes[newPipes.length - 1]
        if (lastPipe && lastPipe.x < CANVAS_WIDTH - PIPE_SPACING) {
          newPipes.push(generatePipe(lastPipe.x + PIPE_SPACING))
        }

        // Check for scoring
        currentPipes.forEach((pipe) => {
          if (pipe.x + PIPE_WIDTH < 80 && pipe.x + PIPE_WIDTH + PIPE_SPEED >= 80) {
            setScore((s) => s + 1)
          }
        })

        // Check collision
        if (checkCollision(birdY, newPipes)) {
          setGameOver(true)
        }

        return newPipes
      })

      gameLoopRef.current = requestAnimationFrame(animate)
    }

    gameLoopRef.current = requestAnimationFrame(animate)

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameStarted, gameOver, birdVelocity, birdY, checkCollision, generatePipe, GRAVITY, MAX_FALL_SPEED, PIPE_SPEED, PIPE_WIDTH, PIPE_SPACING, CANVAS_WIDTH])

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas with gradient sky
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT)
    gradient.addColorStop(0, "#87CEEB")
    gradient.addColorStop(1, "#E0F6FF")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw clouds
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    ctx.beginPath()
    ctx.arc(100, 100, 40, 0, Math.PI * 2)
    ctx.arc(130, 90, 50, 0, Math.PI * 2)
    ctx.arc(160, 100, 40, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(280, 150, 35, 0, Math.PI * 2)
    ctx.arc(310, 145, 45, 0, Math.PI * 2)
    ctx.arc(340, 150, 35, 0, Math.PI * 2)
    ctx.fill()

    // Draw pipes
    pipes.forEach((pipe) => {
      // Top pipe
      ctx.fillStyle = "#6BBE45"
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.height)
      ctx.fillStyle = "#5AA73D"
      ctx.fillRect(pipe.x, pipe.height - 20, PIPE_WIDTH, 20)
      ctx.fillRect(pipe.x - 5, pipe.height - 30, PIPE_WIDTH + 10, 30)

      // Bottom pipe
      const bottomPipeY = pipe.height + pipe.gap
      ctx.fillStyle = "#6BBE45"
      ctx.fillRect(pipe.x, bottomPipeY, PIPE_WIDTH, CANVAS_HEIGHT - bottomPipeY)
      ctx.fillStyle = "#5AA73D"
      ctx.fillRect(pipe.x, bottomPipeY, PIPE_WIDTH, 20)
      ctx.fillRect(pipe.x - 5, bottomPipeY, PIPE_WIDTH + 10, 30)

      // Pipe border
      ctx.strokeStyle = "#4A9035"
      ctx.lineWidth = 2
      ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.height)
      ctx.strokeRect(pipe.x, bottomPipeY, PIPE_WIDTH, CANVAS_HEIGHT - bottomPipeY)
    })

    // Draw bird
    const birdX = 80
    ctx.save()
    ctx.translate(birdX + BIRD_SIZE / 2, birdY + BIRD_SIZE / 2)
    
    // Rotate bird based on velocity
    const rotation = Math.min(Math.max(birdVelocity * 0.05, -0.5), 0.5)
    ctx.rotate(rotation)

    // Bird body
    ctx.fillStyle = "#FFD700"
    ctx.beginPath()
    ctx.arc(0, 0, BIRD_SIZE / 2, 0, Math.PI * 2)
    ctx.fill()

    // Bird eye
    ctx.fillStyle = "#FFFFFF"
    ctx.beginPath()
    ctx.arc(5, -5, 6, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = "#000000"
    ctx.beginPath()
    ctx.arc(6, -4, 3, 0, Math.PI * 2)
    ctx.fill()

    // Bird beak
    ctx.fillStyle = "#FF6347"
    ctx.beginPath()
    ctx.moveTo(10, 0)
    ctx.lineTo(20, -2)
    ctx.lineTo(20, 2)
    ctx.closePath()
    ctx.fill()

    // Bird wing
    ctx.fillStyle = "#FFA500"
    ctx.beginPath()
    ctx.ellipse(-5, 5, 8, 12, Math.PI / 4, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()

    // Draw ground
    ctx.fillStyle = "#DEB887"
    ctx.fillRect(0, CANVAS_HEIGHT - 50, CANVAS_WIDTH, 50)
    ctx.fillStyle = "#8B7355"
    for (let i = 0; i < CANVAS_WIDTH; i += 40) {
      ctx.fillRect(i, CANVAS_HEIGHT - 50, 20, 10)
    }

    // Draw score
    ctx.fillStyle = "#FFFFFF"
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 3
    ctx.font = "bold 48px Arial"
    ctx.textAlign = "center"
    ctx.strokeText(score.toString(), CANVAS_WIDTH / 2, 80)
    ctx.fillText(score.toString(), CANVAS_WIDTH / 2, 80)

    // Draw game over
    if (gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      ctx.fillStyle = "#FFFFFF"
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 4
      ctx.font = "bold 60px Arial"
      ctx.textAlign = "center"
      ctx.strokeText("Game Over!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40)
      ctx.fillText("Game Over!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40)

      ctx.font = "bold 24px Arial"
      ctx.strokeText(`Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20)
      ctx.fillText(`Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20)

      ctx.strokeText(`Best: ${highScore}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60)
      ctx.fillText(`Best: ${highScore}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60)
    }

    // Draw start message
    if (!gameStarted) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
      ctx.fillRect(50, CANVAS_HEIGHT / 2 - 60, CANVAS_WIDTH - 100, 120)

      ctx.fillStyle = "#FFFFFF"
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 3
      ctx.font = "bold 28px Arial"
      ctx.textAlign = "center"
      ctx.strokeText("Press SPACE", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10)
      ctx.fillText("Press SPACE", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10)

      ctx.font = "bold 24px Arial"
      ctx.strokeText("to Flap!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 25)
      ctx.fillText("to Flap!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 25)
    }
  }, [birdY, birdVelocity, pipes, score, highScore, gameOver, gameStarted, CANVAS_WIDTH, CANVAS_HEIGHT, BIRD_SIZE, PIPE_WIDTH])

  const resetGame = () => {
    setBirdY(CANVAS_HEIGHT / 2)
    setBirdVelocity(0)
    setPipes([])
    setGameOver(false)
    setGameStarted(false)
    setScore(0)
    lastPipeXRef.current = CANVAS_WIDTH
  }

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true)
      jump()
    }
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-blue-100 p-2 sm:p-4">
      {/* Top bar with controls */}
      <div className="w-full max-w-[500px] mb-2 flex flex-col sm:flex-row items-center justify-between gap-2 px-2">
        {/* Left - Instructions */}
        <div className="text-xs text-gray-600 order-2 sm:order-1">
          <p className="hidden sm:block">Press <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300 font-mono text-xs">SPACE</kbd> to flap</p>
          <p className="sm:hidden text-center">Tap screen to flap</p>
        </div>

        {/* Center - Score */}
        <div className="flex items-center gap-3 sm:gap-6 order-1 sm:order-2">
          <div className="text-sm sm:text-lg font-bold text-gray-800">
            Score: <span className="text-blue-600">{score}</span>
          </div>
          <div className="text-sm sm:text-lg font-bold text-gray-800">
            Best: <span className="text-yellow-600">{highScore}</span>
          </div>
        </div>

        {/* Right - Buttons */}
        <div className="flex gap-2 order-3">
          {!gameStarted && !gameOver && (
            <Button onClick={startGame} className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm py-1.5 px-2 sm:px-3">
              <Play className="w-3 h-3 mr-1" />
              Start
            </Button>
          )}
          {gameOver && (
            <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm py-1.5 px-2 sm:px-3">
              <RotateCcw className="w-3 h-3 mr-1" />
              Play Again
            </Button>
          )}
        </div>
      </div>

      <div className="relative shadow-xs rounded-lg overflow-hidden max-w-full">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={jump}
          className="cursor-pointer max-w-full h-auto"
        />
      </div>
    </div>
  )
}
