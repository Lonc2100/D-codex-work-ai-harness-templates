# Quality Execution System

Quality is observable work, not a completion claim.

## Evidence Levels

| Level | Evidence |
| --- | --- |
| O0 | Commands and logs are readable. |
| O1 | Tests and lint checks cover the changed contract. |
| O2 | Build or smoke proves the workflow. |
| O3 | Screenshots, traces, or reports prove user-facing behavior. |

## Default Gate

```bash
npm run verify:harness
```

