import EventCard from 'components/Cards/EventCard'
import EventPageHead from 'components/Event/EventPageHead'
import ReactHookForm from 'components/Form/ReactHookForm'
import ItemHeader from 'components/Headers/ItemHeader'
import Layout from 'components/Layouts/Layout'
import SectionSeparator from 'components/SectionSeparator'
import type { Event, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'

export interface EventPageProps {
  preview?: boolean
  loading?: boolean
  event: Event
  moreEvents: Event[]
  settings: Settings
}

export default function EventPage(props: EventPageProps) {
  const { preview, loading, event, settings } = props

  const slug = event?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <EventPageHead settings={settings} event={event} />

      <Layout preview={preview} loading={loading}>
        {preview && !event ? (
          <title>Loading…</title>
        ) : (
          <>
            <article>
              <EventCard {...event} />
              <ItemHeader item={event} />
              <ReactHookForm item={event} />
            </article>
            <SectionSeparator />
          </>
        )}
      </Layout>
    </>
  )
}
