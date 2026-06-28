# AI Insights Blogs — Web Frontend

Production-grade Next.js frontend for [aiinsightsblogs.com](https://aiinsightsblogs.com) — an automated AI knowledge hub covering AI Agents, Large Language Models, and Generative AI.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI Library | MUI v9 (Material UI) |
| Styling | Tailwind CSS + shadcn/ui primitives |
| State Management | Redux Toolkit |
| Data Fetching | TanStack React Query v5 |
| HTTP Client | Axios |
| Forms | React Hook Form + Zod |
| Runtime | Node.js via PM2 on AWS EC2 |

---

## Project Structure

```
app/                        # Next.js App Router pages & layouts
├── page.tsx                # Homepage (hero, about, featured blogs, stats)
├── layout.tsx              # Root layout — metadata, GA, Bing verification
├── not-found.tsx           # Custom 404 page
├── robots.ts               # Auto-generated robots.txt
├── sitemap.ts              # Auto-generated XML sitemap (all blog URLs)
├── blogs/
│   ├── layout.tsx          # /blogs metadata + canonical
│   ├── page.tsx            # Blog listing with search, sort, pagination
│   └── [id]/
│       ├── layout.tsx      # Dynamic metadata + generateStaticParams (SSG)
│       └── page.tsx        # Blog detail — content, views/likes/bookmarks/shares, comments, reviews, related articles
├── about/                  # About page
├── contact/                # Contact page
├── privacy-policy/         # Privacy policy
└── terms-and-conditions/   # Terms & conditions

src/
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── common/             # BlogCard, BlogCardSkeleton, BlogImage, SectionHeader, GlobalSnackbar
│   ├── blog/               # BlogContentRenderer
│   ├── comments/           # CommentsSection, CommentItem
│   ├── reviews/            # ReviewsSection, ReviewCard
│   ├── home/               # HeroSection, AboutSection, FeaturedBlogs, TrendingTopics, StatsSection, Testimonials, Newsletter
│   └── providers/          # AppProviders (Redux + QueryClient + MUI Theme)
├── services/
│   ├── apiClient.ts        # Axios instance
│   ├── blogService.ts      # All blog API calls (blogs, views, likes, bookmarks, shares, comments, reviews)
│   └── testimonialService.ts
├── redux/
│   └── slices/             # uiSlice (theme + snackbar), blogSlice, commentSlice, reviewSlice
├── types/
│   ├── api.ts              # Raw snake_case API shapes (RawBlog, RawComment, etc.)
│   └── index.ts            # Domain types (Blog, Comment, Review, etc.)
├── utils/
│   ├── formatters.ts       # formatDate, formatNumber, formatDateTime, slugify, timeAgo
│   └── mockData.ts         # Legacy mock data (unused)
├── themes/                 # MUI light/dark theme definition
└── constants/              # SITE_NAME, SITE_URL, BLOGS_PER_PAGE, SORT_OPTIONS, etc.

public/
├── ads.txt                 # Google AdSense publisher declaration
├── BingSiteAuth.xml        # Bing Webmaster Tools verification
└── assets/                 # Static assets
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL |
| `NEXT_PUBLIC_ADSENSE_ID` | Google AdSense publisher ID (e.g. `ca-pub-XXXXXXXXXXXXXXXX`) |

`.env.development` — used locally  
`.env.production` — used on EC2 build

---

## Commands

```bash
npm run dev        # Start local dev server (http://localhost:3000)
npm run build      # Production build
npm run lint       # ESLint (non-blocking during build)
npm run typecheck  # TypeScript type check without emit
```

---

## API Integration

All calls go through `src/services/blogService.ts` which maps snake_case API responses to camelCase domain types.

**Blog endpoints:**
- `GET /api/v1/blogs` — paginated list with search, sort, category, featured filters
- `GET /api/v1/blogs/:id` — single blog detail
- `GET /api/v1/blogs/related?category_id=&limit=` — related articles

**Engagement endpoints (per blog):**
- `POST/GET /api/v1/blogs/:id/views`
- `POST/GET /api/v1/blogs/:id/likes`
- `POST/GET /api/v1/blogs/:id/bookmarks`
- `POST/GET /api/v1/blogs/:id/shares`

**Comments & Reviews:**
- `GET /api/v1/blogs/:id/comments?status=approved`
- `POST /api/v1/blogs/:id/comments` (body: `{ name, comment_text, status: 'pending' }`)
- `GET /api/v1/blogs/:id/reviews?status=approved`
- `POST /api/v1/blogs/:id/reviews` (body: `{ name, email, rating, review_text, status: 'pending' }`)

All API responses follow the envelope shape:
```json
{ "status": true, "message": "...", "data": {}, "errors": [] }
```

---

## SEO

- `<meta name="robots" content="index, follow">` on every page (root layout)
- `<link rel="canonical">` on every page (per-route layouts)
- XML sitemap at `/sitemap.xml` — auto-fetches all blog URLs from API (paginated), revalidates every hour
- `robots.txt` at `/robots.txt`
- `ads.txt` at `/ads.txt`
- Bing Webmaster Tools: `BingSiteAuth.xml` + `msvalidate.01` meta tag
- Google Analytics: GA4 tag `G-6SYQDMZ6L0`
- Blog detail pages use `generateStaticParams` for SSG — all existing articles pre-rendered at build time; new ones are ISR'd on first visit (`dynamicParams = true`)

---

## Deployment

Hosted on **AWS EC2** (ap-south-2), served via **PM2**.

```bash
# Sync source files to EC2 (excludes .next, node_modules, .git)
rsync -avz --exclude='.next' --exclude='node_modules' --exclude='.git' \
  ./ ec2-user@<EC2_HOST>:/home/ec2-user/aiinsightsblogs-web/

# On EC2 — build and restart
npm run build
pm2 restart all
```

PM2 processes:
- `aiinsightsblogs-web` — Next.js frontend (port 3000)
- `aiinsightsblog-svc` — Backend API service
