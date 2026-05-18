import BugReportForm from "@/components/BugReportForm";

export default function Page() {
  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="logo-mark" aria-hidden="true">🐛</div>
        <div className="logo-text">
          <h1>BugTrack</h1>
          <p>Group 6 API</p>
        </div>
      </header>

      <main className="main-content">
        <div className="hero">
          <h2>
            Found a bug? <em>Tell us.</em>
          </h2>
          <p>
            Use this form to report issues with the Group 6 API. Your report
            goes straight to the triage queue — no login required.
          </p>
        </div>

        <div className="card">
          <BugReportForm />
        </div>

        <div className="mascot-strip">
          <span className="mascot-emoji" aria-hidden="true">🐛</span>
          <div className="mascot-text">
            <strong>Reports are anonymous by default</strong>
            <span>
              Add your email or name only if you want us to follow up. The team
              sees every submission regardless.
            </span>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        TCSS 460 · Group 6 · Spring 2026
      </footer>
    </div>
  );
}
