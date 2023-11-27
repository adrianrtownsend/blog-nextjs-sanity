import { PageLayout } from '../components/auth0/page-layout'

const ServerError = () => {
  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Internal Server Error
        </h1>
        <div className="content__body" />
      </div>
    </PageLayout>
  )
}

export default ServerError
