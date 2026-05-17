import BugReportForm from "@/components/BugReportForm";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4 py-12">
      <header className="mb-8 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
          TCSS 460 · Team 6
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Report a bug
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Found something broken in our API? Tell us what happened — no account
          needed.
        </p>
      </header>
      <BugReportForm />
    </main>
  );
}
