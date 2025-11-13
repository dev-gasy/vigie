import { jsonPlaceholderClient } from "../../api/client.js";
import type { User } from "./types.js";

export class UsersService {
  static async getAllUsers(): Promise<User[]> {
    const response = await jsonPlaceholderClient.get<User[]>("/users");
    return response.data;
  }

  static async getUserById(id: number): Promise<User> {
    const response = await jsonPlaceholderClient.get<User>(`/users/${id}`);
    return response.data;
  }
}
