"use client"

import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
import { MicroInteractions } from '@/components/effects/MicroInteractions'
import { ParticleBackground } from '@/components/effects/ParticleBackground'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ParticleBackground />
      <ScrollProgress />
      <MicroInteractions />
      {children}
    </ThemeProvider>
  )
}







