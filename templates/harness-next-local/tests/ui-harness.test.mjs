import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

test("UI route enters through runtime and UI only", () => {
  const page = readFileSync(path.join(root, "src/app/page.tsx"), "utf8");
  assert.match(page, /runtime\/example-runtime/);
  assert.match(page, /ui\/ExampleWorkbench/);
  assert.doesNotMatch(page, /repo\/|providers\/|service\//);
});

test("example UI stays presentational", () => {
  const ui = readFileSync(path.join(root, "src/domain/example/ui/ExampleWorkbench.tsx"), "utf8");
  assert.match(ui, /ExampleOverview/);
  assert.doesNotMatch(ui, /repo\/|providers\/|service\/|runtime\//);
});

test("example domain layers exist", () => {
  for (const layer of ["types", "config", "repo", "providers", "service", "runtime", "ui"]) {
    assert.equal(existsSync(path.join(root, "src/domain/example", layer)), true, `missing ${layer}`);
  }
});

