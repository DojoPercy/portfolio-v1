"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { getImageUrl } from '@/lib/sanity/image'
import { ArrowRight, Github, ExternalLink } from 'lucide-react'

interface Project {
  _id: string
  title: string
  slug: { current: string } | string
  summary?: string
  description?: string
  techStack?: string[]
  role?: string
  impact?: string
  coverImage?: any
  featured?: boolean
  githubUrl?: string
  liveUrl?: string
}

interface ProjectsGridProps {
  projects: Project[]
  limit?: number
}

export function ProjectsGrid({ projects, limit }: ProjectsGridProps) {
  const displayProjects = limit ? projects.slice(0, limit) : projects

  // Debug logging
  if (typeof window !== 'undefined') {
    console.log('ProjectsGrid received projects:', displayProjects.length)
  }

  if (displayProjects.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-display font-bold mb-8 neon-glow-low">Featured Projects</h2>
        <Card>
          <p className="text-gray-400 text-center py-8">No projects found.</p>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-display font-bold neon-glow-low">Featured Projects</h2>
        {!limit && (
          <Link 
            href="/projects" 
            className="text-sm text-neon-cyan hover:underline flex items-center gap-2"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayProjects.map((project, index) => {
          const slug = typeof project.slug === 'string' ? project.slug : project.slug?.current || ''
          
          return (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/project/${slug}`}>
                <Card tilt elevation={2} className="h-full group cursor-pointer">
                  {project.coverImage ? (
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-dark-surface">
                      <Image
                        src={getImageUrl(project.coverImage, 800, 600)}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-dark-surface to-dark-card flex items-center justify-center border border-gray-700">
                      <div className="text-center">
                        <div className="text-4xl text-gray-600 mb-2">📁</div>
                        <p className="text-xs text-gray-500">No image</p>
                      </div>
                    </div>
                  )}
                  <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-neon-cyan transition-colors">
                    {project.title}
                  </h3>
                  {project.summary && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.summary}</p>
                  )}
                  {!project.summary && project.description && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  )}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="neon">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge variant="outline">+{project.techStack.length - 3}</Badge>
                      )}
                    </div>
                  )}
                  {project.impact && (
                    <p className="text-xs text-neon-cyan mb-4 line-clamp-2">{project.impact}</p>
                  )}
                  {project.role && (
                    <p className="text-xs text-gray-500 mb-4">{project.role}</p>
                  )}
                  
                  {/* Links */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50">
                    <Link 
                      href={`/project/${slug}`}
                      className="flex items-center text-sm text-gray-400 group-hover:text-neon-cyan transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Case Study
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-neon-cyan transition-colors"
                          aria-label="View on GitHub"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-neon-cyan transition-colors"
                          aria-label="View live project"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}




