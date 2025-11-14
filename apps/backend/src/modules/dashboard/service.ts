import { jsonPlaceholderClient } from '../../api/client.js'
import { IssuesService } from '../issues/service.js'
import type { DashboardData, DashboardMetrics, ActivityItem } from './types.js'

export class DashboardService {
  static async getDashboardData(): Promise<DashboardData> {
    const [issues, posts] = await Promise.all([
      IssuesService.getAllIssues(),
      jsonPlaceholderClient.get<any[]>('/posts'),
    ])

    const totalIssues = issues.length
    const totalPosts = posts.data.length
    const activeSessions = Math.floor(Math.random() * 100) + 50
    const growthRate = Math.round((Math.random() * 20 + 5) * 10) / 10

    const metrics: DashboardMetrics = {
      totalIssues,
      totalPosts,
      activeSessions,
      growthRate,
      issueGrowth: '+15.3% from last month',
      postGrowth: '+12.5% from last month',
      sessionGrowth: '+5.2% from last hour',
      rateGrowth: '+2.1% from last week',
    }

    const recentActivity: ActivityItem[] = [
      {
        id: '1',
        type: 'issue',
        message: 'New issue created: PROJ-106',
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      },
      {
        id: '2',
        type: 'issue',
        message: 'Issue PROJ-102 moved to In Progress',
        timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
      },
      {
        id: '3',
        type: 'post',
        message: 'Post published',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      },
      {
        id: '4',
        type: 'system',
        message: 'System update completed',
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      },
    ]

    return {
      metrics,
      recentActivity,
    }
  }
}
