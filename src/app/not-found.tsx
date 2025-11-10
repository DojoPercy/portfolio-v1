import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-4 neon-glow">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild size="lg" href="/">
            Go Home
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  )
}

