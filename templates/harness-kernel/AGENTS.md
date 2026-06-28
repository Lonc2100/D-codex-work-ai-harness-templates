# AI Harness Agent Map

This project uses an AI-readable Harness skeleton. Replace this paragraph with the project name, product goal, and active root path after initialization.

## Safety

Do not run scripts that batch delete files or directories. When deletion is required, remove explicit paths one at a time and stop for human confirmation if the operation becomes cleanup-scale.

## Core Read Order

1. Read `docs/context/index.md`.
2. Read `ARCHITECTURE.md`.
3. Read `docs/mainline-framework.md`.
4. Read `docs/task-board.md`.

## Read On Demand

- Before feature work: read `docs/spec-governance.md`.
- Before architecture or boundary changes: read `docs/workflow-boundaries.md`.
- Before multi-agent work: read `docs/agent-playbook.md`.
- Before review, cleanup, or acceptance: read `docs/quality-execution-system.md` and `docs/golden-principles.md`.
- Before handoff: read `docs/handoffs/README.md`.

## Fixed Route

Default implementation route:

```text
Types -> Config -> Repo -> Providers -> Service -> Runtime -> UI
```

Projects may rename these layers, but must document the replacement in `ARCHITECTURE.md` before implementation.

## Agent Rules

Before implementation, align active spec, task entry, acceptance command, and handoff path. Do not rely on chat memory for unresolved requirements.

Trellis owns task packages and spec injection. Harness owns repository structure, quality gates, and reviewable evidence.

## Complexity Rule

Choose the simplest approach that satisfies the quality bar. Add abstractions, agents, services, or dependencies only when they remove proven complexity and are covered by acceptance evidence.

