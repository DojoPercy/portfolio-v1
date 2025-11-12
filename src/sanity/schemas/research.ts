import { defineType, defineField } from 'sanity'

export const research = defineType({
  name: 'research',
  title: 'Research',
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
      name: 'hypothesis',
      type: 'text',
      title: 'Hypothesis',
      description: 'Research hypothesis or question',
    }),
    defineField({
      name: 'methodology',
      type: 'array',
      title: 'Methodology',
      of: [{ type: 'block' }],
      description: 'Research methodology and approach',
    }),
    defineField({
      name: 'outcome',
      type: 'text',
      title: 'Outcome',
      description: 'Research results and findings',
    }),
    defineField({
      name: 'tools',
      type: 'array',
      title: 'Tools',
      of: [{ type: 'string' }],
      description: 'Tools and technologies used',
    }),
    defineField({
      name: 'sketches',
      type: 'array',
      title: 'Sketches',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'wireframes',
      type: 'array',
      title: 'Wireframes',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'finalUI',
      type: 'array',
      title: 'Final UI',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Date',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'hypothesis',
    },
  },
})










