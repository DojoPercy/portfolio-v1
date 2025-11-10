"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Calendar, MapPin, Briefcase } from 'lucide-react'
import { ScrollAnimation } from '@/components/effects/ScrollAnimations'

interface Experience {
  _id: string
  company: string
  position: string
  location?: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  description?: string
  achievements?: string[]
  technologies?: string[]
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (experiences.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-display font-bold mb-12 neon-glow-low">Experience</h2>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ScrollAnimation key={exp._id} direction="up" delay={index * 0.1}>
              <Card elevation={2} className="relative pl-8 border-l-2 border-neon-cyan/30">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-neon-cyan -translate-x-[9px] -translate-y-1" />
                
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-1">{exp.position}</h3>
                    <p className="text-neon-cyan mb-2">{exp.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : 'Present')}
                        </span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {exp.isCurrent && (
                    <Badge variant="neon" className="mt-2 md:mt-0">
                      Current
                    </Badge>
                  )}
                </div>

                {exp.description && (
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                )}

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-400">
                        <span className="text-neon-cyan mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}


