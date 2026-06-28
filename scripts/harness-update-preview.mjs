import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const templateRoot = path.resolve(process.argv[2] ?? "");
const projectRoot = path.resolve(process.argv[3] ?? process.cwd());

if (!templateRoot || !existsSync(path.join(templateRoot, ".harness", "manifest.json"))) {
  console.error("Usage: node scripts/harness-update-preview.mjs <template-root> <project-root>");
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(path.join(templateRoot, ".harness", "manifest.json"), "utf8"));
const report = [];

for (const rel of manifest.managedFiles ?? []) {
  const src = path.join(templateRoot, rel);
  const dst = path.join(projectRoot, `${rel}.new`);
  if (!existsSync(src)) {
    report.push(`MISSING TEMPLATE FILE: ${rel}`);
    continue;
  }
  mkdirSync(path.dirname(dst), { recursive: true });
  writeFileSync(dst, readFileSync(src, "utf8"));
  report.push(`WROTE PREVIEW: ${rel}.new`);
}

const neverOverwrite = manifest.neverOverwrite ?? [];
for (const rel of neverOverwrite) {
  if (existsSync(path.join(projectRoot, rel))) report.push(`PRESERVED: ${rel}`);
}

const reportPath = path.join(projectRoot, ".harness-update-preview.md");
writeFileSync(reportPath, [`# Harness Update Preview`, "", ...report.map((line) => `- ${line}`), ""].join("\n"));
console.log(`preview written: ${reportPath}`);

