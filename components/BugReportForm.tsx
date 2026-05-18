"use client";

import { useState, useRef, useId } from "react";
import { submitIssue, type Issue } from "@/lib/api";

interface FieldErrors {
  title?: string;
  description?: string;
}

type FormState =
  | { phase: "idle" }
  | { phase: "submitting" }
  | { phase: "success"; issue: Issue }
  | { phase: "error"; message: string };

export default function BugReportForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formState, setFormState] = useState<FormState>({ phase: "idle" });

  const titleRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const titleId = useId();
  const descId = useId();
  const contactId = useId();
  const titleErrId = useId();
  const descErrId = useId();

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!title.trim()) errors.title = "Title is required.";
    else if (title.trim().length < 3)
      errors.title = "Title must be at least 3 characters.";
    if (!description.trim()) errors.description = "Description is required.";
    else if (description.trim().length < 10)
      errors.description = "Please describe the issue in a bit more detail.";
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      // Focus the first errored field
      if (errors.title) titleRef.current?.focus();
      return;
    }

    setFormState({ phase: "submitting" });

    const result = await submitIssue({
      title: title.trim(),
      description: description.trim(),
      ...(contact.trim() ? { reporterContact: contact.trim() } : {}),
    });

    if (result.ok) {
      setFormState({ phase: "success", issue: result.data });
    } else {
      setFormState({ phase: "error", message: result.message });
    }
  }

  function handleReset() {
    setTitle("");
    setDescription("");
    setContact("");
    setFieldErrors({});
    setFormState({ phase: "idle" });
    // Restore the draft if server error — already preserved in state
    setTimeout(() => titleRef.current?.focus(), 50);
  }

  const isSubmitting = formState.phase === "submitting";

  // ── Success view ────────────────────────────────
  if (formState.phase === "success") {
    return (
      <div className="success-view">
        <span className="success-bug" role="img" aria-label="Bug fixed!">
          🐛
        </span>
        <h3>Report received!</h3>
        <p>Thanks for taking the time to flag this.</p>
        <p>The team will triage it and get to work.</p>
        <div className="issue-id-badge">
          <span>🏷️</span>
          <span>Issue #{formState.issue.id}</span>
        </div>
        <br />
        <button className="btn-ghost" onClick={handleReset}>
          Submit another report
        </button>
      </div>
    );
  }

  // ── Form view ───────────────────────────────────
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Bug report form"
    >
      <div className="form-stack">
        {/* Network / server error banner */}
        {formState.phase === "error" && (
          <div
            className="alert alert-error"
            role="alert"
            aria-live="assertive"
          >
            <span className="alert-icon">⚠️</span>
            <div className="alert-body">
              <strong>Something went wrong</strong>
              {formState.message} — your report text is still here, so you can
              try again.
            </div>
          </div>
        )}

        {/* Title */}
        <div className="field">
          <label className="field-label" htmlFor={titleId}>
            Title <span className="required-dot" aria-hidden="true">*</span>
          </label>
          <p className="field-hint" id={`${titleId}-hint`}>
            A short, specific summary of the problem.
          </p>
          <input
            ref={titleRef}
            id={titleId}
            className={`field-input${fieldErrors.title ? " error" : ""}`}
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (fieldErrors.title)
                setFieldErrors((p) => ({ ...p, title: undefined }));
            }}
            placeholder="e.g. Search returns no results for exact title"
            aria-required="true"
            aria-describedby={`${titleId}-hint${fieldErrors.title ? ` ${titleErrId}` : ""}`}
            aria-invalid={!!fieldErrors.title}
            disabled={isSubmitting}
            maxLength={200}
          />
          {fieldErrors.title && (
            <span id={titleErrId} className="field-error" role="alert">
              <span aria-hidden="true">⚠</span> {fieldErrors.title}
            </span>
          )}
          <div className="field-footer">
            <span className="char-count">{title.length}/200</span>
          </div>
        </div>

        {/* Description */}
        <div className="field">
          <label className="field-label" htmlFor={descId}>
            Description <span className="required-dot" aria-hidden="true">*</span>
          </label>
          <p className="field-hint" id={`${descId}-hint`}>
            What happened? Include steps to reproduce if you can.
          </p>
          <textarea
            id={descId}
            className={`field-textarea${fieldErrors.description ? " error" : ""}`}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (fieldErrors.description)
                setFieldErrors((p) => ({ ...p, description: undefined }));
            }}
            placeholder={`Steps to reproduce:\n1. Go to /movies and search for "Inception"\n2. Results list is empty\n\nExpected: matching movie cards\nActual: empty list`}
            rows={7}
            aria-required="true"
            aria-describedby={`${descId}-hint${fieldErrors.description ? ` ${descErrId}` : ""}`}
            aria-invalid={!!fieldErrors.description}
            disabled={isSubmitting}
            maxLength={4000}
          />
          {fieldErrors.description && (
            <span id={descErrId} className="field-error" role="alert">
              <span aria-hidden="true">⚠</span> {fieldErrors.description}
            </span>
          )}
          <div className="field-footer">
            <span className="char-count">{description.length}/4000</span>
          </div>
        </div>

        <div className="form-divider" role="separator" />

        {/* Reporter contact (optional) */}
        <div className="field">
          <label className="field-label" htmlFor={contactId}>
            Your email or name
            <span
              style={{
                fontWeight: 400,
                color: "var(--text-muted)",
                fontSize: "0.78rem",
                marginLeft: 4,
              }}
            >
              (optional)
            </span>
          </label>
          <p className="field-hint" id={`${contactId}-hint`}>
            So we can follow up if we need more info. Leave blank to report
            anonymously.
          </p>
          <input
            id={contactId}
            className="field-input"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="you@example.com or &quot;Alex from QA&quot;"
            aria-describedby={`${contactId}-hint`}
            disabled={isSubmitting}
            maxLength={200}
          />
        </div>

        {/* Submit row */}
        <div className="submit-row">
          <p className="submit-note">
            Fields marked <span style={{ color: "var(--red-soft)" }}>*</span>{" "}
            are required.
            <br />
            Reports go straight to the triage queue.
          </p>
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                <span aria-hidden="true">🐛</span>
                Submit report
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
