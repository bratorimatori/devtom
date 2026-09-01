import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  message?: string;
  nda?: boolean;
  /** Honeypot: real people never fill this in. */
  website?: string;
};

const INBOX = process.env.INQUIRY_TO ?? "hello@devtom.co";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Silently accept bot submissions so they don't retry with a real-looking one.
  if (body.website) return NextResponse.json({ ok: true });

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const budget = body.budget?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and a description are all required." },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "That description is too long — 5000 characters max." },
      { status: 400 },
    );
  }

  const text = [
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Company:  ${company || "—"}`,
    `Budget:   ${budget || "—"}`,
    `NDA:      ${body.nda ? "requested" : "no"}`,
    "",
    message,
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const formspree = process.env.FORMSPREE_ENDPOINT;

  try {
    if (resendKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.INQUIRY_FROM ?? "DevTom site <onboarding@resend.dev>",
          to: [INBOX],
          reply_to: email,
          subject: `New enquiry — ${name}${company ? ` (${company})` : ""}`,
          text,
        }),
      });
      if (!response.ok) throw new Error(await response.text());
      return NextResponse.json({ ok: true });
    }

    if (formspree) {
      const response = await fetch(formspree, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, company, budget, nda: body.nda, message }),
      });
      if (!response.ok) throw new Error(await response.text());
      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error("Inquiry delivery failed:", error);
    return NextResponse.json(
      { error: "Couldn't send that. Please email hello@devtom.co directly." },
      { status: 502 },
    );
  }

  // No provider configured — say so plainly rather than pretending it sent.
  console.error(
    "Inquiry received but no delivery provider is configured. " +
      "Set RESEND_API_KEY or FORMSPREE_ENDPOINT. Payload:\n" + text,
  );
  return NextResponse.json(
    { error: "The contact form isn't connected yet. Please email hello@devtom.co." },
    { status: 503 },
  );
}
