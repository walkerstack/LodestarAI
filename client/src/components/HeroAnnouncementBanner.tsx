/**
 * HeroAnnouncementBanner
 *
 * A flowing ribbon banner that lives inside the homepage hero area.
 * Overlays the hero image — does NOT cover the GallantryAI logo or buffalo/sloth faces.
 * Fetches settings from DB via tRPC. Only renders if heroBannerEnabled === 'true'.
 *
 * Settings keys (in site_settings table):
 *   heroBannerEnabled  — 'true' | 'false'
 *   heroBannerText     — the personal message (max 280 chars)
 *   heroBannerColor    — hex color (default #E8520A orange)
 *   heroBannerSpeed    — 'slow' | 'medium' | 'off'
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function HeroAnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  const { data: settings } = trpc.studio.getSiteSettings.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  if (!settings) return null;
  if (dismissed) return null;
  if (settings.heroBannerEnabled !== "true") return null;

  const text = settings.heroBannerText ?? "Welcome. This is the builder.";
  const bgColor = settings.heroBannerColor ?? "#E8520A";
  const speed = settings.heroBannerSpeed ?? "slow";

  // Animation duration based on speed setting
  const duration =
    speed === "off" ? undefined : speed === "medium" ? "18s" : "30s";

  // Font size uses clamp — starts large, shrinks if text is long
  const charCount = text.length;
  const fontSize =
    charCount < 60
      ? "clamp(1rem, 2.2vw, 1.25rem)"
      : charCount < 140
        ? "clamp(0.85rem, 1.8vw, 1.1rem)"
        : "clamp(0.75rem, 1.5vw, 0.95rem)";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: `${bgColor}dd`, // slight transparency
        borderTop: `1px solid ${bgColor}`,
        borderBottom: `1px solid ${bgColor}`,
        minHeight: "2.75rem",
        display: "flex",
        alignItems: "center",
      }}
      role="banner"
      aria-label="Message from the builder"
    >
      {/* Scrolling text container */}
      <div
        className="flex items-center w-full"
        style={{
          overflow: "hidden",
          position: "relative",
        }}
      >
        {speed === "off" ? (
          // Static centered text
          <p
            className="w-full text-center font-medium px-10"
            style={{
              color: "#ffffff",
              fontFamily: "'Playfair Display', serif",
              fontSize,
              lineHeight: "1.4",
              letterSpacing: "0.02em",
              textShadow: "0 1px 3px rgba(0,0,0,0.4)",
              wordBreak: "break-word",
            }}
          >
            {text}
          </p>
        ) : (
          // Scrolling marquee-style text
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              animation: `herobannerscroll ${duration} linear infinite`,
              willChange: "transform",
            }}
          >
            {/* Duplicate text for seamless loop */}
            {[0, 1].map((i) => (
              <span
                key={i}
                style={{
                  color: "#ffffff",
                  fontFamily: "'Playfair Display', serif",
                  fontSize,
                  lineHeight: "1.4",
                  letterSpacing: "0.04em",
                  textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                  paddingLeft: "8vw",
                  paddingRight: "8vw",
                  display: "inline-block",
                }}
              >
                {text}
                <span
                  style={{
                    opacity: 0.5,
                    marginLeft: "4vw",
                    marginRight: "4vw",
                    fontSize: "0.8em",
                  }}
                >
                  ◆
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss builder message"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white z-10"
        style={{ color: "#ffffff", flexShrink: 0 }}
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

      {/* Keyframe animation injected via style tag */}
      <style>{`
        @keyframes herobannerscroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
