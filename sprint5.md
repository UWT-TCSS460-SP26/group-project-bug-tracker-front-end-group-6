Sprint 5 — Bug Tracker FE¶
School of Engineering and Technology, University of Washington Tacoma
TCSS 460 — Client/Server Programming, Spring 2026

Due Date

Sunday, May 17, 2026, 11:59 PM

Sprint Narrative¶
This week the groups swap and your team becomes a front-end team for the first time. Before you take on consuming a partner's API, you build a small front-end on the API you know best: your own. The job is a public bug-report form that posts to your own POST /issues. No login, no triage dashboard, no admin views. Your downstream partner — paired with your API at the start of this week — will use this form during Sprints 6–8 every time something breaks. Triage stays on your side of the wall: you'll work the queue from Postman or Prisma Studio against the admin routes you shipped in Sprint 4.

This sprint is also where AI scaffolding becomes the explicit workflow. You haven't been taught React or Next.js yet — that arrives this week and across the rest of the quarter. What you're practicing now is the prompt-and-iterate loop: feed an agent a real spec, read what it produces, decide what to keep. Code-level understanding follows in the Week 7+ readings, lectures, and Check-Off 6. For this sprint, the bar is "I can describe my workflow," not "I can explain every line."

MVP

By the end of this sprint, every team member has individually scaffolded a Bug Tracker FE with an AI agent against your team's OpenAPI spec, the team has met to compare those builds, and the team has shipped one final version — either the strongest individual build, or a composite the team (or an agent) merged from the best features. The final build lives in your team's Sprint 5 GitHub Classroom group repository, deployed to a public URL, posting successfully to your live POST /issues, with realistic success / validation-error / network-failure states. Each member's individual workflow writeup — prompts, agent output, what was kept and cut — is committed to the final repo. NextAuth and OAuth2 do not appear this sprint; they arrive next week with the consumer app.

Course Learning Objectives¶
This sprint contributes to the following course learning objectives:

LO 4: Build interactive front-end applications using a component-based framework (Next.js)
LO 5: Deploy full-stack applications to cloud infrastructure
LO 7: Collaborate in teams using version control workflows, sprint milestones, and code review
It also supports these course outcomes:

Inquiry and Critical Thinking — designing the prompt that gets a useful first cut from an agent, judging which of multiple AI-scaffolded builds is the strongest, and deciding what to merge versus throw out
Communication/Self-Expression — your individual workflow writeup (the prompts, the iterations, what you kept and cut) is the artifact this sprint produces; the team's final README is what your downstream partner reads
How This Sprint Works¶
This sprint is structured differently from earlier sprints. You haven't learned React or Next.js yet — that comes in the readings and lectures across Week 7 and beyond. The point of Sprint 5 is the AI-driven scaffolding workflow itself.

The flow is:

Individually. Each team member scaffolds their own Bug Tracker FE with an agentic coding tool (Claude Code, Cursor, etc.) against the team's OpenAPI spec. Solo work — local-only on your machine, or in any personal repo of your choosing. There is no GitHub Classroom repo for individual scaffolds; bring your build (and your workflow writeup) to the team meeting.
Together. The team meets, walks through each member's build, and either:
Picks the strongest individual build to be the team's final, or
Merges the best features from multiple builds into a composite. An agent can drive this merge — that's a fair use of AI here.
Ship once. The team's selected or merged build goes into the team's Sprint 5 GitHub Classroom repository (one repo per group, not per member). That repo — and only that repo — is what's deployed and what your downstream partner uses.
Document. Each member writes up their individual AI workflow (prompts used, what came back, what was kept and cut, what they'd do differently next time). Those writeups are committed to the final team repo so the prompt-and-iterate process is captured as the learning artifact.
GitHub Classroom — Sprint 5 Group Repo

The Sprint 5 GitHub Classroom assignment is a group assignment, like every other sprint — one repository per team, not one per student. The starter repo is empty — your team drops the final selected-or-merged build in fresh.

Accept the assignment: Sprint 5 — Bug Tracker FE on GitHub Classroom

One team member accepts first and creates the team; remaining members accept the same link and join the existing team.

Working with the Agent: Context Over Prompting

The way to get the most out of an agent on this sprint isn't a longer prompt — it's a richer working directory. The skill being practiced is preparing the context so the agent can do most of the work without you spelling everything out.

Try this:

Start in a fresh, empty directory. Don't open the agent on top of an existing repo full of unrelated context — that just gives it stuff to be confused by.
Drop the materials in as files. Save this sprint document as sprint-5.md in the directory. Save your team's OpenAPI spec as openapi.yaml (or openapi.json) next to it. Add anything else useful — your deployed BE URL in a README.md, an example POST /issues request body, a sketch of the form you have in mind.
Open your agent of choice — Claude Code, OpenAI Codex, VS Code's agent mode, Cursor, whatever it's called this month — and point it at the directory.
Prompt short. Something like "Read sprint-5.md and openapi.yaml in this folder. Build the Bug Tracker FE described in the sprint doc against the API in the spec." That's it. No 400-word prompt, no architecture lecture in the chat.
See how little you can prompt. Resist the urge to over-explain. If the agent goes off-track, the right fix is usually adding a file to the context or correcting a specific output — not writing a longer system message.
Prompting tells the agent what to do; context tells it what it's working on. Most of the value is in the context.

User Stories¶
As a visitor (your downstream partner), I want to file a bug report against your API without creating an account so that reporting friction is zero.¶
The form is the entire app for an unauth visitor. They land on the URL, fill out the fields, submit, and see a confirmation. Field set should match the request body your POST /issues already accepts — required vs. optional follows the OpenAPI spec.

The route this app calls is the same public POST /issues you stood up in Sprint 3. No JWT, no auth headers — your BE accepts unauthenticated reports by design.

Guide

Consuming a Web API — Fetch, request shapes, response handling

As a visitor, I want clear feedback when my submission succeeds, fails validation, or fails because the API is down so that I know whether my report actually got through.¶
A real user hits all three states. Success: confirmation message, form clears or redirects. Validation failure: inline errors next to the offending fields, surfaced from the response your API returned. Network or server failure: a non-cryptic message that doesn't suggest the user did something wrong, and that preserves what they typed so they can retry.

Guide

Accessibility — Form labels, error association, focus management on submit

As a teammate, I want to scaffold my own Bug Tracker FE solo with an agentic coding tool against our team's OpenAPI spec so that I get hands-on time with AI-driven scaffolding before the underlying tech is taught.¶
This is your individual work for the sprint. Open Claude Code, Cursor, or your team's tool of choice. Feed it your team's /api-docs spec (or paste the relevant slice). Ask for a Next.js app with a single public form that posts to POST /issues. Iterate — prompt, read what comes back, prompt again to fix or extend. Take the build as far as you reasonably can on your own.

You are not expected to fully understand the code the agent produced this week. React and Next.js are introduced in the Week 7+ readings, lectures, and Check-Off 6. The skill being practiced now is the workflow itself: writing a prompt that gets a useful first cut, recognizing when to redirect the agent, and judging when "good enough" is good enough.

Where your build lives is your call — local-only on your laptop, or in any personal repo of your choosing. There's no GitHub Classroom repo for individual scaffolds. Either way, bring the build (and your workflow writeup) to the team meeting.

Guide

Using a Coding Agent — Briefing the agent, reading its output, knowing when to redirect
AI Tools Setup — Getting an agentic tool installed and connected to your repo

As a team, we want to compare each member's individual scaffold and either pick the strongest one or merge the best features into a composite so that the final build reflects the team's collective best judgment.¶
The team meeting is the heart of this sprint. Each member walks through what they built, what their prompt sequence looked like, and what they think worked or didn't. Two valid paths from there:

Pick. One member's build is clearly the strongest — adopt it as the team's final.
Merge. Several builds have different strengths (one's form layout is cleanest, another's error handling is more thoughtful, a third's project structure is tidier). Combine them — by hand or by handing all the builds to an agent and prompting for the composite. Either is fair.
Capture the decision in your meeting minutes: which builds were considered, what the strengths were, and why you picked or merged the way you did.

As a teammate, I want to write up my individual AI workflow — what I prompted, what the agent produced, what I kept and cut — so that the team's final repo captures the prompt-and-iterate process as a learning artifact.¶
Your writeup is short and concrete. What did your first prompt look like? What did the agent produce on the first cut? What was good, what missed? What was your second prompt — a redirect, an extension, a fix? What did you ultimately keep, what did you throw out, and what would you prompt differently next time?

This is what gets graded for understanding this sprint, not the code. "I prompted X, got Y, kept Z because…" is the explanation form.

Each member's writeup goes into the final team repo (in the README, or in a WORKFLOWS.md linked from the README — your team's call). Your downstream partner doesn't need to read these — but you and your future self do.

As a frontend developer, I want the form to talk to our deployed API (not localhost) so that the deployed FE actually works end-to-end.¶
Environment variables. Your team picks the variable name (NEXT_PUBLIC_API_URL is the Next.js convention for a value the browser needs to see) and points it at your deployed BE URL in production and your local dev URL in development. No hardcoded URLs in component code. The Deploying Next.js guide walks the env-var setup for both Vercel and Render — the same patterns work whichever host your BE landed on.

CORS lives on the BE side. Your POST /issues route's CORS allowlist needs to accept the deployed FE's origin — that's a config change on your BE repo, not the FE one. Add the FE origin, redeploy the BE, verify the preflight in browser DevTools.

Guide

Deploying Next.js — Environment variables on Vercel and Render

As a team, we want the final Bug Tracker FE deployed to a public URL so that our downstream partner can actually use it during Sprints 6–8.¶
Vercel or Render — your team's choice. Push to main of the team FE repo, deploy auto-runs, public URL lives. Only the final selected/merged build is deployed; individual scaffolds stay in their personal repos or local.

Test against the deployed FE talking to the deployed BE — not localhost-to-localhost. That's the configuration your partner will hit, so that's the configuration that needs to work.

Guide

Deploying Next.js — Vercel + Render walkthrough, env vars, build commands

As a frontend developer (your downstream partner), I want to know where to find your Bug Tracker FE without asking so that bug reports don't go through Slack.¶
The URL goes in your partner-facing README (the one you wrote in Sprint 4) and gets sent to your downstream partner directly. Your partner's consumer app — built in Sprints 6–8 — will link to this URL from a "Report a Bug" button or similar.

Don't make your partner search. The first time they break something against your API, they should know exactly where to file it.

Deliverables¶
Individual (each team member):

Solo AI scaffold of a Bug Tracker FE — local-only or in any personal repo of your choosing (no GHC repo for individual scaffolds)
Workflow writeup — prompts you used, agent output, what you kept and cut, what you'd change next time
Team:

Team meeting minutes capturing each member's build, the comparison, and the pick-or-merge decision
One final build selected or merged from individual scaffolds (agent-driven merge is acceptable)
Sprint 5 GitHub Classroom group repository accepted (separate from your BE repo) — final build lives here
Final build deployed to a public URL (Vercel or Render)
Final build's form posts successfully to your live POST /issues — verifiable from your BE side via Postman or Prisma Studio
Success / validation-error / network-failure states each have visible UI feedback
Final build talks to your deployed API via environment variables — no hardcoded URLs in component code
BE CORS allowlist updated to accept your deployed FE origin; preflight verified end-to-end
All individual workflow writeups committed into the final team repo (in README or WORKFLOWS.md)
Final FE URL added to your partner-facing README (in the BE repo) and sent to your downstream partner
All team members have committed to the final team FE repository
Meeting minutes document updated with sprint planning and any ceremonies
How to Submit

All work must be merged into main by the due date. Your instructor grades from the main branch of your GitHub Classroom repository. The Bug Tracker FE has its own Sprint 5 GitHub Classroom group repository, separate from your BE repo — link it from your group's BE repo README so it's discoverable. Individual scaffolds (local or in personal repos) are not graded for code quality; they're graded together with your workflow writeup.

Triage Stays Server-Side This Sprint

Sprint 5 is intentionally scoped to the public report form only — there's no admin or triage UI. To work the queue, your team uses the admin-gated /issues routes you shipped in Sprint 4 from Postman, or browses the Issue table in Prisma Studio. NextAuth and OAuth2 arrive next sprint with the consumer app.

There will not be a future sprint that builds a triage UI on this Bug Tracker FE. If you want one, build it yourself. With remaining tokens this week — or, more realistically, in a fresh session once Week 7's NextAuth content lands — you can extend this FE into a full bug-triage tool. The shape of that work:

Add NextAuth (Auth.js) and configure it against Auth² as an OAuth2 provider — the issuer is https://tcss-460-iam.onrender.com, the audience is your group-N-api name, the client ID/secret come from your group's pre-seeded consumer client in the tcss460-sp26 tenant.
Give yourself admin on your own BE. Auth² hands every student a User-role token — admin determination is entirely your BE's responsibility. Promote your own user in your local User table (Prisma Studio is the fastest way: open the row, flip the role column to whatever your team's admin gate checks). The token from Auth² will keep saying User; your BE's middleware decides who's an admin from the local row.
Sign in through NextAuth and store the access token on the session; pass it as Authorization: Bearer <token> on every outbound call to your BE.
Call your admin-gated /issues routes — GET /issues for the list, GET /issues/:id for detail, PATCH /issues/:id for status updates, DELETE /issues/:id to clear out spam or resolved reports. These are the routes you shipped in Sprint 4.
Hide your triage pages behind a FE route guard. Since the JWT's role claim is always User, the FE has to ask your BE who the caller is — typically by calling a /me (or equivalent) endpoint that returns the local user row's role. Cache the result on the NextAuth session and gate the route on it. Remember: front-end route guards are a UX convenience, not a security boundary. Your BE's admin middleware is the actual trust boundary; the FE guard just keeps the routes from rendering for users who'll get a 403 anyway.
Build the triage UI — list view (sort/filter by status), detail view (full report + repro steps), status dropdown wired to PATCH, delete confirmation wired to DELETE, and a sign-out flow.
Add a sign-in / sign-out surface — even a single button on a /dashboard route is enough.
Feed the agent enough context that your prompts stay short. Drop your OpenAPI spec, this sprint document, the JWT Verification with Auth² guide, the Authentication & Authorization Concepts reading, and your group's audience + client ID into the working directory. Then ask the agent to extend the FE with NextAuth, an admin-gated triage view, and the routes above. Same workflow as the public form — context first, then a short prompt.

None of this is required for Sprint 5 to be complete, and none of it is graded. It's the natural next step if you want a real tool instead of a Postman habit.

Guide Reference¶
Guide What It Covers
Next.js App Router, routing, components, fetch, environment variables
React Fundamentals Components, props, state, controlled inputs
Consuming a Web API Fetch lifecycle, error modes, CORS preflight
Accessibility Form labels, error association, focus management
Deploying Next.js Vercel + Render walkthrough, env vars, build commands
Using a Coding Agent Briefing the agent, reading its output, knowing when to redirect
AI Tools Setup Getting an agentic tool installed and connected to your repo
Supporting Documents¶
Sprint 4 — The admin /issues routes and partner-facing README that this sprint's FE plugs into
Group Project Overview — Sprint schedule, ring topology, partner handoff timing
Client Conversation — The bug-tracker workflow the client described
Evolution of Web Programming (Week 6 reading) — Where Next.js fits in the SPA / SSR / framework arc
Gen AI & Learning: AI in Group Projects

AI coding assistants are permitted and encouraged — and this sprint is specifically about that workflow. You'll lean on an agent to scaffold a Next.js app from your OpenAPI spec before you've been formally taught Next.js. That's intentional: the goal this week is the prompt-and-iterate loop, not full code-level understanding.

The standard course-wide bar — "every team member must be able to explain any code in your repository" — is paused for Sprint 5 only. It reactivates in Sprint 6 as the Week 7+ readings, lectures, and Check-Off 6 land the underlying React/Next.js concepts. By Sprint 6, the expectation that you can walk through your code is back to normal.

What you DO own this sprint: your individual workflow writeup (what you prompted, what came back, what you kept and cut, what you'd do differently next time), the team's selection-or-merge decision and the rationale behind it, and a deployed FE that actually works end-to-end against your API. "The agent built it" is fine for the code; it is not fine for the workflow narrative.

This assignment is part of TCSS 460 — Client/Server Programming, School of Engineering and Technology, University of Washington Tacoma.

Back to top
© 2026 Charles Bryan. Content co-authored with Claude AI.
Licensed under CC BY-NC-SA 4.0

Our API Spec:
openapi: 3.0.3

info:
title: TCSS 460 Team 6 API
version: 0.2.0
description: |
**Team:** Group 6
**Deployed URL:** https://tcss460-team-6-api.onrender.com

    A RESTful API for the TCSS 460 group project. Proxies movie and TV show data
    through team-designed endpoints with custom response schemas — clients never
    interact with any third-party service directly.

    Sprint 2 adds user-generated content: ratings and reviews are persisted in
    PostgreSQL via Prisma. Sprint 3 replaces dev-login with real authentication
    via Auth² — the course's shared OAuth2 + OIDC identity provider.

    **Authentication:** Write endpoints require a Bearer JWT issued by Auth²
    (`https://tcss-460-iam.onrender.com`), scoped to the `group-6-api` audience.
    Obtain a token from the TCSS 460 Token Playground by selecting the
    `group-6-api` audience. Tokens expire after one hour.

    **Role gating:** Protected routes use a 5-tier hierarchy —
    `User < Moderator < Admin < SuperAdmin < Owner`. Routes requiring elevated
    access use `requireRoleAtLeast('Admin')` or above.

servers:

- url: https://tcss460-team-6-api.onrender.com
  description: Deployed production server
- url: http://localhost:3000
  description: Local development server

tags:

- name: General
  description: General-purpose routes
- name: Movies
  description: Search, browse, and retrieve movie data
- name: TV Shows
  description: Search, browse, and retrieve TV show data
- name: Ratings
  description: User ratings for movies and TV shows
- name: Reviews
  description: User reviews for movies and TV shows
- name: Issues
  description: Public bug report and feedback submissions
- name: Users
  description: Authenticated user profile and activity routes
- name: Community
  description: Public discovery feeds — top-rated and most-reviewed titles

security: [] # public by default; individual operations opt in

# ─────────────────────────────────────────────

# PATHS

# ─────────────────────────────────────────────

paths:

# ── General ─────────────────────────────────

/health:
get:
tags: [General]
summary: Health check
description: Returns 200 when the server is running. Used by deployment platforms and uptime monitors.
operationId: getHealth
responses:
'200':
description: Service is healthy
content:
application/json:
schema:
$ref: '#/components/schemas/HealthResponse'
example:
status: OK
timestamp: '2026-04-16T10:30:00Z'

# ── Movies ──────────────────────────────────

/v1/media/movies:
get:
tags: [Movies]
summary: Search movies
description: >
Search for movies by title. Optionally filter by release year or genre.
Returns a paginated list of movie cards — enough data to render a poster,
title, and release year. For full details, use GET /media/movies/{id}.
operationId: searchMovies
parameters: - $ref: '#/components/parameters/movieTitleParam' - $ref: '#/components/parameters/yearParam' - $ref: '#/components/parameters/genreIdParam' - $ref: '#/components/parameters/pageParam'
responses:
'200':
description: A paginated list of matching movies
content:
application/json:
schema:
$ref: '#/components/schemas/MovieListResponse'
example:
page: 1
totalPages: 4
totalResults: 72
results: - id: 550
title: Fight Club
releaseYear: 1999
posterUrl: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
overview: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club.'
genres: - id: 18
name: Drama - id: 53
name: Thriller
'400':
$ref: '#/components/responses/BadRequest'
'500':
$ref: '#/components/responses/InternalError'

/v1/media/movies/popular:
get:
tags: [Movies]
summary: Popular movies
description: >
Returns a paginated list of currently popular movies.
Popularity is determined by upstream trending and view data.
Results are ordered by popularity score descending.
operationId: getPopularMovies
parameters: - $ref: '#/components/parameters/pageParam'
responses:
'200':
description: A paginated list of popular movies
content:
application/json:
schema:
$ref: '#/components/schemas/MovieListResponse'
example:
page: 1
totalPages: 20
totalResults: 400
results: - id: 1022789
title: Inside Out 2
releaseYear: 2024
posterUrl: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg'
overview: "Riley's mind headquarters is suddenly turned upside down as Joy and the other Emotions try to make room for a new arrival."
genres: - id: 16
name: Animation - id: 10751
name: Family
'500':
$ref: '#/components/responses/InternalError'

/v1/media/movies/{id}:
get:
tags: [Movies]
summary: Movie details
description: >
Returns full details for a single movie by its ID.
Includes all fields needed to render a rich detail page:
poster, backdrop, synopsis, runtime, genres, cast, and similar titles.
operationId: getMovieById
parameters: - $ref: '#/components/parameters/mediaIdParam'
responses:
'200':
description: Full details for the requested movie
content:
application/json:
schema:
$ref: '#/components/schemas/MovieDetail'
example:
id: 550
title: Fight Club
tagline: 'Mischief. Mayhem. Soap.'
overview: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.'
releaseYear: 1999
releaseDate: '1999-10-15'
runtimeMinutes: 139
posterUrl: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
backdropUrl: 'https://image.tmdb.org/t/p/original/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg'
status: Released
genres: - id: 18
name: Drama - id: 53
name: Thriller
cast: - name: Brad Pitt
character: Tyler Durden
profileUrl: 'https://image.tmdb.org/t/p/w185/cckcYc2v0yh1tc9QjRelptcOBko.jpg' - name: Edward Norton
character: The Narrator
profileUrl: 'https://image.tmdb.org/t/p/w185/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg'
similar: - id: 1422
title: The Departed
releaseYear: 2006
posterUrl: 'https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq20Qblg61T.jpg'
overview: "To take down South Boston's Irish Mob, the police send in one of their own to infiltrate it."
genres: - id: 80
name: Crime - id: 18
name: Drama
'404':
$ref: '#/components/responses/NotFound'
'500':
$ref: '#/components/responses/InternalError'

/v1/media/movies/{id}/enriched:
get:
tags: [Movies]
summary: Enriched movie detail
description: >
Returns TMDB movie metadata combined with community aggregate data in a
single response. The `tmdb` block contains the same fields as
GET /media/movies/{id}. The `community` block contains the average
rating, total review count, and up to 3 recent reviews inline — enough
for the frontend to decide whether to show a "Load more" button without
a second request.

        **Optional authentication:** Send a Bearer token to receive a `myRating`
        field in the `community` block (your own score, or `null` if you have
        not rated this title yet). The route is fully public without a token.
      operationId: getEnrichedMovieDetail
      security: []
      parameters:
        - $ref: '#/components/parameters/mediaIdParam'
      responses:
        '200':
          description: Enriched movie detail with community stats
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EnrichedMovieDetail'
              example:
                tmdb:
                  id: 27205
                  title: Inception
                  tagline: 'Your mind is the scene of the crime.'
                  overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'
                  releaseYear: 2010
                  releaseDate: '2010-07-15'
                  runtimeMinutes: 148
                  posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'
                  backdropUrl: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg'
                  status: Released
                  genres:
                    - id: 28
                      name: Action
                    - id: 878
                      name: Science Fiction
                  cast:
                    - name: Leonardo DiCaprio
                      character: Dom Cobb
                      profileUrl: 'https://image.tmdb.org/t/p/w185/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg'
                  similar: []
                community:
                  averageRating: 4.3
                  reviewCount: 12
                  recentReviews:
                    - id: 1
                      title: Mind-bending
                      body: Best movie I have ever seen.
                      author:
                        id: auth2|abc123
                        username: johndoe
                      createdAt: '2026-04-20T12:00:00Z'
                  myRating: 8
        '404':
          $ref: '#/components/responses/NotFound'
        '502':
          description: Failed to reach TMDB upstream
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                error: Failed to reach TMDB

# ── TV Shows ─────────────────────────────────

/v1/media/tv:
get:
tags: [TV Shows]
summary: Search TV shows
description: >
Search for TV shows by title. Optionally filter by first air year or genre.
Returns a paginated list of show cards — enough data to render a poster,
title, and first air date. For full details, use GET /media/tv/{id}.
operationId: searchTVShows
parameters: - $ref: '#/components/parameters/tvTitleParam' - $ref: '#/components/parameters/yearParam' - $ref: '#/components/parameters/genreIdParam' - $ref: '#/components/parameters/pageParam'
responses:
'200':
description: A paginated list of matching TV shows
content:
application/json:
schema:
$ref: '#/components/schemas/TVShowListResponse'
example:
page: 1
totalPages: 2
totalResults: 28
results: - id: 1396
title: Breaking Bad
firstAirDate: '2008-01-20'
posterUrl: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg'
overview: 'A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.'
genres: - id: 18
name: Drama - id: 80
name: Crime
'400':
$ref: '#/components/responses/BadRequest'
'500':
$ref: '#/components/responses/InternalError'

/v1/media/tv/popular:
get:
tags: [TV Shows]
summary: Popular TV shows
description: >
Returns a paginated list of currently popular TV shows.
Popularity is determined by upstream trending and view data.
Results are ordered by popularity score descending.
operationId: getPopularTVShows
parameters: - $ref: '#/components/parameters/pageParam'
responses:
'200':
description: A paginated list of popular TV shows
content:
application/json:
schema:
$ref: '#/components/schemas/TVShowListResponse'
example:
page: 1
totalPages: 20
totalResults: 400
results: - id: 94997
title: House of the Dragon
firstAirDate: '2022-08-21'
posterUrl: 'https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg'
overview: 'The story of the House Targaryen set 200 years before the events of Game of Thrones.'
genres: - id: 10765
name: Sci-Fi & Fantasy - id: 18
name: Drama
'500':
$ref: '#/components/responses/InternalError'

/v1/media/tv/{id}:
get:
tags: [TV Shows]
summary: TV show details
description: >
Returns full details for a single TV show by its ID.
Includes all fields needed to render a rich detail page:
poster, backdrop, synopsis, seasons, networks, genres, cast, and similar shows.
operationId: getTVShowById
parameters: - $ref: '#/components/parameters/mediaIdParam'
responses:
'200':
description: Full details for the requested TV show
content:
application/json:
schema:
$ref: '#/components/schemas/TVShowDetail'
example:
id: 1396
title: Breaking Bad
overview: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future."
firstAirDate: '2008-01-20'
lastAirDate: '2013-09-29'
status: Ended
totalSeasons: 5
totalEpisodes: 62
averageEpisodeMinutes: 45
posterUrl: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg'
backdropUrl: 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg'
genres: - id: 18
name: Drama - id: 80
name: Crime
networks: - name: AMC
logoUrl: 'https://image.tmdb.org/t/p/w92/alqLicR1ZMHMaZGP3xRQxn9sq7p.png'
seasons: - seasonNumber: 1
episodeCount: 7
airDate: '2008-01-20'
posterUrl: 'https://image.tmdb.org/t/p/w500/1BP4xYv9ZG4ZVHkL7ocOziBbSYH.jpg'
cast: - name: Bryan Cranston
character: Walter White
profileUrl: 'https://image.tmdb.org/t/p/w185/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg' - name: Aaron Paul
character: Jesse Pinkman
profileUrl: 'https://image.tmdb.org/t/p/w185/glEjyreZMVvkPmSe9G2n23BXZXR.jpg'
similar: - id: 60574
title: Peaky Blinders
firstAirDate: '2013-09-12'
posterUrl: 'https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVn3nyfVSBx.jpg'
overview: 'A gangster family epic set in 1919 Birmingham, England.'
genres: - id: 80
name: Crime - id: 18
name: Drama
'404':
$ref: '#/components/responses/NotFound'
'500':
$ref: '#/components/responses/InternalError'

/v1/media/tv/{id}/enriched:
get:
tags: [TV Shows]
summary: Enriched TV show detail
description: >
Returns TMDB TV show metadata combined with community aggregate data in a
single response. The `tmdb` block contains the same fields as
GET /media/tv/{id}. The `community` block contains the average rating,
total review count, and up to 3 recent reviews inline — enough for the
frontend to decide whether to show a "Load more" button without a
second request.

        **Optional authentication:** Send a Bearer token to receive a `myRating`
        field in the `community` block (your own score, or `null` if you have
        not rated this title yet). The route is fully public without a token.
      operationId: getEnrichedTVShowDetail
      security: []
      parameters:
        - $ref: '#/components/parameters/mediaIdParam'
      responses:
        '200':
          description: Enriched TV show detail with community stats
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EnrichedTVShowDetail'
              example:
                tmdb:
                  id: 1396
                  title: Breaking Bad
                  overview: 'A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.'
                  firstAirDate: '2008-01-20'
                  lastAirDate: '2013-09-29'
                  status: Ended
                  totalSeasons: 5
                  totalEpisodes: 62
                  averageEpisodeMinutes: 45
                  posterUrl: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg'
                  backdropUrl: 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg'
                  genres:
                    - id: 18
                      name: Drama
                    - id: 80
                      name: Crime
                  networks:
                    - name: AMC
                      logoUrl: 'https://image.tmdb.org/t/p/w92/alqLicR1ZMHMaZGP3xRQxn9sq7p.png'
                  seasons:
                    - seasonNumber: 1
                      episodeCount: 7
                      airDate: '2008-01-20'
                      posterUrl: 'https://image.tmdb.org/t/p/w500/1BP4xYv9ZG4ZVHkL7ocOziBbSYH.jpg'
                  cast:
                    - name: Bryan Cranston
                      character: Walter White
                      profileUrl: 'https://image.tmdb.org/t/p/w185/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg'
                  similar: []
                community:
                  averageRating: null
                  reviewCount: 0
                  recentReviews: []
        '404':
          $ref: '#/components/responses/NotFound'
        '502':
          description: Failed to reach TMDB upstream
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                error: Failed to reach TMDB

# ── Self-list ────────────────────────────────

/v1/reviews/me:
get:
tags: [Reviews]
summary: My reviews
description: >
Returns paginated reviews written by the authenticated user, sorted most
recent first. Identity is always read from the Bearer token — a `userId`
query parameter is never accepted.
operationId: getMyReviews
security: - BearerAuth: []
parameters: - $ref: '#/components/parameters/pageParam'
responses:
'200':
description: Reviews written by the authenticated user
content:
application/json:
schema:
$ref: '#/components/schemas/MyReviewListResponse'
example:
totalReviews: 1
page: 1
totalPages: 1
results: - id: 1
tmdbId: 550
mediaType: movie
title: A haunting masterpiece
body: Fight Club is a film that gets better with every rewatch.
userId: 3
author:
id: auth2|abc123
username: johndoe
createdAt: '2026-04-20T12:00:00Z'
updatedAt: '2026-04-20T12:00:00Z'
'401':
$ref: '#/components/responses/Unauthorized'
'500':
$ref: '#/components/responses/InternalError'

/v1/ratings/me:
get:
tags: [Ratings]
summary: My ratings
description: >
Returns paginated ratings submitted by the authenticated user, sorted most
recent first. Identity is always read from the Bearer token — a `userId`
query parameter is never accepted.
operationId: getMyRatings
security: - BearerAuth: []
parameters: - $ref: '#/components/parameters/pageParam'
responses:
'200':
description: Ratings submitted by the authenticated user
content:
application/json:
schema:
$ref: '#/components/schemas/MyRatingListResponse'
example:
totalRatings: 1
page: 1
totalPages: 1
results: - id: 1
tmdbId: 550
mediaType: movie
score: 9
userId: 3
author:
id: auth2|abc123
username: johndoe
createdAt: '2026-04-20T12:00:00Z'
updatedAt: '2026-04-20T12:00:00Z'
'401':
$ref: '#/components/responses/Unauthorized'
'500':
$ref: '#/components/responses/InternalError'

# ── Ratings ──────────────────────────────────

/v1/ratings:
post:
tags: [Ratings]
summary: Submit or update a rating
description: >
Creates a rating for the authenticated user. If the user has already rated
this content (same tmdbId + mediaType), the existing rating is updated (upsert).
The userId is always taken from the JWT — never from the request body.
operationId: createOrUpdateRating
security: - BearerAuth: []
requestBody:
required: true
content:
application/json:
schema:
$ref: '#/components/schemas/RatingRequest'
example:
tmdbId: 550
mediaType: movie
score: 9
responses:
'200':
description: Rating upserted successfully
content:
application/json:
schema:
$ref: '#/components/schemas/Rating'
example:
id: 1
tmdbId: 550
mediaType: movie
score: 9
userId: 3
createdAt: '2026-04-20T12:00:00Z'
updatedAt: '2026-04-20T12:00:00Z'
'400':
$ref: '#/components/responses/BadRequest'
'401':
$ref: '#/components/responses/Unauthorized'
'500':
$ref: '#/components/responses/InternalError'

/v1/ratings/{tmdbId}:
get:
tags: [Ratings]
summary: Get ratings for a title
description: >
Returns all ratings submitted for a given TMDB identifier and media type.
No authentication required. Includes aggregate stats (average score, count)
alongside the individual records.
operationId: getRatingsByTmdbId
parameters: - $ref: '#/components/parameters/tmdbIdParam' - $ref: '#/components/parameters/mediaTypeParam' - $ref: '#/components/parameters/pageParam'
responses:
'200':
description: Ratings for the requested title
content:
application/json:
schema:
$ref: '#/components/schemas/RatingListResponse'
example:
tmdbId: 550
mediaType: movie
averageScore: 8.7
totalRatings: 3
page: 1
totalPages: 1
results: - id: 1
score: 9
userId: 3
createdAt: '2026-04-20T12:00:00Z'
updatedAt: '2026-04-20T12:00:00Z'
'400':
$ref: '#/components/responses/BadRequest'
'500':
$ref: '#/components/responses/InternalError'

/v1/ratings/{id}:
put:
tags: [Ratings]
summary: Update a rating
description: >
Updates the score on an existing rating. The authenticated user must own
the rating. Admins may update any rating.
operationId: updateRating
security: - BearerAuth: []
parameters: - $ref: '#/components/parameters/recordIdParam'
requestBody:
required: true
content:
application/json:
schema:
$ref: '#/components/schemas/PatchRatingRequest'
example:
score: 7
responses:
'200':
description: Rating updated
content:
application/json:
schema:
$ref: '#/components/schemas/Rating'
'400':
$ref: '#/components/responses/BadRequest'
'401':
$ref: '#/components/responses/Unauthorized'
'403':
$ref: '#/components/responses/Forbidden'
'404':
$ref: '#/components/responses/NotFound'
'500':
$ref: '#/components/responses/InternalError'

    delete:
      tags: [Ratings]
      summary: Delete a rating
      description: >
        Deletes a rating by its ID. The authenticated user must own the rating.
        Admins may delete any rating.
      operationId: deleteRating
      security:
        - BearerAuth: []
      parameters:
        - $ref: '#/components/parameters/recordIdParam'
      responses:
        '204':
          description: Rating deleted successfully
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/InternalError'

# ── Reviews ──────────────────────────────────

/v1/reviews:
post:
tags: [Reviews]
summary: Submit a review
description: >
Creates a review for the authenticated user. Multiple reviews per user
per title are allowed. The userId is always taken from the JWT.
operationId: createReview
security: - BearerAuth: []
requestBody:
required: true
content:
application/json:
schema:
$ref: '#/components/schemas/ReviewRequest'
example:
tmdbId: 550
mediaType: movie
title: A haunting masterpiece
body: Fight Club is a film that gets better with every rewatch. The performances are electric.
responses:
'201':
description: Review created
content:
application/json:
schema:
$ref: '#/components/schemas/Review'
example:
id: 1
tmdbId: 550
mediaType: movie
title: A haunting masterpiece
body: Fight Club is a film that gets better with every rewatch. The performances are electric.
userId: 3
createdAt: '2026-04-20T12:00:00Z'
updatedAt: '2026-04-20T12:00:00Z'
'400':
$ref: '#/components/responses/BadRequest'
'401':
$ref: '#/components/responses/Unauthorized'
'500':
$ref: '#/components/responses/InternalError'

/v1/reviews/{tmdbId}:
get:
tags: [Reviews]
summary: Get reviews for a title
description: >
Returns a paginated list of reviews for a given TMDB identifier and media type.
No authentication required. Results are sorted by most recent first.
operationId: getReviewsByTmdbId
parameters: - $ref: '#/components/parameters/tmdbIdParam' - $ref: '#/components/parameters/mediaTypeParam' - $ref: '#/components/parameters/pageParam'
responses:
'200':
description: Reviews for the requested title
content:
application/json:
schema:
$ref: '#/components/schemas/ReviewListResponse'
example:
tmdbId: 550
mediaType: movie
totalReviews: 1
page: 1
totalPages: 1
results: - id: 1
title: A haunting masterpiece
body: Fight Club is a film that gets better with every rewatch.
userId: 3
createdAt: '2026-04-20T12:00:00Z'
updatedAt: '2026-04-20T12:00:00Z'
'400':
$ref: '#/components/responses/BadRequest'
'500':
$ref: '#/components/responses/InternalError'

/v1/reviews/{id}:
put:
tags: [Reviews]
summary: Update a review
description: >
Updates the title and/or body of an existing review. At least one field is
required. The authenticated user must own the review. Admins may update any review.
operationId: updateReview
security: - BearerAuth: []
parameters: - $ref: '#/components/parameters/recordIdParam'
requestBody:
required: true
content:
application/json:
schema:
$ref: '#/components/schemas/PatchReviewRequest'
example:
body: On reflection, a genuine classic.
responses:
'200':
description: Review updated
content:
application/json:
schema:
$ref: '#/components/schemas/Review'
'400':
$ref: '#/components/responses/BadRequest'
'401':
$ref: '#/components/responses/Unauthorized'
'403':
$ref: '#/components/responses/Forbidden'
'404':
$ref: '#/components/responses/NotFound'
'500':
$ref: '#/components/responses/InternalError'

    delete:
      tags: [Reviews]
      summary: Delete a review
      description: >
        Deletes a review by its ID. The authenticated user must own the review.
        Admins may delete any review regardless of author.
      operationId: deleteReview
      security:
        - BearerAuth: []
      parameters:
        - $ref: '#/components/parameters/recordIdParam'
      responses:
        '204':
          description: Review deleted successfully
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/InternalError'

# ── Issues ──────────────────────────────

/v1/issues:
get:
tags: [Issues]
summary: List bug reports (Admin)
description: Returns a paginated list of all issues. Requires Admin role or higher.
operationId: listIssues
security: - BearerAuth: []
parameters: - name: page
in: query
schema: { type: integer, minimum: 1, default: 1 } - name: limit
in: query
schema: { type: integer, minimum: 1, maximum: 100, default: 20 } - name: status
in: query
description: Filter by status. Supports comma-separated values (e.g., "Open,InProgress").
schema: { type: string } - name: sort
in: query
description: Sort order by creation date.
schema: { type: string, enum: [newest, oldest], default: newest }
responses:
'200':
description: Paginated list of issues
content:
application/json:
schema:
type: object
properties:
meta:
type: object
properties:
total: { type: integer }
page: { type: integer }
limit: { type: integer }
totalPages: { type: integer }
data:
type: array
items:
$ref: '#/components/schemas/Issue'
'401':
$ref: '#/components/responses/Unauthorized'
'403':
$ref: '#/components/responses/Forbidden'

    post:
      tags: [Issues]
      summary: Submit a bug report
      description: >
        Publicly accessible — no authentication required. Submits a bug report
        or feedback item. `title` and `description` are required.
      operationId: createIssue
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/IssueRequest'
      responses:
        '201':
          description: Issue submitted successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Issue'
        '400':
          $ref: '#/components/responses/BadRequest'

/v1/issues/{id}:
get:
tags: [Issues]
summary: Get issue details (Admin)
operationId: getIssueById
security: - BearerAuth: []
parameters: - $ref: '#/components/parameters/recordIdParam'
responses:
'200':
description: Single issue record
content:
application/json:
schema:
type: object
properties:
data:
$ref: '#/components/schemas/Issue'
'401':
$ref: '#/components/responses/Unauthorized'
'404':
$ref: '#/components/responses/NotFound'

    patch:
      tags: [Issues]
      summary: Update issue status (Admin)
      description: Update the triage status of an issue.
      operationId: updateIssue
      security:
        - BearerAuth: []
      parameters:
        - $ref: '#/components/parameters/recordIdParam'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                status:
                  $ref: '#/components/schemas/IssueStatus'
      responses:
        '200':
          description: Issue updated successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/Issue'
        '400':
          $ref: '#/components/responses/BadRequest'
        '404':
          $ref: '#/components/responses/NotFound'

    delete:
      tags: [Issues]
      summary: Delete an issue (Admin)
      operationId: deleteIssue
      security:
        - BearerAuth: []
      parameters:
        - $ref: '#/components/parameters/recordIdParam'
      responses:
        '200':
          description: Issue deleted successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/Issue'
        '404':
          $ref: '#/components/responses/NotFound'

# ── Community ───────────────────────────────

/v1/community/top-rated:
get:
tags: [Community]
summary: Top-rated titles
description: >
Public — no authentication required. Returns the titles with the highest
community average rating, filtered by a minimum vote count so
single-review outliers don't dominate the list.

        The aggregation (`GROUP BY tmdbId, mediaType HAVING COUNT(*) >= minVotes
        ORDER BY AVG(score) DESC`) runs in the database. Each result is then
        enriched with lightweight TMDB metadata. Queries run live on every request.
      operationId: getTopRated
      security: []
      parameters:
        - name: limit
          in: query
          description: Number of results to return (max 25)
          schema:
            type: integer
            minimum: 1
            maximum: 25
            default: 10
        - name: minVotes
          in: query
          description: Minimum number of ratings a title must have to appear
          schema:
            type: integer
            minimum: 1
            default: 3
        - name: mediaType
          in: query
          description: Filter to only movies or only TV shows. Omit to return both.
          schema:
            type: string
            enum: [movie, tv]
      responses:
        '200':
          description: Top-rated discovery feed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CommunityFeedResponse'
              example:
                feed: top-rated
                minVotes: 3
                results:
                  - rank: 1
                    tmdbId: 550
                    mediaType: movie
                    averageScore: 9.2
                    ratingCount: 42
                    tmdb:
                      id: 550
                      title: Fight Club
                      overview: An insomniac office worker forms an underground fight club.
                      releaseYear: 1999
                      releaseDate: '1999-10-15'
                      posterUrl: 'https://image.tmdb.org/t/p/w500/poster.jpg'
                      genres:
                        - id: 18
                          name: Drama
        '400':
          $ref: '#/components/responses/BadRequest'
        '503':
          $ref: '#/components/responses/ServiceUnavailable'

/v1/community/most-reviewed:
get:
tags: [Community]
summary: Most-reviewed titles
description: >
Public — no authentication required. Returns the titles with the most
community ratings, regardless of score — shows what the community is
actively engaging with right now.

        The aggregation (`GROUP BY tmdbId, mediaType ORDER BY COUNT(*) DESC`)
        runs in the database. Each result is then enriched with lightweight
        TMDB metadata. Queries run live on every request.
      operationId: getMostReviewed
      security: []
      parameters:
        - name: limit
          in: query
          description: Number of results to return (max 25)
          schema:
            type: integer
            minimum: 1
            maximum: 25
            default: 10
        - name: mediaType
          in: query
          description: Filter to only movies or only TV shows. Omit to return both.
          schema:
            type: string
            enum: [movie, tv]
      responses:
        '200':
          description: Most-reviewed discovery feed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CommunityFeedResponse'
              example:
                feed: most-reviewed
                results:
                  - rank: 1
                    tmdbId: 550
                    mediaType: movie
                    averageScore: 7.5
                    ratingCount: 150
                    tmdb:
                      id: 550
                      title: Fight Club
                      overview: An insomniac office worker forms an underground fight club.
                      releaseYear: 1999
                      releaseDate: '1999-10-15'
                      posterUrl: 'https://image.tmdb.org/t/p/w500/poster.jpg'
                      genres:
                        - id: 18
                          name: Drama
        '400':
          $ref: '#/components/responses/BadRequest'
        '503':
          $ref: '#/components/responses/ServiceUnavailable'

# ── Users ───────────────────────────────────

/v1/users/me/ratings:
get:
tags: [Users]
summary: Get my rated movies and shows
description: >
Returns a paginated list of every title the authenticated user has rated,
each enriched with lightweight TMDB metadata (title, poster, release year,
genres). The `score` field is the user's own rating from the database —
no TMDB community ratings or reviews are included.

        The `sub` claim from the Bearer token determines whose ratings are returned.
        A `userId` query parameter is never trusted even if provided.


        Items whose TMDB record has been removed appear with `tmdb: null` — the
        rating row is still returned so history is never silently dropped.
      operationId: getMyRatings
      security:
        - BearerAuth: []
      parameters:
        - name: page
          in: query
          description: Page number (1-based)
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: pageSize
          in: query
          description: Results per page (max 50)
          schema:
            type: integer
            minimum: 1
            maximum: 50
            default: 20
        - name: sort
          in: query
          description: Sort order — `date` (most recently rated first) or `score` (highest score first)
          schema:
            type: string
            enum: [date, score]
            default: date
        - name: mediaType
          in: query
          description: Filter to only movies or only TV shows. Omit to return both.
          schema:
            type: string
            enum: [movie, tv]
      responses:
        '200':
          description: Paginated enriched ratings list
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MyRatingsResponse'
              example:
                page: 1
                pageSize: 20
                totalCount: 2
                totalPages: 1
                sort: date
                results:
                  - id: 1
                    score: 8
                    tmdbId: 27205
                    mediaType: movie
                    createdAt: '2026-04-01T12:00:00Z'
                    updatedAt: '2026-04-01T12:00:00Z'
                    tmdb:
                      id: 27205
                      title: Inception
                      overview: A thief who steals corporate secrets through dream-sharing.
                      releaseYear: 2010
                      releaseDate: '2010-07-16'
                      posterUrl: 'https://image.tmdb.org/t/p/w500/poster.jpg'
                      genres:
                        - id: 28
                          name: Action
                  - id: 2
                    score: 9
                    tmdbId: 1396
                    mediaType: tv
                    createdAt: '2026-04-10T12:00:00Z'
                    updatedAt: '2026-04-10T12:00:00Z'
                    tmdb:
                      id: 1396
                      title: Breaking Bad
                      overview: A chemistry teacher turns to manufacturing methamphetamine.
                      releaseYear: 2008
                      firstAirDate: '2008-01-20'
                      posterUrl: 'https://image.tmdb.org/t/p/w500/bbposter.jpg'
                      genres:
                        - id: 18
                          name: Drama
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '503':
          $ref: '#/components/responses/ServiceUnavailable'

components:

# ─────────────────────────────────────────────

# COMPONENTS

# ─────────────────────────────────────────────

# ── Parameters ──────────────────────────────

parameters:
movieTitleParam:
name: title
in: query
required: true
description: Title search string (partial matches supported)
schema:
type: string
minLength: 1
example: Interstellar

    tvTitleParam:
      name: title
      in: query
      required: true
      description: Title search string (partial matches supported)
      schema:
        type: string
        minLength: 1
        example: Breaking Bad

    yearParam:
      name: year
      in: query
      required: false
      description: Filter by release year (movies) or first air year (TV shows)
      schema:
        type: integer
        minimum: 1888
        maximum: 2100
        example: 2014

    genreIdParam:
      name: genreId
      in: query
      required: false
      description: Filter by genre ID. See TMDB genre list for valid IDs (e.g. 18 = Drama, 28 = Action)
      schema:
        type: integer
        example: 878

    pageParam:
      name: page
      in: query
      required: false
      description: Page number for paginated results (1-indexed)
      schema:
        type: integer
        minimum: 1
        default: 1
        example: 1

    mediaIdParam:
      name: id
      in: path
      required: true
      description: Unique numeric identifier for the movie or TV show
      schema:
        type: integer
        example: 157336

    tmdbIdParam:
      name: tmdbId
      in: path
      required: true
      description: TMDB identifier for the movie or TV show
      schema:
        type: integer
        example: 550

    mediaTypeParam:
      name: mediaType
      in: query
      required: true
      description: Whether the content is a movie or TV show
      schema:
        type: string
        enum: [movie, tv]
        example: movie

    recordIdParam:
      name: id
      in: path
      required: true
      description: Primary key of the rating or review record
      schema:
        type: integer
        example: 1

# ── Reusable Responses ───────────────────────

responses:
BadRequest:
description: Missing or invalid query parameters
content:
application/json:
schema:
$ref: '#/components/schemas/ErrorResponse'
example:
error: Bad Request
message: "Query parameter 'title' is required and must not be empty."

    NotFound:
      description: No resource found for the given ID
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            error: Not Found
            message: 'No movie found with id 99999.'

    Unauthorized:
      description: Missing or invalid JWT
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            error: Unauthorized
            message: 'Authorization token is missing or invalid.'

    Forbidden:
      description: Authenticated user does not have permission to modify this resource
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            error: Forbidden
            message: 'You do not have permission to modify this resource.'

    InternalError:
      description: Unexpected server error (e.g. upstream service unavailable)
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            error: Internal Server Error
            message: 'An unexpected error occurred. Please try again later.'

# ── Schemas ─────────────────────────────────

schemas: # -- Shared primitives ----------------------
Genre:
type: object
required: [id, name]
properties:
id:
type: integer
description: Genre identifier
example: 18
name:
type: string
description: Genre label
example: Drama

    CastMember:
      type: object
      required: [name, character]
      properties:
        name:
          type: string
          description: Actor's real name
          example: Bryan Cranston
        character:
          type: string
          description: Character name in the show or film
          example: Walter White
        profileUrl:
          type: string
          format: uri
          nullable: true
          description: Full URL to the actor's profile photo (null if unavailable)
          example: 'https://image.tmdb.org/t/p/w185/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg'

    # -- Movie card (used in list responses) ----
    MovieCard:
      type: object
      required: [id, title, releaseYear, posterUrl, rating, overview, genres]
      properties:
        id:
          type: integer
          description: Unique movie identifier
          example: 550
        title:
          type: string
          description: Movie title
          example: Fight Club
        releaseYear:
          type: integer
          description: Four-digit release year
          example: 1999
        posterUrl:
          type: string
          format: uri
          nullable: true
          description: Full URL to the poster image (null if unavailable)
          example: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
        rating:
          type: number
          format: float
          description: Average user rating out of 10
          minimum: 0
          maximum: 10
          example: 8.4
        overview:
          type: string
          description: Short synopsis
          example: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club.'
        genres:
          type: array
          description: List of genres associated with this movie
          items:
            $ref: '#/components/schemas/Genre'

    # -- Movie detail (single movie response) ---
    MovieDetail:
      allOf:
        - $ref: '#/components/schemas/MovieCard'
        - type: object
          required:
            - tagline
            - releaseDate
            - runtimeMinutes
            - voteCount
            - backdropUrl
            - status
            - cast
            - similar
          properties:
            tagline:
              type: string
              nullable: true
              description: Marketing tagline for the film
              example: 'Mischief. Mayhem. Soap.'
            releaseDate:
              type: string
              format: date
              description: Full release date (YYYY-MM-DD)
              example: '1999-10-15'
            runtimeMinutes:
              type: integer
              nullable: true
              description: Total runtime in minutes
              example: 139
            voteCount:
              type: integer
              description: Number of user ratings submitted
              example: 26280
            backdropUrl:
              type: string
              format: uri
              nullable: true
              description: Full URL to the backdrop/banner image (null if unavailable)
              example: 'https://image.tmdb.org/t/p/original/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg'
            status:
              type: string
              description: Release status of the movie
              enum: [Released, 'In Production', 'Post Production', Planned, Cancelled]
              example: Released
            cast:
              type: array
              description: Top-billed cast members (up to 10)
              items:
                $ref: '#/components/schemas/CastMember'
            similar:
              type: array
              description: Movies with similar themes or genres (up to 6)
              items:
                $ref: '#/components/schemas/MovieCard'

    # -- TV show card (used in list responses) --
    TVShowCard:
      type: object
      required: [id, title, firstAirDate, posterUrl, rating, overview, genres]
      properties:
        id:
          type: integer
          description: Unique TV show identifier
          example: 1396
        title:
          type: string
          description: Show title
          example: Breaking Bad
        firstAirDate:
          type: string
          format: date
          description: Date the show first aired (YYYY-MM-DD)
          example: '2008-01-20'
        posterUrl:
          type: string
          format: uri
          nullable: true
          description: Full URL to the poster image (null if unavailable)
          example: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg'
        rating:
          type: number
          format: float
          description: Average user rating out of 10
          minimum: 0
          maximum: 10
          example: 9.5
        overview:
          type: string
          description: Short synopsis
          example: 'A chemistry teacher turns to manufacturing methamphetamine.'
        genres:
          type: array
          description: List of genres associated with this show
          items:
            $ref: '#/components/schemas/Genre'

    # -- TV show season summary -----------------
    SeasonSummary:
      type: object
      required: [seasonNumber, episodeCount, airDate]
      properties:
        seasonNumber:
          type: integer
          description: Season number (1-indexed)
          example: 1
        episodeCount:
          type: integer
          description: Number of episodes in this season
          example: 7
        airDate:
          type: string
          format: date
          nullable: true
          description: Date the season premiered (YYYY-MM-DD)
          example: '2008-01-20'
        posterUrl:
          type: string
          format: uri
          nullable: true
          description: Season-specific poster (null if unavailable)
          example: 'https://image.tmdb.org/t/p/w500/1BP4xYv9ZG4ZVHkL7ocOziBbSYH.jpg'

    # -- TV network summary ---------------------
    NetworkSummary:
      type: object
      required: [name]
      properties:
        name:
          type: string
          description: Network name
          example: AMC
        logoUrl:
          type: string
          format: uri
          nullable: true
          description: Full URL to the network logo (null if unavailable)
          example: 'https://image.tmdb.org/t/p/w92/alqLicR1ZMHMaZGP3xRQxn9sq7p.png'

    # -- TV show detail (single show response) --
    TVShowDetail:
      allOf:
        - $ref: '#/components/schemas/TVShowCard'
        - type: object
          required:
            - lastAirDate
            - status
            - totalSeasons
            - totalEpisodes
            - averageEpisodeMinutes
            - voteCount
            - backdropUrl
            - networks
            - seasons
            - cast
            - similar
          properties:
            lastAirDate:
              type: string
              format: date
              nullable: true
              description: Date the most recent episode aired (YYYY-MM-DD); null if still airing
              example: '2013-09-29'
            status:
              type: string
              description: Current airing status of the show
              enum: [Returning Series, Ended, Cancelled, 'In Production', Planned]
              example: Ended
            totalSeasons:
              type: integer
              description: Total number of seasons
              example: 5
            totalEpisodes:
              type: integer
              description: Total number of episodes across all seasons
              example: 62
            averageEpisodeMinutes:
              type: integer
              nullable: true
              description: Average episode runtime in minutes
              example: 45
            voteCount:
              type: integer
              description: Number of user ratings submitted
              example: 13500
            backdropUrl:
              type: string
              format: uri
              nullable: true
              description: Full URL to the backdrop/banner image (null if unavailable)
              example: 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg'
            networks:
              type: array
              description: Networks that aired or stream the show
              items:
                $ref: '#/components/schemas/NetworkSummary'
            seasons:
              type: array
              description: Season-level summaries (excludes specials)
              items:
                $ref: '#/components/schemas/SeasonSummary'
            cast:
              type: array
              description: Top-billed cast members (up to 10)
              items:
                $ref: '#/components/schemas/CastMember'
            similar:
              type: array
              description: TV shows with similar themes or genres (up to 6)
              items:
                $ref: '#/components/schemas/TVShowCard'

    # -- Enriched detail schemas ----------------
    ReviewSummary:
      type: object
      required: [id, body, author, createdAt]
      properties:
        id:
          type: integer
          description: Review record ID
          example: 1
        title:
          type: string
          nullable: true
          description: Optional review title
          example: Mind-bending
        body:
          type: string
          description: Review body text
          example: Best movie I have ever seen.
        author:
          $ref: '#/components/schemas/Author'
        createdAt:
          type: string
          format: date-time
          description: When the review was posted
          example: '2026-04-20T12:00:00Z'

    CommunityStats:
      type: object
      required: [averageRating, reviewCount, recentReviews]
      properties:
        averageRating:
          type: number
          format: float
          nullable: true
          description: >
            Mean rating score (1–10) across all community ratings.
            `null` when no ratings exist — use this to distinguish "no data"
            from a score of zero.
          minimum: 1
          maximum: 10
          example: 4.3
        reviewCount:
          type: integer
          description: Total number of community reviews submitted for this title
          example: 12
        recentReviews:
          type: array
          description: Up to 3 most recent reviews; empty array when none exist
          maxItems: 3
          items:
            $ref: '#/components/schemas/ReviewSummary'
        myRating:
          type: integer
          nullable: true
          description: >
            The authenticated user's own rating (1–10), or `null` if they have
            not rated this title. Only present when a valid Bearer token is
            supplied — omitted entirely on unauthenticated requests.
          minimum: 1
          maximum: 10
          example: 8

    EnrichedMovieDetail:
      type: object
      required: [tmdb, community]
      properties:
        tmdb:
          description: >
            TMDB movie metadata. Same shape as MovieDetail but without
            `rating` and `voteCount` — TMDB scores are intentionally
            excluded so clients rely on community data only.
          allOf:
            - $ref: '#/components/schemas/MovieDetail'
        community:
          $ref: '#/components/schemas/CommunityStats'

    EnrichedTVShowDetail:
      type: object
      required: [tmdb, community]
      properties:
        tmdb:
          description: >
            TMDB TV show metadata. Same shape as TVShowDetail but without
            `rating` and `voteCount` — TMDB scores are intentionally
            excluded so clients rely on community data only.
          allOf:
            - $ref: '#/components/schemas/TVShowDetail'
        community:
          $ref: '#/components/schemas/CommunityStats'

    # -- Pagination wrapper ---------------------
    PaginationMeta:
      type: object
      required: [page, totalPages, totalResults]
      properties:
        page:
          type: integer
          description: Current page number (1-indexed)
          example: 1
        totalPages:
          type: integer
          description: Total number of available pages
          example: 4
        totalResults:
          type: integer
          description: Total number of results across all pages
          example: 72

    MovieListResponse:
      allOf:
        - $ref: '#/components/schemas/PaginationMeta'
        - type: object
          required: [results]
          properties:
            results:
              type: array
              items:
                $ref: '#/components/schemas/MovieCard'

    TVShowListResponse:
      allOf:
        - $ref: '#/components/schemas/PaginationMeta'
        - type: object
          required: [results]
          properties:
            results:
              type: array
              items:
                $ref: '#/components/schemas/TVShowCard'

    # -- Author identity ------------------------
    Author:
      type: object
      required: [id, username]
      properties:
        id:
          type: string
          description: >
            Stable Auth² subject identifier (`sub` claim). Never changes, never
            reused — safe to store as a long-term reference to this user.
          example: auth2|abc123
        username:
          type: string
          description: >
            Display name resolved in priority order from the local user row:
            explicit `displayName` → `firstName lastName` → `username`.
            `username` is always present (falls back to the subject ID on first
            sign-in if the userinfo enrichment fails), so this field is never null.
          example: johndoe
    # -- Community feeds ------------------------
    CommunityFeedItem:
      type: object
      required: [rank, tmdbId, mediaType, averageScore, ratingCount, tmdb]
      properties:
        rank:
          type: integer
          description: Position in the feed (1-based)
          example: 1
        tmdbId:
          type: integer
          example: 550
        mediaType:
          type: string
          enum: [movie, tv]
          example: movie
        averageScore:
          type: number
          nullable: true
          description: Community average score rounded to one decimal place
          example: 9.2
        ratingCount:
          type: integer
          description: Number of ratings this title has received
          example: 42
        tmdb:
          nullable: true
          description: TMDB metadata for this title. `null` if the title was removed from TMDB.
          oneOf:
            - $ref: '#/components/schemas/TmdbMovieCard'
            - $ref: '#/components/schemas/TmdbTvCard'

    CommunityFeedResponse:
      type: object
      required: [feed, results]
      properties:
        feed:
          type: string
          enum: [top-rated, most-reviewed]
          example: top-rated
        minVotes:
          type: integer
          description: Only present on the top-rated feed — the minimum vote floor applied
          example: 3
        results:
          type: array
          items:
            $ref: '#/components/schemas/CommunityFeedItem'

    # -- My Ratings (enriched) ------------------
    TmdbMovieCard:
      type: object
      description: Lightweight TMDB metadata for a movie — enough to render a list card
      properties:
        id:
          type: integer
          example: 27205
        title:
          type: string
          example: Inception
        overview:
          type: string
          example: A thief who steals corporate secrets through dream-sharing.
        releaseYear:
          type: integer
          example: 2010
        releaseDate:
          type: string
          nullable: true
          example: '2010-07-16'
        posterUrl:
          type: string
          nullable: true
          example: 'https://image.tmdb.org/t/p/w500/poster.jpg'
        genres:
          type: array
          items:
            type: object
            properties:
              id:
                type: integer
              name:
                type: string

    TmdbTvCard:
      type: object
      description: Lightweight TMDB metadata for a TV show — enough to render a list card
      properties:
        id:
          type: integer
          example: 1396
        title:
          type: string
          example: Breaking Bad
        overview:
          type: string
          example: A chemistry teacher turns to manufacturing methamphetamine.
        releaseYear:
          type: integer
          example: 2008
        firstAirDate:
          type: string
          nullable: true
          example: '2008-01-20'
        posterUrl:
          type: string
          nullable: true
          example: 'https://image.tmdb.org/t/p/w500/bbposter.jpg'
        genres:
          type: array
          items:
            type: object
            properties:
              id:
                type: integer
              name:
                type: string

    EnrichedRating:
      type: object
      required: [id, score, tmdbId, mediaType, createdAt, updatedAt, tmdb]
      properties:
        id:
          type: integer
          description: Rating record ID
          example: 1
        score:
          type: integer
          minimum: 1
          maximum: 10
          description: The user's own score
          example: 8
        tmdbId:
          type: integer
          example: 27205
        mediaType:
          type: string
          enum: [movie, tv]
          example: movie
        createdAt:
          type: string
          format: date-time
          example: '2026-04-01T12:00:00Z'
        updatedAt:
          type: string
          format: date-time
          example: '2026-04-01T12:00:00Z'
        tmdb:
          nullable: true
          description: >
            TMDB metadata for this title. `null` when the title has been removed
            from TMDB — the rating row is still returned so history is preserved.
          oneOf:
            - $ref: '#/components/schemas/TmdbMovieCard'
            - $ref: '#/components/schemas/TmdbTvCard'

    MyRatingsResponse:
      type: object
      required: [page, pageSize, totalCount, totalPages, sort, results]
      properties:
        page:
          type: integer
          example: 1
        pageSize:
          type: integer
          example: 20
        totalCount:
          type: integer
          example: 47
        totalPages:
          type: integer
          example: 3
        sort:
          type: string
          enum: [date, score]
          example: date
        results:
          type: array
          items:
            $ref: '#/components/schemas/EnrichedRating'

    # -- Ratings --------------------------------
    RatingRequest:
      type: object
      required: [tmdbId, mediaType, score]
      properties:
        tmdbId:
          type: integer
          description: TMDB identifier for the content being rated
          example: 550
        mediaType:
          type: string
          enum: [movie, tv]
          description: Whether the content is a movie or TV show
          example: movie
        score:
          type: integer
          minimum: 1
          maximum: 10
          description: Rating score from 1 to 10
          example: 9

    PatchRatingRequest:
      type: object
      required: [score]
      properties:
        score:
          type: integer
          minimum: 1
          maximum: 10
          description: Updated rating score from 1 to 10
          example: 7

    Rating:
      type: object
      required: [id, tmdbId, mediaType, score, userId, author, createdAt, updatedAt]
      properties:
        id:
          type: integer
          example: 1
        tmdbId:
          type: integer
          example: 550
        mediaType:
          type: string
          enum: [movie, tv]
          example: movie
        score:
          type: integer
          minimum: 1
          maximum: 10
          example: 9
        userId:
          type: integer
          description: Internal integer PK of the author
          example: 3
        author:
          $ref: '#/components/schemas/Author'
        createdAt:
          type: string
          format: date-time
          example: '2026-04-20T12:00:00Z'
        updatedAt:
          type: string
          format: date-time
          example: '2026-04-20T12:00:00Z'

    RatingListResponse:
      type: object
      required: [tmdbId, mediaType, averageScore, totalRatings, page, totalPages, results]
      properties:
        tmdbId:
          type: integer
          example: 550
        mediaType:
          type: string
          enum: [movie, tv]
          example: movie
        averageScore:
          type: number
          format: float
          description: Mean score across all ratings for this title
          example: 8.7
        totalRatings:
          type: integer
          description: Total number of ratings submitted for this title
          example: 3
        page:
          type: integer
          example: 1
        totalPages:
          type: integer
          example: 1
        results:
          type: array
          items:
            $ref: '#/components/schemas/Rating'

    MyRatingListResponse:
      type: object
      required: [totalRatings, page, totalPages, results]
      properties:
        totalRatings:
          type: integer
          description: Total ratings submitted by the authenticated user
          example: 5
        page:
          type: integer
          example: 1
        totalPages:
          type: integer
          example: 1
        results:
          type: array
          items:
            $ref: '#/components/schemas/Rating'

    # -- Reviews --------------------------------
    ReviewRequest:
      type: object
      required: [tmdbId, mediaType, body]
      properties:
        tmdbId:
          type: integer
          description: TMDB identifier for the content being reviewed
          example: 550
        mediaType:
          type: string
          enum: [movie, tv]
          description: Whether the content is a movie or TV show
          example: movie
        title:
          type: string
          minLength: 1
          description: Optional review headline
          example: A haunting masterpiece
        body:
          type: string
          minLength: 1
          description: Full review text
          example: Fight Club is a film that gets better with every rewatch.

    PatchReviewRequest:
      type: object
      description: At least one field (title or body) must be provided.
      properties:
        title:
          type: string
          minLength: 1
          description: Updated review headline
          example: On reflection, a genuine classic
        body:
          type: string
          minLength: 1
          description: Updated review body
          example: On reflection, a genuine classic.

    Review:
      type: object
      required: [id, tmdbId, mediaType, body, userId, author, createdAt, updatedAt]
      properties:
        id:
          type: integer
          example: 1
        tmdbId:
          type: integer
          example: 550
        mediaType:
          type: string
          enum: [movie, tv]
          example: movie
        title:
          type: string
          nullable: true
          description: Review headline (null if not provided)
          example: A haunting masterpiece
        body:
          type: string
          example: Fight Club is a film that gets better with every rewatch.
        userId:
          type: integer
          description: Internal integer PK of the author
          example: 3
        author:
          $ref: '#/components/schemas/Author'
        createdAt:
          type: string
          format: date-time
          example: '2026-04-20T12:00:00Z'
        updatedAt:
          type: string
          format: date-time
          example: '2026-04-20T12:00:00Z'

    ReviewListResponse:
      type: object
      required: [tmdbId, mediaType, totalReviews, page, totalPages, results]
      properties:
        tmdbId:
          type: integer
          example: 550
        mediaType:
          type: string
          enum: [movie, tv]
          example: movie
        totalReviews:
          type: integer
          description: Total number of reviews submitted for this title
          example: 1
        page:
          type: integer
          example: 1
        totalPages:
          type: integer
          example: 1
        results:
          type: array
          items:
            $ref: '#/components/schemas/Review'

    MyReviewListResponse:
      type: object
      required: [totalReviews, page, totalPages, results]
      properties:
        totalReviews:
          type: integer
          description: Total reviews written by the authenticated user
          example: 3
        page:
          type: integer
          example: 1
        totalPages:
          type: integer
          example: 1
        results:
          type: array
          items:
            $ref: '#/components/schemas/Review'

    # -- Error response -------------------------
    ErrorResponse:
      type: object
      required: [error, message]
      properties:
        error:
          type: string
          description: Short error category
          example: Not Found
        message:
          type: string
          description: Human-readable description of what went wrong
          example: 'No movie found with id 99999.'

    # -- Health response ------------------------
    HealthResponse:
      type: object
      required: [status]
      properties:
        status:
          type: string
          example: OK

    # --- Issue schemas --------------------------
    IssueStatus:
      type: string
      enum: [Open, InProgress, Resolved, Closed, Wontfix]
      description: Current triage status
      example: Open

    IssueRequest:
      type: object
      required: [title, description]
      properties:
        title:
          type: string
          description: Short summary of the issue
          example: Search returns no results for exact title
        description:
          type: string
          description: Full description of the problem
          example: Searching for "Inception" returns an empty list even though the movie exists.
        reporterContact:
          type: string
          nullable: true
          description: Optional email or name — not linked to any account
          example: user@example.com

    Issue:
      type: object
      required: [id, title, description, status, createdAt, updatedAt]
      properties:
        id:
          type: integer
          description: Issue record ID
          example: 1
        title:
          type: string
          example: Search returns no results for exact title
        description:
          type: string
          example: Searching for "Inception" returns an empty list.
        reproSteps:
          type: string
          nullable: true
          description: Optional reproduction steps
          example: null
        reporterContact:
          type: string
          nullable: true
          description: Submitter contact info (optional, anonymous)
          example: user@example.com
        status:
          $ref: '#/components/schemas/IssueStatus'
        createdAt:
          type: string
          format: date-time
          example: '2026-05-03T10:00:00Z'
        updatedAt:
          type: string
          format: date-time
          example: '2026-05-03T10:00:00Z'

# ── Security Schemes ────────────────────────

securitySchemes:
BearerAuth:
type: http
scheme: bearer
bearerFormat: JWT
description: >
RS256-signed JWT issued by Auth² (https://tcss-460-iam.onrender.com),
the course's shared OAuth2 + OIDC identity provider. Audience: group-6-api.
Obtain a token from the TCSS 460 Token Playground by selecting the
group-6-api audience. Tokens expire after one hour — use the Refresh
button in the playground to mint a new one without re-signing in.
CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Commands
npm run dev # Start dev server with hot reload (tsx watch + .env)
npm run build # Compile TypeScript to dist/
npm start # Run compiled output
npm test # Run Jest tests
npm run test:watch # Run Jest in watch mode
npm run lint # ESLint
npm run lint:fix # ESLint with auto-fix
npm run format # Prettier format
npm run format:check # Check Prettier formatting
Requires Node.js >= 22.0.0.

Architecture
This is a stateless Express 5 + TypeScript REST API that acts as a proxy for The Movie Database (TMDB). It fetches data from TMDB, transforms the responses into custom schemas, and returns JSON to clients. There is no database.

Request flow: Client → Express middleware (CORS, JSON body parsing) → Route-level validation middleware → Controller → TMDB API call → transformed response → Client

Entry points:

src/index.ts — loads .env, starts Express on PORT (default 3000)
src/app.ts — sets up middleware, mounts routes, serves OpenAPI docs at /api-docs via Scalar
Key Modules
src/controllers/tmdb.ts — All TMDB proxy logic. Each controller fetches from https://api.themoviedb.org/3, transforms the response (e.g., normalizes title/name, extracts releaseYear, prefixes image URLs with https://image.tmdb.org/t/p/w500), and returns shaped JSON. Returns 502 on fetch failure; propagates TMDB error status codes otherwise.
src/routes/proxy/tmdb.ts — Express router defining /media/movies/_ and /media/tv/_ endpoints; applies validation middleware before each controller.
src/middleware/validation.ts — Reusable request validators: requireSearchQuery (validates ?query=), validateNumericId (validates route :id param). Also exports requireEnvVar(name) which guards routes from running when a required env var is absent.
src/middleware/logger.ts — Minimal request logger (timestamp, method, path).
Environment Variables
Variable Required Description
PORT No Server port (default: 3000)
TMDB_API_KEY Yes TMDB API key; used in every movie/TV controller
Copy .env.example to .env and add your TMDB API key.

API Specification
The full OpenAPI 3.0.3 spec lives in openapi.yaml. Interactive docs are available at /api-docs when the server is running. The spec is the source of truth for request/response schemas — consult it when adding or modifying endpoints.

Deployment
Deployed on Render at https://tcss460-team-6-api.onrender.com.
