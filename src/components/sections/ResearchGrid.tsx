"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { FlaskConical } from 'lucide-react'

interface Research {
  _id: string
  title: string
  hypothesis?: string
  outcome?: string
  tools?: string[]
}

interface ResearchGridProps {
  research: Research[]
}

export function ResearchGrid({ research }: ResearchGridProps) {
  if (research.length === 0) {
    return (
      <Card>
        <p className="text-gray-400 text-center py-8">No research items found.</p>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {research.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card tilt elevation={2} className="h-full">
            <div className="flex items-start gap-3 mb-4">
              <FlaskConical className="h-5 w-5 text-neon-cyan flex-shrink-0 mt-1" />
              <h3 className="text-xl font-display font-semibold">{item.title}</h3>
            </div>
            {item.hypothesis && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-400 mb-1">Hypothesis</p>
                <p className="text-sm text-gray-300">{item.hypothesis}</p>
              </div>
            )}
            {item.outcome && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-400 mb-1">Outcome</p>
                <p className="text-sm text-gray-300">{item.outcome}</p>
              </div>
            )}
            {item.tools && item.tools.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tools.map((tool) => (
                  <Badge key={tool} variant="outline">
                    {tool}
                  </Badge>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  )
}










