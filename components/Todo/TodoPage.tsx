import { PencilIcon } from '@heroicons/react/20/solid'
import FormAccordion from 'components/Accordion/FormAccordion'
import Loading from 'components/Animations/Loading'
import TodoCard from 'components/Cards/TodoCard'
import Form from 'components/Form/Form'
import ItemHeader from 'components/Headers/ItemHeader'
import Layout from 'components/Layouts/Layout'
import SectionSeparator from 'components/SectionSeparator'
import TodoPageHead from 'components/Todo/TodoPageHead'
import { deleteItem, editItem } from 'lib/sanity.mutations'
import type { Settings, Todo } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export interface TodoPageProps {
  preview?: boolean
  loading?: boolean
  todo: Todo
  moreTodos: Todo[]
  settings: Settings
}

export default function TodoPage(props: TodoPageProps) {
  const { preview, loading, todo, settings } = props

  const router = useRouter()

  const slug = todo?.slug

  if (!slug && !preview) {
    notFound()
  }

  const form = useForm({
    defaultValues: {
      title: todo?.title ?? '',
      content: todo?.content ?? '',
    },
  })

  const editTodo = async (formData) =>
    editItem({ _id: todo._id, ...formData })
      .then(() => router.reload())
      .catch((err) => {
        console.error('Error creating todo:', err)
      })

  const toggleTodo = () =>
    editItem({ _id: todo._id, completed: !todo.completed })
      .then(() => router.reload())
      .catch((err) => {
        console.error('Error creating todo:', err)
      })

  const deleteTodo = () =>
    deleteItem(todo._id)
      .then(() => router.push('/'))
      .catch((err) => {
        console.error('Error deleting todo:', err)
      })

  return (
    <>
      <TodoPageHead settings={settings} todo={todo} />

      <Layout preview={preview} loading={loading}>
        {preview && !todo ? (
          <Loading />
        ) : (
          <>
            <article>
              <TodoCard {...todo} toggleTodo={toggleTodo} />
              <ItemHeader item={todo} onConfirm={deleteTodo} />
              <FormAccordion
                label={
                  <span className="inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
                    <PencilIcon
                      className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Edit
                  </span>
                }
              >
                <Form
                  title="Edit Todo"
                  type="todo"
                  content="Update field values"
                  form={form}
                  onSubmit={editTodo}
                />
              </FormAccordion>
            </article>
            <SectionSeparator />
          </>
        )}
      </Layout>
    </>
  )
}
