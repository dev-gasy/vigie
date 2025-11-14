import { Link } from '~/components/ui/link'
import { PageHeader } from '~/components/ui/page-header'
import { Card, CardContent } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '~/components/ui/select'
import { type Issue, queryClient } from '~/lib/query-client'
import { useLoaderData, useNavigation } from 'react-router'
import { getPriorityColor } from '~/lib/badge-colors'
import { AlertTriangle, Bug, FileText, Filter, Search, Target, WifiOff, Zap, } from 'lucide-react'
import { useMemo, useState } from 'react'

export async function loader() {
  try {
    const issues = await queryClient.getAllIssues()
    return { issues, error: null }
  } catch (error) {
    return {
      issues: [],
      error: error instanceof Error ? error.message : 'Failed to load issues',
    }
  }
}

export function meta({
  data,
}: {
  data: { issues: Issue[]; error: string | null }
}) {
  const issueCount = data?.issues?.length || 0
  return [
    { title: 'Issues - Vigie' },
    {
      name: 'description',
      content: `View and manage ${issueCount} JIRA issues`,
    },
  ]
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'Bug':
      return <Bug className="h-4 w-4 text-red-500" />
    case 'Story':
      return <FileText className="h-4 w-4 text-blue-500" />
    case 'Task':
      return <Target className="h-4 w-4 text-green-500" />
    case 'Epic':
      return <Zap className="h-4 w-4 text-purple-500" />
    default:
      return <FileText className="h-4 w-4 text-gray-500" />
  }
}

export default function Issues() {
  const data = useLoaderData() as { issues: Issue[]; error: string | null }
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [priorityFilter, setPriorityFilter] = useState<string>('All')
  const [typeFilter, setTypeFilter] = useState<string>('All')

  const isLoading = navigation.state === 'loading'
  const { issues, error } = data

  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const matchesSearch =
        issue.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (issue.description?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false)

      const matchesStatus =
        statusFilter === 'All' || issue.status === statusFilter
      const matchesPriority =
        priorityFilter === 'All' || issue.priority === priorityFilter
      const matchesType = typeFilter === 'All' || issue.type === typeFilter

      return matchesSearch && matchesStatus && matchesPriority && matchesType
    })
  }, [issues, searchQuery, statusFilter, priorityFilter, typeFilter])

  const uniqueStatuses = [...new Set(issues.map(issue => issue.status))]
  const uniquePriorities = [...new Set(issues.map(issue => issue.priority))]
  const uniqueTypes = [...new Set(issues.map(issue => issue.type))]

  if (error) {
    return (
      <div className="py-8">
        <PageHeader title="Issues" description="Unable to load issues" />
        <Card className="text-center py-12">
          <CardContent>
            <WifiOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Connection Error</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Issues"
          description={`${filteredIssues.length} of ${issues.length} JIRA issues`}
        />
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner className="h-4 w-4" />
            <span>Loading...</span>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mt-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search issues..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
            <Filter className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Filter by:</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                {uniqueStatuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Priorities</SelectItem>
                {uniquePriorities.map(priority => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="mt-6">
        {filteredIssues.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No issues found</h3>
              <p className="text-muted-foreground">
                {searchQuery ||
                statusFilter !== 'All' ||
                priorityFilter !== 'All' ||
                typeFilter !== 'All'
                  ? 'Try adjusting your search or filters'
                  : 'No issues available'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {filteredIssues.map(issue => (
              <Link
                key={issue.id}
                to={`/issues/${issue.id}`}
                className="block group no-underline"
              >
                <div className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/30 hover:border-border transition-all duration-150">
                  <div className="shrink-0">{getTypeIcon(issue.type)}</div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-medium text-muted-foreground">
                        {issue.key}
                      </span>
                      <span className="text-sm font-medium text-foreground truncate">
                        {issue.summary}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Badge
                      variant="outline"
                      className={`text-xs font-normal ${getPriorityColor(issue.priority)}`}
                    >
                      {issue.priority}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
