import BugReportForm from './components/BugReportForm'

export default function Home() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center justify-center rounded-full bg-indigo-100 p-3">
          <svg
            className="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M5.07 19H19a2 2 0 001.75-2.96L13.75 4a2 2 0 00-3.5 0L3.25 16.04A2 2 0 005.07 19z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Report a Bug</h1>
        <p className="mt-2 text-sm text-gray-500">
          Found something broken? Let us know — no account required.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <BugReportForm />
      </div>

      <p className="mt-6 text-center text-xs text-gray-400">
        TCSS 460 · Group 6 · Bug Tracker
      </p>
    </main>
  )
}
