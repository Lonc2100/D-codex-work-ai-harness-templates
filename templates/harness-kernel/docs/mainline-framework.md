# Mainline Framework

This project has two tracks:

- Product track: define the user workflow and durable project state.
- Engineering track: keep work readable, executable, reviewable, and recoverable by AI agents and humans.

## Framework Table

| Layer | Method | Repository Landing |
| --- | --- | --- |
| Architecture | Harness Engineering | `AGENTS.md`, `ARCHITECTURE.md`, `docs/context/`, quality scripts |
| Requirements | Spec-first planning | `docs/spec-governance.md`, task board, acceptance commands |
| Agent work | Orchestrator / Worker / Auditor | `docs/agent-playbook.md`, handoffs |
| Tool boundaries | Provider boundary | `docs/workflow-boundaries.md` |
| Quality | Mechanical gates | `verify:harness`, lint, tests, doctor |

## Completion Standard

- Project root is unambiguous.
- Architecture and context docs are current.
- Layer boundaries are enforced by scripts.
- `npm run verify:harness` passes.

