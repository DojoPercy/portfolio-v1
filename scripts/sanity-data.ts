/**
 * Sanity CMS Data Import Script
 * 
 * This file contains all the data to populate Sanity CMS for David Ojo's portfolio.
 * Run this script using: pnpm tsx scripts/sanity-data.ts
 * 
 * Prerequisites:
 * - Set SANITY_API_TOKEN in your .env.local file
 * - Ensure Sanity project is configured
 */

// Load environment variables FIRST before any other imports
import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from 'next-sanity'

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

// Also try loading .env if .env.local doesn't exist
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  config({ path: resolve(process.cwd(), '.env') })
}

// Validate required environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  SANITY_API_TOKEN: process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN,
}

const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value && key !== 'NEXT_PUBLIC_SANITY_DATASET')
  .map(([key]) => key)

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:')
  missingVars.forEach((varName) => {
    console.error(`   - ${varName}`)
  })
  console.error('')
  console.error('Please create a .env.local file with the following variables:')
  console.error('   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id')
  console.error('   NEXT_PUBLIC_SANITY_DATASET=production')
  console.error('   SANITY_API_TOKEN=your-write-token')
  console.error('')
  console.error('You can copy env.example to .env.local and fill in the values.')
  process.exit(1)
}

// Create write client directly here instead of importing to avoid import-time execution
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-18',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN,
})

// Site Settings Data
export const siteSettingsData = {
  _type: 'siteSettings',
  siteTitle: 'David Ojo',
  tagline: 'Full-Stack Software Developer with expertise in Next.js, NestJS and Flutter',
  missionStatement: 'Full-Stack Software Developer with expertise in Next.js, NestJS and Flutter. Skilled in designing scalable web and mobile applications, API development, authentication systems, and AI integration. Experienced in managing deployments, optimizing performance, and collaborating across teams to deliver high-quality, production-ready solutions. Focused on system architecture and project leadership within SaaS and startup environments.',
  githubUsername: 'dojopercy',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/david-ojo-947639221/',
    github: 'https://github.com/dojopercy',
    email: 'ojodavid115@gmail.com',
    website: 'https://davidojo.site',
  },
  seo: {
    title: 'David Ojo - Full-Stack Developer & System Architect',
    description: 'Full-Stack Software Developer with expertise in Next.js, NestJS and Flutter. Skilled in designing scalable web and mobile applications, API development, and AI integration.',
    noindex: false,
  },
}

// Projects Data
export const projectsData = [
  {
    _type: 'project',
    title: 'Cloud-Based SaaS POS Platform',
    slug: { current: 'saas-pos-platform' },
    summary: 'A scalable SaaS POS platform supporting multi-branch operations with real-time inventory management and 99.9% uptime.',
    description: 'Built a comprehensive SaaS POS platform using the MENN stack (MongoDB, Express, Next.js, NestJS) with Docker containerization. The platform supports multi-branch operations, real-time inventory tracking, and processes 50+ transactions per minute with 99.9% uptime.',
    techStack: ['MongoDB', 'Express', 'Next.js', 'NestJS', 'Docker', 'PostgreSQL'],
    role: 'Full Stack Developer',
    impact: '99.9% uptime, multi-branch operations support, 40% reduction in stock errors, 50+ transactions/minute',
    problemStatement: 'Need for a scalable POS system that could support multiple branches with real-time inventory management and high transaction throughput.',
    outcome: 'Production-ready SaaS platform with real-time inventory management, multi-branch support, and robust error handling. Reduced stock errors by 40% and successfully processed 50+ transactions per minute.',
    metrics: {
      before: 'Manual inventory tracking with high error rates',
      after: 'Real-time inventory system with automated tracking',
      improvement: '40% reduction in stock errors, 50+ transactions/minute, 99.9% uptime',
    },
    date: '2024-01-01T00:00:00Z',
    featured: true,
    process: [
      {
        _type: 'block',
        _key: 'process1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Architected a microservices-based system using NestJS for backend APIs and Next.js for the admin dashboard. Implemented real-time inventory tracking using WebSockets and MongoDB change streams.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'process2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Deployed using Docker containers with automated CI/CD pipelines, ensuring 99.9% uptime and seamless multi-branch operations.',
          },
        ],
      },
    ],
  },
  {
    _type: 'project',
    title: 'B2B Event & Ticket Management Platform',
    slug: { current: 'b2b-event-ticket-management' },
    summary: 'Automated event registration and ticket management platform with email automation workflows, improving registration efficiency.',
    description: 'Developed a comprehensive B2B event and ticket management platform using Next.js, Auth0 B2B for enterprise authentication, and Google Apps Script for automated email workflows. The platform streamlines event registration and reduces manual administrative work.',
    techStack: ['Next.js', 'Auth0 B2B', 'Google Apps Script', 'Vercel', 'Tailwind CSS'],
    role: 'Full Stack Developer (RADCOMM Group)',
    impact: 'Automated client workflows, improved registration efficiency, streamlined event management',
    problemStatement: 'Manual event registration and ticket management processes were time-consuming and error-prone, requiring significant administrative overhead.',
    outcome: 'Automated email workflows and streamlined registration process, reducing administrative overhead and improving registration efficiency. Successfully deployed via Vercel and Namecheap.',
    date: '2024-06-01T00:00:00Z',
    featured: true,
    process: [
      {
        _type: 'block',
        _key: 'process1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Built the platform using Next.js with Auth0 B2B for secure enterprise authentication. Integrated Google Apps Script for automated email workflows and notifications.',
          },
        ],
      },
    ],
  },
  {
    _type: 'project',
    title: 'AI Property Search Agent',
    slug: { current: 'ai-property-search-agent' },
    summary: 'AI agent API using NestJS and LangGraph for conversational and direct property searches, enhancing query accuracy.',
    description: 'Developed an AI agent API using NestJS and LangGraph that enables conversational and direct property searches. The system improves user query accuracy and provides natural language interaction for property discovery.',
    techStack: ['NestJS', 'LangGraph', 'OpenAI', 'Node.js', 'PostgreSQL'],
    role: 'Full Stack Developer (Coziza)',
    impact: 'Enhanced query accuracy for property searches, natural language interaction capabilities',
    problemStatement: 'Traditional property search interfaces required specific filters and keywords, limiting user discovery and query accuracy.',
    outcome: 'AI agent API with conversational search capabilities that understand natural language queries and provide accurate property recommendations. Improved user experience and query accuracy.',
    date: '2025-08-01T00:00:00Z',
    featured: true,
    process: [
      {
        _type: 'block',
        _key: 'process1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Built the AI agent using NestJS with LangGraph for orchestrating conversational flows. Integrated OpenAI for natural language understanding and property recommendation logic.',
          },
        ],
      },
    ],
  },
  {
    _type: 'project',
    title: 'Content Management Platform with AI Workflows',
    slug: { current: 'content-management-ai-workflows' },
    summary: 'Next.js + Sanity CMS platform integrated with Auth0 and Inngest AI workflows, reducing editorial review time by 30%.',
    description: 'Built a content management platform using Next.js and Sanity CMS, integrated with Auth0 for secure access control and Inngest for AI-driven publishing workflows. The platform automates content review processes and reduces editorial overhead.',
    techStack: ['Next.js', 'Sanity CMS', 'Auth0', 'Inngest', 'OpenAI'],
    role: 'Full Stack Developer (RADCOMM Group)',
    impact: 'Reduced editorial review time by 30%, automated publishing workflows, secure access control',
    problemStatement: 'Time-consuming editorial review process was slowing down content publication and increasing administrative overhead.',
    outcome: 'AI-driven publishing workflows and secure access control, reducing editorial review time by 30%. Improved content publication efficiency and team collaboration.',
    date: '2024-06-01T00:00:00Z',
    featured: true,
    process: [
      {
        _type: 'block',
        _key: 'process1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Integrated Sanity CMS with Next.js for content management. Set up Auth0 for secure access control and Inngest for AI-driven workflow automation, including content review and publishing processes.',
          },
        ],
      },
    ],
  },
  {
    _type: 'project',
    title: 'KNUST Estate Management System',
    slug: { current: 'knust-estate-management-system' },
    summary: 'Rebuilt university estate management system with .NET Core and Blazor, enabling real-time property tracking and secure multi-role access.',
    description: 'Led a 4-member team to rebuild the university\'s estate management system using Blazor, Tailwind CSS, and .NET Core under a clean architecture. The system enables real-time property tracking and secure role-based access control.',
    techStack: ['.NET Core', 'Blazor', 'Tailwind CSS', 'PostgreSQL', 'RESTful API'],
    role: 'Lead Full Stack Developer',
    impact: 'Real-time property tracking, secure multi-role access, clean architecture implementation',
    problemStatement: 'Legacy estate management system needed modernization to support real-time tracking, secure multi-role access, and improved user experience.',
    outcome: 'Rebuilt system with clean architecture, RESTful APIs with Swagger documentation, and real-time property tracking. Enabled secure role-based access and improved system maintainability.',
    date: '2024-11-01T00:00:00Z',
    featured: true,
    process: [
      {
        _type: 'block',
        _key: 'process1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Led a 4-member team (UI/UX, frontend, backend, integration) to rebuild the system. Built and documented RESTful APIs with Swagger, supporting real-time property tracking and secure role-based access.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'process2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Oversaw frontend-backend integration and UX consistency, optimizing performance and maintainability. Conducted project pitches, sprint reviews, and stakeholder presentations.',
          },
        ],
      },
    ],
  },
  {
    _type: 'project',
    title: 'Property Management Admin Dashboard',
    slug: { current: 'property-management-admin-dashboard' },
    summary: 'Comprehensive admin dashboard for property management platform with 15+ core entities and complete CRUD workflows.',
    description: 'Collaborated on an admin dashboard for a property management platform using Next.js, Auth0, Zustand, and Zod. Implemented 15+ core entities with complete CRUD workflows and passwordless authentication.',
    techStack: ['Next.js', 'Auth0', 'Zustand', 'Zod', 'TypeScript', 'Tailwind CSS'],
    role: 'Full Stack Developer Intern (Coziza)',
    impact: '15+ core entities with complete CRUD workflows, passwordless authentication, resilient API wrappers',
    problemStatement: 'Need for a comprehensive admin dashboard to manage property listings, users, and platform operations with robust data validation and authentication.',
    outcome: 'Full-featured admin dashboard with passwordless authentication and resilient API wrappers with circuit-breaker strategies. Reduced authentication issues and improved code reliability through clean-code and pair programming practices.',
    date: '2025-08-01T00:00:00Z',
    featured: false,
    process: [
      {
        _type: 'block',
        _key: 'process1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Implemented 15+ core entities with complete CRUD workflows using Next.js, Zustand for state management, and Zod for schema validation. Implemented passwordless authentication and resilient API wrappers with circuit-breaker strategies.',
          },
        ],
      },
    ],
  },
  {
    _type: 'project',
    title: 'Washam - On-Demand Laundry Platform',
    slug: { current: 'washam-laundry-platform' },
    summary: 'Upcoming on-demand laundry platform with market validation and feasibility studies completed ahead of full product launch.',
    description: 'Initiated Washam, an on-demand laundry platform, conducting market validation and feasibility studies. The platform aims to provide convenient laundry services with on-demand scheduling and delivery.',
    techStack: ['Market Research', 'Product Planning'],
    role: 'Founder/Developer',
    impact: 'Market validation and feasibility studies completed, upcoming launch',
    problemStatement: 'On-demand laundry service gap in the market, requiring convenient scheduling and delivery solutions.',
    outcome: 'Market research and validation completed, preparing for full product launch with identified market opportunities and user needs.',
    date: '2024-01-01T00:00:00Z',
    featured: false,
  },
  {
    _type: 'project',
    title: 'Dating App Prototype',
    slug: { current: 'dating-app-prototype' },
    summary: 'Flutter + Firebase prototype for a dating app with authentication, real-time messaging, and data synchronization.',
    description: 'Built a Flutter + Firebase prototype for a dating app, implementing authentication, real-time messaging platform, and real-time data synchronization. Contributed to UI/UX design, data modeling, and release planning.',
    techStack: ['Flutter', 'Firebase', 'Dart', 'Real-time Database'],
    role: 'Application Developer (Courtright)',
    impact: 'Real-time messaging and data synchronization, authentication system, UI/UX design',
    problemStatement: 'Need for a dating app prototype with real-time features, authentication, and messaging capabilities.',
    outcome: 'Flutter prototype with authentication and real-time messaging, supporting future scalability. Contributed to UI/UX design, data modeling, and release planning.',
    date: '2023-11-01T00:00:00Z',
    featured: false,
    process: [
      {
        _type: 'block',
        _key: 'process1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Built the prototype using Flutter and Firebase for authentication and real-time data synchronization. Implemented real-time messaging platform and contributed to UI/UX design and data modeling.',
          },
        ],
      },
    ],
  },
  {
    _type: 'project',
    title: 'Client Web Projects',
    slug: { current: 'client-web-projects' },
    summary: 'Multiple client websites including Astrosanguineus (florist CMS), Ilmconsult, and Ecofleet with responsive design and SEO optimization.',
    description: 'Delivered multiple client projects including Astrosanguineus (florist CMS), Ilmconsult, and Ecofleet. Emphasized responsive design, SEO optimization, and enhanced UX with GSAP animations.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'GSAP', 'SEO'],
    role: 'Freelance Full Stack Developer',
    impact: 'Responsive design, SEO optimization, enhanced UX with animations',
    problemStatement: 'Client needs for modern, responsive websites with SEO optimization and engaging user experiences.',
    outcome: 'Multiple client websites with GSAP animations, responsive design, and SEO optimization. Improved user engagement and search engine visibility.',
    date: '2022-01-01T00:00:00Z',
    featured: false,
    process: [
      {
        _type: 'block',
        _key: 'process1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Built client websites using Next.js and React with Tailwind CSS for styling. Integrated GSAP animations to enhance interactivity and engagement. Focused on responsive design and SEO optimization.',
          },
        ],
      },
    ],
  },
]

// Research Data
export const researchData = [
  {
    _type: 'research',
    title: 'Passwordless Authentication Implementation',
    slug: { current: 'passwordless-authentication' },
    hypothesis: 'Passwordless authentication improves user experience and reduces authentication issues while maintaining security.',
    outcome: 'Successfully implemented passwordless authentication with circuit-breaker strategies and resilient API wrappers, reducing authentication issues and improving user experience.',
    tools: ['Auth0', 'NestJS', 'Circuit Breaker Pattern'],
    date: '2025-08-01T00:00:00Z',
    methodology: [
      {
        _type: 'block',
        _key: 'method1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Implemented passwordless authentication using Auth0 with magic link and SMS-based authentication flows. Integrated circuit-breaker patterns for resilient API wrappers to handle authentication failures gracefully.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'method2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Conducted user testing and monitored authentication success rates, comparing passwordless authentication with traditional password-based authentication. Results showed reduced authentication issues and improved user experience.',
          },
        ],
      },
    ],
  },
]

// Import function
export async function importData() {
  try {
    console.log('Starting Sanity CMS data import...')
    console.log('Note: This script requires SANITY_API_TOKEN to be set in your .env file')
    console.log('')

    // Import Site Settings
    console.log('Importing site settings...')
    try {
      // Check if site settings already exists
      const existingSettings = await writeClient.fetch('*[_type == "siteSettings"][0]')
      
      if (existingSettings) {
        // Update existing settings
        const result = await writeClient
          .patch(existingSettings._id)
          .set(siteSettingsData)
          .commit()
        console.log('Site settings updated:', result._id)
      } else {
        // Create new settings
        const result = await writeClient.create(siteSettingsData)
        console.log('Site settings created:', result._id)
      }
    } catch (error: any) {
      console.error('Error importing site settings:', error.message)
      throw error
    }

    // Import Projects
    console.log('')
    console.log('Importing projects...')
    for (const project of projectsData) {
      try {
        // Check if project with same slug exists
        const existingProject = await writeClient.fetch(
          `*[_type == "project" && slug.current == "${project.slug.current}"][0]`
        )
        
        if (existingProject) {
          console.log(`Project already exists: ${project.title}, skipping...`)
        } else {
          const projectDoc: any = {
            _type: project._type,
            title: project.title,
            slug: project.slug,
            summary: project.summary,
            description: project.description,
            techStack: project.techStack,
            role: project.role,
            impact: project.impact,
            problemStatement: project.problemStatement,
            outcome: project.outcome,
            date: project.date,
            featured: project.featured,
            process: project.process,
          }

          if ('metrics' in project && project.metrics) {
            projectDoc.metrics = project.metrics
          }

          const result = await writeClient.create(projectDoc)
          console.log(`✓ Project imported: ${project.title} (${result._id})`)
        }
      } catch (error: any) {
        console.error(`Error importing project ${project.title}:`, error.message)
      }
    }

    // Import Research
    console.log('')
    console.log('Importing research items...')
    for (const research of researchData) {
      try {
        // Check if research with same slug exists
        const existingResearch = await writeClient.fetch(
          `*[_type == "research" && slug.current == "${research.slug.current}"][0]`
        )
        
        if (existingResearch) {
          console.log(`Research already exists: ${research.title}, skipping...`)
        } else {
          const result = await writeClient.create(research)
          console.log(`✓ Research imported: ${research.title} (${result._id})`)
        }
      } catch (error: any) {
        console.error(`Error importing research ${research.title}:`, error.message)
      }
    }

    console.log('')
    console.log('Data import completed successfully!')
    console.log('')
    console.log('Next steps:')
    console.log('1. Visit your Sanity Studio at /admin to review the imported data')
    console.log('2. Add cover images for projects if needed')
    console.log('3. Review and customize the content as needed')
  } catch (error) {
    console.error('Error during data import:', error)
    throw error
  }
}

// Run import when script is executed directly
// Usage: npx tsx scripts/sanity-data.ts
importData()
  .then(() => {
    console.log('Import process completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Import process failed:', error)
    process.exit(1)
  })

