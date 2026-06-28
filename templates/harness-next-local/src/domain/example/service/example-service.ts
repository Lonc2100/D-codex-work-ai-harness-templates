import { listExampleItems } from "../repo/example-repo";
import type { ExampleClockProvider } from "../providers/example-provider";
import type { ExampleOverview } from "../types/example-types";

export async function buildExampleOverview(clock: ExampleClockProvider): Promise<ExampleOverview> {
  const items = await listExampleItems();
  return {
    generatedAt: clock.now().toISOString(),
    items
  };
}

