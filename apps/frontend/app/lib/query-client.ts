import { usersApi, issuesApi, postsApi } from '~/api'
import type { User, Post, Issue } from '@dgig-vigie/types'

class QueryClient {
  async getAllUsers(): Promise<User[]> {
    return usersApi.getAll()
  }

  async getUserById(id: number): Promise<User> {
    return usersApi.getById(id)
  }

  async getAllIssues(): Promise<Issue[]> {
    return issuesApi.getAll()
  }

  async getIssueById(id: string): Promise<Issue> {
    return issuesApi.getById(id)
  }

  async getAllPosts(): Promise<Post[]> {
    return postsApi.getAll()
  }

  async getPostById(id: number): Promise<Post> {
    return postsApi.getById(id)
  }
}

export const queryClient = new QueryClient()
export type { User, Post, Issue }
