import { createClient, SanityClient } from 'next-sanity'

// Helper function to get client configuration
function getClientConfig() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  
  if (!projectId) {
    // Return a minimal config for build-time safety
    // This will allow the client to be created but queries will fail gracefully
    return {
      projectId: 'dummy-project-id',
      dataset,
      apiVersion: '2024-03-18' as const,
      useCdn: false,
    }
  }

  return {
    projectId,
    dataset,
    apiVersion: '2024-03-18' as const,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN,
    stega: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ? {
      studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
    } : undefined,
  }
}

// Check if Sanity is properly configured
export function isSanityConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
}

export const client = createClient(getClientConfig())

export const previewClient = createClient({
  ...getClientConfig(),
  token: process.env.SANITY_VIEWER_TOKEN,
})

// Write client for mutations (requires write token)
export const writeClient = createClient({
  ...getClientConfig(),
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN,
})







