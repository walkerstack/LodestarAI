/**
 * OopsSloth — Floating honesty widget
 * A small sloth icon in the bottom-left corner. Click to reveal
 * an honest message from the Builder about small imperfections
 * noticed across the site. Not broken. Not dangerous. Just noticed.
 */

import { useState, useEffect } from "react";

const OOPS_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/oops-sloth-dpBa4VaDRVEQQogvEc76jm.webp";

export default function OopsSloth() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  /* Fade in after a short delay so it doesn't compete with page load */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Floating sloth button */}
      <button
        aria-label="The Builder noticed something"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 left-5 z-50 transition-all duration-700 hover:scale-110 focus:outline-none"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <img
          src={OOPS_IMG}
          alt="Oops sloth"
          className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
          style={{
            boxShadow: "0 2px 16px rgba(0,0,0,0.35)",
            border: "2px solid rgba(217,119,6,0.4)",
          }}
        />
      </button>

      {/* Message overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-start p-5"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Card */}
          <div
            className="relative max-w-sm w-full rounded-2xl p-6 animate-in slide-in-from-bottom-4 duration-300"
            style={{
              background: "#1A1A2E",
              border: "1px solid rgba(217,119,6,0.25)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-[#666] hover:text-[#FAF6EF] transition-colors text-lg leading-none"
              aria-label="Close"
            >
              ×
            </button>

            <div className="flex gap-4 items-start">
              <img
                src={OOPS_IMG}
                alt="Oops sloth"
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                style={{ border: "1px solid rgba(217,119,6,0.2)" }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1"
                  style={{ color: "#D97706", fontFamily: "'DM Sans', sans-serif" }}
                >
                  From the Builder
                </p>
                <h3
                  className="text-base font-bold text-[#FAF6EF] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Small things. Noticed.
                </h3>
              </div>
            </div>

            <div
              className="mt-4 space-y-3 text-sm leading-relaxed"
              style={{ color: "#b0a898", fontFamily: "'DM Sans', sans-serif" }}
            >
              <p>
                There are small mistakes on this site. A framework count that's off by one. A date that shifted. A label that doesn't quite match what it links to.
              </p>
              <p>
                I see them. The Watcher in me catches them while the Builder in me is already three pages ahead. They're not broken. They're not dangerous. They're just... not perfect yet.
              </p>
              <p style={{ color: "#FAF6EF", fontFamily: "'Playfair Display', serif" }}>
                Fixing comes in waves, not panic.
              </p>
              <p className="text-xs" style={{ color: "#666" }}>
                If you spot something, that means you're paying attention. That's the whole point.
              </p>
            </div>

            <div
              className="mt-4 pt-3 text-xs"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "#555" }}
            >
              Honesty is not a feature. It's the foundation.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
