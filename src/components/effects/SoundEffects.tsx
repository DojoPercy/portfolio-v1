"use client"

import { useEffect, useRef } from 'react'
import { useUIStore } from '@/stores/ui-store'
import { Howl } from 'howler'

// Sound effect paths (you can add your own sound files)
const soundEffects = {
  hover: '/audio/hover.mp3',
  click: '/audio/click.mp3',
  scroll: '/audio/scroll.mp3',
  success: '/audio/success.mp3',
  error: '/audio/error.mp3',
}

// Create sound instances with low volume
const sounds: Record<string, Howl | null> = {}

export function SoundEffects() {
  const { audioActive } = useUIStore()
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Initialize sounds only if audio is enabled
    if (audioActive) {
      // Initialize sound effects (with fallback to silent if files don't exist)
      Object.entries(soundEffects).forEach(([key, path]) => {
        try {
          sounds[key] = new Howl({
            src: [path],
            volume: 0.2, // Lower volume for UI sounds
            preload: false, // Don't preload to save bandwidth
            html5: true,
            onloaderror: () => {
              // Silently fail if sound file doesn't exist
              sounds[key] = null
            },
          })
        } catch (error) {
          // Silently fail if Howl can't be created
          sounds[key] = null
        }
      })
    } else {
      // Clean up sounds when audio is disabled
      Object.keys(sounds).forEach((key) => {
        if (sounds[key]) {
          sounds[key]?.unload()
          sounds[key] = null
        }
      })
    }

    return () => {
      // Cleanup on unmount
      Object.values(sounds).forEach((sound) => {
        if (sound) {
          try {
            sound.unload()
          } catch (error) {
            // Ignore cleanup errors
          }
        }
      })
    }
  }, [audioActive])

  useEffect(() => {
    if (!audioActive) return

    const playSound = (soundName: keyof typeof soundEffects) => {
      const sound = sounds[soundName]
      if (sound && audioActive) {
        try {
          sound.play()
        } catch (error) {
          // Silently fail if sound can't play
        }
      }
    }

    // Handle hover sounds on interactive elements
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Clear any existing timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }

      // Only play hover sound on buttons, links, and interactive elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-sound="hover"]')
      ) {
        hoverTimeoutRef.current = setTimeout(() => {
          playSound('hover')
        }, 50) // Small delay to prevent spam
      }
    }

    // Handle click sounds
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-sound="click"]')
      ) {
        playSound('click')
      }
    }

    // Handle scroll sounds (throttled)
    let lastScrollTime = 0
    const scrollThrottle = 100 // ms
    const handleScroll = () => {
      const now = Date.now()
      if (now - lastScrollTime > scrollThrottle) {
        // Play subtle scroll sound only on significant scroll
        lastScrollTime = now
      }
    }

    // Handle form submission sounds
    const handleSubmit = (e: Event) => {
      const target = e.target as HTMLFormElement
      if (target.tagName === 'FORM') {
        playSound('success')
      }
    }

    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('click', handleClick, true)
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('submit', handleSubmit, true)

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('click', handleClick, true)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('submit', handleSubmit, true)
      
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [audioActive])

  return null // This component doesn't render anything
}

// Helper function to play custom sounds
export function playSoundEffect(soundName: keyof typeof soundEffects) {
  const sound = sounds[soundName]
  if (sound) {
    try {
      sound.play()
    } catch (error) {
      // Silently fail
    }
  }
}

