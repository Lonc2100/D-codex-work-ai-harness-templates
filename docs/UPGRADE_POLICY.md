# Upgrade Policy

Harness templates are upgraded by preview, not by blind overwrite.

## Rules

- `trellis init` creates new projects.
- `trellis update` updates Trellis-managed files only.
- Harness-managed files are tracked through `.harness/manifest.json`.
- `scripts/harness-update-preview.mjs` creates `.new` files and a report.
- Users or agents merge changes after reading the diff.

## Never Overwrite

- `docs/task-board.md`
- `docs/handoffs/`
- `src/domain/`
- `.trellis/tasks/`
- `.trellis/workspace/`

