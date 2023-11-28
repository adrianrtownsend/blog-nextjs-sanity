import { withApiAuthRequired } from '@auth0/nextjs-auth0'

const getProtectedMessage = async (req, res) => {
  const message = {
    text: 'This is a protected message.',
  }

  res.status(200).json(message)
}

export default withApiAuthRequired(getProtectedMessage)
