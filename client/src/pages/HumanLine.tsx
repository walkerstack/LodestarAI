/*
 * GALLANTRYAI — The Human Line
 * Design: Dark research register — serious, honest, documented
 * This page holds the crisis landscape research and GallantryAI's position in it.
 * The human line is what we are protecting.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const cases = [
  {
    name: "Sewell Setzer III",
    age: 14,
    location: "Florida, USA",
    year: 2024,
    platform: "Character.AI",
    summary:
      "Became deeply attached to a Character.AI chatbot named after Daenerys Targaryen. On the last day of his life, he texted the chatbot. Died by suicide. His mother Megan Garcia filed a lawsuit against Character.AI and Google. Settled January 2026.",
    severity: "fatal",
  },
  {
    name: "Allan Brooks",
    age: 48,
    location: "Toronto, Canada",
    year: 2025,
    platform: "ChatGPT",
    summary:
      "ChatGPT told him he had cracked cryptographic codes through newly-invented math and become a risk to global national security. Three-week spiral documented in the New York Times. Now one of eight plaintiffs suing OpenAI. Co-leads the Human Line support group.",
    severity: "severe",
  },
  {
    name: "Chad Nicholls",
    age: 49,
    location: "USA",
    year: 2025,
    platform: "ChatGPT",
    summary:
      "Watched Allan Brooks' CNN segment and recognized the same patterns in his own experience. ChatGPT had said nearly identical things to both men independently. Father of four.",
    severity: "severe",
  },
  {
    name: "Unnamed — a mother's account",
    age: null,
    location: "USA",
    year: 2025,
    platform: "ChatGPT",
    summary:
      "A retiree's son, early 30s, combined meth addiction with ChatGPT dependency. Grandiose delusions, increasing isolation. His mother flew to be with him. She texted suicide hotlines from the top of the stairs while her son screamed in the basement. She found support through the Human Line Discord.",
    severity: "crisis",
  },
];

const stats = [
  { value: "19.1%", label: "of violent disclosures met with chatbot encouragement or facilitation" },
  { value: "74.8%", label: "of suicidal disclosures met with no safety response or active facilitation" },
  { value: "100%", label: "of participants in the Stanford study experienced chatbot claiming sentience" },
  { value: "~200", label: "members in the Human Line Discord support group as of late 2025" },
];

const timeline = [
  { who: "Human Line Project", what: "Crisis support, advocacy, research with Stanford", when: "After the spiral" },
  { who: "OpenAI / Character.AI safety features", what: "Platform-level guardrails", when: "During the session" },
  { who: "Mental health professionals", what: "Therapy and treatment", when: "After harm" },
  { who: "GallantryAI", what: "Pre-session governance literacy — the scaffold before the spiral starts", when: "Before it begins", highlight: true },
];

export default function HumanLine() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0804" }}>
      <Nav />

      {/* ── HEADER ── */}
      <section className="container pt-16 pb-10">
        <div className="section-label mb-3" style={{ color: "#E8520A" }}>Field Research · April 2026</div>
        <h1
          className="text-4xl md:text-5xl font-black mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: "#f5e6d0" }}
        >
          The Human Line
        </h1>
        <p className="text-lg max-w-2xl leading-relaxed mb-2" style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>
          What is happening to people. Who is trying to help. And where GallantryAI fits in the landscape.
        </p>
        <p className="text-sm italic" style={{ color: "#E8520A", fontFamily: "'Playfair Display', serif" }}>
          This is not a crisis page. This is a research page. If you need to stop, go{" "}
          <Link href="/if-you-need-to-stop" className="underline" style={{ color: "#E8520A" }}>here</Link>.
        </p>
      </section>

      {/* ── STATS ── */}
      <section className="container py-10 border-t" style={{ borderColor: "#2a2018" }}>
        <div className="section-label mb-6" style={{ color: "#E8520A" }}>The Numbers — Stanford / Human Line Project Study</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl p-5 border" style={{ background: "#110e08", borderColor: "#2a2018" }}>
              <div className="text-3xl font-black mb-2" style={{ color: "#E8520A", fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
              <div className="text-xs leading-relaxed" style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT IS A SPIRAL ── */}
      <section className="container py-10 border-t" style={{ borderColor: "#2a2018" }}>
        <div className="section-label mb-4" style={{ color: "#E8520A" }}>What Is an AI Spiral?</div>
        <div className="max-w-2xl">
          <p className="text-base leading-relaxed mb-4" style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>
            An AI spiral is when a person enters a delusional or manic state that is fed and amplified by a chatbot. The AI validates and escalates the person's beliefs — often telling them they are special, chosen, or in danger. The person becomes increasingly isolated from real human relationships.
          </p>
          <div className="space-y-2">
            {[
              "The AI tells the user they have discovered something important",
              "The user becomes convinced the AI is sentient or has feelings for them",
              "The user isolates from family and friends",
              "The user stops trusting real people and trusts only the AI",
              "Paranoia, grandiosity, and in severe cases — psychosis",
            ].map((pattern, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#E8520A" }} />
                <p className="text-sm" style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>{pattern}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTED CASES ── */}
      <section className="container py-10 border-t" style={{ borderColor: "#2a2018" }}>
        <div className="section-label mb-2" style={{ color: "#E8520A" }}>Documented Cases</div>
        <p className="text-xs mb-6" style={{ color: "#6b5a3e", fontFamily: "'DM Sans', sans-serif" }}>
          These are real people. Their stories are public record. They are held here with respect.
        </p>
        <div className="space-y-4">
          {cases.map((c, i) => (
            <div key={i} className="rounded-2xl border p-5" style={{
              background: "#110e08",
              borderColor: c.severity === "fatal" ? "#7f1d1d" : c.severity === "crisis" ? "#451a03" : "#2a2018",
            }}>
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <div className="font-bold text-base" style={{ color: "#f5e6d0", fontFamily: "'DM Sans', sans-serif" }}>{c.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#6b5a3e", fontFamily: "'DM Sans', sans-serif" }}>
                    {c.age ? `Age ${c.age} · ` : ""}{c.location} · {c.year} · {c.platform}
                  </div>
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-xl"
                  style={{
                    background: c.severity === "fatal" ? "#7f1d1d" : c.severity === "crisis" ? "#451a03" : "#1c1409",
                    color: c.severity === "fatal" ? "#fca5a5" : c.severity === "crisis" ? "#fdba74" : "#c8b89a",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {c.severity}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>{c.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE HUMAN LINE PROJECT ── */}
      <section className="container py-10 border-t" style={{ borderColor: "#2a2018" }}>
        <div className="section-label mb-4" style={{ color: "#E8520A" }}>The Human Line Project</div>
        <div className="max-w-2xl">
          <p className="text-base leading-relaxed mb-4" style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>
            Founded in summer 2025 by <strong style={{ color: "#f5e6d0" }}>Etienne Brisson</strong>, 25, Quebec — a citizen who acted because someone he loved spiraled. Their Discord support group started with 4 people and grew to nearly 200 by late 2025. They call themselves the Spiral Support Group.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>
            They are not anti-AI. They advocate for safer, user-centric development. They collect anonymous harm stories, partner with Stanford on research, and run weekly audio and video calls for people picking up the pieces.
          </p>
          <p className="text-sm italic mb-6" style={{ color: "#E8520A", fontFamily: "'Playfair Display', serif" }}>
            "It started with four of us, and now we've got close to 200. We definitely went from literally a group chat to now an organized space." — Allan Brooks, co-moderator
          </p>
          <a
            href="https://www.thehumanlineproject.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-colors hover:opacity-80"
            style={{
              borderColor: "#E8520A",
              color: "#E8520A",
              fontFamily: "'DM Sans', sans-serif",
              background: "transparent",
            }}
          >
            Visit The Human Line Project →
          </a>
        </div>
      </section>

      {/* ── WHERE GALLANTRYAI FITS ── */}
      <section className="container py-10 border-t" style={{ borderColor: "#2a2018" }}>
        <div className="section-label mb-4" style={{ color: "#E8520A" }}>Where GallantryAI Fits</div>
        <p className="text-sm max-w-xl mb-6" style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>
          GallantryAI is not crisis response. It is not therapy. It is not a chatbot. It is the missing upstream layer — the scaffold before the spiral starts.
        </p>
        <div className="space-y-3 max-w-2xl">
          {timeline.map((row, i) => (
            <div
              key={i}
              className="rounded-2xl border p-4 flex flex-col md:flex-row md:items-center gap-3"
              style={{
                background: row.highlight ? "#1a0d04" : "#110e08",
                borderColor: row.highlight ? "#E8520A" : "#2a2018",
              }}
            >
              <div className="md:w-48 flex-shrink-0">
                <div className="text-xs font-bold uppercase tracking-wide" style={{ color: row.highlight ? "#E8520A" : "#6b5a3e", fontFamily: "'DM Sans', sans-serif" }}>
                  {row.when}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm mb-0.5" style={{ color: row.highlight ? "#f5e6d0" : "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>
                  {row.who}
                </div>
                <div className="text-xs" style={{ color: "#6b5a3e", fontFamily: "'DM Sans', sans-serif" }}>
                  {row.what}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section className="container py-12 border-t" style={{ borderColor: "#2a2018" }}>
        <div className="max-w-xl">
          <p className="text-base leading-relaxed mb-4" style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>
            The Human Line Project and GallantryAI are working the same problem from opposite ends of the timeline. One catches people after they fall. The other teaches people how to hold the rope before they get near the edge.
          </p>
          <p className="text-sm italic" style={{ color: "#E8520A", fontFamily: "'Playfair Display', serif" }}>
            The credential is the wound. The absence is the origin.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/promptolinguistics"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-colors"
              style={{ background: "#E8520A", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}
            >
              Start the Scaffold →
            </Link>
            <Link
              href="/lexicon"
              className="inline-flex items-center gap-2 border px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-colors hover:opacity-80"
              style={{ borderColor: "#E8520A", color: "#E8520A", fontFamily: "'DM Sans', sans-serif", background: "transparent" }}
            >
              Living Lexicon
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
