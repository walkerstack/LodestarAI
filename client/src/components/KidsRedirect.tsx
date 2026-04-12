/*
 * KidsRedirect — Reusable bright buffalo popup for adult pages
 * Small glowing buffalo image under the header. Tap → popup with kid-friendly blurb → redirect to /for/child
 * Non-intrusive to adults. Visible to kids who know to look.
 */
import { useState } from "react";
import { Link } from "wouter";

const BUFFALO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png";
const serifFont = "'Playfair Display', serif";

interface KidsRedirectProps {
  /** The kid-friendly story/blurb for this page */
  story: string;
  /** The quote at the bottom of the popup */
  quote: string;
  /** Attribution line */
  attribution: string;
}

export default function KidsRedirect({ story, quote, attribution }: KidsRedirectProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Glowing buffalo trigger */}
      <div className="flex justify-center py-3" style={{ background: "transparent" }}>
        <button
          onClick={() => setOpen(true)}
          className="relative group"
          aria-label="Kids: tap for a simpler version"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(232,82,10,0.4) 0%, transparent 70%)",
              transform: "scale(2.5)",
            }}
          />
          <img
            src={BUFFALO_IMG}
            alt="The buffalo — tap for kids version"
            className="relative w-12 h-12 rounded-full object-cover shadow-lg transition-transform group-hover:scale-110"
            style={{ border: "2px solid #E8520A" }}
          />
        </button>
      </div>

      {/* Popup */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-sm w-full rounded-3xl p-6 shadow-2xl"
            style={{ background: "#FFFDF8", border: "2px solid #F5D9B0" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-lg hover:opacity-70"
              style={{ color: "#999", background: "none", border: "none", cursor: "pointer" }}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="flex justify-center mb-4">
              <img
                src={BUFFALO_IMG}
                alt="The buffalo"
                className="w-16 h-16 rounded-full object-cover shadow-lg"
                style={{ border: "2px solid #E8520A" }}
              />
            </div>

            <p className="text-sm leading-relaxed mb-3 text-center" style={{ color: "#3a2a1a" }}>
              {story}
            </p>

            <p className="text-xs italic text-center mb-4" style={{ color: "#9a8a7a", fontFamily: serifFont }}>
              "{quote}"
            </p>

            <div className="text-center">
              <Link
                href="/for/child"
                className="inline-block px-6 py-3 rounded-full text-sm font-bold no-underline transition-all hover:scale-[1.05]"
                style={{ background: "#1A1A2E", color: "#E8520A" }}
              >
                Go Back to Your Page →
              </Link>
            </div>

            <p className="text-[10px] text-center mt-3" style={{ color: "#b0a090" }}>
              — {attribution}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
