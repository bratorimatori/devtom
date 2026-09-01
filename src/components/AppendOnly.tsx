"use client";

import { useEffect, useRef } from "react";

/**
 * "Append-Only" — the hero's signature piece. See design/APPEND-ONLY.md.
 *
 * A ruled ledger field onto which entries are appended one at a time. The
 * canvas is cleared exactly once, at initialisation; from then on every mark
 * is permanent. A completed entry may be *corrected*, which appends a second
 * stroke beside it and reduces the original's weight without removing it.
 *
 * Written against the 2D context rather than p5.js: the algorithm is ~120
 * lines and a marketing hero should not ship a megabyte of library to draw it.
 */

/** Deterministic PRNG — same seed, same document, every time. */
function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Entry = {
  row: number;
  x0: number;
  x1: number;
  weight: number;
  /** 0 → 1 as the stroke is written. */
  progress: number;
  speed: number;
  corrected: boolean;
  /** Set once the correction has been appended, so it happens only once. */
  annotated: boolean;
};

const SEED = 20260901;
const ROW_HEIGHT = 22;

/* Colours are pre-blended against the white ground and painted at full alpha.
   Translucent strokes drawn a segment per frame stack at their seams and read
   as dotted; flat colour keeps a written line looking written. */
const RULE = "#f0f1f3";
const INK_STRONG = "#6b7684";
const INK_LIGHT = "#9aa4b0";
const INK_SUPERSEDED = "#d7dbe0";
const SIGNAL = "#1b4df0";
const SIGNAL_TIE = "#bbcafa";

export default function AppendOnly() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let width = 0;
    let height = 0;
    let rows = 0;
    let entries: Entry[] = [];
    let queue: Entry[] = [];
    let active: Entry | null = null;

    const random = mulberry32(SEED);

    function buildDocument() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // The one and only clear. Everything after this is append-only.
      ctx!.clearRect(0, 0, width, height);

      rows = Math.max(6, Math.floor(height / ROW_HEIGHT) - 2);
      entries = [];

      // Rule the field: a faint baseline grid, like ledger stock.
      ctx!.strokeStyle = RULE;
      ctx!.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        const y = Math.round((r + 1.5) * ROW_HEIGHT) + 0.5;
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(width, y);
        ctx!.stroke();
      }

      // Compose the document up front so it is fully determined by the seed.
      const count = Math.floor(rows * 1.5);
      for (let i = 0; i < count; i++) {
        const row = Math.floor(random() * rows);
        const x0 = random() * width * 0.45;
        const span = width * (0.18 + random() * 0.5);
        entries.push({
          row,
          x0,
          x1: Math.min(width - 8, x0 + span),
          weight: random() < 0.22 ? 2.5 : 1.5,
          progress: 0,
          speed: 0.014 + random() * 0.02,
          corrected: random() < 0.18,
          annotated: false,
        });
      }
      queue = [...entries];
      active = queue.shift() ?? null;
    }

    function rowY(row: number) {
      return Math.round((row + 1.5) * ROW_HEIGHT) + 0.5;
    }

    /** Draw only the newly written slice, never the whole stroke again. */
    function drawSegment(entry: Entry, from: number, to: number) {
      const y = rowY(entry.row);
      const span = entry.x1 - entry.x0;
      // Overlap the previous slice slightly so no seam is left behind.
      const ax = entry.x0 + span * from - (from > 0 ? 0.75 : 0);
      const bx = entry.x0 + span * to;
      ctx!.strokeStyle = entry.weight > 2 ? INK_STRONG : INK_LIGHT;
      ctx!.lineWidth = entry.weight;
      ctx!.lineCap = "butt";
      ctx!.beginPath();
      ctx!.moveTo(ax, y);
      ctx!.lineTo(bx, y);
      ctx!.stroke();
    }

    /**
     * The central gesture: annotate rather than overwrite. The original is
     * dimmed by laying paper-coloured ink over it — it loses weight but its
     * extent stays readable — and the correction is appended below-right.
     */
    function annotate(entry: Entry) {
      const y = rowY(entry.row);
      // The original is reduced in weight, never removed: it stays legible.
      ctx!.strokeStyle = INK_SUPERSEDED;
      ctx!.lineWidth = entry.weight;
      ctx!.lineCap = "butt";
      ctx!.beginPath();
      ctx!.moveTo(entry.x0, y);
      ctx!.lineTo(entry.x1, y);
      ctx!.stroke();

      const y2 = y + ROW_HEIGHT * 0.5;
      const cx0 = entry.x1 - (entry.x1 - entry.x0) * 0.32;
      const cx1 = Math.min(width - 8, entry.x1 + 26);

      ctx!.strokeStyle = SIGNAL_TIE;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(entry.x1, y);
      ctx!.lineTo(entry.x1, y2);
      ctx!.stroke();

      ctx!.strokeStyle = SIGNAL;
      ctx!.lineWidth = entry.weight;
      ctx!.beginPath();
      ctx!.moveTo(cx0, y2);
      ctx!.lineTo(cx1, y2);
      ctx!.stroke();
    }

    function step() {
      // Two entries per frame keeps the write legible without dragging.
      for (let i = 0; i < 2 && active; i++) {
        const previous = active.progress;
        active.progress = Math.min(1, active.progress + active.speed);
        drawSegment(active, previous, active.progress);

        if (active.progress >= 1) {
          if (active.corrected && !active.annotated) {
            active.annotated = true;
            annotate(active);
          }
          active = queue.shift() ?? null;
        }
      }
      if (active) frame = requestAnimationFrame(step);
    }

    function renderFinalState() {
      for (const entry of entries) {
        drawSegment(entry, 0, 1);
        if (entry.corrected) annotate(entry);
      }
    }

    buildDocument();
    if (reduced) {
      renderFinalState();
    } else {
      // Only begin writing once the piece is actually on screen.
      const observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            frame = requestAnimationFrame(step);
            observer.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(canvas);
    }

    // Resizing starts a new document rather than stretching the old one.
    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(frame);
        buildDocument();
        if (reduced) renderFinalState();
        else frame = requestAnimationFrame(step);
      }, 200);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <figure className="m-0">
      <div className="relative overflow-hidden rounded-lg border border-line bg-background">
        <canvas
          ref={canvasRef}
          className="block h-[380px] w-full lg:h-[460px]"
          role="img"
          aria-label="Append-only: a generative field of ledger entries in which corrections are appended alongside the originals rather than replacing them."
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
        <span>Append-only · seeded generative field</span>
        <span className="text-accent">corrections, not overwrites</span>
      </figcaption>
    </figure>
  );
}
