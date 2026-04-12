/*
 * KidsMidLink — Floating buffalo sticker for kids.
 * Fixed position, bottom-right. Small glowing circle. Just the image. Links to /for/child.
 * Invisible to adults. Obvious to kids.
 */

import { Link } from "wouter";

const STICKER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-mid-link-sticker-Nmh6s3hknwKR5FNbsvDCHx.webp";

export default function KidsMidLink() {
  return (
    <div className="fixed bottom-24 right-4 z-40">
      <Link
        href="/for/child"
        className="relative group block no-underline"
        aria-label="Kids page"
      >
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(232,82,10,0.4) 0%, transparent 70%)",
            transform: "scale(2.2)",
          }}
        />
        {/* Sticker */}
        <img
          src={STICKER_IMG}
          alt="Psst, hey kid! Click here!"
          className="relative w-14 h-14 rounded-full object-cover transition-transform duration-200 group-hover:scale-110"
          style={{
            border: "2px solid rgba(232,82,10,0.5)",
            boxShadow: "0 0 16px rgba(232,82,10,0.25)",
          }}
        />
      </Link>
    </div>
  );
}
