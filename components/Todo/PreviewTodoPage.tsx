import TodoPage, { TodoPageProps } from 'components/Todo/TodoPage'
import {
  Settings,
  settingsQuery,
  type Todo,
  todoAndMoreStoriesQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewTodoPage(props: TodoPageProps) {
  const [{ todo: todoPreview, moreTodos }, loadingTodo] = useLiveQuery<{
    todo: Todo
    moreTodos: Todo[]
  }>(
    { todo: props.todo, moreTodos: props.moreTodos },
    todoAndMoreStoriesQuery,
    {
      slug: props.todo.slug,
    },
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <TodoPage
      preview
      loading={loadingTodo || loadingSettings}
      todo={todoPreview}
      moreTodos={moreTodos}
      settings={settings}
    />
  )
}
