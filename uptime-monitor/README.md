# Uptime Monitor

A tiny, **zero-dependency** uptime & health monitor that runs entirely on GitHub
Actions — no servers, no paid monitoring service, no secrets.

Every 30 minutes (and on demand) it:

1. Checks every URL in [`sites.json`](./sites.json)
2. Publishes a live status page to [`status/STATUS.md`](./status/STATUS.md) (raw
   data in `status/status.json`), committed back to the repo
3. **Opens a GitHub issue** (labeled `incident`) the moment a service goes down,
   and **closes it automatically** when everything recovers

## Add the services you care about

Edit [`sites.json`](./sites.json):

    [
      { "name": "My Store", "url": "https://your-store.myshopify.com" },
      { "name": "Checkout API", "url": "https://api.example.com/health", "expectStatus": 200, "timeoutMs": 8000 }
    ]

- `expectStatus` *(optional)* — the exact HTTP code that means "healthy"
  (defaults to any 2xx response).
- `timeoutMs` *(optional)* — how long to wait before calling it down (default 10s).

## Run it

- **On a schedule:** already wired up in `.github/workflows/uptime.yml`.
- **On demand:** Actions tab → **Uptime Monitor** → **Run workflow**.
- **Locally:** `npm start` (needs Node 18+).

## Develop

    npm test     # unit tests, no network required

The checking logic lives in [`src/monitor.js`](./src/monitor.js), split into small
pure functions (`check`, `summarize`, `renderStatusMarkdown`) so it is easy to
test and extend.
