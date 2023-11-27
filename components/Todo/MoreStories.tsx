import TodoPreview from 'components/Todo/TodoPreview'
import type { Todo } from 'lib/sanity.queries'

export default function MoreStories({ todos }: { todos: Todo[] }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        More Stories
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {todos.map((todo) => (
          <TodoPreview
            key={todo._id}
            title={todo.title}
            date={todo.date}
            slug={todo.slug}
          />
        ))}
      </div>
    </section>
  )
}
