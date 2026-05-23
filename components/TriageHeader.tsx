'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface TriageHeaderProps {
  role?: string;
  email?: string | null;
}

export default function TriageHeader({ role, email }: TriageHeaderProps) {
  return (
    <header className="site-header">
      <Link href="/" className="logo-link">
        <div className="logo-mark" aria-hidden="true">
          🐛
        </div>
        <div className="logo-text">
          <h1>BugTrack</h1>
          <p>Triage · Group 6</p>
        </div>
      </Link>
      <nav className="site-nav" aria-label="Triage">
        <Link href="/">Report form</Link>
        <Link href="/triage" aria-current="page">
          Queue
        </Link>
        <span className="nav-user" title={email ?? undefined}>
          {role ?? 'Admin'}
        </span>
        <button
          type="button"
          className="btn-ghost btn-nav"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Sign out
        </button>
      </nav>
    </header>
  );
}
