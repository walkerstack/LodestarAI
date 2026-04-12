/*
 * GALLANTRYAI — Intro Crawl
 * Design: The Living Document — dark register opening
 * Star Wars-style text crawl. Celtic lament-to-hope music.
 * Dissolves into the home page after completion or skip.
 * Orange text on deep dark background. The watcher watches first.
 */

import { useEffect, useRef, useState } from "react";

const MUSIC_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/gallantry-intro_2fa17d1d.mp3";

const crawlLines = [
  { text: "A Message to the Everyday Person", type: "heading" },
  { text: "", type: "spacer" },
  { text: "You do not need to understand how this works to use it.", type: "body" },
  { text: "", type: "spacer" },
  { text: "You do not need to be smart enough, educated enough, or have the right words.", type: "body" },
  { text: "You just need one honest question.", type: "bold" },
  { text: "", type: "spacer" },
  { text: "This system was not built in a lab. It was built by someone who needed it and did not have it. A middle-class person who made decisions alone that deserved a second opinion. Someone who could not afford the professional support that wealthier people may take for granted.", type: "body" },
  { text: "", type: "spacer" },
  { text: "If you are reading this — this was built for you.", type: "italic" },
  { text: "", type: "spacer" },
  { text: "It will not tell you what to do. It will not tell you what you want to hear.", type: "body" },
  { text: "It will help you think more clearly before you decide.", type: "bold" },
  { text: "That is all it promises.", type: "body" },
  { text: "", type: "spacer" },
  { text: "The elephant in the room — this is an AI. It is not a person. It also does not remember you between sessions unless you teach it how. That is not a flaw.", type: "body" },
  { text: "That is honesty about what it is.", type: "italic" },
  { text: "AI does not feel. It can be wrong. You should know that before you trust it with anything important.", type: "body" },
  { text: "", type: "spacer" },
  { text: "If this system is ever found to be unsafe it will be fixed. That is not a promise made lightly.", type: "body" },
  { text: "Safety, Honesty, and Truth are not features. They are the foundation.", type: "bold" },
  { text: "", type: "spacer" },
  { text: "You are allowed to test it. You are allowed to question it. You are allowed to walk away from it.", type: "body" },
  { text: "", type: "spacer" },
  { text: "But if you have a decision to make and no one to talk to —", type: "italic" },
  { text: "ask it one honest question. That is enough to start.", type: "italic" },
  { text: "", type: "spacer" },
  { text: "Words matter. Questions matter.", type: "closing" },
  { text: "Let's learn and grow safely together.", type: "closing" },
  { text: "— The Builder", type: "signature" },
  { text: "", type: "spacer" },
  { text: "", type: "spacer" },
  { text: "", type: "spacer" },
];

interface IntroCrawlProps {
  onComplete: () => void;
}

export default function IntroCrawl({ onComplete }: IntroCrawlProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [dissolving, setDissolving] = useState(false);
  const [visible, setVisible] = useState(true);

  // Total crawl duration in ms — tune to match music
  const CRAWL_DURATION = 82000; // ~82 seconds
  const DISSOLVE_DURATION = 2000;

  useEffect(() => {
    // Attempt autoplay
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {
        // Autoplay blocked — silent fallback, music plays on first interaction
      });
    }

    // Auto-complete after crawl duration
    const timer = setTimeout(() => {
      handleComplete();
    }, CRAWL_DURATION);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setDissolving(true);
    // Fade out audio
    if (audioRef.current) {
      const audio = audioRef.current;
      const fadeInterval = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          audio.pause();
          clearInterval(fadeInterval);
        }
      }, 100);
    }
    setTimeout(() => {
      setVisible(false);
      onComplete();
    }, DISSOLVE_DURATION);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-end overflow-hidden transition-opacity duration-[2000ms] ${
        dissolving ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "#0a0804" }}
    >
      {/* Audio */}
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />

      {/* Top fade gradient */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: "35%",
          background: "linear-gradient(to bottom, #0a0804 0%, transparent 100%)",
        }}
      />

      {/* GallantryAI title at top */}
      <div
        className="absolute top-8 left-0 right-0 z-20 text-center"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        <div
          className="text-3xl md:text-5xl font-black tracking-[0.25em] uppercase"
          style={{ color: "#E8520A", letterSpacing: "0.3em" }}
        >
          GallantryAI
        </div>
      </div>

      {/* Perspective crawl container */}
      <div
        className="relative w-full max-w-2xl px-8"
        style={{
          perspective: "300px",
          perspectiveOrigin: "50% 100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          className="crawl-text"
          style={{
            transformOrigin: "50% 100%",
            transform: "rotateX(20deg)",
            animation: `crawl ${CRAWL_DURATION / 1000}s linear forwards`,
            paddingBottom: "100vh",
          }}
        >
          {/* Spacer to push text off screen initially */}
          <div style={{ height: "100vh" }} />

          {crawlLines.map((line, i) => {
            if (line.type === "spacer") return <div key={i} style={{ height: "1.2em" }} />;

            const baseStyle: React.CSSProperties = {
              fontFamily: line.type === "heading" || line.type === "closing" || line.type === "signature"
                ? "'Playfair Display', serif"
                : "'DM Sans', sans-serif",
              textAlign: "center",
              lineHeight: 1.7,
              marginBottom: "0.4em",
            };

            if (line.type === "heading") {
              return (
                <div key={i} style={{ ...baseStyle, color: "#E8520A", fontSize: "1.3rem", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "0.8em" }}>
                  {line.text}
                </div>
              );
            }
            if (line.type === "bold") {
              return (
                <div key={i} style={{ ...baseStyle, color: "#f5e6d0", fontSize: "1rem", fontWeight: 700 }}>
                  {line.text}
                </div>
              );
            }
            if (line.type === "italic") {
              return (
                <div key={i} style={{ ...baseStyle, color: "#E8520A", fontSize: "1rem", fontStyle: "italic" }}>
                  {line.text}
                </div>
              );
            }
            if (line.type === "closing") {
              return (
                <div key={i} style={{ ...baseStyle, color: "#f5e6d0", fontSize: "1.15rem", fontWeight: 600 }}>
                  {line.text}
                </div>
              );
            }
            if (line.type === "signature") {
              return (
                <div key={i} style={{ ...baseStyle, color: "#E8520A", fontSize: "1rem", fontStyle: "italic", marginTop: "0.4em" }}>
                  {line.text}
                </div>
              );
            }
            // body
            return (
              <div key={i} style={{ ...baseStyle, color: "#c8b89a", fontSize: "0.95rem" }}>
                {line.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: "20%",
          background: "linear-gradient(to top, #0a0804 0%, transparent 100%)",
        }}
      />

      {/* Skip button */}
      <button
        onClick={handleComplete}
        className="absolute bottom-6 right-6 z-20 text-xs uppercase tracking-widest text-[#E8520A] border border-[#E8520A] px-4 py-2 rounded-xl opacity-60 hover:opacity-100 transition-opacity"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Skip →
      </button>

      {/* Keyframe animation */}
      <style>{`
        @keyframes crawl {
          from { transform: rotateX(20deg) translateY(0); }
          to   { transform: rotateX(20deg) translateY(-100%); }
        }
        .crawl-text {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
