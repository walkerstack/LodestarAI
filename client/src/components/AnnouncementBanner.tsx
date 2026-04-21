/**
 * AnnouncementBanner
 *
 * Site-wide banner that sits above the Nav.
 * Fetches settings from the DB via tRPC (public procedure — all visitors see it).
 * Only renders if bannerEnabled === 'true'.
 *
 * Settings keys:
 *   bannerEnabled  — 'true' | 'false'
 *   bannerText     — the message to display
 *   bannerColor    — hex color for the background (default #E8520A)
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  const { data: settings } = trpc.studio.getSiteSettings.useQuery(undefined, {
    // Refresh every 5 minutes so live edits propagate without a page reload
    staleTime: 5 * 60 * 1000,
  });

  // Don't render until settings are loaded, or if dismissed, or if disabled
  if (!settings) return null;
  if (dismissed) return null;
  if (settings.bannerEnabled !== "true") return null;

  const text = settings.bannerText ?? "Welcome to GallantryAI";
  const bgColor = settings.bannerColor ?? "#E8520A";

  // Determine readable text color — white on dark orange, black on light
  const textColor = "#ffffff";

  return (
    <div
      role="banner"
      aria-label="Site announcement"
      style={{ backgroundColor: bgColor }}
      className="w-full relative flex items-center justify-center px-10 py-2 min-h-[2.5rem]"
    >
      {/* Banner text — clamp() keeps it readable on all screen widths */}
      <p
        className="text-center font-medium leading-snug"
        style={{
          color: textColor,
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(0.75rem, 2vw, 1rem)",
          maxWidth: "90%",
          wordBreak: "break-word",
        }}
      >
        {text}
      </p>

      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white"
        style={{ color: textColor }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
