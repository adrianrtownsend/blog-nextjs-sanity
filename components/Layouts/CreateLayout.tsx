import ReactHookForm from 'components/Form/ReactHookForm'

import Layout from './Layout'

interface ICreateLayoutProps {
  type: string
}

const CreateLayout = (props: ICreateLayoutProps) => {
  const { type } = props
  return (
    <Layout preview={null}>
      <article>
        <ReactHookForm />
      </article>
    </Layout>
  )
}

export default CreateLayout
