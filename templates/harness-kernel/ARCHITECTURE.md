# AI Harness Architecture

This repository starts from a reusable Harness skeleton. Its purpose is to keep the project readable, executable, reviewable, and recoverable by humans and AI agents.

## Default Layers

```text
Types -> Config -> Repo -> Providers -> Service -> Runtime -> UI
```

- `Types` defines durable records, enums, and contracts.
- `Config` defines feature flags, thresholds, and static project settings.
- `Repo` owns local persistence and state access.
- `Providers` isolate external tools, commands, APIs, and adapters.
- `Service` owns business rules and state transitions.
- `Runtime` exposes callable use cases to routes, CLIs, or agents.
- `UI` renders human workflows and calls Runtime or API boundaries.

## Boundary Rules

- UI does not call Repo, Providers, or external tools directly.
- Providers do not own product decisions.
- Repo does not perform business decisions.
- Runtime orchestrates; Service decides.
- App entrypoints import only UI or Runtime.

## State

Project state lives in files, databases, and docs, not in chat history. Every durable feature should identify its entity state, mutation rules, persistence behavior, user-facing workflow, and verification path.

## Extension Entrypoints

New integrations enter through Providers first, then become internal records through Repo and Service.

