/*
 * PROMPTOLOGY PLAYGROUND — Coming Soon
 * Design: Dark editorial register. Three audience descriptions.
 * Placeholder page until interactive playground is built.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useEffect } from "react";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import KidsMidLink from "@/components/KidsMidLink";

const audiences = [
  {
    label: "Everyday Person",
    color: "#E8520A",
    icon: "👋",
    desc: "A safe space to practice asking AI questions — with guardrails, examples, and gentle feedback. No jargon. No pressure. Just honest questions and honest answers.",
    path: "/for/everyday",
  },
  {
    label: "Teacher or Guardian",
    color: "#2A9D8F",
    icon: "🏫",
    desc: "A classroom-ready tool for teaching prompt literacy. See how word choice changes AI responses in real time. Demonstrate drift, register, and the Five Rules through live examples.",
    path: "/for/guardian-teacher",
  },
  {
    label: "Professional or Researcher",
    color: "#6366F1",
    icon: "⚙️",
    desc: "Test the ALCM in action. Observe Token Zero force profiles, control axis behavior, HOLD dial mechanics, and register drift across multiple AI models. The lab bench for Promptolinguistics.",
    path: "/for/researcher",
  },
];

export default function Playground() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <KidsRedirect story={kidsBlurbs["/playground"].story} quote={kidsBlurbs["/playground"].quote} attribution={kidsBlurbs["/playground"].attribution} />

      {/* Hero */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/95 to-[#1A1A1A]" />
        <div className="container relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p
            className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Coming Soon
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-[#FAF6EF] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Promptology Playground
          </h1>
          <p
            className="text-lg text-[#b0a898] leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            An interactive space to practice prompt literacy — test word roles, observe register drift, and learn the ALCM through doing.
          </p>
        </div>
      </section>

      {/* Three audiences */}
      <section className="py-12 px-6">
        <div className="container max-w-3xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
            style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}
          >
            Three Doors
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: "#f5e6d0" }}
          >
            Who is the Playground for?
          </h2>
          <p
            className="text-sm mb-10 max-w-lg"
            style={{ color: "#6b5a3e", fontFamily: "'DM Sans', sans-serif" }}
          >
            The same tool, three different entry points. Each designed for a different level of familiarity.
          </p>

          <div className="space-y-6">
            {audiences.map((a, i) => (
              <div
                key={i}
                className="rounded-2xl p-6"
                style={{
                  background: "#0f0c08",
                  border: `1px solid ${a.color}30`,
                  borderLeftWidth: "4px",
                  borderLeftColor: a.color,
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{a.icon}</span>
                  <div>
                    <h3
                      className="font-bold text-lg mb-2"
                      style={{ color: a.color, fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {a.label}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{ color: "#9a8a7a", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {a.desc}
                    </p>
                    <Link
                      href={a.path}
                      className="inline-flex items-center gap-1 text-xs font-semibold no-underline hover:underline transition-colors"
                      style={{ color: a.color, fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Visit the {a.label} Lens →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        <KidsMidLink />


      {/* What it will include */}
      <section className="py-12 px-6" style={{ borderTop: "1px solid #1a1610" }}>
        <div className="container max-w-3xl mx-auto">
          <h2
            className="text-xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: "#f5e6d0" }}
          >
            What the Playground will include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Word Role Tester", desc: "Type a word. See its role as anchor, lens, or dial." },
              { title: "Register Drift Detector", desc: "Watch how your prompt's register shifts as you add or remove words." },
              { title: "ALCM Visualizer", desc: "See the Atomic Language Control Model respond to your input in real time." },
              { title: "HOLD Dial Practice", desc: "Practice setting the HOLD dial — from open exploration to locked constraint." },
              { title: "Prompt Comparison", desc: "Compare two prompts side by side and see how the AI response changes." },
              { title: "Guided Exercises", desc: "Step-by-step exercises for each scaffold level, from Floor to Ceiling." },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{ background: "#0f0c08", border: "1px solid #1a1610" }}
              >
                <div
                  className="font-semibold text-sm mb-1"
                  style={{ color: "#f5e6d0", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.title}
                </div>
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: "#6b5a3e", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="py-12 px-6" style={{ borderTop: "1px solid #1a1610" }}>
        <div className="container max-w-3xl mx-auto text-center">
          <div
            className="inline-block rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider mb-4"
            style={{ background: "#E8520A", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}
          >
            Under Construction
          </div>
          <p
            className="text-sm leading-relaxed max-w-md mx-auto mb-6"
            style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif" }}
          >
            The Playground is being built by the same person who built everything else on this site — one honest question at a time. It will be ready when it is ready.
          </p>

          {/* Cross-links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-xl mx-auto">
            {[
              { label: "Promptolinguistics", path: "/promptolinguistics" },
              { label: "The Five Rules", path: "/rules" },
              { label: "Prompt Games", path: "/prompt-games" },
              { label: "Living Lexicon", path: "/lexicon" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block p-3 rounded-xl border border-[#333] bg-[#222] text-center text-xs text-[#c8bfb0] hover:border-[#E8520A]/50 hover:text-[#FAF6EF] transition-all no-underline"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: "#1A1A1A" }}>
        <Footer />
      </div>
    </div>
  );
}
