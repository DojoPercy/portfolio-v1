"use client"

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { getImageUrl } from '@/lib/sanity/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

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
}

interface ProjectsCarouselProps {
  projects: Project[]
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
    dragFree: true,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!emblaApi || isHovered) return

    // Auto-play carousel (pause on hover)
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [emblaApi, isHovered])

  if (projects.length === 0) {
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
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={scrollPrev}
              className="rounded-full p-2"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={scrollNext}
              className="rounded-full p-2"
              aria-label="Next project"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Link 
            href="/projects" 
            className="text-sm text-neon-cyan hover:underline flex items-center gap-2"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div 
        className="overflow-hidden" 
        ref={emblaRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-6">
          {projects.map((project, index) => {
            const slug = typeof project.slug === 'string' ? project.slug : project.slug?.current || ''
            
            return (
              <div
                key={project._id || index}
                className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] min-w-0"
              >
              <Link href={`/project/${slug}`} data-sound="hover">
                <Card tilt elevation={2} className="h-full group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                    {project.coverImage ? (
                      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-dark-surface">
                        <Image
                          src={getImageUrl(project.coverImage, 800, 600)}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
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
                      <p className="text-xs text-gray-500 mb-2">{project.role}</p>
                    )}
                    <div className="flex items-center text-sm text-gray-400 group-hover:text-neon-cyan transition-colors mt-auto">
                      View Case Study
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* Dots indicator - only show if more than 1 project */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="w-2 h-2 rounded-full bg-gray-700 hover:bg-neon-cyan transition-colors"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

