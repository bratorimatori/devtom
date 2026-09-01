import Reveal from "./Reveal";
import Section from "./Section";

const steps = [
  {
    title: "Initial call",
    body: "Your requirement, the constraints you are operating under, and whether the engagement is a fit. No charge.",
  },
  {
    title: "Written scope",
    body: "What will be built, what is excluded, the cost and the delivery date. Fixed price where requirements are well-defined; day rate where they are not yet established.",
  },
  {
    title: "Delivery",
    body: "Scheduled progress reviews with working software available for inspection throughout, rather than a single delivery at the end.",
  },
  {
    title: "Handover",
    body: "Documentation and a walkthrough session. Ownership of the code transfers to you and your team maintains it independently.",
  },
];

export default function Process() {
  return (
    <Section
      id="process"
      label="How it works"
      title="How an engagement proceeds."
    >
      <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal
            key={step.title}
            as="li"
            delay={i * 90}
            className="group relative border-t border-line-bright pt-6 transition-colors hover:border-accent"
          >
              {/* Dot rides the top rule and lights up on hover. */}
              <span
                aria-hidden="true"
                className="absolute -top-[3px] left-0 h-[5px] w-[5px] rounded-full bg-line-bright transition-colors group-hover:bg-accent"
              />
              <span className="font-mono text-xs text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
