/*
 * GALLANTRYAI — Intro Scene
 * Design: Storm-to-sun animated background
 * Full message text visible on screen throughout.
 * Sequence: dark storm → rain + lightning → sky clears → sun → birds fly → sloth pops up
 * Celtic music plays underneath. Skip button bottom-right.
 * Auto-completes after ~20s or user skips.
 */

import { useEffect, useRef, useState } from "react";

const MUSIC_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/gallantry-intro_2fa17d1d.mp3";

const SLOTH_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008840_5b1a6230.png";

// Total scene duration before auto-complete
const SCENE_DURATION_MS = 22000;
const DISSOLVE_MS = 1800;

interface IntroCrawlProps {
  onComplete: () => void;
}

export default function IntroCrawl({ onComplete }: IntroCrawlProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [phase, setPhase] = useState<"storm" | "clearing" | "sun">("storm");
  const [lightning, setLightning] = useState(false);
  const [showBirds, setShowBirds] = useState(false);
  const [showSloth, setShowSloth] = useState(false);
  const [dissolving, setDissolving] = useState(false);
  const [visible, setVisible] = useState(true);
  const doneRef = useRef(false);

  const handleComplete = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setDissolving(true);
    if (audioRef.current) {
      const audio = audioRef.current;
      const fade = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          audio.pause();
          clearInterval(fade);
        }
      }, 80);
    }
    setTimeout(() => {
      setVisible(false);
      onComplete();
    }, DISSOLVE_MS);
  };

  useEffect(() => {
    // Start music
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
    }

    // Lightning flashes during storm
    const flash1 = setTimeout(() => setLightning(true), 1200);
    const flash1off = setTimeout(() => setLightning(false), 1350);
    const flash2 = setTimeout(() => setLightning(true), 4800);
    const flash2off = setTimeout(() => setLightning(false), 4950);
    const flash3 = setTimeout(() => setLightning(true), 7200);
    const flash3off = setTimeout(() => setLightning(false), 7320);

    // Sky starts clearing at 8s
    const clearTimer = setTimeout(() => setPhase("clearing"), 8000);

    // Full sun at 12s
    const sunTimer = setTimeout(() => setPhase("sun"), 12000);

    // Birds fly across at 13s
    const birdsTimer = setTimeout(() => setShowBirds(true), 13000);

    // Sloth pops up at 15s
    const slothTimer = setTimeout(() => setShowSloth(true), 15000);

    // Auto-complete at scene end
    const endTimer = setTimeout(() => handleComplete(), SCENE_DURATION_MS);

    return () => {
      [flash1, flash1off, flash2, flash2off, flash3, flash3off,
        clearTimer, sunTimer, birdsTimer, slothTimer, endTimer
      ].forEach(clearTimeout);
    };
  }, []);

  if (!visible) return null;

  // Sky background based on phase
  const skyBg =
    phase === "storm"
      ? "linear-gradient(to bottom, #1a1a2e 0%, #2d2d44 40%, #3d3030 100%)"
      : phase === "clearing"
      ? "linear-gradient(to bottom, #2d3a5c 0%, #5a6e8c 40%, #8a9db5 100%)"
      : "linear-gradient(to bottom, #87CEEB 0%, #b8d9f0 40%, #e8f4fd 100%)";

  const baseFont = "'Nunito', 'DM Sans', sans-serif";

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-[1800ms] ${
        dissolving ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: skyBg, transition: "background 4s ease" }}
    >
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />

      {/* Lightning flash overlay */}
      {lightning && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "rgba(255,255,255,0.55)" }}
        />
      )}

      {/* Rain — only during storm */}
      {phase === "storm" && (
        <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${(i * 1.7) % 100}%`,
                top: `-${(i * 13) % 100}px`,
                width: "1px",
                height: `${14 + (i % 10)}px`,
                background: "rgba(180,210,255,0.45)",
                animation: `rainFall ${0.5 + (i % 5) * 0.1}s linear infinite`,
                animationDelay: `${(i * 0.07) % 1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Sun — appears when clearing */}
      {(phase === "clearing" || phase === "sun") && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: phase === "sun" ? "8%" : "18%",
            right: "12%",
            width: phase === "sun" ? "90px" : "60px",
            height: phase === "sun" ? "90px" : "60px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #FFD700 30%, #FFA500 70%, transparent 100%)",
            boxShadow: phase === "sun" ? "0 0 60px 30px rgba(255,200,0,0.35)" : "0 0 30px 15px rgba(255,200,0,0.2)",
            transition: "all 4s ease",
            zIndex: 6,
          }}
        />
      )}

      {/* Birds — fly across */}
      {showBirds && (
        <div className="absolute inset-0 z-7 pointer-events-none overflow-hidden">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: `${12 + i * 5}%`,
                animation: `birdFly ${3.5 + i * 0.4}s ease-in forwards`,
                animationDelay: `${i * 0.35}s`,
                fontSize: `${16 + (i % 3) * 4}px`,
              }}
            >
              🐦
            </div>
          ))}
        </div>
      )}

      {/* Sloth pops up from bottom */}
      {showSloth && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            bottom: 0,
            right: "8%",
            width: "110px",
            animation: "slothPopUp 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          }}
        >
          <img
            src={SLOTH_URL}
            alt="The sloth says hello"
            style={{
              width: "100%",
              borderRadius: "50% 50% 0 0",
              objectFit: "cover",
              objectPosition: "top",
              maxHeight: "130px",
            }}
          />
        </div>
      )}

      {/* Message text — always visible, centred, readable */}
      <div
        className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 pointer-events-none"
        style={{ paddingBottom: "80px" }}
      >
        <div
          className="w-full max-w-lg rounded-3xl px-6 py-7"
          style={{
            background: "rgba(10, 8, 4, 0.72)",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* Heading */}
          <div
            className="text-center mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#E8520A",
              fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
              fontWeight: 800,
              letterSpacing: "0.02em",
              lineHeight: 1.3,
            }}
          >
            A Message to the Everyday Person
          </div>

          {/* Body lines */}
          {[
            { text: "You do not need to understand how this works to use it.", w: false },
            { text: "You do not need to be smart enough, educated enough, or have the right words.", w: false },
            { text: "You just need one honest question.", w: true },
            { text: "This system was not built in a lab. It was built by someone who needed it and did not have it.", w: false },
            { text: "If you are reading this — this was built for you.", italic: true },
            { text: "It will help you think more clearly before you decide. That is all it promises.", w: false },
            { text: "Safety, Honesty, and Truth are not features. They are the foundation.", w: true },
            { text: "But if you have a decision to make and no one to talk to — ask it one honest question. That is enough to start.", italic: true },
          ].map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: baseFont,
                color: line.italic ? "#E8520A" : "#d4c4a8",
                fontSize: "clamp(0.82rem, 2.5vw, 1rem)",
                fontWeight: line.w ? 700 : 400,
                fontStyle: line.italic ? "italic" : "normal",
                textAlign: "center",
                lineHeight: 1.65,
                marginBottom: "0.45em",
              }}
            >
              {line.text}
            </p>
          ))}

          {/* Closing */}
          <div
            className="text-center mt-4"
            style={{
              fontFamily: baseFont,
              color: "#f0e0c8",
              fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
              fontWeight: 700,
              lineHeight: 1.5,
            }}
          >
            Words matter. Questions matter.<br />
            Let's learn and grow safely together.<br />
            <span style={{ fontFamily: "'Playfair Display', serif", color: "#E8520A", fontStyle: "italic" }}>
              — The Builder
            </span>
          </div>
        </div>
      </div>

      {/* Skip */}
      <button
        onClick={handleComplete}
        className="absolute bottom-5 right-5 z-40 text-xs uppercase tracking-widest border px-4 py-2 rounded-xl opacity-60 hover:opacity-100 transition-opacity"
        style={{
          color: "#E8520A",
          borderColor: "#E8520A",
          fontFamily: baseFont,
          background: "rgba(10,8,4,0.6)",
        }}
      >
        Skip →
      </button>

      <style>{`
        @keyframes rainFall {
          0%   { transform: translateY(0); opacity: 0.6; }
          100% { transform: translateY(100vh); opacity: 0.2; }
        }
        @keyframes birdFly {
          0%   { transform: translateX(-60px); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translateX(110vw); opacity: 0.8; }
        }
        @keyframes slothPopUp {
          0%   { transform: translateY(140px); opacity: 0; }
          100% { transform: translateY(0px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
