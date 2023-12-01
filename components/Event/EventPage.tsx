import { useUser } from '@auth0/nextjs-auth0/client'
import { PencilIcon } from '@heroicons/react/20/solid'
import FormAccordion from 'components/Accordion/FormAccordion'
import Loading from 'components/Animations/Loading'
import EventCard from 'components/Cards/EventCard'
import EventPageHead from 'components/Event/EventPageHead'
import Form from 'components/Form/Form'
import ItemHeader from 'components/Headers/ItemHeader'
import Layout from 'components/Layouts/Layout'
import SectionSeparator from 'components/SectionSeparator'
import { deleteItem, editItem } from 'lib/sanity.mutations'
import type { Event, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export interface EventPageProps {
  preview?: boolean
  loading?: boolean
  event: Event
  moreEvents: Event[]
  settings: Settings
}

export default function EventPage(props: EventPageProps) {
  const { preview, loading, event, settings } = props

  const { user } = useUser()
  const router = useRouter()

  const slug = event?.slug

  if (!slug && !preview) {
    notFound()
  }

  const form = useForm({
    defaultValues: {
      title: event.title ?? '',
      content: event.content ?? '',
      startDate: event.startDate ?? '',
      endDate: event.endDate ?? '',
    },
  })

  const editEvent = (formData) =>
    editItem({ _id: event._id, ...formData })
      .then(() => router.reload())
      .catch((err) => {
        console.error('Error creating event:', err)
      })

  const deleteEvent = () =>
    deleteItem(event._id)
      .then(() => router.push('/'))
      .catch((err) => {
        console.error('Error deleting event:', err)
      })

  if (!user) return <Loading />

  return (
    <>
      <EventPageHead settings={settings} event={event} />

      <Layout preview={preview} loading={loading}>
        {preview && !event ? (
          <Loading />
        ) : (
          <>
            <article>
              <EventCard {...event} />
              <ItemHeader item={event} onConfirm={deleteEvent} />
              {event.user._id === user.sub && (
                <FormAccordion
                  label={
                    <span className="inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
                      <PencilIcon
                        className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Edit
                    </span>
                  }
                >
                  <Form
                    title="Edit Event"
                    type="event"
                    content="Update field values"
                    form={form}
                    onSubmit={editEvent}
                  />
                </FormAccordion>
              )}
            </article>
            <SectionSeparator />
          </>
        )}
      </Layout>
    </>
  )
}
