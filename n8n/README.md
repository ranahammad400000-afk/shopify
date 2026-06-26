# n8n — LinkedIn AI Engineer Scraper (Apify → Airtable)

Importable n8n workflow that scrapes AI-engineer profiles from LinkedIn via an
Apify actor and stores them in Airtable.

**File:** [`linkedin-ai-engineer-scraper-airtable.json`](./linkedin-ai-engineer-scraper-airtable.json)

## Flow

```
Manual run → Search Parameters → Apify: Run Actor → Apify: Get Dataset Items → Map Fields → Airtable: Create Record
```

Airtable fields written: **Name, Contact Number, Website, Location, Email**.

## Import

1. n8n → **Workflows → ⋯ → Import from File** → select the JSON.

## Setup (after import)

1. **Community node:** install `@apify/n8n-nodes-apify` (Settings → Community Nodes) — the Apify nodes need it.
2. **Apify credential** (`apifyApi`): paste your Apify API token; assign it to both Apify nodes.
3. **Apify – Run Actor:** set the **Actor ID** to your LinkedIn scraper and paste the actor's **input JSON** (keep the `{{ $json.keywords }}` expressions, or rename to the actor's own input fields).
4. **Search Parameters:** edit `keywords` / `location` / `maxResults`.
5. **Map Fields:** adjust the source keys to match your actor's output fields.
6. **Airtable – Create Record:** pick your Base + Table; create columns named exactly `Name`, `Contact Number`, `Website`, `Location`, `Email`.

## Notes

- Public LinkedIn rarely exposes email / phone / website. Use an Apify actor that returns or enriches contact data, or those columns stay blank. Name + Location fill reliably.
- `run-sync` style runs cap at ~5 minutes; for large scrapes switch to async runs + polling + dataset fetch.
- Respect LinkedIn's Terms of Service and applicable data-privacy law (e.g. GDPR/CCPA).
