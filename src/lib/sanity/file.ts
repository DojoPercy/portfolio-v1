import { client } from './client'

/**
 * Get the URL for a Sanity file asset
 * @param file - The file object from Sanity (with asset._ref)
 * @returns The URL to the file asset or null if not found
 */
export async function getFileUrl(file: any): Promise<string | null> {
  if (!file?.asset?._ref) {
    return null
  }

  try {
    // Fetch the asset document from Sanity
    const asset = await client.fetch(`*[_id == $id][0]`, { id: file.asset._ref })
    
    if (!asset || !asset.url) {
      return null
    }

    // Return the asset URL
    return asset.url
  } catch (error) {
    console.error('Error fetching file URL from Sanity:', error)
    return null
  }
}

/**
 * Get the file URL synchronously (for use in server components)
 * Constructs the URL directly from the asset reference
 * @param file - The file object from Sanity (with asset._ref)
 * @returns The URL to the file asset or null if not found
 */
export function getFileUrlSync(file: any): string | null {
  if (!file?.asset?._ref) {
    return null
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  
  if (!projectId) {
    return null
  }

  // Sanity file assets have a reference like: file-{id}-{extension}
  // Extract the file ID and extension
  const fileRef = file.asset._ref
  const parts = fileRef.split('-')
  
  if (parts.length < 3) {
    return null
  }

  // Remove 'file' prefix and get the ID and extension
  const fileId = parts.slice(1, -1).join('-') // Everything except first and last
  const extension = parts[parts.length - 1] // Last part is the extension

  // Construct the CDN URL
  // Format: https://cdn.sanity.io/files/{projectId}/{dataset}/{fileId}.{extension}
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`
}

/**
 * Get the file URL with optional download parameter (sync version)
 * @param file - The file object from Sanity
 * @param download - Whether to force download
 * @returns The URL to the file asset
 */
export function getFileUrlWithDownload(file: any, download: boolean = false): string | null {
  const url = getFileUrlSync(file)
  if (!url) return null
  
  return download ? `${url}?dl=` : url
}

