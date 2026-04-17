/*
 * KidsMidLink — Circular buffalo sticker button for kids.
 * Fixed position: floats at the vertical midpoint of the viewport,
 * right side of the screen. Always visible as you scroll.
 * Same pulsing orange glow as the top button (KidsRedirect).
 * Click opens a contained popup with message + two choices:
 *   "Guide me" → /for/child
 *   "I'm chill" → closes popup, stays on page
 */

import { useState } from "react";
import { useLocation } from "wouter";

const STICKER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-mid-link-sticker-Nmh6s3hknwKR5FNbsvDCHx.webp";

export default function KidsMidLink() {
  const [open, setOpen] = useState(false);
  const [, navigate] = useLocation();

  return (
    <div
      className="fixed z-[60]"
      style={{
        top: "50%",
        right: "20px",
        transform: "translateY(-50%)",
      }}
    >
      {/* The circular button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative group cursor-pointer bg-transparent border-none p-0"
        aria-label="Hey kid — click here"
        type="button"
      >
        {/* Outer glow — fades from orange to transparent, same as top button */}
        <div
          className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(232,82,10,0.4) 0%, transparent 70%)",
            transform: "scale(2.5)",
          }}
        />
        {/* Sticker */}
        <img
          src={STICKER_IMG}
          alt="Psst, hey kid! Click here!"
          className="relative w-12 h-12 rounded-full object-cover transition-transform duration-200 group-hover:scale-110"
          style={{
            border: "2px solid rgba(232,82,10,0.6)",
            boxShadow: "0 0 20px rgba(232,82,10,0.3)",
          }}
        />
      </button>

      {/* Contained popup — appears to the left of the button */}
      {open && (
        <div
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 w-64 rounded-xl p-4 text-center z-50"
          style={{
            background: "rgba(26,26,46,0.95)",
            border: "1px solid rgba(232,82,10,0.3)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          <p
            className="text-sm text-[#d4c8b0] leading-relaxed mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            You might be lost. Or you might be really smart and want to learn.
            That's okay too.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/for/child");
              }}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-white cursor-pointer transition-all hover:scale-105"
              style={{
                background: "#E8520A",
                fontFamily: "'DM Sans', sans-serif",
                border: "none",
              }}
              type="button"
            >
              Guide me
            </button>
            <button
              onClick={() => setOpen(false)}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-[#d4c8b0] cursor-pointer transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              type="button"
            >
              I'm chill
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
