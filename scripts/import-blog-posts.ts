/**
 * Script to import blog posts into Sanity CMS
 * Run with: pnpm tsx scripts/import-blog-posts.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from 'next-sanity'
import * as fs from 'fs'

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

// Blog posts data
const blogPosts = [
  {
    title: 'Building an AI Agent API for Property Search with NestJS and LangGraph',
    slug: 'building-ai-agent-api-property-search-nestjs-langgraph',
    excerpt: 'How I built a conversational property search system that understands natural language and provides accurate property recommendations using NestJS, LangGraph, and LangChain.',
    content: `
# Building an AI Agent API for Property Search with NestJS and LangGraph

*How I built a conversational property search system that understands natural language and provides accurate property recommendations*

## The Problem

Traditional property search interfaces require users to fill out multiple forms with specific filters. This creates friction and doesn't match how people naturally describe what they're looking for. Users want to say:

> "I need a 2-bedroom apartment under $2000 in downtown"

And get relevant results immediately, not navigate through dropdown menus and checkboxes.

## The Solution

I built an AI-powered property search agent using **NestJS**, **LangGraph**, and **LangChain** that transforms natural language into structured property searches.

### Tech Stack

- **NestJS** - Enterprise-grade Node.js framework
- **LangGraph** - State machine framework for agent workflows
- **LangChain** - Framework for LLM-powered applications
- **PostgreSQL** - Conversation memory and checkpointing
- **Redis** - Real-time response streaming
- **Google Gemini** - LLM for natural language understanding
- **Zod** - Type-safe schema validation

## Key Features

- Natural language property search
- Conversation context maintenance
- Accurate property recommendations
- Real-time response streaming
- Persistent conversation memory

## Implementation

The agent uses LangGraph's state machine pattern to handle complex conversational flows, with PostgreSQL for persistent memory and Redis for real-time streaming.

## Results

The implementation successfully converts natural language to structured property searches, maintains conversation context, and provides accurate recommendations.

## Key Learnings

- Structured output ensures reliable LLM responses
- Separate agents for different use cases improve performance
- Persistent memory enables meaningful conversations
- Error handling is crucial for production systems
- Streaming improves user experience
    `,
    tags: ['NestJS', 'LangGraph', 'AI', 'LangChain', 'TypeScript', 'API Development'],
    readingTime: 8,
  },
  {
    title: 'Building a Scalable Admin Dashboard with Next.js, Auth0, and Type-Safe State Management',
    slug: 'building-scalable-admin-dashboard-nextjs-auth0',
    excerpt: 'How I built a property management admin dashboard with 15+ core entities, complete CRUD workflows, and type-safe architecture using Next.js, Auth0, Zustand, and Zod.',
    content: `
# Building a Scalable Admin Dashboard with Next.js, Auth0, and Type-Safe State Management

*How I built a property management admin dashboard with 15+ core entities, complete CRUD workflows, and type-safe architecture*

## The Problem

Property management platforms require complex admin interfaces to manage listings, users, agents, viewings, and more. The challenge was building a scalable admin dashboard that manages 15+ core entities while maintaining type safety and providing a smooth user experience.

## The Solution

I built a comprehensive admin dashboard using **Next.js 15**, **Auth0**, **Zustand**, **Zod**, and **React Hook Form** that provides a type-safe, scalable foundation for property management.

### Tech Stack

- **Next.js 15** - React framework with App Router
- **Auth0** - Authentication and authorization
- **Zustand** - Lightweight state management
- **Zod** - Schema validation and type inference
- **React Hook Form** - Performant form handling
- **TanStack Query** - Server state management
- **TanStack Table** - Powerful data table component

## Core Entities

The dashboard manages 15+ core entities including listings, agents, owners, viewings, amenities, currencies, and more.

## Key Features

- Type-safe API layer with Zod
- Zustand state management
- React Hook Form integration
- Auth0 authentication
- TanStack Query for server state
- Data tables with TanStack Table

## Results

The implementation successfully manages 15+ core entities with type safety, provides secure authentication, handles complex forms with validation, and scales as new features are added.

## Key Learnings

- Type safety prevents bugs and improves developer experience
- Schema-first development ensures consistency
- Centralized API layer simplifies maintenance
- Role-based access control ensures security
- Optimistic updates improve user experience
    `,
    tags: ['Next.js', 'Auth0', 'Zustand', 'Zod', 'TypeScript', 'Admin Dashboard'],
    readingTime: 10,
  },
  {
    title: 'Building a B2B Event & Ticket Management Platform with Next.js, Auth0 B2B, and Google Apps Script',
    slug: 'building-b2b-event-ticket-platform-nextjs-auth0',
    excerpt: 'How I built a scalable event management platform that automates client workflows and improves registration efficiency using Next.js, Auth0 B2B, and Google Apps Script.',
    content: `
# Building a B2B Event & Ticket Management Platform with Next.js, Auth0 B2B, and Google Apps Script

*How I built a scalable event management platform that automates client workflows and improves registration efficiency*

## The Problem

Event management companies need a platform that can handle B2B client accounts, automate email workflows, manage ticket sales, provide real-time analytics, and integrate with external systems.

## The Solution

I built a comprehensive B2B event and ticket management platform using **Next.js**, **Auth0 B2B**, and **Google Apps Script** that automates workflows and improves registration efficiency.

### Tech Stack

- **Next.js** - React framework for the frontend
- **Auth0 B2B** - B2B authentication and user management
- **Google Apps Script** - Email automation and workflow automation
- **Vercel** - Deployment and hosting
- **Stripe/Paystack** - Payment processing
- **PostgreSQL** - Database for events and tickets

## Key Features

- B2B organization management
- Event lifecycle management
- Ticket sales and management
- Google Apps Script automation
- Registration workflow automation
- Real-time event analytics

## Results

The platform successfully handles B2B client accounts, automates email workflows, manages ticket sales, provides real-time analytics, and scales to handle large events.

## Key Learnings

- B2B authentication requires organization context management
- Email automation improves user experience
- Scalability is crucial for large events
- Payment processing must be secure and reliable
- Integration with external systems enhances functionality
    `,
    tags: ['Next.js', 'Auth0', 'Google Apps Script', 'B2B', 'Event Management', 'TypeScript'],
    readingTime: 12,
  },
]

// Convert markdown to portable text blocks (simplified)
function markdownToPortableText(markdown: string): any[] {
  const lines = markdown.split('\n').filter(line => line.trim())
  const blocks: any[] = []

  for (const line of lines) {
    if (line.startsWith('# ')) {
      blocks.push({
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: line.replace('# ', '').trim() }],
      })
    } else if (line.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: line.replace('## ', '').trim() }],
      })
    } else if (line.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: line.replace('### ', '').trim() }],
      })
    } else if (line.startsWith('**') && line.endsWith('**')) {
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: line.replace(/\*\*/g, ''),
          marks: ['strong'],
        }],
      })
    } else if (line.startsWith('> ')) {
      blocks.push({
        _type: 'block',
        style: 'blockquote',
        children: [{ _type: 'span', text: line.replace('> ', '').trim() }],
      })
    } else if (line.startsWith('- ')) {
      blocks.push({
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: line.replace('- ', '').trim() }],
      })
    } else if (line.trim()) {
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: line.trim() }],
      })
    }
  }

  return blocks
}

async function importBlogPosts() {
  console.log('🚀 Starting blog posts import...\n')

  for (const post of blogPosts) {
    try {
      // Check if post already exists
      const existing = await writeClient.fetch(
        `*[_type == "writing" && slug.current == $slug][0]`,
        { slug: post.slug }
      )

      if (existing) {
        console.log(`⏭️  Skipping "${post.title}" (already exists)`)
        continue
      }

      // Convert markdown to portable text
      const body = markdownToPortableText(post.content)

      // Create the document
      const document = {
        _type: 'writing',
        title: post.title,
        slug: {
          _type: 'slug',
          current: post.slug,
        },
        excerpt: post.excerpt,
        body: body,
        readingTime: post.readingTime,
        tags: post.tags,
        publishedAt: new Date().toISOString(),
      }

      const result = await writeClient.create(document)

      console.log(`✅ Imported: "${post.title}"`)
      console.log(`   ID: ${result._id}`)
      console.log(`   Slug: ${post.slug}\n`)
    } catch (error: any) {
      console.error(`❌ Error importing "${post.title}":`, error.message)
      if (error.details) {
        console.error(`   Details:`, error.details)
      }
      console.log()
    }
  }

  console.log('✨ Blog posts import completed!')
  console.log(`\nView in Sanity Studio: https://${requiredEnvVars.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${requiredEnvVars.NEXT_PUBLIC_SANITY_DATASET}`)
}

// Run the import
importBlogPosts().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

