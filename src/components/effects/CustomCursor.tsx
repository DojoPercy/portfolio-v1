"use client"

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'click' | 'text' | 'link'>('default')
  
  // Only show on desktop (not mobile/touch devices)
  const [isDesktop, setIsDesktop] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Check if device is desktop
  useEffect(() => {
    const checkDesktop = () => {
      const isPointerFine = window.matchMedia('(pointer: fine)').matches
      const isWideScreen = window.innerWidth > 768
      setIsDesktop(isPointerFine && isWideScreen)
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    
    return () => {
      window.removeEventListener('resize', checkDesktop)
    }
  }, [])

  // Setup cursor movement and interactions
  useEffect(() => {
    if (!isDesktop) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check for interactive elements
      if (target.closest('a')) {
        setCursorVariant('link')
        setIsHovering(true)
      } else if (target.closest('button')) {
        setCursorVariant('hover')
        setIsHovering(true)
      } else if (target.closest('input, textarea, [contenteditable]')) {
        setCursorVariant('text')
        setIsHovering(true)
      } else if (target.closest('[data-cursor="magnetic"]')) {
        setCursorVariant('hover')
        setIsHovering(true)
      } else {
        setCursorVariant('default')
        setIsHovering(false)
      }
    }

    const handleMouseOut = () => {
      setCursorVariant('default')
      setIsHovering(false)
    }

    const handleMouseDown = () => {
      setCursorVariant('click')
    }

    const handleMouseUp = () => {
      // Reset will happen on next mouse move
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver, true)
    document.addEventListener('mouseout', handleMouseOut, true)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver, true)
      document.removeEventListener('mouseout', handleMouseOut, true)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY, isDesktop])

  const cursorVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(0, 240, 255, 0.3)',
      border: '2px solid rgba(0, 240, 255, 0.6)',
      scale: 1,
    },
    hover: {
      width: 64,
      height: 64,
      backgroundColor: 'rgba(0, 240, 255, 0.2)',
      border: '2px solid rgba(0, 240, 255, 0.8)',
      scale: 1.5,
    },
    click: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0, 240, 255, 0.4)',
      border: '2px solid rgba(0, 240, 255, 1)',
      scale: 0.9,
    },
    text: {
      width: 4,
      height: 24,
      backgroundColor: 'rgba(0, 240, 255, 0.8)',
      border: 'none',
      scale: 1,
    },
    link: {
      width: 56,
      height: 56,
      backgroundColor: 'rgba(0, 240, 255, 0.15)',
      border: '2px solid rgba(0, 240, 255, 0.7)',
      scale: 1.3,
    },
  }

  if (!isDesktop) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={cursorVariants[cursorVariant]}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
      }}
    >
      <div className="relative">
        <div
          className="rounded-full transition-all duration-300"
          style={{
            width: cursorVariants[cursorVariant].width,
            height: cursorVariants[cursorVariant].height,
            backgroundColor: cursorVariants[cursorVariant].backgroundColor as string,
            border: cursorVariants[cursorVariant].border as string,
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
          }}
        />
        {/* Cursor trail dots */}
        {isHovering && cursorVariant !== 'text' && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neon-cyan rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>
      {cursorText && (
        <motion.div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-dark-surface border border-neon-cyan rounded text-xs text-neon-cyan whitespace-nowrap"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {cursorText}
        </motion.div>
      )}
    </motion.div>
  )
}

