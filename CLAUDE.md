# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

The Next.js app lives in `site/`. Run all commands (pnpm, drizzle, eslint) from there, not from the repo root.

## Next.js version warning

This project uses **Next.js 16** (`next@16.2.4`, React 19), which has breaking changes from older versions you may know. Before writing Next.js code, consult `site/node_modules/next/dist/docs/` for current API shape and heed deprecation notices. Do not rely on patterns from training data without verifying.

Notable concrete differences observed:
- Middleware is named **`proxy.ts`** at `site/proxy.ts` and exports a `proxy()` function (not `middleware()`). It delegates to `lib/supabase/middleware.ts:updateSession` for Supabase session refresh.

## Commands (run from `site/`)

```bash
pnpm dev              # Next dev server
pnpm build            # Production build
pnpm lint             # eslint (flat config in eslint.config.mjs)

pnpm db:generate      # Generate Drizzle migrations from schema.ts
pnpm db:migrate       # Apply migrations
pnpm db:push          # Push schema directly (dev)
pnpm db:studio        # Drizzle Studio
```

DB scripts load env from `site/.env.local` via `node --env-file`. They require `DATABASE_URL`.

There is no test runner configured.

## Architecture

**Auth & data plane.** Supabase provides auth; the Postgres database is accessed two ways:
- **Supabase clients** (`lib/supabase/{client,server,middleware}.ts`) for auth flows and RLS-aware reads/writes from the browser/server.
- **Drizzle** (`lib/db/index.ts`, `lib/db/schema.ts`) over `postgres-js` for typed server-side queries. The schema declares both the `auth.users` table (read-only reference, owned by Supabase) and an app-owned `public.profiles` table FK'd to it with `onDelete: cascade`.

When adding user-related tables, follow the same pattern: FK to `authUsers.id` with cascade delete, and create a corresponding profile-style hook + server action pair if the data is user-editable.

**Route groups.**
- `app/(main)/` — public marketing/auth surface (`(home)`, `auth/{login,signup,callback,confirm,forgot-password,reset-password}`).
- `app/(app)/dashboard/` — authenticated app (account, activities, assistant, college-list, courses, scholarship). Each feature is a route segment; co-locate feature-specific components under `<segment>/components/` (see `dashboard/account/components/profile-card.tsx`).

**Profile pattern (reference for client/server data flow).** `lib/profile/` shows the conventional shape:
- `actions.ts` — server actions that mutate via Drizzle/Supabase.
- `types.ts` — shared shapes.
- `use-profile.ts` — SWR hook for client-side reads, keyed so server actions can revalidate.
Components consume the SWR hook and call server actions; gate UI on the SWR loading state rather than rendering placeholder data.

**UI.** Tailwind v4 (PostCSS plugin, no config file), shadcn components under `components/ui/`, Radix primitives, `lucide-react` icons, `motion` for animation. `components.json` configures shadcn. Use `cn()` from `lib/utils.ts` for class merging.
