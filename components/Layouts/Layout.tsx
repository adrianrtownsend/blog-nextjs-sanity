import AlertBanner from 'components/AlertBanner'
import Container from 'components/BlogContainer'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const Layout = ({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) => {
  return (
    <div className="min-h-screen">
      <main>
        <AlertBanner preview={preview} loading={loading} />
        <Header />
        <Container>{children}</Container>
        <Footer />
      </main>
    </div>
  )
}

export default Layout
