import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('issues', 'routes/issues/index.tsx'),
  route('issues/:id', 'routes/issues/$id.tsx'),
  route('posts', 'routes/posts/index.tsx'),
  route('posts/:id', 'routes/posts/$id.tsx'),
  route('users', 'routes/users/index.tsx'),
  route('users/:id', 'routes/users/$id.tsx'),
] satisfies RouteConfig
