export interface DashboardMetrics {
  totalIssues: number;
  totalPosts: number;
  activeSessions: number;
  growthRate: number;
  issueGrowth: string;
  postGrowth: string;
  sessionGrowth: string;
  rateGrowth: string;
}

export interface ActivityItem {
  id: string;
  type: "issue" | "post" | "system";
  message: string;
  timestamp: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  recentActivity: ActivityItem[];
}
