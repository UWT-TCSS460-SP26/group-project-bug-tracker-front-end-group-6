export type IssueRequest = {
  title: string;
  description: string;
  reporterContact?: string | null;
};

export type Issue = {
  id: number;
  title: string;
  description: string;
  reproSteps?: string | null;
  reporterContact?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiErrorBody = {
  error?: string;
  message?: string;
  details?: Record<string, string | string[]>;
};

export type FieldErrors = Partial<
  Record<keyof IssueRequest, string>
> & {
  form?: string;
};
