import BlogMeta from 'components/BlogMeta'
import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'
import { Settings, Todo } from 'lib/sanity.queries'
import Head from 'next/head'

export interface TodoPageHeadProps {
  settings?: Settings
  todo?: Todo
}

export default function TodoPageHead({ settings, todo }: TodoPageHeadProps) {
  const title = settings.title ?? demo.title
  return (
    <Head>
      <title>{todo.title ? `${todo.title} | ${title}` : title}</title>
      <BlogMeta />
      {todo.coverImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(todo.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
    </Head>
  )
}
