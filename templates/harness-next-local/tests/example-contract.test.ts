import test from "node:test";
import assert from "node:assert/strict";
import { getExampleOverview } from "../src/domain/example/runtime/example-runtime";

test("example runtime returns reviewable overview", async () => {
  const overview = await getExampleOverview();
  assert.equal(typeof overview.generatedAt, "string");
  assert.equal(overview.items.length >= 3, true);
  assert.equal(overview.items.some((item) => item.status === "needs_input"), true);
});

