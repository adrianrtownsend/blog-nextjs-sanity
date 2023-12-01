import BlogMeta from 'components/BlogMeta'
import * as demo from 'lib/demo.data'
import { Event, Settings } from 'lib/sanity.queries'
import Head from 'next/head'

export interface EventPageHeadProps {
  settings: Settings
  event: Event
}

export default function EventPageHead({ settings, event }: EventPageHeadProps) {
  const title = settings.title ?? demo.title
  return (
    <Head>
      <title>{event.title ? `${event.title} | ${title}` : title}</title>
      <BlogMeta />
    </Head>
  )
}
