# devtom.co — actions

Live at **https://devtom.co** since 4 September 2026. Form and Calendly both
verified working. Everything below is something to do, in the order worth
doing it.

Run locally: `npm run dev` → http://localhost:4311

---

## Now

- [ ] **Add `www.devtom.co` in Vercel.** Settings → Domains → Add Domain.
      The certificate currently covers `devtom.co` only, so anyone typing
      `www.` gets a browser security warning instead of the site. DNS is
      already correct — the CNAME at GoDaddy needs no change. ~2 min.

- [ ] **Set up mail for `hello@devtom.co`.** The address appears in four
      places on the site — contact section, form success state, privacy policy,
      mailto fallback — and currently bounces. `dig devtom.co MX` returns
      nothing. Use Zoho Mail's free tier: real mailbox, sends *and* receives,
      needs MX records at GoDaddy. Avoid forwarding-only services; without SMTP
      you would reply from a Gmail address to someone who wrote to
      `hello@devtom.co`. ~30 min.

- [ ] **Fix the Calendly link.** `NEXT_PUBLIC_CALENDLY_URL` is the profile URL,
      so bookers land on a page listing one event and must click it. Change to
      `https://calendly.com/devtom-co/30min` and redeploy. Batch with the next
      deploy rather than rebuilding for it alone.

- [ ] **Rewrite the Calendly page blurb.** It still reads *"Welcome to my
      scheduling page. Please follow the instructions to add an event to my
      calendar."* — Calendly's default, and the last thing a prospect reads
      before booking. Match the site: *"A 30-minute call to work out what you
      need and whether it's a fit. No charge, no pitch."*

---

## This week

- [ ] **Get one testimonial.** The largest remaining credibility gap. Every
      reference site — thoughtbot, Arkency, Intellectsoft — leads with named,
      titled quotes; this site has no social proof of any kind. Anonymise by
      role and sector if the client cannot be named ("CTO, US healthcare SaaS").

- [ ] **Put hard numbers in the industry copy.** `Industries.tsx` currently
      says things like "performance work on the data layer". Intellectsoft sells
      with "40% sales cycle reduction". Query times, page load, release
      frequency, users served, migration volume — stated without naming anyone.

- [ ] **Add a founder block near the contact section.** Name, photo, direct
      email. Small-shop buyers are assessing a person; the site is currently an
      anonymous `hello@`. Clearleft and Vega IT both publish a named human.

- [ ] **Submit the sitemap.** Google Search Console → add `devtom.co` → submit
      `https://devtom.co/sitemap.xml`.

- [ ] **Run the Rich Results Test** on `https://devtom.co` to confirm the
      `ProfessionalService` schema parses in production.

- [ ] **Paste the URL into LinkedIn** and confirm the share card renders the
      ledger artwork.

- [ ] **Open the site on a real phone**, not an emulated viewport.

- [ ] **Read `/privacy` once** and confirm the retention periods match what you
      intend — 12 months for dead enquiries, contract term plus accounting law
      for live ones. Sensible defaults, not legal advice.

---

## Later

- [ ] **Serbian version.** Worth having; was never worth delaying launch for.
- [ ] **Write the agent-gates post** and link it from the AI section, replacing
      the CTA that was removed when there was nothing to point at.
- [ ] **Replace the Formspree free tier** if enquiries exceed 50/month.

---

## Decided — do not reopen

- **"Fifteen years" is accurate.** Freelance years precede the Dec 2015
  employment history on LinkedIn. Appears in `Hero.tsx`, `Industries.tsx`,
  `WhyUs.tsx`. Anyone comparing the site to the profile is missing that period.
- **Never name clients.** No company name appears anywhere in `src/`. The site
  sells industry experience, with "client names withheld under confidentiality,
  happy to talk specifics under NDA" — which turns the anonymity into a signal
  and sets up the NDA checkbox on the form.
- **Keep the server-side Formspree integration.** Formspree's own quickstart
  proposes a client-side React SDK; adopting it would drop the honeypot, the
  server-side validation, and the ability to switch to Resend by changing one
  variable.
- **No autoresponder.** "What happens next" opens with *it lands in a real
  inbox* rather than an automated confirmation — true, and a better line for a
  small shop.
- **Hero headline is "AI-First Software Engineering for Your Business Growth".**
  Alternative on file if the AI framing ever feels too crowded a lane:
  *"Most software mistakes can be undone. / We work on the systems where they
  can't."* — sharper and more distinctive, but sells only the regulated-systems
  niche and drops the agency-overflow segment.

---

## Never — claims we do not make

Each was on a reference site and each would be false here.

- **No certification badges.** AWS Partner, HIPAA Compliant, ISO 9001/27001 are
  audited certifications DevTom does not hold. *Experience in* HIPAA-regulated
  environments is real and sellable; the badge is not.
- **No "Fortune 500 clients."**
- **No "top 1% talent."**
- **No invented metrics.** Case-study numbers stay absent until real ones exist.
- **No stock AI hero imagery.** The generative piece costs nothing and invites
  no comparison.

---

## Reference

| Site | What to take |
|---|---|
| [Intellectsoft](https://www.intellectsoft.net/) | Proof stack: logos, rated testimonials, quantified outcomes, NDA option |
| [Thoughtworks](https://www.thoughtworks.com/) | Two-line negation headline, accent on the turn |
| [Arkency](https://arkency.com/) | Closest positioning twin — leads with rescuing legacy codebases |
| [thoughtbot](https://thoughtbot.com/) | Named clients everywhere |
| [Clearleft](https://clearleft.com/) | Minimal small-studio model; named human's direct email as CTA |
| [Vega IT](https://www.vegaitglobal.com/) | Novi Sad neighbour — study to avoid; you cannot win on scale |

Deployment steps and troubleshooting: [`DEPLOY.md`](DEPLOY.md).
