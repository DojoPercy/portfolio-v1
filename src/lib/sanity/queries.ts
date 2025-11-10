import { groq } from 'next-sanity'

// Base fields for projects
const projectFields = `
  _id,
  _type,
  title,
  slug,
  description,
  summary,
  techStack,
  role,
  impact,
  coverImage,
  process,
  date,
  featured,
  problemStatement,
  researchInsights,
  outcome,
  metrics,
  githubUrl,
  liveUrl
`

// Get all projects
export const getAllProjects = groq`
  *[_type == "project"] | order(date desc) {
    ${projectFields}
  }
`

// Get featured projects
export const getFeaturedProjects = groq`
  *[_type == "project" && featured == true] | order(date desc) {
    ${projectFields}
  }
`

// Get project by slug
export const getProjectBySlug = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectFields}
  }
`

// Get all research items
export const getAllResearch = groq`
  *[_type == "research"] | order(date desc) {
    _id,
    _type,
    title,
    slug,
    hypothesis,
    methodology,
    outcome,
    tools,
    sketches,
    wireframes,
    finalUI,
    date
  }
`

// Get all writings
export const getAllWritings = groq`
  *[_type == "writing"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    excerpt,
    body,
    readingTime,
    tags,
    publishedAt,
    coverImage
  }
`

// Get writing by slug
export const getWritingBySlug = groq`
  *[_type == "writing" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    excerpt,
    body,
    readingTime,
    tags,
    publishedAt,
    coverImage
  }
`

// Get all logs
export const getAllLogs = groq`
  *[_type == "log"] | order(date desc) {
    _id,
    _type,
    title,
    summary,
    date
  }
`

// Get recent logs
export const getRecentLogs = groq`
  *[_type == "log"] | order(date desc)[0...5] {
    _id,
    _type,
    title,
    summary,
    date
  }
`

// Get all testimonials
export const getAllTestimonials = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    _type,
    author,
    quote,
    project-> {
      title,
      slug
    },
    role,
    company
  }
`

// Get site settings
export const getSiteSettings = groq`
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    siteTitle,
    tagline,
    missionStatement,
    designPhilosophy,
    logo,
    githubUsername,
    voiceIntroFile {
      asset-> {
        _id,
        url,
        originalFilename,
        size,
        mimeType
      }
    },
    ambientMusicFile {
      asset-> {
        _id,
        url,
        originalFilename,
        size,
        mimeType
      }
    },
    socialLinks {
      linkedin,
      github,
      twitter,
      email,
      website
    },
    seo {
      title,
      description,
      ogImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      noindex
    }
  }
`

// Get all experience
export const getAllExperience = groq`
  *[_type == "experience"] | order(order asc, startDate desc) {
    _id,
    _type,
    company,
    position,
    location,
    startDate,
    endDate,
    isCurrent,
    description,
    achievements,
    technologies,
    order
  }
`

// Get all skills
export const getAllSkills = groq`
  *[_type == "skill"] | order(category asc, order asc) {
    _id,
    _type,
    name,
    category,
    proficiency,
    icon,
    order
  }
`

// Get all education
export const getAllEducation = groq`
  *[_type == "education"] | order(order asc, endDate desc) {
    _id,
    _type,
    degree,
    institution,
    location,
    startDate,
    endDate,
    grade,
    description,
    courses,
    order
  }
`

// Get all certifications
export const getAllCertifications = groq`
  *[_type == "certification"] | order(order asc, issueDate desc) {
    _id,
    _type,
    name,
    issuer,
    issueDate,
    expiryDate,
    credentialId,
    credentialUrl,
    description,
    logo,
    order
  }
`



