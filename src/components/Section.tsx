import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = {
  id: string;
  label: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Shared section chrome: a mono index label, an optional display heading,
 * and a hairline rule that ties the page together vertically.
 */
export default function Section({
  id,
  label,
  title,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`border-t border-line px-6 py-20 sm:px-10 md:py-28 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-faint uppercase">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {label}
          </p>
        </Reveal>

        {title ? (
          <Reveal delay={60}>
            <h2 className="mt-6 max-w-3xl text-3xl leading-[1.15] font-medium tracking-tight text-balance sm:text-4xl md:text-[2.75rem]">
              {title}
            </h2>
          </Reveal>
        ) : null}

        {children}
      </div>
    </section>
  );
}
