# Voice Intro Setup - Quick Start

## ✅ What's Been Set Up

Your portfolio is now configured to use voice intro and ambient music from Sanity CMS!

### Changes Made:
1. **Audio Integration**: Voice intro and ambient music now load from Sanity CMS
2. **Fallback Support**: If no audio is uploaded, it falls back to `/public/audio/` files
3. **File URL Handling**: Created utility functions to get file URLs from Sanity assets

## 🎤 How to Record Your Voice Intro

### Quick Steps:

1. **Record Your Voice**
   - Use your phone's voice recorder, Audacity, or any recording app
   - Keep it under 30 seconds
   - Speak clearly and at a comfortable pace

2. **Edit the Audio** (Optional but recommended)
   - Remove background noise
   - Normalize audio levels
   - Export as MP3 (128kbps or 192kbps)

3. **Upload to Sanity**
   - Go to `http://localhost:3000/admin`
   - Navigate to **Site Settings**
   - Find **Voice Intro File** field
   - Click **Upload** and select your audio file
   - Click **Publish**

4. **Test It**
   - Refresh your portfolio homepage
   - Click the audio button (volume icon) in bottom right
   - Voice intro should play automatically!

## 📝 Suggested Script

```
"System online. Hello, I'm David Ojo — a full-stack system architect and creative product designer. 
I build scalable web and mobile applications, design APIs, and integrate AI systems. 
Welcome to my digital portfolio."
```

## 🎵 Ambient Music

You can also upload ambient background music:
- Go to **Site Settings** → **Ambient Music File**
- Upload your background music (MP3 recommended)
- Music will loop continuously after the voice intro

## 📚 Detailed Guides

- **Full Guide**: See `VOICE_INTRO_GUIDE.md` for detailed recording tips
- **Quick Checklist**: See `scripts/record-voice-intro.md` for a quick reference

## 🛠️ Technical Details

### Files Modified:
- `src/app/layout.tsx` - Fetches audio files from Sanity
- `src/lib/sanity/queries.ts` - Updated to fetch asset URLs
- `src/lib/sanity/file.ts` - Utility functions for file URLs
- `src/components/providers/Providers.tsx` - Passes audio URLs to AudioController

### How It Works:
1. Layout fetches `siteSettings` from Sanity
2. Extracts `voiceIntroFile` and `ambientMusicFile` asset URLs
3. Passes URLs to `AudioController` component
4. Audio plays when user clicks the audio button

## 🎯 Next Steps

1. **Record your voice intro** using the script above
2. **Upload to Sanity** via the admin panel
3. **Test it** on your portfolio
4. **(Optional)** Upload ambient background music

That's it! Your voice intro will now play when visitors activate audio on your portfolio.

## ❓ Troubleshooting

### Audio not playing?
- Check browser console for errors
- Verify file uploaded successfully in Sanity
- Ensure file format is MP3 or WAV
- Check browser audio permissions

### Need to use a fallback file?
- Place `voice-intro.mp3` in `public/audio/` directory
- Place `ambient-loop.mp3` in `public/audio/` directory
- These will be used if no files are uploaded in Sanity

Happy recording! 🎤✨

