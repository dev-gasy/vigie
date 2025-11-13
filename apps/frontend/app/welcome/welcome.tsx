import { Link } from "~/components/ui/link";
import { PageHeader } from "~/components/ui/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Bug, FileText, BarChart3, TrendingUp } from "lucide-react";
import { queryClient, type DashboardData } from "~/lib/query-client";
import { useLoaderData } from "react-router";

export async function loader() {
  const dashboardData = await queryClient.getDashboardData();
  return dashboardData;
}

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now.getTime() - time.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else {
    return `${diffHours}h ago`;
  }
}

function getActivityColor(type: string): string {
  switch (type) {
    case "issue":
      return "bg-blue-500";
    case "post":
      return "bg-green-500";
    case "system":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
}

export function Welcome() {
  const { metrics, recentActivity } = useLoaderData() as DashboardData;

  return (
    <div className="pt-6 space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your application"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalIssues}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.issueGrowth}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.postGrowth}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Sessions
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeSessions}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.sessionGrowth}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.growthRate}%</div>
            <p className="text-xs text-muted-foreground">
              {metrics.rateGrowth}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Navigate to different sections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              to="/issues"
              variant="button"
              className="w-full justify-start"
            >
              <Bug className="mr-2 h-4 w-4" />
              Manage Issues
            </Link>
            <Link to="/posts" variant="button" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Manage Posts
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates in your system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`}
                  ></div>
                  <span className="text-sm">{activity.message}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
