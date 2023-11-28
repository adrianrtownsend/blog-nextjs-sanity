import IndexPage, { type IndexPageProps } from 'components/IndexPage'
import {
  type Event,
  eventIndexQuery,
  type Post,
  postIndexQuery,
  type Settings,
  settingsQuery,
  type Todo,
  todoIndexQuery,
  type User,
  userIndexQuery,
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
  const [events, loadingEvents] = useLiveQuery<Event[]>(
    props.events,
    eventIndexQuery,
  )
  const [users, loadingUsers] = useLiveQuery<User[]>(
    props.users,
    userIndexQuery,
  )

  return (
    <IndexPage
      preview
      loading={
        loadingPosts ||
        loadingTodos ||
        loadingSettings ||
        loadingEvents ||
        loadingUsers
      }
      posts={posts || []}
      settings={settings || {}}
      todos={todos || []}
      events={events || []}
      users={users || []}
    />
  )
}
