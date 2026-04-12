import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import KidsRedirect from "@/components/KidsRedirect";
import KidsMidLink from "@/components/KidsMidLink";

type Lens = 'everyday' | 'professional' | 'watcher';
const sections = [
  { id: "citizen", label: "Citizen Research" },
  { id: "method", label: "Methodology" },
  { id: "documentation", label: "Documentation" },
  { id: "honest", label: "Honest Disclaimers" },
  { id: "watcher-var", label: "The Watcher Variable" },
  { id: "peer", label: "Peer Review Status" },
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

export default function ResearcherLens() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeSection, setActiveSection] = useState(0);
  const [citizenLens, setCitizenLens] = useState<Lens>('professional');
  const [methodLens, setMethodLens] = useState<Lens>('professional');
  const [docLens, setDocLens] = useState<Lens>('professional');
  const [honestLens, setHonestLens] = useState<Lens>('professional');
  const [watcherLens, setWatcherLens] = useState<Lens>('professional');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />
      <KidsRedirect story="This page is for people who study AI — like scientists. They watch, they write things down, they ask questions. Sound familiar? You're already doing that." quote="Curiosity is the beginning of everything." attribution="The Researcher" />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1A1A2E]" />
          <div className="absolute inset-0 opacity-20">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/researcher-lens-hero-nvkgzBVAA5XoQv2apr4SJt.webp" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative container py-16 md:py-24 max-w-4xl mx-auto px-6">
            <div className="text-emerald-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Lens: Researcher</div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              This Is Not Peer-Reviewed.<br /><span className="text-emerald-400">It's Peer-Offered.</span>
            </h1>
            <p className="text-base text-[#b0a898] max-w-xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              GallantryAI is citizen research — observed, documented, and shared openly. No institutional backing. No funding. No lab. Just a person who noticed patterns, wrote them down, and tested them across nine AI platforms. This page explains the methodology, the limitations, and the honest disclaimers.
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
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap no-underline transition-all ${activeSection === i ? "bg-emerald-700 text-white" : "text-[#888] hover:text-[#1A1A2E]"}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</a>
              ))}
            </div>
          </div>
        </div>

        <section id="citizen" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>What Is Citizen Research?</h2>
            <LT lens={citizenLens} setLens={setCitizenLens} />
            {citizenLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Citizen research means regular people doing real research — not in a lab, but in their lives. Birdwatchers have been citizen scientists for centuries. Galaxy Zoo lets anyone classify galaxies. GallantryAI applies the same idea to AI interaction: you don't need a PhD to notice patterns and write them down.</p>
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>If you've ever noticed that changing one word in a prompt completely changed the AI's response — you've already started doing citizen research.</p>
                <Link href="/rules" className="inline-block px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">Start with The Five Rules →</Link>
              </div>
            ) : citizenLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Citizen science has a long history of producing valid observations that later receive institutional validation. Darwin was a citizen scientist. The question is not whether citizen research can produce valid findings — it's whether the methodology is transparent enough for others to evaluate. That's what this page provides.</p>
                <Link href="/citizen-researcher" className="inline-block px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline">Citizen Researcher Page →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The academic context: AI interaction research is a new field. Most existing literature focuses on model behavior, not user behavior. GallantryAI's contribution is user-side: how does the human's language affect the model's output? The ALCM, the scaffold, the Watcher variable — these are all user-side constructs.</p>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/promptolinguistics" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Promptolinguistics →</Link>
                  <Link href="/for/cognitive-science" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Cognitive Science Lens →</Link>
                </div>
              </div>
            )}
          </div>
        </section>
        <section id="method" className="py-12 md:py-16 bg-[#f5f0e8]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Methodology</h2>
            <LT lens={methodLens} setLens={setMethodLens} />
            {methodLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The method is simple: try something, write down what happens, try it again, see if it happens again. If it does, you might have found a pattern. If it doesn't, you learned something too. That's research.</p>
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Field Papers section shows real examples of this process — actual sessions, actual observations, actual conclusions (and actual mistakes).</p>
                <Link href="/field-papers" className="inline-block px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">Field Papers →</Link>
              </div>
            ) : methodLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The methodology is phenomenological: observe the interaction, document the observation, test the pattern across platforms, document the results. The key limitation: single observer. The key strength: cross-platform testing (nine AI platforms). The key question: does the pattern hold when someone else tries it?</p>
                <Link href="/field-papers" className="inline-block px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline">Field Papers →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The research follows an iterative observational methodology: (1) Observe a behavioral pattern in AI output. (2) Hypothesize the linguistic cause. (3) Test across multiple platforms. (4) Document results including failures. (5) Refine the model. This is closer to grounded theory than experimental design.</p>
                <div className="p-4 rounded-xl bg-white border border-[#e8e0d0]">
                  <p className="text-xs text-[#888] italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>Platforms tested: ChatGPT, Claude, Gemini, Copilot, DeepSeek, Llama, Mistral, Grok, Perplexity</p>
                </div>
                <Link href="/taxonomy" className="inline-block px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">AI Family Taxonomy →</Link>
              </div>
            )}
          </div>
        </section>

        <section id="documentation" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Documentation as Research Artifact</h2>
            <LT lens={docLens} setLens={setDocLens} />
            {docLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Every AI session can be a research session if you write down what happened. What did you ask? What did you get back? What surprised you? What didn't work? That's a field note. Enough field notes become a field paper. Enough field papers become a framework.</p>
                <Link href="/lexicon" className="inline-block px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">Living Lexicon →</Link>
              </div>
            ) : docLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The documentation itself is the primary research artifact. The Living Lexicon is a growing vocabulary. The Field Papers are session reports. The Framework Families are visual models. Together, they form a corpus that can be evaluated, critiqued, and extended by others. That's the point — it's open.</p>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/lexicon" className="px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline">Living Lexicon →</Link>
                  <Link href="/frameworks" className="px-4 py-2 rounded-full bg-[#1A1A2E] text-[#FAF6EF] text-xs font-medium no-underline">Framework Families →</Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The documentation strategy follows ethnographic principles: thick description, reflexivity, and transparency about the observer's position. Each framework includes its origin story, its limitations, and the sessions that produced it. This is not polished — it's honest.</p>
                <Link href="/field-papers" className="inline-block px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Field Papers →</Link>
              </div>
            )}
          </div>
        </section>

        <section id="honest" className="py-12 md:py-16 bg-[#1A1A2E]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF6EF] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Honest Disclaimers</h2>
            <LT lens={honestLens} setLens={setHonestLens} />
            <div className="space-y-3">
              {[
                { title: "No Institutional Backing", desc: honestLens === 'everyday' ? "This isn't from a university or a company. It's from one person's observations." : honestLens === 'watcher' ? "The absence of institutional backing means no IRB oversight, no peer review process, and no funding bias. It also means no institutional credibility. Both are true." : "The work exists outside institutional frameworks. This limits access to controlled experimental conditions but eliminates institutional bias and publication pressure." },
                { title: "Single Observer", desc: honestLens === 'everyday' ? "One person noticed these patterns. Other people might notice different things." : honestLens === 'watcher' ? "Single-observer research has well-documented limitations: confirmation bias, selection bias, and observer effect. The cross-platform testing partially mitigates but does not eliminate these." : "N=1 observational research. The findings are hypotheses, not conclusions. Replication by independent observers is needed." },
                { title: "Not Therapy", desc: honestLens === 'everyday' ? "This site talks about emotions and AI, but it's not a replacement for talking to a real person. If you need help, the crisis page has real resources." : honestLens === 'watcher' ? "The psychological frameworks referenced here are applied to AI interaction, not to clinical treatment. The Flower Presets are accessibility tools, not therapeutic interventions." : "No clinical claims are made. The psychological models are applied to human-AI interaction patterns, not to mental health treatment." },
                { title: "Models Change", desc: honestLens === 'everyday' ? "AI updates constantly. What works today might not work tomorrow. That's why the site keeps updating too." : honestLens === 'watcher' ? "The observations are time-bound. Model updates can invalidate specific findings while leaving the underlying patterns intact. The ALCM is designed to be model-agnostic, but this has not been formally verified." : "Findings are version-dependent. The ALCM aims for model-agnostic applicability, but longitudinal validation across model versions is ongoing." },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-bold text-sm text-[#E8520A] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.title}</div>
                  <p className="text-sm text-[#b0a898] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="watcher-var" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>The Watcher Variable</h2>
            <LT lens={watcherLens} setLens={setWatcherLens} />
            {watcherLens === 'everyday' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Watcher is the part of you that steps back and watches the conversation. In research terms, it's the ability to observe yourself while you're doing something. It's what makes the difference between using AI and understanding how you use AI.</p>
                <Link href="/rules" className="inline-block px-4 py-2 rounded-full bg-[#E8520A] text-white text-xs font-medium no-underline">The Five Rules →</Link>
              </div>
            ) : watcherLens === 'watcher' ? (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Watcher variable is the central theoretical contribution: the user's capacity for metacognitive monitoring during AI interaction. It is both the research instrument (the observer) and the research subject (the thing being developed). This recursive quality is the most interesting — and most difficult to study — aspect of the entire framework.</p>
                <Link href="/citizen-researcher" className="inline-block px-4 py-2 rounded-full bg-[#1A1A2E] text-[#E8520A] text-xs font-medium no-underline">Citizen Researcher →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Watcher variable maps to metacognitive monitoring (Flavell, 1979), observing ego (Sterba, 1934), and mindful awareness (Kabat-Zinn, 1990). It is operationalized through the scaffold: the user develops increasing capacity for real-time self-observation during AI interaction.</p>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/for/psychology" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Psychology Lens →</Link>
                  <Link href="/for/cognitive-science" className="px-4 py-2 rounded-full bg-[#2A9D8F] text-white text-xs font-medium no-underline">Cognitive Science Lens →</Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="peer" className="py-12 md:py-16 bg-[#f5f0e8]" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Peer Review Status</h2>
            <div className="p-6 rounded-xl bg-white border border-[#e8e0d0]" style={{ borderLeft: '4px solid #059669' }}>
              <p className="text-sm text-[#555] leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <strong>Status:</strong> The Marketing Prompt Field Report has been submitted to SSCI-indexed journals for peer review. This is the first formal submission from the GallantryAI project.
              </p>
              <p className="text-sm text-[#555] leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <strong>Honest note:</strong> Submission does not mean acceptance. The paper may be rejected. If it is, the rejection and the reasons will be documented publicly on this site. That's what honest research looks like.
              </p>
              <p className="text-sm text-[#555] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <strong>Everything else on this site</strong> remains citizen research — observed, documented, and shared openly. It has not been peer-reviewed. Use it, test it, challenge it, improve it.
              </p>
            </div>
          </div>
        </section>

        <section id="next" className="py-12 md:py-16" style={{ scrollMarginTop: '60px' }}>
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Where to Go From Here</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Citizen Researcher", desc: "The full research identity page.", link: "/citizen-researcher", color: "#059669" },
                { label: "Field Papers", desc: "The raw research documents.", link: "/field-papers", color: "#059669" },
                { label: "Cognitive Science Lens", desc: "The neuroscience foundations.", link: "/for/cognitive-science", color: "#2A9D8F" },
                { label: "Psychology Lens", desc: "The emotional layer of the research.", link: "/for/psychology", color: "#e11d48" },
                { label: "Mathematician Lens", desc: "The structural models.", link: "/for/mathematician", color: "#6366f1" },
                { label: "Prompt Engineer Lens", desc: "The technical applications.", link: "/for/prompt-engineer", color: "#E8520A" },
                { label: "Living Lexicon", desc: "The growing vocabulary.", link: "/lexicon", color: "#c87533" },
                { label: "Everyday Person Lens", desc: "Where most people should start.", link: "/for/everyday", color: "#E8520A" },
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
              "The researcher's job is not to be right. It's to be honest about what was observed, transparent about how it was observed, and open about what might be wrong. Everything on this site is an invitation to test, not a command to believe."
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
