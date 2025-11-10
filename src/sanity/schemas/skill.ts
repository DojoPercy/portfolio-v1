import { defineType, defineField } from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Skill Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'DevOps', value: 'devops' },
          { title: 'Database', value: 'database' },
          { title: 'Auth & Payment', value: 'auth-payment' },
          { title: 'CMS & AI Tools', value: 'cms-ai' },
          { title: 'Mobile', value: 'mobile' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'proficiency',
      type: 'number',
      title: 'Proficiency Level',
      description: 'Level from 1 to 100',
      validation: (rule) => rule.min(1).max(100),
      initialValue: 50,
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon Name',
      description: 'Icon name from lucide-react or custom icon',
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
      title: 'name',
      subtitle: 'category',
      proficiency: 'proficiency',
    },
    prepare({ title, subtitle, proficiency }) {
      return {
        title,
        subtitle: `${subtitle} • ${proficiency}%`,
      }
    },
  },
})


