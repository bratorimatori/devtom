import Reveal from "./Reveal";
import Section from "./Section";

const audiences = [
  {
    title: "Software agencies",
    body: "Agencies requiring additional delivery capacity, or expertise in a stack their current team does not cover.",
  },
  {
    title: "Companies without in-house engineering",
    body: "Organisations operating a production application with no internal engineer responsible for maintaining it.",
  },
  {
    title: "Regulated and data-sensitive teams",
    body: "Teams delivering into environments where prior experience of the compliance constraints is a requirement rather than a preference.",
  },
];

export default function Audience() {
  return (
    <Section
      id="clients"
      label="Who we work with"
      title="The clients we work with most often."
    >
      <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
        {audiences.map((audience, i) => (
          <Reveal key={audience.title} delay={i * 90}>
            <div className="h-full bg-surface p-8 transition-colors duration-300 hover:bg-surface-2">
              <h3 className="text-lg font-medium tracking-tight text-accent">
                {audience.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{audience.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
