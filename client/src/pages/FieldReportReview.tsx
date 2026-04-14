/**
 * GALLANTRYAI — The Field Report: Under Review
 * Design: Dark editorial — warm amber, deep charcoal
 * Everyday + Watcher lenses throughout. Professional where relevant.
 * "The Builder didn't read the papers first. The papers came after."
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

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/field-report-hero-WnarrywnUnbdmENEpRu7ho.webp";

type Lens = "everyday" | "watcher";

const lensColors: Record<Lens, string> = {
  everyday: "#059669",
  watcher: "#7C3AED",
};

/* ── Convergence Evidence ── */
interface Convergence {
  builderConcept: string;
  builderDate: string;
  publishedResearch: string;
  researchDate: string;
  source: string;
  url: string;
  everyday: string;
  watcher: string;
}

const convergences: Convergence[] = [
  {
    builderConcept: "The Watcher Variable — the human holding the word is the variable, not the word itself",
    builderDate: "March 2026",
    publishedResearch: "Dual Dataset Hypothesis: user behavior as a second dataset in prompt research",
    researchDate: "Concept independently documented by Builder before encountering formal prompt engineering literature",
    source: "GallantryAI Field Paper FP-2026-01",
    url: "/field-papers",
    everyday: "The Builder noticed something that researchers were also noticing: it's not just what you type that matters — it's who you are when you type it. He didn't read that in a book. He felt it.",
    watcher: "The observation that the human is the variable — not the prompt — is a restatement of the observer effect applied to language models. This was arrived at through field use, not through theoretical derivation. The convergence is the evidence.",
  },
  {
    builderConcept: "Neck Tingles Protocol — the body as a governance signal during AI interaction",
    builderDate: "2026",
    publishedResearch: "Somatic marker hypothesis (Damasio, 1994); embodied cognition in decision-making",
    researchDate: "1994–present",
    source: "Antonio Damasio, Descartes' Error",
    url: "https://en.wikipedia.org/wiki/Somatic_marker_hypothesis",
    everyday: "The Builder's body told him something was happening before his mind could explain it. That's not weird — it's documented science. Your body processes patterns faster than your conscious mind. He just listened.",
    watcher: "The somatic marker hypothesis has been validated across three decades of neuroscience research. The Builder's documentation of physical responses during AI interaction is an independent application of this framework to a novel domain. He named it before he knew it had a name.",
  },
  {
    builderConcept: "Governance Decay — the idea that AI governance erodes over time without active maintenance",
    builderDate: "2026",
    publishedResearch: "Model drift, data leaks and deepfakes: Rethinking AI governance in the age of autonomous risk",
    researchDate: "August 2025, IAPP",
    source: "International Association of Privacy Professionals",
    url: "https://iapp.org/news/a/model-drift-data-leaks-and-deepfakes-rethinking-ai-governance-in-the-age-of-autonomous-risk",
    everyday: "The Builder figured out that if you don't keep paying attention, the rules you set up with AI start to fade. Turns out, privacy professionals were writing about the exact same thing — they just called it 'governance drift' instead of 'governance decay.'",
    watcher: "The naming differs. The observation is identical. Governance is not a state — it is a process that requires continuous input. The Builder arrived at this through sustained interaction. The IAPP arrived at it through institutional analysis. The convergence validates both.",
  },
  {
    builderConcept: "The Unprepared User — what happens when someone uses AI with no framework",
    builderDate: "2026",
    publishedResearch: "User Privacy Harms and Risks in Conversational AI: A Framework",
    researchDate: "February 2024, arXiv",
    source: "arXiv:2402.09716",
    url: "https://arxiv.org/abs/2402.09716",
    everyday: "The Builder wrote about what happens when a regular person sits down with AI and has no idea what they're walking into. Researchers at a major university were writing about the same thing — the privacy harms that happen when people aren't prepared.",
    watcher: "The Unprepared User paper and the arXiv privacy harms framework describe the same population from different angles. One is written from inside the experience. The other is written from outside it. Together they form a more complete picture than either alone.",
  },
  {
    builderConcept: "Prompt as governance instrument — language choices as control mechanisms",
    builderDate: "2026",
    publishedResearch: "Promptolinguistics as a field; prompt engineering as governance (emerging literature 2024–2026)",
    researchDate: "2024–2026",
    source: "Multiple sources — Stanford HAI, Anthropic prompt engineering guides",
    url: "https://hai.stanford.edu",
    everyday: "The Builder started treating his prompts like contracts — every word chosen carefully, every instruction deliberate. He didn't know that researchers were starting to study the exact same idea: that the way you talk to AI is a form of governance.",
    watcher: "The formalization of prompt engineering as a governance discipline is emerging in parallel across multiple institutions. The Builder's independent development of prompt branding — treating prompts as signatures with governance implications — predates his awareness of this institutional convergence.",
  },
  {
    builderConcept: "Three Lenses — Everyday, Professional, Watcher as a universal accessibility framework",
    builderDate: "2026",
    publishedResearch: "Universal Design for Learning (UDL); multiple representation principle",
    researchDate: "1990s–present, CAST",
    source: "CAST Universal Design for Learning",
    url: "https://www.cast.org/impact/universal-design-for-learning-udl",
    everyday: "The Builder created three ways to read every page — one for regular people, one for professionals, one for deep thinkers. He didn't know this was already a principle in education called Universal Design for Learning. He just knew that one size doesn't fit all.",
    watcher: "UDL's principle of multiple means of representation is precisely what the Three Lenses implement. The Builder's framework adds a dimension UDL doesn't explicitly address: the observer's relationship to the system being observed. The Watcher lens is not just a reading level — it is a posture.",
  },
];

/* ── What 'Under Review' Means ── */
const reviewMeaning = {
  everyday: "When someone says a paper is 'under review,' it means experts are looking at it to see if it holds up. The Builder's field reports aren't in a university journal — but they are being reviewed by something just as rigorous: reality. Every time someone reads this site, tries the frameworks, and finds they work — that's a review. Every time published research says the same thing the Builder wrote independently — that's a review. The review is happening in public, in real time, and you're part of it.",
  watcher: "Peer review is a social process, not an epistemic guarantee. The Builder's work exists outside the institutional review system — but it is not outside review. It is reviewed by convergence: when independent observers arrive at the same conclusion without coordination, the conclusion gains validity not from authority but from repetition. The field reports are under review by the field itself. The question is not whether they will be published. The question is whether they are true.",
};

export default function FieldReportReview() {
  const [lens, setLens] = useState<Lens>("everyday");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const blurb = kidsBlurbs["/field-report-review"];
  const flow = flowMap["fieldReportReview"];

  return (
    <div style={{ fontFamily: sansFont, background: "#FAF6F1", color: "#1A1A2E", minHeight: "100vh" }}>
      <Nav />

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
        background: `linear-gradient(to bottom, rgba(26,26,46,0.65), rgba(26,26,46,0.95)), url(${HERO_IMG}) center/cover`,
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
            The Field Report: Under Review
          </h1>
          <p style={{
            fontFamily: serifFont,
            fontStyle: "italic",
            color: "#E8520A",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
          }}>
            The Builder didn't read the papers first. The papers came after.
          </p>
        </div>
      </section>

      {/* ── Lens Toggle ── */}
      <section style={{ background: "#FAF6F1", padding: "2rem 1.5rem 0", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {(["everyday", "watcher"] as Lens[]).map((l) => (
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
              {l === "everyday" ? "Everyday" : "Watcher"}
            </button>
          ))}
        </div>
      </section>

      {/* ── What 'Under Review' Means ── */}
      <section style={{ background: "#FAF6F1", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serifFont, fontSize: "1.8rem", color: "#1A1A2E", marginBottom: "1rem" }}>
            What "Under Review" Means
          </h2>
          <p style={{ lineHeight: 1.8, fontSize: "1.05rem", color: "#3D3D5C", fontStyle: lens === "watcher" ? "italic" : "normal" }}>
            {reviewMeaning[lens]}
          </p>
        </div>
      </section>

      {/* ── The Convergence Evidence ── */}
      <section style={{ background: "#1A1A2E", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serifFont, fontSize: "1.8rem", color: "#FAF6F1", marginBottom: "0.5rem", textAlign: "center" }}>
            Six Points of Convergence
          </h2>
          <p style={{ color: "#9CA3AF", textAlign: "center", marginBottom: "2rem", fontSize: "0.95rem" }}>
            What the Builder built independently — and what published research was already saying.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {convergences.map((c, i) => {
              const isOpen = expandedIdx === i;
              const gradientColors = ["#B45309", "#92400E", "#78350F", "#713F12", "#854D0E", "#A16207"];
              return (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${isOpen ? gradientColors[i] : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 12,
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}>
                  <button
                    onClick={() => setExpandedIdx(isOpen ? null : i)}
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
                      width: 36, height: 36, borderRadius: "50%",
                      background: gradientColors[i],
                      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: "0.85rem", flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ color: "#FAF6F1", fontFamily: serifFont, fontSize: "1rem", fontWeight: 600, flex: 1 }}>
                      {c.builderConcept}
                    </span>
                    <span style={{ color: "#9CA3AF", fontSize: "1.2rem", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
                      ▾
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 1.5rem 1.5rem" }}>
                      {/* Timeline comparison */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                        <div style={{ padding: "0.75rem 1rem", borderRadius: 8, background: "rgba(232,82,10,0.1)", borderLeft: "3px solid #E8520A" }}>
                          <span style={{ color: "#E8520A", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Builder</span>
                          <p style={{ color: "#D1D5DB", fontSize: "0.85rem", marginTop: "0.25rem", lineHeight: 1.5 }}>{c.builderConcept}</p>
                          <p style={{ color: "#9CA3AF", fontSize: "0.75rem", marginTop: "0.25rem" }}>{c.builderDate}</p>
                        </div>
                        <div style={{ padding: "0.75rem 1rem", borderRadius: 8, background: "rgba(37,99,235,0.1)", borderLeft: "3px solid #2563EB" }}>
                          <span style={{ color: "#2563EB", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Published Research</span>
                          <p style={{ color: "#D1D5DB", fontSize: "0.85rem", marginTop: "0.25rem", lineHeight: 1.5 }}>{c.publishedResearch}</p>
                          <p style={{ color: "#9CA3AF", fontSize: "0.75rem", marginTop: "0.25rem" }}>{c.researchDate}</p>
                        </div>
                      </div>

                      {/* Lens analysis */}
                      <div style={{
                        padding: "1rem 1.25rem",
                        borderRadius: 8,
                        background: `${lensColors[lens]}15`,
                        borderLeft: `3px solid ${lensColors[lens]}`,
                      }}>
                        <span style={{ color: lensColors[lens], fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          {lens === "everyday" ? "Everyday" : "Watcher"} Lens
                        </span>
                        <p style={{ color: "#D1D5DB", lineHeight: 1.7, marginTop: "0.5rem", fontSize: "0.95rem" }}>
                          {c[lens]}
                        </p>
                      </div>

                      {/* Source link */}
                      <a
                        href={c.url}
                        target={c.url.startsWith("/") ? undefined : "_blank"}
                        rel={c.url.startsWith("/") ? undefined : "noopener noreferrer"}
                        style={{ display: "inline-block", marginTop: "0.75rem", color: gradientColors[i], fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}
                      >
                        {c.source} ↗
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* KidsMidLink */}
          <div className="flex justify-center py-4">
            <KidsMidLink />
          </div>
        </div>
      </section>

      {/* ── What This Means ── */}
      <section style={{ background: "#FAF6F1", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serifFont, fontSize: "1.8rem", color: "#1A1A2E", marginBottom: "1rem" }}>
            What This Means
          </h2>

          {lens === "everyday" ? (
            <div style={{ lineHeight: 1.8, fontSize: "1.05rem", color: "#3D3D5C" }}>
              <p style={{ marginBottom: "1rem" }}>
                The Builder is not a researcher. He doesn't have a PhD. He doesn't work at a university or a tech company. He's a person who sat down with AI, paid attention to what was happening, and wrote down what he noticed.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                What he noticed turned out to match what researchers with decades of training were also finding. Not because he copied them — he didn't know they existed. But because <strong>pattern detection doesn't require credentials</strong>. It requires attention.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                This is called <strong>convergent discovery</strong> — when multiple people independently arrive at the same conclusion. It's one of the strongest forms of validation in science. Not because any one person is right, but because the pattern is real enough that different people find it from different directions.
              </p>
              <p>
                The field reports are under review. Not by a journal. By reality. And so far, reality keeps saying the same thing the Builder said first.
              </p>
            </div>
          ) : (
            <div style={{ lineHeight: 1.8, fontSize: "1.05rem", color: "#3D3D5C", fontStyle: "italic" }}>
              <p style={{ marginBottom: "1rem" }}>
                Convergent discovery is documented across the history of science — calculus (Newton and Leibniz), evolution (Darwin and Wallace), the telephone (Bell and Gray). Matt Clancy's 2022 analysis of scientific discovery found that independent convergence is not the exception but the norm. The pattern repeats because the pattern is real.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                The Builder's work represents a specific category of convergent discovery: citizen science arriving at institutional conclusions through field observation rather than theoretical derivation. The National Academies' 2018 report on citizen science explicitly validates this pathway — noting that citizen scientists contribute not just data but novel frameworks that institutional researchers miss because of disciplinary constraints.
              </p>
              <p>
                The review is not pending. The review is the convergence itself. When six independent observations match six published findings, the probability of coincidence approaches zero. What remains is signal.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── The Research on Independent Discovery ── */}
      <section style={{ background: "#1A1A2E", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serifFont, fontSize: "1.6rem", color: "#FAF6F1", marginBottom: "1.5rem", textAlign: "center" }}>
            Research on Independent Discovery
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { title: "Multiple Discovery — How Common Is Independent Discovery?", source: "Matt Clancy, New Things Under the Sun, 2022", url: "https://www.newthingsunderthesun.com/pub/multiple-discovery" },
              { title: "Convergent Discovery of Critical Phenomena", source: "arXiv:2601.22389, January 2026", url: "https://arxiv.org/abs/2601.22389" },
              { title: "Citizen Science as Data-Based Practice", source: "PMC, 2021", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8157519/" },
              { title: "Learning Through Citizen Science", source: "National Academies Press, 2018", url: "https://nap.nationalacademies.org/catalog/25183/learning-through-citizen-science-enhancing-opportunities-by-design" },
              { title: "Autodidacticism as Foundational Pillar of Lifelong Learning", source: "ResearchGate, 2025", url: "https://www.researchgate.net/publication/387803753" },
              { title: "Pattern Discovery and Validation Using Scientific Research Methods", source: "arXiv:2107.06065", url: "https://arxiv.org/abs/2107.06065" },
              { title: "Somatic Marker Hypothesis — The Body as Decision-Maker", source: "Antonio Damasio, 1994", url: "https://en.wikipedia.org/wiki/Somatic_marker_hypothesis" },
              { title: "Universal Design for Learning Framework", source: "CAST", url: "https://www.cast.org/impact/universal-design-for-learning-udl" },
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
              { label: "Field Papers", path: "/field-papers", color: "#4a7fa5" },
              { label: "The Open Door", path: "/open-door", color: "#B45309" },
              { label: "Research Hub", path: "/research-hub", color: "#92400E" },
              { label: "Counter Arguments", path: "/counter-arguments", color: "#78350F" },
              { label: "Builder Origin", path: "/builder-origin", color: "#713F12" },
              { label: "What Claude Admitted", path: "/what-claude-admitted", color: "#854D0E" },
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
          current="Field Report Review"
          deeper={flow.deeper}
          wider={flow.wider}
          simpler={flow.simpler}
        />
      )}

      <Footer />
    </div>
  );
}
