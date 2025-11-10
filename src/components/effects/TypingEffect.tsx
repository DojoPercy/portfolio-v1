"use client"

import { useEffect, useState } from 'react'

// Simpler typing effect for hero
export function HeroTypingEffect() {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    const texts = [
      'Full-Stack Developer',
      'System Architect',
      'Creative Problem Solver',
      'AI Integration Specialist',
    ]
    
    const currentText = texts[currentIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayedText.length < currentText.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayedText(currentText.substring(0, displayedText.length + 1))
      }, 100)
    } else if (!isDeleting && displayedText.length === currentText.length) {
      // Pause at end
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(currentText.substring(0, displayedText.length - 1))
      }, 50)
    } else if (isDeleting && displayedText.length === 0) {
      // Move to next text
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [displayedText, currentIndex, isDeleting])

  if (!displayedText) return null

  return (
    <span className="inline-block text-neon-cyan min-h-[1.5em]">
      {displayedText}
      <span className="animate-pulse ml-1">|</span>
    </span>
  )
}

