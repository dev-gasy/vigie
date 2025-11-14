import type { Issue } from '@dgig-vigie/types'

// Mock JIRA issues data
const mockIssues: Issue[] = [
  {
    id: '1',
    key: 'PROJ-101',
    summary: 'Implement user authentication system',
    description:
      'Create a secure authentication system with JWT tokens and proper session management.',
    status: 'In Progress',
    priority: 'High',
    type: 'Story',
    assignee: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    reporter: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    created: '2024-01-15T09:00:00Z',
    updated: '2024-01-20T14:30:00Z',
    dueDate: '2024-01-25T17:00:00Z',
    labels: ['backend', 'security'],
    storyPoints: 8,
  },
  {
    id: '2',
    key: 'PROJ-102',
    summary: 'Fix memory leak in dashboard component',
    description:
      'Dashboard component is causing memory leaks when switching between tabs.',
    status: 'To Do',
    priority: 'Critical',
    type: 'Bug',
    assignee: {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
    },
    reporter: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    created: '2024-01-18T11:15:00Z',
    updated: '2024-01-18T11:15:00Z',
    dueDate: '2024-01-22T17:00:00Z',
    labels: ['frontend', 'performance'],
    storyPoints: 5,
  },
  {
    id: '3',
    key: 'PROJ-103',
    summary: 'Create API documentation',
    description:
      'Generate comprehensive API documentation using OpenAPI/Swagger.',
    status: 'Done',
    priority: 'Medium',
    type: 'Task',
    assignee: {
      id: '4',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
    },
    reporter: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    created: '2024-01-10T08:00:00Z',
    updated: '2024-01-19T16:45:00Z',
    labels: ['documentation', 'api'],
    storyPoints: 3,
  },
  {
    id: '4',
    key: 'PROJ-104',
    summary: 'Performance optimization for search functionality',
    description:
      'Optimize search queries to improve response times for large datasets.',
    status: 'Blocked',
    priority: 'High',
    type: 'Story',
    assignee: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    reporter: {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
    },
    created: '2024-01-12T14:20:00Z',
    updated: '2024-01-21T10:00:00Z',
    labels: ['performance', 'search'],
    storyPoints: 13,
  },
  {
    id: '5',
    key: 'PROJ-105',
    summary: 'Add dark mode support',
    description: 'Implement dark mode theme across the entire application.',
    status: 'In Progress',
    priority: 'Low',
    type: 'Story',
    assignee: {
      id: '4',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
    },
    reporter: {
      id: '4',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
    },
    created: '2024-01-16T13:30:00Z',
    updated: '2024-01-20T09:15:00Z',
    labels: ['ui', 'theme'],
    storyPoints: 5,
  },
]

export class IssuesService {
  static async getAllIssues(): Promise<Issue[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockIssues
  }

  static async getIssueById(id: string): Promise<Issue> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50))
    const issue = mockIssues.find(issue => issue.id === id)
    if (!issue) {
      throw new Error(`Issue with id ${id} not found`)
    }
    return issue
  }

  static async getIssueByKey(key: string): Promise<Issue> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50))
    const issue = mockIssues.find(issue => issue.key === key)
    if (!issue) {
      throw new Error(`Issue with key ${key} not found`)
    }
    return issue
  }
}
