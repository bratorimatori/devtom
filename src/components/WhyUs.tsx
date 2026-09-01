import Reveal from "./Reveal";
import Section from "./Section";

const reasons = [
  {
    title: "Direct engagement with the engineer delivering the work",
    body: "No account management layer and no intermediary briefing. The person who scopes the engagement is the person who implements it.",
  },
  {
    title: "Fifteen years in systems where data loss is unacceptable",
    body: "Electronic health records, online retail and workforce management. Production systems carrying live users, financial transactions and formal audit requirements.",
  },
  {
    title: "Most engagements involve code we did not write",
    body: "Assuming ownership of an unfamiliar codebase is the standard case rather than the exception. We are accustomed to arriving without documentation and leaving it in place.",
  },
  {
    title: "Fixed scope, fixed price, fixed date",
    body: "Where requirements are well-defined, terms are fixed in advance. Where they are not, a day rate and a short discovery phase to establish them.",
  },
  {
    title: "Full ownership transfers on completion",
    body: "Code, documentation, infrastructure and a handover session. The engagement concludes and your team maintains the system independently.",
  },
];

export default function WhyUs() {
  return (
    <Section
      id="why"
      label="Why choose DevTom"
      title="Senior engineering, direct engagement, defined terms."
    >
      <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-2">
        {reasons.map((reason, i) => (
          <Reveal
            key={reason.title}
            delay={i * 70}
            className={i === 0 ? "lg:col-span-2" : undefined}
          >
            <article className="h-full bg-surface p-8 transition-colors duration-300 hover:bg-surface-2 md:p-10">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-medium tracking-tight">
                  {reason.title}
                </h3>
              </div>
              <p className="mt-4 leading-relaxed text-muted">{reason.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
