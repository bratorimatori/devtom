"use client";

import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (options: { url: string }) => void };
  }
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

/**
 * Opens the Calendly popup. The widget script is only pulled in once the
 * button is actually rendered, and the whole thing disappears if no
 * NEXT_PUBLIC_CALENDLY_URL is set rather than shipping a dead button.
 */
export default function ScheduleCall() {
  const [ready, setReady] = useState(false);

  if (!CALENDLY_URL) return null;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setReady(true)}
      />
      <button
        type="button"
        onClick={() => window.Calendly?.initPopupWidget({ url: CALENDLY_URL })}
        disabled={!ready}
        className="group inline-flex items-center gap-2 rounded-full border border-line-bright px-6 py-3 text-sm font-medium transition-all hover:border-accent hover:text-accent disabled:opacity-60"
      >
        Schedule a 30-minute call
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          &rarr;
        </span>
      </button>
    </>
  );
}
