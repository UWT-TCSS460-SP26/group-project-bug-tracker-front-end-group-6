# Individual AI Workflow Writeups

Each team member documents their solo scaffolding session here: the prompts used, what the agent produced, what was kept and cut, and what they'd do differently.

---

## [Team Member Name]

**Tool used:** Claude Code (claude-sonnet-4-6)

**First prompt:**
> Read sprint-5.md and openapi.yaml in this folder. Build the Bug Tracker FE described in the sprint doc against the API in the spec.

**What the agent produced on the first cut:**
A complete Next.js 14 app with App Router, TypeScript, and Tailwind CSS. The agent scaffolded:
- `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`
- `app/layout.tsx` — root layout with metadata
- `app/page.tsx` — page shell with header and card wrapper
- `app/components/BugReportForm.tsx` — client component with the three required states (success, API error, network failure)
- `.env.local` pre-filled with the deployed backend URL from the OpenAPI spec
- `.env.example`, `.gitignore`, and `README.md`

**What was good:**
- Pulled `POST /v1/issues` fields (`title`, `description`, `reporterContact`) directly from the `IssueRequest` schema in the spec — required vs. optional matched exactly.
- All three feedback states (success, 400 API error, network exception) were handled in one pass.
- Used `NEXT_PUBLIC_API_URL` env var with no hardcoded URLs in component code.
- Accessible form with `label`/`id` associations, `role="alert"` on error/success banners, `aria-hidden` on decorative icons.
- The build compiled clean on the first try (`next build` passed with no errors).

**What was cut / changed:**
- None on this pass — the first cut was kept as-is.

**What I'd do differently next time:**
- Drop a sketch of the desired form layout into the context directory so the agent produces the visual design I want, not just a functional one.
- Add a `CORS_NOTES.md` file describing the backend config change needed — the agent noted it in the README but didn't produce the actual BE change.

---

_Add one section per team member. Keep it concrete: what you prompted, what came back, what you kept and cut._
