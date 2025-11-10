"use client"

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(600)

  useEffect(() => {
    // Calculate responsive size
    const updateSize = () => {
      if (typeof window === 'undefined') return
      
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Responsive sizing - ensure globe fits in viewport
      if (width < 640) {
        // Mobile
        setSize(Math.min(width * 0.9, height * 0.6, 400))
      } else if (width < 1024) {
        // Tablet
        setSize(Math.min(width * 0.7, height * 0.7, 500))
      } else {
        // Desktop
        setSize(Math.min(width * 0.6, height * 0.8, 600))
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || size === 0) return

    let phi = 0
    let globe: ReturnType<typeof createGlobe> | null = null

    // Destroy existing globe if it exists
    if (globe) {
      globe.destroy()
    }

    globe = createGlobe(canvasRef.current, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: Math.min(16000, size * 25),
      mapBrightness: 4,
      mapBaseBrightness: 0.08,
      baseColor: [0.02, 0.05, 0.12],
      glowColor: [0, 0.94, 1],
      markerColor: [0, 240, 255],
      markers: [
        { location: [5.6037, -0.1870], size: 0.12 },
        { location: [6.7159, -1.5699], size: 0.1 },
      ],
      onRender: (state: { phi?: number }) => {
        state.phi = phi
        phi += 0.005
      },
    })

    return () => {
      if (globe) {
        globe.destroy()
      }
    }
  }, [size])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      style={{
        overflow: 'visible',
        padding: '2rem',
      }}
    >
      <div 
        className="relative"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      >
        <canvas
          ref={canvasRef}
          className="opacity-20 w-full h-full"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  )
}

