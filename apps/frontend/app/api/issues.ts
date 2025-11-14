import type { Issue } from '@dgig-vigie/types'
import { apiClient, executeRequest } from './client'

export class IssuesApi {
  async getAll(): Promise<Issue[]> {
    return executeRequest(() => apiClient.get<Issue[]>('/issues'))
  }

  async getById(id: string): Promise<Issue> {
    return executeRequest(() => apiClient.get<Issue>(`/issues/${id}`))
  }
}

export const issuesApi = new IssuesApi()
