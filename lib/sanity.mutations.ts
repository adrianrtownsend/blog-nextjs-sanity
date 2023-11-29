import { writeToken } from 'lib/sanity.api'

import { getClient, getUserByUserId } from './sanity.client'

export interface ICreateTodoProps {
  _type: string
  title: string
  content: string
  dueDate: string
  completed: boolean
  favorited: boolean
}
export interface IEditTodoProps {
  _id?: string
  title?: string
  content?: string
  dueDate?: string
  completed?: boolean
  favorited?: boolean
}

export const generateSlug = (text: string) => ({
  slug: { _type: 'slug', current: text.replace(/\s+/g, '-') },
})

/**
 * Create Item
 */
export const createItem = async (
  fields: ICreateTodoProps,
  userId,
  slugField,
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
      ...fields,
      user: {
        _type: 'reference',
        _ref: user._id,
      },
      ...generateSlug(fields[slugField]),
    })
  }
}

/**
 * Edit Item
 */
export const editItem = (fields: IEditTodoProps) => {
  const { _id } = fields
  const writeClient = getClient(undefined, {
    token: writeToken,
  })

  return writeClient
    .patch(_id)
    .set(fields)
    .commit()
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('Edit failed: ', error.message)
      throw error
    })
}

export const deleteItem = (id: string) => {
  const writeClient = getClient(undefined, {
    token: writeToken,
  })

  return writeClient
    .delete(id)
    .then(() => {
      return 'Item deleted'
    })
    .catch((error) => {
      console.error('Delete failed: ', error.message)
      throw error
    })
}
