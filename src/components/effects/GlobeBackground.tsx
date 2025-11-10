"use client"

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    let phi = 0

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 4,
      mapBaseBrightness: 0.08,
      baseColor: [0.02, 0.05, 0.12], // Very dark blue background
      glowColor: [0, 0.94, 1], // Neon cyan glow (RGB: 0, 240, 255)
      markerColor: [0, 240, 255], // Neon cyan markers
      markers: [
        // Ghana - Accra (where David is based)
        { location: [5.6037, -0.1870], size: 0.12 },
        // Kumasi (KNUST)
        { location: [6.7159, -1.5699], size: 0.1 },
      ],
      onRender: (state: { phi?: number }) => {
        state.phi = phi
        phi += 0.005
      },
    })

    return () => {
      globe.destroy()
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="opacity-20"
          style={{
            width: 600,
            height: 600,
            maxWidth: '90vw',
            maxHeight: '90vh',
          }}
        />
      </div>
    </div>
  )
}

