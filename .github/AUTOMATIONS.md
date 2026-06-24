# Repo Automations

Two small GitHub Actions workflows that keep issues and pull requests organized
automatically, so no one has to do it by hand. They use only GitHub's built-in
token — **no secrets, no paid services, nothing to configure to get started.**

## What's included

### 1. Triage Bot — `.github/workflows/triage.yml`
Runs the moment an issue or PR is opened.

- **Issues** are auto-labeled by what they say:
  `bug`, `enhancement`, `question`, `documentation`, `urgent` — plus
  `needs-triage` on everything so nothing is missed. The repo owner is assigned
  automatically, and the reporter gets a short acknowledgment comment.
- **Pull requests** get a size label based on lines changed:
  `size/XS` (<10), `size/S` (<100), `size/M` (<500), `size/L` (<1000),
  `size/XL` (1000+) — so reviewers can see at a glance how big a change is.
- **First-time contributors** get a friendly welcome comment.

### 2. Stale Bot — `.github/workflows/stale.yml`
Runs once a day on a schedule (and on demand from the Actions tab).

- Anything with no activity for **30 days** is marked `stale`.
- If it stays quiet for **7 more days**, it's closed automatically.
- Items labeled `pinned`, `security`, or `roadmap` are never touched.

## How it behaves (the important part)

Just like a store automation that waits for an order, **these wait for activity.**
They don't *do* anything until an issue or PR shows up, or until the daily timer
fires. An idle repo with no issues will simply have nothing to act on yet — that
is the correct, healthy state, not a sign anything is broken.

## How to activate

GitHub only runs workflows that live on the repository's **default branch**.
Because this is the repo's first commit, the branch it's pushed to becomes the
default automatically, so the bots are live right away. If you later rename or
change the default branch, just make sure these files are present on it.

To see the Stale Bot run immediately without waiting for the schedule:
**Actions tab → Stale Bot → Run workflow.**

To see the Triage Bot run: open any issue or pull request and watch it get
labeled within a minute.

## How to tune

Everything is plain text at the top of each workflow file:

| Want to change… | Edit… |
| --- | --- |
| Which keywords map to which label | the `rules` list in `triage.yml` |
| PR size thresholds | the `tiers` list in `triage.yml` |
| Turn off auto-assign or welcome comments | delete that block in `triage.yml` |
| Stale / close timing (30 & 7 days) | `days-before-stale` / `days-before-close` in `stale.yml` |
| Labels that are never marked stale | `exempt-issue-labels` / `exempt-pr-labels` |

Commit the change to the default branch and it takes effect on the next run.
