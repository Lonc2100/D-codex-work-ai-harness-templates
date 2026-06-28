import { exampleSeedItems } from "../config/example-config";
import type { ExampleItem } from "../types/example-types";

export async function listExampleItems(): Promise<ExampleItem[]> {
  return exampleSeedItems.map((item) => ({ ...item }));
}

