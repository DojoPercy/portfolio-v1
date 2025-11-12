"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Clock, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Writing {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  readingTime?: number
  tags?: string[]
  publishedAt: string
  coverImage?: any
}

interface WritingsGridProps {
  writings: Writing[]
}

export function WritingsGrid({ writings }: WritingsGridProps) {
  if (writings.length === 0) {
    return (
      <Card>
        <p className="text-gray-400 text-center py-8">No writings found.</p>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {writings.map((writing, index) => (
        <motion.div
          key={writing._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/writings/${writing.slug.current}`}>
            <Card tilt elevation={2} className="h-full group cursor-pointer">
              <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-neon-cyan transition-colors">
                {writing.title}
              </h3>
              {writing.excerpt && (
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{writing.excerpt}</p>
              )}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {writing.readingTime || 5} min read
                </span>
                <span>{formatDate(writing.publishedAt)}</span>
              </div>
              {writing.tags && writing.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {writing.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex items-center text-sm text-gray-400 group-hover:text-neon-cyan transition-colors">
                Read more
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}










