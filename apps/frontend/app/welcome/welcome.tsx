import { Link } from '~/components/ui/link'
import { PageHeader } from '~/components/ui/page-header'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Bug, FileText, Users } from 'lucide-react'

export function Welcome() {
  return (
    <div className="pt-6 space-y-6">
      <PageHeader
        title="Welcome to Vigie"
        description="Manage your content and track issues"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Issues</CardTitle>
            <CardDescription>Track and manage issues</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              to="/issues"
              variant="button"
              className="w-full justify-start"
            >
              <Bug className="mr-2 h-4 w-4" />
              View Issues
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
            <CardDescription>Browse and manage posts</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/posts" variant="button" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              View Posts
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/users" variant="button" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              View Users
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
