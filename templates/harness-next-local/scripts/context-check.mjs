import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const required = [
  "AGENTS.md",
  "ARCHITECTURE.md",
  "docs/context/index.md",
  "docs/context/current-state.md",
  "docs/context/engineering-principles.md",
  "docs/context/user-preferences.md",
  "docs/context/external-knowledge.md",
  "docs/context/decisions.md",
  "docs/mainline-framework.md",
  "docs/spec-governance.md",
  "docs/workflow-boundaries.md",
  "docs/quality-execution-system.md",
  "docs/golden-principles.md",
  "docs/agent-playbook.md",
  "docs/task-board.md",
  "docs/handoffs/README.md"
];

function read(file) {
  return readFileSync(path.join(root, file), "utf8");
}

for (const file of required) {
  if (!existsSync(path.join(root, file))) errors.push(`Missing context file: ${file}`);
}

if (existsSync(path.join(root, "AGENTS.md"))) {
  const agents = read("AGENTS.md");
  for (const token of ["Core Read Order", "Read On Demand", "Fixed Route", "Agent Rules"]) {
    if (!agents.includes(token)) errors.push(`AGENTS.md must include: ${token}`);
  }
}

if (existsSync(path.join(root, "docs/context/engineering-principles.md"))) {
  const principles = read("docs/context/engineering-principles.md");
  for (const token of ["Simple First, Agent Last", "Read Before You Write", "Fail Loud", "Evidence Over Claims"]) {
    if (!principles.includes(token)) errors.push(`engineering-principles.md must include: ${token}`);
  }
}

if (errors.length) {
  console.error("context-check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("context-check passed");

