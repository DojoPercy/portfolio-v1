"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { User, Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { ScrollAnimation } from '@/components/effects/ScrollAnimations'

interface SiteSettings {
  siteTitle?: string
  tagline?: string
  missionStatement?: string
  socialLinks?: {
    email?: string
    linkedin?: string
    github?: string
    website?: string
  }
}

interface AboutSectionProps {
  siteSettings?: SiteSettings | null
}

export function AboutSection({ siteSettings }: AboutSectionProps) {
  const professionalSummary = `Full-Stack Software Developer with expertise in Next.js, NestJS and Flutter. Skilled in designing scalable web and mobile applications, API development, authentication systems, and AI integration.`

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-display font-bold mb-12 neon-glow-low text-center">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ScrollAnimation direction="right" className="lg:col-span-2">
            <Card elevation={2} className="h-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 bg-neon-cyan/10 rounded-lg">
                  <User className="h-8 w-8 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">
                    {siteSettings?.siteTitle || 'David Ojo'}
                  </h3>
                  <p className="text-neon-cyan text-lg mb-4">
                    {siteSettings?.tagline || 'Full-Stack Software Developer'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Professional Summary</h4>
                  <p className="text-gray-300 leading-relaxed">{professionalSummary}</p>
                </div>

                {siteSettings?.missionStatement && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Mission</h4>
                    <p className="text-gray-300 leading-relaxed">{siteSettings.missionStatement}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4 text-neon-cyan" />
                    <span>Greater Accra, Ghana</span>
                  </div>
                  {siteSettings?.socialLinks?.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Mail className="h-4 w-4 text-neon-cyan" />
                      <Link href={`mailto:${siteSettings.socialLinks.email}`} className="hover:text-neon-cyan transition-colors">
                        {siteSettings.socialLinks.email}
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Phone className="h-4 w-4 text-neon-cyan" />
                    <span>+233542637902</span>
                  </div>
                  {siteSettings?.socialLinks?.website && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Globe className="h-4 w-4 text-neon-cyan" />
                      <Link href={siteSettings.socialLinks.website} target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors">
                        www.davidojo.site
                      </Link>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {siteSettings?.socialLinks?.github && (
                    <Link
                      href={siteSettings.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-dark-surface rounded-lg hover:bg-neon-cyan/10 transition-colors border border-gray-700"
                    >
                      <Github className="h-4 w-4" />
                      <span className="text-sm">GitHub</span>
                    </Link>
                  )}
                  {siteSettings?.socialLinks?.linkedin && (
                    <Link
                      href={siteSettings.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-dark-surface rounded-lg hover:bg-neon-cyan/10 transition-colors border border-gray-700"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="text-sm">LinkedIn</span>
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation direction="left">
            <Card elevation={2} className="h-full">
              <h4 className="text-lg font-semibold mb-4">Key Achievements</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-neon-cyan mt-1">•</span>
                  <span>Built a cloud-based SaaS POS platform</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-neon-cyan mt-1">•</span>
                  <span>Developed B2B event & ticket management platform</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-neon-cyan mt-1">•</span>
                  <span>Created AI Agent API with LangGraph</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-neon-cyan mt-1">•</span>
                  <span>Reduced editorial review time by 30%</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-neon-cyan mt-1">•</span>
                  <span>Led 4-member team for estate management system</span>
                </li>
              </ul>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}


