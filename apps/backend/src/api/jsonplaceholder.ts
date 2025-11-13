import { jsonPlaceholderClient } from "./client.js";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export class JSONPlaceholderAPI {
  static async getPosts(): Promise<Post[]> {
    const response = await jsonPlaceholderClient.get<Post[]>("/posts");
    return response.data;
  }

  static async getPost(id: number): Promise<Post> {
    const response = await jsonPlaceholderClient.get<Post>(`/posts/${id}`);
    return response.data;
  }

  static async createPost(post: Omit<Post, "id">): Promise<Post> {
    const response = await jsonPlaceholderClient.post<Post>("/posts", post);
    return response.data;
  }

  static async updatePost(id: number, post: Partial<Post>): Promise<Post> {
    const response = await jsonPlaceholderClient.put<Post>(
      `/posts/${id}`,
      post,
    );
    return response.data;
  }

  static async deletePost(id: number): Promise<void> {
    await jsonPlaceholderClient.delete(`/posts/${id}`);
  }

  static async getUsers(): Promise<User[]> {
    const response = await jsonPlaceholderClient.get<User[]>("/users");
    return response.data;
  }

  static async getUser(id: number): Promise<User> {
    const response = await jsonPlaceholderClient.get<User>(`/users/${id}`);
    return response.data;
  }

  static async getComments(postId?: number): Promise<Comment[]> {
    const url = postId ? `/posts/${postId}/comments` : "/comments";
    const response = await jsonPlaceholderClient.get<Comment[]>(url);
    return response.data;
  }
}
