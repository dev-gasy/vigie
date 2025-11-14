import type { Post } from '@dgig-vigie/types'
import { apiClient, executeRequest } from './client'

export class PostsApi {
  async getAll(): Promise<Post[]> {
    return executeRequest(() => apiClient.get<Post[]>('/posts'))
  }

  async getById(id: number): Promise<Post> {
    return executeRequest(() => apiClient.get<Post>(`/posts/${id}`))
  }
}

export const postsApi = new PostsApi()
