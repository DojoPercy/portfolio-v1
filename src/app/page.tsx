import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { GitHubStats } from '@/components/sections/GitHubStats'
import { Suspense } from 'react'
import { client } from '@/lib/sanity'
import { 
  getFeaturedProjects, 
  getAllProjects, 
  getRecentLogs, 
  getSiteSettings,
  getAllExperience,
  getAllSkills,
  getAllEducation,
  getAllCertifications
} from '@/lib/sanity/queries'
import { ProjectsCarousel } from '@/components/sections/ProjectsCarousel'
import { RecentLogs } from '@/components/sections/RecentLogs'
import { AboutSection } from '@/components/sections/AboutSection'
import { HireMeSection } from '@/components/sections/HireMeSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { CertificationsSection } from '@/components/sections/CertificationsSection'
import { ContactForm } from '@/components/sections/ContactForm'

async function getData() {
  try {
    const [
      featuredProjects, 
      allProjects, 
      logs, 
      siteSettings,
      experiences,
      skills,
      education,
      certifications
    ] = await Promise.all([
      client.fetch(getFeaturedProjects).catch(() => []),
      client.fetch(getAllProjects).catch(() => []),
      client.fetch(getRecentLogs).catch(() => []),
      client.fetch(getSiteSettings).catch(() => null),
      client.fetch(getAllExperience).catch(() => []),
      client.fetch(getAllSkills).catch(() => []),
      client.fetch(getAllEducation).catch(() => []),
      client.fetch(getAllCertifications).catch(() => []),
    ])
    
    // Use featured projects if available, otherwise use all projects (limited to 6)
    const projects = featuredProjects && featuredProjects.length > 0 
      ? featuredProjects 
      : (allProjects || []).slice(0, 6)
    
    return { 
      projects: projects || [], 
      logs: logs || [], 
      siteSettings,
      experiences: experiences || [],
      skills: skills || [],
      education: education || [],
      certifications: certifications || [],
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { 
      projects: [], 
      logs: [], 
      siteSettings: null,
      experiences: [],
      skills: [],
      education: [],
      certifications: [],
    }
  }
}

export default async function HomePage() {
  const { 
    projects, 
    logs, 
    siteSettings,
    experiences,
    skills,
    education,
    certifications
  } = await getData()

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection siteSettings={siteSettings} />
      
      <AboutSection siteSettings={siteSettings} />
      
      <HireMeSection />
      
      <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <ProjectsCarousel projects={projects} />
            </div>
            <div className="space-y-8">
              <Suspense fallback={<div className="h-64 bg-dark-surface rounded-lg animate-pulse" />}>
                <GitHubStats />
              </Suspense>
              <Suspense fallback={<div className="h-48 bg-dark-surface rounded-lg animate-pulse" />}>
                <RecentLogs logs={logs} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <ExperienceSection experiences={experiences} />
      
      <SkillsSection skills={skills} />
      
      <EducationSection education={education} />
      
      <CertificationsSection certifications={certifications} />

      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-display font-bold mb-12 neon-glow-low text-center">Get In Touch</h2>
          <ContactForm />
        </div>
      </section>

      <Footer siteSettings={siteSettings} />
    </main>
  )
}



