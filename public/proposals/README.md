# Proposal publish layout

Brand-aware BLS scripts publish to `https://buildlaunchsell.com/proposals/<slug>`.

```
public/proposals/{slug}.html   ← served at GET /proposals/{slug}
public/proposals/{slug}.json   ← optional sidecar (proposal payload)
```

**Instant:** `PUT /api/proposals/{slug}` with `Authorization: Bearer $PROPOSAL_ADMIN_SECRET` and `{ "html": "...", "proposal": { ... } }`. Writes this folder when the filesystem is writable; on Vercel it also writes `/tmp/bls-proposals` for that instance.

**Git fallback:** commit `{slug}.html` here and deploy. Same public URL.

Do not commit test dumps. This index is not a client directory.
