/**
 * Script to import CV data into Sanity CMS
 * Run with: pnpm tsx scripts/import-cv-data.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from 'next-sanity'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  config({ path: resolve(process.cwd(), '.env') })
}

// Validate environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
}

const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value && key !== 'NEXT_PUBLIC_SANITY_DATASET')
  .map(([key]) => key)

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:')
  missingVars.forEach((varName) => {
    console.error(`   - ${varName}`)
  })
  process.exit(1)
}

// Create Sanity write client
const writeClient = createClient({
  projectId: requiredEnvVars.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: requiredEnvVars.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-03-18',
  useCdn: false,
  token: requiredEnvVars.SANITY_API_TOKEN!,
})

// Experience Data
const experiencesData = [
  {
    company: 'RADCOMM GROUP',
    position: 'FULL STACK DEVELOPER',
    location: 'Remote',
    startDate: '2024-06-01',
    isCurrent: true,
    description: 'Full-stack development with focus on Next.js, Sanity CMS, and AI integration',
    achievements: [
      'Built a Next.js + Sanity CMS integrated with Auth0 for secure access control and Inngest for AI-driven publishing workflows, cutting review time by 30%',
      'Developed a SaaS event and ticket management platform using Next.js, Auth0 B2B, and Google Apps Script for email automation; deployed via Vercel and Namecheap',
      'Delivered several conference and event websites using Next.js and Tailwind CSS, ensuring responsive and consistent UI',
      'Managed deployment pipelines and infrastructure, improving uptime, performance, and scalability across projects',
    ],
    technologies: ['Next.js', 'Sanity CMS', 'Auth0', 'Inngest', 'Google Apps Script', 'Vercel', 'Tailwind CSS'],
    order: 1,
  },
  {
    company: 'COZIZA',
    position: 'FULL STACK DEVELOPER INTERN',
    location: 'Remote',
    startDate: '2024-08-01',
    isCurrent: true,
    description: 'Collaborated on property management platform with focus on admin dashboard and AI agent development',
    achievements: [
      'Collaborated on an admin dashboard for a property management platform using Next.js, Auth0, Zustand, and Zod, implementing 15+ core entities with complete CRUD workflows',
      'Developed a NestJS AI Agent API with LangGraph for conversational and direct property searches, improving user query accuracy',
      'Implemented passwordless authentication and resilient API wrappers with circuit-breaker strategies, reducing authentication issues',
      'Promoted clean-code and pair programming practices, enhancing collaboration and code reliability',
    ],
    technologies: ['Next.js', 'Auth0', 'Zustand', 'Zod', 'NestJS', 'LangGraph', 'TypeScript'],
    order: 2,
  },
  {
    company: 'KNUST UITS (SOFTWARE DEVELOPMENT DIVISION)',
    position: 'LEAD FULL STACK DEVELOPER',
    location: 'Ghana',
    startDate: '2024-11-01',
    endDate: '2025-10-01',
    isCurrent: false,
    description: 'Led a 4-member team to rebuild the university estate management system',
    achievements: [
      'Led a 4-member team (UI/UX, frontend, backend, integration) to rebuild the university estate management system using Blazor, Tailwind CSS, and .NET Core under a clean architecture',
      'Built and documented RESTful APIs with Swagger, supporting real-time property tracking and secure role-based access',
      'Oversaw frontend–backend integration and UX consistency, optimizing performance and maintainability',
      'Conducted project pitches, sprint reviews, and stakeholder presentations, aligning deliverables with institutional objectives',
    ],
    technologies: ['Blazor', 'Tailwind CSS', '.NET Core', 'Swagger', 'Clean Architecture'],
    order: 3,
  },
  {
    company: 'Courtright',
    position: 'Application Developer',
    location: 'Remote',
    startDate: '2023-11-01',
    endDate: '2024-04-01',
    isCurrent: false,
    description: 'Built Flutter + Firebase prototype for a dating app',
    achievements: [
      'Built a Flutter + Firebase prototype for a dating app, implementing authentication, real-time messaging platform, and real-time data synchronization',
      'Contributed to UI/UX design, data modeling, and release planning to support future scalability',
      'Collaborated cross-functionally to align development goals with product and client requirements',
    ],
    technologies: ['Flutter', 'Firebase', 'Dart', 'Real-time Messaging'],
    order: 4,
  },
  {
    company: 'Upwork/Freelance',
    position: 'Freelance Full Stack Developer',
    location: 'Remote',
    startDate: '2022-01-01',
    isCurrent: true,
    description: 'Freelance development work for various clients',
    achievements: [
      'Designed and deployed a SaaS POS platform using the MENN stack (MongoDB, Express, Next.js, NestJS), supporting multi-branch operations with 99.9% uptime',
      'Built a real-time inventory and order management system, reducing stock errors by 40% and processing 50+ transactions per minute',
      'Delivered client projects including Astrosanguineus (florist CMS), Ilmconsult, and Ecofleet, emphasizing responsive design, SEO, and optimized UX',
      'Integrated GSAP animations to enhance interactivity and engagement across multiple client sites',
    ],
    technologies: ['Next.js', 'NestJS', 'MongoDB', 'Express', 'GSAP', 'React'],
    order: 5,
  },
]

// Skills Data
const skillsData = [
  // Frontend
  { name: 'Next.js', category: 'frontend', proficiency: 95, order: 1 },
  { name: 'React', category: 'frontend', proficiency: 90, order: 2 },
  { name: 'Flutter (Dart)', category: 'mobile', proficiency: 85, order: 1 },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 90, order: 3 },
  { name: 'Blazor', category: 'frontend', proficiency: 75, order: 4 },
  { name: 'Framer Motion', category: 'frontend', proficiency: 85, order: 5 },
  { name: 'GSAP', category: 'frontend', proficiency: 80, order: 6 },
  
  // Backend
  { name: 'NestJS', category: 'backend', proficiency: 90, order: 1 },
  { name: '.NET Core', category: 'backend', proficiency: 80, order: 2 },
  { name: 'Node.js', category: 'backend', proficiency: 85, order: 3 },
  { name: 'Express', category: 'backend', proficiency: 85, order: 4 },
  { name: 'Prisma', category: 'backend', proficiency: 75, order: 5 },
  
  // DevOps
  { name: 'Docker', category: 'devops', proficiency: 75, order: 1 },
  { name: 'Vercel', category: 'devops', proficiency: 90, order: 2 },
  { name: 'Railway', category: 'devops', proficiency: 70, order: 3 },
  { name: 'CI/CD', category: 'devops', proficiency: 75, order: 4 },
  
  // Database
  { name: 'PostgreSQL', category: 'database', proficiency: 85, order: 1 },
  { name: 'MongoDB', category: 'database', proficiency: 80, order: 2 },
  { name: 'SQL', category: 'database', proficiency: 75, order: 3 },
  
  // Auth & Payment
  { name: 'Auth0', category: 'auth-payment', proficiency: 90, order: 1 },
  { name: 'JWT', category: 'auth-payment', proficiency: 85, order: 2 },
  { name: 'Paystack', category: 'auth-payment', proficiency: 75, order: 3 },
  
  // CMS & AI Tools
  { name: 'Sanity', category: 'cms-ai', proficiency: 90, order: 1 },
  { name: 'Inngest', category: 'cms-ai', proficiency: 80, order: 2 },
  { name: 'OpenAI', category: 'cms-ai', proficiency: 75, order: 3 },
  { name: 'LangGraph', category: 'cms-ai', proficiency: 85, order: 4 },
]

// Education Data
const educationData = [
  {
    degree: 'Bachelor of Science in Telecommunications Engineering (First Class)',
    institution: 'Kwame Nkrumah University of Science and Technology',
    location: 'Kumasi, Ghana',
    startDate: '2021-01-01',
    endDate: '2024-08-01',
    grade: 'First Class',
    description: 'Specialized in telecommunications engineering with focus on software development and system architecture',
    courses: [
      'Software Engineering',
      'Data Structures and Algorithms',
      'Database Systems',
      'Network Programming',
      'System Design',
    ],
    order: 1,
  },
  {
    degree: 'West African Senior School Certificate (WASSCE)',
    institution: 'Odorgonno Senior High School',
    location: 'Ghana',
    startDate: '2016-09-01',
    endDate: '2019-06-01',
    description: 'Completed secondary education',
    order: 2,
  },
]

// Certifications Data
const certificationsData = [
  {
    name: 'Agentic AI with LangChain and LangGraph',
    issuer: 'Coursera',
    issueDate: '2024-01-01',
    description: 'Comprehensive course on building AI agents using LangChain and LangGraph',
    order: 1,
  },
  {
    name: 'Fundamentals of Building AI Agent',
    issuer: 'Coursera',
    issueDate: '2024-01-01',
    description: 'Fundamental concepts and practices for building AI agents',
    order: 2,
  },
  {
    name: 'Introduction to Software Development',
    issuer: 'Coursera',
    issueDate: '2023-01-01',
    description: 'Introduction to software development principles and practices',
    order: 3,
  },
  {
    name: 'Introduction to Project Management',
    issuer: 'Coursera',
    issueDate: '2023-01-01',
    description: 'Project management fundamentals and best practices',
    order: 4,
  },
]

async function importExperiences() {
  console.log('📝 Importing experiences...\n')
  
  for (const exp of experiencesData) {
    try {
      // Check if experience already exists
      const existing = await writeClient.fetch(
        `*[_type == "experience" && company == $company && position == $position][0]`,
        { company: exp.company, position: exp.position }
      )

      if (existing) {
        console.log(`⏭️  Skipping "${exp.position} at ${exp.company}" (already exists)`)
        continue
      }

      const experienceDoc: any = {
        _type: 'experience',
        company: exp.company,
        position: exp.position,
        location: exp.location,
        startDate: exp.startDate,
        isCurrent: exp.isCurrent,
        description: exp.description,
        achievements: exp.achievements,
        technologies: exp.technologies,
        order: exp.order,
      }

      if (exp.endDate) {
        experienceDoc.endDate = exp.endDate
      }

      const result = await writeClient.create(experienceDoc)

      console.log(`✅ Imported: ${exp.position} at ${exp.company}`)
    } catch (error: any) {
      console.error(`❌ Error importing "${exp.position} at ${exp.company}":`, error.message)
    }
  }
  console.log()
}

async function importSkills() {
  console.log('🛠️  Importing skills...\n')
  
  for (const skill of skillsData) {
    try {
      // Check if skill already exists
      const existing = await writeClient.fetch(
        `*[_type == "skill" && name == $name][0]`,
        { name: skill.name }
      )

      if (existing) {
        console.log(`⏭️  Skipping "${skill.name}" (already exists)`)
        continue
      }

      const result = await writeClient.create({
        _type: 'skill',
        ...skill,
      })

      console.log(`✅ Imported: ${skill.name} (${skill.category})`)
    } catch (error: any) {
      console.error(`❌ Error importing "${skill.name}":`, error.message)
    }
  }
  console.log()
}

async function importEducation() {
  console.log('🎓 Importing education...\n')
  
  for (const edu of educationData) {
    try {
      // Check if education already exists
      const existing = await writeClient.fetch(
        `*[_type == "education" && degree == $degree && institution == $institution][0]`,
        { degree: edu.degree, institution: edu.institution }
      )

      if (existing) {
        console.log(`⏭️  Skipping "${edu.degree}" (already exists)`)
        continue
      }

      const educationDoc: any = {
        _type: 'education',
        degree: edu.degree,
        institution: edu.institution,
        location: edu.location,
        startDate: edu.startDate,
        endDate: edu.endDate,
        description: edu.description,
        order: edu.order,
      }

      if (edu.grade) {
        educationDoc.grade = edu.grade
      }

      if (edu.courses && edu.courses.length > 0) {
        educationDoc.courses = edu.courses
      }

      const result = await writeClient.create(educationDoc)

      console.log(`✅ Imported: ${edu.degree}`)
    } catch (error: any) {
      console.error(`❌ Error importing "${edu.degree}":`, error.message)
    }
  }
  console.log()
}

async function importCertifications() {
  console.log('🏆 Importing certifications...\n')
  
  for (const cert of certificationsData) {
    try {
      // Check if certification already exists
      const existing = await writeClient.fetch(
        `*[_type == "certification" && name == $name && issuer == $issuer][0]`,
        { name: cert.name, issuer: cert.issuer }
      )

      if (existing) {
        console.log(`⏭️  Skipping "${cert.name}" (already exists)`)
        continue
      }

      const result = await writeClient.create({
        _type: 'certification',
        ...cert,
      })

      console.log(`✅ Imported: ${cert.name} - ${cert.issuer}`)
    } catch (error: any) {
      console.error(`❌ Error importing "${cert.name}":`, error.message)
    }
  }
  console.log()
}

async function importCVData() {
  console.log('🚀 Starting CV data import...\n')
  
  await importExperiences()
  await importSkills()
  await importEducation()
  await importCertifications()
  
  console.log('✨ CV data import completed!')
  console.log(`\nView in Sanity Studio: https://${requiredEnvVars.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${requiredEnvVars.NEXT_PUBLIC_SANITY_DATASET}`)
}

// Run the import
importCVData().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

