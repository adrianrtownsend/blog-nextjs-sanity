import { defineField, defineType } from 'sanity'

import authorType from './author'

// schemas/like.ts
export default defineType({
  name: 'like',
  title: 'Like',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: authorType.name }],
    }),
  ],
})
