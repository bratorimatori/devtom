export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs tracking-[0.14em] uppercase">
          DevTom d.o.o. &middot; Novi Sad, Serbia
        </p>
        <div className="flex items-center gap-6">
          <p>Working with clients across the EU and US</p>
          <a
            href="/privacy"
            className="link-underline transition-colors hover:text-accent"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
