import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import HeroPost from 'components/HeroPost'
import IndexPageHead from 'components/IndexPageHead'
import MoreStories from 'components/Post/MoreStories'
import * as demo from 'lib/demo.data'
import type { Post, Settings, Todo, User } from 'lib/sanity.queries'

import Footer from './Footer/Footer'
import Header from './Header/Header'
import Hero from './Hero/Hero'
import ContentGridSection from './Sections/ContentGridSection'
import ItemSection from './Sections/ItemSection'
import HeroTodo from './Todo/HeroTodo'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  todos: Todo[]
  users: User[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings, todos, users } = props
  const [heroPost, ...morePosts] = posts || []
  const [heroTodo, ...moreTodos] = todos || []

  const sections = [
    {
      type: '_todo',
      items: todos,
      scrollId: 'todos',
      title: 'Todos',
      description: 'Basic Todo items',
    },
    {
      type: '_user',
      items: users,
      scrollId: 'users',
      title: 'Users',
      description: 'Active user accounts for app',
    },
    {
      type: '_post',
      items: posts,
      scrollId: 'posts',
      title: 'Posts',
      description: 'Basic Post items',
    },
  ]

  const itemSections = sections.map((section, index) => (
    <ItemSection key={index} {...section} />
  ))

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <Header />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          {heroTodo && (
            <HeroTodo
              title={heroTodo.title}
              content={heroTodo.content}
              date={heroPost.date}
              slug={heroTodo.slug}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={moreTodos} />}
          <Hero />
          <ContentGridSection />
          {itemSections}
        </Container>
        <Footer />
      </Layout>
    </>
  )
}
