import Link from 'next/link';
import { signIn } from '@/auth';
import SiteHeader from '@/components/SiteHeader';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const forbidden = params.error === 'forbidden';
  const callbackUrl = params.callbackUrl ?? '/triage';

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="main-content">
        <div className="hero">
          <h2>
            Triage <em>sign-in</em>
          </h2>
          <p>
            Admin, SuperAdmin, and Owner roles can access the triage queue. Sign
            in with your TCSS 460 account.
          </p>
        </div>

        <div className="card login-card">
          {forbidden && (
            <div className="alert alert-error" role="alert">
              <span className="alert-icon">⚠️</span>
              <div className="alert-body">
                <strong>Access denied</strong>
                Your account does not have triage permissions. Ask a teammate to
                promote your role in the backend database (Admin or higher).
              </div>
            </div>
          )}

          <form
            action={async () => {
              'use server';
              await signIn('auth2', { redirectTo: callbackUrl });
            }}
          >
            <button type="submit" className="btn-primary login-btn">
              Sign in with Auth²
            </button>
          </form>

          <p className="login-hint">
            <Link href="/">← Back to public bug report</Link>
          </p>
        </div>
      </main>
      <footer className="site-footer">
        TCSS 460 · Group 6 · Spring 2026
      </footer>
    </div>
  );
}
