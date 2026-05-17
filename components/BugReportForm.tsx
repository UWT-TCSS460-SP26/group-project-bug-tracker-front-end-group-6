"use client";

import { useId, useRef, useState } from "react";
import { submitIssue } from "@/lib/api";
import type { FieldErrors, Issue } from "@/lib/types";

type FormValues = {
  title: string;
  description: string;
  reporterContact: string;
};

const emptyValues: FormValues = {
  title: "",
  description: "",
  reporterContact: "",
};

function clientValidate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.title.trim()) {
    errors.title = "Title is required.";
  }
  if (!values.description.trim()) {
    errors.description = "Description is required.";
  }
  return errors;
}

export default function BugReportForm() {
  const formId = useId();
  const statusRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedIssue, setSubmittedIssue] = useState<Issue | null>(null);

  const titleId = `${formId}-title`;
  const descriptionId = `${formId}-description`;
  const contactId = `${formId}-contact`;
  const titleErrorId = `${formId}-title-error`;
  const descriptionErrorId = `${formId}-description-error`;
  const contactErrorId = `${formId}-contact-error`;
  const formErrorId = `${formId}-form-error`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBannerError(null);
    setSubmittedIssue(null);

    const localErrors = clientValidate(values);
    setFieldErrors(localErrors);
    if (Object.keys(localErrors).length > 0) {
      statusRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    const result = await submitIssue({
      title: values.title,
      description: values.description,
      reporterContact: values.reporterContact || null,
    });
    setIsSubmitting(false);

    if (result.ok) {
      setValues(emptyValues);
      setFieldErrors({});
      setSubmittedIssue(result.issue);
      statusRef.current?.focus();
      return;
    }

    if (result.kind === "validation") {
      setFieldErrors(result.fieldErrors);
      setBannerError(result.fieldErrors.form ?? result.message);
    } else {
      setBannerError(result.message);
    }
    statusRef.current?.focus();
  }

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  if (submittedIssue) {
    return (
      <section
        className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm"
        aria-labelledby={`${formId}-success-heading`}
      >
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className="rounded-lg border border-[var(--success-text)]/30 bg-[var(--success-bg)] p-6 text-[var(--success-text)]"
        >
          <h2
            id={`${formId}-success-heading`}
            className="text-xl font-semibold text-[var(--foreground)]"
          >
            Report received
          </h2>
          <p className="mt-2">
            Thank you — your bug report was submitted successfully.
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Reference #{submittedIssue.id} · status {submittedIssue.status}
          </p>
          <button
            type="button"
            className="mt-6 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            onClick={() => {
              setSubmittedIssue(null);
              setBannerError(null);
              setFieldErrors({});
            }}
          >
            Submit another report
          </button>
        </div>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm"
      aria-describedby={bannerError ? formErrorId : undefined}
    >
      <div
        ref={statusRef}
        tabIndex={-1}
        className="outline-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {bannerError && (
          <div
            id={formErrorId}
            role="alert"
            className="mb-6 rounded-lg border border-[var(--error-text)]/30 bg-[var(--error-bg)] p-4 text-[var(--error-text)]"
          >
            {bannerError}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor={titleId} className="block text-sm font-medium">
            Title <span className="text-[var(--error-text)]">*</span>
          </label>
          <input
            id={titleId}
            name="title"
            type="text"
            required
            autoComplete="off"
            value={values.title}
            onChange={(e) => updateField("title", e.target.value)}
            aria-invalid={Boolean(fieldErrors.title)}
            aria-describedby={fieldErrors.title ? titleErrorId : undefined}
            disabled={isSubmitting}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:opacity-60"
          />
          {fieldErrors.title && (
            <p
              id={titleErrorId}
              role="alert"
              className="mt-1 text-sm text-[var(--error-text)]"
            >
              {fieldErrors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={descriptionId} className="block text-sm font-medium">
            Description <span className="text-[var(--error-text)]">*</span>
          </label>
          <textarea
            id={descriptionId}
            name="description"
            required
            rows={6}
            value={values.description}
            onChange={(e) => updateField("description", e.target.value)}
            aria-invalid={Boolean(fieldErrors.description)}
            aria-describedby={
              fieldErrors.description ? descriptionErrorId : undefined
            }
            disabled={isSubmitting}
            className="mt-1 w-full resize-y rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:opacity-60"
          />
          {fieldErrors.description && (
            <p
              id={descriptionErrorId}
              role="alert"
              className="mt-1 text-sm text-[var(--error-text)]"
            >
              {fieldErrors.description}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={contactId} className="block text-sm font-medium">
            Contact{" "}
            <span className="font-normal text-[var(--muted)]">(optional)</span>
          </label>
          <p id={`${contactId}-hint`} className="mt-0.5 text-sm text-[var(--muted)]">
            Email or name so we can follow up — not linked to any account.
          </p>
          <input
            id={contactId}
            name="reporterContact"
            type="text"
            autoComplete="email"
            value={values.reporterContact}
            onChange={(e) => updateField("reporterContact", e.target.value)}
            aria-invalid={Boolean(fieldErrors.reporterContact)}
            aria-describedby={
              fieldErrors.reporterContact
                ? contactErrorId
                : `${contactId}-hint`
            }
            disabled={isSubmitting}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:opacity-60"
          />
          {fieldErrors.reporterContact && (
            <p
              id={contactErrorId}
              role="alert"
              className="mt-1 text-sm text-[var(--error-text)]"
            >
              {fieldErrors.reporterContact}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 w-full rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[10rem]"
      >
        {isSubmitting ? "Submitting…" : "Submit report"}
      </button>
    </form>
  );
}
