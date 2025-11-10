import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { client } from '@/lib/sanity'
import { getAllProjects } from '@/lib/sanity/queries'
import { Suspense } from 'react'

async function getProjects() {
  try {
    const projects = await client.fetch(getAllProjects)
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 neon-glow-low">
              Projects
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              A collection of systems, applications, and platforms I've designed and built.
            </p>
          </div>

          <Suspense fallback={<div className="h-64 bg-dark-surface rounded-lg animate-pulse" />}>
            <ProjectsGrid projects={projects} />
          </Suspense>
        </div>
      </section>
      <Footer />
    </main>
  )
}







