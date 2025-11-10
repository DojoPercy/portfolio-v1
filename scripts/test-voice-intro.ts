/**
 * Test script to verify voice intro file is loaded from Sanity
 * Run with: pnpm tsx scripts/test-voice-intro.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { client } from '../src/lib/sanity'
import { getSiteSettings } from '../src/lib/sanity/queries'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  config({ path: resolve(process.cwd(), '.env') })
}

async function testVoiceIntro() {
  try {
    console.log('🔍 Testing voice intro file from Sanity...\n')
    
    const siteSettings = await client.fetch(getSiteSettings)
    
    if (!siteSettings) {
      console.error('❌ No site settings found in Sanity')
      return
    }
    
    console.log('✅ Site settings found\n')
    
    // Check voice intro file
    if (siteSettings.voiceIntroFile?.asset?.url) {
      console.log('✅ Voice intro file found!')
      console.log(`   URL: ${siteSettings.voiceIntroFile.asset.url}`)
      console.log(`   Filename: ${siteSettings.voiceIntroFile.asset.originalFilename || 'N/A'}`)
      console.log(`   Size: ${siteSettings.voiceIntroFile.asset.size ? (siteSettings.voiceIntroFile.asset.size / 1024).toFixed(2) + ' KB' : 'N/A'}`)
      console.log(`   MIME Type: ${siteSettings.voiceIntroFile.asset.mimeType || 'N/A'}\n`)
      
      // Test if URL is accessible
      try {
        const response = await fetch(siteSettings.voiceIntroFile.asset.url, { method: 'HEAD' })
        if (response.ok) {
          console.log('✅ Voice intro file is accessible and ready to play!\n')
        } else {
          console.warn(`⚠️  Voice intro file returned status ${response.status}`)
        }
      } catch (error) {
        console.error('❌ Error accessing voice intro file:', error)
      }
    } else {
      console.log('⚠️  No voice intro file uploaded in Sanity')
      console.log('   You can upload it in Sanity Studio at: /admin\n')
    }
    
    // Check ambient music file
    if (siteSettings.ambientMusicFile?.asset?.url) {
      console.log('✅ Ambient music file found!')
      console.log(`   URL: ${siteSettings.ambientMusicFile.asset.url}`)
      console.log(`   Filename: ${siteSettings.ambientMusicFile.asset.originalFilename || 'N/A'}`)
      console.log(`   Size: ${siteSettings.ambientMusicFile.asset.size ? (siteSettings.ambientMusicFile.asset.size / 1024).toFixed(2) + ' KB' : 'N/A'}`)
      console.log(`   MIME Type: ${siteSettings.ambientMusicFile.asset.mimeType || 'N/A'}\n`)
    } else {
      console.log('ℹ️  No ambient music file uploaded (optional)\n')
    }
    
    console.log('✨ Test complete!')
    console.log('\nNext steps:')
    console.log('1. Make sure your dev server is running: pnpm dev')
    console.log('2. Visit http://localhost:3000')
    console.log('3. Click the audio button (volume icon) in the bottom right')
    console.log('4. The voice intro should play automatically!')
    
  } catch (error) {
    console.error('❌ Error testing voice intro:', error)
    process.exit(1)
  }
}

testVoiceIntro()

