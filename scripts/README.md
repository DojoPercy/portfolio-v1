# Sanity CMS Data Import

This directory contains scripts and data to populate your Sanity CMS with portfolio content from David Ojo's CV.

## Prerequisites

1. Ensure your Sanity project is configured with the following environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-write-token
   ```

2. Install required dependencies (if not already installed):
   ```bash
   npm install tsx --save-dev
   # or
   pnpm add -D tsx
   ```

## Import Methods

### Method 1: Programmatic Import (Recommended)

Run the TypeScript import script:

```bash
npx tsx scripts/sanity-data.ts
```

This will:
- Create or update site settings
- Import all 9 projects (5 featured, 4 additional)
- Import research items
- Skip existing documents to avoid duplicates

### Method 2: Manual Import via Sanity Studio

1. Start your Sanity Studio:
   ```bash
   npm run dev
   # Visit http://localhost:3000/admin
   ```

2. Manually create documents using the data from `sanity-data.ts`:
   - **Site Settings**: Create one document with the site settings data
   - **Projects**: Create 9 project documents
   - **Research**: Create research items

## Data Structure

### Site Settings
- **Site Title**: David Ojo
- **Tagline**: Full-Stack Software Developer with expertise in Next.js, NestJS and Flutter
- **Mission Statement**: Professional summary from CV
- **Social Links**: LinkedIn, GitHub, Email, Website
- **SEO**: Title and description for SEO

### Featured Projects (5)
1. Cloud-Based SaaS POS Platform
2. B2B Event & Ticket Management Platform
3. AI Property Search Agent
4. Content Management Platform with AI Workflows
5. KNUST Estate Management System

### Additional Projects (4)
6. Property Management Admin Dashboard
7. Washam - On-Demand Laundry Platform
8. Dating App Prototype
9. Client Web Projects

### Research Items
1. Passwordless Authentication Implementation

## Next Steps After Import

1. **Add Cover Images**: Upload cover images for each project in Sanity Studio
2. **Review Content**: Review and customize the imported content as needed
3. **Add Images**: Add screenshots, wireframes, or other visual assets to projects
4. **Verify Links**: Verify all social links and project URLs are correct
5. **Test Display**: Check that all content displays correctly on your portfolio site

## Troubleshooting

### Error: "SANITY_API_TOKEN is not set"
- Ensure you have set `SANITY_API_TOKEN` in your `.env.local` file
- The token must have write permissions

### Error: "Project already exists"
- This is normal - the script skips existing documents
- To update existing documents, delete them first or modify the script

### Error: "Cannot find module"
- Make sure you're running the script from the project root
- Install dependencies: `npm install` or `pnpm install`

## Notes

- The script uses slug-based duplicate detection
- Site settings are updated if they already exist
- Projects and research items are skipped if they already exist (based on slug)
- Cover images need to be uploaded manually through Sanity Studio
- Date fields are set to ISO 8601 format





