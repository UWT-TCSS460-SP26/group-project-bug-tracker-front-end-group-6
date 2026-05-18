'use client'

import { useRef, useState } from 'react'

type FormState =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success'; issueId: number; title: string }
  | { type: 'api_error'; message: string }
  | { type: 'network_error' }

export default function BugReportForm() {
  const [state, setState] = useState<FormState>({ type: 'idle' })
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState({ type: 'loading' })

    const fd = new FormData(e.currentTarget)
    const title = (fd.get('title') as string).trim()
    const description = (fd.get('description') as string).trim()
    const reporterContact = (fd.get('reporterContact') as string).trim() || undefined

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    try {
      const res = await fetch(`${apiUrl}/v1/issues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, reporterContact }),
      })

      const json = await res.json()

      if (res.status === 201) {
        setState({ type: 'success', issueId: json.id, title })
        formRef.current?.reset()
      } else {
        setState({
          type: 'api_error',
          message: json.message || json.error || 'The server rejected your submission. Please check your input and try again.',
        })
      }
    } catch {
      setState({ type: 'network_error' })
    }
  }

  function handleReset() {
    setState({ type: 'idle' })
    formRef.current?.reset()
  }

  if (state.type === 'success') {
    return (
      <div
        role="alert"
        className="rounded-lg border border-green-200 bg-green-50 p-6 text-center"
      >
        <svg
          className="mx-auto mb-3 h-10 w-10 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <h2 className="mb-1 text-xl font-semibold text-green-800">Report submitted</h2>
        <p className="mb-1 text-green-700">
          <span className="font-medium">&ldquo;{state.title}&rdquo;</span> was filed as issue #{state.issueId}.
        </p>
        <p className="mb-4 text-sm text-green-600">
          The team will triage it and reach out if contact info was provided.
        </p>
        <button
          onClick={handleReset}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Submit another report
        </button>
      </div>
    )
  }

  const isLoading = state.type === 'loading'

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      {state.type === 'api_error' && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <strong className="font-semibold">Submission failed: </strong>
          {state.message}
        </div>
      )}

      {state.type === 'network_error' && (
        <div
          role="alert"
          className="rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800"
        >
          <strong className="font-semibold">Could not reach the server.</strong> Your report was not
          submitted — your input is still here. Check your connection and try again.
        </div>
      )}

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
          Title <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={200}
          placeholder="Short summary of the issue"
          disabled={isLoading}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
          Description <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          placeholder="Describe what happened — steps to reproduce, expected vs. actual behavior, etc."
          disabled={isLoading}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
        />
      </div>

      <div>
        <label htmlFor="reporterContact" className="mb-1 block text-sm font-medium text-gray-700">
          Contact <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="reporterContact"
          name="reporterContact"
          type="text"
          maxLength={200}
          placeholder="Email or name — not linked to any account"
          disabled={isLoading}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Submitting…
          </>
        ) : (
          'Submit Bug Report'
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        Fields marked <span className="text-red-500">*</span> are required. No account needed.
      </p>
    </form>
  )
}
