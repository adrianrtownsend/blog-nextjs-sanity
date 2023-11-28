import EventPage, { EventPageProps } from 'components/Event/EventPage'
import {
  type Event,
  eventAndMoreStoriesQuery,
  Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewEventPage(props: EventPageProps) {
  const [{ event: eventPreview, moreEvents }, loadingEvent] = useLiveQuery<{
    event: Event
    moreEvents: Event[]
  }>(
    { event: props.event, moreEvents: props.moreEvents },
    eventAndMoreStoriesQuery,
    {
      slug: props.event.slug,
    },
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <EventPage
      preview
      loading={loadingEvent || loadingSettings}
      event={eventPreview}
      moreEvents={moreEvents}
      settings={settings}
    />
  )
}
