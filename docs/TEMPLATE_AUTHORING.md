# Template Authoring Guide

Templates must stay small, neutral, and testable.

## Required Checks

- Every template has `.harness/manifest.json`.
- Every managed file listed in the manifest exists.
- Every template runs its own `template:doctor`.
- Every app template exposes `verify:harness`.
- New templates must pass `node scripts/smoke-template.mjs <template-id>`.

## Language

Docs may be Chinese-facing by default. Code identifiers stay English.

## Naming

Use neutral placeholders such as `example`, `project`, `domain`, and `workbench`. Do not embed source-project names.

