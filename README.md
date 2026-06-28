# AI Harness Templates

Reusable AI-readable project skeletons for Trellis, Codex, Cursor, and local-first engineering workflows.

This repository intentionally extracts only the reusable governance and technical skeleton:

- `harness-kernel`: documentation, context, quality gates, and agent operating rules.
- `harness-next-local`: `harness-kernel` plus a minimal Next.js local workbench.

It does not include domain-specific business models, platform integrations, historical handoffs, real data, or source-project memories.

## Use With Trellis

```bash
trellis init --codex --cursor --registry gh:<your-org>/ai-harness-templates --template harness-kernel --workflow native
trellis init --codex --cursor --registry gh:<your-org>/ai-harness-templates --template harness-next-local --workflow native
```

## Local Smoke

```bash
node scripts/smoke-template.mjs harness-kernel
node scripts/smoke-template.mjs harness-next-local
```

