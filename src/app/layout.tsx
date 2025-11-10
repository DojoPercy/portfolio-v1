import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import '../styles/globals.css'
import { Providers } from '@/components/providers/Providers'
import { client } from '@/lib/sanity'
import { getSiteSettings } from '@/lib/sanity/queries'
import { getImageUrl } from '@/lib/sanity/image'

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

async function getMetadata() {
  try {
    const siteSettings = await client.fetch(getSiteSettings).catch(() => null)
    
    if (!siteSettings) {
      return {
        title: 'David Ojo - Full-Stack System Architect',
        description: 'Designing systems that connect people, data, and purpose',
        ogImage: undefined,
      }
    }

    const title = siteSettings.seo?.title || siteSettings.siteTitle || 'David Ojo - Full-Stack System Architect'
    const description = siteSettings.seo?.description || siteSettings.tagline || siteSettings.missionStatement || 'Designing systems that connect people, data, and purpose'
    
    // Get OG image URL - use image URL builder for proper CDN URL
    let ogImageUrl: string | undefined
    if (siteSettings.seo?.ogImage) {
      try {
        // Use the image URL builder to get the proper CDN URL
        ogImageUrl = getImageUrl(siteSettings.seo.ogImage, 1200, 630)
        // Ensure it's an absolute URL
        if (ogImageUrl && !ogImageUrl.startsWith('http')) {
          // If it's a relative path, prepend the Sanity CDN base URL
          const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
          const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
          if (projectId) {
            ogImageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}${ogImageUrl}`
          }
        }
      } catch (error) {
        console.error('Error building OG image URL:', error)
      }
    }

    return {
      title,
      description,
      ogImage: ogImageUrl,
    }
  } catch (error) {
    console.error('Error fetching metadata:', error)
    return {
      title: 'David Ojo - Full-Stack System Architect',
      description: 'Designing systems that connect people, data, and purpose',
      ogImage: undefined,
    }
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getMetadata()
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: ['Full Stack Developer', 'System Architect', 'Product Designer', 'Next.js', 'React', 'TypeScript'],
    authors: [{ name: 'David Ojo' }],
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'website',
      images: metadata.ogImage ? [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: metadata.ogImage ? [metadata.ogImage] : [],
    },
  }
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






