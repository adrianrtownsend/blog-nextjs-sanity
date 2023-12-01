export const formLayouts = [
  {
    name: 'todo',
    fields: [
      {
        name: 'title',
        label: 'Title',
        type: 'input',
        validation: {
          required: 'Title is required',
        },
      },
      {
        name: 'content',
        label: 'Content',
        type: 'textarea',
        validation: {
          required: 'Content is required',
        },
      },
      {
        name: 'dueDate',
        label: 'Due Date',
        type: 'dateTime',
      },
    ],
  },
  {
    name: 'event',
    fields: [
      {
        name: 'title',
        label: 'Title',
        type: 'input',
        validation: {
          required: 'Title is required',
        },
      },
      {
        name: 'content',
        label: 'Content',
        type: 'textarea',
        validation: {
          required: 'Content is required',
        },
      },
      {
        name: 'startDate',
        label: 'Start Date',
        type: 'dateTime',
      },
      {
        name: 'endDate',
        label: 'End Date',
        type: 'dateTime',
      },
    ],
  },
]
