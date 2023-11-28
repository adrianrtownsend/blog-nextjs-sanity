import axios from 'axios'

const useAuthRequest = (options) =>
  axios
    .request(options)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.error(error)
    })

const useAuthGetToken = async () => {
  const options = {
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.NEXT_PUBLIC_AUTH0_MANAGEMENT_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_AUTH0_MANAGEMENT_CLIENT_SECRET,
      audience: `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/`,
    }),
  }
  const response = await useAuthRequest(options)
  return response
}

export const useAuthGetUsers = async () => {
  const token = await useAuthGetToken()
  //   console.log('token: ', token)
  const options = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users`,
    params: { search_engine: 'v3' },
    headers: { authorization: `Bearer ${token}` },
  }
  const response = await useAuthRequest(options)
  return response
}

export const useAuthGetUser = async () => {
  const token = await useAuthGetToken()
  //   console.log('token: ', token)
  const options = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users`,
    params: { search_engine: 'v3' },
    headers: { authorization: `Bearer ${token}` },
  }
  const response = await useAuthRequest(options)
  return response
}
