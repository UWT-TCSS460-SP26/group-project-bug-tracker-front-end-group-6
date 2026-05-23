'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteIssue, getIssue, updateIssueStatus } from '@/lib/api';
import type { Issue, IssueStatus } from '@/types/api';

const STATUSES: IssueStatus[] = [
  'Open',
  'InProgress',
  'Resolved',
  'Closed',
  'Wontfix',
];

interface IssueDetailPanelProps {
  accessToken: string;
  initialIssue: Issue;
}

export default function IssueDetailPanel({
  accessToken,
  initialIssue,
}: IssueDetailPanelProps) {
  const router = useRouter();
  const [issue, setIssue] = useState(initialIssue);
  const [status, setStatus] = useState<IssueStatus>(initialIssue.status);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSave() {
    setBusy(true);
    setError(null);
    setMessage(null);
    const result = await updateIssueStatus(accessToken, issue.id, status);
    if (result.ok) {
      setIssue(result.data);
      setMessage('Status updated.');
    } else {
      setError(result.message);
    }
    setBusy(false);
  }

  async function handleDelete() {
    if (
      !window.confirm(
        `Delete issue #${issue.id}? This cannot be undone.`
      )
    ) {
      return;
    }
    setBusy(true);
    setError(null);
    const result = await deleteIssue(accessToken, issue.id);
    if (result.ok) {
      router.push('/triage');
      router.refresh();
    } else {
      setError(result.message);
      setBusy(false);
    }
  }

  async function handleRefresh() {
    setBusy(true);
    setError(null);
    const result = await getIssue(accessToken, issue.id);
    if (result.ok) {
      setIssue(result.data);
      setStatus(result.data.status);
    } else {
      setError(result.message);
    }
    setBusy(false);
  }

  return (
    <div className="triage-detail card">
      <Link href="/triage" className="back-link">
        ← Back to queue
      </Link>

      <div className="detail-header">
        <h2>
          #{issue.id} — {issue.title}
        </h2>
        <span className={`status-pill status-pill-${issue.status}`}>
          {issue.status}
        </span>
      </div>

      {message && (
        <div className="alert alert-success" role="status">
          <span className="alert-icon">✓</span>
          <div className="alert-body">{message}</div>
        </div>
      )}
      {error && (
        <div className="alert alert-error" role="alert">
          <span className="alert-icon">⚠️</span>
          <div className="alert-body">{error}</div>
        </div>
      )}

      <dl className="detail-meta">
        <div>
          <dt>Reporter</dt>
          <dd>{issue.reporterContact ?? 'Anonymous'}</dd>
        </div>
        <div>
          <dt>Created</dt>
          <dd>{new Date(issue.createdAt).toLocaleString()}</dd>
        </div>
        <div>
          <dt>Updated</dt>
          <dd>{new Date(issue.updatedAt).toLocaleString()}</dd>
        </div>
      </dl>

      <section className="detail-section">
        <h3>Description</h3>
        <pre className="detail-body">{issue.description}</pre>
      </section>

      {issue.reproSteps && (
        <section className="detail-section">
          <h3>Repro steps</h3>
          <pre className="detail-body">{issue.reproSteps}</pre>
        </section>
      )}

      <div className="detail-actions">
        <label className="field">
          <span className="field-label">Triage status</span>
          <select
            className="field-input"
            value={status}
            onChange={(e) => setStatus(e.target.value as IssueStatus)}
            disabled={busy}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <div className="detail-buttons">
          <button
            type="button"
            className="btn-primary"
            onClick={() => void handleSave()}
            disabled={busy || status === issue.status}
          >
            Save status
          </button>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => void handleRefresh()}
            disabled={busy}
          >
            Refresh
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={() => void handleDelete()}
            disabled={busy}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
