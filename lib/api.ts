import type { ApiErrorResponse, Issue, IssueRequest } from '@/types/api';

export type { Issue };

export type SubmitResult =
  | { ok: true; data: Issue }
  | { ok: false; message: string };

export async function submitIssue(data: IssueRequest): Promise<SubmitResult> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? '';

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
