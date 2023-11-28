import EventPage from 'components/Event/EventPage'
import PreviewEventPage from 'components/Event/PreviewEventPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllEventsSlugs,
  getClient,
  getEventAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { Event, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  event: Event
  moreEvents: Event[]
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, event, moreEvents, draftMode } = props

  if (draftMode) {
    return (
      <PreviewEventPage
        event={event}
        moreEvents={moreEvents}
        settings={settings}
      />
    )
  }

  return <EventPage event={event} moreEvents={moreEvents} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, { event, moreEvents = null }] = await Promise.all([
    getSettings(client),
    getEventAndMoreStories(client, params.slug),
  ])

  if (!event) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      event,
      moreEvents,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllEventsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/events/${slug}`) || [],
    fallback: 'blocking',
  }
}
