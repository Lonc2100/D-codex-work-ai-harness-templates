import { getExampleOverview } from "../domain/example/runtime/example-runtime";
import { ExampleWorkbench } from "../domain/example/ui/ExampleWorkbench";

export default async function HomePage() {
  const overview = await getExampleOverview();
  return <ExampleWorkbench overview={overview} />;
}

