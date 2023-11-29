import Link from 'next/link'

interface IUserCardProps {
  name?: string
  nickname?: string
  picture?: string
  slug?: string
}

const UserCard = (props: IUserCardProps) => {
  const { name, nickname, picture, slug } = props
  console.log('user props: ', props)
  return (
    <article className="rounded-xl border border-gray-700 bg-gray-800 p-4">
      <Link href={`/users/${slug}`}>
        <div className="flex items-center gap-4">
          <img
            alt="Developer"
            src={picture}
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <h3 className="text-lg font-medium text-white">
              {name || nickname}
            </h3>

            <div className="flow-root">
              <ul className="-m-1 flex flex-wrap">
                <li className="p-1 leading-none">
                  <span className="text-xs font-medium text-gray-300">
                    {' '}
                    {/* Twitter{' '} */}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default UserCard
