import type {
  ApiErrorResponse,
  CurrentUser,
  Issue,
  IssueRequest,
  IssuesListResponse,
  IssueStatus,
} from '@/types/api';

export type { Issue };

export type SubmitResult =
  | { ok: true; data: Issue }
  | { ok: false; message: string };

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string; status?: number };

function apiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? '';
}

async function parseError(res: Response): Promise<string> {
  const body = (await res.json().catch(() => ({}))) as Partial<ApiErrorResponse>;
  return body.message ?? body.error ?? 'Request failed.';
}

export async function submitIssue(data: IssueRequest): Promise<SubmitResult> {
  const base = apiBase();

  let res: Response;
  try {
    res = await fetch(`${base}/v1/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    return {
      ok: false,
      message:
        "Couldn't reach the server. Please check your connection — your report is still here so you can try again.",
    };
  }

  if (res.status === 201) {
    const issue = (await res.json()) as Issue;
    return { ok: true, data: issue };
  }

  if (res.status === 400) {
    const body = (await res.json().catch(() => ({}))) as Partial<ApiErrorResponse>;
    return {
      ok: false,
      message: body.message ?? 'Please check your submission and try again.',
    };
  }

  return {
    ok: false,
    message: 'The server encountered an error. Please try again in a moment.',
  };
}

function authHeaders(token: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchCurrentUser(token: string): Promise<ApiResult<CurrentUser>> {
  try {
    const res = await fetch(`${apiBase()}/v1/users/me`, {
      headers: authHeaders(token),
      cache: 'no-store',
    });
    if (!res.ok) {
      return { ok: false, message: await parseError(res), status: res.status };
    }
    const body = (await res.json()) as { data: CurrentUser };
    return { ok: true, data: body.data };
  } catch {
    return { ok: false, message: "Couldn't reach the server." };
  }
}

export interface ListIssuesParams {
  page?: number;
  limit?: number;
  status?: string;
  sort?: 'newest' | 'oldest';
}

export async function listIssues(
  token: string,
  params: ListIssuesParams = {}
): Promise<ApiResult<IssuesListResponse>> {
  const search = new URLSearchParams();
  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (params.status) search.set('status', params.status);
  if (params.sort) search.set('sort', params.sort);

  const qs = search.toString();
  const url = `${apiBase()}/v1/issues${qs ? `?${qs}` : ''}`;

  try {
    const res = await fetch(url, { headers: authHeaders(token), cache: 'no-store' });
    if (!res.ok) {
      return { ok: false, message: await parseError(res), status: res.status };
    }
    return { ok: true, data: (await res.json()) as IssuesListResponse };
  } catch {
    return { ok: false, message: "Couldn't reach the server." };
  }
}

export async function getIssue(
  token: string,
  id: number
): Promise<ApiResult<Issue>> {
  try {
    const res = await fetch(`${apiBase()}/v1/issues/${id}`, {
      headers: authHeaders(token),
      cache: 'no-store',
    });
    if (!res.ok) {
      return { ok: false, message: await parseError(res), status: res.status };
    }
    const body = (await res.json()) as { data: Issue };
    return { ok: true, data: body.data };
  } catch {
    return { ok: false, message: "Couldn't reach the server." };
  }
}

export async function updateIssueStatus(
  token: string,
  id: number,
  status: IssueStatus
): Promise<ApiResult<Issue>> {
  try {
    const res = await fetch(`${apiBase()}/v1/issues/${id}`, {
      method: 'PATCH',
      headers: authHeaders(token),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      return { ok: false, message: await parseError(res), status: res.status };
    }
    const body = (await res.json()) as { data: Issue };
    return { ok: true, data: body.data };
  } catch {
    return { ok: false, message: "Couldn't reach the server." };
  }
}

export async function deleteIssue(
  token: string,
  id: number
): Promise<ApiResult<Issue>> {
  try {
    const res = await fetch(`${apiBase()}/v1/issues/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token),
    });
    if (!res.ok) {
      return { ok: false, message: await parseError(res), status: res.status };
    }
    const body = (await res.json()) as { data: Issue };
    return { ok: true, data: body.data };
  } catch {
    return { ok: false, message: "Couldn't reach the server." };
  }
}
