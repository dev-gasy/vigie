export type IssueStatus = "To Do" | "In Progress" | "Done" | "Blocked";
export type IssuePriority = "Low" | "Medium" | "High" | "Critical";
export type IssueType = "Story" | "Bug" | "Task" | "Epic";

export interface Issue {
  id: string;
  key: string;
  summary: string;
  description?: string;
  status: IssueStatus;
  priority: IssuePriority;
  type: IssueType;
  assignee?: {
    id: string;
    name: string;
    email: string;
  };
  reporter: {
    id: string;
    name: string;
    email: string;
  };
  created: string;
  updated: string;
  dueDate?: string;
  labels: string[];
  storyPoints?: number;
}
