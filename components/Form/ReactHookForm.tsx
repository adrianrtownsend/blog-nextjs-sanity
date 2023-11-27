// components/ReactHookForm.js
import { useUser } from '@auth0/nextjs-auth0/client'
import { createPost, createTodo } from 'lib/sanity.mutations'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { user } = useUser()
  const router = useRouter()

  const onSubmit = async (formData) => {
    try {
      // Create a new post
      const response = await createTodo(formData, user.sub)
      if (response && response.slug?.current) {
        router.push(`/todos/${response.slug?.current}`)
      }
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Title:
        <input
          type="text"
          {...register('title', { required: 'Title is required' })}
        />
      </label>
      {errors.title && <p>{errors.title.message}</p>}
      <br />
      <label>
        Content:
        <textarea
          {...register('content', { required: 'Content is required' })}
        />
      </label>
      {errors.content && <p>{errors.content.message}</p>}
      <br />
      <button type="submit">Create Post</button>
    </form>
  )
}

export default ReactHookForm
