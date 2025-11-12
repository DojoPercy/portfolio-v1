"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ScrollAnimation } from '@/components/effects/ScrollAnimations'

interface Skill {
  _id: string
  name: string
  category: string
  proficiency: number
  icon?: string
}

interface SkillsSectionProps {
  skills: Skill[]
}

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  devops: 'DevOps',
  database: 'Database',
  'auth-payment': 'Auth & Payment',
  'cms-ai': 'CMS & AI Tools',
  mobile: 'Mobile',
  other: 'Other',
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  if (skills.length === 0) {
    return null
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const categories = Object.keys(skillsByCategory).sort()

  return (
    <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 bg-dark-surface/50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-display font-bold mb-12 neon-glow-low text-center">Technical Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, categoryIndex) => (
            <ScrollAnimation key={category} direction="up" delay={categoryIndex * 0.1}>
              <Card elevation={2} className="h-full">
                <h3 className="text-lg font-display font-semibold mb-4 text-neon-cyan">
                  {categoryLabels[category] || category}
                </h3>
                <div className="space-y-4">
                  {skillsByCategory[category].map((skill, skillIndex) => (
                    <div key={skill._id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-gray-400">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-dark-card rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        {/* Skills Tags */}
        <ScrollAnimation direction="up" delay={0.3} className="mt-12">
          <Card elevation={2} className="p-6">
            <h3 className="text-lg font-display font-semibold mb-4 text-center">All Technologies</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.map((skill) => (
                <Badge key={skill._id} variant="neon" className="text-sm">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  )
}


