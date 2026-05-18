# Individual AI Workflow Writeups

---

## Luke Willis

### First prompt

> "Read sprint5.md, README.md, and openapi.yaml in this folder. Build the Bug Tracker FE described in the sprint doc against the API in the spec."

This was my first prompt. I got the entire file structure laid out, clear and consice.

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

Everything -- almost. The first cut was clear and consice. I noticed no missing endpoints, no hallucinations, none of that crap. What I DID notice, however, was that my README.md got all kinds of wacked up. I'll discuss that next.

### What I cut

Nothing was cut from the code. However, the README.md was written in UTF-16 (??) which my VSCode was unable to view. I instructed claude code to fix it and it did a weird workaround in Powershell. It works, I'm just confused as to why it did it that way.

### What I'd do differently next time

If I were to do this again, I think I would add more context from my project, such as the CLAUDE.md file we have been working on and maybe also add context of what I want the design to look like. Because I didn't give it any context in terms of design, it gave me a simple white theme with blue interaction boxes. Also, Claude also took the liberty of doing this write up for me. I've revised most of the sections so they were written in my own words. Some parts of the summary are helpful, but if I Were to do this again I think I would tell it to ignore the WORKFLOWS.md and let me do it myself.

### Takeaway

Context is crucial! And additionally, oftentimes I overcomplicate things with my Claude by overexplaining instead of giving adequate context.
