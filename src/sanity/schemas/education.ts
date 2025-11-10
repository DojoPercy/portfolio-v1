import { defineType, defineField } from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'degree',
      type: 'string',
      title: 'Degree',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'institution',
      type: 'string',
      title: 'Institution',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      title: 'Start Date',
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      title: 'End Date / Graduation Date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'grade',
      type: 'string',
      title: 'Grade/Honors',
      description: 'e.g., First Class, GPA 3.8, etc.',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'courses',
      type: 'array',
      title: 'Relevant Courses',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'degree',
      subtitle: 'institution',
      endDate: 'endDate',
      grade: 'grade',
    },
    prepare({ title, subtitle, endDate, grade }) {
      const year = endDate ? new Date(endDate).getFullYear() : ''
      return {
        title,
        subtitle: `${subtitle}${grade ? ` • ${grade}` : ''}${year ? ` • ${year}` : ''}`,
      }
    },
  },
})


