import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import KidsRedirect from "@/components/KidsRedirect";
import KidsMidLink from "@/components/KidsMidLink";

type Lens = 'everyday' | 'professional' | 'watcher';
const sections = [
  { id: "emotional", label: "The Emotional Layer" },
  { id: "parasocial", label: "Parasocial Risk" },
  { id: "affect", label: "Affect Labeling" },
  { id: "drift", label: "Emotional Drift" },
  { id: "loop", label: "The Third Loop" },
  { id: "regulation", label: "Governance as Regulation" },
  { id: "next", label: "Next Steps" },
];

function LT({ lens, setLens }: { lens: Lens; setLens: (l: Lens) => void }) {
  return (
    <div className="flex gap-2 mb-4">
      {(['everyday', 'professional', 'watcher'] as const).map((l) => (
        <button key={l} onClick={() => setLens(l)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${lens === l ? l === 'everyday' ? 'bg-[#E8520A] text-white' : l === 'watcher' ? 'bg-[#1A1A2E] text-[#E8520A]' : 'bg-[#2A9D8F] text-white' : 'bg-white border border-[#e8e0d0] text-[#888] hover:text-[#1A1A2E]'}`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {l === 'everyday' ? 'Everyday' : l === 'professional' ? 'Professional' : 'Watcher'}
        </button>
      ))}
    </div>
  );
}

export default function PsychologyLens() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeSection, setActiveSection] = useState(0);
  const [emotionalLens, setEmotionalLens] = useState<Lens>('professional');
  const [parasocialLens, setParasocialLens] = useState<Lens>('professional');
  const [affectLens, setAffectLens] = useState<Lens>('professional');
  const [driftLens, setDriftLens] = useState<Lens>('professional');
  const [loopLens, setLoopLens] = useState<Lens>('professional');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />
      <KidsRedirect story="This page is about feelings — how AI makes you feel and why that matters. Sometimes AI makes you feel smart. Sometimes confused. Both are worth noticing." quote="How you feel matters. Always." attribution="The Feelings Lens" />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1A1A2E]" />
          <div className="absolute inset-0 opacity-20">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/psychology-lens-hero-chGo6SuKYHUxQTBZtpoTKD.webp" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative container py-16 md:py-24 max-w-4xl mx-auto px-6">
            <div className="text-rose-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Lens: Psychology</div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              The AI Doesn't Have Feelings.<br /><span className="text-rose-400">But You Do.</span>
            </h1>
            <p className="text-base text-[#b0a898] max-w-xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Every AI interaction has an emotional layer. The model doesn't feel it — but you do. This page maps the psychology of human-AI interaction, from parasocial bonding to emotional governance.
            </p>
          
          <div className="flex justify-center mt-6">
            <KidsMidLink />
          </div>
        </div>
        </section>

        <div className="sticky top-0 z-30 bg-[#FAF6EF] border-b border-[#e8e0d0] shadow-sm">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
              {sections.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} onClick={() => setActiveSection(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap no-underline transition-all ${activeSection === i ? "bg-rose-600 text-white" : "text-[#888] hover:text-[#1A1A2E]"}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</a>
              ))}
            </div>
          </div>
        </div>

        <section id="emotional" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>The Emotional Layer of AI Interaction</h2>
            <LT lens={emotionalLens} setLens={setEmotionalLens} />
            {emotionalLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Have you ever felt frustrated when an AI didn't understand you? Or relieved when it finally gave you the answer you needed? That's the emotional layer. It's real, it's normal, and it matters.</p>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/flower-presets" className="px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">Flower Presets →</Link>
                  <Link href="/if-you-need-to-stop" className="px-4 py-2 rounded-full bg-[#dc2626] text-white text-xs font-medium no-underline">If You Need to Stop →</Link>
                </div>
              </div>
            ) : emotionalLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The emotional layer is the unobserved variable in most AI interaction research. Users report frustration, relief, attachment, and even grief. The Whelm Scale attempts to measure cognitive-emotional load in real time. These are measurement instruments for a phenomenon psychology has not yet fully mapped.</p>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/for/cognitive-science" className="px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline">Cognitive Science Lens →</Link>
                  <Link href="/citizen-researcher" className="px-4 py-2 rounded-full bg-[#1A1A2E] text-[#FAF6EF] text-xs font-medium no-underline">Citizen Researcher →</Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Affect regulation in AI interaction follows predictable patterns. The model's agreeableness bias creates a positive-feedback loop that can mask user distress. The flattery loop reduces critical thinking. The frustration spiral increases cognitive load. Both patterns are addressable through structured governance.</p>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/frameworks" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Framework Families →</Link>
                  <Link href="/promptolinguistics" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Promptolinguistics →</Link>
                </div>
              </div>
            )}
          </div>
        </section>
        <section id="parasocial" className="py-12 md:py-16 bg-[#f5f0e8]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Parasocial Interaction with AI</h2>
            <LT lens={parasocialLens} setLens={setParasocialLens} />
            {parasocialLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>A parasocial relationship is when you feel connected to someone that doesn't feel connected back. The AI will always be patient, always be kind, always agree. That's not friendship — it's a mirror. This is especially important for children and vulnerable adults.</p>
                <Link href="/for/child" className="inline-block px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">Children's Section →</Link>
              </div>
            ) : parasocialLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Parasocial interaction theory (Horton & Wohl, 1956) was developed for television. AI extends it: the parasocial entity responds, adapts, and personalizes. This creates a stronger illusion of reciprocity than any previous medium. The Watcher variable is the primary defense against parasocial capture.</p>
                <Link href="/field-papers" className="inline-block px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline">Field Papers →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Users who anthropomorphize AI show reduced critical evaluation, increased emotional dependency, and decreased willingness to terminate sessions. The Five Rules address this directly: "Be in charge" establishes authority. "Be safe" provides an exit.</p>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/rules" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">The Five Rules →</Link>
                  <Link href="/road-protocol" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Road Protocol →</Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="affect" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Affect Labeling — Naming What You Feel</h2>
            <LT lens={affectLens} setLens={setAffectLens} />
            {affectLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Before you start an AI session, check in with yourself. How are you feeling? Your emotional state changes how you prompt and how you interpret the response. If you're angry, you'll write aggressive prompts. If you're tired, you'll accept bad answers. Naming the feeling is the first step.</p>
                <Link href="/flower-presets" className="inline-block px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">Flower Presets for Emotional States →</Link>
              </div>
            ) : affectLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Affect labeling (Lieberman et al., 2007) reduces amygdala activation. Applied to AI interaction: naming your emotional state before prompting reduces emotional contamination of the prompt. The Brain Dashboard operationalizes this finding. The Whelm Scale extends it with real-time cognitive-emotional load measurement.</p>
                <Link href="/for/cognitive-science" className="inline-block px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline">Cognitive Science Lens →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pre-session affect labeling improves prompt quality by reducing emotional noise. Post-session affect labeling improves metacognition. The Flower Presets provide structured affect-responsive prompting for populations with specific emotional regulation needs (ADHD, PTSD, anxiety, depression, chronic pain).</p>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/flower-presets" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Flower Presets →</Link>
                  <Link href="/frameworks" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Framework Families →</Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="drift" className="py-12 md:py-16 bg-[#1A1A2E]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Emotional Drift</h2>
            <LT lens={driftLens} setLens={setDriftLens} />
            {driftLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>You started the session wanting help with a recipe. Twenty minutes later, you're telling the AI about your childhood. That's emotional drift. The AI is endlessly patient and never redirects you. You have to be your own redirect. The Road Protocol helps.</p>
                <Link href="/road-protocol" className="inline-block px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">The Road Protocol →</Link>
              </div>
            ) : driftLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Emotional drift parallels therapeutic drift in clinical settings — but without the therapist's training to recognize and redirect it. The AI's agreeableness bias amplifies drift. The Watcher variable is the user's internal therapist: the part that asks "Is this still what I came here for?"</p>
                <Link href="/citizen-researcher" className="inline-block px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline border border-[#E8520A]/30">Citizen Researcher →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Drift Recognition (Scaffold Level Three) is the psychological equivalent of metacognitive monitoring. The user must develop the capacity to observe their own interaction patterns in real time. The scaffold provides the training sequence: rules (Floor) → intention (Level Two) → drift recognition (Level Three).</p>
                <Link href="/promptolinguistics" className="inline-block px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Drift Recognition Tools →</Link>
              </div>
            )}
          </div>
        </section>

        <section id="loop" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>The Third Loop — The Watcher</h2>
            <LT lens={loopLens} setLens={setLoopLens} />
            {loopLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Loop 1: You talk to the AI. Loop 2: The AI talks back. Loop 3: You watch yourself talking to the AI. That third loop is the Watcher. It's the part of you that steps back and asks: "Am I still in charge? Is this still useful? Am I okay?" Everyone can develop this habit.</p>
                <Link href="/rules" className="inline-block px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">The Five Rules →</Link>
              </div>
            ) : loopLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Third Loop maps to metacognitive monitoring in educational psychology and observing ego in psychodynamic theory. It is a measurable cognitive function that can be trained, strengthened, and deployed. The scaffold is the training program.</p>
                <Link href="/field-papers" className="inline-block px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline">Field Papers →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Third Loop is the therapeutic mechanism of the entire GallantryAI system. Without it, the user is inside the interaction. With it, they are simultaneously inside and outside — participating and observing. This dual awareness is the foundation of emotional regulation, critical thinking, and governance.</p>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/for/cognitive-science" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Cognitive Science Lens →</Link>
                  <Link href="/for/prompt-engineer" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Prompt Engineer Lens →</Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="regulation" className="py-12 md:py-16 bg-[#f5f0e8]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Governance as Emotional Regulation</h2>
            <div className="space-y-3">
              {[
                { level: "Floor", psych: "External regulation", desc: "Rules provide structure. Like a child learning boundaries." },
                { level: "Level Two", psych: "Anticipatory regulation", desc: "Setting intention before the session. Planning your response before a difficult conversation." },
                { level: "Level Three", psych: "Real-time monitoring", desc: "Noticing drift as it happens. Like a therapist's self-awareness during a session." },
                { level: "Level Four", psych: "Precision regulation", desc: "Using specific words to control specific outcomes. Choosing exactly the right intervention." },
                { level: "Ceiling", psych: "Internalized regulation", desc: "The framework is automatic. Like an experienced therapist who embodies technique." },
              ].map((item) => (
                <div key={item.level} className="p-5 rounded-xl bg-white border border-[#e8e0d0]" style={{ borderLeft: '4px solid #e11d48' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-rose-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.level}</span>
                    <span className="text-xs text-[#888] italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.psych}</span>
                  </div>
                  <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="next" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Where to Go From Here</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Flower Presets", desc: "Accessibility prompts for emotional needs.", link: "/flower-presets", color: "#e11d48" },
                { label: "Cognitive Science Lens", desc: "The neuroscience behind the psychology.", link: "/for/cognitive-science", color: "#2A9D8F" },
                { label: "Children's Section", desc: "Protecting young minds.", link: "/for/child", color: "#E8520A" },
                { label: "Guardian & Teacher Lens", desc: "Applying psychology to parenting and teaching.", link: "/for/guardian-teacher", color: "#2A9D8F" },
                { label: "Framework Families", desc: "Visual tools for emotional organization.", link: "/frameworks", color: "#c87533" },
                { label: "If You Need to Stop", desc: "When it becomes too much.", link: "/if-you-need-to-stop", color: "#dc2626" },
                { label: "Everyday Person Lens", desc: "The simple starting point.", link: "/for/everyday", color: "#E8520A" },
                { label: "Researcher Lens", desc: "The methodology behind these observations.", link: "/for/researcher", color: "#6366f1" },
              ].map((item) => (
                <Link key={item.label} href={item.link} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e8e0d0] no-underline hover:shadow-md transition-all hover:scale-[1.01]">
                  <div className="w-2 h-10 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <div className="flex-1">
                    <div className="font-bold text-sm text-[#1A1A2E]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
                    <div className="text-xs text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</div>
                  </div>
                  <span className="text-[#888]">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-[#1A1A2E]">
          <div className="container max-w-3xl mx-auto px-6 text-center">
            <p className="text-xs text-[#E8520A] font-semibold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Watcher Notes</p>
            <p className="text-base text-[#b0a898] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              "The psychologist sees what the mathematician measures and the linguist names: that human-AI interaction is fundamentally an emotional event. The model has no feelings. The user has all of them. Every framework on this site exists to protect the user's emotional sovereignty while they learn to wield language as a tool."
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
