# 2026-04-07 usability fixes

- Branch: `codex/usability-fixes`
- Base branch: `main`
- Purpose: fix blocked creation flow, dead settings navigation, mobile sidebar usability, and missing schedule time entry
- Must keep:
  - server-side generation fallback via `/api/generate`
  - responsive sidebar/header split for mobile vs desktop
  - new `/settings` page
  - date + time scheduling in the create flow
- Can discard:
  - local dev logs or temporary server pid files
- Verification:
  - `pnpm.cmd build` PASS
  - Browser QA PASS on `/`, `/create`, `/settings`
  - Mobile QA PASS at narrow viewport with full-width header/main layout
- Load/perf:
  - No dedicated load test run for this task
- Commit:
  - pending
