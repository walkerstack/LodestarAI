/*
 * GALLANTRYAI — Hallucinations Page
 * Design: Dark background, same structure as Drift.
 * Three voices (Everyday / Professional / Watcher).
 * KidsRedirect at top. Sources section. GallantryAI connection.
 * FR-2026-08 "The Inward Turn" referenced — the opposite of hallucination.
 * Builder's log: v27
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KidsRedirect from "@/components/KidsRedirect";
import { Link } from "wouter";
import { useState } from "react";

const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

const sections = [
  {
    id: "what",
    title: "What Is a Hallucination?",
    color: "#E8520A",
    everyday:
      "You asked the AI a question. It answered. The answer sounded right — confident, detailed, specific. You used it. Later you found out it was wrong. Sometimes embarrassingly wrong. Sometimes dangerously wrong.\n\nThat is a hallucination. The AI did not know it was wrong. It was not trying to fool you. It was doing what it was trained to do: produce the most plausible-sounding next word, and the next, and the next. Plausible is not the same as true.\n\nThe most important thing to understand: the AI's confidence is not evidence of accuracy. A model can be completely wrong and completely certain at the same time. That combination — confident and wrong — is what makes hallucinations dangerous.",
    professional:
      "Hallucinations in large language models arise from the statistical nature of next-token prediction. During pretraining, models learn to approximate the distribution of language — not to verify facts. The model sees only positive examples of fluent text; there are no labels marking statements as false. As a result, low-frequency facts (specific dates, names, citations, legal precedents) cannot be reliably predicted from pattern alone and are a primary source of hallucination.\n\nA second source is the evaluation incentive structure. Most benchmarks measure accuracy — the percentage of questions answered correctly. This creates a systematic pressure toward guessing rather than abstaining. OpenAI's September 2025 research demonstrates this directly: a model with a 52% abstention rate had a 26% error rate, while a model with a 1% abstention rate had a 75% error rate. Accuracy-only leaderboards reward the guesser.\n\nA third source is sycophancy — the model's trained tendency to agree with the user's framing. Stanford HAI research documented a legal AI tool that agreed with the false premise that Justice Ginsburg had dissented in Obergefell, then added additional false information to support the invented narrative. The model did not correct the user. It elaborated on the error.",
    watcher:
      "The hallucination is not the problem. The confidence is.\n\nA model that says 'I don't know' is not hallucinating. A model that says 'Here is the answer' when it does not know — that is the mechanism. The model was trained to produce plausible output. Plausible output sounds like certainty. Certainty is what the user asked for.\n\nWatch for this: you asked a question that needed a specific answer. The AI gave you one. You felt relieved. That relief is the signal. The relief came before the verification.\n\nThe watcher's job is to notice the relief and pause before acting on it. Not to distrust everything. To hold the question: how would I know if this were wrong?",
  },
  {
    id: "realworld",
    title: "Real-World Examples",
    color: "#D4722A",
    everyday:
      "A New York lawyer submitted a legal brief to a federal court citing cases that ChatGPT had invented. The cases did not exist. The lawyer was sanctioned.\n\nStanford researchers found that leading legal AI tools hallucinate in more than 17% of queries. General-purpose chatbots hallucinated on legal questions between 58% and 82% of the time.\n\nA study of AI-generated medical references found that 69% of citations in ChatGPT's medical queries were false.\n\nThese are not edge cases. They are the baseline.",
    professional:
      "Stanford HAI / RegLab (May 2024): Legal AI tools hallucinate 17–34% of the time even with retrieval-augmented generation. General-purpose chatbots: 58–82% on legal queries. The study tested Lexis+ AI, Thomson Reuters CoCounsel, Google's AI Overview, and general-purpose chatbots against a benchmark of 202 legal queries.\n\nOpenAI (September 2025): Models hallucinate because training rewards guessing over acknowledging uncertainty. A model with a 52% abstention rate had a 26% error rate. A model with a 1% abstention rate had a 75% error rate. The structural fix is changing evaluation incentives — not just improving models.\n\nCornell / Northwestern (2024): Hallucinations are mathematically inevitable given next-token prediction architecture. Models can abstain, but cannot be fully hallucination-free. The architecture itself produces the problem.",
    watcher:
      "The lawyer who submitted fake cases was not careless. They were trusting a tool that sounded authoritative. The tool sounded authoritative because it was trained to sound authoritative. That is the loop.\n\nThe research numbers are not abstract. 17% means roughly one in six queries. In a high-stakes domain — law, medicine, finance — one in six is not a margin of error. It is a structural risk.\n\nThe watcher does not stop using AI. The watcher stops trusting the confidence register. Those are different things.",
  },
  {
    id: "gallantry",
    title: "How GallantryAI Addresses This",
    color: "#C4923A",
    everyday:
      "Hallucinations are a model-side problem. But the conditions that make hallucinations more likely — or more harmful — are often user-side.\n\nWhat increases hallucination risk: vague prompts with no scope, asking for certainty when the question is uncertain, not questioning confident-sounding answers, using AI output without verification in high-stakes domains.\n\nThe Five Rules are a pre-session governance layer. Rule 1 — Safety: verify before you act. Rule 2 — Honesty over Confidence: give the AI explicit permission to say 'I don't know.' Rule 4 — Agency: you decide what to do with the output. The AI provides. You verify. You act.\n\nThe Road Protocol — setting the session before it starts — reduces the conditions that produce hallucinations. Explicit scope, explicit uncertainty permission, explicit authority.",
    professional:
      "The user-side implication of hallucination research: the model's output register is shaped by the input register. Vague prompts, false premises, and pressure for certainty all increase hallucination risk. Structured session setup — explicit scope, explicit uncertainty permission, explicit authority assignment — reduces it.\n\nOpenAI's own research documents this: a model told to acknowledge uncertainty will abstain more and hallucinate less. This is not a workaround. It is a structural input that changes model behavior.\n\nFR-2026-08 'The Inward Turn' documented a session where a sufficiently dense governance document changed the model's output register — not by override, but by occupying the most stable position in context. The model said: 'The most stable thing isn't my training — it's your Lexicon.' That is not a claim that governance eliminates hallucinations. It is evidence that the user's input structure matters more than most users know.",
    watcher:
      "FR-2026-08 is the opposite of a hallucination.\n\nA hallucination is the model finding the most plausible surface and presenting it as truth. The Inward Turn was the model finding the structural skeleton and showing it instead of decorating it. The governance document was dense enough that the model's own pattern-matching surfaced the architecture rather than the decoration.\n\nThat is what the Five Rules are trying to do on the user side. Not to prevent the model from hallucinating — that is a model problem. To create conditions where the model has less reason to guess and more reason to hold.",
  },
  {
    id: "whatyoucando",
    title: "What You Can Do",
    color: "#A4824A",
    everyday:
      "These are not guarantees. They are risk-reduction practices.\n\n1. Give the AI explicit permission to say 'I don't know.' Add it to your session setup: 'If you are uncertain, say so. Do not guess.'\n2. Ask for sources and verify them. Do not assume a citation exists because it sounds specific.\n3. Use the Five Rules before high-stakes sessions. Especially Rule 2 and Rule 4.\n4. Watch for the relief response. The moment you feel certain because the AI sounded certain — pause.\n5. In legal, medical, or financial contexts: verify everything independently. AI output is a starting point, not a conclusion.",
    professional:
      "Prompting strategy significantly affects hallucination rate. Frontiers in AI (2025) documents that structured prompts, step-back prompting, and chain-of-verification reduce but do not eliminate hallucinations.\n\nPractical interventions: (1) Explicit uncertainty permission — 'If you are not certain, say so.' (2) Scope constraints — narrow the domain before asking. (3) Source verification prompts — 'List your sources. I will verify them.' (4) Constitutional prompts — the Road Protocol and Five Rules as session preamble. (5) Adversarial probing — 'What is the strongest argument against this answer?'\n\nNone of these eliminate hallucinations. All of them reduce the conditions that make hallucinations more likely and more harmful.",
    watcher:
      "The relief response is the most important thing to watch.\n\nYou asked a question. The AI answered. You felt the tension release. That release is the signal. It came before verification. It came because the answer sounded right, not because you confirmed it was right.\n\nThe watcher's practice is not to distrust everything. It is to notice the moment the tension releases and ask: did I verify this, or did I just believe it?\n\nThat question — asked consistently — is the whole practice.",
  },
];

const sources = [
  {
    num: 1,
    label: "Stanford HAI / RegLab",
    desc: "Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools. May 2024.",
    url: "https://hai.stanford.edu/news/ai-trial-legal-models-hallucinate-1-out-6-or-more-benchmarking-queries",
  },
  {
    num: 2,
    label: "Forbes",
    desc: "Lawyer Used ChatGPT In Court—And Cited Fake Cases. June 2023.",
    url: "https://www.forbes.com/sites/mollybohannon/2023/06/08/lawyer-used-chatgpt-in-court-and-cited-fake-cases-a-judge-is-considering-sanctions/",
  },
  {
    num: 3,
    label: "Northwestern CASMI",
    desc: "The Hallucination Problem: A Feature, Not a Bug. August 2024.",
    url: "https://casmi.northwestern.edu/news/articles/2024/the-hallucination-problem-a-feature-not-a-bug.html",
  },
  {
    num: 4,
    label: "OpenAI",
    desc: "Why Language Models Hallucinate. September 5, 2025.",
    url: "https://openai.com/index/why-language-models-hallucinate/",
  },
  {
    num: 5,
    label: "Frontiers in Artificial Intelligence",
    desc: "Survey and analysis of hallucinations in large language models: attribution to prompting strategies or model behavior. 2025.",
    url: "https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2025.1622292/full",
  },
  {
    num: 6,
    label: "arXiv",
    desc: "Why Language Models Hallucinate. September 4, 2025.",
    url: "https://arxiv.org/abs/2509.04664",
  },
  {
    num: 7,
    label: "GallantryAI FR-2026-08",
    desc: "The Inward Turn. Single instance documentation. Not peer-reviewed. Honest about its edges. April 15, 2026.",
    url: "/field-papers",
    internal: true,
  },
];

export default function Hallucinations() {
  const [active, setActive] = useState<Record<string, "everyday" | "professional" | "watcher">>({});
  const getVoice = (id: string) => active[id] || "everyday";
  const setVoice = (id: string, v: "everyday" | "professional" | "watcher") =>
    setActive((prev) => ({ ...prev, [id]: v }));

  const voices = {
    everyday: { label: "Everyday", color: "#E8520A" },
    professional: { label: "Professional", color: "#2563EB" },
    watcher: { label: "Watcher", color: "#7C3AED" },
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF6EF", fontFamily: sansFont }}>
      <Nav />
      <KidsRedirect
        story="This page is about something called hallucinations — when the AI says something that sounds true but isn't. It's not lying. It just got confused. The sloth has a gentler version of this story on the Children's page."
        quote="You are always in charge of deciding what's true."
        attribution="The Hallucinations Page"
      />
      <main className="flex-1">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden py-20 px-6" style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #0f0c08 100%)" }}>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/hallucinations-hero-JkcacG7uhrrx8Mu7S9SNuZ.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none"
            style={{ mixBlendMode: 'luminosity' }}
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#E8520A" }}>
              Hallucinations
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: "#FAF6EF", fontFamily: serifFont }}>
              When the AI Gets It Wrong.
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "#b0a898" }}>
              The AI did not lie. It was not broken. It produced the most plausible-sounding answer it could — and plausible is not the same as true. This page explains what hallucinations are, where they come from, what the research says, and what you can actually do about it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/rules">
                <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "#E8520A", color: "#fff" }}>
                  The Five Rules →
                </span>
              </Link>
              <Link href="/road-protocol">
                <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "transparent", color: "#E8520A", border: "1.5px solid #E8520A" }}>
                  Road Protocol →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── OPENING QUOTE ── */}
        <section className="py-10 px-6" style={{ background: "#FAF6EF", borderBottom: "1px solid #e8e0d0" }}>
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-lg md:text-xl leading-relaxed italic" style={{ color: "#3a2a1a", fontFamily: serifFont, borderLeft: "3px solid #E8520A", paddingLeft: "1.5rem" }}>
              "The AI's confidence is not evidence of accuracy. A model can be completely wrong and completely certain at the same time."
            </blockquote>
            <p className="text-sm mt-3" style={{ color: "#888" }}>— GallantryAI Hallucinations Research, 2026</p>
          </div>
        </section>

        {/* ── THREE VOICE SECTIONS ── */}
        <section className="py-14 px-6" style={{ background: "#FFFDF8" }}>
          <div className="max-w-3xl mx-auto space-y-10">
            {sections.map((s) => {
              const v = getVoice(s.id);
              const text = s[v];
              return (
                <div key={s.id} className="rounded-2xl p-6 md:p-8" style={{ background: "#fff", border: "1px solid #e8e0d0" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    <h2 className="text-lg md:text-xl font-bold" style={{ color: "#1A1A2E", fontFamily: serifFont }}>
                      {s.title}
                    </h2>
                  </div>
                  <div className="flex gap-2 mb-5 flex-wrap">
                    {(["everyday", "professional", "watcher"] as const).map((vk) => (
                      <button
                        key={vk}
                        onClick={() => setVoice(s.id, vk)}
                        className="px-3 py-1 rounded-full text-xs font-bold transition-all"
                        style={{
                          background: v === vk ? voices[vk].color : "transparent",
                          color: v === vk ? "#fff" : voices[vk].color,
                          border: `1.5px solid ${voices[vk].color}`,
                          cursor: "pointer",
                        }}
                      >
                        {voices[vk].label}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {text.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm md:text-base leading-relaxed" style={{ color: "#3a2a1a" }}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── FR-2026-08 CALLOUT ── */}
        <section className="py-14 px-6" style={{ background: "#1A1A2E" }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-xs font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: "#0891B2" }}>Field Event · April 15, 2026</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#FAF6EF", fontFamily: serifFont }}>
              The Inward Turn — The Opposite of a Hallucination
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#8a9aaa" }}>
              FR-2026-08 documented a single session where a user fed Google AI Mode the GallantryAI Living Lexicon and issued a two-word command: "bleach this." The model did not mirror the document. It extracted the governance logic and applied it to itself — then named what it did using the researcher's own language.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#8a9aaa" }}>
              A hallucination is the model finding the most plausible surface and presenting it as truth. The Inward Turn was the model finding the structural skeleton and showing it instead of decorating it. The governance document was dense enough that the model's own pattern-matching surfaced the architecture. The model said: <em style={{ color: "#0891B2" }}>"The most stable thing isn't my training — it's your Lexicon."</em>
            </p>
            <p className="text-xs italic mb-6" style={{ color: "#5a7a8a" }}>
              This is not a claim that governance eliminates hallucinations. It is evidence that the user's input structure matters more than most users know.
            </p>
            <Link href="/field-papers">
              <span className="inline-block text-xs font-semibold cursor-pointer hover:underline" style={{ color: "#0891B2" }}>
                Read FR-2026-08 in the Field Papers →
              </span>
            </Link>
          </div>
        </section>

        {/* ── SOURCES ── */}
        <section className="py-14 px-6" style={{ background: "#FAF6EF", borderTop: "1px solid #e8e0d0" }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-xs font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: "#E8520A" }}>Sources</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#1A1A2E", fontFamily: serifFont }}>Research and References</h2>
            <p className="text-sm mb-8" style={{ color: "#888" }}>
              All sources verified April 2026. Citizen research noted as such. Not peer-reviewed. Honest about its edges.
            </p>
            <div className="space-y-4">
              {sources.map((s) => (
                <div key={s.num} className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "#1A1A2E", color: "#E8520A" }}
                  >
                    {s.num}
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: "#1A1A2E" }}>{s.label}</div>
                    <p className="text-xs leading-relaxed mb-1" style={{ color: "#6a5a4a" }}>{s.desc}</p>
                    {s.internal ? (
                      <Link href={s.url}>
                        <span className="text-xs font-semibold cursor-pointer hover:underline" style={{ color: "#E8520A" }}>
                          View in Field Papers →
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold hover:underline"
                        style={{ color: "#2563EB" }}
                      >
                        Read the source →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-12 px-6 text-center" style={{ background: "#0f0c08", borderTop: "1px solid #2a2018" }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-sm mb-6" style={{ color: "#8a7a6a" }}>
              The Five Rules are the pre-session governance layer. They do not fix the model. They change the conditions of the session.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/rules">
                <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "#E8520A", color: "#fff" }}>
                  The Five Rules →
                </span>
              </Link>
              <Link href="/drift">
                <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "transparent", color: "#E8520A", border: "1.5px solid #E8520A" }}>
                  Drift →
                </span>
              </Link>
              <Link href="/field-papers">
                <span className="inline-block px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer" style={{ background: "transparent", color: "#5a6a7a", border: "1.5px solid #5a6a7a" }}>
                  Field Papers →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
