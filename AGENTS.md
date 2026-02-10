# Repository Guidelines

## Plan Authority

`PLAN.md` is the source of truth for product direction, milestones, feature scope, and stack decisions.

- If guidance in this file conflicts with `PLAN.md`, follow `PLAN.md`.
- Use this file for day-to-day contributor workflow, coding standards, and repo hygiene.
- When implementing roadmap work, reference the relevant `PLAN.md` section in your PR description.
- If `PLAN.md` changes process expectations, update `AGENTS.md` in the same PR to keep both aligned.

## Project Structure & Module Organization

Current repository implementation is Next.js App Router with Convex backend functions.
Treat this as the current state, while `PLAN.md` defines target-state changes.

- `src/app/`: routes, layouts, and route handlers (`sign-in`, `sign-up`, `callback`).
- `src/components/`: shared React components; reusable primitives are in `src/components/ui/`.
- `src/lib/`: framework-agnostic utilities.
- `src/env.ts`: runtime env validation with Zod.
- `convex/`: schema and backend logic; treat `convex/_generated/*` as generated code (do not hand-edit).
- `public/`: static assets.

Use the `@/*` path alias (configured in `tsconfig.json`) for imports from `src`.

## Build, Test, and Development Commands

- `pnpm install`: install dependencies (Node version from `.nvmrc`, currently `24`).
- `pnpm dev`: runs Next.js and Convex dev processes together.
- `pnpm build`: production build (`next build`).
- `pnpm start`: serve the production build.
- `pnpm lint`: run Biome checks (lint + formatting diagnostics).
- `pnpm format`: auto-format with Biome.

If `PLAN.md` introduces new tooling or framework workflows, add/update scripts first, then update this section.

## Coding Style & Naming Conventions

- Language: TypeScript (`strict` mode enabled).
- Formatting: Biome, 2-space indentation, organize imports automatically.
- Components: `PascalCase` file/component names (for example, `ConvexClientProvider.tsx`).
- Utilities/hooks/modules: `camelCase` exports and clear, descriptive names.
- Routes: use App Router folder naming (`src/app/<segment>/...`).

## Testing Guidelines

There is no dedicated test script configured yet. For now, treat this as the baseline before opening a PR:

1. Run `pnpm lint`.
2. Run `pnpm build`.
3. Verify core flows locally (`/`, auth routes, Convex-connected screens).

When adding tests, prefer `*.test.ts(x)` naming and colocate near the source file or in `__tests__/`.

## Commit & Pull Request Guidelines

Current history uses short, imperative commit subjects (for example, `Link convex with workos`).

- Keep commit titles concise, imperative, and scoped to one change.
- PRs should include: purpose, key changes, local validation steps, and screenshots/GIFs for UI updates.
- Link related issues/tasks and call out any env/config changes explicitly.

## Security & Configuration Tips

- Keep secrets in `.env.local`; never commit credentials.
- Ensure new env vars are added to `src/env.ts` for validation.
- Review auth middleware changes in `src/proxy.ts` carefully, especially `unauthenticatedPaths`.
