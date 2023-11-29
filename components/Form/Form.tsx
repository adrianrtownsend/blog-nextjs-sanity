// components/TodoCreateReactHookForm.js

import { getFormLayout } from './useLayout'

const Form = ({ title = '', content = '', type, form, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <section>
      <div className="mx-auto w-full p-4 ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                {title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">{content}</p>
              {getFormLayout(type, register, errors)}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Form
