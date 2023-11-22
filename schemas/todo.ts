import { defineField, defineType } from 'sanity'

import authorType from './author'

export default defineType({
  name: 'todo',
  title: 'Todo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'string',
    }),
    defineField({
      name: 'dueDate',
      title: 'Due Date',
      type: 'datetime',
    }),
    defineField({
      name: 'completed',
      title: 'Completed',
      type: 'boolean',
    }),
    defineField({
      name: 'favorited',
      title: 'Favorited',
      type: 'boolean',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: authorType.name }],
    }),
  ],
})
