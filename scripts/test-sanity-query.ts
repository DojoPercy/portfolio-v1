/**
 * Test script to verify Sanity CMS data is accessible
 * Run with: pnpm tsx scripts/test-sanity-query.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from 'next-sanity'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  config({ path: resolve(process.cwd(), '.env') })
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-18',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN,
})

async function testQueries() {
  console.log('Testing Sanity CMS queries...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')
  console.log('')

  try {
    // Test site settings
    console.log('1. Testing site settings...')
    const siteSettings = await client.fetch('*[_type == "siteSettings"][0]')
    console.log('   Site settings:', siteSettings ? 'Found' : 'Not found')
    if (siteSettings) {
      console.log('   Title:', siteSettings.siteTitle)
      console.log('   Tagline:', siteSettings.tagline)
    }
    console.log('')

    // Test all projects
    console.log('2. Testing all projects...')
    const allProjects = await client.fetch('*[_type == "project"]')
    console.log('   Total projects:', allProjects?.length || 0)
    if (allProjects && allProjects.length > 0) {
      console.log('   Project titles:')
      allProjects.forEach((project: any, index: number) => {
        console.log(`   ${index + 1}. ${project.title} (Featured: ${project.featured || false})`)
      })
    }
    console.log('')

    // Test featured projects
    console.log('3. Testing featured projects...')
    const featuredProjects = await client.fetch('*[_type == "project" && featured == true]')
    console.log('   Featured projects:', featuredProjects?.length || 0)
    if (featuredProjects && featuredProjects.length > 0) {
      console.log('   Featured project titles:')
      featuredProjects.forEach((project: any, index: number) => {
        console.log(`   ${index + 1}. ${project.title}`)
      })
    }
    console.log('')

    // Test logs
    console.log('4. Testing logs...')
    const logs = await client.fetch('*[_type == "log"]')
    console.log('   Total logs:', logs?.length || 0)
    console.log('')

    console.log('✅ All queries completed successfully!')
  } catch (error: any) {
    console.error('❌ Error testing queries:', error.message)
    console.error('   Full error:', error)
  }
}

testQueries()




