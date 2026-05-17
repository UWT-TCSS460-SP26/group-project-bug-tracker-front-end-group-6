import type { ApiErrorBody, FieldErrors, Issue, IssueRequest } from "./types";

function getApiBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set. Add it to .env.local for development or your host's environment settings for production.",
    );
  }
  return base.replace(/\/$/, "");
}

export function getIssuesEndpoint(): string {
  return `${getApiBaseUrl()}/v1/issues`;
}

function mapValidationDetails(details: ApiErrorBody["details"]): FieldErrors {
  if (!details) return {};

  const fieldErrors: FieldErrors = {};
  for (const [key, value] of Object.entries(details)) {
    const message = Array.isArray(value) ? value[0] : value;
    if (key === "title" || key === "description" || key === "reporterContact") {
      fieldErrors[key] = message;
    }
  }
  return fieldErrors;
}

export type SubmitIssueResult =
  | { ok: true; issue: Issue }
  | { ok: false; kind: "validation"; fieldErrors: FieldErrors; message: string }
  | { ok: false; kind: "network"; message: string };

export async function submitIssue(
  payload: IssueRequest,
): Promise<SubmitIssueResult> {
  const endpoint = getIssuesEndpoint();

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: payload.title.trim(),
        description: payload.description.trim(),
        reporterContact: payload.reporterContact?.trim() || null,
      }),
    });
  } catch {
    return {
      ok: false,
      kind: "network",
      message:
        "We could not reach the bug tracker API. Your report was not submitted. Check your connection and try again — your text is still in the form.",
    };
  }

  if (response.status === 201) {
    const issue = (await response.json()) as Issue;
    return { ok: true, issue };
  }

  let body: ApiErrorBody = {};
  try {
    body = (await response.json()) as ApiErrorBody;
  } catch {
    /* non-JSON error body */
  }

  if (response.status === 400) {
    const fieldErrors = mapValidationDetails(body.details);
    const message =
      body.message ??
      "Please fix the highlighted fields and submit again.";

    if (Object.keys(fieldErrors).length === 0) {
      const lower = message.toLowerCase();
      if (lower.includes("title")) fieldErrors.title = message;
      if (lower.includes("description")) fieldErrors.description = message;
      if (!fieldErrors.title && !fieldErrors.description) {
        fieldErrors.form = message;
      }
    }

    return { ok: false, kind: "validation", fieldErrors, message };
  }

  if (response.status >= 500) {
    return {
      ok: false,
      kind: "network",
      message:
        "The bug tracker API is temporarily unavailable. Your report was not submitted. Please try again in a few minutes — your text is still in the form.",
    };
  }

  return {
    ok: false,
    kind: "network",
    message:
      body.message ??
      `Something went wrong (HTTP ${response.status}). Your report was not submitted. Please try again.`,
  };
}
