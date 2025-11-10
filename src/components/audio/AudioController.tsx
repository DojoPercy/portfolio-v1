"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'
import { useUIStore } from '@/stores/ui-store'
import gsap from 'gsap'

interface AudioControllerProps {
  voiceSrc?: string
  bgSrc?: string
}

export function AudioController({ voiceSrc = '/audio/voice-intro.mp3', bgSrc = '/audio/ambient-loop.mp3' }: AudioControllerProps) {
  const { audioActive, setAudioActive } = useUIStore()
  const voiceRef = useRef<HTMLAudioElement | null>(null)
  const bgRef = useRef<HTMLAudioElement | null>(null)
  const [voicePlaying, setVoicePlaying] = useState(false)
  const [voicePlayed, setVoicePlayed] = useState(false) // Track if voice intro has played
  const [ambientStarted, setAmbientStarted] = useState(false) // Track if ambient music has started

  // Function to start ambient music with fade in
  const startAmbientMusic = useCallback(() => {
    if (bgRef.current) {
      console.log('Starting ambient music...')
      bgRef.current.volume = 0
      bgRef.current.play().catch((error) => {
        console.error('Error playing ambient music:', error)
      })
      gsap.to(bgRef.current, { volume: 0.28, duration: 1.5 })
      setAmbientStarted(true)
    }
  }, [])

  // Set up voice intro event handlers once
  useEffect(() => {
    const voiceAudio = voiceRef.current
    if (!voiceAudio) return

    const handleVoiceEnded = () => {
      console.log('Voice intro ended, starting ambient music...')
      setVoicePlaying(false)
      // Start ambient music ONLY after voice intro completely ends
      startAmbientMusic()
    }
    
    const handleVoiceError = () => {
      console.error('Voice intro playback error, starting ambient music...')
      setVoicePlaying(false)
      // If voice intro fails, start ambient music instead
      startAmbientMusic()
    }

    voiceAudio.addEventListener('ended', handleVoiceEnded)
    voiceAudio.addEventListener('error', handleVoiceError)

    return () => {
      voiceAudio.removeEventListener('ended', handleVoiceEnded)
      voiceAudio.removeEventListener('error', handleVoiceError)
    }
  }, [startAmbientMusic])

  // Handle voice intro playback - plays first
  useEffect(() => {
    if (!audioActive) return

    const voiceAudio = voiceRef.current
    const bgAudio = bgRef.current

    // Only start voice intro if it hasn't played yet
    if (!voicePlayed && !voicePlaying && voiceAudio) {
      // CRITICAL: Stop ambient music completely before starting voice intro
      if (bgAudio) {
        bgAudio.pause()
        bgAudio.currentTime = 0
        setAmbientStarted(false)
      }

      // Reset voice intro to beginning
      voiceAudio.currentTime = 0
      
      // Play voice intro
      voiceAudio.play()
        .then(() => {
          console.log('Voice intro started playing - ambient music will wait...')
          setVoicePlaying(true)
          setVoicePlayed(true)
        })
        .catch((error) => {
          console.error('Error playing voice intro:', error)
          // If play fails, start ambient music instead
          setVoicePlaying(false)
          startAmbientMusic()
        })
    }
  }, [audioActive, voicePlayed, voicePlaying, startAmbientMusic])

  // Handle ambient music - only plays after voice intro ends
  useEffect(() => {
    if (!audioActive || !bgRef.current) return

    // Only manage ambient music if voice intro has finished
    if (ambientStarted && !voicePlaying) {
      // Ensure ambient music is playing and looping
      if (bgRef.current.paused) {
        bgRef.current.play().catch((error) => {
          console.error('Error playing ambient music:', error)
        })
      }
    }
  }, [audioActive, ambientStarted, voicePlaying])

  // Handle audio deactivation - stop everything
  useEffect(() => {
    if (!audioActive) {
      // Fade out ambient music if it's playing
      if (bgRef.current && !bgRef.current.paused) {
        gsap.to(bgRef.current, {
          volume: 0,
          duration: 0.6,
          onComplete: () => {
            if (bgRef.current) {
              bgRef.current.pause()
              bgRef.current.currentTime = 0 // Reset to beginning
            }
          },
        })
      } else if (bgRef.current) {
        bgRef.current.pause()
        bgRef.current.currentTime = 0
      }
      
      // Stop voice intro
      if (voiceRef.current) {
        voiceRef.current.pause()
        voiceRef.current.currentTime = 0 // Reset to beginning
      }
      
      // Reset all states
      setVoicePlaying(false)
      setAmbientStarted(false)
      setVoicePlayed(false) // Reset so voice intro plays again when audio is reactivated
    }
  }, [audioActive])

  const toggleAudio = () => {
    setAudioActive(!audioActive)
  }

  // Debug: Log audio sources
  useEffect(() => {
    if (voiceSrc) {
      console.log('Voice intro URL:', voiceSrc)
    }
    if (bgSrc) {
      console.log('Ambient music URL:', bgSrc)
    }
  }, [voiceSrc, bgSrc])

  return (
    <>
      <audio ref={voiceRef} src={voiceSrc} preload="auto" crossOrigin="anonymous" />
      <audio ref={bgRef} src={bgSrc} preload="auto" loop crossOrigin="anonymous" />
      
      <div className="fixed bottom-4 right-4 z-50">
        <IconButton
          variant="neon"
          onClick={toggleAudio}
          aria-label={audioActive ? 'Mute audio' : 'Unmute audio'}
          className="rounded-full p-3"
        >
          {audioActive ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </IconButton>
      </div>
      
      {audioActive && voicePlaying && (
        <div className="fixed bottom-20 right-4 z-50 glass rounded-lg px-4 py-2 text-sm text-white max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-xs text-gray-400 mb-1">Voice Intro</p>
          <p>"System online. Hello, I'm David Ojo — a full-stack system architect and creative product designer..."</p>
        </div>
      )}
    </>
  )
}







