# Research Milestone: Todo App

A simple todo app built to show that our capstone stack works end to end. A signed-in user can create todos with due dates and see them grouped into **due today**, **pending**, and **overdue**.

## Live demo

The app is deployed on Vercel: **https://research-milestone-7uwx.vercel.app/**

## Tech stack

- **Next.js 16** (App Router, JavaScript) with Tailwind CSS v4
- **Clerk** for authentication
- **PostgreSQL on Supabase** for the database
- **Prisma ORM 7** for the schema, migrations, and queries

## Running locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the environment files (both are gitignored):

   - `.env.local`: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, and `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
   - `.env`: `DATABASE_URL` (Supabase pooled connection, port 6543) and `DIRECT_URL` (Supabase direct connection, port 5432)

3. Apply the database migrations:

   ```bash
   npx prisma migrate dev
   ```

4. Start the dev server and open [http://localhost:3000](http://localhost:3000):

   ```bash
   npm run dev
   ```
