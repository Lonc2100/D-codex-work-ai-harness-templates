import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

for (const file of ["ARCHITECTURE.md", "docs/workflow-boundaries.md", "docs/quality-execution-system.md"]) {
  if (!existsSync(path.join(root, file))) errors.push(`Missing required Harness file: ${file}`);
}

const srcDomain = path.join(root, "src", "domain");
if (existsSync(srcDomain)) {
  const layers = ["types", "config", "repo", "providers", "service", "runtime", "ui"];
  for (const domain of readdirSync(srcDomain, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
    for (const layer of layers) {
      if (!existsSync(path.join(srcDomain, domain.name, layer))) {
        errors.push(`Domain ${domain.name} is missing layer: ${layer}`);
      }
    }
  }
}

const architecture = existsSync(path.join(root, "ARCHITECTURE.md")) ? readFileSync(path.join(root, "ARCHITECTURE.md"), "utf8") : "";
if (!architecture.includes("Types -> Config -> Repo -> Providers -> Service -> Runtime -> UI")) {
  errors.push("ARCHITECTURE.md must document the default layer route or its replacement.");
}

if (errors.length) {
  console.error("harness-lint failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("harness-lint passed");

