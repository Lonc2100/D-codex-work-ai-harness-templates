# Agent Playbook

## Roles

- Orchestrator: owns scope, task split, review, and merge decisions.
- Worker: implements a bounded task and reports evidence.
- Explorer: researches options and records sources.
- Auditor: reviews risks, regressions, missing tests, and boundary drift.

## Task Lifecycle

```text
intake -> spec -> plan -> implementation -> verification -> handoff -> review
```

## Agent Boundary

Workers must stay inside the allowed file set and stop when core architecture boundaries need changing.

