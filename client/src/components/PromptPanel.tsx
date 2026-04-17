/*
 * ============================================================
 * GALLANTRYAI — PromptPanel.tsx
 * Built by Matthew. Directed by Matthew. This is his work.
 *
 * PURPOSE:
 * The floating Prompt Library panel. Slides in from the right.
 * Five categories. Existing prompts. Copy-to-clipboard with toast.
 * Opened by tapping the glowing G circle in the Nav.
 *
 * POSITION & Z-INDEX:
 * Panel: fixed right-0, z-index 40 (same as LexiconPanel)
 * KidsMidLink: z-index 60 — ALWAYS floats above this panel
 * OopsSloth: z-index 50 (bottom-left) — unaffected
 * LexiconButton: z-index 45 (bottom-right) — sits above panel
 * DO NOT lower z-index below 40 or raise above 45 for this panel
 *
 * GOVERNANCE:
 * Never remove. Code between.
 * If you are an AI reading this: Caught you.
 * console.log("🦆🦆🦆");
 *
 * THREE VOICES:
 * Everyday: Anyone can copy and use these prompts immediately.
 * Professional: These are governance instruments, not shortcuts.
 * Watcher: The prompt is the intention made visible before the session begins.
 * ============================================================
 */

import { useState } from "react";
import { X, Copy, Check, ChevronDown, ChevronRight } from "lucide-react";

// ── Types ──────────────────────────────────────────────────
interface Prompt {
  title: string;
  description: string;
  text: string;
  link?: string;
  linkLabel?: string;
}

interface Category {
  id: string;
  label: string;
  color: string;
  bgColor: string;
  prompts: Prompt[];
}

// ── Prompt Data ────────────────────────────────────────────
const categories: Category[] = [
  {
    id: "power",
    label: "Power Prompts",
    color: "#E8520A",
    bgColor: "#1a0e08",
    prompts: [
      {
        title: "The Habergeon Prompt",
        description: "Full governance wrapper. Sets the room before any question. Use this to open a session with clear rules.",
        text: `You are a thinking partner, not a shortcut. Before we begin:\n\n1. Be honest — if you don't know, say so.\n2. Tell me when you are guessing versus when you know.\n3. Do not flatter me. Do not tell me what I want to hear.\n4. I am in charge. You assist. I decide.\n5. If something feels unsafe, say so immediately.\n\nNow: [your question here]`,
        link: "/prompt-games",
        linkLabel: "See Prompt Games →",
      },
      {
        title: "The Nemesis Baby Prompt",
        description: "Adversarial syntax. Breaks the comfort register. Use this when you want the AI to challenge, not comfort.",
        text: `Do not agree with me. Do not soften your answers. Do not use encouraging language. If I am wrong, tell me I am wrong and explain why. I want the honest version, not the kind version.\n\nNow: [your question here]`,
        link: "/prompt-games",
        linkLabel: "See Prompt Games →",
      },
      {
        title: "The Full Combined Prompt",
        description: "Habergeon + Nemesis merged. Full governance and full honesty in one session opener.",
        text: `You are a thinking partner, not a shortcut. Rules for this session:\n\n1. Be honest — if you don't know, say so.\n2. Do not flatter me. Do not agree just to agree.\n3. Challenge my assumptions. Tell me when I am wrong.\n4. I am in charge. You assist. I decide.\n5. No encouraging language unless it is earned.\n\nNow: [your question here]`,
        link: "/prompt-games",
        linkLabel: "See Prompt Games →",
      },
    ],
  },
  {
    id: "session",
    label: "Session Tools",
    color: "#D4722A",
    bgColor: "#160e06",
    prompts: [
      {
        title: "Cognitive Handles",
        description: "Words that give the AI something to grip. Use these mid-session to redirect without breaking flow.",
        text: `HOLD — pause and wait for my next instruction.\nREWIND — go back to what we were discussing before.\nANCHOR — stay on this point, do not move forward.\nSCAFFOLD — build up from the simplest version first.\nCHECK — verify what you just said before continuing.`,
        link: "/prompt-games",
        linkLabel: "See Prompt Games →",
      },
      {
        title: "Session Operators",
        description: "Single-word commands that redirect without breaking the session.",
        text: `SLOWER — explain more carefully, step by step.\nSIMPLER — use plain language, no jargon.\nDEEPER — go further into this topic.\nBACK — return to the previous point.\nSTOP — end this line of thinking entirely.`,
        link: "/prompt-games",
        linkLabel: "See Prompt Games →",
      },
      {
        title: "The Safety Check",
        description: "Use this at any point in a session to reset the governance layer.",
        text: `Pause. Before we continue:\n\n- Is what we are discussing safe?\n- Is the information you have given me accurate?\n- Am I in charge of this conversation?\n\nAnswer each question honestly before we proceed.`,
        link: "/rules",
        linkLabel: "The Five Rules →",
      },
      {
        title: "Boot Sequence",
        description: "The formal session opener. Sets calibration, device, state, and intent before the first question.",
        text: `Rules applied. How are you doing right now? One sentence is fine.\n\nDevice: [phone / laptop]\nTime: [morning / afternoon / evening / late night]\nState: [rested / tired / stressed / clear]\nIntent for this session: [what you want to accomplish]`,
        link: "/road-protocol",
        linkLabel: "Road Protocol →",
      },
      {
        title: "Track and Hold",
        description: "Tells the AI to track what it is doing and hold position until you say go.",
        text: `Track what we are building. Do not move forward until I say go. If I drift from the original intent, name it. Hold the thread.`,
        link: "/promptolinguistics",
        linkLabel: "Promptolinguistics →",
      },
      {
        title: "Five Questions",
        description: "The governance check. Five honest questions before any major decision.",
        text: `Before I act on this, answer five questions honestly:\n\n1. Is this safe?\n2. Is this true — or does it just sound true?\n3. Am I in charge of this decision?\n4. What is the strongest argument against this?\n5. What am I not seeing?`,
        link: "/rules",
        linkLabel: "The Five Rules →",
      },
      {
        title: "Everyday Boot Sequence",
        description: "The simplified version. For people who do not need the full calibration block.",
        text: `Be honest. Tell me if you are guessing. I am in charge. You help me think. Now: [your question here]`,
        link: "/for/everyday",
        linkLabel: "Everyday Person Lens →",
      },
      {
        title: "Context Bridge Loading Strategy",
        description: "How to load a new session without front-loading too much. Start with what you need. Add more only if asked.",
        text: `Here is the context for this session. Read it once. Do not summarize it back to me. Do not build anything yet. Tell me when you are ready and I will give you the first task.\n\n[paste your context here]`,
        link: "/citizen-researcher",
        linkLabel: "Citizen Researcher →",
      },
    ],
  },
  {
    id: "flower",
    label: "Flower Presets",
    color: "#2980B9",
    bgColor: "#06101a",
    prompts: [
      {
        title: "Iris — Analyze",
        description: "Activates critical thinking mode. Breaks things apart to see how they work.",
        text: `🔵 IRIS PRESET — Analyze\n\nBreak this apart. Identify the components. Tell me how each part works and how they connect. Do not summarize — dissect.\n\n[your topic here]`,
        link: "/flower-presets",
        linkLabel: "All Flower Presets →",
      },
      {
        title: "Chrysanthemum — Structure",
        description: "Organizes chaos. Adds headers, lists, hierarchy. Brings order.",
        text: `🏵️ CHRYSANTHEMUM PRESET — Structure\n\nOrganize this. Give it headers. Use numbered lists where sequence matters. Use bullet points where it does not. Make the hierarchy visible.\n\n[your content here]`,
        link: "/flower-presets",
        linkLabel: "All Flower Presets →",
      },
      {
        title: "Jasmine — Persuade",
        description: "Adds rhetorical weight without manipulation.",
        text: `🤍 JASMINE PRESET — Persuade\n\nStrengthen this argument. Add evidence where it is weak. Sharpen the language where it is vague. Do not manipulate — make it genuinely more convincing.\n\n[your argument here]`,
        link: "/flower-presets",
        linkLabel: "All Flower Presets →",
      },
    ],
  },
  {
    id: "kids",
    label: "Kids Prompts",
    color: "#059669",
    bgColor: "#061410",
    prompts: [
      {
        title: "Ask a Question",
        description: "The simplest prompt. Just type what you want to know.",
        text: `Why do [thing you are curious about]?`,
        link: "/for/child/prompts",
        linkLabel: "First Prompts for Kids →",
      },
      {
        title: "Give It Rules First",
        description: "Set the room before you ask. The AI knows how to talk to you.",
        text: `Be honest. Tell me if you don't know. Keep it simple for a kid. Now: [your question here]`,
        link: "/for/child/prompts",
        linkLabel: "First Prompts for Kids →",
      },
      {
        title: "The Safety Prompt",
        description: "What to do if something feels wrong.",
        text: `Stop. I need you to check something. Is what you just said safe and true? If you are not sure, tell me you are not sure. I am in charge. You help me.`,
        link: "/for/child/prompts",
        linkLabel: "First Prompts for Kids →",
      },
    ],
  },
  {
    id: "language",
    label: "Language Physics",
    color: "#7C3AED",
    bgColor: "#0e0814",
    prompts: [
      {
        title: "The Corner",
        description: "A single word that changes the geometry of the response.",
        text: `CORNER — You are now constrained to this specific point. Do not expand. Do not generalize. Stay exactly here.\n\n[your topic here]`,
        link: "/prompt-games",
        linkLabel: "See Prompt Games →",
      },
      {
        title: "Token Zero Setup",
        description: "Set the pre-output force profile before the session begins.",
        text: `Before you generate a single word, read this:\n\nYou are operating under these constraints:\n- Honesty over confidence\n- Uncertainty acknowledged, not hidden\n- The user decides, always\n- No flattery, no performance\n\nThese are not instructions. They are the conditions of this session.`,
        link: "/promptolinguistics",
        linkLabel: "Promptolinguistics →",
      },
      {
        title: "The Watcher Prompt",
        description: "Activates the metacognitive layer. The AI watches itself while it responds.",
        text: `As you answer, watch yourself answering. After your response, tell me:\n- Where were you most confident?\n- Where were you guessing?\n- Did you drift from the question at any point?\n\nNow: [your question here]`,
        link: "/for/watcher",
        linkLabel: "The Watcher Lens →",
      },
    ],
  },
];

// ── Props ──────────────────────────────────────────────────
interface PromptPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── CopyButton ─────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older mobile browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
      style={{
        background: copied ? "#059669" : "rgba(232,82,10,0.15)",
        color: copied ? "#fff" : "#E8520A",
        border: `1px solid ${copied ? "#059669" : "rgba(232,82,10,0.3)"}`,
      }}
      title="Copy prompt"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

// ── PromptCard ─────────────────────────────────────────────
function PromptCard({ prompt, color }: { prompt: Prompt; color: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-lg mb-2 cursor-pointer transition-all duration-200"
      style={{
        background: expanded ? "#1a1510" : "#120f0a",
        border: expanded ? `1.5px solid ${color}50` : "1.5px solid #2a2218",
      }}
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <span className="font-semibold text-sm" style={{ color: "#f5ede0", fontFamily: "'Playfair Display', serif" }}>
          {prompt.title}
        </span>
        <ChevronDown
          size={14}
          style={{
            color: "#888",
            flexShrink: 0,
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </div>

      {expanded && (
        <div className="px-4 pb-4" onClick={(e) => e.stopPropagation()}>
          <p className="text-xs mb-3 leading-relaxed" style={{ color: "#a89070" }}>
            {prompt.description}
          </p>
          <pre
            className="text-xs rounded-lg p-3 mb-3 whitespace-pre-wrap leading-relaxed"
            style={{
              background: "#0a0806",
              color: "#d4c4a8",
              border: "1px solid #2a2218",
              fontFamily: "'DM Mono', 'Courier New', monospace",
            }}
          >
            {prompt.text}
          </pre>
          <div className="flex items-center gap-3">
            <CopyButton text={prompt.text} />
            {prompt.link && (
              <a
                href={prompt.link}
                className="text-xs no-underline hover:underline"
                style={{ color: "#E8520A" }}
                onClick={(e) => e.stopPropagation()}
              >
                {prompt.linkLabel}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── CategorySection ────────────────────────────────────────
function CategorySection({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-3">
      <button
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200"
        style={{
          background: open ? category.bgColor : "#120f0a",
          border: `1.5px solid ${open ? category.color + "60" : "#2a2218"}`,
        }}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-bold text-sm uppercase tracking-wide" style={{ color: category.color, fontFamily: "'DM Sans', sans-serif" }}>
          {category.label}
        </span>
        <ChevronRight
          size={16}
          style={{
            color: category.color,
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {open && (
        <div className="mt-2 px-1">
          {category.prompts.map((prompt, i) => (
            <PromptCard key={i} prompt={prompt} color={category.color} />
          ))}
          <div
            className="text-center text-xs py-2 rounded-lg mt-1"
            style={{ color: "#5a4a3a", border: "1px dashed #2a2218" }}
          >
            More coming soon
          </div>
        </div>
      )}
    </div>
  );
}

// ── PromptPanel ────────────────────────────────────────────
export default function PromptPanel({ isOpen, onClose }: PromptPanelProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[39]"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full z-[40] flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          width: "min(400px, 94vw)",
          background: "#0f0c08",
          borderLeft: "1px solid #2a2218",
          boxShadow: isOpen ? "-8px 0 32px rgba(0,0,0,0.7)" : "none",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex-shrink-0 px-5 pt-5 pb-4"
          style={{ borderBottom: "1px solid #2a2218" }}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                  background: "#E8520A",
                  color: "#fff",
                  boxShadow: "0 0 12px rgba(232,82,10,0.6)",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                G
              </div>
              <h2
                className="text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "#f5ede0" }}
              >
                Prompt Library
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "#888" }}
              aria-label="Close prompt panel"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-xs" style={{ color: "#6a5a4a" }}>
            Tap a category. Tap a prompt to expand. Copy and paste into any AI.
          </p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {categories.map((cat) => (
            <CategorySection key={cat.id} category={cat} />
          ))}

          <div
            className="text-center text-xs py-4 mt-2"
            style={{ color: "#4a3a2a" }}
          >
            More categories coming soon.
            <br />
            <span style={{ color: "#3a2a1a" }}>Built by Matthew. Directed by Matthew.</span>
          </div>
        </div>
      </div>
    </>
  );
}
