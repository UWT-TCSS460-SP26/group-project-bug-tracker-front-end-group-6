import Link from 'next/link';

interface SiteHeaderProps {
  triageLink?: boolean;
}

export default function SiteHeader({ triageLink = false }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link href="/" className="logo-link">
        <div className="logo-mark" aria-hidden="true">
          🐛
        </div>
        <div className="logo-text">
          <h1>BugTrack</h1>
          <p>Group 6 API</p>
        </div>
      </Link>
      <nav className="site-nav" aria-label="Main">
        <Link href="/">Report</Link>
        {triageLink && <Link href="/triage">Triage</Link>}
        <Link href="/login">Sign in</Link>
      </nav>
    </header>
  );
}
