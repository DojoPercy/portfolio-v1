import { NextResponse } from 'next/server'

const GITHUB_USER = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'dojopercy'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

export const dynamic = 'force-dynamic'
export const revalidate = 1800 // 30 minutes

export async function GET() {
  try {
    const headers: HeadersInit = {
      'User-Agent': 'david-portfolio',
    }

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`
    }

    // Fetch user repos
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { 
        headers,
        next: { revalidate: 1800 }
      }
    )

    if (!reposResponse.ok) {
      throw new Error('Failed to fetch GitHub repos')
    }

    const repos = await reposResponse.json()

    // Calculate stats
    const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)
    const totalRepos = repos.length

    // Get language stats
    const languageMap = new Map<string, number>()
    
    for (const repo of repos) {
      if (repo.language) {
        languageMap.set(repo.language, (languageMap.get(repo.language) || 0) + 1)
      }
    }

    const totalReposWithLanguages = Array.from(languageMap.values()).reduce((a, b) => a + b, 0)
    const topLanguages = Array.from(languageMap.entries())
      .map(([name, count]) => ({
        name,
        percentage: totalReposWithLanguages > 0 ? Math.round((count / totalReposWithLanguages) * 100) : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 10)

    // Estimate commits (GitHub API requires authentication for detailed commit stats)
    // Using a simplified approach
    const totalCommits = Math.floor(totalRepos * 50) // Rough estimate

    const stats = {
      totalStars,
      totalRepos,
      totalCommits,
      topLanguages,
    }

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    })
  } catch (error) {
    console.error('GitHub API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    )
  }
}
