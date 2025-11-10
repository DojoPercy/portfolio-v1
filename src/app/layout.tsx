import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import '../styles/globals.css'
import { Providers } from '@/components/providers/Providers'
import { client } from '@/lib/sanity'
import { getSiteSettings } from '@/lib/sanity/queries'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'David Ojo - Full-Stack System Architect',
  description: 'Designing systems that connect people, data, and purpose',
  keywords: ['Full Stack Developer', 'System Architect', 'Product Designer', 'Next.js', 'React', 'TypeScript'],
  authors: [{ name: 'David Ojo' }],
  openGraph: {
    title: 'David Ojo - Full-Stack System Architect',
    description: 'Designing systems that connect people, data, and purpose',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Ojo - Full-Stack System Architect',
    description: 'Designing systems that connect people, data, and purpose',
  },
}

async function getAudioFiles() {
  try {
    const siteSettings = await client.fetch(getSiteSettings).catch(() => null)
    
    // Get audio file URLs from Sanity assets
    const voiceIntroUrl = siteSettings?.voiceIntroFile?.asset?.url || null
    const ambientMusicUrl = siteSettings?.ambientMusicFile?.asset?.url || null
    
    return {
      voiceIntroUrl: voiceIntroUrl || '/audio/voice-intro.mp3',
      ambientMusicUrl: ambientMusicUrl || '/audio/ambient-loop.mp3',
    }
  } catch (error) {
    console.error('Error fetching audio files:', error)
    return {
      voiceIntroUrl: '/audio/voice-intro.mp3',
      ambientMusicUrl: '/audio/ambient-loop.mp3',
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { voiceIntroUrl, ambientMusicUrl } = await getAudioFiles()
  
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <Providers voiceIntroUrl={voiceIntroUrl} ambientMusicUrl={ambientMusicUrl}>
          {children}
        </Providers>
      </body>
    </html>
  )
}






