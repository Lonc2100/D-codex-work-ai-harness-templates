export type ExampleStatus = "ready" | "needs_input" | "blocked";

export type ExampleItem = {
  id: string;
  title: string;
  status: ExampleStatus;
  evidence: string;
};

export type ExampleOverview = {
  generatedAt: string;
  items: ExampleItem[];
};

