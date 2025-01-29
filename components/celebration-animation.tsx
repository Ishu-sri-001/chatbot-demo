"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"

export default function CelebrationAnimation() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", updateWindowSize)
    updateWindowSize()

    const timer = setTimeout(() => setShowConfetti(false), 5000) // Stop after 5 seconds

    return () => {
      window.removeEventListener("resize", updateWindowSize)
      clearTimeout(timer)
    }
  }, [])

  if (!showConfetti) return null

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      numberOfPieces={200}
      gravity={0.3}
      colors={["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]} // Balloon-like colors
      recycle={false}
    />
  )
}

