import Reveal from "./Reveal";
import Section from "./Section";

const services = [
  {
    title: "Defined-scope development",
    body: "For teams with a specified requirement and insufficient engineering capacity. We scope the work, agree a price and a delivery date, and implement it, typically over four to twelve weeks. Delivery comprises working software, documentation and a formal handover.",
    tags: [
      "Feature development",
      "API and integration work",
      "Internal tools",
      "Front-end builds in React or Angular",
    ],
  },
  {
    title: "Assuming ownership of an existing system",
    body: "Where the original developer is no longer available and institutional knowledge has been lost. We audit the codebase, document its current state, resolve urgent defects, and restore it to a condition in which changes can be made safely.",
    tags: [
      "Codebase audit",
      "Documentation",
      "Dependency and security updates",
      "Stabilisation before new features",
    ],
  },
  {
    title: "Infrastructure and DevOps",
    body: "Deployment infrastructure that does not depend on a single machine or individual. We establish pipelines, environments, monitoring and backup procedures so that releases become routine and failures are identified internally before they reach customers.",
    tags: [
      "CI/CD pipelines",
      "Cloud infrastructure on AWS or Vercel",
      "Containerisation",
      "Monitoring and alerting",
    ],
  },
  {
    title: "Ongoing maintenance",
    body: "A fixed monthly allocation of hours for defect resolution, updates and minor changes. The application remains supported and a qualified engineer remains available.",
    tags: ["Monthly retainer", "Agreed response times", "No minimum term"],
  },
];

export default function Services() {
  return (
    <Section
      id="services"
      label="Services"
      title="Product software development services."
    >
      <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 80}>
            <article className="group h-full bg-surface p-8 transition-colors duration-300 hover:bg-surface-2 md:p-10">
              <span className="font-mono text-xs text-faint">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-xl font-medium tracking-tight transition-colors group-hover:text-accent">
                {service.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{service.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line-bright px-3 py-1 font-mono text-xs text-faint"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
