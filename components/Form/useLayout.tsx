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
    ],
  },
]

export const getFormField = (
  { name, label = '', validation = {}, type },
  register,
  errors,
) => {
  const fields = {
    input: (
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </label>
          <div className="mt-2">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              {...register(name, validation)}
            />
            {errors.title && <p>{errors?.title?.message}</p>}
          </div>
        </div>
      </div>
    ),
    textarea: (
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </label>
          <div className="mt-2">
            <textarea
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              {...register(name, validation)}
            />
            {errors[name] && <p>{errors[name].message}</p>}
          </div>
        </div>
      </div>
    ),
  }
  return fields[type] || fields['input']
}

export const getFormLayout = (type, register, errors) => {
  const fields = formLayouts.find((l) => l.name === type)['fields']

  return fields.map((f, index) => (
    <div key={index}>{getFormField(f, register, errors)}</div>
  ))
}
