import { defineField, defineType } from 'sanity'

import authorType from './author'

// schemas/notification.ts
export default defineType({
  name: 'notification',
  title: 'Notification',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'string',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: authorType.name }],
    }),
    defineField({
      name: 'read',
      title: 'Read',
      type: 'boolean',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
    }),
    defineField({
      name: 'socketId',
      title: 'Socket ID',
      type: 'string',
    }),
  ],
})
