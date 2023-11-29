import { writeToken } from 'lib/sanity.api'

import { getClient, getUserByUserId } from './sanity.client'

export async function updateDocumentTitle(_id, title) {
  const client = getClient(undefined, {
    token: writeToken,
  })
  const result = client.patch(_id).set({ title })
  return result
}

/**
 * Posts
 */
export interface ICreatePostProps {
  title: string
  content: string
}

export const createPost = ({ title, content }: ICreatePostProps, userId) => {
  const client = getClient(undefined, {
    token: writeToken,
  })
  return client.create({
    _type: 'post',
    title,
    content,
    author: {
      _type: 'reference',
      _ref: userId,
    },
  })
}

/**
 * Todos
 */
export interface ICreateTodoProps {
  title: string
  content: string
  dueDate: string
  completed: boolean
  favorited: boolean
}

const generateSlug = (text: string) => ({
  slug: { _type: 'slug', current: text.replace(/\s+/g, '-') },
})

export const createTodo = async (
  { title, content, dueDate, completed, favorited }: ICreateTodoProps,
  userId,
) => {
  const user = await getUserByUserId(userId)
  if (!user) {
    console.log('cannot find user: ', user)
  } else {
    console.log('found user: ', user)
    const writeClient = getClient(undefined, {
      token: writeToken,
    })

    return writeClient.create({
      _type: 'todo',
      title,
      content,
      dueDate,
      completed,
      favorited,
      user: {
        _type: 'reference',
        _ref: user._id,
      },
      ...generateSlug(title),
    })
  }
}

/**
 * Users
 */
export const createUser = async (user) => {
  const client = getClient(undefined, {
    token: writeToken,
  })
  return client.create(user)
}

/**
 * Events
 */
export const createEvent = async (event) => {
  const client = getClient(undefined, {
    token: writeToken,
  })
  return client.create(event)
}
