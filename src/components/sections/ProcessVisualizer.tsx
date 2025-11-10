"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Search, Code, Rocket, CheckCircle } from 'lucide-react'

const processSteps = [
  { icon: Search, label: 'Research', color: 'text-blue-400' },
  { icon: Code, label: 'Design', color: 'text-purple-400' },
  { icon: Code, label: 'Development', color: 'text-green-400' },
  { icon: Rocket, label: 'Deployment', color: 'text-neon-cyan' },
]

interface ProcessVisualizerProps {
  process: any[]
}

export function ProcessVisualizer({ process }: ProcessVisualizerProps) {
  return (
    <Card className="mb-8">
      <h2 className="text-2xl font-display font-semibold mb-6">Process</h2>
      <div className="relative">
        {/* Process Timeline */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.label}
                className="flex flex-col items-center mb-4 md:mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className={`w-12 h-12 rounded-full bg-dark-card flex items-center justify-center mb-2 ${step.color} border-2 border-neon-cyan/30`}>
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold">{step.label}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/4 w-1/2 h-0.5 bg-neon-cyan/20 -z-10" style={{ marginLeft: `${(index + 1) * 25}%`, width: '25%' }} />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Process Description */}
        <div className="prose prose-invert max-w-none">
          {/* Render process content if available */}
        </div>
      </div>
    </Card>
  )
}


