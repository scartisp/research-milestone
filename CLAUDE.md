# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project purpose

This is a research milestone for a capstone project: a deliberately **very simple** todo app. A signed-in user can create todos (each with a due date) and view them on a calendar. The only goal is to prove the team's core stack works end to end: a signed-in user can create and read their own data. Keep the scope minimal and prefer the smallest working example over extra features, abstractions, or polish.

## Tech stack (milestone scope)

- **Next.js 16 (App Router) + React + JavaScript** (not TypeScript): UI and server-side code (Server Components, Server Actions, or route handlers). There is no separate backend. Styling is Tailwind CSS v4.
- **Clerk**: authentication via `@clerk/nextjs`.
- **PostgreSQL on Supabase**: database only. Supabase Auth is **not** used because Clerk handles auth.
- **Prisma ORM (v7)**: schema, migrations, and queries.

The full capstone stack also includes a Python backend (OR-Tools, pandas), Plaid, and a rewards database. Those are **out of scope** for this milestone, so don't add them.

## Commands

```bash
npm run dev                  # start dev server (http://localhost:3000)
npm run build                # production build
npm run lint                 # lint
npx prisma migrate dev --name <name>   # after editing prisma/schema.prisma: create + apply migration, regenerate client
npx prisma generate          # regenerate client only
npx prisma studio            # browse the database
npx -y clerk@latest doctor   # check the Clerk setup
```

No test framework is set up.

## How the pieces connect

- **Auth:** `<ClerkProvider>` in `app/layout.js` and `clerkMiddleware()` in `proxy.js` at the project root (Next.js 16 renamed `middleware` to `proxy`). `next.config.mjs` enables `cacheComponents`, so `<ClerkProvider>` sits inside `<body>` wrapped in `<Suspense>`, and anything reading request-time data (`auth()`, per-user DB queries) must also be inside a `<Suspense>` boundary or the build fails. Clerk Core 3 removed `<SignedIn>`/`<SignedOut>`; use `<Show when="signed-in">` / `<Show when="signed-out">`. On the server, get the current user with `const { userId } = await auth()` from `@clerk/nextjs/server`.
- **User data:** Clerk owns users, so there is no User table in Postgres. Store Clerk's `userId` as a plain string column (e.g. `Todo.userId`) and **always filter queries by it**.
- **Calendar:** the calendar is just a view over the user's todos grouped by their due date. It does not need its own table or a third-party calendar integration.
- **Database client:** a single shared `PrismaClient` in `lib/prisma.js`, built with the `@prisma/adapter-pg` driver adapter (required in Prisma 7). It is cached on `globalThis` so Next.js hot reload doesn't open new connections. Import the client from the generated output path set in `schema.prisma` (`app/generated/prisma`), not from `@prisma/client`.
- **Database calls run on the server only** (Server Components, Server Actions, route handlers), never in `"use client"` components.

## Environment variables

- `.env.local`: Clerk keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`).
- `.env`: `DATABASE_URL` (Supabase **pooled** connection on port 6543, used by the app at runtime) and `DIRECT_URL` (Supabase **direct** connection on port 5432, used by the Prisma CLI for migrations through `prisma.config.ts`).
- Both files are gitignored. `prisma.config.ts` loads `.env` via `dotenv/config`, but it does **not** read `.env.local`.
