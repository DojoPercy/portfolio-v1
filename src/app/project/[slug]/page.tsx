import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/lib/sanity'
import { getProjectBySlug } from '@/lib/sanity/queries'
import { PortableText } from '@/lib/sanity/portableText'
import { getImageUrl } from '@/lib/sanity/image'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { notFound } from 'next/navigation'
import { ProcessVisualizer } from '@/components/sections/ProcessVisualizer'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string) {
  try {
    const project = await client.fetch(getProjectBySlug, { slug })
    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm text-gray-400 hover:text-neon-cyan transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>

          {project.coverImage && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={getImageUrl(project.coverImage, 1200, 800)}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 neon-glow-low">
                  {project.title}
                </h1>
                {project.role && (
                  <p className="text-lg text-gray-400 mb-4">Role: {project.role}</p>
                )}
              </div>
              
              {/* Project Links */}
              {(project.githubUrl || project.liveUrl) && (
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <Button
                      asChild
                      variant="secondary"
                      size="sm"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      asChild
                      variant="neon"
                      size="sm"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech: string) => (
                  <Badge key={tech} variant="neon">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {project.description && (
            <Card className="mb-8">
              <p className="text-lg text-gray-300 leading-relaxed">{project.description}</p>
            </Card>
          )}

          {project.problemStatement && (
            <Card className="mb-8">
              <h2 className="text-2xl font-display font-semibold mb-4">Problem Statement</h2>
              <p className="text-gray-300">{project.problemStatement}</p>
            </Card>
          )}

          {project.process && project.process.length > 0 && (
            <div className="mb-8">
              <ProcessVisualizer process={project.process} />
            </div>
          )}

          {project.researchInsights && project.researchInsights.length > 0 && (
            <Card className="mb-8">
              <h2 className="text-2xl font-display font-semibold mb-4">Research & Insights</h2>
              <PortableText value={project.researchInsights} />
            </Card>
          )}

          {project.metrics && (
            <Card className="mb-8">
              <h2 className="text-2xl font-display font-semibold mb-4">Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.metrics.before && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Before</p>
                    <p className="text-xl font-semibold">{project.metrics.before}</p>
                  </div>
                )}
                {project.metrics.after && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">After</p>
                    <p className="text-xl font-semibold text-neon-cyan">{project.metrics.after}</p>
                  </div>
                )}
                {project.metrics.improvement && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Improvement</p>
                    <p className="text-xl font-semibold text-green-400">{project.metrics.improvement}</p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {project.outcome && (
            <Card>
              <h2 className="text-2xl font-display font-semibold mb-4">Outcome</h2>
              <p className="text-gray-300">{project.outcome}</p>
            </Card>
          )}

          {project.impact && (
            <Card className="mt-8 border-neon-cyan/50">
              <p className="text-neon-cyan font-semibold">Impact: {project.impact}</p>
            </Card>
          )}
        </div>
      </article>
      <Footer />
    </main>
  )
}







