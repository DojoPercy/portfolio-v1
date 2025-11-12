import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      type: 'string',
      title: 'Author',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'project',
      type: 'reference',
      title: 'Project',
      to: [{ type: 'project' }],
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
      description: "Author's role or title",
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'quote',
    },
  },
})










