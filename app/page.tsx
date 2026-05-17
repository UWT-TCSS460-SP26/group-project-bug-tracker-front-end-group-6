import BugReportForm from "@/components/BugReportForm";

export default function Home() {
  return (
    <div className="page-shell">
      {/* ── Header ─────────────────────────────────── */}
      <header className="site-header">
        <div className="logo-mark" aria-hidden="true">🐛</div>
        <div className="logo-text">
          <h1>BugTrack</h1>
          <p>Report it. Fix it. Ship it.</p>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────── */}
      <main className="main-content" id="main-content">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-eyebrow" aria-hidden="true">
            <span>✦</span> Public Bug Tracker
          </div>
          <h2 id="hero-heading">
            Found something <em>broken?</em>
          </h2>
          <p>
            File a report below — no account needed. Your report goes straight
            to the team&rsquo;s triage queue and we&rsquo;ll get it sorted.
          </p>
        </section>

        <div className="card" role="region" aria-label="Bug report form">
          <BugReportForm />
        </div>

        <aside className="mascot-strip" aria-label="Encouragement">
          <span className="mascot-emoji" role="img" aria-label="Bug with sparkles">
            🐛✨
          </span>
          <div className="mascot-text">
            <strong>Thanks for helping make things better!</strong>
            <span>
              Every report you file helps the team ship more reliable software.
            </span>
          </div>
        </aside>
      </main>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="site-footer">
        <p>
          TCSS 460 · Group 6 · Spring 2026 ·{" "}
          <a
            href="https://tcss460-team-6-api.onrender.com/health"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--green-mid)", textDecoration: "none" }}
          >
            API status ↗
          </a>
        </p>
      </footer>
    </div>
  );
}
