# Workflow Boundaries

## Layer Boundary

- UI calls Runtime or API only.
- Runtime calls Service.
- Service may call Repo, Providers, Config, and Types.
- Providers isolate external tools and APIs.
- Repo owns persistence only.

## Connector Boundary

External tools must enter through Providers. Do not let UI or app routes call external systems directly.

## Data Boundary

Persist external information internally before analysis, review, or AI assistance.

