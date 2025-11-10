"use client"

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    // Show progress bar after scrolling a bit
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-dark-surface z-[9998]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-cyan origin-left"
        style={{
          scaleX,
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
        }}
      />
      {/* Glow effect */}
      <div
        className="absolute top-0 left-0 h-full w-full bg-neon-cyan opacity-20 blur-sm"
        style={{
          transform: `scaleX(${scaleX.get()})`,
          transformOrigin: 'left',
        }}
      />
    </motion.div>
  )
}

