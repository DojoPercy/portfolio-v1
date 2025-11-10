# Voice Intro Recording Guide

This guide will help you record and upload a professional voice intro for your portfolio.

## Recording Tips

### 1. **Script Suggestion**
Here's a suggested script based on your portfolio:

```
"System online. Hello, I'm David Ojo — a full-stack system architect and creative product designer. 
I build scalable web and mobile applications, design APIs, and integrate AI systems. 
Welcome to my digital portfolio."
```

Feel free to customize this script to match your personality and style!

### 2. **Recording Setup**

#### Best Practices:
- **Quiet Environment**: Record in a quiet room with minimal background noise
- **Good Microphone**: Use a quality microphone (even a phone microphone can work if it's good quality)
- **Distance**: Keep about 6-8 inches from the microphone
- **Pop Filter**: Use a pop filter or speak slightly off-axis to avoid plosives
- **Sample Rate**: Record at 44.1kHz or 48kHz
- **Format**: MP3 or WAV format (MP3 is recommended for web)
- **Duration**: Keep it under 30 seconds for best user experience

#### Recording Tools:
- **Online**: 
  - [Audacity](https://www.audacityteam.org/) (Free, desktop)
  - [Voice Recorder](https://online-voice-recorder.com/) (Free, browser-based)
  - [GarageBand](https://www.apple.com/mac/garageband/) (Mac, free)
  - [Adobe Audition](https://www.adobe.com/products/audition.html) (Paid, professional)
  
- **Mobile Apps**:
  - Voice Memos (iOS)
  - Voice Recorder (Android)
  - [Rev Voice Recorder](https://www.rev.com/voice-recorder) (Free, cross-platform)

### 3. **Audio Processing**

#### Basic Editing:
1. **Normalize**: Set peak level to -3dB to -6dB (prevents clipping)
2. **Noise Reduction**: Remove background noise if present
3. **EQ**: Slight boost in presence (2-4kHz) for clarity
4. **Compression**: Light compression to even out volume
5. **Export**: Export as MP3 at 128kbps or 192kbps

#### Quick Audacity Steps:
1. Record your voice
2. Select the entire track
3. Effect → Normalize (set to -3dB)
4. Effect → Noise Reduction (if needed)
5. File → Export → Export as MP3
6. Choose quality: 128kbps or 192kbps

### 4. **Uploading to Sanity CMS**

#### Option 1: Through Sanity Studio (Recommended)
1. Go to your portfolio admin: `http://localhost:3000/admin`
2. Navigate to **Site Settings**
3. Find the **Voice Intro File** field
4. Click **Upload** and select your audio file
5. Wait for the upload to complete
6. Click **Publish**

#### Option 2: Programmatically
If you prefer to upload via script, you can use the Sanity CLI or API.

### 5. **Testing**

After uploading:
1. Refresh your portfolio homepage
2. Click the audio button (volume icon) in the bottom right
3. The voice intro should play automatically
4. Check that:
   - Audio is clear and not distorted
   - Volume is appropriate (not too loud or quiet)
   - Timing feels natural
   - Background music fades in after voice intro

### 6. **Fallback**

If no voice intro is uploaded in Sanity, the system will fall back to:
- `/public/audio/voice-intro.mp3` (if it exists)

You can also place a fallback file in the `public/audio/` directory.

## Example Script Variations

### Professional & Technical:
```
"Hello, I'm David Ojo. Full-stack developer, system architect, and AI integration specialist. 
I design and build scalable applications that solve real-world problems. 
Explore my work and let's create something amazing together."
```

### Friendly & Approachable:
```
"Hey there! I'm David Ojo, and I love building things with code. 
From sleek web apps to powerful APIs, I turn ideas into reality. 
Take a look around and see what I've been working on!"
```

### Creative & Bold:
```
"System booting... Welcome. I'm David Ojo — architect of digital experiences, 
builder of scalable systems, and creator of innovative solutions. 
Let's explore what's possible."
```

## Troubleshooting

### Audio not playing?
- Check browser console for errors
- Verify the file URL is correct in Sanity
- Ensure the file format is supported (MP3, WAV, OGG)
- Check browser audio permissions

### Audio too quiet/loud?
- Re-record with better gain settings
- Use audio editing software to normalize
- Adjust the volume in your recording software before export

### Audio cuts off?
- Check file upload completed successfully
- Verify file is not corrupted
- Try re-exporting the audio file

## Need Help?

If you need assistance with recording or uploading your voice intro, feel free to:
1. Check the Sanity documentation for file uploads
2. Test with a short sample first
3. Use online tools like Audacity for easy editing

Happy recording! 🎤

