import { useUser } from '@auth0/nextjs-auth0/client'
import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import type { Event, Post, Settings, Todo, User } from 'lib/sanity.queries'

import * as demo from '../demo/demo'
import Loading from './Animations/Loading'
import Footer from './Footer/Footer'
import Hero from './Hero/Hero'
import Navbar from './Navbars/Navbar'
import ContentGridSection from './Sections/ContentGridSection'
import ItemSection from './Sections/ItemSection'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  events: Event[]
  posts: Post[]
  todos: Todo[]
  users: User[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, events, posts, settings, todos, users } = props
  const { user } = useUser()

  const sections = [
    {
      type: '_todo',
      items: user ? todos : demo.todos,
      scrollId: 'todos',
      title: 'Todos',
      description: 'Basic Todo items',
      createLink: '/todos/new',
      canAdd: !!user,
    },
    {
      type: '_user',
      items: user ? users : demo.users,
      scrollId: 'users',
      title: 'Users',
      description: 'Active user accounts for app',
      canAdd: false,
    },
    // {
    //   type: '_post',
    //   items: posts,
    //   scrollId: 'posts',
    //   title: 'Posts',
    //   description: 'Basic Post items',
    // createLink: '/todos/new'
    // },
    {
      type: '_event',
      items: user ? events : demo.events,
      scrollId: 'events',
      title: 'Events',
      description: 'Basic Event items',
      createLink: '/events/new',
      canAdd: !!user,
    },
  ]

  const itemSections = sections.map((section, index) => (
    <ItemSection key={index} {...section} />
  ))

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Navbar />
        <Hero />
        <ContentGridSection />
        {loading ? <Loading /> : <Container>{itemSections}</Container>}
        <Footer />
      </Layout>
    </>
  )
}
