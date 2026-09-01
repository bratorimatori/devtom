import InquiryForm from "./InquiryForm";
import Reveal from "./Reveal";
import ScheduleCall from "./ScheduleCall";
import WhatsNext from "./WhatsNext";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line px-6 py-24 sm:px-10 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-18rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-faint uppercase">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Contact
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-6 max-w-3xl text-3xl leading-[1.15] font-medium tracking-tight text-balance sm:text-4xl md:text-[2.75rem]">
            Tell us about your project.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">
            An initial call to establish your requirement and whether the
            engagement is a fit. No charge and no obligation.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal delay={160}>
            <InquiryForm />
          </Reveal>

          <div>
            <Reveal delay={220}>
              <WhatsNext />
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-10 border-t border-line pt-8">
                <p className="text-sm text-faint">Alternatively</p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <ScheduleCall />
                  <a
                    href="mailto:hello@devtom.co"
                    className="link-underline text-lg font-medium tracking-tight transition-colors hover:text-accent"
                  >
                    hello@devtom.co
                  </a>
                </div>
                <p className="mt-6 text-sm text-muted">
                  Novi Sad, Serbia · Clients across the EU and US
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
