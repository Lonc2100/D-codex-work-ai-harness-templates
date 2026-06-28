import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, cpSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templateId = process.argv[2];
if (!templateId) {
  console.error("Usage: node scripts/smoke-template.mjs <template-id>");
  process.exit(1);
}

const index = JSON.parse(readFileSync(path.join(root, "index.json"), "utf8"));
const template = index.templates.find((entry) => entry.id === templateId);
assert.ok(template, `unknown template: ${templateId}`);

const source = path.join(root, template.path);
assert.equal(existsSync(source), true, `missing template path: ${template.path}`);

const tempParent = mkdtempSync(path.join(os.tmpdir(), `ai-harness-${templateId}-`));
const target = path.join(tempParent, "project");
mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });

for (const file of ["AGENTS.md", "ARCHITECTURE.md", "docs/context/index.md", ".harness/manifest.json"]) {
  assert.equal(existsSync(path.join(target, file)), true, `missing required file: ${file}`);
}

const allFiles = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else allFiles.push(full);
  }
}
walk(target);

const banned = [/\bself-media\b/i, /\bcanvas\b/i, /\bdouyin\b/i, /\bxiaohongshu\b/i, /\bbilibili\b/i, /Data Collection and Background Analysis/i];
for (const file of allFiles) {
  const rel = path.relative(target, file).replaceAll("\\", "/");
  const text = readFileSync(file, "utf8");
  for (const pattern of banned) {
    assert.equal(pattern.test(text), false, `pollution token ${pattern} found in ${rel}`);
  }
}

if (existsSync(path.join(target, "package.json"))) {
  const pkg = JSON.parse(readFileSync(path.join(target, "package.json"), "utf8"));
  const npmExecPath = process.env.npm_execpath;
  const npmCommand = npmExecPath && existsSync(npmExecPath) ? process.execPath : process.platform === "win32" ? "npm.cmd" : "npm";
  const npmPrefix = npmExecPath && existsSync(npmExecPath) ? [npmExecPath] : [];
  if (Object.keys(pkg.dependencies ?? {}).length || Object.keys(pkg.devDependencies ?? {}).length) {
    const install = spawnSync(npmCommand, [...npmPrefix, "install", "--no-audit", "--no-fund"], {
      cwd: target,
      encoding: "utf8"
    });
    if (install.status !== 0) {
      console.error(install.stdout);
      console.error(install.stderr);
      if (install.error) console.error(install.error.message);
    }
    assert.equal(install.status, 0, "npm install failed");
  }
  const result = spawnSync(npmCommand, [...npmPrefix, "run", "verify:harness"], {
    cwd: target,
    encoding: "utf8"
  });
  if (result.status !== 0) {
    console.error(result.stdout);
    console.error(result.stderr);
    if (result.error) console.error(result.error.message);
  }
  assert.equal(result.status, 0, "verify:harness failed");
}

console.log(`smoke passed: ${templateId}`);
console.log(`generated copy: ${target}`);
