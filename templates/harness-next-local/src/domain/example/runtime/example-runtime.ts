import { systemClockProvider } from "../providers/example-provider";
import { buildExampleOverview } from "../service/example-service";
import type { ExampleOverview } from "../types/example-types";

export async function getExampleOverview(): Promise<ExampleOverview> {
  return buildExampleOverview(systemClockProvider);
}

