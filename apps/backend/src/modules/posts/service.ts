import { jsonPlaceholderClient } from '../../api/client.js'
import type { Post } from '@dgig-vigie/types'

export class PostsService {
  static async getAllPosts(): Promise<Post[]> {
    const response = await jsonPlaceholderClient.get<Post[]>('/posts')
    return response.data
  }

  static async getPostById(id: number): Promise<Post> {
    const response = await jsonPlaceholderClient.get<Post>(`/posts/${id}`)
    return response.data
  }
}
