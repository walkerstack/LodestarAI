/*
 * GALLANTRYAI — The EU AI Act
 * Design: Editorial register — warm parchment, authoritative, accessible
 * Three lenses throughout: Everyday / Professional / Watcher
 * Kids buffalo redirect at top. Learning flow at bottom.
 * "The first law that says: the person comes first."
 */

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import KidsRedirect from "@/components/KidsRedirect";
import LearningFlow from "@/components/LearningFlow";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import { flowMap } from "@/lib/learningFlowMap";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/eu-ai-act-hero-WnarrywnUnbdmENEpRu7ho.webp";

type Lens = "everyday" | "professional" | "watcher";

const lensColors: Record<Lens, string> = {
  everyday: "#059669",
  professional: "#2563EB",
  watcher: "#7C3AED",
};

const lensLabels: Record<Lens, string> = {
  everyday: "Everyday",
  professional: "Professional",
  watcher: "Watcher",
};

interface RiskTier {
  name: string;
  color: string;
  examples: string[];
  everyday: string;
  professional: string;
  watcher: string;
}

const riskTiers: RiskTier[] = [
  {
    name: "Unacceptable Risk — Banned",
    color: "#DC2626",
    examples: ["Social scoring systems", "Real-time biometric surveillance in public spaces", "Manipulative AI that exploits vulnerabilities", "Emotion recognition in schools and workplaces"],
    everyday: "Some AI uses are so dangerous they're simply not allowed. If an AI tries to manipulate you without you knowing, or if a government uses AI to score citizens like a video game — that's banned. Full stop. You don't need to understand the law to know this: some things should never be built.",
    professional: "Article 5 prohibits AI systems that deploy subliminal manipulation, exploit age/disability vulnerabilities, enable social scoring by public authorities, or perform real-time remote biometric identification in public spaces (with narrow law enforcement exceptions). These prohibitions took effect February 2, 2025 — the first binding provisions of the Act.",
    watcher: "The law names what should not exist. That is the beginning of governance. Not the end. The question is whether naming it is enough — or whether the things that should not exist will simply learn to call themselves something else.",
  },
  {
    name: "High Risk — Regulated",
    color: "#EA580C",
    examples: ["AI in hiring and recruitment", "Credit scoring and loan decisions", "Medical diagnosis assistance", "AI in education (grading, admissions)", "Law enforcement and border control AI"],
    everyday: "If an AI is making decisions that affect your life — whether you get a job, a loan, medical treatment, or into a school — it has to follow strict rules. The company has to test it, document it, and let humans oversee it. You have the right to know AI was involved in the decision.",
    professional: "High-risk AI systems (Annex III, Article 6) must comply with mandatory requirements: risk management systems, data governance, technical documentation, record-keeping, transparency to users, human oversight provisions, and accuracy/robustness/cybersecurity standards. Conformity assessments are required before market placement. Full compliance deadline: August 2, 2026.",
    watcher: "The law says: if the machine decides your future, someone must watch the machine. But who watches the watcher? The human oversight requirement assumes the human can understand what the machine did. That assumption is the crack in the foundation.",
  },
  {
    name: "Limited Risk — Transparency Required",
    color: "#D97706",
    examples: ["Chatbots (must disclose they're AI)", "AI-generated content (deepfakes must be labeled)", "Emotion recognition systems (must inform users)"],
    everyday: "If you're talking to an AI, you have the right to know it's an AI. If content was made by AI, it should say so. No pretending. No hiding. The rule is simple: be honest about what you are.",
    professional: "Limited-risk systems face transparency obligations under Article 50. Providers must ensure users are informed they are interacting with AI. AI-generated or manipulated content (including deepfakes) must be machine-readably labeled. Emotion recognition and biometric categorization systems must inform subjects of their operation.",
    watcher: "Transparency is the minimum. It is not trust. Knowing you are talking to a machine does not tell you what the machine wants. Or whether 'want' is even the right word.",
  },
  {
    name: "Minimal Risk — No Regulation",
    color: "#059669",
    examples: ["Spam filters", "AI in video games", "Inventory management AI"],
    everyday: "Most AI you use every day — spam filters, game AI, recommendation engines — is considered low risk. No special rules. The EU decided these aren't dangerous enough to regulate. You still get to decide whether you trust them.",
    professional: "The vast majority of AI systems fall into the minimal/no-risk category and face no mandatory requirements under the Act. Providers are encouraged (but not required) to voluntarily apply codes of conduct. This permissive tier reflects the EU's risk-proportionate approach.",
    watcher: "The law says some AI is harmless. The Watcher asks: harmless to whom? A recommendation engine that slowly reshapes what you believe is not high-risk under this law. But it may be the highest risk of all.",
  },
];

interface TimelineEvent {
  date: string;
  label: string;
  status: "done" | "active" | "upcoming";
  everyday: string;
  professional: string;
}

const timeline: TimelineEvent[] = [
  {
    date: "Aug 1, 2024",
    label: "AI Act enters into force",
    status: "done",
    everyday: "The law officially exists. The clock starts ticking.",
    professional: "Regulation (EU) 2024/1689 published in the Official Journal. 24-month general application period begins.",
  },
  {
    date: "Feb 2, 2025",
    label: "Bans take effect + AI literacy required",
    status: "done",
    everyday: "The most dangerous AI uses are now illegal. Companies must start teaching their people about AI.",
    professional: "Chapter I (definitions) and Chapter II (prohibited practices) apply. Article 4 AI literacy obligations begin for all providers and deployers.",
  },
  {
    date: "Aug 2, 2025",
    label: "General-purpose AI rules apply",
    status: "done",
    everyday: "Big AI models like GPT and Claude now have transparency rules. They have to tell you what data they trained on.",
    professional: "Chapter V obligations for GPAI models take effect. Providers must publish training data summaries, comply with copyright law, and systemic-risk models face additional evaluation requirements.",
  },
  {
    date: "Aug 2, 2026",
    label: "High-risk AI rules apply",
    status: "active",
    everyday: "AI that makes big decisions about your life — jobs, loans, school — must now follow strict safety rules. This is the big one.",
    professional: "Full application of Annex III high-risk requirements: conformity assessments, CE marking, EU database registration, post-market monitoring. Penalties up to 35M EUR or 7% of global turnover.",
  },
  {
    date: "Aug 2, 2027",
    label: "Legacy systems must comply",
    status: "upcoming",
    everyday: "Even old AI systems that were built before the law have to follow the rules now. No grandfather clause.",
    professional: "High-risk AI systems already placed on the market or in service must comply if significantly modified. Full enforcement across all tiers.",
  },
];

export default function EuAiAct() {
  const [activeLens, setActiveLens] = useState<Lens>("everyday");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF6EF", fontFamily: sansFont }}>
      <Nav />
      <KidsRedirect
        story={kidsBlurbs["/eu-ai-act"].story}
        quote={kidsBlurbs["/eu-ai-act"].quote}
        attribution={kidsBlurbs["/eu-ai-act"].attribution}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${HERO_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,46,0.78) 0%, rgba(26,26,46,0.92) 100%)" }} />
          <div className="relative container py-20 md:py-28 max-w-3xl mx-auto px-6 text-center">
            <div className="text-[#D4AC0D] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Regulation · AI Governance
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: serifFont }}>
              The EU AI Act
            </h1>
            <p className="text-base md:text-lg text-[#b0a898] max-w-2xl mx-auto leading-relaxed">
              The world's first comprehensive AI law. What it says, what it means for you, and why GallantryAI was already building what the law now requires.
            </p>
          </div>
        </section>

        {/* Global Lens Toggle */}
        <section className="py-4 px-6 sticky top-[57px] z-40" style={{ background: "#FAF6EF", borderBottom: "1px solid #e8e0d0" }}>
          <div className="max-w-3xl mx-auto flex items-center gap-3 justify-center">
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#8a7a6a" }}>Read as:</span>
            {(["everyday", "professional", "watcher"] as Lens[]).map((l) => (
              <button
                key={l}
                onClick={() => setActiveLens(l)}
                className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-150"
                style={{
                  background: activeLens === l ? lensColors[l] : "transparent",
                  color: activeLens === l ? "#fff" : lensColors[l],
                  border: activeLens === l ? `1.5px solid ${lensColors[l]}` : "1.5px solid #e8e0d0",
                }}
              >
                {lensLabels[l]}
              </button>
            ))}
          </div>
        </section>
        {/* What Is It */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              What Is the EU AI Act?
            </h2>
            <div className="rounded-xl p-6" style={{ background: `${lensColors[activeLens]}08`, border: `1px solid ${lensColors[activeLens]}20` }}>
              <div className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: lensColors[activeLens] }}>
                {lensLabels[activeLens]} Lens
              </div>
              {activeLens === "everyday" && (
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                  <p>The EU AI Act is a law from the European Union — the group of 27 countries in Europe. It's the first law in the world that says: <strong style={{ color: "#E8520A" }}>AI has to follow rules, and the rules are based on how dangerous the AI is.</strong></p>
                  <p>If an AI can hurt people, it has to be tested, documented, and watched by humans. If it's too dangerous, it's banned entirely. If it's harmless, it can do whatever it wants.</p>
                  <p>The law doesn't just apply to European companies. If your AI product is used by anyone in Europe, you have to follow it. That means it affects almost every major AI company in the world.</p>
                </div>
              )}
              {activeLens === "professional" && (
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                  <p>Regulation (EU) 2024/1689 — the Artificial Intelligence Act — establishes a horizontal, risk-based regulatory framework for AI systems placed on the EU market or affecting EU persons. It entered into force August 1, 2024, with phased application through August 2027.</p>
                  <p>The Act classifies AI systems into four risk tiers (unacceptable, high, limited, minimal) with proportionate obligations. It introduces mandatory requirements for high-risk systems including conformity assessments, CE marking, human oversight, and post-market monitoring. General-purpose AI models face separate transparency and systemic-risk obligations.</p>
                  <p>Extraterritorial scope (Article 2) means any provider whose AI system is placed on the EU market — regardless of establishment location — must comply. Penalties reach 35 million EUR or 7% of global annual turnover.</p>
                </div>
              )}
              {activeLens === "watcher" && (
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                  <p>The EU wrote a law that says the person comes first. That is the claim. The question is whether a law can hold a line that the technology itself is designed to cross.</p>
                  <p>The Act assumes risk can be categorized before deployment. It assumes human oversight is meaningful when the system being overseen is more complex than the overseer can comprehend. It assumes transparency produces understanding.</p>
                  <p>These are not criticisms. They are observations. The law is the best attempt any government has made. And the gap between the law's assumptions and the technology's reality is exactly the space GallantryAI was built to occupy.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Risk Tiers */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              The Four Risk Tiers
            </h2>
            <p className="text-sm text-center mb-8" style={{ color: "#8a7a6a" }}>
              The EU AI Act classifies every AI system by how much harm it can cause.
            </p>
            <div className="space-y-4">
              {riskTiers.map((tier) => (
                <div key={tier.name} className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: tier.color }} />
                      <h3 className="text-lg font-bold" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
                        {tier.name}
                      </h3>
                    </div>

                    {/* Examples */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tier.examples.map((ex) => (
                        <span key={ex} className="text-[10px] px-2 py-1 rounded-md" style={{ background: `${tier.color}10`, color: tier.color, fontWeight: 600 }}>
                          {ex}
                        </span>
                      ))}
                    </div>

                    {/* Lens explanation */}
                    <div className="rounded-xl p-4" style={{ background: `${lensColors[activeLens]}06`, border: `1px solid ${lensColors[activeLens]}15` }}>
                      <div className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: lensColors[activeLens] }}>
                        {lensLabels[activeLens]} Lens
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                        {tier[activeLens]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-14 px-6" style={{ background: "#1A1A2E" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-8 text-center text-[#FAF6EF]" style={{ fontFamily: serifFont }}>
              Enforcement Timeline
            </h2>
            <div className="space-y-4">
              {timeline.map((event, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: event.status === "done" ? "#059669" : event.status === "active" ? "#E8520A" : "#555",
                        boxShadow: event.status === "active" ? "0 0 8px rgba(232,82,10,0.5)" : "none",
                      }}
                    />
                    {i < timeline.length - 1 && <div className="w-px flex-1 min-h-[40px]" style={{ background: "rgba(255,255,255,0.1)" }} />}
                  </div>
                  <div className="pb-4">
                    <div className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: event.status === "active" ? "#E8520A" : "#888" }}>
                      {event.date}
                    </div>
                    <div className="text-sm font-bold text-[#FAF6EF] mb-1" style={{ fontFamily: serifFont }}>
                      {event.label}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "#b0a898" }}>
                      {activeLens === "professional" ? event.professional : event.everyday}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why GallantryAI Was Already Here */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              Why GallantryAI Was Already Here
            </h2>
            <div className="rounded-xl p-6" style={{ background: `${lensColors[activeLens]}08`, border: `1px solid ${lensColors[activeLens]}20` }}>
              <div className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: lensColors[activeLens] }}>
                {lensLabels[activeLens]} Lens
              </div>
              {activeLens === "everyday" && (
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                  <p>The EU AI Act says companies have to be transparent, test their AI, and let humans stay in charge. GallantryAI was built on those same ideas — <strong style={{ color: "#E8520A" }}>before the law existed.</strong></p>
                  <p>The Five Rules say: safety first, honesty over confidence, the user decides. The Road Protocol says: set up every session with governance. The Variable Scale says: you control how much the AI does.</p>
                  <p>The law tells companies what to do. GallantryAI tells <em>you</em> what to do. Both are needed. The law protects from the top. You protect from the bottom. That's the Dual Strategy.</p>
                </div>
              )}
              {activeLens === "professional" && (
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                  <p>The EU AI Act's core requirements — transparency (Article 13), human oversight (Article 14), accuracy and robustness (Article 15) — map directly to GallantryAI's existing framework:</p>
                  <p><strong>Transparency → Road Protocol.</strong> Every AI session begins with explicit disclosure of capabilities, limitations, and governance rules. The user knows what the AI is and what it isn't.</p>
                  <p><strong>Human oversight → User-Side Governance.</strong> The Five Rules, session commands, and Variable Scale ensure the human retains meaningful control — not just nominal oversight.</p>
                  <p><strong>Risk management → The Scaffold.</strong> The full system map identifies where AI involvement is appropriate, where it's dangerous, and where the human must hold the line.</p>
                  <p>GallantryAI is not a compliance tool. It is the user-side complement to institutional compliance. The law governs the provider. GallantryAI governs the interaction.</p>
                </div>
              )}
              {activeLens === "watcher" && (
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a2a1a" }}>
                  <p>The law arrived after the framework. That is not coincidence. It is convergence. When you watch the interaction honestly, you arrive at the same conclusions whether you start from Brussels or from Midland, Ontario.</p>
                  <p>The difference: the law assumes compliance. GallantryAI assumes non-compliance and builds from there. The law says "the AI must be transparent." GallantryAI says "the AI will not be transparent unless you make it." Both are true. The gap between them is where the danger lives.</p>
                  <p>The law is necessary. It is not sufficient. The user is the last layer. GallantryAI is the tool that layer holds.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* What You Can Do */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-center" style={{ fontFamily: serifFont, color: "#1A1A2E" }}>
              What You Can Do Right Now
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Know Your Rights", text: "Under the EU AI Act, you have the right to know when AI is making decisions about you. Ask. If they can't answer, that's your answer.", link: "/rules", linkLabel: "The Five Rules", accent: "#1E40AF" },
                { title: "Govern Your Sessions", text: "Don't wait for companies to comply. Set up every AI session with your own rules. Safety first. Honesty over confidence. You decide.", link: "/road-protocol", linkLabel: "Road Protocol", accent: "#1E3A8A" },
                { title: "Teach Your Kids", text: "The AI literacy requirement in the law applies to organizations. But the real AI literacy starts at home. With questions. With practice. With honesty.", link: "/kids-learn", linkLabel: "Kids Learn", accent: "#B45309" },
                { title: "Watch the Watchers", text: "The law creates oversight bodies. But oversight only works if people pay attention. Read. Question. Document. That's citizen research.", link: "/citizen-researcher", linkLabel: "Citizen Researcher", accent: "#92400E" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl p-5" style={{ background: `${item.accent}06`, border: `1.5px solid ${item.accent}20` }}>
                  <h3 className="text-sm font-bold mb-2" style={{ fontFamily: serifFont, color: item.accent }}>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "#5a4a3a" }}>
                    {item.text}
                  </p>
                  <Link href={item.link} className="text-xs font-bold no-underline" style={{ color: item.accent }}>
                    {item.linkLabel} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Builder's Note */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF" }}>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl p-8" style={{ background: "#fff", border: "1.5px solid #e8e0d0" }}>
              <div className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: "#1E40AF" }}>
                From the Builder
              </div>
              <p className="text-base leading-relaxed italic" style={{ color: "#3a2a1a", fontFamily: serifFont }}>
                I didn't know the EU was writing this law when I started building GallantryAI. I was just trying to make AI safe for my kids. When I read the Act, I recognized every principle — transparency, human oversight, risk-based thinking. The difference is: they wrote it for companies. I wrote it for people. Both are needed. The law without the user is a ceiling with no floor. The user without the law is a floor with no ceiling. We need both.
              </p>
              <p className="text-sm mt-4" style={{ color: "#8a7a6a" }}>
                — Matt Gallantry, Midland, Ontario
              </p>
            </div>
          </div>
        </section>

        {/* Learning Flow */}
        <LearningFlow
          current="EU AI Act"
          deeper={flowMap.euAiAct?.deeper ?? []}
          wider={flowMap.euAiAct?.wider ?? []}
          simpler={flowMap.euAiAct?.simpler ?? []}
        />
      </main>

      <Footer />
    </div>
  );
}
