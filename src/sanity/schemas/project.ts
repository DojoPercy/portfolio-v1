import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Short Summary',
      description: 'Brief description for cards and previews',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Full project description',
    }),
    defineField({
      name: 'techStack',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Tech Stack',
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Your Role',
      description: 'e.g., Full Stack Developer, Product Architect',
    }),
    defineField({
      name: 'impact',
      type: 'string',
      title: 'Impact',
      description: 'Key impact or metric, e.g., "Reduced load time by 30%"',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'process',
      type: 'array',
      title: 'Process',
      of: [{ type: 'block' }],
      description: 'Development process and methodology',
    }),
    defineField({
      name: 'problemStatement',
      type: 'text',
      title: 'Problem Statement',
      description: 'What problem did this project solve?',
    }),
    defineField({
      name: 'researchInsights',
      type: 'array',
      title: 'Research & Insights',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'outcome',
      type: 'text',
      title: 'Outcome',
      description: 'Final results and achievements',
    }),
    defineField({
      name: 'metrics',
      type: 'object',
      title: 'Metrics',
      fields: [
        defineField({
          name: 'before',
          type: 'string',
          title: 'Before',
        }),
        defineField({
          name: 'after',
          type: 'string',
          title: 'After',
        }),
        defineField({
          name: 'improvement',
          type: 'string',
          title: 'Improvement',
        }),
      ],
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      initialValue: false,
    }),
    defineField({
      name: 'githubUrl',
      type: 'url',
      title: 'GitHub Repository URL',
      description: 'Link to the project repository on GitHub',
    }),
    defineField({
      name: 'liveUrl',
      type: 'url',
      title: 'Live Project URL',
      description: 'Link to the live/demo version of the project',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'role',
    },
  },
})







