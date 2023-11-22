import { defineField, defineType } from 'sanity'

// schemas/pet.ts
export default defineType({
  name: 'pet',
  type: 'document',
  title: 'Pet',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
  ],
})
