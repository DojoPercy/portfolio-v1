"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Award, Calendar, ExternalLink, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity/image'
import Link from 'next/link'
import { ScrollAnimation } from '@/components/effects/ScrollAnimations'

interface Certification {
  _id: string
  name: string
  issuer: string
  issueDate?: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  description?: string
  logo?: any
}

interface CertificationsSectionProps {
  certifications: Certification[]
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  if (certifications.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
  }

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
    return expiry < threeMonthsFromNow && expiry > new Date()
  }

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface/50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-display font-bold mb-12 neon-glow-low text-center">Certifications & Training</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const expired = isExpired(cert.expiryDate)
            const expiringSoon = isExpiringSoon(cert.expiryDate)

            return (
              <ScrollAnimation key={cert._id} direction="up" delay={index * 0.1}>
                <Card elevation={2} className="h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    {cert.logo ? (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-dark-surface flex-shrink-0">
                        <Image
                          src={getImageUrl(cert.logo, 100, 100)}
                          alt={cert.issuer}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="p-3 bg-neon-cyan/10 rounded-lg flex-shrink-0">
                        <Award className="h-6 w-6 text-neon-cyan" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-display font-semibold mb-1 line-clamp-2">{cert.name}</h3>
                      <p className="text-sm text-neon-cyan mb-2">{cert.issuer}</p>
                      {cert.issueDate && (
                        <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                          <Calendar className="h-3 w-3" />
                          <span>Issued {formatDate(cert.issueDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {cert.description && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{cert.description}</p>
                  )}

                  <div className="mt-auto pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {cert.expiryDate ? (
                          expired ? (
                            <Badge variant="outline" className="text-xs text-red-400 border-red-400">
                              Expired
                            </Badge>
                          ) : expiringSoon ? (
                            <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                              Expiring Soon
                            </Badge>
                          ) : (
                            <Badge variant="neon" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Valid
                            </Badge>
                          )
                        ) : (
                          <Badge variant="neon" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            No Expiry
                          </Badge>
                        )}
                      </div>
                      {cert.credentialUrl && (
                        <Link
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-neon-cyan hover:underline flex items-center gap-1"
                        >
                          Verify
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                    {cert.credentialId && (
                      <p className="text-xs text-gray-500 mt-2">ID: {cert.credentialId}</p>
                    )}
                  </div>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}


