import { defineField, defineType } from 'sanity'

// schemas/event.ts
export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'string',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'string',
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'string',
    }),
    defineField({
      name: 'googleEventId',
      title: 'Google Event ID',
      type: 'string',
    }),
  ],
})
