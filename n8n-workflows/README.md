# n8n Workflows

Importable n8n workflow files. To use one:

1. Open n8n → **Workflows** → top-right **⋮ / Import** → **Import from File**
2. Select the `.json` file
3. Open each node that shows a credential warning and pick your own credential
4. Toggle the workflow **Active**

## lead-capture-form.json

A self-contained **Lead Capture** workflow — n8n hosts the form itself, so no
Shopify or webhook setup is needed.

```
[Contact Form]  (hosted by n8n: Name, Email, Message)
      ▼
[Build Lead]    (normalizes fields + timestamp)
      ├──────────────► [Email Lead Alert]      → your inbox
      └──────────────► [Log Lead to Airtable]  → "Leads" table
```

After import you only need to:
- Select your **Gmail** credential on *Email Lead Alert* (recipient is preset to
  `ranahammad400000@gmail.com` — change as needed).
- Select your **Airtable** credential on *Log Lead to Airtable*, and make sure the
  base has a table named **Leads** with columns `Name`, `Email`, `Message`,
  `Submitted At` (or delete this node if you don't want Airtable logging).
- Click **Active**. Open the form's URL (shown on the Contact Form node) and test.
