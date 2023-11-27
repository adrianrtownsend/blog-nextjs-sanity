import IndexPage, { type IndexPageProps } from 'components/IndexPage'
import {
  type Post,
  postIndexQuery,
  type Settings,
  settingsQuery,
  type Todo,
  todoIndexQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewIndexPage(props: IndexPageProps) {
  const [posts, loadingPosts] = useLiveQuery<Post[]>(
    props.posts,
    postIndexQuery,
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )
  const [todos, loadingTodos] = useLiveQuery<Todo[]>(
    props.todos,
    todoIndexQuery,
  )

  return (
    <IndexPage
      preview
      loading={loadingPosts || loadingTodos || loadingSettings}
      posts={posts || []}
      settings={settings || {}}
      todos={todos || []}
    />
  )
}
