// lib/api.ts
// All API calls go through here — no hardcoded URLs anywhere else.

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export interface IssueRequest {
  title: string;
  description: string;
  reporterContact?: string;
}

export interface Issue {
  id: number;
  title: string;
  description: string;
  reproSteps?: string | null;
  reporterContact?: string | null;
  status: "Open" | "InProgress" | "Resolved" | "Closed" | "Wontfix";
  createdAt: string;
  updatedAt: string;
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string };

export async function submitIssue(
  body: IssueRequest
): Promise<ApiResult<Issue>> {
  try {
    const res = await fetch(`${API_URL}/v1/issues`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json().catch(() => ({}));

    if (res.ok) {
      return { ok: true, data: json as Issue };
    }

    // Surface the API's own error message when available
    const message =
      json?.message ??
      json?.error ??
      `Request failed with status ${res.status}`;
    return { ok: false, status: res.status, message };
  } catch {
    // Network failure — API may be unreachable
    return {
      ok: false,
      status: 0,
      message:
        "Could not reach the server. Check your connection and try again.",
    };
  }
}
