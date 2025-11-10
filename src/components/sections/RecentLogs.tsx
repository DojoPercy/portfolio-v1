"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { formatDate } from '@/lib/utils'
import { Clock } from 'lucide-react'

interface Log {
  _id: string
  title: string
  summary?: string
  date: string
}

interface RecentLogsProps {
  logs: Log[]
}

export function RecentLogs({ logs }: RecentLogsProps) {
  if (logs.length === 0) {
    return (
      <Card>
        <p className="text-gray-400 text-sm">No recent updates.</p>
      </Card>
    )
  }

  return (
    <Card glass elevation={2}>
      <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-neon-cyan" />
        Recent Updates
      </h3>
      <div className="space-y-4">
        {logs.map((log, index) => (
          <motion.div
            key={log._id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border-l-2 border-neon-cyan/30 pl-4"
          >
            <p className="text-sm font-semibold text-white mb-1">{log.title}</p>
            {log.summary && (
              <p className="text-xs text-gray-400 mb-2">{log.summary}</p>
            )}
            <p className="text-xs text-gray-500">{formatDate(log.date)}</p>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}







