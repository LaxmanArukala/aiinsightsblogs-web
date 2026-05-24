# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (Next.js)
npm run build      # production build
npm run lint       # ESLint (note: lint is skipped during builds per next.config.js)
npm run typecheck  # TypeScript type check without emitting
```

No test suite is configured. Lint errors will not block `npm run build`.

## Environment

Two env files are used:
- `.env.development` — sets `NEXT_PUBLIC_API_BASE_URL` for local dev
- `.env.production` — sets `NEXT_PUBLIC_API_BASE_URL` for production

The API base URL is forwarded via `next.config.js` and consumed by `src/services/apiClient.ts`.

## Architecture

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · MUI v9 · Tailwind CSS · Redux Toolkit · TanStack React Query · Axios · Zod · React Hook Form

**Dual styling system:** MUI components (`@mui/material`) are used for all application UI (layout, cards, typography, snackbar, theme). Tailwind + shadcn/ui primitives live in `components/ui/` but are not used in the current app pages — they are available for future use.

**Provider tree** (`src/components/providers/AppProviders.tsx`):
```
ReduxProvider → QueryClientProvider → MuiThemeProvider (reads themeMode from Redux)
```
The MUI theme (light/dark) is driven by `src/redux/slices/uiSlice.ts` and defined in `src/themes/index.ts`.

**API layer** (`src/services/`):
- `apiClient.ts` — Axios instance with `NEXT_PUBLIC_API_BASE_URL` as baseURL
- `blogService.ts` — calls `/api/v1/blogs` and `/api/v1/blogs/:id`; maps snake_case API responses (`RawBlog`) to camelCase domain types (`Blog`); comments and reviews are served from mock data (`src/utils/mockData.ts`)
- `testimonialService.ts` — calls `/api/v1/testimonials`

All API responses follow the envelope shape `{ status, message, data, errors }` defined in `src/types/api.ts`.

**Type separation:** `src/types/api.ts` contains raw API shapes (snake_case, `RawBlog`, `ApiEnvelope`). `src/types/index.ts` contains domain types (camelCase, `Blog`, `Testimonial`, etc.). Services are responsible for the mapping between them.

**Redux slices** (`src/redux/slices/`):
- `uiSlice` — theme mode (`light`/`dark`) and global MUI Snackbar state
- `blogSlice`, `commentSlice`, `reviewSlice` — blog/comment/review state (supplementing React Query)

**Data fetching pattern:** Pages use TanStack React Query (`useQuery`) for fetching. All pages are `'use client'` components — there is no server-side data fetching (RSC) currently.

**Routes:**
- `/` — homepage (`app/page.tsx`): hero, trending topics, featured blogs, stats, testimonials, newsletter
- `/blogs` — blog listing with filters (`app/blogs/page.tsx`)
- `/blogs/[id]` — blog detail (`app/blogs/[id]/page.tsx`)
- `/about` — about page (`app/about/page.tsx`)

**Deployment:** Netlify — `npm run build`, publish dir `.next`.
