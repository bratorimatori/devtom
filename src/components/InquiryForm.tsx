"use client";

import { useState, type FormEvent } from "react";

const budgets = [
  "Not sure yet",
  "Under €10k",
  "€10k – €25k",
  "€25k – €60k",
  "€60k+",
  "Monthly retainer",
];

const field =
  "w-full rounded-md border border-line bg-background px-4 py-3 text-sm text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none";

export default function InquiryForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, nda: data.nda === "on" }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Something went wrong.");
      setState("sent");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-lg border border-line bg-surface p-8">
        <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
          Received
        </p>
        <h3 className="mt-4 text-xl font-medium tracking-tight">
          Enquiry received.
        </h3>
        <p className="mt-3 leading-relaxed text-muted">
          Your enquiry has been sent directly to the engineer who would carry
          out the work. You can expect a response within one business day,
          preceded by an NDA if you requested one.
        </p>
        <p className="mt-4 text-sm text-muted">
          For urgent matters, contact{" "}
          <a href="mailto:hello@devtom.co" className="text-accent underline underline-offset-4">
            hello@devtom.co
          </a>{" "}
          directly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-line bg-surface p-8"
      noValidate
    >
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Name *</span>
          <input name="name" required className={field} placeholder="Jane Doe" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Business email *</span>
          <input
            name="email"
            type="email"
            required
            className={field}
            placeholder="jane@company.com"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Company</span>
          <input name="company" className={field} placeholder="Company Ltd" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Budget</span>
          <select name="budget" className={field} defaultValue={budgets[0]}>
            {budgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm text-muted">
          Project description *
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className={`${field} resize-y`}
          placeholder="The system involved, the constraints you are working under, and your required timeline."
        />
      </label>

      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          name="nda"
          className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
        />
        <span>
          Request a mutual NDA. One will be issued before any sensitive
          material is exchanged.
        </span>
      </label>

      {error ? (
        <p role="alert" className="mt-5 text-sm text-accent-soft">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-all hover:gap-3 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Submit enquiry"}
        {state === "sending" ? null : <span aria-hidden="true">&rarr;</span>}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-faint">
        By submitting this form you consent to your message being stored and
        used to respond to your enquiry. It will not be added to a mailing list
        or shared with third parties.
      </p>
    </form>
  );
}
