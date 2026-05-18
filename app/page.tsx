'use client';

import { useState, useRef, FormEvent, ChangeEvent } from 'react';

interface FormValues {
  title: string;
  description: string;
  reporterContact: string;
}

interface FieldErrors {
  title?: string;
  description?: string;
  reporterContact?: string;
  general?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'networkError' | 'serverError';

const EMPTY_FORM: FormValues = { title: '', description: '', reporterContact: '' };

export default function BugReportPage() {
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const titleRef = useRef<HTMLInputElement>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the field the user is editing
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setStatus('submitting');

    const body: Record<string, string> = {
      title: form.title.trim(),
      description: form.description.trim(),
    };
    if (form.reporterContact.trim()) {
      body.reporterContact = form.reporterContact.trim();
    }

    // Client-side required-field check (matches API contract)
    const clientErrors: FieldErrors = {};
    if (!body.title) clientErrors.title = 'Title is required.';
    if (!body.description) clientErrors.description = 'Description is required.';
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setStatus('idle');
      // Move focus to first errored field
      titleRef.current?.focus();
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
      const res = await fetch(`${apiUrl}/v1/issues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.status === 201) {
        setStatus('success');
        setForm(EMPTY_FORM);
        return;
      }

      if (res.status === 400) {
        const data = await res.json().catch(() => ({}));
        const message: string = data.message || 'Please check your submission and try again.';
        const lower = message.toLowerCase();
        const errs: FieldErrors = {};
        if (lower.includes('title')) {
          errs.title = message;
        } else if (lower.includes('description')) {
          errs.description = message;
        } else if (lower.includes('contact') || lower.includes('reporter')) {
          errs.reporterContact = message;
        } else {
          errs.general = message;
        }
        setFieldErrors(errs);
        setStatus('idle');
        return;
      }

      // 5xx or unexpected status
      setStatus('serverError');
    } catch {
      // Network failure — form data is preserved so the user can retry
      setStatus('networkError');
    }
  }

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 max-w-md w-full text-center">
          <div
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100"
            aria-hidden="true"
          >
            <svg
              className="h-7 w-7 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Report Submitted</h1>
          <p className="text-gray-500 text-sm mb-8">
            Thank you — your bug report has been received and will be reviewed by the team.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Submit another report
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-lg w-full">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-semibold text-gray-900">Report a Bug</h1>
          <p className="mt-1 text-sm text-gray-500">
            Found something broken? Let the team know. No account needed.
          </p>
        </div>

        {/* General / network / server errors */}
        {(status === 'networkError' || status === 'serverError' || fieldErrors.general) && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {status === 'networkError' &&
              "Couldn't reach the server. Please check your connection and try again — your report has been preserved below."}
            {status === 'serverError' &&
              'The server encountered an error. Your report was not saved. Please try again in a moment.'}
            {status !== 'networkError' && status !== 'serverError' && fieldErrors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Title */}
          <div className="mb-5">
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
              Title{' '}
              <span aria-hidden="true" className="text-red-500">
                *
              </span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              ref={titleRef}
              id="title"
              name="title"
              type="text"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="Short summary of the issue"
              aria-describedby={fieldErrors.title ? 'title-error' : undefined}
              aria-invalid={!!fieldErrors.title}
              className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.title
                  ? 'border-red-400 bg-red-50 text-red-900 placeholder-red-300'
                  : 'border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
            {fieldErrors.title && (
              <p id="title-error" role="alert" aria-live="polite" className="mt-1.5 text-sm text-red-600">
                {fieldErrors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-5">
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
              Description{' '}
              <span aria-hidden="true" className="text-red-500">
                *
              </span>
              <span className="sr-only">(required)</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              value={form.description}
              onChange={handleChange}
              placeholder="What went wrong? Include steps to reproduce if you can."
              aria-describedby={fieldErrors.description ? 'description-error' : undefined}
              aria-invalid={!!fieldErrors.description}
              className={`w-full resize-y rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.description
                  ? 'border-red-400 bg-red-50 text-red-900 placeholder-red-300'
                  : 'border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
            {fieldErrors.description && (
              <p
                id="description-error"
                role="alert"
                aria-live="polite"
                className="mt-1.5 text-sm text-red-600"
              >
                {fieldErrors.description}
              </p>
            )}
          </div>

          {/* Reporter contact (optional) */}
          <div className="mb-7">
            <label htmlFor="reporterContact" className="mb-1 block text-sm font-medium text-gray-700">
              Contact{' '}
              <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <input
              id="reporterContact"
              name="reporterContact"
              type="text"
              value={form.reporterContact}
              onChange={handleChange}
              placeholder="Email or name — in case the team needs to follow up"
              aria-describedby={fieldErrors.reporterContact ? 'contact-error' : undefined}
              aria-invalid={!!fieldErrors.reporterContact}
              className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.reporterContact
                  ? 'border-red-400 bg-red-50 text-red-900 placeholder-red-300'
                  : 'border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
            {fieldErrors.reporterContact && (
              <p
                id="contact-error"
                role="alert"
                aria-live="polite"
                className="mt-1.5 text-sm text-red-600"
              >
                {fieldErrors.reporterContact}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'submitting' ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Submitting…
              </span>
            ) : (
              'Submit Report'
            )}
          </button>

          <p className="mt-4 text-center text-xs text-gray-400">
            Fields marked <span aria-hidden="true">*</span>
            <span className="sr-only">with an asterisk</span> are required.
          </p>
        </form>
      </div>
    </main>
  );
}
