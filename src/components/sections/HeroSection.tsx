"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { Button } from '@/components/ui/Button'
import { useUIStore } from '@/stores/ui-store'
import { HeroTypingEffect } from '@/components/effects/TypingEffect'
import { HeroGlobe } from '@/components/effects/GlobeBackground'

interface SiteSettings {
  siteTitle?: string
  tagline?: string
  missionStatement?: string
  designPhilosophy?: any[]
}

interface HeroSectionProps {
  siteSettings?: SiteSettings | null
}

export function HeroSection({ siteSettings }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { setSystemBootComplete, setAudioActive } = useUIStore()

  useEffect(() => {
    // Mark as complete immediately - content is always visible
    setSystemBootComplete(true)
    
    // Optional: Add a subtle fade-in animation after a brief delay
    // This won't interfere with visibility
    const timer = setTimeout(() => {
      try {
        gsap.to('.hero-title, .hero-subtitle, .hero-cta', {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        })
      } catch (error) {
        // Animation is optional, content is already visible
      }
    }, 50)

    return () => {
      clearTimeout(timer)
    }
  }, [setSystemBootComplete])

  const handleActivateExperience = () => {
    setAudioActive(true)
  }

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center"
      style={{ 
        backgroundColor: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#00f0ff]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#0047AB]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Globe behind typing effect */}
      <HeroGlobe />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 text-center">
        <h1 
          className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 sm:mb-6 px-2"
          style={{ 
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 'bold',
            color: '#ffffff',
            textShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
            lineHeight: '1.1',
          }}
        >
          {siteSettings?.siteTitle || 'David Ojo'}
        </h1>

        <div className="relative mb-8 sm:mb-10 md:mb-12 px-4">
          <p 
            className="hero-subtitle text-xl sm:text-2xl md:text-3xl lg:text-4xl relative z-10"
            style={{ 
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: '600',
              color: '#00f0ff',
              minHeight: '2.5rem',
              lineHeight: '1.4',
            }}
          >
            <HeroTypingEffect />
          </p>
        </div>

        <div className="hero-cta flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <Button 
            size="lg" 
            onClick={handleActivateExperience}
            className="w-full sm:w-auto"
          >
            Activate Experience
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            asChild 
            href="#projects"
            className="w-full sm:w-auto"
          >
            View Projects
          </Button>
        </div>
      </div>
    </section>
  )
}

