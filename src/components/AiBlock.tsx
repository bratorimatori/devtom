import Reveal from "./Reveal";
import Section from "./Section";

const points = [
  "Agent workflows with explicit human approval gates",
  "Retrieval over private or regulated data",
  "Evaluation — establishing whether output is correct rather than merely plausible",
  "Integration into existing systems rather than replacing them",
];

export default function AiBlock() {
  return (
    <Section
      id="ai"
      label="Specialty"
      title="AI in systems where actions cannot be reversed."
      className="relative"
    >
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div className="space-y-6 text-lg leading-relaxed text-muted">
          <Reveal delay={80}>
            <p>
              Most AI automation operates in contexts where an incorrect
              output is an inconvenience: an inaccurate CRM field, a poorly
              worded email. Other systems do not permit that tolerance. Where an
              agent can write to a clinical record, initiate a payment or amend
              a compliance log, the governing question is no longer{" "}
              <span className="text-foreground">
                what the system is capable of
              </span>
              , but{" "}
              <span className="text-foreground">
                what it is permitted to do without human authorisation
              </span>
              .
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p>
              That is the work we undertake: AI and agent workflows in systems
              where actions are irreversible and every change must remain
              attributable.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-base text-faint">
              We build on provider APIs and, where compliance requires
              self-hosted models, deploy into your own cloud environment under
              your existing controls.
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
            {points.map((point, i) => (
              <li
                key={point}
                className="group flex gap-5 p-6 transition-colors duration-300 hover:bg-surface-2"
              >
                <span className="font-mono text-xs text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed text-muted transition-colors group-hover:text-foreground">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
