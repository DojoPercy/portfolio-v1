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
    setSystemBootComplete(true)
    
    const timer = setTimeout(() => {
      try {
        gsap.to('.hero-title, .hero-subtitle, .hero-cta', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        })
      } catch (error) {
        // Animation is optional
      }
    }, 100)

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#00f0ff]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#0047AB]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Globe - positioned behind content */}
      <HeroGlobe />

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12 py-20 sm:py-28 md:py-36">
        <div className="text-center space-y-6 sm:space-y-8 md:space-y-10">
          {/* Name */}
          <motion.h1 
            className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ 
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              color: '#ffffff',
              textShadow: '0 0 30px rgba(0, 240, 255, 0.4), 0 0 60px rgba(0, 240, 255, 0.2)',
              letterSpacing: '-0.02em',
            }}
          >
            {siteSettings?.siteTitle || 'David Ojo'}
          </motion.h1>

          {/* Typing effect */}
          <motion.div 
            className="hero-subtitle relative min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem] flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold relative z-10"
              style={{ 
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                color: '#00f0ff',
                textShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
              }}
            >
              <HeroTypingEffect />
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="hero-cta flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              onClick={handleActivateExperience}
              className="w-full sm:w-auto min-w-[200px]"
            >
              Activate Experience
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              
              href="#projects"
              className="w-full sm:w-auto min-w-[200px] text-white"
            >
              View Projects
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

