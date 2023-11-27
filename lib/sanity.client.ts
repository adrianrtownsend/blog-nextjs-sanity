import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
  writeToken,
} from 'lib/sanity.api'
import {
  type Post,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postIndexQuery,
  postSlugsQuery,
  type Settings,
  settingsQuery,
  type Todo,
  todoAndMoreStoriesQuery,
  todoBySlugQuery,
  todoIndexQuery,
  todoSlugsQuery,
  type User,
  userAndMoreStoriesQuery,
  userBySlugQuery,
  userByUserIdQuery,
  userIndexQuery,
  userSlugsQuery,
} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(
  preview?: { token: string },
  mutate?: { token: string },
): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    encodeSourceMap: preview?.token ? true : false,
    studioUrl,
  })
  if (mutate) {
    if (!mutate.token) {
      throw new Error('You must provide a token to update items')
    }
    return client.withConfig({
      token: mutate.token,
    })
  } else if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}

export const getSanityImageConfig = () => getClient()

export async function getSettings(client: SanityClient): Promise<Settings> {
  return (await client.fetch(settingsQuery)) || {}
}

/**
 * Posts
 */

export async function getAllPosts(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(postIndexQuery)) || []
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getPostBySlug(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
}

export async function getPostAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(postAndMoreStoriesQuery, { slug })
}

/**
 * Todos
 */

export async function getAllTodos(client: SanityClient): Promise<Todo[]> {
  return (await client.fetch(todoIndexQuery)) || []
}

export async function getAllTodosSlugs(): Promise<Pick<Todo, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(todoSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getTodoBySlug(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return (await client.fetch(todoBySlugQuery, { slug })) || ({} as any)
}

export async function getTodoAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ todo: Todo; moreTodos: Todo[] }> {
  return await client.fetch(todoAndMoreStoriesQuery, { slug })
}

/**
 * Users
 */

export async function getAllUsers(client: SanityClient): Promise<User[]> {
  return (await client.fetch(userIndexQuery)) || []
}

export async function getAllUsersSlugs(): Promise<Pick<User, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(userSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getUserBySlug(
  client: SanityClient,
  slug: string,
): Promise<User> {
  return (await client.fetch(userBySlugQuery, { slug })) || ({} as any)
}

export async function getUserByUserId(user_id: string): Promise<void | User> {
  const query =
    '*[_type == "user" && user_id == $user_id] {_id, name, nickname, picture, email, user_id, type, _updatedAt}'
  const params = { user_id }
  const client = getClient()

  const res = await client.fetch(query, params)
  return res[0]
}

export async function getUserAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ user: User; moreTodos: User[] }> {
  return await client.fetch(userAndMoreStoriesQuery, { slug })
}
