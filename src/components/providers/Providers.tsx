"use client"

import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import { AudioController } from '@/components/audio/AudioController'
import { CustomCursor } from '@/components/effects/CustomCursor'
import { SoundEffects } from '@/components/effects/SoundEffects'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
import { MicroInteractions } from '@/components/effects/MicroInteractions'
import { ParticleBackground } from '@/components/effects/ParticleBackground'
import { GlobeBackground } from '@/components/effects/GlobeBackground'

interface ProvidersProps {
  children: React.ReactNode
  voiceIntroUrl?: string | null
  ambientMusicUrl?: string | null
}

export function Providers({ children, voiceIntroUrl, ambientMusicUrl }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <GlobeBackground />
      <ParticleBackground />
      <CustomCursor />
      <SoundEffects />
      <ScrollProgress />
      <MicroInteractions />
      {children}
      <AudioController 
        voiceSrc={voiceIntroUrl || '/audio/voice-intro.mp3'} 
        bgSrc={ambientMusicUrl || '/audio/ambient-loop.mp3'} 
      />
    </ThemeProvider>
  )
}







