const links = [
  { href: "#industries", label: "Industries" },
  { href: "#why", label: "Why us" },
  { href: "#services", label: "Services" },
  { href: "#ai", label: "AI" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
        <a
          href="#top"
          className="font-mono text-sm tracking-[0.2em] uppercase transition-colors hover:text-accent"
        >
          Dev<span className="text-accent">Tom</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link-underline text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="rounded-full border border-line-bright px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
