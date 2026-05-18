# Individual AI Workflow Writeups

---

## Luke Willis

### First prompt

> "Read sprint5.md, README.md, and openapi.yaml in this folder. Build the Bug Tracker FE described in the sprint doc against the API in the spec."

That was the entire prompt — no architecture explanation, no framework lecture. The context (three files) did the work.

### What came back on the first cut

Claude Code read all three files and immediately understood the scope:

- `POST /v1/issues` is the only endpoint the FE touches
- `IssueRequest` has three fields: `title` (required), `description` (required), `reporterContact` (optional)
- The sprint spec calls out three required UI states: success, 400 validation error, network failure
- The backend URL was already in README.md, so no hardcoded URL needed — it used `NEXT_PUBLIC_API_URL`

The first cut produced a complete Next.js 14 App Router project: `package.json`, `tsconfig.json`, `next.config.ts`, Tailwind CSS config, `app/layout.tsx`, `app/globals.css`, and `app/page.tsx`.

The form had:
- Controlled inputs for all three fields
- Client-side required checks before hitting the API
- Three distinct states: success screen (with "Submit another" button), inline field errors on 400, and a non-cryptic banner on network failure that preserved form data
- A loading spinner + disabled button during submission
- Accessible labels, `aria-describedby` wiring error messages to their fields, `aria-invalid`, and `role="alert"` on error paragraphs
- `aria-live="assertive"` on the top-level error banner and `aria-live="polite"` on inline errors
- `ref`-based focus management: on failed client-side validation, focus snaps to the title field

### What I kept

Everything. The first cut was clean and complete — no hallucinated endpoints, no extra features that weren't in scope, no half-finished abstractions. The error-handling pattern (try/catch split into network failure vs. server error, `.json().catch(() => ({}))` to handle non-JSON 5xx bodies) was notably thoughtful.

### What I cut

Nothing from the code. I did add this WORKFLOWS.md afterward (the sprint requires it) and updated the README with deployment instructions.

### What I'd do differently next time

The three-file context drop worked exactly as described in the sprint doc. If I were doing this again:
- I'd add an example 400 response body to the context so the agent could write more specific field-error parsing logic
- I'd drop a sketch of the success state in the context to be explicit about "form clears, show confirmation, provide a reset link"

The agent inferred both of those correctly anyway, but explicit context would have removed any uncertainty.

### Takeaway

"Prompting tells the agent what to do; context tells it what it's working on." The sprint doc said this and it held up. A 12-word prompt with a rich working directory beat any 400-word prompt I could have written.
