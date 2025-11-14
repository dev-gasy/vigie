import { Hono } from 'hono'
import { PostsService } from './service.js'

const posts = new Hono()

posts.get('/', async c => {
  try {
    const posts = await PostsService.getAllPosts()
    return c.json(posts)
  } catch (error) {
    return c.json({ error: 'Failed to fetch posts' }, 500)
  }
})

posts.get('/:id', async c => {
  try {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) {
      return c.json({ error: 'Invalid post ID' }, 400)
    }
    const post = await PostsService.getPostById(id)
    return c.json(post)
  } catch (error) {
    return c.json({ error: 'Failed to fetch post' }, 500)
  }
})

export { posts }
