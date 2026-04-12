/*
 * KidsMidLink — Mid-page glowing buffalo sticker for kids on adult pages.
 * Sits in a dark band. Orange radial glow pulse. Sticker is the link.
 * "You might be lost. Or you might be really smart and want to learn. That's okay too."
 */

import { Link } from "wouter";

const STICKER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-mid-link-sticker-Nmh6s3hknwKR5FNbsvDCHx.webp";

export default function KidsMidLink() {
  return (
    <div
      className="py-8"
      style={{ background: "#1A1A2E" }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-3 px-6">
        {/* Glowing sticker link */}
        <Link
          href="/for/child"
          className="relative group block no-underline"
        >
          {/* Radial glow — same pulse as KidsRedirect */}
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(232,82,10,0.45) 0%, rgba(232,82,10,0.15) 40%, transparent 70%)",
              transform: "scale(2.8)",
            }}
          />
          {/* Sticker image */}
          <img
            src={STICKER_IMG}
            alt="Psst, hey kid! Click here!"
            className="relative w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-lg transition-transform duration-200 group-hover:scale-110"
            style={{
              border: "2px solid rgba(232,82,10,0.6)",
              boxShadow:
                "0 0 20px rgba(232,82,10,0.3), 0 0 40px rgba(232,82,10,0.15)",
            }}
          />
        </Link>

        {/* Subtle text below */}
        <p
          className="text-[11px] text-center leading-relaxed max-w-xs"
          style={{
            color: "rgba(200,180,160,0.6)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          You might be lost. Or you might be really smart and want to learn.
          That's okay too.
        </p>
      </div>
    </div>
  );
}
