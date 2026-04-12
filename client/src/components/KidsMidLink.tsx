/*
 * KidsMidLink — Small mid-page acknowledgment for kids on adult pages.
 * "You might be lost. Or you might be really smart and want to learn. That's okay too."
 * Warm, unobtrusive, honest. Not a redirect — an invitation.
 */

import { useState } from "react";
import { Link } from "wouter";

export default function KidsMidLink() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 py-4">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-2 text-xs transition-all duration-200 hover:opacity-80 mx-auto"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#b0a090",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <span className="text-base">🦬</span>
        <span className="underline underline-offset-2 decoration-dotted">
          Hey — are you a kid reading this?
        </span>
        <span className="text-[10px]">{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <div
          className="mt-3 mx-auto max-w-md rounded-xl p-4 text-center animate-in fade-in duration-200"
          style={{
            background: "#FFF7ED",
            border: "1px solid #FED7AA",
          }}
        >
          <p
            className="text-sm leading-relaxed mb-3"
            style={{ color: "#3a2a1a", fontFamily: "'DM Sans', sans-serif" }}
          >
            You might be lost. Or you might be really smart and want to learn.
            That's okay too.
          </p>
          <Link
            href="/for/child"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold no-underline transition-all hover:scale-[1.03]"
            style={{
              background: "#1A1A2E",
              color: "#D97706",
            }}
          >
            🦬 Your page is here →
          </Link>
        </div>
      )}
    </div>
  );
}
