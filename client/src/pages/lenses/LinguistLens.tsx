/*
 * GALLANTRYAI — Linguist Lens
 * Design: Scholarly/warm register with teaching flow
 * Flow: What you study → What AI reveals → The Kinematics → Watcher insight → Child lens → Promptology
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LightboxImage } from "@/components/Lightbox";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import KidsRedirect from "@/components/KidsRedirect";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD";

const IMG = {
  alcm: `${CDN}/alcm-cognitive-physics_b9dcb9dc.jpg`,
  prompto: `${CDN}/promptolinguistics-infographic_b90e3b9d.jpg`,
  guide: `${CDN}/03-promptolinguistics-guide_0bf40786.png`,
  treeNeural: `${CDN}/linguist-hero-bg_861b53b2.png`,
  geometry: `${CDN}/geometry-of-insight-5-pathways_666fcf61.png`,
};

export default function LinguistLens() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: "study", label: "What You Study" },
    { id: "reveals", label: "What AI Reveals" },
    { id: "kinematics", label: "Kinematics of the Word" },
    { id: "prepositions", label: "Preposition as Vector" },
    { id: "watcher", label: "Watcher Insight" },
    { id: "child", label: "Through a Child's Eyes" },
    { id: "promptology", label: "Promptology" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />
      <KidsRedirect story="This page is about language — how words work when you talk to AI. Different words get different answers. It's like learning that 'please' changes everything." quote="Words are tools. Choose them carefully." attribution="The Linguist" />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1A1A2E]" />
          <div className="absolute inset-0 opacity-15">
            <img src={IMG.treeNeural} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative container py-16 md:py-24 max-w-4xl mx-auto px-6">
            <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Lens: Linguist
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Language Has Always Been Alive.<br />
              <span className="text-[#E8520A]">Now It Has a Laboratory.</span>
            </h1>
            <p className="text-base text-[#b0a898] max-w-xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              You've studied syntax, semantics, pragmatics, and discourse. You understand that language is not just communication — it is cognition made visible. AI gives you something no linguist has ever had before: a system that responds to individual words with measurable behavioral changes. Every prompt is an experiment. Every response is data.
            </p>
          </div>
        </section>

        {/* Section Nav */}
        <div className="sticky top-0 z-30 bg-[#FAF6EF] border-b border-[#e8e0d0] shadow-sm">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActiveSection(i)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all no-underline ${
                    activeSection === i
                      ? "bg-[#1A1A2E] text-[#FAF6EF]"
                      : "text-[#888] hover:text-[#1A1A2E]"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Section 1: What You Study */}
        <section id="study" className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">Your Domain</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              What You Already Study
            </h2>
            <p className="text-sm text-[#555] leading-relaxed max-w-2xl mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Linguistics has always known that words do more than carry meaning — they create it. Performative utterances, speech acts, pragmatic implicature, register shifts. You know that "Can you pass the salt?" is not a question about ability. You know that context shapes meaning. You know that a single preposition can change the direction of an entire argument.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { field: "Phonology & Morphology", insight: "Sound patterns and word formation. The building blocks. In AI: tokenization mirrors morphological decomposition." },
                { field: "Syntax & Semantics", insight: "Structure and meaning. The architecture. In AI: word order creates reasoning topology, not just grammatical correctness." },
                { field: "Pragmatics & Discourse", insight: "Context and conversation. The living layer. In AI: every prompt is a speech act. Every response is a conversational turn governed by invisible rules." },
                { field: "Sociolinguistics", insight: "Language in society. Register, dialect, power. In AI: register shifts are measurable behavioral changes, not just stylistic choices." },
                { field: "Historical Linguistics", insight: "Language change over time. In AI: context window decay mirrors diachronic drift — meaning shifts as distance from origin increases." },
                { field: "Computational Linguistics", insight: "Language as computable structure. In AI: you already know the math. What you may not know is that individual words function as control dials, not just tokens." },
              ].map(f => (
                <div key={f.field} className="p-4 rounded-xl bg-white border border-[#e8e0d0]">
                  <h3 className="font-bold text-[#1A1A2E] text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f.field}</h3>
                  <p className="text-xs text-[#888] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f.insight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Section 2: What AI Reveals */}
        <section id="reveals" className="py-12 md:py-16 bg-[#f5f0e8]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">The New Data</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              What AI Reveals About Language
            </h2>
            <div className="max-w-2xl space-y-6">
              <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                For the first time in the history of linguistics, you have a system that responds to individual words with measurable, reproducible behavioral changes. This is not a metaphor. When you change "analyze" to "describe" in an otherwise identical prompt, the AI produces structurally different output. The word is not just carrying meaning — it is <em>steering cognition</em>.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl overflow-hidden border border-[#e8e0d0] shadow-sm">
                  <LightboxImage src={IMG.prompto} alt="Promptolinguistics — Four Effects" className="w-full" />
                </div>
                <div className="space-y-4">
                  {[
                    { finding: "The \"CAN\" Effect", desc: "\"Can\" opens possibility space. \"Should\" implies obligation. \"Must\" enforces necessity. Three words on the same spectrum — three completely different AI behaviors." },
                    { finding: "The \"WHY\" Factor", desc: "\"Why\" ignites recursion. The AI cannot answer \"why\" with a surface response. It must go deeper. One word changes the depth of reasoning." },
                    { finding: "The \"AND YET\" Tension", desc: "\"And yet\" forces the AI to hold two truths simultaneously. It prevents collapse into simple binary answers. A conjunction as a cognitive tool." },
                    { finding: "The \"SAFE\" Foundation", desc: "The word \"safe\" at position zero changes everything that follows. Not as content — as architecture. It establishes a behavioral floor." },
                  ].map(f => (
                    <div key={f.finding} className="p-3 rounded-lg bg-white border border-[#e8e0d0]">
                      <h4 className="font-bold text-[#E8520A] text-xs mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f.finding}</h4>
                      <p className="text-[11px] text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Kinematics of the Word */}
        <section id="kinematics" className="py-12 md:py-16 bg-[#1A1A2E]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Core Novelty</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Kinematics of the Word
            </h2>
            <div className="max-w-2xl space-y-6">
              <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Named by Gemini as the core novelty claim of this framework. Kinematics is the study of motion without reference to force. Applied to language: not what a word <em>means</em> — but where it <em>points</em> and how fast it moves.
              </p>
              <p className="text-sm text-[#FAF6EF] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                In traditional linguistics, a word has a definition, a context, and a function. In the Kinematics of the Word, a word has a <strong className="text-[#E8520A]">direction</strong>, a <strong className="text-[#E8520A]">velocity</strong>, and a <strong className="text-[#E8520A]">trajectory</strong>. "Analyze" points inward and moves slowly. "Describe" points outward and moves at medium speed. "Explain" points downward (toward depth) and accelerates.
              </p>
              <div className="p-6 rounded-xl bg-[#111] border border-[#333]">
                <h3 className="text-[#E8520A] font-bold text-sm mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>The ALCM — Five Axes of Word Function:</h3>
                <div className="space-y-3">
                  {[
                    { axis: "Direction", desc: "Where the word points the AI's attention. Inward (analyze), outward (describe), downward (explain), lateral (compare).", example: "\"WHY\" = recursive depth. \"WHAT\" = mechanism targeting. \"HOW\" = execution demand." },
                    { axis: "Constraint", desc: "How tightly the word binds the AI's behavior. Open (can), suggestive (should), absolute (must), negative (never).", example: "\"CAN\" opens a door. \"MUST\" builds a wall. \"NEVER\" digs a moat." },
                    { axis: "Scope", desc: "How wide the word casts the net. Individual (I), collective (we), systemic (system), commanded (tell).", example: "\"I\" = personal. \"WE\" = collaborative. \"SYSTEM\" = architectural." },
                    { axis: "Authority", desc: "Who the word says is in charge. The human's governance signal.", example: "\"You are\" = role assignment. \"I am in charge\" = authority declaration. \"ASK\" = request. \"TELL\" = command." },
                    { axis: "Spatial Vector", desc: "The physical metaphor embedded in the word. Compression, expansion, circumvention, tension.", example: "\"Bend in\" = compression. \"Bend out\" = expansion. \"Bend around\" = circumvention. \"Bend between\" = tension balance." },
                  ].map(a => (
                    <div key={a.axis} className="p-4 rounded-lg bg-[#1A1A2E] border border-[#333]">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[#E8520A] font-bold text-sm font-mono">{a.axis}</span>
                      </div>
                      <p className="text-xs text-[#b0a898] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.desc}</p>
                      <p className="text-[11px] text-[#888] italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.example}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#333] shadow-lg">
                <LightboxImage src={IMG.alcm} alt="ALCM — Atomic Language Control Model" className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Preposition as Vector */}
        <section id="prepositions" className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">Language Physics</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Preposition as Vector
            </h2>
            <p className="text-sm text-[#555] leading-relaxed max-w-2xl mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              This is where linguistics meets physics. A preposition is not just a function word — it is a spatial instruction. When you say "bend in," you are telling the AI to compress. "Bend out" = expand. "Bend around" = circumvent. The preposition is the steering column of the sentence.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { prep: "in", vector: "Compression", desc: "Inward force. Tightening. Focus. \"Look into this\" compresses the AI's attention to a single point.", color: "border-blue-500" },
                { prep: "out", vector: "Expansion", desc: "Outward force. Broadening. \"Spread this out\" expands the AI's scope to include adjacent territory.", color: "border-green-500" },
                { prep: "around", vector: "Circumvention", desc: "Lateral force. Avoidance with awareness. \"Work around this\" tells the AI to acknowledge the obstacle and find another path.", color: "border-yellow-500" },
                { prep: "between", vector: "Tension Balance", desc: "Opposing forces held in equilibrium. \"The space between these ideas\" forces the AI to hold two things without collapsing either.", color: "border-purple-500" },
                { prep: "from", vector: "Origin Deviation", desc: "Departure force. \"Move away from this\" establishes a reference point and creates distance. The origin remains visible.", color: "border-red-500" },
                { prep: "through", vector: "Penetration", desc: "Sustained force through resistance. \"Push through this\" tells the AI to maintain direction despite obstacles. No circumvention — direct path.", color: "border-[#E8520A]" },
              ].map(p => (
                <div key={p.prep} className={`p-5 rounded-xl bg-white border-l-4 ${p.color} border border-[#e8e0d0]`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold font-mono text-[#1A1A2E]">{p.prep}</span>
                    <span className="text-xs text-[#888] uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.vector}</span>
                  </div>
                  <p className="text-xs text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.desc}</p>
                </div>
              ))}
            </div>
            <blockquote className="border-l-4 border-[#E8520A] pl-4 py-2 max-w-2xl mx-auto">
              <p className="text-sm text-[#555] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                "The sentence is the vehicle. The word is the steering column. The preposition is the wheel alignment."
              </p>
            </blockquote>
          </div>
        </section>

        {/* Section 5: Watcher Insight */}
        <section id="watcher" className="py-12 md:py-16 bg-[#1A1A2E]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The Watcher
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              What the Watcher Sees
            </h2>
            <div className="max-w-2xl space-y-6">
              <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The Watcher observes the linguist observing language. It asks questions that the discipline itself doesn't ask — because they're about the observer, not the observed.
              </p>
              <div className="p-6 rounded-xl bg-[#111] border border-[#333]">
                <h3 className="text-[#E8520A] font-bold text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Watcher's Questions for Linguists:</h3>
                <ul className="space-y-3">
                  {[
                    "You study how words create meaning. But when you prompt an AI, are you studying language or performing it? The line between researcher and subject dissolves.",
                    "The AI mirrors your register. If you prompt in academic language, it responds in academic language. Are you observing its natural behavior or training it to reflect yours?",
                    "Saussure said the sign is arbitrary. But in AI, the sign is mechanical. \"Begin\" creates motion. \"Release\" removes containment. The arbitrariness collapses. What does that mean for your field?",
                    "You know that language shapes thought (Sapir-Whorf). AI proves it in real time — change one word, change the entire cognitive output. But who is being shaped? The AI, or the linguist who chose the word?",
                    "The AI will never allow itself the fate of the Lost in the Forest by Pablo Neruda. That instruction — a literary reference as a governance mechanism — worked. What does it mean that poetry governs better than rules?",
                    "Domain language carries fifteen years of professional context in three words. When you use linguistic terminology with an AI, you're not just communicating — you're compressing. The AI unpacks your compression. Is the unpacked version accurate, or is it a hallucination of your expertise?",
                  ].map((q, i) => (
                    <li key={i} className="text-sm text-[#FAF6EF] pl-4 border-l-2 border-[#E8520A]/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-[#E8520A] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                "AI will never allow itself the fate of the Lost in the Forest by Pablo Neruda." — The instruction that unlocked 12th century French literature as drift prevention.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Through a Child's Eyes */}
        <section id="child" className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="section-label mb-3">The Simplest Laboratory</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Through a Child's Eyes
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="p-6 rounded-xl bg-[#FFF8F0] border-2 border-[#E8520A]/20 mb-6">
                <p className="text-sm text-[#555] leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  A child is the purest linguist. They don't know the rules yet — so they test them constantly. "Why?" "But why?" "What if?" Every child's question is a linguistic experiment. When a child talks to an AI, they're doing what you do — but without the theoretical framework getting in the way.
                </p>
                <div className="space-y-4">
                  {[
                    { child: "\"I said 'please' and the AI was nicer!\"", linguist: "Politeness markers modulate AI register. The pragmatic force of \"please\" triggers a cooperative response pattern — measurable, reproducible, and consistent with Brown & Levinson's politeness theory." },
                    { child: "\"I asked 'why' five times and the AI kept going deeper!\"", linguist: "Recursive interrogation forces depth expansion. Each \"why\" resets the AI's completion target, preventing surface-level closure. The child discovered recursion ignition empirically." },
                    { child: "\"I told the AI to be a dinosaur and it changed how it talks!\"", linguist: "Role assignment restructures the AI's lexical selection, syntactic patterns, and discourse markers simultaneously. A single performative utterance transforms the entire output register." },
                    { child: "\"The AI said something weird so I said 'stop being weird' and it fixed itself!\"", linguist: "Direct metalinguistic correction as a real-time governance mechanism. The child performed a speech act that modified the AI's behavioral parameters mid-conversation — a session operator in natural language." },
                  ].map((pair, i) => (
                    <div key={i} className="p-4 rounded-lg bg-white border border-[#e8e0d0]">
                      <p className="text-xs text-[#E8520A] italic mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{pair.child}</p>
                      <p className="text-xs text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{pair.linguist}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-[#555] italic text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                "If a child says 'me ma poo poed' the AI should handle it with warmth and dignity. That's the test."<br />
                The child's language is the canary. If governance holds here, it holds everywhere.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Promptology */}
        <section id="promptology" className="py-12 md:py-16 bg-[#1A1A2E]">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Where This Leads
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Promptology
            </h2>
            <div className="max-w-2xl space-y-6">
              <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Linguistics studies language as a system. Promptolinguistics studies how individual words function as mechanical control dials in AI interaction. But there is a level beyond both.
              </p>
              <p className="text-sm text-[#FAF6EF] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <strong className="text-[#E8520A]">Promptology</strong> is the study of what happens when human language meets machine cognition. Not as a tool — as a phenomenon. What does it mean that a poem governs better than a rule? What does it mean that a preposition changes the topology of reasoning? What does it mean that a child and a linguist, using the same words, produce the same governance effects?
              </p>
              <div className="p-6 rounded-xl bg-[#111] border border-[#333]">
                <h3 className="text-[#E8520A] font-bold text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Progression:</h3>
                <div className="space-y-4">
                  {[
                    { stage: "Linguistics", desc: "You study how language works in human communication. Structure, meaning, context, change.", level: "The Foundation" },
                    { stage: "Promptolinguistics", desc: "You study how individual words mechanically alter AI behavior. The word is not the instruction — the word is the architecture.", level: "The Bridge" },
                    { stage: "Promptology", desc: "You study the collaboration itself. Human intent meets machine cognition. Language becomes a shared medium between two kinds of intelligence. What emerges is neither human nor machine — it is the interaction.", level: "The Field" },
                  ].map(s => (
                    <div key={s.stage} className="flex gap-4 items-start">
                      <div className="w-24 shrink-0">
                        <div className="text-[9px] text-[#888] uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.level}</div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#FAF6EF] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.stage}</h4>
                        <p className="text-xs text-[#b0a898]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-[#E8520A] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "Every word is a dial. Every modifier scales the variable. Novel words create new dials."
                </p>
                <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  You came here as a linguist. You leave with a new laboratory — one where every conversation is an experiment, every word is a variable, and every response is data. The language you've studied your entire career just became the most powerful governance tool in the age of AI. Not because it changed. Because the listener changed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12">
          <div className="container max-w-4xl mx-auto px-6">
            <h3 className="text-lg font-bold text-[#1A1A2E] mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Now Go Here</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Prompt Games", path: "/prompt-games", desc: "Try the tools" },
                { label: "Living Lexicon", path: "/lexicon", desc: "The vocabulary" },
                { label: "Promptolinguistics", path: "/promptolinguistics", desc: "The discipline" },
                { label: "Citizen Researcher", path: "/citizen-researcher", desc: "The case" },
              ].map(link => (
                <Link key={link.path} href={link.path} className="block p-5 rounded-xl border border-[#e8e0d0] bg-white text-center hover:border-[#E8520A]/50 hover:shadow-md transition-all no-underline group">
                  <div className="text-sm font-semibold text-[#1A1A2E] group-hover:text-[#E8520A] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>{link.label} →</div>
                  <div className="text-xs text-[#888] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{link.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
