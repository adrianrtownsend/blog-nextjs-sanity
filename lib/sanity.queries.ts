import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

const todoFields = groq`
  _id,
  title,
  date,
  content,
  _updatedAt,
  completed,
  favorited,
  authUser_sub,
  "slug": slug.current,
  "author": author->{name, picture},
  "user": user->{name, picture, nickname},
`

const userFields = groq`
  _id,
  name,
  nickname,
  picture,
  email,
  user_id,
  type,
  _updatedAt,
`

const eventFields = groq`
  _id,
  title,
  date,
  startDate,
  endDate,
  content,
  _updatedAt,
  "slug": slug.current,
  "user": user->{name, picture, nickname},
`

export const settingsQuery = groq`*[_type == "settings"][0]`

/**
 * Post Queries
 */

export const postIndexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

/**
 * Todo Queries
 */
export const todoIndexQuery = groq`
*[_type == "todo"] | order(date desc, _updatedAt desc) {
  ${todoFields}
}`

export const todoAndMoreStoriesQuery = groq`
{
  "todo": *[_type == "todo" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${todoFields}
  },
  "moreTodos": *[_type == "todo" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${todoFields}
  }
}`

export const todoSlugsQuery = groq`
*[_type == "todo" && defined(slug.current)][].slug.current
`

export const todoBySlugQuery = groq`
*[_type == "todo" && slug.current == $slug][0] {
  ${todoFields}
}
`

/**
 * User Queries
 */
export const userIndexQuery = groq`
*[_type == "user"] | order(date desc, _updatedAt desc) {
  ${userFields}
}`

export const userAndMoreStoriesQuery = groq`
{
  "user": *[_type == "user" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${userFields}
  },
  "moreUsers": *[_type == "user" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${userFields}
  }
}`

export const userSlugsQuery = groq`
*[_type == "user" && defined(slug.current)][].slug.current
`

export const userBySlugQuery = groq`
*[_type == "user" && slug.current == $slug][0] {
  ${userFields}
}
`

export const userByUserIdQuery = groq`
*[_type == "user" && user_id.current == $user_id][0] {
  ${userFields}
}
`

/**
 * Event Queries
 */
export const eventIndexQuery = groq`
*[_type == "event"] | order(date desc, _updatedAt desc) {
  ${eventFields}
}`

export const eventAndMoreStoriesQuery = groq`
{
  "event": *[_type == "event" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${eventFields}
  },
  "moreEvents": *[_type == "event" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${eventFields}
  }
}`

export const eventSlugsQuery = groq`
*[_type == "event" && defined(slug.current)][].slug.current
`

export const eventBySlugQuery = groq`
*[_type == "event" && slug.current == $slug][0] {
  ${eventFields}
}
`

/**
 * Types
 */
export interface Author {
  name?: string
  picture?: any
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}

export interface Todo {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  completed?: boolean
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
}

export interface Event {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
}

export interface User {
  _id: string
  name?: string
  nickname?: string
  slug?: string
  picture?: string
  email?: string
  _updatedAt?: string
  user_id?: string
  type?: string
}
