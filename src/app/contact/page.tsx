import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ContactForm } from '@/components/sections/ContactForm'

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 neon-glow-low">
              Let's Collaborate
            </h1>
            <p className="text-lg text-gray-400">
              Have a project in mind? Let's build something amazing together.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}







