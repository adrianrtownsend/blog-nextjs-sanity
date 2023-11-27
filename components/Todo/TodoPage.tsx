import TodoCard from 'components/Cards/TodoCard'
import Form from 'components/Form/Form'
import ReactHookForm from 'components/Form/ReactHookForm'
import Layout from 'components/Layouts/Layout'
import SectionSeparator from 'components/SectionSeparator'
import MoreStories from 'components/Todo/MoreStories'
import TodoBody from 'components/Todo/TodoBody'
import TodoHeader from 'components/Todo/TodoHeader'
import TodoPageHead from 'components/Todo/TodoPageHead'
import TodoTitle from 'components/Todo/TodoTitle'
import type { Settings, Todo } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'

export interface TodoPageProps {
  preview?: boolean
  loading?: boolean
  todo: Todo
  moreTodos: Todo[]
  settings: Settings
}

const NO_TODOS: Todo[] = []

export default function TodoPage(props: TodoPageProps) {
  const { preview, loading, moreTodos = NO_TODOS, todo, settings } = props

  const slug = todo?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <TodoPageHead settings={settings} todo={todo} />

      <Layout preview={preview} loading={loading}>
        {preview && !todo ? (
          <TodoTitle>Loading…</TodoTitle>
        ) : (
          <>
            <article>
              <TodoCard />
              <Form />
              <ReactHookForm />
              <TodoHeader title={todo.title} date={todo.date} />
              <TodoBody content={todo.content} />
            </article>
            <SectionSeparator />
            {moreTodos?.length > 0 && <MoreStories todos={moreTodos} />}
          </>
        )}
      </Layout>
    </>
  )
}
