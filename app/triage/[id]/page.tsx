import { redirect, notFound } from 'next/navigation';
import { auth } from '@/auth';
import { getIssue } from '@/lib/api';
import TriageHeader from '@/components/TriageHeader';
import IssueDetailPanel from '@/components/IssueDetailPanel';

export default async function TriageIssuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!session?.accessToken) {
    redirect(`/login?callbackUrl=/triage/${idParam}`);
  }

  if (!session.canTriage) {
    redirect('/login?error=forbidden');
  }

  if (!Number.isFinite(id)) {
    notFound();
  }

  const result = await getIssue(session.accessToken, id);
  if (!result.ok) {
    if (result.status === 404) notFound();
    return (
      <div className="page-shell triage-shell">
        <TriageHeader role={session.role} email={session.user?.email} />
        <main className="main-content main-content-wide">
          <div className="alert alert-error" role="alert">
            <span className="alert-icon">⚠️</span>
            <div className="alert-body">{result.message}</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell triage-shell">
      <TriageHeader role={session.role} email={session.user?.email} />
      <main className="main-content main-content-wide">
        <IssueDetailPanel
          accessToken={session.accessToken}
          initialIssue={result.data}
        />
      </main>
      <footer className="site-footer">
        TCSS 460 · Group 6 · Issue #{id}
      </footer>
    </div>
  );
}
