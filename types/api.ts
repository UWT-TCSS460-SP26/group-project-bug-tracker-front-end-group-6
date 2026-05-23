export type IssueStatus = 'Open' | 'InProgress' | 'Resolved' | 'Closed' | 'Wontfix';

export type Role = 'User' | 'Moderator' | 'Admin' | 'SuperAdmin' | 'Owner';

export interface CurrentUser {
  id: number;
  subjectId: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  role: Role;
  createdAt: string;
  canTriage: boolean;
}

export interface IssuesListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IssuesListResponse {
  meta: IssuesListMeta;
  data: Issue[];
}

export interface IssueRequest {
  title: string;
  description: string;
  reporterContact?: string;
}

export interface Issue {
  id: number;
  title: string;
  description: string;
  reproSteps: string | null;
  reporterContact: string | null;
  status: IssueStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ApiErrorResponse {
  error: string;
  message: string;
}
