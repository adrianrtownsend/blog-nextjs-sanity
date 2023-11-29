import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge'

export default withMiddlewareAuthRequired()

export const config = {
  matcher: [
    '/admin',
    '/events',
    '/events/:path*',
    '/posts',
    '/posts/:path*',
    '/profile',
    '/protected',
    '/todos',
    '/todos/:path*',
    '/users',
    '/users/:path*',
  ],
}
