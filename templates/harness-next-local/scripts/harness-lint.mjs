import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const layers = ["types", "config", "repo", "providers", "service", "runtime", "ui"];

for (const file of ["ARCHITECTURE.md", "docs/workflow-boundaries.md", "docs/quality-execution-system.md"]) {
  if (!existsSync(path.join(root, file))) errors.push(`Missing required Harness file: ${file}`);
}

const domainRoot = path.join(root, "src", "domain");
if (!existsSync(domainRoot)) {
  errors.push("Missing src/domain");
} else {
  for (const domain of readdirSync(domainRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
    const domainPath = path.join(domainRoot, domain.name);
    for (const layer of layers) {
      if (!existsSync(path.join(domainPath, layer))) errors.push(`Domain ${domain.name} is missing layer: ${layer}`);
    }
  }
}

function scanFiles(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scanFiles(full, out);
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

for (const file of scanFiles(path.join(root, "src", "domain"))) {
  const rel = path.relative(root, file).replaceAll("\\", "/");
  const content = readFileSync(file, "utf8");
  if (rel.includes("/ui/") && /from\s+["']\.\.\/(?:repo|providers|service)\//.test(content)) {
    errors.push(`UI must not import repo/providers/service directly: ${rel}`);
  }
  if (rel.includes("/repo/") && /from\s+["']\.\.\/(?:service|runtime|ui|providers)\//.test(content)) {
    errors.push(`Repo must stay persistence-only: ${rel}`);
  }
}

if (errors.length) {
  console.error("harness-lint failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("harness-lint passed");

