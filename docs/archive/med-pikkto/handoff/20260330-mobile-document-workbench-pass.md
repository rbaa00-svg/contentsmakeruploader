## Mobile Document Workbench Pass

- Branch: `codex/mobile-document-workbench-pass`
- Base branch: `main`
- Purpose: simplify the mobile homepage so the workbench preview section shows only the editor mock, while removing other workbench-style detail blocks from mobile layouts.

### Must keep

- Desktop homepage layout unchanged.
- Mobile `#technology` section showing only the editor mock preview.
- Mobile `#solutions` section using card summary only, without the large template workbench detail mock.
- Mobile audit section using the requirement canvas plus a compact summary card, without the long review-comments / approval-state workspace panels.

### Can discard

- Temporary QA screenshots generated during local verification.

### Validation

- `pnpm.cmd lint`
- `pnpm.cmd build`
- Mobile browser QA on `http://127.0.0.1:4336/`

### Notes

- Full-page mobile QA confirmed that the editor mock is fully visible in the document workbench section.
- Full-page mobile QA confirmed that the template workbench detail panel is hidden on mobile.
- Full-page mobile QA confirmed that the long audit workspace panels are replaced by a compact summary block on mobile.

### Follow-up

- Mobile CTA block for the workbench preview was restored after the initial simplification pass.
- Final commit hash is tracked in the terminal report for this thread.
