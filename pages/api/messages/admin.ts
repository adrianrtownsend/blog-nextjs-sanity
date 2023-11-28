import { withApiAuthRequired } from '@auth0/nextjs-auth0'

const getAdminMessage = async (req, res) => {
  const message = {
    text: 'This is an admin message.',
  }

  res.status(200).json(message)
}

export default withApiAuthRequired(getAdminMessage)
