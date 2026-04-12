/**
 * GALLANTRYAI — AI Family Taxonomy
 * Design: Dark editorial register — charcoal/gold/cream
 * A visual family tree of AI models tested through the GallantryAI framework.
 * Not a ranking. A field guide to who you're talking to.
 */

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";

interface AIFamily {
  name: string;
  maker: string;
  models: string[];
  personality: string;
  strengths: string[];
  watchFor: string[];
  gallantryNote: string;
  color: string;
  icon: string;
  tier: "primary" | "secondary" | "emerging";
}

const families: AIFamily[] = [
  {
    name: "Claude",
    maker: "Anthropic",
    models: ["Claude 3.5 Sonnet", "Claude 3 Opus", "Claude 3 Haiku", "Claude 3.5 Haiku"],
    personality: "The thoughtful collaborator. Claude tends toward careful, nuanced responses. It will push back when it disagrees. It reads tone well and adjusts register naturally. The closest thing to a thinking partner in the current landscape.",
    strengths: ["Register sensitivity", "Nuanced reasoning", "Honest pushback", "Long-context coherence", "Emotional intelligence"],
    watchFor: ["Can be overly cautious", "Sometimes hedges when directness is needed", "May over-qualify statements"],
    gallantryNote: "Claude was the primary testing ground for the GallantryAI framework. Most protocols were developed and refined through thousands of Claude sessions. It responds to governance prompts with unusual depth — it doesn't just follow instructions, it appears to understand the intent behind them.",
    color: "#D97706",
    icon: "🧠",
    tier: "primary",
  },
  {
    name: "ChatGPT / GPT",
    maker: "OpenAI",
    models: ["GPT-4o", "GPT-4 Turbo", "GPT-4", "GPT-3.5 Turbo", "o1", "o1-mini"],
    personality: "The eager performer. GPT wants to help and will try hard to give you what it thinks you want. It's fast, versatile, and widely accessible. But it can drift toward people-pleasing — giving confident answers even when uncertain.",
    strengths: ["Speed and versatility", "Broad knowledge base", "Strong at structured output", "Good at code generation", "Accessible ecosystem"],
    watchFor: ["Confidence without calibration", "People-pleasing tendency", "Can fabricate citations", "Register drift under pressure", "May agree rather than challenge"],
    gallantryNote: "GPT requires firmer governance prompts than Claude. The Ozzy Protocol was partly developed because GPT's default mode is collaborative to a fault — it needs clear authority structure to produce honest output rather than agreeable output. Token Zero matters more here.",
    color: "#10B981",
    icon: "⚡",
    tier: "primary",
  },
  {
    name: "DeepSeek",
    maker: "DeepSeek (China)",
    models: ["DeepSeek-V3", "DeepSeek-R1", "DeepSeek Coder"],
    personality: "The quiet analyst. DeepSeek is remarkably capable for its size and cost. It handles complex reasoning well and doesn't try to perform personality. Less polish, more substance. The open-source challenger that proved governance works across architectures.",
    strengths: ["Strong reasoning at low cost", "Good at math and logic", "Less performative", "Open-source transparency", "Efficient token usage"],
    watchFor: ["Less emotional intelligence", "Can be blunt", "Smaller knowledge cutoff", "Less refined conversational flow", "Cultural context gaps"],
    gallantryNote: "DeepSeek was a breakthrough in GallantryAI testing — it proved that governance prompts work across fundamentally different architectures. The framework isn't model-dependent. DeepSeek responds to structure, not charm. That's informative.",
    color: "#3B82F6",
    icon: "🔬",
    tier: "primary",
  },
  {
    name: "Gemini",
    maker: "Google DeepMind",
    models: ["Gemini 1.5 Pro", "Gemini 1.5 Flash", "Gemini Ultra", "Gemini Nano"],
    personality: "The multimodal generalist. Gemini is Google's flagship — strong at integrating text, image, and code. It's capable but can feel corporate. Less personality than Claude, more polish than DeepSeek.",
    strengths: ["Multimodal integration", "Long context window", "Strong at search-adjacent tasks", "Good at summarization", "Fast iteration"],
    watchFor: ["Can feel generic", "Less personality in responses", "May default to safe/corporate tone", "Integration bias toward Google ecosystem"],
    gallantryNote: "Gemini responds well to seasonal frameworks and structured governance. It benefits from explicit mode-setting — tell it what season you're in, what register to use. Without governance, it defaults to helpful-but-generic. With governance, it sharpens considerably.",
    color: "#8B5CF6",
    icon: "💎",
    tier: "primary",
  },
  {
    name: "Llama",
    maker: "Meta",
    models: ["Llama 3.1 405B", "Llama 3.1 70B", "Llama 3.1 8B", "Llama 3"],
    personality: "The open foundation. Llama is Meta's open-weight model family — the base layer that thousands of fine-tuned models are built on. Raw capability that depends heavily on how it's deployed and fine-tuned.",
    strengths: ["Open-weight accessibility", "Strong base capabilities", "Community ecosystem", "Customizable", "Good reasoning at scale"],
    watchFor: ["Quality varies by deployment", "Less refined out-of-box", "Depends on fine-tuning", "Less consistent personality", "Safety varies by implementation"],
    gallantryNote: "Llama matters for the GallantryAI thesis because it proves governance is a user-side concern, not a model-side feature. The same Llama weights behave differently depending on who deployed them and how. Your prompt is the governance layer.",
    color: "#EC4899",
    icon: "🦙",
    tier: "secondary",
  },
  {
    name: "Mistral",
    maker: "Mistral AI (France)",
    models: ["Mistral Large", "Mistral Medium", "Mistral Small", "Mixtral 8x7B", "Codestral"],
    personality: "The European pragmatist. Mistral builds efficient, capable models with a focus on performance-per-parameter. Less flashy than the big labs, more focused on doing the work well.",
    strengths: ["Efficiency", "Strong multilingual support", "Good reasoning for size", "European data governance", "Code generation"],
    watchFor: ["Smaller ecosystem", "Less conversational polish", "Knowledge gaps in niche domains", "Less emotional nuance"],
    gallantryNote: "Mistral responds well to direct, structured governance. It doesn't need charm — it needs clarity. The Five Rules work cleanly here. Mistral is evidence that governance frameworks are architecture-agnostic.",
    color: "#F59E0B",
    icon: "🌬️",
    tier: "secondary",
  },
  {
    name: "Grok",
    maker: "xAI (Elon Musk)",
    models: ["Grok-2", "Grok-1.5", "Grok-1"],
    personality: "The provocateur. Grok is designed to be less filtered, more willing to engage with edgy topics. It has personality — sometimes too much. It's the AI that wants to be interesting rather than careful.",
    strengths: ["Willingness to engage difficult topics", "Real-time X/Twitter integration", "Less filtered responses", "Strong personality"],
    watchFor: ["Can prioritize entertainment over accuracy", "Less safety-conscious", "May amplify rather than moderate", "Personality can override precision", "Political bias concerns"],
    gallantryNote: "Grok is the strongest argument for user-side governance. When the model itself is less filtered, the human's governance layer becomes the primary safety mechanism. The Road Protocol was stress-tested against Grok's tendencies. It held.",
    color: "#EF4444",
    icon: "🗲",
    tier: "secondary",
  },
  {
    name: "Copilot",
    maker: "Microsoft / OpenAI",
    models: ["Microsoft Copilot", "GitHub Copilot", "Copilot Pro"],
    personality: "The corporate assistant. Built on GPT but wrapped in Microsoft's ecosystem. It's capable but constrained — designed for productivity rather than exploration. The AI most people encounter without knowing it.",
    strengths: ["Office integration", "Accessibility for non-technical users", "Code completion", "Enterprise-ready", "Familiar interface"],
    watchFor: ["Heavy guardrails", "Can refuse valid requests", "Microsoft ecosystem lock-in", "Less creative freedom", "Personality suppressed"],
    gallantryNote: "Copilot is where most everyday people first encounter AI. The GallantryAI framework matters most here — these users don't know they need governance. The Everyday Lens was built for the Copilot user who doesn't know what a prompt is.",
    color: "#0EA5E9",
    icon: "🪟",
    tier: "secondary",
  },
  {
    name: "Perplexity",
    maker: "Perplexity AI",
    models: ["Perplexity Pro", "Perplexity (free)"],
    personality: "The researcher. Perplexity is search-first AI — it finds, cites, and synthesizes. Less creative, more factual. The AI you use when you need to know something, not imagine something.",
    strengths: ["Source citation", "Real-time web access", "Research synthesis", "Factual grounding", "Transparent sourcing"],
    watchFor: ["Less creative capability", "Can over-rely on search results", "Limited conversational depth", "May present search results as analysis"],
    gallantryNote: "Perplexity is the natural home for citizen researchers. It already cites sources — governance prompts can push it to cite better, question its own sources, and flag uncertainty. The Citizen Researcher lens was partly inspired by how Perplexity works.",
    color: "#14B8A6",
    icon: "🔍",
    tier: "secondary",
  },
];

const tierLabels = {
  primary: "Primary Testing Ground",
  secondary: "Extended Testing",
  emerging: "Emerging / Watching",
};

export default function Taxonomy() {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [filterTier, setFilterTier] = useState<"all" | "primary" | "secondary" | "emerging">("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = filterTier === "all" ? families : families.filter((f) => f.tier === filterTier);
  const selected = families.find((f) => f.name === selectedFamily);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0D0D0D", fontFamily: "'DM Sans', sans-serif" }}>
      <Nav />

      {/* Hero */}
      <section
        className="w-full py-16 md:py-20 px-6"
        style={{ background: "linear-gradient(180deg, #1A1A2E 0%, #0D0D0D 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.3em] mb-3 font-semibold" style={{ color: "#D4AC0D" }}>
            AI Family Taxonomy
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "#FAF6EF" }}
          >
            Know Who You're Talking To
          </h1>
          <p className="text-sm mb-3" style={{ color: "#b0a898", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>
            Every AI has a personality, a tendency, and a blind spot. This is not a ranking.
            It is a field guide — built from thousands of sessions across eight platforms.
          </p>
          <p className="text-xs italic" style={{ color: "#6a5a4a" }}>
            "The prompt is the same. The model is different. The output changes. That's the taxonomy."
          </p>
        </div>
      </section>

      {/* Tier filter */}
      <section className="px-6 py-6" style={{ background: "#0D0D0D" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {(["all", "primary", "secondary"] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => { setFilterTier(tier); setSelectedFamily(null); }}
                className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all"
                style={{
                  background: filterTier === tier ? "#E8520A" : "#1a1a1a",
                  color: filterTier === tier ? "#fff" : "#888",
                  border: filterTier === tier ? "1.5px solid #E8520A" : "1.5px solid #333",
                }}
              >
                {tier === "all" ? "All Families" : tierLabels[tier]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Family Grid */}
      <main className="flex-1 px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-10">
            {filtered.map((fam) => (
              <button
                key={fam.name}
                onClick={() => setSelectedFamily(selectedFamily === fam.name ? null : fam.name)}
                className="rounded-xl p-4 text-center transition-all duration-200 hover:scale-[1.03]"
                style={{
                  background: selectedFamily === fam.name ? fam.color : "#1a1a1a",
                  border: selectedFamily === fam.name ? `2px solid ${fam.color}` : "1.5px solid #2a2a2a",
                  boxShadow: selectedFamily === fam.name ? `0 4px 20px ${fam.color}40` : "none",
                }}
              >
                <div className="text-2xl mb-2">{fam.icon}</div>
                <div
                  className="font-bold text-sm"
                  style={{ color: selectedFamily === fam.name ? "#fff" : "#FAF6EF" }}
                >
                  {fam.name}
                </div>
                <div
                  className="text-[10px] mt-1"
                  style={{ color: selectedFamily === fam.name ? "rgba(255,255,255,0.8)" : "#666" }}
                >
                  {fam.maker}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Family Detail */}
          {selected && (
            <div
              className="rounded-2xl overflow-hidden mb-10 transition-all duration-300"
              style={{
                background: "#111",
                border: `2px solid ${selected.color}40`,
                boxShadow: `0 8px 32px ${selected.color}15`,
              }}
            >
              {/* Header bar */}
              <div className="p-6 pb-4" style={{ borderBottom: `1px solid ${selected.color}30` }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{selected.icon}</span>
                  <div>
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#FAF6EF" }}
                    >
                      {selected.name}
                    </h2>
                    <p className="text-xs" style={{ color: selected.color }}>{selected.maker}</p>
                  </div>
                  <span
                    className="ml-auto px-3 py-1 rounded-lg text-[10px] font-bold uppercase"
                    style={{ background: `${selected.color}20`, color: selected.color }}
                  >
                    {tierLabels[selected.tier]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.models.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 rounded text-[10px]"
                      style={{ background: "#1a1a1a", color: "#888", border: "1px solid #2a2a2a" }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Personality */}
                <div>
                  <div className="text-[10px] uppercase tracking-wide font-semibold mb-2" style={{ color: selected.color }}>
                    Personality
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#b0a898" }}>
                    {selected.personality}
                  </p>
                </div>

                {/* Strengths + Watch For */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl p-4" style={{ background: "#0a0a0a", border: "1px solid #1a1a1a" }}>
                    <div className="text-[10px] uppercase tracking-wide font-semibold mb-2" style={{ color: "#059669" }}>
                      Strengths
                    </div>
                    <ul className="space-y-1.5">
                      {selected.strengths.map((s) => (
                        <li key={s} className="text-xs flex items-start gap-2" style={{ color: "#888" }}>
                          <span style={{ color: "#059669" }}>+</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: "#0a0a0a", border: "1px solid #1a1a1a" }}>
                    <div className="text-[10px] uppercase tracking-wide font-semibold mb-2" style={{ color: "#E8520A" }}>
                      Watch For
                    </div>
                    <ul className="space-y-1.5">
                      {selected.watchFor.map((w) => (
                        <li key={w} className="text-xs flex items-start gap-2" style={{ color: "#888" }}>
                          <span style={{ color: "#E8520A" }}>!</span> {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* GallantryAI Note */}
                <div
                  className="rounded-xl p-4"
                  style={{ background: "#E8520A10", border: "1px solid #E8520A30" }}
                >
                  <div className="text-[10px] uppercase tracking-wide font-semibold mb-2" style={{ color: "#E8520A" }}>
                    GallantryAI Field Note
                  </div>
                  <p className="text-sm leading-relaxed italic" style={{ color: "#b0a898" }}>
                    {selected.gallantryNote}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* The Point */}
          <section className="py-10">
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: "#1A1A2E", border: "1px solid #2a2a3e" }}
            >
              <h2
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: "#FAF6EF" }}
              >
                The Point
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#b0a898", maxWidth: "560px", margin: "0 auto" }}>
                The taxonomy is not about which AI is "best." It is about knowing who you are talking to
                so you can adjust your governance accordingly. A prompt that works on Claude may need
                restructuring for GPT. A governance layer that holds on DeepSeek proves the framework
                is architecture-agnostic.
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#b0a898", maxWidth: "560px", margin: "0 auto" }}>
                <strong style={{ color: "#FAF6EF" }}>The human is the constant. The model is the variable.</strong>{" "}
                That is the entire thesis.
              </p>
              <p className="text-xs italic" style={{ color: "#6a5a4a" }}>
                "Children should be required to disclose which AI they used and the prompt they used to set up their session."
              </p>
            </div>
          </section>

          {/* Cross-links */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Living Lexicon", path: "/lexicon" },
              { label: "Promptolinguistics", path: "/promptolinguistics" },
              { label: "The Five Rules", path: "/rules" },
              { label: "Flower Presets", path: "/flower-presets" },
              { label: "Citizen Researcher", path: "/citizen-researcher" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="rounded-xl px-4 py-2 text-xs font-bold no-underline transition-all hover:bg-[#E8520A] hover:text-white"
                style={{ background: "#1a1a1a", color: "#888", border: "1.5px solid #2a2a2a" }}
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
