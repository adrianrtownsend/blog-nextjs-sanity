const getPublicMessage = async (req, res) => {
  const message = {
    text: 'This is a public message.',
  }

  res.status(200).json(message)
}

export default getPublicMessage
