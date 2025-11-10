import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/lib/sanity'
import { getAllWritings } from '@/lib/sanity/queries'
import { Suspense } from 'react'
import { WritingsGrid } from '@/components/sections/WritingsGrid'

async function getWritings() {
  try {
    const writings = await client.fetch(getAllWritings)
    return writings
  } catch (error) {
    console.error('Error fetching writings:', error)
    return []
  }
}

export default async function WritingsPage() {
  const writings = await getWritings()

  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 neon-glow-low">
              Writings
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              Technical articles, design insights, and thoughts on building systems.
            </p>
          </div>

          <Suspense fallback={<div className="h-64 bg-dark-surface rounded-lg animate-pulse" />}>
            <WritingsGrid writings={writings} />
          </Suspense>
        </div>
      </section>
      <Footer />
    </main>
  )
}







