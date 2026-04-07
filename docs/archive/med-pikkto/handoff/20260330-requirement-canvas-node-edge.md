# Requirement Canvas Node Edge

- Branch: `codex/req-canvas-note-edge`
- Base branch: `main`
- Purpose: remove Requirement Canvas connection lines and edge nodes, leaving only the cards and item status indicators.

## Keep

- `components/AuditTrailProof.tsx`
  - removed the SVG connection lines from the Requirement Canvas
  - removed the edge port nodes and their measurement/routing logic
  - kept the cards and per-item status indicators intact

## Discard

- None

## Validation

- `pnpm.cmd build`: passed
- Visual QA: captured updated Requirement Canvas screenshot at `C:\pikkto_med_artifacts\requirement-canvas-edge-fix.png`
- Visual QA follow-up: captured alignment-adjusted screenshot at `C:\pikkto_med_artifacts\requirement-canvas-edge-align-fix.png`
- Visual QA final: captured line-routing-adjusted screenshot at `C:\pikkto_med_artifacts\requirement-canvas-line-fix-4.png`
- Visual QA latest: captured line/node-removed screenshot at `C:\pikkto_med_artifacts\requirement-canvas-no-lines.png`

## Notes

- Worktree used the existing main workspace `node_modules` via a local junction for build verification only.
- Final commit hash is reported in the task close-out message.
