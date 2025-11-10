"use client"

import { HTMLAttributes, forwardRef, useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tilt?: boolean
  glass?: boolean
  elevation?: 1 | 2 | 3 | 4
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, tilt = false, glass = false, elevation = 2, ...props }, ref) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 })
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!tilt || !cardRef.current) return

      const handleMouseMove = (e: MouseEvent) => {
        if (!cardRef.current) return
        
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10

        setRotation({ x: rotateX, y: rotateY })
      }

      const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 })
      }

      const card = cardRef.current
      card.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        card.removeEventListener('mousemove', handleMouseMove)
        card.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, [tilt])

    const elevationClasses = {
      1: 'elevation-1',
      2: 'elevation-2',
      3: 'elevation-3',
      4: 'elevation-4',
    }

    const cardClassName = cn(
      'rounded-lg p-6 transition-all duration-300',
      glass ? 'glass' : 'bg-dark-surface',
      elevationClasses[elevation],
      tilt && 'card-3d cursor-pointer',
      className
    )

    // Use motion.div only when tilt is enabled to avoid type conflicts
    if (tilt) {
      return (
        <motion.div
          ref={cardRef}
          className={cardClassName}
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
          whileHover={{ scale: 1.02 }}
          {...(props as any)}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <div
        ref={ref}
        className={cardClassName}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

export { Card }


