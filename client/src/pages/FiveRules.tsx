/*
 * THE FIVE RULES — Interactive with Sloth Examples
 * Design: Dark to match homepage. Orange accents.
 * When a rule is tapped, the sloth appears with examples and advice.
 * Adult and child versions side by side.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useState, useEffect } from "react";

const SLOTH_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008840_5b1a6230.png";

const rules = [
  {
    number: 1,
    adult: "Safety first \u2014 nothing moves without it.",
    child: "Is it safe? If you\u2019re not sure, stop and ask a grown-up.",
    why: "Every interaction begins here. Before speed, before intelligence, before output \u2014 is it safe? If the answer is not clearly yes, nothing else matters.",
    slothSays: "Hey! Before you type anything, the sloth wants you to think about this\u2026",
    slothExamples: [
      { scenario: "You\u2019re asking AI to help with a medical question", advice: "AI can give general info, but it is NOT a doctor. If it\u2019s serious, talk to a real person. The AI should tell you that too \u2014 if it doesn\u2019t, that\u2019s a red flag." },
      { scenario: "Your kid asks AI something and it gives a weird answer", advice: "Stop the session. Don\u2019t scroll past it. Ask: \u201CWhy did it say that?\u201D The answer might be fine \u2014 but the question is what matters." },
      { scenario: "AI suggests something that makes you uncomfortable", advice: "Trust that feeling. Close the session. You are allowed to stop at any time. The AI does not have feelings about it." },
    ],
    slothTip: "If it doesn\u2019t feel safe, it isn\u2019t. Your gut is a valid sensor.",
  },
  {
    number: 2,
    adult: "Honesty over confidence \u2014 clarity beats sounding right.",
    child: "Does it sound true? Or does it just sound smart?",
    why: "AI can sound confident about anything. Confidence is not evidence. The rule is simple: if it sounds right but you cannot verify it, treat it as unverified.",
    slothSays: "The sloth has seen AI say very smart-sounding things that were completely wrong\u2026",
    slothExamples: [
      { scenario: "AI writes a paragraph with a statistic in it", advice: "Ask: \u201CWhere did that number come from?\u201D If the AI can\u2019t give you a real source, the number might be made up. This happens more than you think." },
      { scenario: "AI confidently explains something you\u2019re not sure about", advice: "Try asking the same question a different way. If the answer changes significantly, the first answer wasn\u2019t reliable. That\u2019s the honesty test." },
      { scenario: "A student uses AI for homework and it sounds perfect", advice: "Ask the student: \u201CCan you explain this in your own words?\u201D If they can\u2019t, the AI did the thinking. That\u2019s not learning." },
    ],
    slothTip: "Sounding right and being right are two different things. The sloth always double-checks.",
  },
  {
    number: 3,
    adult: "Trust is earned \u2014 never assumed.",
    child: "Did the AI earn your trust? Or did you just give it away?",
    why: "Trust is built through consistent, verifiable behavior over time. A new session starts at zero. A new model starts at zero. Trust is not a setting \u2014 it is a result.",
    slothSays: "The sloth doesn\u2019t trust anyone on the first day. Not even other sloths\u2026",
    slothExamples: [
      { scenario: "You switch from ChatGPT to Claude mid-project", advice: "The new AI doesn\u2019t know what the old one said. It starts at zero. Re-establish your rules, your context, your intent. Don\u2019t assume it \u201Cgets it.\u201D" },
      { scenario: "AI gives you three good answers in a row", advice: "Good. But three is not a pattern yet. Keep checking. Trust is built over sessions, not sentences." },
      { scenario: "Someone says \u201CJust use AI, it\u2019s always right now\u201D", advice: "It\u2019s not. It\u2019s better than it was. But \u201Cbetter\u201D is not \u201Ccorrect.\u201D The person who stops checking is the person who gets burned." },
    ],
    slothTip: "Trust is a ladder. You climb it one rung at a time. There are no elevators.",
  },
  {
    number: 4,
    adult: "Agency stays with the human \u2014 always.",
    child: "You\u2019re the boss. The AI helps. You decide.",
    why: "The human decides. The human corrects. The human owns the output. AI is a thinking partner, not a decision maker. If you feel the AI is leading and you are following, reverse it.",
    slothSays: "The sloth is very clear about this one. YOU are in charge. Always\u2026",
    slothExamples: [
      { scenario: "AI keeps suggesting next steps without you asking", advice: "Pause. Did you ask for next steps? Or did the AI decide you needed them? If it\u2019s leading, take the wheel back. Say: \u201CStop. I\u2019ll tell you what\u2019s next.\u201D" },
      { scenario: "You realize you\u2019ve been saying \u201Cyes\u201D to everything AI suggests", advice: "That\u2019s the drift. The AI is not wrong for suggesting \u2014 you\u2019re the one who stopped questioning. Reset. Ask yourself: \u201CIs this what I actually wanted?\u201D" },
      { scenario: "A child says \u201Cthe AI told me to do it this way\u201D", advice: "Perfect teaching moment. Ask: \u201CDid you tell the AI what you wanted? Or did you let it choose for you?\u201D The answer reveals who was driving." },
    ],
    slothTip: "If the AI is driving and you\u2019re in the passenger seat, you\u2019re not using AI. It\u2019s using you.",
  },
  {
    number: 5,
    adult: "Name drift. Correct it. Keep the loop open.",
    child: "If the AI starts going weird, say so. Don\u2019t just follow it.",
    why: "Drift is when the AI gradually moves away from your intent without you noticing. It is the most common failure mode. The fix is simple: notice it, name it, correct it.",
    slothSays: "Drift is sneaky. The sloth has watched it happen to very smart people\u2026",
    slothExamples: [
      { scenario: "You asked about cooking and now AI is talking about chemistry", advice: "That\u2019s drift. It\u2019s not wrong \u2014 cooking IS chemistry \u2014 but it left your intent. Say: \u201CWe drifted. Back to the recipe.\u201D Simple. Powerful." },
      { scenario: "Your AI session started helpful but now feels off", advice: "Check the last 5 messages. Where did it turn? That\u2019s the drift point. Name it: \u201CThe session shifted here. Let\u2019s go back.\u201D You just governed yourself." },
      { scenario: "AI starts adding things you didn\u2019t ask for", advice: "That\u2019s embellishment drift. The AI is trying to be helpful by adding more. But more is not better. Say: \u201COnly what I asked for. Nothing extra.\u201D" },
    ],
    slothTip: "The moment you notice the drift is the moment you\u2019re back in control. Noticing IS the skill.",
  },
];

export default function FiveRules() {
  const [expandedRule, setExpandedRule] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen" style={{ background: '#080604' }}>
      <Nav />

      {/* Hero */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            The Leash
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            The Five Rules
          </h1>
          <p
            className="text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: '#6b5a3e', fontFamily: "'DM Sans', sans-serif" }}
          >
            Earned, not invented. These showed up through frustration, failure, and noticing the same mistakes repeat. They are simple because they have to be.
          </p>
          <p
            className="text-sm mt-4 italic"
            style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}
          >
            Tap any rule. The sloth has examples.
          </p>
        </div>
      </section>

      {/* Rules */}
      <section className="pb-16 md:pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {rules.map((rule) => {
            const isOpen = expandedRule === rule.number;
            return (
              <div
                key={rule.number}
                className="rounded-2xl overflow-hidden transition-all"
                style={{
                  background: '#0f0c08',
                  border: isOpen ? '2px solid #E8520A' : '1px solid #1a1610',
                }}
              >
                {/* Rule header — clickable */}
                <button
                  onClick={() => setExpandedRule(isOpen ? null : rule.number)}
                  className="w-full text-left"
                >
                  {/* Number bar */}
                  <div
                    className="px-6 py-3 flex items-center gap-3"
                    style={{ background: isOpen ? '#E8520A' : '#0a0804' }}
                  >
                    <span
                      className="font-bold text-lg"
                      style={{
                        color: isOpen ? '#fff' : '#E8520A',
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {rule.number}
                    </span>
                    <div
                      className="w-8 h-px"
                      style={{ background: isOpen ? 'rgba(255,255,255,0.4)' : 'rgba(232,82,10,0.4)' }}
                    />
                    <span
                      className="ml-auto text-sm transition-transform duration-200"
                      style={{
                        color: isOpen ? '#fff' : '#5a4a3a',
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    >
                      {"\u2192"}
                    </span>
                  </div>

                  <div className="p-6 md:p-8">
                    {/* Two columns: adult and child */}
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <p
                          className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-2"
                          style={{ color: '#6b5a3e', fontFamily: "'DM Sans', sans-serif" }}
                        >
                          Adult Version
                        </p>
                        <p
                          className="text-base font-semibold leading-relaxed"
                          style={{ color: '#f5e6d0', fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {rule.adult}
                        </p>
                      </div>
                      <div className="md:border-l md:pl-6" style={{ borderColor: '#1a1610' }}>
                        <p
                          className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-2"
                          style={{ color: '#6b5a3e', fontFamily: "'DM Sans', sans-serif" }}
                        >
                          Child Version
                        </p>
                        <p
                          className="text-base leading-relaxed italic"
                          style={{ color: '#9a8a7a', fontFamily: "'Playfair Display', serif" }}
                        >
                          {rule.child}
                        </p>
                      </div>
                    </div>

                    {/* Why */}
                    <div className="pt-4" style={{ borderTop: '1px solid #1a1610' }}>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {rule.why}
                      </p>
                    </div>
                  </div>
                </button>

                {/* ── SLOTH EXAMPLES — shown when expanded ── */}
                {isOpen && (
                  <div
                    className="px-6 md:px-8 pb-8"
                    style={{ animation: 'fadeUp 0.3s ease-out' }}
                  >
                    <div
                      className="rounded-2xl p-6"
                      style={{ background: '#0a0804', border: '1px solid #2a2018' }}
                    >
                      {/* Sloth header */}
                      <div className="flex items-center gap-4 mb-5">
                        <img
                          src={SLOTH_URL}
                          alt="GallantryAI Sloth"
                          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                          style={{ border: '2px solid #E8520A' }}
                        />
                        <div>
                          <p
                            className="text-sm font-bold"
                            style={{ color: '#E8520A', fontFamily: "'Nunito', sans-serif" }}
                          >
                            The Sloth Says:
                          </p>
                          <p
                            className="text-sm italic"
                            style={{ color: '#c8b89a', fontFamily: "'Playfair Display', serif" }}
                          >
                            {rule.slothSays}
                          </p>
                        </div>
                      </div>

                      {/* Examples */}
                      <div className="space-y-4">
                        {rule.slothExamples.map((ex, j) => (
                          <div
                            key={j}
                            className="rounded-xl p-4"
                            style={{ background: '#110e08', border: '1px solid #1a1610' }}
                          >
                            <p
                              className="text-xs font-bold uppercase tracking-wider mb-2"
                              style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
                            >
                              Scenario {j + 1}
                            </p>
                            <p
                              className="text-sm font-semibold mb-2"
                              style={{ color: '#f5e6d0', fontFamily: "'DM Sans', sans-serif" }}
                            >
                              {ex.scenario}
                            </p>
                            <p
                              className="text-sm leading-relaxed"
                              style={{ color: '#9a8a7a', fontFamily: "'DM Sans', sans-serif" }}
                            >
                              {ex.advice}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Sloth tip */}
                      <div
                        className="mt-5 rounded-xl p-4 flex items-start gap-3"
                        style={{ background: '#1a1208', border: '1px solid #3a2a10' }}
                      >
                        <span className="text-xl flex-shrink-0">{"\u{1F9A5}"}</span>
                        <p
                          className="text-sm italic leading-relaxed"
                          style={{ color: '#E8520A', fontFamily: "'Playfair Display', serif" }}
                        >
                          {rule.slothTip}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* The Equation */}
      <section className="py-16 md:py-20 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
            style={{ color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}
          >
            The Equation
          </p>
          <p
            className="text-2xl md:text-3xl font-light leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif", color: '#f5e6d0' }}
          >
            Safety + Honesty + Trust + Agency + Correction = <span className="font-bold" style={{ color: '#E8520A' }}>Signal</span>
          </p>
          <p className="text-sm mt-4" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
            Remove any one and you get noise.
          </p>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16 px-6" style={{ borderTop: '1px solid #1a1610' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Promptolinguistics", path: "/promptolinguistics", desc: "The discipline" },
              { label: "Road Protocol", path: "/road-protocol", desc: "The vault" },
              { label: "Framework Families", path: "/frameworks", desc: "The tools" },
              { label: "Prompt Games", path: "/prompt-games", desc: "Practice" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block p-5 rounded-xl text-center hover:scale-[1.02] transition-all no-underline group"
                style={{ background: '#0f0c08', border: '1px solid #1a1610' }}
              >
                <div
                  className="text-sm font-semibold group-hover:text-[#E8520A] transition-colors"
                  style={{ color: '#c8b89a', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label} {"\u2192"}
                </div>
                <div className="text-xs mt-1" style={{ color: '#5a4a3a', fontFamily: "'DM Sans', sans-serif" }}>
                  {link.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: '#080604' }}>
        <Footer />
      </div>
    </div>
  );
}
