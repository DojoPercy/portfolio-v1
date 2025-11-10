"use client"

import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter, Globe } from 'lucide-react'

interface SocialLinks {
  linkedin?: string
  github?: string
  twitter?: string
  email?: string
  website?: string
}

interface SiteSettings {
  siteTitle?: string
  tagline?: string
  missionStatement?: string
  socialLinks?: SocialLinks
}

interface FooterProps {
  siteSettings?: SiteSettings | null
}

export function Footer({ siteSettings }: FooterProps) {
  // Build social links array from site settings with fallbacks
  type SocialLinkItem = {
    href: string
    icon: React.ComponentType<{ className?: string }>
    label: string
  }
  
  const socialLinks: SocialLinkItem[] = []
  
  if (siteSettings?.socialLinks?.github) {
    socialLinks.push({ href: siteSettings.socialLinks.github, icon: Github, label: 'GitHub' })
  } else {
    socialLinks.push({ href: 'https://github.com/dojopercy', icon: Github, label: 'GitHub' })
  }
  
  if (siteSettings?.socialLinks?.linkedin) {
    socialLinks.push({ href: siteSettings.socialLinks.linkedin, icon: Linkedin, label: 'LinkedIn' })
  } else {
    socialLinks.push({ href: 'https://www.linkedin.com/in/david-ojo-947639221/', icon: Linkedin, label: 'LinkedIn' })
  }
  
  if (siteSettings?.socialLinks?.twitter) {
    socialLinks.push({ href: siteSettings.socialLinks.twitter, icon: Twitter, label: 'Twitter' })
  }
  
  if (siteSettings?.socialLinks?.email) {
    socialLinks.push({ href: `mailto:${siteSettings.socialLinks.email}`, icon: Mail, label: 'Email' })
  } else {
    socialLinks.push({ href: 'mailto:ojodavid115@gmail.com', icon: Mail, label: 'Email' })
  }
  
  if (siteSettings?.socialLinks?.website) {
    socialLinks.push({ href: siteSettings.socialLinks.website, icon: Globe, label: 'Website' })
  } else {
    socialLinks.push({ href: 'https://davidojo.site', icon: Globe, label: 'Website' })
  }
  return (
    <footer className="border-t border-gray-800 bg-dark-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-display font-bold mb-4 neon-glow-low">
              {siteSettings?.siteTitle || 'David Ojo'}
            </h3>
            <p className="text-sm text-gray-400">
              {siteSettings?.tagline || 'Full-Stack Software Developer with expertise in Next.js, NestJS and Flutter'}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/projects" className="hover:text-neon-cyan transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/lab" className="hover:text-neon-cyan transition-colors">
                  Research Lab
                </Link>
              </li>
              <li>
                <Link href="/writings" className="hover:text-neon-cyan transition-colors">
                  Writings
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-neon-cyan transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-gray-400 hover:text-neon-cyan transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {siteSettings?.siteTitle || 'David Ojo'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}



