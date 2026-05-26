import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { auth } from '@/auth';
import TriageHeader from '@/components/TriageHeader';
import TriageQueue from '@/components/TriageQueue';

export default async function TriagePage() {
  const devBypass = process.env.NEXT_PUBLIC_TRIAGE_DEV_BYPASS === 'true';
  const session = await auth();
  const accessToken = devBypass ? 'dev-bypass' : session?.accessToken;
  const role = devBypass
    ? process.env.NEXT_PUBLIC_TRIAGE_DEV_ROLE ?? 'Admin'
    : session?.role;

  if (!accessToken) {
    redirect('/login?callbackUrl=/triage');
  }

  if (!devBypass && !session?.canTriage) {
    redirect('/login?error=forbidden');
  }

  return (
    <div className="page-shell triage-shell">
      <TriageHeader role={role} email={session?.user?.email} />
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
            <TriageQueue accessToken={accessToken} />
          </Suspense>
        </div>
      </main>
      <footer className="site-footer">
        TCSS 460 · Group 6 · Triage
      </footer>
    </div>
  );
}
