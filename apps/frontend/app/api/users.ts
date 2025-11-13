import type { User } from "@dgig-vigie/types";
import { apiClient, executeRequest } from "./client";

export class UsersApi {
  async getAll(): Promise<User[]> {
    return executeRequest(() => apiClient.get<User[]>("/users"));
  }

  async getById(id: number): Promise<User> {
    return executeRequest(() => apiClient.get<User>(`/users/${id}`));
  }
}

export const usersApi = new UsersApi();