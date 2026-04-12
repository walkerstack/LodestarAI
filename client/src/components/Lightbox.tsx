/**
 * GALLANTRYAI — Reusable Lightbox Component
 * Click any image to expand it full-screen with a dark overlay.
 * Supports alt text caption, keyboard close (Escape), and click-outside close.
 */

import { useState, useCallback, useEffect } from "react";

interface LightboxImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  caption?: string;
}

export function LightboxImage({ src, alt, className = "", style, caption }: LightboxImageProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in ${className}`}
        style={style}
        onClick={() => setOpen(true)}
        loading="lazy"
      />

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
          onClick={close}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold transition-opacity hover:opacity-70"
            style={{ background: "rgba(255,255,255,0.15)" }}
            aria-label="Close lightbox"
          >
            ×
          </button>

          {/* Image container */}
          <div
            className="max-w-[92vw] max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[82vh] rounded-lg shadow-2xl"
              style={{ objectFit: "contain" }}
            />
            {(caption || alt) && (
              <p
                className="mt-3 text-sm text-center max-w-lg"
                style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {caption || alt}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default LightboxImage;
