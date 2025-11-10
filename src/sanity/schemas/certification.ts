import { defineType, defineField } from 'sanity'

export const certification = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Certification Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'issuer',
      type: 'string',
      title: 'Issuing Organization',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'issueDate',
      type: 'date',
      title: 'Issue Date',
    }),
    defineField({
      name: 'expiryDate',
      type: 'date',
      title: 'Expiry Date',
      description: 'Leave empty if certification does not expire',
    }),
    defineField({
      name: 'credentialId',
      type: 'string',
      title: 'Credential ID',
      description: 'License or credential number if applicable',
    }),
    defineField({
      name: 'credentialUrl',
      type: 'url',
      title: 'Credential URL',
      description: 'Link to verify the certification',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Issuer Logo',
      options: {
        hotspot: true,
      },
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
      subtitle: 'issuer',
      issueDate: 'issueDate',
    },
    prepare({ title, subtitle, issueDate }) {
      const year = issueDate ? new Date(issueDate).getFullYear() : ''
      return {
        title,
        subtitle: `${subtitle}${year ? ` • ${year}` : ''}`,
      }
    },
  },
})


