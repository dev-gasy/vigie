import type { Post } from "@dgig-vigie/types";
import { type LoaderFunction } from "react-router";
import { useLoaderData } from "react-router";
import { queryClient } from "~/lib/api-client";

export const loader: LoaderFunction = async () => {
  try {
    const posts = await queryClient.getAllPosts();
    return { posts };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return { posts: [], error: "Failed to fetch posts" };
  }
};

export function meta() {
  return [
    { title: "Posts" },
    { name: "description", content: "List of all posts" },
  ];
}

export default function PostsPage() {
  const { posts, error } = useLoaderData<{ posts: Post[]; error?: string }>();

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-2">
              {post.body.substring(0, 150)}...
            </p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">User ID: {post.userId}</p>
              <a
                href={`/posts/${post.id}`}
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
