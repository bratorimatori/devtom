# devtom.co — build progress

**Target: Friday 4 September 2026.** Last updated 1 September 2026 (rev 2).

Run it: `npm run dev` → http://localhost:4311 (port pinned in `package.json`;
3000 is deliberately not used).

---

## TODO — before Friday 4 September

Four items stand between the current build and shipping. Ordered by what blocks
what: the first two are config, the third is a legal requirement, the fourth is
discoverability.

### 1. Connect the enquiry form  ·  ~15 min  ·  BLOCKING

The form is built and tested end-to-end, but returns a `503` "not connected yet"
until a provider is configured. Pick one:

- [ ] **Formspree** (fastest) — sign up, create a form, copy the endpoint into
      `FORMSPREE_ENDPOINT`. No DNS required.
- [ ] **Resend** (better long-term) — verify `devtom.co` via DNS records, then
      set `RESEND_API_KEY` and `INQUIRY_FROM`.
- [ ] Set `INQUIRY_TO` if enquiries should land somewhere other than
      `hello@devtom.co`.
- [ ] Verify a real submission arrives in a real inbox — not a mock.

See `.env.example`. On Vercel these go in Project → Settings → Environment
Variables, not in a committed file.

### 2. Add the Calendly link  ·  ~5 min  ·  BLOCKING

- [ ] Set `NEXT_PUBLIC_CALENDLY_URL` to your scheduling link.
- [ ] Redeploy — this is a `NEXT_PUBLIC_` variable, so it is inlined at build
      time and will not take effect until the site rebuilds.
- [ ] Confirm the popup opens and books a real slot.

Until it is set, the "Schedule a 30-minute call" button does not render at all,
in both the hero and the contact section.

### 3. Privacy policy page  ·  ~30 min  ·  REQUIRED

The form tells people their message is stored, DevTom d.o.o. is an EU company,
and every reference site links a policy beneath its form. Nothing exists yet.

- [ ] Write a short honest policy: what is collected (name, email, company,
      message), why, where it is stored, how long it is kept, and how to request
      deletion.
- [ ] Add it at `/privacy` and link it from the form consent line.

Ask and I will draft it — it is a short static page, not a legal project.

### 4. SEO pass  ·  ~45 min  ·  HIGH VALUE

None of this exists yet. All of it is mechanical.

- [ ] `sitemap.xml` — via `app/sitemap.ts`.
- [ ] `robots.txt` — via `app/robots.ts`.
- [ ] **JSON-LD** `ProfessionalService` schema: name, Novi Sad address, service
      area (EU + US), contact point, and `knowsAbout` carrying the stack
      keywords — TypeScript, React, Angular, Node.js, Next.js, .NET/C#,
      PostgreSQL, SQL Server, AWS, Docker, CI/CD. This recovers the filtering
      value lost when the Capabilities section was removed, without putting the
      chip wall back on the page.
- [ ] **OG share image** — currently the link previews bare in LinkedIn and
      Slack, which matters because LinkedIn is where this gets shared. A static
      `opengraph-image.png`, or generate one from the hero artwork.
- [ ] Replace the default Next.js favicon.

### Also outstanding, not blocking

- [ ] A testimonial — anonymised by role and sector if the client cannot be
      named. Still the largest credibility gap on the page.
- [ ] Hard numbers in the industry descriptions.
- [ ] A founder block: name, photo, direct email.
- [ ] Deploy to Vercel and point the `devtom.co` DNS.

---

## Status

The page is **built, building clean, and verified in a real browser** at 1440px
and 390px: 0 console errors, 0 failed requests, no horizontal overflow, all
scroll animations firing, and a `@media (scripting: none)` fallback so the page
is readable with JS off.

What it is not yet: **connected**. The contact form and Calendly both need
credentials that only you can create. Those two items are the whole gap between
now and shipping.

Section order: Hero → Experience logos → Why choose DevTom → Services → AI →
Process → Who we work with → Contact.

---

## Done

- [x] Next.js 16 + TypeScript + Tailwind v4 scaffold, static prerender
- [x] Design system — dark ground, warm off-white ink, single amber accent, mono labels
- [x] Scroll-reveal animations, hero stagger, drifting grid, reduced-motion support
- [x] Nav, sticky with backdrop blur
- [x] Hero — Intellectsoft-style benefit headline + dual CTA
- [x] Industry experience grid — 6 sectors with inline SVG icons, no client names
- [x] Why choose DevTom — 5 reasons
- [x] Product software development services — 4 cards incl. Infrastructure/DevOps
- [x] AI specialty block — irreversible-systems positioning
- [x] How it works — 4 steps
- [x] Who we work with — 3 segments
- [x] Contact — inquiry form, "What happens next" timeline, Calendly, email
- [x] Inquiry API route with validation, honeypot, pluggable delivery
- [x] Calendly popup component, hides itself when unconfigured
- [x] SEO metadata, OpenGraph, Twitter card, canonical
- [x] Verified: form validation (400s), honeypot (silent 200), unconfigured (503),
      and a real submission delivered end-to-end against a mock provider (200)
- [x] Client anonymity pass — no company name appears anywhere in `src/`

---

## Blocked on you

Nothing below can be answered from the code. These are the actual critical path.

### Decisions

- [ ] **HIPAA wording** — you have *experience in* HIPAA-regulated environments.
      You are not HIPAA-certified. Say which phrasing you want and I'll add it as
      text. No badge — see "Claims we're not making".
- [ ] **"We" vs "I"** — currently "we" throughout, consistently. Fine for a small
      company. Switch only if it feels wrong to you.
- [ ] **Reply-time promise** — "We reply within one business day" appears in the
      form and its success state. Keep only if you'll hold to it.

- [ ] **Privacy policy page.** You're an EU company and the form now says it
      stores the sender's message. GDPR wants a policy behind that, and every
      reference site links one under its form. Currently no `/privacy` page
      exists and nothing links to one. Smallest honest fix is a short static
      page; say the word and I'll write it.

### Inputs needed

- [ ] **Formspree endpoint or Resend API key** → see `.env.example`.
      Formspree is the 5-minute route. Without it the form returns an honest
      "not connected yet" error instead of silently eating enquiries.
- [ ] **Calendly URL** → `NEXT_PUBLIC_CALENDLY_URL`. Until set, the
      "Schedule a 30-minute call" button does not render at all.
- [ ] **Hard numbers for the work.** This is the highest-value content edit left.
      Intellectsoft sells with "40% sales cycle reduction", "20% performance
      improvement". Yours has no numbers at all. Anything real — query times,
      page load, release frequency, users served, migration volume — stated
      without naming the client.
- [ ] **A testimonial.** Three reference sites (thoughtbot, Arkency,
      Intellectsoft) all lead with named, titled quotes. You have zero social
      proof of any kind. Even one ex-colleague or client quote closes the biggest
      remaining credibility gap.
- [ ] **A photo and a name.** Small-shop buyers are assessing *a person*.
      Clearleft and Vega IT both publish a named human's direct email. You're
      currently an anonymous `hello@`.

---

## To build

- [ ] Recover the stack keywords lost with the Capabilities section — put
      TypeScript / React / Angular / Node / Next.js / .NET / PostgreSQL / AWS /
      Docker into JSON-LD `knowsAbout` and the meta description instead, so the
      filtering value survives without the on-page list

- [ ] Wire the form provider once credentials exist (config only, no code change)
- [ ] Add Calendly URL (config only)
- [ ] Testimonial component — once there's a quote to put in it (anonymised
      by role and sector if the client can't be named)
- [ ] `/privacy` page, linked from the form consent line
- [ ] Founder block near contact — photo, name, direct email
- [ ] `favicon` / OG share image (currently the Next.js default favicon)
- [ ] Deploy to Vercel + point devtom.co DNS
- [ ] Serbian version — worth having, not worth delaying launch for

---

## Pre-launch checklist

- [ ] Form submits and the email actually arrives in a real inbox (not a mock)
- [ ] Calendly popup opens and books a real slot
- [ ] `hello@devtom.co` receives mail
- [ ] OG card renders correctly when the URL is pasted into LinkedIn/Slack
- [ ] Check on a real phone, not just an emulated viewport
- [ ] Confirm every claim on the page is one you can defend in a sales call

---

## Hero alternatives

Current: **"AI-First Software Engineering for Your Business Growth"**

Modelled on Intellectsoft's register — deliberately *not* their line verbatim,
since duplicating a competitor's headline is bad positioning and bad SEO.

Alternatives kept on file:

1. *"Most software mistakes can be undone. / We work on the systems where they
   can't."* — Thoughtworks-style negation. Sharper and more distinctive, but
   narrower: it sells the regulated-systems niche and quietly drops the agency
   overflow and general contract work.
2. *"Contract engineering for teams that need a defined piece of work done
   properly."* — the original. Descriptive rather than claim-shaped; every
   reference site leads with a claim.
3. *"Scoped contract work. Delivered, handed over, done."* — from your own draft
   notes. Punchy, but sells the process rather than the outcome.

**Trade-off worth naming:** the current headline leads with AI, which is the
crowded lane. Your genuinely defensible position is *irreversible systems* —
that's the thing a Make.com shop cannot say. Option 1 sells that. Option 1 also
converts worse for the agency-overflow segment, which is probably your fastest
first money. No obviously right answer; it's a bet on which segment you want.

---

## Decided

- **"Fifteen years" is accurate — keep it.** Confirmed 1 Sep. LinkedIn shows
  employment from Dec 2015, but there are freelance years preceding it that are
  not listed on the profile. No change needed in `Hero.tsx`, `Industries.tsx`
  or `WhyUs.tsx`. Noted here so the discrepancy is not re-raised: anyone
  comparing the site to the LinkedIn profile is missing the freelance period.
- **Never name clients.** Confirmed 1 Sep. No company name appears anywhere in
  `src/` — the site sells industry experience instead, with an explicit
  "client names withheld under confidentiality, happy to talk specifics under
  NDA" line. That last clause turns the anonymity into a signal rather than a
  gap, and pairs with the NDA checkbox on the form.
- **No autoresponder email.** Intellectsoft's "What's next" opens with an
  automated confirmation. Ours opens with "it lands in a real inbox" instead —
  true today, and a better differentiator than an autoresponder. If you'd rather
  have the automated email, it's a small addition to the API route.

## Claims we're not making

Deliberate omissions. Each was on a reference site and each would be false here:

- **No certification badges.** Intellectsoft shows AWS Partner, HIPAA Compliant,
  ISO 9001, ISO 27001, GDPR. Those are audited certifications you don't hold.
- **No "Fortune 500 enterprises rely on us."** You have one long-running
  engagement, not a Fortune 500 client roster.
- **No "top 1% talent."** Unfalsifiable puffery; on a one-person site it reads as
  a tell rather than a claim.
- **No invented metrics.** The case-study numbers stay absent until you supply
  real ones.
- **No stock AI hero imagery.** At your scale it reads as filler. The animated
  grid costs nothing and invites no comparison.

---

## Reference sites

| Site | What to take |
|---|---|
| [Intellectsoft](https://www.intellectsoft.net/) | The proof stack: logos, testimonials with ratings, quantified outcomes, process, NDA option on the form |
| [Thoughtworks](https://www.thoughtworks.com/) | Two-line negation headline, accent colour on the turn |
| [Arkency](https://arkency.com/) | Closest positioning twin — leads with rescuing legacy codebases |
| [thoughtbot](https://thoughtbot.com/) | Named clients everywhere; "when the stakes are high, experience matters" |
| [Clearleft](https://clearleft.com/) | Minimal small-studio model; named human's direct email as CTA |
| [Vega IT](https://www.vegaitglobal.com/) | Your Novi Sad neighbour — study to *avoid*; you can't win on scale |

Caution: **execom.eu** appears to have been repurposed into gambling-review
content. A reminder to hold your domain registration.
