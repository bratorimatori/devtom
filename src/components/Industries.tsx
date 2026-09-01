import Reveal from "./Reveal";
import Section from "./Section";

/** Simple 24px stroke icons — no icon library, no extra bytes. */
const icons = {
  health: "M3 12h4l2-5 3 10 2.5-5H21",
  cart: "M3 4h2l2.5 11h10L20 7H6.5M9 20a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z",
  saas: "M6 18a4 4 0 010-8 6 6 0 0111.5-1.5A3.5 3.5 0 0118 18H6z",
  car: "M4 15h16M6 15V9.5L7.5 6h9L18 9.5V15M7.5 18a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z",
  clock: "M12 7v5l3 2M12 21a9 9 0 110-18 9 9 0 010 18z",
  tool: "M14.7 6.3a4 4 0 01-5 5L5 16v3h3l4.7-4.7a4 4 0 015-5l-2-2 2-2 2 2-2 2z",
};

const industries = [
  {
    name: "Healthcare",
    icon: icons.health,
    body: "Clinical documentation and electronic health record systems for United States practices. Live patient data, correction rather than deletion, and attribution that must remain valid across years of audit.",
  },
  {
    name: "E-commerce & online retail",
    icon: icons.cart,
    body: "High-traffic consumer platforms where the transaction path spans pricing, inventory and financing, and checkout failure translates directly into lost revenue.",
  },
  {
    name: "Enterprise SaaS",
    icon: icons.saas,
    body: "Multi-tenant products with dense, data-intensive interfaces. Reporting and analytics in which figures must reconcile precisely.",
  },
  {
    name: "Workforce & scheduling",
    icon: icons.clock,
    body: "Systems recording employee working time, where the recorded position and operational reality must not diverge.",
  },
  {
    name: "Automotive",
    icon: icons.car,
    body: "Web applications for retail and industry, from consumer-facing storefronts through to internal operational tooling.",
  },
  {
    name: "Internal tools & custom software",
    icon: icons.tool,
    body: "Operational systems a business depends on day to day, engineered to be maintained by whoever inherits them.",
  },
];

export default function Industries() {
  return (
    <Section
      id="industries"
      label="Industry experience"
      title="Sectors we have delivered production systems in."
    >
      <Reveal delay={60}>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted">
          Fifteen years of production engineering across regulated and
          transaction-critical environments, working within client teams on the
          systems their operations depend on.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, i) => (
          <Reveal key={industry.name} delay={i * 70}>
            <article className="h-full bg-surface p-8 transition-colors duration-300 hover:bg-surface-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-bright text-accent">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d={industry.icon} />
                </svg>
              </span>
              <h3 className="mt-5 text-lg font-medium tracking-tight">
                {industry.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {industry.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={480}>
        <p className="mt-8 text-sm text-faint">
          Client names are withheld under confidentiality. Specifics can be
          discussed under NDA.
        </p>
      </Reveal>
    </Section>
  );
}
