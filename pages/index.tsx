import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllPosts,
  getAllTodos,
  getClient,
  getSettings,
} from 'lib/sanity.client'
import { Post, Settings, Todo } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
  todos: Todo[]
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { posts, settings, draftMode, todos } = props

  if (draftMode) {
    return <PreviewIndexPage posts={posts} settings={settings} todos={todos} />
  }

  return <IndexPage posts={posts} settings={settings} todos={todos} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, posts = [], todos = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
    getAllTodos(client),
  ])

  return {
    props: {
      posts,
      todos,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
