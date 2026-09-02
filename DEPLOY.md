# Deploying devtom.co

Vercel for hosting, GoDaddy for DNS. Roughly 20 minutes of work plus DNS
propagation.

---

## Before you start

Have these two values ready. Neither can be added later without a rebuild:

| Variable | Where it comes from |
|---|---|
| `FORMSPREE_ENDPOINT` *or* `RESEND_API_KEY` | formspree.io or resend.com |
| `NEXT_PUBLIC_CALENDLY_URL` | your Calendly event link |

`NEXT_PUBLIC_` variables are **inlined at build time**. Setting one after
deploying does nothing until you redeploy. This catches people out.

---

## 1 · Import the project

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Grant access to `bratorimatori/devtom` and click **Import**.
3. Leave every build setting alone. Vercel detects Next.js, and the defaults
   are correct: build `next build`, output `.next`, install `npm install`.
4. **Before clicking Deploy**, open **Environment Variables** and add:

   ```
   FORMSPREE_ENDPOINT   https://formspree.io/f/xxxxxxxx
   INQUIRY_TO           hello@devtom.co
   NEXT_PUBLIC_CALENDLY_URL   https://calendly.com/your-handle/30min
   ```

   Apply them to **Production, Preview and Development**.
5. Click **Deploy**. First build takes about a minute.

You now have a live `devtom-xxxx.vercel.app` URL. **Test the form and the
Calendly button on it before touching DNS** — it is much easier to debug
before a domain is in the mix.

---

## 2 · Add the domain in Vercel

1. Project → **Settings** → **Domains** → **Add Domain**.
2. Enter `devtom.co`. Accept the prompt to also add `www.devtom.co`.
3. Vercel shows a **domain card** with the exact DNS values for your project.

> **Copy the values from that card.** Do not use an IP from a tutorial. The
> apex A record used to always be `76.76.21.21`, but newer projects draw from a
> pool of anycast addresses (for example `216.198.79.1`), and the `www` CNAME
> target is now unique per project — something like
> `d1d4fc829fe7bc7c.vercel-dns-017.com`, not the old generic
> `cname.vercel-dns.com`. Using a stale value fails silently: the domain simply
> never verifies.

---

## 3 · GoDaddy DNS

**Use the A + CNAME method, not Vercel nameservers.** You receive mail at
`hello@devtom.co`, and switching nameservers moves *all* DNS to Vercel —
including MX records. Your email stops working the moment it propagates unless
you manually recreate every mail record first. The A record method leaves mail
untouched.

### Steps

1. GoDaddy → **My Products** → find `devtom.co` → **DNS** → **Manage Zones**
   (sometimes labelled **Manage DNS**).
2. **Delete GoDaddy's parking records first.** A fresh domain ships with:
   - an `A` record on `@` pointing at a GoDaddy parking IP
   - a `CNAME` on `www` pointing to `@`

   Both must go, or they will conflict. Leave MX, TXT and any mail-related
   `CNAME` (such as `email` or `autodiscover`) exactly as they are.
3. Add the apex record:

   | Type | Name | Value | TTL |
   |---|---|---|---|
   | A | `@` | *the IP from your Vercel domain card* | 600 seconds |

4. Add the www record:

   | Type | Name | Value | TTL |
   |---|---|---|---|
   | CNAME | `www` | *the CNAME target from your Vercel domain card* | 600 seconds |

5. Save. GoDaddy defaults TTL to 1 hour; dropping it to 600 seconds makes
   mistakes cheaper to fix while you are still setting up.

### GoDaddy specifics worth knowing

- GoDaddy does **not** support `ALIAS` or `ANAME` records, which is why the apex
  needs a plain `A` record rather than a CNAME.
- If GoDaddy offers to "connect" the domain automatically via Domain Connect,
  decline it and add the records by hand. It creates extra records that are
  awkward to unpick later.
- Ignore GoDaddy's upsells for "Website Builder" or a "Domain Ownership
  Protection" plan. Neither is needed here.

---

## 4 · Verify

Propagation is usually minutes, occasionally a few hours.

```bash
dig +short devtom.co            # should return the Vercel IP
dig +short www.devtom.co        # should return the Vercel CNAME target
curl -sI https://devtom.co | head -1     # expect HTTP/2 200
```

In Vercel, both domains should show **Valid Configuration**. SSL is issued
automatically via Let's Encrypt once DNS resolves — no action needed.

---

## 5 · After the domain is live

- [ ] Submit an enquiry through the real form and confirm it arrives.
- [ ] Book a slot through the Calendly button.
- [ ] Paste `https://devtom.co` into LinkedIn or Slack and confirm the share
      card renders with the ledger artwork.
- [ ] Run the URL through
      [Google Rich Results Test](https://search.google.com/test/rich-results)
      to confirm the `ProfessionalService` schema parses.
- [ ] Add the property in
      [Google Search Console](https://search.google.com/search-console) and
      submit `https://devtom.co/sitemap.xml`.
- [ ] Open it on a real phone, not an emulated viewport.

---

## Troubleshooting

**Domain stuck on "Invalid Configuration".** Almost always a leftover GoDaddy
parking record, or an A record value copied from a tutorial rather than from
your own domain card. Check `dig +short devtom.co` against what the card says.

**SSL certificate never issues.** A `CAA` record on the domain that does not
permit Let's Encrypt will block it silently. Check with
`dig +short devtom.co CAA` — if anything is returned that does not include
`letsencrypt.org`, either remove it or add an entry permitting them.

**Form returns 503 in production.** No delivery provider is configured. The
environment variable is missing from the Production environment specifically,
or was added after the last build. Add it, then **redeploy**.

**Calendly button missing in production.** `NEXT_PUBLIC_CALENDLY_URL` was added
after the build. Redeploy — it is compiled into the bundle, not read at runtime.

**Email stops working.** You changed nameservers to Vercel. Change them back to
GoDaddy's defaults, or recreate every MX record in Vercel's DNS.
