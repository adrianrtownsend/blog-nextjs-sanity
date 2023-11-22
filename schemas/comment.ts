import { defineField, defineType } from 'sanity'

import authorType from './author'

// schemas/comment.ts
export default defineType({
  name: 'comment',
  title: 'Comment',
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
  ],
})
