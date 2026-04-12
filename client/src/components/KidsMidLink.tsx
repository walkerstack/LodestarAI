/*
 * KidsMidLink — Circular buffalo sticker button for kids.
 * Placed inline inside existing dark sections mid-page.
 * Click opens a contained popup with message + two choices:
 *   "Send me home" → /for/child
 *   "I'm chill" → closes popup, stays on page
 * No text outside the button. No section creation. No flow disruption.
 */

import { useState } from "react";
import { useLocation } from "wouter";

const STICKER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-mid-link-sticker-Nmh6s3hknwKR5FNbsvDCHx.webp";

export default function KidsMidLink() {
  const [open, setOpen] = useState(false);
  const [, navigate] = useLocation();

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* The circular button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative group cursor-pointer bg-transparent border-none p-0"
        aria-label="Hey kid — click here"
        type="button"
      >
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(232,82,10,0.45) 0%, transparent 70%)",
            transform: "scale(2.4)",
          }}
        />
        {/* Sticker */}
        <img
          src={STICKER_IMG}
          alt="Psst, hey kid! Click here!"
          className="relative w-16 h-16 rounded-full object-cover transition-transform duration-200 group-hover:scale-110"
          style={{
            border: "2px solid rgba(232,82,10,0.6)",
            boxShadow: "0 0 20px rgba(232,82,10,0.3)",
          }}
        />
      </button>

      {/* Contained popup — appears above the button */}
      {open && (
        <div
          className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 rounded-xl p-4 text-center z-50"
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
              Send me home
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
