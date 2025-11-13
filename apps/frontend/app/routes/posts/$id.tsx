import { type LoaderFunction } from "react-router";
import { useLoaderData } from "react-router";
import { queryClient, type Post } from "~/lib/api-client";

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseInt(params.id as string);

  if (isNaN(id)) {
    throw new Response("Invalid post ID", { status: 400 });
  }

  try {
    const post = await queryClient.getPostById(id);
    return { post };
  } catch (error) {
    console.error(`Failed to fetch post ${id}:`, error);
    throw new Response("Post not found", { status: 404 });
  }
};

export function meta({ data }: { data: { post: Post } }) {
  return [
    { title: `${data.post?.title || "Post"} - Post Details` },
    { name: "description", content: data.post?.body?.substring(0, 150) },
  ];
}

export default function PostDetailsPage() {
  const { post } = useLoaderData<{ post: Post }>();

  return (
    <div className="p-6">
      <div className="mb-4">
        <a href="/posts" className="text-blue-500 hover:underline">
          ← Back to Posts
        </a>
      </div>

      <article className="border p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="mb-4">
          <p className="text-sm text-gray-500">User ID: {post.userId}</p>
        </div>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{post.body}</p>
        </div>
      </article>
    </div>
  );
}
