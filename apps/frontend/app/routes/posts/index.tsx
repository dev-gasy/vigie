import type { Post } from "@dgig-vigie/types";
import { type LoaderFunction } from "react-router";
import { useLoaderData } from "react-router";
import { queryClient } from "~/lib/query-client";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "~/components/ui/page-header";
import { Badge } from "~/components/ui/badge";
import { ErrorMessage } from "~/components/ui/error-message";
import { Link } from "~/components/ui/link";
import { getUserBadgeColor } from "~/lib/badge-colors";

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
      <div className="py-8">
        <PageHeader
          title="Posts"
          description="Discover and read the latest posts"
        />
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="py-8">
      <PageHeader
        title="Posts"
        description="Discover and read the latest posts"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="group hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-xl line-clamp-2 leading-tight">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {post.body}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Badge variant="secondary" className={getUserBadgeColor()}>
                  User {post.userId}
                </Badge>
                <Link
                  to={`/posts/${post.id}`}
                  className="inline-flex items-center text-sm font-medium"
                >
                  Read more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
