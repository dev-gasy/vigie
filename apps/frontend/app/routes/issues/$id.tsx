import { BackButton } from '~/components/ui/back-button'
import { Card, CardContent } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'
import { type Issue, queryClient } from '~/lib/query-client'
import { useLoaderData, useNavigation } from 'react-router'
import type { Route } from './+types/$id'
import {
  getLabelColor,
  getPriorityColor,
  getStatusColor,
} from '~/lib/badge-colors'
import { Bug, FileText, Target, WifiOff, Zap } from 'lucide-react'

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const issue = await queryClient.getIssueById(params.id)
    return { issue, error: null }
  } catch (error) {
    return {
      issue: null,
      error: error instanceof Error ? error.message : 'Failed to load issue',
    }
  }
}

export function meta({ loaderData }: Route.MetaArgs) {
  const result = loaderData as { issue: Issue | null; error: string | null }
  if (!result.issue) {
    return [
      { title: 'Issue Not Found - Vigie' },
      {
        name: 'description',
        content: 'The requested issue could not be found',
      },
    ]
  }
  return [
    { title: `${result.issue.key} - Issues - Vigie` },
    { name: 'description', content: result.issue.summary },
  ]
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'Bug':
      return <Bug className="h-5 w-5 text-red-500" />
    case 'Story':
      return <FileText className="h-5 w-5 text-blue-500" />
    case 'Task':
      return <Target className="h-5 w-5 text-green-500" />
    case 'Epic':
      return <Zap className="h-5 w-5 text-purple-500" />
    default:
      return <FileText className="h-5 w-5 text-gray-500" />
  }
}

export default function IssueDetail() {
  const data = useLoaderData() as { issue: Issue | null; error: string | null }
  const navigation = useNavigation()

  const isLoading = navigation.state === 'loading'
  const { issue, error } = data

  if (error || !issue) {
    return (
      <div className="pt-6">
        <div className="flex items-center gap-4 mb-6">
          <BackButton to="/issues" label="Back to issues" />
          <div>
            <h1 className="text-2xl font-bold">Issue Not Found</h1>
            <p className="text-muted-foreground">
              The requested issue could not be loaded
            </p>
          </div>
        </div>
        <Card className="text-center py-12">
          <CardContent>
            <WifiOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {error ? 'Loading Error' : 'Issue Not Found'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {error ||
                "The issue you're looking for doesn't exist or has been removed."}
            </p>
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
              {error && (
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="py-8 space-y-6">
      <div className="space-y-4">
        <BackButton to="/issues" label="Back to issues" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            {getTypeIcon(issue.type)}
            <span className="font-mono text-sm font-medium text-muted-foreground">
              {issue.key}
            </span>
            <div
              className={`w-2 h-2 rounded-full ${getStatusColor(issue.status)}`}
            ></div>
            <span className="text-sm text-muted-foreground">
              {issue.status}
            </span>
            <Badge
              variant="outline"
              className={`text-xs ml-auto border ${getPriorityColor(issue.priority)}`}
            >
              {issue.priority}
            </Badge>
            {isLoading && <Spinner className="h-4 w-4" />}
          </div>
          <h1 className="text-xl font-semibold text-foreground leading-tight">
            {issue.summary}
          </h1>
        </div>
      </div>

      <div className="grid 2 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-6">
          {issue.description && (
            <div className="prose prose-sm max-w-none">
              <h2 className="text-lg font-medium mb-4 not-prose">
                Description
              </h2>
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                {issue.description}
              </p>
            </div>
          )}

          {issue.labels.length > 0 && (
            <div>
              <h2 className="text-lg font-medium mb-4">Labels</h2>
              <div className="flex flex-wrap gap-2">
                {issue.labels.map((label, index) => (
                  <Badge
                    key={label}
                    variant="secondary"
                    className={`text-xs ${getLabelColor(index)}`}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Details</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Type</span>
                <div className="flex items-center gap-2">
                  {getTypeIcon(issue.type)}
                  <span>{issue.type}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(issue.status)}`}
                  ></div>
                  <span>{issue.status}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Priority</span>
                <Badge
                  variant="outline"
                  className={`text-xs border ${getPriorityColor(issue.priority)}`}
                >
                  {issue.priority}
                </Badge>
              </div>

              {issue.storyPoints && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Story Points</span>
                  <span className="font-medium">{issue.storyPoints}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {new Date(issue.created).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Updated</span>
                <span>
                  {new Date(issue.updated).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {issue.dueDate && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Due Date</span>
                  <span>
                    {new Date(issue.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">People</h2>
            <div className="space-y-3">
              {issue.assignee && (
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      {issue.assignee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground">
                      Assignee
                    </div>
                    <p className="text-sm font-medium truncate">
                      {issue.assignee.name}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {issue.reporter.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">Reporter</div>
                  <p className="text-sm font-medium truncate">
                    {issue.reporter.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
