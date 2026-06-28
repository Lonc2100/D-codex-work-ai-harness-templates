# Engineering Principles

This file is the reusable engineering experience base for AI-assisted work. Treat these rules as hard defaults unless the active spec explicitly overrides them.

## Non-Negotiable Defaults

- Simple First, Agent Last: use deterministic workflow before adding autonomous behavior.
- Read Before You Write: inspect existing files, contracts, and acceptance gates before editing.
- Grill Before Build: if the request is ambiguous, ask or state the missing decisions before writing code.
- Terms Before Logic: define domain words, states, and boundaries before creating services or data models.
- Bug Needs Reproduction: before fixing a bug, capture the failing path, expected behavior, actual behavior, and verification command.
- Test Behavior, Not Implementation: prefer public contracts, user-visible behavior, and acceptance evidence over brittle internal assertions.
- Vertical Slice Tasks: split work by observable user value, not by isolated technical chores.
- UI -> Runtime -> Service -> Provider -> external tool: keep user-facing code away from direct integrations.
- Fail Loud: prefer explicit failure states over silent fallback.
- Evidence Over Claims: completion requires commands, screenshots, logs, or reviewable diffs.

## Agent Checklist

Before implementation, the agent must be able to answer:

1. What user-visible behavior will change?
2. Which files or layers are allowed to change?
3. What command, test, screenshot, or log will prove the change?
4. What remains unverified or risky?
5. What handoff note should the next human or agent read?

If these answers are not clear, stop and clarify or write the missing spec/task entry first.
