# BodyShift - Supabase Daily Tracking System

Production-ready fitness tracking system built with Next.js + Supabase.

## Features

- Secure auth: register, login, logout.
- Protected dashboard route.
- Online daily logs (no localStorage dependency).
- CRUD on daily logs (add, edit, delete).
- Filtering by date range.
- Weekly/monthly statistics.
- Recharts trends for weight/calories.
- Toast notifications for UX feedback.
- Zod validation + error handling.
- Unit + E2E test setup.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- Recharts
- Sonner (toasts)
- Vitest + Playwright

## Supabase Setup

1. Open Supabase SQL Editor.
2. Run `supabase/schema.sql`.
3. Confirm table + RLS policies are created:
   - `daily_logs`
   - unique `(user_id, date)`
   - policies for select/insert/update/delete on own rows only

## Environment Variables

1. Copy `.env.example` to `.env.local`.
2. Add real values:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Run

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000`
- `http://localhost:3000/auth`
- `http://localhost:3000/dashboard`

## Test & Verify

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

## Key Files

- `supabase/schema.sql`: DB schema + constraints + RLS policies
- `lib/supabase/client.ts`: browser Supabase client
- `lib/supabase/server.ts`: server Supabase client
- `lib/supabase/middleware.ts`: auth-aware route protection helper
- `proxy.ts`: route protection for `/dashboard` and `/auth`
- `lib/dailyLogsService.ts`: CRUD + auth service layer
- `lib/dailyLogsSchema.ts`: Zod validation schema
- `lib/dashboardStats.ts`: filtering + weekly/monthly stats + chart transform
- `app/auth/page.tsx`: login/register page
- `app/dashboard/page.tsx`: dashboard UI + CRUD + charts + filtering

## Production Notes

- Never expose service-role keys in frontend env vars.
- Keep `anon key` in `NEXT_PUBLIC_*` only.
- Use Supabase RLS as the source of data isolation.
- For stronger production UX: add email verification template + password reset page.
