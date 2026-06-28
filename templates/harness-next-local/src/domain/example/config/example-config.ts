import type { ExampleItem } from "../types/example-types";

export const exampleSeedItems: ExampleItem[] = [
  {
    id: "architecture-map",
    title: "Architecture map",
    status: "ready",
    evidence: "AGENTS.md and ARCHITECTURE.md define the default Harness route."
  },
  {
    id: "quality-gate",
    title: "Quality gate",
    status: "ready",
    evidence: "verify:harness checks context, architecture, tests, and template metadata."
  },
  {
    id: "next-step",
    title: "Project-specific spec",
    status: "needs_input",
    evidence: "Replace example domain with the real project domain after initialization."
  }
];

