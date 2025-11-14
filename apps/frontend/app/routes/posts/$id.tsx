import { type LoaderFunction } from 'react-router'
import { useLoaderData } from 'react-router'
import { queryClient, type Post } from '~/lib/query-client'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { BackButton } from '~/components/ui/back-button'
import { getUserBadgeColor, getArticleBadgeColor } from '~/lib/badge-colors'

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseInt(params.id as string)

  if (isNaN(id)) {
    throw new Response('Invalid post ID', { status: 400 })
  }

  try {
    const post = await queryClient.getPostById(id)
    return { post }
  } catch (error) {
    console.error(`Failed to fetch post ${id}:`, error)
    throw new Response('Post not found', { status: 404 })
  }
}

export function meta({ data }: { data: { post: Post } }) {
  return [
    { title: `${data.post?.title || 'Post'} - Post Details` },
    { name: 'description', content: data.post?.body?.substring(0, 150) },
  ]
}

export default function PostDetailsPage() {
  const { post } = useLoaderData<{ post: Post }>()

  return (
    <div className="py-8">
      <BackButton to="/posts" label="Back to Posts" />

      <article className="max-w-4xl">
        <Card>
          <CardHeader className="pb-6">
            <div className="space-y-4">
              <CardTitle className="text-4xl font-bold leading-tight tracking-tight">
                {post.title}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="inline-flex items-center space-x-2">
                  <Badge variant="secondary" className={getUserBadgeColor()}>
                    Author: User {post.userId}
                  </Badge>
                  <span className="h-1 w-1 bg-muted-foreground/30 rounded-full"></span>
                  <Badge variant="outline" className={getArticleBadgeColor()}>
                    Article
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray max-w-none dark:prose-invert">
              <p className="text-foreground leading-7 text-base">{post.body}</p>
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  )
}
