export type IssueStatus = 'Open' | 'InProgress' | 'Resolved' | 'Closed' | 'Wontfix';

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
