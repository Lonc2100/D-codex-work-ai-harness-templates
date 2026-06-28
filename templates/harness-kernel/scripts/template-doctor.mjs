import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const template = JSON.parse(readFileSync(path.join(root, "harness-template.json"), "utf8"));
const manifest = JSON.parse(readFileSync(path.join(root, ".harness", "manifest.json"), "utf8"));
const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));

for (const file of template.requiredFiles ?? []) {
  if (!existsSync(path.join(root, file))) errors.push(`Missing required template file: ${file}`);
}

for (const script of template.requiredScripts ?? []) {
  if (!pkg.scripts?.[script]) errors.push(`Missing package script: ${script}`);
}

for (const file of manifest.managedFiles ?? []) {
  if (!existsSync(path.join(root, file))) errors.push(`Manifest managed file does not exist: ${file}`);
}

if (manifest.templateVersion !== template.version) {
  errors.push("Manifest version must match harness-template.json version.");
}

if (errors.length) {
  console.error("template-doctor failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("template-doctor passed");

