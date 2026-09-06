# BuildLaunchSell

Marketing site for [buildlaunchsell.com](https://buildlaunchsell.com) — founders and operators taking a **software or app idea to market**.

**Real price on call one. Working product in 48 hours.**

This is not OwnerBuilt Software. OBS is for people who need software for an existing business (spreadsheets, texts, PDFs). BLS is the idea → market product. Client-facing copy says **working version**, never MVP.

## Stack

Next.js (App Router) + Tailwind CSS + TypeScript. Deploy on Vercel.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional; defaults work without it
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_BOOKING_URL` | `#book` | Calendly (or `/apply`). `#book` jumps to the homepage booking band. |
| `NEXT_PUBLIC_ACCEPTANCE_URL` | Whop checkout URL | $2,900 refundable working-version deposit. Label is neutral (“Accept $2,900 working version”). Swap when BLS has its own checkout. |
| `NEXT_PUBLIC_META_PIXEL_ID` | _(empty)_ | Meta Pixel. Inactive until set. Snippet lives in `components/MetaPixel.tsx`. |
| `NEXT_PUBLIC_VSL_EMBED_URL` | _(empty)_ | Loom / Wistia / YouTube embed `src` for the VSL slot. |
| `NEXT_PUBLIC_SITE_URL` | `https://buildlaunchsell.com` | Canonical URL for metadata and sitemap. |
| `PROPOSAL_ADMIN_SECRET` | _(empty)_ | Bearer token for instant proposal publish. Required for `PUT /api/proposals/:slug`. |

See `.env.example`. Do not commit `.env.local`.

## Proposals

Publish scripts target `https://buildlaunchsell.com/proposals/<slug>`. Two paths, same URL:

**Instant (API)** — brand-aware scripts `PUT` HTML + proposal JSON:

```bash
curl -X PUT "$ORIGIN/api/proposals/acme-core" \
  -H "Authorization: Bearer $PROPOSAL_ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"html":"<!doctype html><title>Acme</title><p>Working version scope</p>","proposal":{"client":"Acme"}}'
```

Same on-disk layout as the git fallback:

```
public/proposals/<slug>.html
public/proposals/<slug>.json
```

On Vercel `public/` is not durable, so the API also writes `/tmp/bls-proposals` for that instance. Commit the `.html` for a lasting deploy.

**Git fallback** — add `public/proposals/<slug>.html` and deploy. `GET /proposals/<slug>` serves it.

Stub index: `/proposals` (no public directory of clients).

## Deploy on Vercel

1. Import this repo in Vercel.
2. Framework preset: Next.js. Build command: `npm run build`.
3. Set the env vars above (at least booking + acceptance when those URLs are live).
4. Point `buildlaunchsell.com` at the project.

## Brand (v0)

| Token | Hex | Use |
| --- | --- | --- |
| ink | `#0B1220` | Text, dark surfaces |
| paper | `#F7F4EF` | Page background |
| signal | `#E85D04` | Primary CTA |
| steel | `#1B4332` | Trust / “for you” |
| line | `#D9D2C5` | Borders |
| muted | `#5C6570` | Secondary text |

Display: Fraunces. UI: Geist. Price chips: Geist Mono.

## QA checklist

- [ ] Homepage is distinct from ownerbuiltsoftware.com in under 5 seconds (idea-to-market, orange CTA, offer card).
- [ ] H1 is exactly: **Real price on call one. Working product in 48 hours.**
- [ ] No “OwnerBuilt” / “OBS” in the H1 or primary chrome (nav / hero).
- [ ] Offer math is visible: $0 / 45 min, $2,900 refundable / 48h, low five-figures 50/50.
- [ ] Copy says **working version**, never MVP.
- [ ] Sections present: hero, enemy, VSL placeholder, mechanism, proof table, who for / not, GTM strip, CTA band, FAQ, book, footer, privacy.
- [ ] Footer includes: Building software for your existing business? → https://ownerbuiltsoftware.com
- [ ] No fake case studies or logos.
- [ ] Booking, Meta Pixel, VSL, and privacy are honest placeholders until configured.
- [ ] Mobile: chips wrap, comparison becomes stacked cards, nav menu works.

## Pages

- `/` — conversion landing page
- `/apply` — dedicated booking page (use when `NEXT_PUBLIC_BOOKING_URL=/apply`)
- `/privacy` — privacy stub
- `/proposals` — stub index for published proposals
- `/proposals/<slug>` — live proposal HTML (API or `public/proposals/<slug>.html`)
