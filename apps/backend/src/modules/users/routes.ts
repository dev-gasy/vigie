import { Hono } from 'hono'
import { UsersService } from './service.js'

const users = new Hono()

users.get('/', async c => {
  try {
    const users = await UsersService.getAllUsers()
    return c.json(users)
  } catch (error) {
    return c.json({ error: 'Failed to fetch users' }, 500)
  }
})

users.get('/:id', async c => {
  try {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) {
      return c.json({ error: 'Invalid user ID' }, 400)
    }
    const user = await UsersService.getUserById(id)
    return c.json(user)
  } catch (error) {
    return c.json({ error: 'Failed to fetch user' }, 500)
  }
})

export { users }
