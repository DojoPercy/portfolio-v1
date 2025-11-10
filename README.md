# David Ojo Portfolio

A modern, professional portfolio website built with Next.js 15, Sanity CMS, and cutting-edge animations.

## Features

- 🎨 Neon light aesthetic with glassmorphism effects
- 🎭 Fluid 3D card animations
- 🎵 Hybrid audio system (voice intro + ambient music)
- 📊 Live GitHub stats integration
- 📝 Sanity CMS for content management
- 🎯 Responsive design
- ♿ Accessibility focused
- 🚀 Performance optimized

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Sanity.io
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Sanity account
- GitHub account (for stats)

### Installation

1. Clone the repository:
```bash
cd david-portfolio
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
NEXT_PUBLIC_GITHUB_USERNAME=dojopercy
```

5. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

7. Access Sanity Studio at [http://localhost:3000/admin](http://localhost:3000/admin)

## Project Structure

```
david-portfolio/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   ├── ui/             # Base UI components
│   │   ├── layout/         # Layout components
│   │   ├── sections/       # Page sections
│   │   └── audio/          # Audio components
│   ├── lib/                # Utilities and helpers
│   │   └── sanity/         # Sanity client and queries
│   ├── sanity/             # Sanity schemas
│   ├── stores/             # Zustand stores
│   └── styles/             # Global styles
├── public/
│   └── audio/              # Audio files
└── sanity.config.ts        # Sanity configuration
```

## Sanity CMS Setup

1. Create a new Sanity project at [sanity.io](https://sanity.io)
2. Get your project ID and dataset name
3. Create an API token with read permissions
4. Add your credentials to `.env.local`
5. Start adding content in the Sanity Studio at `/admin`

## Content Management

### Adding Projects

1. Go to `/admin` in your browser
2. Click "Project" in the sidebar
3. Fill in the project details:
   - Title, slug, description
   - Tech stack
   - Role and impact
   - Cover image
   - Process and case study content

### Adding Research

1. Go to "Research" in Sanity Studio
2. Add hypothesis, methodology, and outcome
3. Upload sketches, wireframes, and final UI images

### Adding Writings

1. Go to "Writing" in Sanity Studio
2. Add title, slug, body content
3. Set reading time and tags
4. Add cover image

## Audio Setup

1. Record or obtain voice intro (15-20 seconds)
2. Find or create ambient music loop (60-90 seconds)
3. Place files in `public/audio/`:
   - `voice-intro.mp3`
   - `ambient-loop.mp3`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `NEXT_PUBLIC_GITHUB_USERNAME`
- `GITHUB_TOKEN` (optional, for higher rate limits)
- `NEXT_PUBLIC_SITE_URL`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Design System

See `src/design-system/DESIGN_SYSTEM.md` for detailed design tokens and guidelines.

## Performance

- Lighthouse Performance: Target ≥ 90
- Lighthouse Accessibility: Target ≥ 90
- Lighthouse Best Practices: Target ≥ 95

## License

Private - All rights reserved

## Contact

David Ojo - Full-Stack System Architect







