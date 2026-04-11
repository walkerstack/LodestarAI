/*
 * GALLANTRYAI — Promptolinguistics
 * Design: Professional/Dark hybrid register
 * The study of language as a control mechanism in human-AI interaction.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD";

const wordRoles = [
  {
    role: "Direction",
    examples: ["analyze", "describe", "compare", "explain"],
    desc: "Words that tell the AI which direction to move. The compass heading of the prompt.",
    color: "border-[#E8520A]",
  },
  {
    role: "Constraint",
    examples: ["only", "never", "limit", "exclude"],
    desc: "Words that build walls. They define what the AI cannot do in this session.",
    color: "border-[#2A9D8F]",
  },
  {
    role: "Scope",
    examples: ["briefly", "in depth", "at a high level", "step by step"],
    desc: "Words that set the zoom level. How wide or how narrow the lens.",
    color: "border-blue-500",
  },
  {
    role: "Authority",
    examples: ["you are", "act as", "your role is", "I am in charge"],
    desc: "Words that establish who is who. The human's authority signal. The AI's role assignment.",
    color: "border-purple-500",
  },
];

export default function Promptolinguistics() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />

      <main className="flex-1 container py-12">
        {/* Header */}
        <div className="section-label mb-2">The Discipline</div>
        <h1
          className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Promptolinguistics
        </h1>
        <p className="text-base text-[#2D2D2D] max-w-xl mb-2 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          The study of how language functions as a control mechanism in human-AI interaction. Words don't just ask — they steer.
        </p>
        <p className="text-sm text-[#888] italic mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
          "Every word you type is a dial. Promptolinguistics teaches you what each dial does."
        </p>

        {/* ALCM Visual */}
        <div className="mb-12">
          <div className="section-label mb-3">Atomic Language Control Model</div>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <p className="text-sm text-[#2D2D2D] leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The ALCM maps individual words to their functional roles in a prompt. It is the core tool of promptolinguistics — a way of seeing language not as meaning alone, but as mechanism.
              </p>
              <p className="text-sm text-[#2D2D2D] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Four roles. Four types of control. Every word in your prompt is doing one of these jobs — whether you know it or not.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden border border-[#e8e0d0]">
              <img
                src={`${CDN}/1000005693_e894b781.jpg`}
                alt="Atomic Language Control Model"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Word Roles */}
        <div className="mb-12">
          <div className="section-label mb-4">The Four Roles</div>
          <div className="grid md:grid-cols-2 gap-4">
            {wordRoles.map((role) => (
              <div key={role.role} className={`border-l-4 pl-4 py-3 ${role.color} bg-white border border-[#e8e0d0] rounded-r-lg`}>
                <h3 className="font-bold text-[#1A1A2E] text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {role.role}
                </h3>
                <p className="text-xs text-[#888] mb-2 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {role.desc}
                </p>
                <div className="flex flex-wrap gap-1">
                  {role.examples.map((ex) => (
                    <span key={ex} className="text-[10px] bg-[#FAF6EF] border border-[#e8e0d0] px-2 py-0.5 rounded font-mono text-[#2D2D2D]">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playground placeholder */}
        <div className="mb-12">
          <div className="section-label mb-3">AI Playground</div>
          <div className="bg-[#1A1A2E] rounded-lg p-8 text-center">
            <div className="text-[#E8520A] font-bold text-sm uppercase tracking-wide mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Coming Soon
            </div>
            <h3 className="text-[#FAF6EF] text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Promptolinguistics Playground
            </h3>
            <p className="text-[#aaa] text-sm max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              An interactive space to test word roles, observe register drift, and practice the ALCM in real time. The AI assistant will be embedded here.
            </p>
          </div>
        </div>

        {/* RLHF vs GallantryAI */}
        <div>
          <div className="section-label mb-3">How This Differs</div>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <h3 className="font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                RLHF vs. GallantryAI
              </h3>
              <p className="text-sm text-[#2D2D2D] leading-relaxed mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                RLHF (Reinforcement Learning from Human Feedback) places governance inside the model. GallantryAI places governance inside the human. The difference is not technical — it is philosophical.
              </p>
              <p className="text-sm italic text-[#E8520A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                "Governance does not reside in the prompt. It resides in the person holding the prompt."
              </p>
            </div>
            <div className="rounded-lg overflow-hidden border border-[#e8e0d0]">
              <img
                src={`${CDN}/1000005860_c6f6c0a8.jpg`}
                alt="RLHF vs GallantryAI"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
