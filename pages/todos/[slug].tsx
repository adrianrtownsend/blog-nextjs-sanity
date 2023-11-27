import PreviewTodoPage from 'components/Todo/PreviewTodoPage'
import TodoPage from 'components/Todo/TodoPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllTodosSlugs,
  getClient,
  getSettings,
  getTodoAndMoreStories,
} from 'lib/sanity.client'
import { Settings, Todo } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  todo: Todo
  moreTodos: Todo[]
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, todo, moreTodos, draftMode } = props

  if (draftMode) {
    return (
      <PreviewTodoPage todo={todo} moreTodos={moreTodos} settings={settings} />
    )
  }

  return <TodoPage todo={todo} moreTodos={moreTodos} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, { todo, moreTodos = null }] = await Promise.all([
    getSettings(client),
    getTodoAndMoreStories(client, params.slug),
  ])

  if (!todo) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      todo,
      moreTodos,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllTodosSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/todos/${slug}`) || [],
    fallback: 'blocking',
  }
}
