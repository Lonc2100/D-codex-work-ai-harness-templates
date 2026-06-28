import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

test("Harness kernel files exist", () => {
  for (const file of ["AGENTS.md", "ARCHITECTURE.md", "docs/context/index.md", ".harness/manifest.json"]) {
    assert.equal(existsSync(path.join(root, file)), true, `missing ${file}`);
  }
});

test("Harness kernel is domain-neutral", () => {
  const bannedTerms = [
    ["self", "media"].join("-"),
    ["can", "vas"].join(""),
    ["dou", "yin"].join(""),
    ["bili", "bili"].join(""),
    ["Data Collection", "Background Analysis"].join(" and ")
  ];
  for (const file of ["AGENTS.md", "ARCHITECTURE.md", "docs/mainline-framework.md"]) {
    const content = readFileSync(path.join(root, file), "utf8");
    for (const term of bannedTerms) {
      assert.equal(content.toLowerCase().includes(term.toLowerCase()), false, `${file} contains a source-project term`);
    }
  }
});
