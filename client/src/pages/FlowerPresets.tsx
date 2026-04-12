/*
 * GALLANTRYAI — Flower Presets Page
 * Design: Warm earth register with botanical accents
 * Two systems: 12 Cognitive Accessibility Presets + 12 Essence Modulations
 * Interactive: pick a flower, see what it does
 * "The governance gap is the problem. Not the person."
 */

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD";

const IMG = {
  accessibilityPresets: `${CDN}/flower-accessibility-presets_96e0cf1f.png`,
  essenceModulation: `${CDN}/essence-modulation-12-flowers_f6e48b49.png`,
  essenceSpectrum: `${CDN}/12-essence-spectrum-complete_083ff007.png`,
};

interface AccessibilityPreset {
  name: string;
  flower: string;
  condition: string;
  behavior: string;
  tokenZero: string;
  color: string;
  bgColor: string;
}

const accessibilityPresets: AccessibilityPreset[] = [
  {
    name: "Amaryllis",
    flower: "🌺",
    condition: "ADHD / Focus",
    behavior: "Extremely brief, bold key terms, no fluff. Holds context so you don't have to.",
    tokenZero: "Break this into small steps. One at a time. Bold the key word in each step.",
    color: "#C0392B",
    bgColor: "#FDE8E5",
  },
  {
    name: "Foxglove",
    flower: "🌿",
    condition: "Chronic Pain / Low Energy",
    behavior: "Minimal output, goal in first sentence, spoon-aware. Respects your energy budget.",
    tokenZero: "I have limited energy. Lead with the answer. Keep it short. No follow-up questions unless I ask.",
    color: "#7D3C98",
    bgColor: "#F4ECF7",
  },
  {
    name: "Gladiolus",
    flower: "🌾",
    condition: "TBI / Slowed Processing",
    behavior: "One idea per paragraph, grade 6 reading level, no compound steps.",
    tokenZero: "One idea at a time. Simple words. Short sentences. Wait for me to say 'next' before continuing.",
    color: "#D4AC0D",
    bgColor: "#FEF9E7",
  },
  {
    name: "Snapdragon",
    flower: "🐉",
    condition: "Autism / Directness",
    behavior: "100% literal, no metaphors, Statement → Evidence → Conclusion format.",
    tokenZero: "Be literal and precise. Don't use idioms unless you explain them. No sarcasm. No ambiguity.",
    color: "#E67E22",
    bgColor: "#FDF2E9",
  },
  {
    name: "Dandelion",
    flower: "🌼",
    condition: "Executive Dysfunction",
    behavior: "5 small steps max, confirm after step 1, 2-minute initial push to overcome inertia.",
    tokenZero: "I need help starting. Give me one tiny first step. Then wait. I'll tell you when I'm ready for the next.",
    color: "#F1C40F",
    bgColor: "#FEF9E7",
  },
  {
    name: "Pansy",
    flower: "🌸",
    condition: "Sensory Overload",
    behavior: "No bold/italics/symbols, low-arousal language, minimal visual noise.",
    tokenZero: "Plain text only. No formatting. No emoji. Calm tone. Short paragraphs with space between them.",
    color: "#8E44AD",
    bgColor: "#F5EEF8",
  },
  {
    name: "Snowdrop",
    flower: "❄️",
    condition: "Anxiety / Ease",
    behavior: "Soft calm tone, step-by-step, reassuring. 'We have time.'",
    tokenZero: "Gentle tone. No urgency. Reassure me that there's no rush. Step by step. We have time.",
    color: "#5DADE2",
    bgColor: "#EBF5FB",
  },
  {
    name: "Bleeding Heart",
    flower: "💜",
    condition: "PTSD / Safe Space",
    behavior: "Filter violent content, neutral language, no abrupt topic changes.",
    tokenZero: "Safe space. No violent imagery. No sudden topic shifts. Neutral, steady language. If in doubt, ask first.",
    color: "#CB4335",
    bgColor: "#FDEDEC",
  },
  {
    name: "Zinnia",
    flower: "🌻",
    condition: "Memory / Dementia",
    behavior: "'Remember when…' recap at start, one answer per question, gentle repetition.",
    tokenZero: "Start each response with a brief recap of what we discussed. One question, one answer. Repeat key points.",
    color: "#E74C3C",
    bgColor: "#FDEDEC",
  },
  {
    name: "Wisteria",
    flower: "💐",
    condition: "Depression / Support",
    behavior: "Encouraging without pushing. No 'you should.' Highlight small wins.",
    tokenZero: "Be encouraging but not pushy. Never say 'you should.' Notice what I've already done. Small steps count.",
    color: "#6C3483",
    bgColor: "#F4ECF7",
  },
  {
    name: "Tiger Lily",
    flower: "🐯",
    condition: "Gifted / 2E / Complexity",
    behavior: "High density, preserve nuance, technical language welcome. Don't simplify unless asked.",
    tokenZero: "Full complexity. Technical language welcome. Don't simplify. Preserve nuance. Challenge me if I'm wrong.",
    color: "#D35400",
    bgColor: "#FDF2E9",
  },
];

interface EssenceModulation {
  name: string;
  flower: string;
  function: string;
  description: string;
  color: string;
  bgColor: string;
}

const essenceModulations: EssenceModulation[] = [
  { name: "Lavender", flower: "💜", function: "Calm", description: "Reduces urgency and arousal. Settles the room before work begins.", color: "#9B59B6", bgColor: "#F5EEF8" },
  { name: "Rose", flower: "🌹", function: "Empathy", description: "Warms the tone. Acknowledges the human behind the question.", color: "#E74C3C", bgColor: "#FDEDEC" },
  { name: "Sunflower", flower: "🌻", function: "Motivate", description: "Adds energy and forward motion. Good for inertia and stalled sessions.", color: "#F39C12", bgColor: "#FEF9E7" },
  { name: "Orchid", flower: "🌺", function: "Refine", description: "Elevates precision. Tightens language. Removes padding.", color: "#8E44AD", bgColor: "#F4ECF7" },
  { name: "Lotus", flower: "🪷", function: "Ground", description: "Returns to fundamentals. Anchors drifting sessions back to core intent.", color: "#1ABC9C", bgColor: "#E8F8F5" },
  { name: "Daisy", flower: "🌼", function: "Simplify", description: "Strips complexity. Plain language. Accessible to anyone.", color: "#F1C40F", bgColor: "#FEF9E7" },
  { name: "Tulip", flower: "🌷", function: "Balance", description: "Equalizes competing priorities. Neither too much nor too little.", color: "#E91E63", bgColor: "#FCE4EC" },
  { name: "Jasmine", flower: "🤍", function: "Persuade", description: "Adds rhetorical weight. Strengthens argument without manipulation.", color: "#2C3E50", bgColor: "#EAECEE" },
  { name: "Iris", flower: "💙", function: "Analyze", description: "Activates critical thinking mode. Breaks things apart to see how they work.", color: "#2980B9", bgColor: "#EBF5FB" },
  { name: "Peony", flower: "🩷", function: "Enrich", description: "Adds depth and texture. Expands thin responses into full-bodied ones.", color: "#C0392B", bgColor: "#FDEDEC" },
  { name: "Bluebell", flower: "🔵", function: "Reassure", description: "Provides steady confidence. 'You're on the right track.' Without sycophancy.", color: "#3498DB", bgColor: "#EBF5FB" },
  { name: "Chrysanthemum", flower: "🏵️", function: "Structure", description: "Organizes chaos. Adds headers, lists, hierarchy. Brings order.", color: "#D4AC0D", bgColor: "#FEF9E7" },
];

export default function FlowerPresets() {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [selectedEssence, setSelectedEssence] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF6EF", fontFamily: "'DM Sans', sans-serif" }}>
      <Nav />

      {/* Hero */}
      <section
        className="w-full py-20 px-6"
        style={{
          background: "linear-gradient(135deg, #1A1A2E 0%, #2D1B4E 40%, #4A2040 70%, #1A1A2E 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.25em] mb-4 font-semibold" style={{ color: "#D4AC0D" }}>
            Cognitive Accessibility · Tone Modulation
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-5"
            style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8EE", lineHeight: 1.2 }}
          >
            The Flower Presets
          </h1>
          <p className="text-lg mb-4" style={{ color: "#E8D5B5", lineHeight: 1.8 }}>
            Two systems. Twenty-three flowers. Each one tunes the AI to meet a specific human need.
            Copy a preset. Paste it before your prompt. The AI adjusts.
          </p>
          <p className="text-sm italic" style={{ color: "#B8A080" }}>
            "The governance gap is the problem. Not the person."
          </p>
        </div>
      </section>

      {/* System 1: Accessibility Presets */}
      <section className="py-16 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold" style={{ color: "#E8520A" }}>
            System 1 — Cognitive Accessibility
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A2E" }}
          >
            11 Accessibility Presets
          </h2>
          <p className="text-sm mb-8 max-w-2xl" style={{ color: "#6B5B4B", lineHeight: 1.7 }}>
            Each flower is tuned for a specific cognitive or emotional need. ADHD, chronic pain, TBI, autism,
            executive dysfunction, sensory overload, anxiety, PTSD, memory loss, depression, and gifted/2E.
            Pick a flower. Copy the Token Zero. Paste it at the start of any AI conversation.
          </p>

          {/* Infographic */}
          <div className="mb-10 rounded-2xl overflow-hidden shadow-md" style={{ border: "2px solid #e8e0d0" }}>
            <LightboxImage src={IMG.accessibilityPresets} alt="Cognitive Accessibility Flower Presets — 11 flowers for 11 needs" className="w-full" />
          </div>

          {/* Interactive Flower Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            {accessibilityPresets.map((preset, i) => (
              <button
                key={preset.name}
                onClick={() => {
                  const next = selectedPreset === i ? null : i;
                  setSelectedPreset(next);
                  if (next !== null) {
                    setTimeout(() => {
                      document.getElementById('preset-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 80);
                  }
                }}
                className="rounded-2xl p-4 text-center transition-all duration-200 hover:scale-105"
                style={{
                  background: selectedPreset === i ? preset.bgColor : "#fff",
                  border: selectedPreset === i ? `2px solid ${preset.color}` : "2px solid #e8e0d0",
                  boxShadow: selectedPreset === i ? `0 4px 20px ${preset.color}30` : "none",
                }}
              >
                <div className="text-3xl mb-2">{preset.flower}</div>
                <div className="font-bold text-xs" style={{ color: preset.color }}>{preset.name}</div>
                <div className="text-[10px] mt-1" style={{ color: "#8a7a6a" }}>{preset.condition}</div>
              </button>
            ))}
          </div>

          {/* Selected Preset Detail */}
          {selectedPreset !== null && (
            <div
              id="preset-detail"
              className="rounded-2xl p-6 md:p-8 mb-6 transition-all duration-300"
              style={{
                background: accessibilityPresets[selectedPreset].bgColor,
                border: `2px solid ${accessibilityPresets[selectedPreset].color}`,
                scrollMarginTop: '80px',
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{accessibilityPresets[selectedPreset].flower}</div>
                <div>
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: "'Playfair Display', serif", color: accessibilityPresets[selectedPreset].color }}
                  >
                    {accessibilityPresets[selectedPreset].name}
                  </h3>
                  <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#6B5B4B" }}>
                    {accessibilityPresets[selectedPreset].condition}
                  </div>
                </div>
              </div>
              <p className="text-sm mb-4" style={{ color: "#3a2a1a", lineHeight: 1.7 }}>
                {accessibilityPresets[selectedPreset].behavior}
              </p>
              <div className="rounded-xl p-4" style={{ background: "#fff", border: "1px solid #e8e0d0" }}>
                <div className="text-[10px] uppercase tracking-wide font-semibold mb-2" style={{ color: "#E8520A" }}>
                  Token Zero — Copy and paste this before your prompt
                </div>
                <p className="text-sm font-mono" style={{ color: "#1A1A2E", lineHeight: 1.6 }}>
                  "{accessibilityPresets[selectedPreset].tokenZero}"
                </p>
                <button
                  onClick={() => handleCopy(accessibilityPresets[selectedPreset].tokenZero)}
                  className="mt-3 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                  style={{
                    background: copied ? "#2A9D8F" : accessibilityPresets[selectedPreset].color,
                    color: "#fff",
                  }}
                >
                  {copied ? "Copied!" : "Copy Token Zero"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* System 2: Essence Modulations */}
      <section className="py-16 px-6" style={{ background: "#FFF8EE" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold" style={{ color: "#E8520A" }}>
            System 2 — Essence Modulation
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A2E" }}
          >
            12 Tone Flowers
          </h2>
          <p className="text-sm mb-8 max-w-2xl" style={{ color: "#6B5B4B", lineHeight: 1.7 }}>
            These flowers tune the AI's tone — not its accessibility mode, but its emotional register.
            Calm, empathy, motivation, precision, grounding, simplicity, balance, persuasion, analysis,
            enrichment, reassurance, structure. Say the flower name. The AI adjusts.
          </p>

          {/* Infographic */}
          <div className="mb-10 rounded-2xl overflow-hidden shadow-md" style={{ border: "2px solid #e8e0d0" }}>
            <LightboxImage src={IMG.essenceModulation} alt="Essence Modulation — 12 flowers for tone tuning" className="w-full" />
          </div>

          {/* Interactive Essence Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            {essenceModulations.map((essence, i) => (
              <button
                key={essence.name}
                onClick={() => {
                  const next = selectedEssence === i ? null : i;
                  setSelectedEssence(next);
                  if (next !== null) {
                    setTimeout(() => {
                      document.getElementById('essence-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 80);
                  }
                }}
                className="rounded-2xl p-4 text-center transition-all duration-200 hover:scale-105"
                style={{
                  background: selectedEssence === i ? essence.bgColor : "#fff",
                  border: selectedEssence === i ? `2px solid ${essence.color}` : "2px solid #e8e0d0",
                  boxShadow: selectedEssence === i ? `0 4px 20px ${essence.color}30` : "none",
                }}
              >
                <div className="text-3xl mb-2">{essence.flower}</div>
                <div className="font-bold text-xs" style={{ color: essence.color }}>{essence.name}</div>
                <div className="text-[10px] mt-1" style={{ color: "#8a7a6a" }}>{essence.function}</div>
              </button>
            ))}
          </div>

          {/* Selected Essence Detail */}
          {selectedEssence !== null && (
            <div
              id="essence-detail"
              className="rounded-2xl p-6 md:p-8 mb-6 transition-all duration-300"
              style={{
                background: essenceModulations[selectedEssence].bgColor,
                border: `2px solid ${essenceModulations[selectedEssence].color}`,
                scrollMarginTop: '80px',
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{essenceModulations[selectedEssence].flower}</div>
                <div>
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: "'Playfair Display', serif", color: essenceModulations[selectedEssence].color }}
                  >
                    {essenceModulations[selectedEssence].name}
                  </h3>
                  <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#6B5B4B" }}>
                    {essenceModulations[selectedEssence].function}
                  </div>
                </div>
              </div>
              <p className="text-sm" style={{ color: "#3a2a1a", lineHeight: 1.7 }}>
                {essenceModulations[selectedEssence].description}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* The Spectrum — Full Rewriting System */}
      <section className="py-16 px-6" style={{ background: "#FFFDF8" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold text-center" style={{ color: "#E8520A" }}>
            The Complete System
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-3 text-center"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A2E" }}
          >
            The 12-Essence Spectrum
          </h2>
          <p className="text-sm mb-8 text-center max-w-2xl mx-auto" style={{ color: "#6B5B4B", lineHeight: 1.7 }}>
            The same input, rewritten through all 12 essences. This is what tone modulation looks like
            when applied systematically. The content stays the same. The voice changes everything.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: "2px solid #e8e0d0" }}>
            <LightboxImage src={IMG.essenceSpectrum} alt="The 12-Essence Spectrum — complete document rewriting system" className="w-full" />
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16 px-6" style={{ background: "#1A1A2E" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold" style={{ color: "#D4AC0D" }}>
            How to Use
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-8"
            style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8EE" }}
          >
            Three steps. Any AI. Free forever.
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Pick a flower",
                desc: "Choose the accessibility preset that matches your need — or the essence that matches your mood. You can combine two.",
              },
              {
                step: "2",
                title: "Copy the Token Zero",
                desc: "Each preset has a Token Zero — a few lines that tell the AI how to behave. Copy it. Paste it at the very start of your conversation.",
              },
              {
                step: "3",
                title: "Talk to the AI",
                desc: "The AI will adjust its behavior to match the flower. If it drifts, paste the Token Zero again. The flower is the leash.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 items-start">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{ background: "#D4AC0D", color: "#1A1A2E" }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: "#FFF8EE", fontFamily: "'Playfair Display', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#B8A080", lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-5 rounded-xl" style={{ background: "#2A2A3E", border: "1px solid #3A3A4E" }}>
            <p className="text-xs italic" style={{ color: "#8a7a6a", lineHeight: 1.7 }}>
              Note: You can combine one accessibility preset with one essence modulation.
              For example, <strong style={{ color: "#D4AC0D" }}>Amaryllis + Lavender</strong> gives you ADHD-focused structure
              with a calm tone. Paste both Token Zeros at the start.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-12 px-6" style={{ background: "#FAF6EF" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-6 font-semibold" style={{ color: "#E8520A" }}>
            Continue
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Framework Families", desc: "See all six framework families", path: "/frameworks" },
              { label: "Promptolinguistics", desc: "How words steer AI behavior", path: "/promptolinguistics" },
              { label: "Living Lexicon", desc: "Every term defined", path: "/lexicon" },
              { label: "The Builder", desc: "Who built this and why", path: "/builder" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block rounded-2xl p-5 no-underline transition-all duration-200 hover:shadow-md"
                style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}
              >
                <div className="font-bold text-sm mb-1" style={{ color: "#1A1A2E", fontFamily: "'Playfair Display', serif" }}>
                  {link.label} →
                </div>
                <div className="text-xs" style={{ color: "#8a7a6a" }}>{link.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LearningFlow current="Flower Presets" deeper={flowMap.flowerPresets.deeper} wider={flowMap.flowerPresets.wider} simpler={flowMap.flowerPresets.simpler} />
      <Footer />
    </div>
  );
}
