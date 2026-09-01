import { ImageResponse } from "next/og";

export const alt =
  "DevTom — AI-first software engineering for regulated and transaction-critical systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Ledger rows echoing the Append-Only hero: widths, weights, and which
 *  entries carry a correction. Fixed rather than random so the card is stable. */
const rows = [
  { w: 62, strong: false, corrected: false },
  { w: 38, strong: true, corrected: false },
  { w: 74, strong: false, corrected: true },
  { w: 46, strong: false, corrected: false },
  { w: 85, strong: true, corrected: false },
  { w: 30, strong: false, corrected: true },
  { w: 58, strong: false, corrected: false },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              color: "#6b7684",
            }}
          >
            DEVTOM · NOVI SAD, SERBIA
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontSize: 68,
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: -2,
              color: "#0d1b2a",
              maxWidth: 900,
            }}
          >
            AI-First Software Engineering for Your Business Growth
          </div>
        </div>

        {/* The append-only field, flattened into its finished state. */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {rows.map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: `${row.w}%`,
                  height: row.strong ? 5 : 3,
                  background: row.corrected ? "#d7dbe0" : "#6b7684",
                  borderRadius: 2,
                }}
              />
              {row.corrected ? (
                <div
                  style={{
                    width: "18%",
                    height: 5,
                    background: "#1b4df0",
                    borderRadius: 2,
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#6b7684",
          }}
        >
          <div style={{ display: "flex" }}>devtom.co</div>
          <div style={{ display: "flex", color: "#1b4df0" }}>
            corrections, not overwrites
          </div>
        </div>
      </div>
    ),
    size,
  );
}
