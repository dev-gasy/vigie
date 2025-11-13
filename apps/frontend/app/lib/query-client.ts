import type { User, Post, Issue, DashboardData } from "@dgig-vigie/types";

const API_BASE_URL = "http://localhost:3000";

class QueryClient {
  private async request<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    return response.json();
  }

  async getAllUsers(): Promise<User[]> {
    return this.request<User[]>("/users");
  }

  async getUserById(id: number): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  async getAllIssues(): Promise<Issue[]> {
    return this.request<Issue[]>("/issues");
  }

  async getIssueById(id: string): Promise<Issue> {
    return this.request<Issue>(`/issues/${id}`);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.request<Post[]>("/posts");
  }

  async getPostById(id: number): Promise<Post> {
    return this.request<Post>(`/posts/${id}`);
  }

  async getDashboardData(): Promise<DashboardData> {
    return this.request<DashboardData>("/dashboard");
  }
}

export const queryClient = new QueryClient();
export type { User, Post, Issue, DashboardData };
