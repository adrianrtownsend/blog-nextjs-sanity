import { useUser } from '@auth0/nextjs-auth0/client'
import Loading from 'components/Animations/Loading'
import Form from 'components/Form/Form'
import Layout from 'components/Layouts/Layout'
import SectionSeparator from 'components/SectionSeparator'
import { createItem } from 'lib/sanity.mutations'
import type { Settings } from 'lib/sanity.queries'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export interface TodoCreatePageProps {
  preview?: boolean
  loading?: boolean
  settings: Settings
}

export default function TodoPage(props: TodoCreatePageProps) {
  const { preview, loading, settings } = props

  const { user } = useUser()
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      _type: 'todo',
      title: '',
      content: '',
    },
  })

  const createTodo = async (formData) => {
    try {
      // Create a new post
      const response = await createItem(formData, user.sub, 'title')
      if (response && response.slug?.current) {
        router.push(`/todos/${response.slug?.current}`)
      }
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <>
      {/* <TodoPageHead settings={settings} /> */}

      <Layout preview={preview} loading={loading}>
        {preview ? (
          <Loading />
        ) : (
          <>
            <article>
              <Form
                title="Create New Todo"
                content="Enter field values"
                type="todo"
                form={form}
                onSubmit={createTodo}
              />
            </article>
            <SectionSeparator />
          </>
        )}
      </Layout>
    </>
  )
}
