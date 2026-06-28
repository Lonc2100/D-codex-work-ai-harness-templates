import type { ExampleOverview } from "../types/example-types";

export function ExampleWorkbench({ overview }: { overview: ExampleOverview }) {
  return (
    <main className="workbench-shell">
      <header className="workbench-header">
        <p className="eyebrow">AI Harness / Local Workbench</p>
        <h1>可读、可验收、可持续迭代的项目骨架</h1>
        <p className="summary">
          这是一个最小 example domain。新项目启动后，用真实领域替换它，同时保留 Harness 的文档、分层和验收门禁。
        </p>
      </header>
      <section className="panel-grid" aria-label="Harness overview">
        {overview.items.map((item) => (
          <article className="panel" key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.evidence}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

