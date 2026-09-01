const steps = [
  {
    title: "Direct receipt",
    body: "Your enquiry goes directly to the engineer who would carry out the work, rather than to a routing queue or a business development team.",
  },
  {
    title: "Response within one business day",
    body: "A direct answer, a clarifying question, or a clear indication that the engagement is not a fit. We decline promptly rather than extending an enquiry unnecessarily.",
  },
  {
    title: "Mutual NDA on request",
    body: "Executed within one to two business days, before any sensitive material is exchanged. Select the option on the form and one will be issued first.",
  },
  {
    title: "Initial call, followed by a written scope",
    body: "Deliverables, exclusions, cost and delivery date, typically issued within one week of the call. Fixed price where requirements are well-defined.",
  },
];

export default function WhatsNext() {
  return (
    <div>
      <h3 className="font-mono text-xs tracking-[0.18em] text-faint uppercase">
        What happens next
      </h3>

      <ol className="mt-8">
        {steps.map((step, i) => (
          <li key={step.title} className="group relative flex gap-5 pb-8 last:pb-0">
            {/* Connector rail, stopped short on the final step. */}
            {i < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-8 bottom-0 left-[13px] w-px bg-line-bright"
              />
            ) : null}

            <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-bright bg-surface font-mono text-[11px] text-accent tabular-nums transition-colors group-hover:border-accent">
              {i + 1}
            </span>

            <div className="-mt-0.5">
              <p className="font-medium tracking-tight">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
