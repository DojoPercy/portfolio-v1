import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      title: 'Site Title',
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      title: 'Tagline',
      description: 'Main tagline for the site',
    }),
    defineField({
      name: 'missionStatement',
      type: 'text',
      title: 'Mission Statement',
    }),
    defineField({
      name: 'designPhilosophy',
      type: 'array',
      title: 'Design Philosophy',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'githubUsername',
      type: 'string',
      title: 'GitHub Username',
      description: 'Username for GitHub stats integration',
    }),
    defineField({
      name: 'voiceIntroFile',
      type: 'file',
      title: 'Voice Intro File',
      description: 'Audio file for voice introduction',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: 'ambientMusicFile',
      type: 'file',
      title: 'Ambient Music File',
      description: 'Audio file for ambient background music',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: 'socialLinks',
      type: 'object',
      title: 'Social Links',
      fields: [
        defineField({
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn',
        }),
        defineField({
          name: 'github',
          type: 'url',
          title: 'GitHub',
        }),
        defineField({
          name: 'twitter',
          type: 'url',
          title: 'Twitter/X',
        }),
        defineField({
          name: 'email',
          type: 'email',
          title: 'Email',
        }),
        defineField({
          name: 'website',
          type: 'url',
          title: 'Website',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'SEO Title',
        }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'Meta Description',
        }),
        defineField({
          name: 'ogImage',
          type: 'image',
          title: 'Open Graph Image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'noindex',
          type: 'boolean',
          title: 'Noindex',
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
  },
})



