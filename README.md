# ClinicShield

ClinicShield is a Next.js + Convex app for NHS DSPT readiness workflows for small healthcare providers.

Current stack:

- Next.js 16 + React 19
- Convex (database, backend functions, file storage)
- Clerk (authentication)
- Tailwind CSS v4 + shadcn/ui
- Stripe, Resend, PostHog integrations

## Prerequisites

- Node.js `24` (from `.nvmrc`)
- `pnpm` (project is pinned to `pnpm@10.29.2`)

## Setup

```bash
pnpm install
```

Create `.env.local` with the required variables:

```bash
# Server
CONVEX_DEPLOYMENT=
RESEND_KEY=
STRIPE_SECRET_KEY=
CLERK_SECRET_KEY=

# Client
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CONVEX_SITE_URL=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

# Convex HTTP webhook verification (used in convex/http.ts)
CLERK_WEBHOOK_SECRET=
```

## Development

```bash
pnpm dev
```

`pnpm dev` runs both:

- `next dev`
- `convex dev`

App route: [http://localhost:3000](http://localhost:3000)

## Seed DSPT Data

Seed reference standards/assertions/evidence items once:

```bash
pnpx convex run seed:seedDsptData
```

The seed is idempotent and safe to re-run.

## Scripts

- `pnpm dev`: run Next.js + Convex in development
- `pnpm build`: production build
- `pnpm start`: serve production build
- `pnpm lint`: Biome checks
- `pnpm format`: Biome format writes

## Current App Surface

- `/`: marketing landing page
- `/onboarding`: organisation setup wizard
- `/dashboard`: authenticated assessment shell

## Validation Baseline

Before opening a PR:

```bash
pnpm lint
pnpm build
```

Then smoke test core flows:

- Landing page
- Sign-in/sign-up
- Onboarding
- Dashboard
