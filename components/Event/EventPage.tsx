import { PencilIcon } from '@heroicons/react/20/solid'
import FormAccordion from 'components/Accordion/FormAccordion'
import EventCard from 'components/Cards/EventCard'
import EventPageHead from 'components/Event/EventPageHead'
import Form from 'components/Form/Form'
// import ReactHookForm from 'components/Form/ReactHookForm'
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

  const editEvent = async (formData) => {
    try {
      console.log('formData: ', formData)
      const res = await editItem({ _id: event._id, ...formData })
      console.log('done: ', res)
    } catch (error) {
      console.error('error with post: ', error)
    }
  }

  const deleteEvent = async () => {
    try {
      await deleteItem(event._id)
      router.push('/')
    } catch (error) {}
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
              <ItemHeader item={event} onConfirm={deleteEvent} />
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
            </article>
            <SectionSeparator />
          </>
        )}
      </Layout>
    </>
  )
}
