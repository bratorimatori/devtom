import AppendOnly from "./AppendOnly";
import ScheduleCall from "./ScheduleCall";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 sm:px-10">
      {/* Drifting grid, faded at the edges so it never fights the copy.
          Deliberately not stock AI imagery — cheaper and harder to fake. */}
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]"
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-6xl items-center gap-16 py-24 md:py-28 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
        <p
          className="rise font-mono text-xs tracking-[0.18em] text-faint uppercase"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          Novi Sad, Serbia · Contract software engineering
        </p>

        {/* Benefit-shaped headline in the Intellectsoft register: category
            claim first, outcome second. */}
        <h1
          className="rise mt-8 max-w-4xl text-4xl leading-[1.08] font-medium tracking-tight text-balance sm:text-5xl md:text-6xl"
          style={{ "--rise-delay": "90ms" } as React.CSSProperties}
        >
          <span className="text-accent">AI-First</span> Software Engineering for
          Your Business Growth
        </h1>

        <p
          className="rise mt-8 max-w-2xl text-lg leading-relaxed text-muted"
          style={{ "--rise-delay": "200ms" } as React.CSSProperties}
        >
          Healthcare, e-commerce and SaaS teams rely on fifteen years of
          production engineering to design, build and scale software that holds
          up under audit.
        </p>

        <p
          className="rise mt-5 max-w-2xl text-lg leading-relaxed text-muted"
          style={{ "--rise-delay": "260ms" } as React.CSSProperties}
        >
          DevTom delivers scoped engineering engagements in regulated and
          transaction-critical environments &mdash; clinical records, financial
          transactions and regulatory audit trails. Terms are fixed in advance,
          and every engagement concludes with full technical documentation and a
          formal handover.
        </p>

        <div
          className="rise mt-12 flex flex-wrap items-center gap-4"
          style={{ "--rise-delay": "420ms" } as React.CSSProperties}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-all hover:gap-3 hover:bg-accent-soft"
          >
            Discuss your project
            <span aria-hidden="true">&rarr;</span>
          </a>
          <ScheduleCall />
          <a
            href="#industries"
            className="link-underline text-sm text-muted transition-colors hover:text-foreground"
          >
            View industry experience
          </a>
        </div>
        </div>

        <div
          className="rise"
          style={{ "--rise-delay": "520ms" } as React.CSSProperties}
        >
          <AppendOnly />
        </div>
      </div>

      {/* Scroll cue, borrowed from the Thoughtworks hero. */}
      <a
        href="#services"
        aria-label="Skip to what we do"
        className="absolute bottom-8 left-6 hidden text-faint transition-colors hover:text-accent sm:left-10 md:block"
      >
        <svg
          className="chevron h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M4 8l8 8 8-8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
