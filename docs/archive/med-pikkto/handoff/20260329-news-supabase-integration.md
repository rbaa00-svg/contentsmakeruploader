# News Supabase Integration Handoff

- Branch: `codex/news-supabase-integration`
- Base branch: `main`
- Core goal:
  - Read `/news` and `/news/[slug]` from Supabase `posts`
  - Save drafts and published posts from `/news/agent`
  - Persist pipeline output into Supabase
  - Restyle the public news hub and article view to match the existing `pikkto_home-main` blog FE more closely
  - Replace local article imagery with curated category-based Unsplash images
  - Limit the public archive to the latest 4 posts initially and reveal 6 more items per click
  - Tighten public news SEO so the base hub indexes, query archives stay `noindex`, and article pages emit richer `BlogPosting` metadata

- Must keep:
  - `C:\pikkto_med_worktrees\news-supabase-integration\lib\news-posts.ts`
  - `C:\pikkto_med_worktrees\news-supabase-integration\lib\news-view.ts`
  - `C:\pikkto_med_worktrees\news-supabase-integration\lib\news-visuals.ts`
  - `C:\pikkto_med_worktrees\news-supabase-integration\app\news\page.tsx`
  - `C:\pikkto_med_worktrees\news-supabase-integration\app\news\[slug]\page.tsx`
  - `C:\pikkto_med_worktrees\news-supabase-integration\components\NewsHubShell.tsx`
  - `C:\pikkto_med_worktrees\news-supabase-integration\components\NewsArticleView.tsx`
  - `C:\pikkto_med_worktrees\news-supabase-integration\next.config.ts`
  - `C:\pikkto_med_worktrees\news-supabase-integration\app\api\news\agent\route.ts`
  - `C:\pikkto_med_worktrees\news-supabase-integration\app\api\news\pipeline\route.ts`
  - `C:\pikkto_med_worktrees\news-supabase-integration\components\NewsAgentStudio.tsx`
  - `C:\pikkto_med_worktrees\news-supabase-integration\lib\news-pipeline.ts`
  - `C:\pikkto_med_worktrees\news-supabase-integration\docs\MED_PIKKTO_NEWS_SUPABASE_SETUP.md`
  - `C:\pikkto_med_worktrees\news-supabase-integration\.env.example`
- Safe to drop:
  - none in this feature slice

- Implementation notes:
  - The public hub now uses a featured article plus a category-filtered archive grid.
  - The public hub shows 4 posts initially (1 featured + 3 archive cards when available) and the `더보기` button reveals 6 additional archive cards per click.
  - The article page now uses a hero image, an inline image, richer typography, tags, CTA, references, and related articles.
  - Visual presets come from `lib/news-visuals.ts` and map category/article type to curated Unsplash URLs.
  - Base `/news` metadata is indexable, while category query pages canonicalize back to `/news` and emit `noindex, follow`.
  - Article pages now emit stronger `BlogPosting` metadata with category keywords, hero/inline image URLs, publisher metadata, and breadcrumb JSON-LD.
  - The layout intentionally follows the reading flow of the existing `C:\pikkto_home-main\app\(main)\blog` FE, but keeps the square med.piKKto visual language.
  - Public pages only read `published` posts. The agent continues to save `draft` or `published` rows depending on mode.

- Validation:
  - `pnpm.cmd lint` passed
  - `pnpm.cmd build` passed
  - Browser QA passed
    - `http://127.0.0.1:4330/news`
    - `http://127.0.0.1:4330/news?category=document-tips`
    - `http://127.0.0.1:4330/news/20260328-regulatory-brief`
    - Base `/news` confirmed `index, follow`
    - Category archive confirmed `noindex, follow`
    - Base `/news` confirmed initial 4 visible posts and `더보기` increments of 6
    - Detail page confirmed `og:type=article`, canonical, and hero/inline Unsplash image rendering
  - Supabase QA passed
    - `POST /api/news/agent` with `persistMode: draft`
    - `POST /api/news/agent` with `persistMode: published`
    - `POST /api/news/pipeline` with `skipRevalidate: true`

- Operational note:
  - The current `SUPABASE_SERVICE_ROLE_KEY` is only for local temporary testing.
  - Rotate that key before any real deployment.

- Final commit:
  - pending latest archive/SEO pass commit
