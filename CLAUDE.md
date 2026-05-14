# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Product context

The directory name is `CollegeConsulting`, but the product has pivoted (commit `710132f`) to **Tiers** — a Stripe-connected pricing-widget builder for solo founders. `PRD.MD` at the repo root is the V1 spec; consult it before making product-shaped decisions. Don't rename anything based on the old framing.

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

- `site/app/(main)/` — public marketing site + auth pages. Layout adds the `GridPattern` background; pages use `Navbar1`. Includes `/` (home with `Hero` and `Pricing` sections) and all `/auth/*` routes.
- `site/app/(app)/` — authenticated app shell. Layout wraps children in `SidebarProvider` + `AppSidebar` + `TooltipProvider`. Currently holds `/dashboard` and its sub-pages: `widgets`, `templates`, `analytics`, `integrations`, `account`.

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

Reuse this shape for new entities. The optimistic update is the load-bearing UX detail.

### Data layer (Drizzle + Supabase Postgres)

- Schema: `site/lib/db/schema.ts`. Note the `pgSchema("auth").table("users", ...)` declaration — that's a typed handle on Supabase's auth.users (read-only from this codebase). App tables go in the default `public` schema; `drizzle.config.ts` filters to public so introspection won't fight auth.
- DB client: `site/lib/db/index.ts` exposes `db` (postgres-js + drizzle) using `DATABASE_URL`. Note `{ prepare: false }` — required for Supabase's pgbouncer transaction pooler.
- Migrations: written to `site/drizzle/` (gitignored until generated). Use `db:push` for fast iteration during development; switch to `db:generate` + `db:migrate` once schemas stabilize.

### Styling

- Tailwind v4 — configuration lives in `site/app/globals.css` (`@theme inline { ... }`), NOT a `tailwind.config.ts` file. There is no JS-side Tailwind config.
- shadcn/ui registry: style `radix-nova`, base color `neutral`, components in `site/components/ui/`. `components.json` also registers `@magicui` for shadcn CLI installs (`shadcn add @magicui/<name>`).
- `cn()` from `site/lib/utils.ts` is the standard class merger (`clsx` + `tailwind-merge`).
- Path alias: `@/*` resolves to `site/` (see `tsconfig.json`).

### MCP

`site/.mcp.json` declares the Supabase MCP server. The Supabase agent skill is locked in `site/skills-lock.json` (mirrored under `site/.agents/skills/supabase/`). Use it when interacting with the actual Supabase project rather than guessing API shapes.
