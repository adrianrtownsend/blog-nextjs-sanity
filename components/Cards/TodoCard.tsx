import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import Link from 'next/link'
/**
 * 
 * {
    "_id": "7dda52b3-fc93-44c2-ade2-7dfb4ebf0e25",
    "date": "2023-11-24T18:02:11.340Z",
    "slug": "my-test-todo",
    "user": {
        "_id": "7fba7b3d-b42f-4b4e-8fa7-55c67aa305bf",
        "name": "adrianrtownsend",
        "picture": "https://avatars.githubusercontent.com/u/21168942?v=4",
        "nickname": "adrianrtownsend"
    },
    "title": "my test todo",
    "content": "my test todo content",
    "_updatedAt": "2023-11-24T18:08:14Z",
    "completed": null,
    "favorited": null,
    "authUser_sub": null,
    "author": null
}
 */

export const formatDateRelative = (date: string) => {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  })
}

const TodoCard = (props) => {
  const { content, date, title, user, slug } = props
  return (
    <Link
      href={`/todos/${slug}`}
      className="block rounded-lg p-4 shadow-sm shadow-indigo-100"
    >
      <img
        alt="Home"
        src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        className="h-56 w-full rounded-md object-cover"
      />

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Title</dt>

            <dd className="font-medium">{title}</dd>
          </div>
          <div>
            <dt className="sr-only">User</dt>

            <dd className="text-sm text-gray-500">
              {user?.name || user?.nickname}
            </dd>
          </div>
        </dl>

        {date && (
          <div className="mt-6 flex items-center gap-8 text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                className="h-4 w-4 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Created</p>

                <p className="font-medium">{formatDateRelative(date)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default TodoCard
