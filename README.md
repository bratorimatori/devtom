# devtom.co

Marketing site for **DevTom** — a software consultancy in Novi Sad, Serbia,
delivering scoped contract engineering for regulated and transaction-critical
systems.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · statically prerendered,
with one dynamic route for the enquiry form.

Type is a deliberate three-role system: **Archivo** for display, **IBM Plex
Sans** for body, **IBM Plex Mono** for record data.

## Running it

```bash
npm install
npm run dev     # http://localhost:4311
```

Port 4311 is pinned in `package.json` for both `dev` and `start`.

```bash
npm run build   # production build
npm run lint
```

## Configuration

Copy `.env.example` and fill in what you need. Nothing is required to run the
site locally; the enquiry form returns an explicit "not connected" error rather
than silently discarding submissions.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` / `INQUIRY_FROM` | Deliver enquiries via Resend |
| `FORMSPREE_ENDPOINT` | Deliver enquiries via Formspree (simpler alternative) |
| `INQUIRY_TO` | Destination inbox, defaults to `hello@devtom.co` |
| `NEXT_PUBLIC_CALENDLY_URL` | Scheduling link; the call-booking button is hidden without it |

`POST /api/inquiry` validates input, silently absorbs honeypot submissions, and
returns a clear error when no delivery provider is configured.

## The hero artwork

`src/components/AppendOnly.tsx` is a seeded generative piece drawn against the
2D canvas context — no library. The canvas is cleared once at initialisation;
every mark after that is permanent, and entries found to be wrong are annotated
alongside rather than overwritten. The design rationale is in
[`design/APPEND-ONLY.md`](design/APPEND-ONLY.md).

## Project status

Open decisions, outstanding inputs and the pre-launch checklist live in
[`PROGRESS.md`](PROGRESS.md).
