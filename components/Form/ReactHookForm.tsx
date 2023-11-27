// components/ReactHookForm.js
import { useUser } from '@auth0/nextjs-auth0/client'
import { createPost, createTodo } from 'lib/sanity.mutations'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'

export interface IReactHookFormProps {
  item?: any
  layout?: any
}

export const getFormFields = ({ item }) => {
  const defaultValues = {
    title: item?.title,
    content: item?.content,
  }
  return { defaultValues }
}

const ReactHookForm = ({ item, layout }: IReactHookFormProps) => {
  console.log('item: ', item)
  const { defaultValues } = getFormFields({ item })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  })

  const { user } = useUser()
  const router = useRouter()

  const onSubmit = async (formData) => {
    try {
      // Create a new post
      console.log('formData: ', formData)
      // const response = await createTodo(formData, user.sub)
      // if (response && response.slug?.current) {
      //   router.push(`${layout.route}/${response.slug?.current}`)
      // }
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-xl py-16 ">
        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Edit Item
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Update item values:
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('title', {
                          required: 'Title is required',
                        })}
                      />
                      {errors.title && <p>{errors.title.message}</p>}
                    </div>
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Content
                    </label>
                    <div className="mt-2">
                      <textarea
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('content', {
                          required: 'Content is required',
                        })}
                      />
                      {errors.content && <p>{errors.content.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ReactHookForm
