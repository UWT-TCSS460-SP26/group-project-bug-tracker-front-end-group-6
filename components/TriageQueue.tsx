'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { listIssues } from '@/lib/api';
import type { Issue, IssueStatus } from '@/types/api';

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All statuses' },
  { value: 'Open', label: 'Open' },
  { value: 'InProgress', label: 'In progress' },
  { value: 'Resolved', label: 'Resolved' },
  { value: 'Closed', label: 'Closed' },
  { value: 'Wontfix', label: "Won't fix" },
];

const STATUS_CLASS: Record<IssueStatus, string> = {
  Open: 'status-open',
  InProgress: 'status-progress',
  Resolved: 'status-resolved',
  Closed: 'status-closed',
  Wontfix: 'status-wontfix',
};

interface TriageQueueProps {
  accessToken: string;
}

export default function TriageQueue({ accessToken }: TriageQueueProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const status = searchParams.get('status') ?? '';
  const sort = searchParams.get('sort') === 'oldest' ? 'oldest' : 'newest';

  const [issues, setIssues] = useState<Issue[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await listIssues(accessToken, {
      page,
      limit: 20,
      sort,
      ...(status ? { status } : {}),
    });
    if (result.ok) {
      setIssues(result.data.data);
      setTotalPages(result.data.meta.totalPages);
      setTotal(result.data.meta.total);
    } else {
      setError(result.message);
    }
    setLoading(false);
  }, [accessToken, page, sort, status]);

  useEffect(() => {
    void load();
  }, [load]);

  function updateQuery(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (key === 'page' && value === '1') params.delete('page');
    else if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.delete('page');
    const qs = params.toString();
    router.push(qs ? `/triage?${qs}` : '/triage');
  }

  return (
    <div className="triage-panel">
      <div className="triage-toolbar">
        <label className="toolbar-field">
          <span className="toolbar-label">Status</span>
          <select
            value={status}
            onChange={(e) => updateQuery('status', e.target.value)}
            className="field-input toolbar-select"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value || 'all'} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label className="toolbar-field">
          <span className="toolbar-label">Sort</span>
          <select
            value={sort}
            onChange={(e) => updateQuery('sort', e.target.value)}
            className="field-input toolbar-select"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
        <button type="button" className="btn-ghost" onClick={() => void load()}>
          Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-error" role="alert">
          <span className="alert-icon">⚠️</span>
          <div className="alert-body">
            <strong>Could not load queue</strong>
            {error}
          </div>
        </div>
      )}

      {loading ? (
        <p className="triage-muted">Loading issues…</p>
      ) : issues.length === 0 ? (
        <p className="triage-muted">No issues match this filter.</p>
      ) : (
        <ul className="issue-list">
          {issues.map((issue) => (
            <li key={issue.id}>
              <Link href={`/triage/${issue.id}`} className="issue-row">
                <span className="issue-id">#{issue.id}</span>
                <span className="issue-title">{issue.title}</span>
                <span className={`status-pill ${STATUS_CLASS[issue.status]}`}>
                  {issue.status}
                </span>
                <time className="issue-date" dateTime={issue.createdAt}>
                  {new Date(issue.createdAt).toLocaleDateString()}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="triage-pagination">
        <span className="triage-muted">
          {total} report{total === 1 ? '' : 's'}
        </span>
        <div className="pagination-buttons">
          <button
            type="button"
            className="btn-ghost"
            disabled={page <= 1}
            onClick={() => updateQuery('page', String(page - 1))}
          >
            Previous
          </button>
          <span className="triage-muted">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="btn-ghost"
            disabled={page >= totalPages}
            onClick={() => updateQuery('page', String(page + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
