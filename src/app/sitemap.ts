import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { getAllProjects, getAllWritings } from '@/lib/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  try {
    const [projects, writings] = await Promise.all([
      client.fetch(getAllProjects).catch(() => []),
      client.fetch(getAllWritings).catch(() => []),
    ])

    const routes = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/projects`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/lab`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/writings`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
    ]

    const projectRoutes = projects.map((project: any) => ({
      url: `${baseUrl}/project/${project.slug.current}`,
      lastModified: project.date ? new Date(project.date) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    const writingRoutes = writings.map((writing: any) => ({
      url: `${baseUrl}/writings/${writing.slug.current}`,
      lastModified: writing.publishedAt ? new Date(writing.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [...routes, ...projectRoutes, ...writingRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
    ]
  }
}







