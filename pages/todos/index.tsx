import { default as authClient, useUser } from '@auth0/nextjs-auth0/client'
import TodoCard from 'components/HyperUI/TodoCard'
import { createTodo } from 'lib/sanity.mutations'
import { useState } from 'react'

const Todo = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const { user } = useUser()
  console.log('user:', user)
  console.log('authClient: ', authClient)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // createTodo({
    //   _type: 'todo',
    //   title,
    //   content,
    //   authUser_sub: user.sub,
    // })
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <>
      <TodoCard />
      <div>
        <h1>Create Todo</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Create Todo</button>
        </form>
      </div>
    </>
  )
}

export default Todo
