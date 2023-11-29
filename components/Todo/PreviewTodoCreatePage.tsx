import TodoCreatePage, {
  TodoCreatePageProps,
} from 'components/Todo/TodoCreatePage'
import { Settings, settingsQuery } from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewTodoCreatePage(props: TodoCreatePageProps) {
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <TodoCreatePage preview loading={loadingSettings} settings={settings} />
  )
}
