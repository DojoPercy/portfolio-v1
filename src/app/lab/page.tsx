import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/lib/sanity'
import { getAllResearch } from '@/lib/sanity/queries'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Suspense } from 'react'
import { ResearchGrid } from '@/components/sections/ResearchGrid'

async function getResearch() {
  try {
    const research = await client.fetch(getAllResearch)
    return research
  } catch (error) {
    console.error('Error fetching research:', error)
    return []
  }
}

export default async function LabPage() {
  const research = await getResearch()

  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 neon-glow-low">
              Research Lab
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              UX/UI research experiments, wireframes, and design explorations.
            </p>
          </div>

          <Suspense fallback={<div className="h-64 bg-dark-surface rounded-lg animate-pulse" />}>
            <ResearchGrid research={research} />
          </Suspense>
        </div>
      </section>
      <Footer />
    </main>
  )
}










