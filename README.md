# shopify

Workspace repository for store automations and supporting tooling.

## Automated workflows

This repo ships with a small, zero-config automation suite under
[`.github/workflows`](.github/workflows). See
[`.github/AUTOMATIONS.md`](.github/AUTOMATIONS.md) for what each one does and how
to tune it.

| Workflow | Trigger | What it does |
| --- | --- | --- |
| **Triage Bot** | New issue / PR | Labels issues by content, sizes PRs, welcomes first-time contributors |
| **Stale Bot** | Daily schedule | Flags and closes issues/PRs that have gone quiet |

Both run on GitHub's built-in token — no secrets or paid services required.
