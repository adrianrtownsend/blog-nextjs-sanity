import DateTimePicker from 'components/DateTimePicker/DateTimePicker'
import { Controller } from 'react-hook-form'

import { formLayouts } from './layouts'

export const getFormField = (
  { name, label = '', validation = {}, type },
  register,
  errors,
  control,
  index,
) => {
  const fields = {
    input: (
      <div className="mt-10 gap-x-6 gap-y-8" key={index}>
        <label
          htmlFor="first-name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2">
          <input
            type="text"
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            {...register(name, validation)}
          />
          {errors.title && (
            <p className="text-red-600 p-1">{errors?.title?.message}</p>
          )}
        </div>
      </div>
    ),
    textarea: (
      <div className="col-span-2 mt-10 gap-x-6 gap-y-8" key={index}>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <textarea
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            rows={8}
            {...register(name, validation)}
          />
          {errors[name] && (
            <p className="text-red-600 p-1">{errors[name].message}</p>
          )}
        </div>
      </div>
    ),
    dateTime: (
      <div className="mt-10 gap-x-6 gap-y-8" key={index}>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <Controller
            name={name}
            control={control}
            render={({ field }) => <DateTimePicker {...field} />}
          />
          {errors[name] && (
            <p className="text-red-600 p-1">{errors[name].message}</p>
          )}
        </div>
      </div>
    ),
  }
  return fields[type] || fields['input']
}

export const getFormLayout = (type, register, errors, control) => {
  const fields = formLayouts.find((l) => l.name === type)['fields']

  return fields.map((f, index) =>
    getFormField(f, register, errors, control, index),
  )
}
