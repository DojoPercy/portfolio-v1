"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Github, Star, GitBranch, Code } from 'lucide-react'

interface GitHubStats {
  totalStars: number
  totalRepos: number
  totalCommits: number
  topLanguages: Array<{ name: string; percentage: number }>
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/github/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-32 bg-dark-card rounded" />
      </Card>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card glass elevation={2}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-semibold flex items-center gap-2">
            <Github className="h-5 w-5 text-neon-cyan" />
            GitHub Activity
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold">{stats.totalStars}</p>
            <p className="text-sm text-gray-400">Stars</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Code className="h-5 w-5 text-neon-cyan" />
            </div>
            <p className="text-2xl font-bold">{stats.totalRepos}</p>
            <p className="text-sm text-gray-400">Repositories</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <GitBranch className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold">{stats.totalCommits}</p>
            <p className="text-sm text-gray-400">Commits</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold">{stats.topLanguages.length}</p>
            <p className="text-sm text-gray-400">Languages</p>
          </div>
        </div>

        {stats.topLanguages.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-3">Top Languages</h4>
            <div className="space-y-2">
              {stats.topLanguages.slice(0, 5).map((lang) => (
                <div key={lang.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{lang.name}</span>
                  <div className="flex-1 mx-4 h-2 bg-dark-card rounded-full overflow-hidden">
                    <div
                      className="h-full bg-neon-cyan rounded-full transition-all duration-500"
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-12 text-right">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  )
}







