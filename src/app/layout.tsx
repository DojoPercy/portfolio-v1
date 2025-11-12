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
        title: 'David Ojo - Full-Stack Software Developer',
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
        // Use the image URL builder to get the proper CDN URL (returns full URL)
        ogImageUrl = getImageUrl(siteSettings.seo.ogImage, 1200, 630)
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://davidojo.dev'
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: metadata.title,
      template: '%s | David Ojo',
    },
    description: metadata.description,
    keywords: [
      'David Ojo',
      'David Ojo Portfolio',
      'David Ojo Developer',
      'David Ojo Software Engineer',
      'Full Stack Developer',
      'System Architect',
      'Product Designer',
      'Software Engineer',
      'Web Developer',
      'Next.js Developer',
      'React Developer',
      'TypeScript Developer',
      'Full Stack Engineer',
      'Portfolio',
      'Developer Portfolio',
      'Software Development',
      'Web Development',
      'System Design',
      'Product Design',
    ],
    authors: [{ name: 'David Ojo' }],
    creator: 'David Ojo',
    publisher: 'David Ojo',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: baseUrl,
      siteName: 'David Ojo - Portfolio',
      title: metadata.title,
      description: metadata.description,
      images: metadata.ogImage ? [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
          alt: 'David Ojo - Full-Stack Software Developer',
        }
      ] : [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'David Ojo - Full-Stack Software Developer',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      creator: '@davidojo',
      images: metadata.ogImage ? [metadata.ogImage] : [`${baseUrl}/og-image.jpg`],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/manifest.json',
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://davidojo.dev'
  
  // Get site settings for structured data
  const siteSettings = await client.fetch(getSiteSettings).catch(() => null)
  
  // Structured data for Person schema
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'David Ojo',
    alternateName: 'David Ojo Developer',
    jobTitle: 'Full-Stack Software Developer',
    description: siteSettings?.tagline || siteSettings?.missionStatement || 'Designing systems that connect people, data, and purpose',
    url: baseUrl,
    image: siteSettings?.logo ? getImageUrl(siteSettings.logo, 400, 400) : `${baseUrl}/logo.png`,
    sameAs: siteSettings?.socialLinks ? [
      siteSettings.socialLinks.linkedin,
      siteSettings.socialLinks.github,
      siteSettings.socialLinks.twitter,
      siteSettings.socialLinks.website,
    ].filter(Boolean) : [],
    knowsAbout: [
      'Full Stack Development',
      'System Architecture',
      'Product Design',
      'Web Development',
      'Software Engineering',
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: siteSettings?.socialLinks?.website || 'Software Development',
    },
  }
  
  // Website structured data
  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'David Ojo - Portfolio',
    url: baseUrl,
    description: siteSettings?.tagline || 'Full-Stack Software Developer Portfolio',
    author: {
      '@type': 'Person',
      name: 'David Ojo',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
  
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}






