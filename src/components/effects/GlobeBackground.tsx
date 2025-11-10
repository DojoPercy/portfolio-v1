"use client"

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

export function GlobeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    let phi = 0

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800 * 2,
      height: 800 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 6,
      mapBaseBrightness: 0.1,
      baseColor: [0.03, 0.08, 0.15], // Dark blue background
      glowColor: [0, 0.94, 1], // Neon cyan glow (RGB: 0, 240, 255)
      markerColor: [0, 240, 255], // Neon cyan markers
      markers: [
        // Ghana - Accra (where David is based)
        { location: [5.6037, -0.1870], size: 0.1 },
        // Kumasi (KNUST)
        { location: [6.7159, -1.5699], size: 0.08 },
      ],
      onRender: (state: { phi?: number }) => {
        state.phi = phi
        phi += 0.003
      },
    })

    return () => {
      globe.destroy()
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <canvas
          ref={canvasRef}
          className="opacity-30"
          style={{
            width: 800,
            height: 800,
            maxWidth: '100vw',
            maxHeight: '100vh',
          }}
        />
      </div>
    </div>
  )
}

