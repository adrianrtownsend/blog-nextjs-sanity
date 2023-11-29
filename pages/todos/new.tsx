import PreviewTodoCreatePage from 'components/Todo/PreviewTodoCreatePage'
import TodoCreatePage from 'components/Todo/TodoCreatePage'
import { writeToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  settings?: Settings
}
export default function ProjectSlugRoute(props: PageProps) {
  const { settings, draftMode } = props

  if (draftMode) {
    return <PreviewTodoCreatePage settings={settings} />
  }

  return <TodoCreatePage settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: writeToken } : undefined)

  const [settings] = await Promise.all([getSettings(client)])

  return {
    props: {
      settings,
      draftMode,
      token: draftMode ? writeToken : '',
    },
  }
}
