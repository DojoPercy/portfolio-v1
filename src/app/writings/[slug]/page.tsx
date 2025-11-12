import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/lib/sanity'
import { getWritingBySlug } from '@/lib/sanity/queries'
import { PortableText } from '@/lib/sanity/portableText'
import { getImageUrl } from '@/lib/sanity/image'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'

interface WritingPageProps {
  params: Promise<{ slug: string }>
}

async function getWriting(slug: string) {
  try {
    const writing = await client.fetch(getWritingBySlug, { slug })
    return writing
  } catch (error) {
    console.error('Error fetching writing:', error)
    return null
  }
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { slug } = await params
  const writing = await getWriting(slug)

  if (!writing) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/writings"
            className="inline-flex items-center text-sm text-gray-400 hover:text-neon-cyan transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Writings
          </Link>

          {writing.coverImage && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={getImageUrl(writing.coverImage, 1200, 800)}
                alt={writing.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 neon-glow-low">
              {writing.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {writing.readingTime || 5} min read
              </span>
              <span>{formatDate(writing.publishedAt)}</span>
            </div>
            {writing.tags && writing.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {writing.tags.map((tag: string) => (
                  <Badge key={tag} variant="neon">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {writing.excerpt && (
            <Card className="mb-8 border-neon-cyan/30">
              <p className="text-lg text-gray-300 italic">{writing.excerpt}</p>
            </Card>
          )}

          {writing.body && writing.body.length > 0 && (
            <Card className="prose prose-invert max-w-none">
              <PortableText value={writing.body} />
            </Card>
          )}
        </div>
      </article>
      <Footer />
    </main>
  )
}










