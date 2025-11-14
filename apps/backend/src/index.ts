import 'dotenv/config'

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { env } from 'hono/adapter'
import type { Env } from './env.js'
import { posts } from './modules/posts/routes.js'
import { users } from './modules/users/routes.js'
import { issues } from './modules/issues/routes.js'
import { dashboard } from './modules/dashboard/routes.js'

const app = new Hono()

app.get('/', c => {
  const { API_KEY } = env<Env>(c)
  return c.text('Hello Hono!: ' + API_KEY)
})

app.route('/dashboard', dashboard)
app.route('/posts', posts)
app.route('/users', users)
app.route('/issues', issues)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  info => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)
