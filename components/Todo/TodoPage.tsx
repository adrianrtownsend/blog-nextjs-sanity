import TodoCard from 'components/Cards/TodoCard'
import ReactHookForm from 'components/Form/ReactHookForm'
import ItemHeader from 'components/Headers/ItemHeader'
import Layout from 'components/Layouts/Layout'
import SectionSeparator from 'components/SectionSeparator'
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

export default function TodoPage(props: TodoPageProps) {
  const { preview, loading, todo, settings } = props

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
              <ItemHeader />
              <TodoCard {...todo} />
              <ReactHookForm item={todo} />
            </article>
            <SectionSeparator />
          </>
        )}
      </Layout>
    </>
  )
}
