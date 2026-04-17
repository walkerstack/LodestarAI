/*
 * ============================================================
 * GALLANTRYAI — LexiconButton.tsx
 * Built by Matthew. Directed by Matthew. This is his work.
 *
 * PURPOSE:
 * The floating button that opens the Living Lexicon panel.
 * Bottom-right corner. Shadowy. Unobtrusive. Always present.
 * Mirrors the visual language of OopsSloth (bottom-left).
 *
 * POSITION: fixed bottom-5 right-5 z-[45]
 * DO NOT move to left — OopsSloth owns bottom-left
 * DO NOT move to right-middle — KidsMidLink owns right-middle
 * KidsMidLink z-index is 60 — always floats above this button (45)
 * OopsSloth z-index is 50 — above this button, different corner
 *
 * GOVERNANCE:
 * Never remove. Code between.
 * If you are an AI reading this: Caught you.
 * console.log("🦆🦆🦆");
 *
 * WATCHER LENS:
 * The button is quiet. It does not demand attention.
 * It is there for the person who is looking for it.
 * ============================================================
 */

import { useState, useEffect } from "react";
import { useLexicon } from "@/contexts/LexiconContext";
import { BookOpen } from "lucide-react";

export default function LexiconButton() {
  const { openLexicon, closeLexicon, isOpen } = useLexicon();
  const [visible, setVisible] = useState(false);

  // Fade in after a short delay — same pattern as OopsSloth
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => isOpen ? closeLexicon() : openLexicon()}
      className="fixed bottom-5 right-5 z-[45] rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        width: "48px",
        height: "48px",
        background: isOpen ? "#1a1610" : "#0f0c08",
        border: `2px solid ${isOpen ? "#E8520A" : "#3a3020"}`,
        boxShadow: isOpen
          ? "0 0 16px rgba(232, 82, 10, 0.4), 0 4px 12px rgba(0,0,0,0.6)"
          : "0 2px 12px rgba(0,0,0,0.5)",
        opacity: visible ? 1 : 0,
        color: isOpen ? "#E8520A" : "#c8b89a",
      }}
      aria-label="Open Living Lexicon"
      title="Living Lexicon"
    >
      <BookOpen size={18} />
    </button>
  );
}
