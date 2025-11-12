"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react'
import { ScrollAnimation } from '@/components/effects/ScrollAnimations'

interface Education {
  _id: string
  degree: string
  institution: string
  location?: string
  startDate?: string
  endDate: string
  grade?: string
  description?: string
  courses?: string[]
}

interface EducationSectionProps {
  education: Education[]
}

export function EducationSection({ education }: EducationSectionProps) {
  if (education.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  return (
    <section id="education" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-display font-bold mb-12 neon-glow-low text-center">Education</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <ScrollAnimation key={edu._id} direction="up" delay={index * 0.1}>
              <Card elevation={2} className="h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-neon-cyan/10 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-neon-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-semibold mb-1">{edu.degree}</h3>
                    <p className="text-neon-cyan mb-2">{edu.institution}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      {edu.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{edu.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {edu.startDate ? formatDate(edu.startDate) : ''} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {edu.grade && (
                  <div className="flex items-center gap-2 mb-4 p-3 bg-dark-surface rounded-lg">
                    <Award className="h-5 w-5 text-neon-cyan" />
                    <span className="text-sm font-medium">{edu.grade}</span>
                  </div>
                )}

                {edu.description && (
                  <p className="text-gray-400 text-sm mb-4">{edu.description}</p>
                )}

                {edu.courses && edu.courses.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-300">Relevant Courses:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-dark-surface rounded border border-gray-700 text-gray-400"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
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


