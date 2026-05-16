# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Product context

This is **Clearwork** — a client-management platform for solo creative freelancers (HoneyBook competitor). The product wedge is "**we never touch your money**": payments flow directly to each user's Stripe Connect Express account, and Clearwork is never the merchant of record. `PRD.MD` at the repo root is the V1 spec — consult it before making product-shaped decisions, especially around the wedge (§4) and the P0/P1/P2 priority tags in §5.

The repo previously held two earlier framings (CollegeConsulting → Tiers → Clearwork). Leftover copy may exist (e.g. signup page still says "Office of Admissions"); don't treat that as canonical product copy. Don't rename anything based on the old framings.

## Working directory

All app code lives in `/site` (a one-member `pnpm` workspace declared by `site/pnpm-workspace.yaml`). Run every command from `site/`, not the repo root:

```bash
pnpm dev          # next dev (http://localhost:3000)
pnpm build        # next build
pnpm start        # next start (after build)
pnpm lint         # eslint flat config

# Drizzle — these invoke drizzle-kit directly with --env-file=.env.local,
# so DATABASE_URL must be set there (NOT in shell env, NOT in .env).
pnpm db:generate  # generate SQL migration from schema.ts
pnpm db:migrate   # apply pending migrations
pnpm db:push      # push schema directly (dev convenience)
pnpm db:studio    # open Drizzle Studio
```

There is no test runner configured.

## This is Next.js 16 — do not assume your training-data conventions apply

`site/AGENTS.md` (imported by `site/CLAUDE.md` via `@AGENTS.md`) is a load-bearing warning: APIs, file names, and conventions have breaking changes. Before writing routing, caching, middleware, or server-action code, consult `site/node_modules/next/dist/docs/` for the exact API in this version (`next@16.2.4`, `react@19.2.4`).

The single most likely place to trip: **this repo uses `proxy.ts` with `export async function proxy()` — NOT `middleware.ts` / `middleware()`**. See `site/proxy.ts:4` and `site/lib/supabase/middleware.ts`. Don't "fix" it back to the old name.

## Architecture

### Route groups split the app into two shells

- `site/app/(main)/` — public marketing site + auth pages. Layout adds the `GridPattern` background. Includes `(home)/` (landing page with `Hero`, `Wedge`, `Workflow`, `Pricing` sections) and all `/auth/*` routes.
- `site/app/(app)/` — authenticated app shell. Layout wraps children in `SWRProvider` + `TooltipProvider` + `SidebarProvider` + `AppSidebar`. Currently holds `/dashboard` and its sub-pages: `widgets`, `templates`, `analytics`, `integrations`, `account`.

The root `site/app/layout.tsx` only sets up fonts (Geist Sans, Geist Mono, Instrument Serif — exposed as `--font-sans`, `--font-mono`, `--font-serif`/`--font-heading`) and the html shell. The two route-group layouts are where the actual chrome lives.

### Auth flow (Supabase via @supabase/ssr)

There are three Supabase client factories in `site/lib/supabase/`, and choosing the wrong one breaks cookie handling:

- `client.ts` — browser usage (Client Components). Uses `createBrowserClient`.
- `server.ts` — Server Components, Route Handlers, Server Actions. Uses `createServerClient` with `next/headers` cookies. The cookie `setAll` try/catch is intentional — Server Components can't write cookies, but the proxy refreshes the session, so it's safe to swallow.
- `middleware.ts` — only called from `proxy.ts`. Exports `updateSession(request)` which refreshes session cookies on every request and redirects unauthenticated traffic away from `/dashboard*` to `/auth/login`. To protect more paths, edit `PROTECTED_PREFIXES` in this file.

OAuth lands at `site/app/(main)/auth/callback/route.ts`, which exchanges the code for a session and redirects to `/dashboard` (or `/auth/login?error=oauth_failed`). Email/password and email-magic flows use server actions in each `auth/*/actions.ts` file — pattern: validate → call Supabase → return `{ error }` on failure, or `revalidatePath('/', 'layout')` + `redirect('/dashboard')` on success.

### Server-action + SWR mutation pattern

Client-side reads + mutations follow the shape in `site/lib/profile/`:

1. Types live in `types.ts` (the client-facing shape, not the raw DB row).
2. `use-profile.ts` is a `useSWR` hook that fetches via the browser Supabase client and exposes a mutator (`updateName`) that calls the server action with `optimisticData` + `rollbackOnError`.
3. `actions.ts` is `"use server"` — it validates, mutates via the server Supabase client (so RLS applies to the signed-in user), then `revalidatePath()` to refresh server-rendered consumers.

The `(app)` layout wraps everything in `SWRProvider`, which disables `revalidateOnFocus`, `revalidateOnReconnect`, `revalidateIfStale`, and retries — so SWR keys are effectively immutable until a mutation. Plan reads with that in mind.

Reuse this hook+actions shape for new entities. The optimistic update is the load-bearing UX detail. See "Backend stays in Next.js" below for the deps-as-args refinement that keeps each domain module portability-ready.

### Data layer (Drizzle + Supabase Postgres)

- Schema: `site/lib/db/schema.ts`. Note the `pgSchema("auth").table("users", ...)` declaration — that's a typed handle on Supabase's `auth.users` (read-only from this codebase). App tables go in the default `public` schema; `drizzle.config.ts` filters to public so introspection won't fight auth.
- Current tables: `profiles` (1:1 with `auth.users`), `stripe_connections` (1:1, holds the Connect Express OAuth tokens), `stripe_products` and `stripe_prices` (mirror of Stripe-side records, keyed by `userId` + Stripe ID with a unique index).
- DB client: `site/lib/db/index.ts` exposes `db` (postgres-js + drizzle) using `DATABASE_URL`. Note `{ prepare: false }` — required for Supabase's pgbouncer transaction pooler.
- Migrations: written to `site/drizzle/` (gitignored until generated). Use `db:push` for fast iteration during development; switch to `db:generate` + `db:migrate` once schemas stabilize.

### Stripe Connect (the wedge)

Per PRD §4 and PAY-1/PAY-2/PAY-10: Clearwork uses Stripe Connect Express with the freelancer as the connected account holder, takes 0% application fee, and never settles funds in its own account. The `stripe_connections` table is where the OAuth tokens live; treat its existence (a row for the signed-in user) as the source of truth for "is this user payments-ready." Any future server action that hits Stripe on a user's behalf must read that user's `accessToken` and act on their account — never a platform-level key.

### Backend stays in Next.js — port via module boundaries, not service boundaries

**Decision:** All backend logic lives in this Next.js codebase — route handlers under `site/app/api/*` and server actions co-located with their consumers. No separate FastAPI / Go / etc. service for the MVP.

**Why:** Future language portability is bought at the *function-signature* level, not the network level. Standing up a second service now would duplicate Supabase auth verification, `stripe_connections` token access, deploy pipelines, and types sync — all during the 20-week LTD ship (`PRD.MD` §10) with no payoff until a specific workload actually justifies extraction.

**Convention for every new domain module under `site/lib/<domain>/`:**

- **Core file** exports a pure function: `domainOp(deps, input): Promise<Result>`. Dependencies (`db`, `supabase`, `stripe`, `mailer`, …) are passed in as arguments — never imported as module-level singletons.
- **`actions.ts`** is the server-action adapter (`"use server"`): builds deps, runs the auth check, calls the core function, translates the result to `{ ok } | { error }`, calls `revalidatePath()`.
- **`route.ts`** under `site/app/api/<domain>/` is the route-handler adapter for external callers — Stripe webhooks, magic-link client portal, future mobile/public API. The set of route handlers under `app/api/*` is "the API" and is what would be ported to another language if extracted.
- **Both adapters delegate to the same core function.** The core stays pure.
- **No `next/*` imports, no `redirect()`, no `revalidatePath()`, no module-level `db` / `supabase` / `stripe` imports inside core files.** Those live only in adapters.

`site/lib/profile/` is the closest current template (types + actions + SWR hook); new domains (`lib/stripe/`, `lib/invoices/`, `lib/projects/`, `lib/smart-files/`, …) follow the same shape with the deps-as-args refinement above.

**Extract a sidecar service only when a specific workload demands it.** Real triggers:

- Webhook ingestion outgrows Vercel function concurrency / duration limits.
- PDF generation (INV-7) becomes CPU-bound enough to cost real money.
- Background-job needs (overdue reminders INV-5, automations AUTO-2) outgrow Vercel cron + queue.
- A specific workload depends on a Python / Go library with no good Node equivalent.

In each case, carve out **that specific workload only** as a sidecar. The Next.js app keeps owning the user-facing surface.

**Boundary check before merging any new domain module:**

1. `rg "from ['\"]next" site/lib/<domain>/<core>.ts` → empty.
2. `rg "from ['\"]@/lib/(db|supabase)" site/lib/<domain>/<core>.ts` → empty.
3. The core function is callable from both `actions.ts` and a hypothetical `app/api/<domain>/route.ts` without modification.

If a module passes those three checks, it is, by construction, ready for extraction the day it needs to be.

### Styling

- Tailwind v4 — configuration lives in `site/app/globals.css` (`@theme inline { ... }`), NOT a `tailwind.config.ts` file. There is no JS-side Tailwind config.
- shadcn/ui registry: style `radix-nova`, base color `neutral`, components in `site/components/ui/`. `components.json` also registers `@magicui` for shadcn CLI installs (`shadcn add @magicui/<name>`).
- `cn()` from `site/lib/utils.ts` is the standard class merger (`clsx` + `tailwind-merge`).
- Path alias: `@/*` resolves to `site/` (see `tsconfig.json`).

### MCP

`site/.mcp.json` declares the Supabase MCP server. The Supabase agent skill is locked in `site/skills-lock.json` (mirrored under `site/.agents/skills/supabase/`). Use it when interacting with the actual Supabase project rather than guessing API shapes.
