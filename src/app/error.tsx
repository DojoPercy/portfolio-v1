'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-red-400">
            Something went wrong!
          </h1>
          <p className="text-gray-400 mb-8">
            An unexpected error occurred. Please try again.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={reset} size="lg">
              Try again
            </Button>
            <Button variant="secondary" size="lg" asChild href="/">
              Go Home
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

