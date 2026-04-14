/**
 * GALLANTRYAI — Screenshots & Document Sharing: An Analysis
 * Design: Investigative editorial — warm amber, deep charcoal
 * Three lenses throughout: Everyday / Professional / Watcher
 * Kids buffalo redirect at top. Learning flow at bottom.
 * "What you share shapes what gets built."
 */

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import KidsRedirect from "@/components/KidsRedirect";
import LearningFlow from "@/components/LearningFlow";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import { flowMap } from "@/lib/learningFlowMap";
import KidsMidLink from "@/components/KidsMidLink";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/screenshots-sharing-hero-QmaSdAJXpTUHakgriYoCYf.webp";

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

/* ── Sharing Scenarios ── */
interface Scenario {
  title: string;
  icon: string;
  risk: "low" | "medium" | "high" | "critical";
  everyday: string;
  professional: string;
  watcher: string;
  benefits: string[];
  dangers: string[];
}

const scenarios: Scenario[] = [
  {
    title: "Sharing a Screenshot of an AI Conversation",
    icon: "📸",
    risk: "medium",
    everyday: "When you screenshot a chat with AI and send it to someone, you're sharing more than you think. The screenshot might include your name, the AI's name, the time, your question, and the AI's answer. If your question was personal — about health, money, relationships — that's now in someone else's hands.",
    professional: "Screenshots of AI conversations can contain prompt engineering techniques, proprietary workflows, system prompts, and contextual data that reveals organizational strategy. Metadata embedded in screenshots (device info, timestamps, geolocation) creates additional exposure vectors. A 2025 ACE Tech Group analysis found that shared ChatGPT screenshots are one of the fastest vectors for unintentional data leakage in enterprise environments.",
    watcher: "The screenshot is a frozen moment of a living conversation. But the conversation was shaped by everything before it — your history, your patterns, your trust level. The screenshot shows the answer. It doesn't show the relationship that produced it. That gap is where misunderstanding lives.",
    benefits: ["Documenting AI behavior for accountability", "Teaching others how to prompt effectively", "Building shared knowledge", "Evidence of AI errors or bias"],
    dangers: ["Exposing personal or sensitive information", "Revealing proprietary prompts or workflows", "Metadata leakage (device, location, time)", "Context collapse — the screenshot loses its conversation context"],
  },
  {
    title: "Uploading Documents to AI for Analysis",
    icon: "📄",
    risk: "high",
    everyday: "When you upload a document to AI — a contract, a medical report, a school paper — you're giving the AI access to everything in that document. Some AI tools use what you upload to train their models. That means your private document could influence what the AI says to other people. Always check the AI's privacy settings before uploading anything personal.",
    professional: "Document upload to AI systems triggers multiple governance concerns. Under default settings, many AI providers retain uploaded content for model improvement (OpenAI's default data policy, for example, changed in 2024 but still requires explicit opt-out). The EU AI Act's transparency requirements (Article 52) mandate disclosure when AI processes personal data. Stanford HAI's October 2025 study found that users routinely share biometric and health data without considering retention implications.",
    watcher: "The document was written for a human audience. The AI reads it for a different purpose — extraction, pattern matching, statistical correlation. The document doesn't change. But what it means changes the moment it enters a system that doesn't read the way humans read. Governance begins with understanding that the same document is two different things in two different contexts.",
    benefits: ["Faster analysis of complex documents", "Accessibility — AI can explain dense legal/medical text", "Pattern detection across large document sets", "Translation and summarization"],
    dangers: ["Training data contamination — your document trains the model", "Retention policies vary by provider and tier", "No guarantee of deletion even after account closure", "Confidential information becomes part of a shared system"],
  },
  {
    title: "Sharing AI-Generated Content Publicly",
    icon: "🌐",
    risk: "medium",
    everyday: "When you share something AI helped you write — a social media post, an email, a school assignment — you're putting AI's words into the world as if they were yours. That's not always wrong. But it's worth knowing: the AI's answer was shaped by your question, and your question was shaped by who you are. What you share teaches other people what AI can do. Make sure it's honest.",
    professional: "Public sharing of AI-generated content intersects with emerging disclosure requirements. The EU AI Act (Article 52) requires labeling of AI-generated content in certain contexts. Professional liability frameworks are evolving — legal, medical, and financial sectors increasingly require AI-assisted work to be disclosed. The IAPP's August 2025 analysis of AI governance identifies public content sharing as a primary vector for 'governance drift' — where organizational AI policies erode through informal sharing practices.",
    watcher: "Every piece of AI-generated content that enters the public sphere becomes training data for the next generation of models. The feedback loop is closed. What you share shapes what gets built. This is not a warning. It is a description of the system you are inside.",
    benefits: ["Democratizing access to professional-quality writing", "Accelerating knowledge sharing", "Making complex ideas accessible", "Collaborative creation"],
    dangers: ["Attribution ambiguity — whose words are these?", "Feedback loop — AI output becomes AI input", "Disclosure requirements vary by jurisdiction", "Erosion of trust when AI involvement is hidden"],
  },
  {
    title: "Sharing Personal Data in Conversation",
    icon: "💬",
    risk: "critical",
    everyday: "Telling AI about your health, your finances, your relationships, your children — it feels like talking to a friend. But AI is not your friend. It's a tool that stores what you say. A 2025 Kiteworks study found that 93% of employees share confidential data with AI tools without authorization. You don't need to be an employee to be at risk. If you told the AI something you wouldn't put on a billboard, think about why.",
    professional: "Conversational data sharing represents the highest-risk category in AI governance. Stanford HAI's privacy research (October 2025) documented systematic over-sharing of biometric, health, and financial data in AI chatbot interactions. The University of Iowa's March 2026 workplace AI privacy framework identifies three critical scenarios: accidental disclosure, habitual over-sharing, and institutional pressure to use AI tools without adequate privacy training. User privacy harms in conversational AI span data retention, inference attacks, and behavioral profiling.",
    watcher: "The conversation feels private because it looks private. One person. One screen. One response at a time. But the conversation is not between two entities. It is between one person and a system that includes every person who has ever used it. Privacy in AI is not about what you hide. It is about what you reveal to a system that does not forget the way humans forget.",
    benefits: ["Personalized assistance requires personal context", "Mental health support accessibility", "Financial planning with full picture", "Medical symptom analysis"],
    dangers: ["93% of employees share confidential data with unauthorized AI tools", "Conversational data trains future models by default in many systems", "Inference attacks — AI can deduce what you didn't explicitly say", "No therapist-client or doctor-patient privilege applies"],
  },
  {
    title: "Sharing Children's Information with AI",
    icon: "🧒",
    risk: "critical",
    everyday: "If you're using AI to help with your child's homework, health questions, or behavioral concerns — you're creating a data trail about a person who didn't consent to it. Children can't opt out. They can't read privacy policies. They can't understand what it means for their data to exist in a system they've never seen. Protect them by being careful about what you share on their behalf.",
    professional: "Children's data receives heightened protection under COPPA (US), GDPR Article 8 (EU), and the EU AI Act's explicit prohibition of emotion recognition in educational settings. The AI Act classifies AI systems used in education as high-risk (Annex III), requiring conformity assessments, human oversight, and data governance protocols. Sharing children's data with AI tools that lack these safeguards creates legal liability and ethical exposure that extends beyond the individual interaction.",
    watcher: "The child did not choose to be in this system. The parent chose for them. That is the nature of childhood — decisions are made on your behalf. But AI decisions are different from other parental decisions because they create permanent records in systems the child will inherit. The question is not whether to use AI for children. The question is whether the child, at eighteen, would consent to what was shared at eight.",
    benefits: ["Educational support and personalized learning", "Health information accessibility for parents", "Safety monitoring and early intervention", "Language development assistance"],
    dangers: ["Children cannot consent to data sharing", "Permanent records in systems they'll inherit", "COPPA/GDPR violations carry significant penalties", "Behavioral profiling of minors", "Emotion recognition in education is banned under EU AI Act"],
  },
];

const riskColorMap: Record<string, string> = {
  low: "#059669",
  medium: "#CA8A04",
  high: "#EA580C",
  critical: "#DC2626",
};

/* ── The Governance Framework ── */
interface Principle {
  name: string;
  everyday: string;
  professional: string;
  watcher: string;
}

const principles: Principle[] = [
  {
    name: "Before You Share, Ask: Would I Put This on a Billboard?",
    everyday: "If the answer is no, don't put it in AI either. The billboard test isn't about shame — it's about awareness. Know what you're sharing and why.",
    professional: "The 'billboard test' maps to data classification frameworks. Information that fails this test likely falls into PII, PHI, or proprietary categories requiring enhanced controls. Implement a pre-sharing checklist: Is this data classified? Does the AI provider's retention policy align with our governance requirements? Is there a less-exposing way to get the same result?",
    watcher: "The billboard test is a proxy for a deeper question: do you understand the system you're putting this into? Most people don't. The test works not because it's precise, but because it forces a pause. And the pause is where governance begins.",
  },
  {
    name: "Check the AI's Privacy Settings Before Every Upload",
    everyday: "Different AI tools handle your data differently. Some save everything. Some save nothing. Some let you choose. Find the settings. Read them. If you can't find them, that tells you something too.",
    professional: "AI provider data policies vary significantly by tier and configuration. OpenAI's API tier does not use data for training; the consumer tier does by default (opt-out available). Anthropic's Claude retains conversations for safety monitoring but not model training. Google's Gemini policies differ by workspace vs. consumer accounts. Document your organization's approved AI tools and their specific data handling configurations.",
    watcher: "The settings exist because the default is exposure. If the default were privacy, there would be no settings to find. The architecture of the choice tells you what the system was built to do.",
  },
  {
    name: "Never Share Someone Else's Data Without Their Knowledge",
    everyday: "If you're uploading a contract with someone else's name on it, a medical report about your child, or a conversation screenshot that includes another person — you're sharing their data too. They didn't agree to that. Ask first. Or redact.",
    professional: "Third-party data sharing through AI tools creates vicarious liability under GDPR Article 6 (lawful basis for processing) and potentially violates data processing agreements. The 2025 ACA Group analysis of AI data leaks found that over-permissioning — where AI systems access shared documents beyond intended scope — is a primary vector for organizational data breaches.",
    watcher: "Consent is not a checkbox. It is a relationship. When you share someone else's data with AI, you are making a decision about their relationship with a system they may not know exists. That is power. Use it carefully.",
  },
  {
    name: "Document What You Share and Why",
    everyday: "Keep a simple log. What did you upload? When? To which AI? Why? Not because you're in trouble — because you're building a habit of awareness. The log is for you.",
    professional: "Audit trails for AI interactions are becoming a regulatory requirement. The EU AI Act mandates logging for high-risk AI systems. Even for non-regulated uses, maintaining interaction logs supports incident response, compliance demonstration, and organizational learning. Implement structured logging: timestamp, data type, AI provider, purpose, retention expectation.",
    watcher: "The log is not surveillance. It is self-awareness made visible. Most people cannot tell you what they shared with AI last week. The log makes the invisible visible. That is the first step of governance — not control, but sight.",
  },
  {
    name: "Teach Your Children What You're Doing",
    everyday: "If you use AI to help with your kids' homework or health questions, tell them. Not the technical details — just the truth: 'I asked a computer to help me think about this.' They deserve to know. And they'll learn from watching you be honest about it.",
    professional: "Age-appropriate AI literacy is emerging as a parental and educational responsibility. The EU AI Act's classification of educational AI as high-risk reflects institutional recognition that children's interactions with AI require special governance. Building AI awareness early — what it is, what it isn't, what it remembers — creates informed digital citizens rather than passive data subjects.",
    watcher: "The child who grows up knowing that AI was part of their education will have a different relationship with AI than the child who discovers it later. Transparency now is governance later. What you model, they inherit.",
  },
];

export default function ScreenshotSharing() {
  const [lens, setLens] = useState<Lens>("everyday");
  const [expandedScenario, setExpandedScenario] = useState<number | null>(null);
  const [expandedPrinciple, setExpandedPrinciple] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const flow = flowMap["screenshotSharing"];
  const blurb = kidsBlurbs["/screenshot-sharing"];

  return (
    <div style={{ fontFamily: sansFont, background: "#FAF6F1", color: "#1A1A2E", minHeight: "100vh" }}>
      <Nav />

      {/* Kids Redirect */}
      {blurb && (
        <KidsRedirect
          story={blurb.story}
          quote={blurb.quote}
          attribution={blurb.attribution}
        />
      )}

      {/* ── Hero ── */}
      <section style={{
        position: "relative",
        minHeight: 340,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        background: `linear-gradient(to bottom, rgba(26,26,46,0.7), rgba(26,26,46,0.95)), url(${HERO_IMG}) center/cover`,
        padding: "4rem 1.5rem 3rem",
      }}>
        <div style={{ maxWidth: 720, textAlign: "center" }}>
          <h1 style={{
            fontFamily: serifFont,
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            color: "#FAF6F1",
            lineHeight: 1.15,
            marginBottom: "0.75rem",
          }}>
            Screenshots &amp; Document Sharing
          </h1>
          <p style={{
            fontFamily: serifFont,
            fontStyle: "italic",
            color: "#E8520A",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
          }}>
            What you share shapes what gets built.
          </p>
        </div>
      </section>

      {/* ── Lens Toggle ── */}
      <section style={{ background: "#FAF6F1", padding: "2rem 1.5rem 0", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {(["everyday", "professional", "watcher"] as Lens[]).map((l) => (
            <button
              key={l}
              onClick={() => setLens(l)}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: 999,
                border: `2px solid ${lensColors[l]}`,
                background: lens === l ? lensColors[l] : "transparent",
                color: lens === l ? "#fff" : lensColors[l],
                fontFamily: sansFont,
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {lensLabels[l]}
            </button>
          ))}
        </div>
      </section>

      {/* ── Why This Matters ── */}
      <section style={{ background: "#FAF6F1", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serifFont, fontSize: "1.8rem", color: "#1A1A2E", marginBottom: "1rem" }}>
            Why This Matters
          </h2>
          {lens === "everyday" && (
            <p style={{ lineHeight: 1.8, fontSize: "1.05rem", color: "#3D3D5C" }}>
              Every time you use AI, you're sharing something. A question. A document. A screenshot. A piece of your life. Most people don't think about where that information goes after they hit send. This page is about thinking about it. Not to scare you — but because knowing what you're sharing is the first step to sharing wisely. A 2025 study found that <strong>93% of employees</strong> share confidential data with AI tools they aren't authorized to use. You don't need to be an employee to learn from that number.
            </p>
          )}
          {lens === "professional" && (
            <p style={{ lineHeight: 1.8, fontSize: "1.05rem", color: "#3D3D5C" }}>
              Document and screenshot sharing with AI systems represents one of the fastest-growing vectors for unintentional data exposure. Stanford HAI's October 2025 privacy research documented systematic over-sharing across all user demographics. The EU AI Act's transparency and data governance requirements (Articles 10, 13, 52) create new compliance obligations for organizations whose employees interact with AI tools. This page maps the risk landscape across five common sharing scenarios and provides a governance framework grounded in published research.
            </p>
          )}
          {lens === "watcher" && (
            <p style={{ lineHeight: 1.8, fontSize: "1.05rem", color: "#3D3D5C", fontStyle: "italic" }}>
              The act of sharing is the act of governance. Every document uploaded, every screenshot taken, every conversation continued — these are not neutral actions. They are decisions that shape the system. The system learns from what it receives. What it receives depends on what people choose to share. The governance question is not "how do we control AI?" It is "how do we govern ourselves in the presence of AI?" This page is an attempt to answer that question honestly.
            </p>
          )}
        </div>
      </section>

      {/* ── Sharing Scenarios ── */}
      <section style={{ background: "#1A1A2E", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serifFont, fontSize: "1.8rem", color: "#FAF6F1", marginBottom: "0.5rem", textAlign: "center" }}>
            Five Sharing Scenarios
          </h2>
          <p style={{ color: "#9CA3AF", textAlign: "center", marginBottom: "2rem", fontSize: "0.95rem" }}>
            Click to expand. Each scenario includes benefits, dangers, and analysis through your current lens.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {scenarios.map((s, i) => {
              const isOpen = expandedScenario === i;
              return (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${isOpen ? riskColorMap[s.risk] : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 12,
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}>
                  <button
                    onClick={() => setExpandedScenario(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1.25rem 1.5rem",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
                    <div style={{ flex: 1 }}>
                      <span style={{ color: "#FAF6F1", fontFamily: serifFont, fontSize: "1.1rem", fontWeight: 600 }}>
                        {s.title}
                      </span>
                    </div>
                    <span style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: 999,
                      background: riskColorMap[s.risk],
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      {s.risk}
                    </span>
                    <span style={{ color: "#9CA3AF", fontSize: "1.2rem", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
                      ▾
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 1.5rem 1.5rem" }}>
                      {/* Lens-specific analysis */}
                      <div style={{
                        padding: "1rem 1.25rem",
                        borderRadius: 8,
                        background: `${lensColors[lens]}15`,
                        borderLeft: `3px solid ${lensColors[lens]}`,
                        marginBottom: "1.25rem",
                      }}>
                        <span style={{ color: lensColors[lens], fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          {lensLabels[lens]} Lens
                        </span>
                        <p style={{ color: "#D1D5DB", lineHeight: 1.7, marginTop: "0.5rem", fontSize: "0.95rem" }}>
                          {s[lens]}
                        </p>
                      </div>

                      {/* Benefits & Dangers side by side */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div>
                          <h4 style={{ color: "#059669", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                            Benefits
                          </h4>
                          {s.benefits.map((b, j) => (
                            <p key={j} style={{ color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "0.25rem" }}>
                              + {b}
                            </p>
                          ))}
                        </div>
                        <div>
                          <h4 style={{ color: "#DC2626", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                            Dangers
                          </h4>
                          {s.dangers.map((d, j) => (
                            <p key={j} style={{ color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "0.25rem" }}>
                              − {d}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* KidsMidLink in dark section */}
          <div className="flex justify-center py-4">
            <KidsMidLink />
          </div>
        </div>
      </section>

      {/* ── The Governance Framework ── */}
      <section style={{ background: "#FAF6F1", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serifFont, fontSize: "1.8rem", color: "#1A1A2E", marginBottom: "0.5rem" }}>
            Five Principles for Sharing Wisely
          </h2>
          <p style={{ color: "#6B7280", marginBottom: "2rem", fontSize: "0.95rem" }}>
            Not rules. Principles. They work because they make you think before you share.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {principles.map((p, i) => {
              const isOpen = expandedPrinciple === i;
              const gradientColors = ["#B45309", "#92400E", "#78350F", "#713F12", "#854D0E"];
              return (
                <div key={i} style={{
                  border: `1px solid ${isOpen ? gradientColors[i] : "#D1D5DB"}`,
                  borderRadius: 12,
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}>
                  <button
                    onClick={() => setExpandedPrinciple(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1.25rem 1.5rem",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: gradientColors[i],
                      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: "0.85rem", flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontFamily: serifFont, fontSize: "1.05rem", fontWeight: 600, color: "#1A1A2E", flex: 1 }}>
                      {p.name}
                    </span>
                    <span style={{ color: "#9CA3AF", fontSize: "1.2rem", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
                      ▾
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 1.5rem 1.5rem" }}>
                      <div style={{
                        padding: "1rem 1.25rem",
                        borderRadius: 8,
                        background: `${lensColors[lens]}10`,
                        borderLeft: `3px solid ${lensColors[lens]}`,
                      }}>
                        <span style={{ color: lensColors[lens], fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          {lensLabels[lens]} Lens
                        </span>
                        <p style={{ color: "#3D3D5C", lineHeight: 1.7, marginTop: "0.5rem", fontSize: "0.95rem" }}>
                          {p[lens]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── The Research ── */}
      <section style={{ background: "#1A1A2E", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serifFont, fontSize: "1.6rem", color: "#FAF6F1", marginBottom: "1.5rem", textAlign: "center" }}>
            Corroborating Research
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { title: "Be Careful What You Tell Your AI Chatbot", source: "Stanford HAI, October 2025", url: "https://hai.stanford.edu/news/be-careful-what-you-tell-your-ai-chatbot" },
              { title: "93% of Employees Share Confidential Data With Unauthorized AI Tools", source: "Kiteworks, August 2025", url: "https://www.kiteworks.com/cybersecurity-risk-management/employees-sharing-confidential-data-unauthorized-ai-tools/" },
              { title: "The Hidden Risks of Sharing ChatGPT Screenshots Online", source: "ACE Tech Group, October 2025", url: "https://acetechgroup.com/the-hidden-risks-of-sharing-chatgpt-screenshots-online/" },
              { title: "Everyday AI and Privacy: Three Scenarios You Might Face at Work", source: "University of Iowa, March 2026", url: "https://its.uiowa.edu/news/2026/03/everyday-ai-and-privacy-three-scenarios-you-might-face-work" },
              { title: "Model Drift, Data Leaks and Deepfakes: Rethinking AI Governance", source: "IAPP, August 2025", url: "https://iapp.org/news/a/model-drift-data-leaks-and-deepfakes-rethinking-ai-governance-in-the-age-of-autonomous-risk" },
              { title: "Data Governance: Organizing Data for Trustworthy AI", source: "Janssen et al., Government Information Quarterly, 2020 (1,088 citations)", url: "https://www.sciencedirect.com/science/article/pii/S0740624X20302719" },
              { title: "User Privacy Harms and Risks in Conversational AI", source: "arXiv, February 2024", url: "https://arxiv.org/abs/2402.09716" },
              { title: "Is It Safe to Put Confidential Information in AI Tools?", source: "AI For Lawyers, March 2026", url: "https://aiforlawyers.substack.com/p/is-it-safe-to-put-confidential-information" },
            ].map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "1rem 1.25rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  textDecoration: "none",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#B45309")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              >
                <span style={{ color: "#FAF6F1", fontSize: "0.95rem", fontWeight: 600, display: "block" }}>
                  {r.title} ↗
                </span>
                <span style={{ color: "#9CA3AF", fontSize: "0.8rem" }}>{r.source}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-links ── */}
      <section style={{ background: "#FAF6F1", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h3 style={{ fontFamily: serifFont, fontSize: "1.3rem", color: "#1A1A2E", marginBottom: "1rem" }}>
            Where This Connects
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
            {[
              { label: "User Governance", path: "/user-governance", color: "#B45309" },
              { label: "EU AI Act", path: "/eu-ai-act", color: "#92400E" },
              { label: "What Claude Admitted", path: "/what-claude-admitted", color: "#78350F" },
              { label: "Five Rules", path: "/five-rules", color: "#713F12" },
              { label: "Road Protocol", path: "/road-protocol", color: "#854D0E" },
              { label: "Research Hub", path: "/research-hub", color: "#A16207" },
            ].map((link, i) => (
              <Link key={i} href={link.path}>
                <div style={{
                  padding: "0.75rem 1rem",
                  borderRadius: 8,
                  border: `1px solid ${link.color}30`,
                  background: `${link.color}08`,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${link.color}15`; e.currentTarget.style.borderColor = link.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `${link.color}08`; e.currentTarget.style.borderColor = `${link.color}30`; }}
                >
                  <span style={{ color: link.color, fontWeight: 600, fontSize: "0.9rem" }}>
                    {link.label} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Learning Flow ── */}
      {flow && (
        <LearningFlow
          current="Screenshots & Sharing"
          deeper={flow.deeper}
          wider={flow.wider}
          simpler={flow.simpler}
        />
      )}

      <Footer />
    </div>
  );
}
