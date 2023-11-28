import BlogMeta from 'components/BlogMeta'
import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'
import { Settings, User } from 'lib/sanity.queries'
import Head from 'next/head'

export interface UserPageHeadProps {
  settings: Settings
  user: User
}

export default function UserPageHead({ user }: UserPageHeadProps) {
  const { name, nickname } = user
  return (
    <Head>
      <title>{name || nickname}</title>
      <BlogMeta />
      {/* {user.picture?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(user.picture)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )} */}
    </Head>
  )
}
