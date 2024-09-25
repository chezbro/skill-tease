'use client'

import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti'

interface ConfettiOverlayProps {
  show: boolean
  onComplete: () => void
}

export default function ConfettiOverlay({ show, onComplete }: ConfettiOverlayProps) {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    updateWindowDimensions()
    window.addEventListener('resize', updateWindowDimensions)

    return () => window.removeEventListener('resize', updateWindowDimensions)
  }, [])

  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 5000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <Confetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        recycle={false}
        numberOfPieces={500}
      />
    </div>
  )
}