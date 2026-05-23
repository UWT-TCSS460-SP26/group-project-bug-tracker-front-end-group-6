import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { auth } from '@/auth';
import TriageHeader from '@/components/TriageHeader';
import TriageQueue from '@/components/TriageQueue';

export default async function TriagePage() {
  const session = await auth();

  if (!session?.accessToken) {
    redirect('/login?callbackUrl=/triage');
  }

  if (!session.canTriage) {
    redirect('/login?error=forbidden');
  }

  return (
    <div className="page-shell triage-shell">
      <TriageHeader role={session.role} email={session.user?.email} />
      <main className="main-content main-content-wide">
        <div className="hero">
          <span className="hero-eyebrow">Admin · SuperAdmin · Owner</span>
          <h2>
            Triage <em>queue</em>
          </h2>
          <p>
            Review incoming bug reports, update status, and remove spam or
            duplicates.
          </p>
        </div>
        <div className="card">
          <Suspense fallback={<p className="triage-muted">Loading queue…</p>}>
            <TriageQueue accessToken={session.accessToken} />
          </Suspense>
        </div>
      </main>
      <footer className="site-footer">
        TCSS 460 · Group 6 · Triage
      </footer>
    </div>
  );
}
