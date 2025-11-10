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
      width: 800 * 2,
      height: 800 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 8,
      mapBaseBrightness: 0.1,
      baseColor: [0.03, 0.08, 0.15],
      glowColor: [0, 0.94, 1],
      markerColor: [0, 240, 255],
      markers: [
        { location: [5.6037, -0.1870], size: 0.1 },
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
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="opacity-25 md:opacity-30"
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '800px',
          maxHeight: '800px',
          aspectRatio: '1 / 1',
        }}
      />
    </div>
  )
}

