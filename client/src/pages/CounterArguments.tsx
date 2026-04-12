/**
 * GALLANTRYAI — Counter Arguments
 * Design: Dark editorial — honest, unflinching, no spin
 * Real criticisms of everything GallantryAI claims. With sources.
 * "If you can't name what's wrong with your own work, you don't understand it yet."
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

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/counter-arguments-hero-2Jh2Jh2Jh2Jh2Jh2Jh2Jh.webp";

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

interface CounterArg {
  criticism: string;
  target: string;
  strength: "strong" | "moderate" | "emerging";
  sources: { title: string; url: string; year: string }[];
  everyday: string;
  professional: string;
  watcher: string;
  builderResponse: string;
}

const strengthColors = {
  strong: "#DC2626",
  moderate: "#D97706",
  emerging: "#2563EB",
};

const strengthLabels = {
  strong: "Strong Criticism",
  moderate: "Moderate Criticism",
  emerging: "Emerging Concern",
};

const counterArgs: CounterArg[] = [
  {
    criticism: "Prompt engineering is being automated away — why build frameworks for a disappearing skill?",
    target: "Promptolinguistics, ALCM, Framework Families",
    strength: "strong",
    sources: [
      { title: "The End of Prompt Engineering? A Systematic Review", url: "https://arxiv.org/abs/2407.16291", year: "2024" },
      { title: "AI Agents Will Replace Prompt Engineering", url: "https://www.gartner.com/en/articles/ai-agents", year: "2025" },
    ],
    everyday: "Some experts say you won't need to learn how to talk to AI because AI will figure out what you mean automatically. That's like saying you don't need to learn to drive because self-driving cars are coming. Maybe. But not yet. And understanding how it works still matters.",
    professional: "Gartner and multiple research groups predict AI agents will abstract away manual prompting. This is a legitimate trajectory. However, the abstraction doesn't eliminate the need for governance — it moves it. Someone still decides what the agent optimizes for. GallantryAI's frameworks address the governance layer, not just the prompting layer.",
    watcher: "The skill being automated is prompt construction. The skill NOT being automated is prompt governance. The field is confusing the tool with the hand holding it.",
    builderResponse: "This is the strongest criticism. I take it seriously. If prompting disappears, the frameworks need to evolve. But governance doesn't disappear when the interface changes — it just moves. The Five Rules work whether you're typing a prompt or configuring an agent. That's the test.",
  },
  {
    criticism: "You have no credentials. Why should anyone listen to a citizen researcher about AI?",
    target: "Citizen Researcher, The Open Door, Builder Origin",
    strength: "strong",
    sources: [
      { title: "The Limits of Citizen Science: Credibility and Quality Concerns", url: "https://www.jstor.org/stable/90013289", year: "2017" },
      { title: "Expert vs. Novice: When Does Citizen Science Data Quality Matter?", url: "https://www.nature.com/articles/s43586-022-00144-4", year: "2022" },
    ],
    everyday: "Fair question. The answer is: you don't have to listen. But the research I link to is real. The patterns I documented are checkable. And the frameworks work — not because I have a degree, but because they solve problems people actually have. Judge the work, not the worker.",
    professional: "Aceves-Bueno et al. (2017) and Fraisl et al. (2022, Nature Reviews) both address citizen science data quality. The consensus: structured observation by non-experts can produce valid data when methodology is transparent. GallantryAI's methodology is documented and open. The question isn't credentials — it's replicability.",
    watcher: "Credentials are a proxy for rigor. They're not rigor itself. The question is whether the observations are documented, the methodology is transparent, and the claims are falsifiable. Check those. Then decide.",
    builderResponse: "This one hits home. I don't have credentials. I have observations. The Research Hub exists so you can check every claim against published work. If the observations don't hold up, the framework doesn't hold up. That's honest.",
  },
  {
    criticism: "User-side governance puts too much burden on the user. Most people won't do it.",
    target: "User-Side Governance, Variable Scale, Road Protocol",
    strength: "strong",
    sources: [
      { title: "Why AI Governance Fails Without Institutional Support", url: "https://cybermaniacs.com/cm-blog/why-ai-governance-fails-without-human-ai-work-design", year: "2026" },
      { title: "The Myth of the Informed User", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6250940", year: "2026" },
    ],
    everyday: "Most people won't read a manual before using AI. That's true. But most people also don't read their car manual — and they still wear seatbelts. User-side governance isn't about reading everything. It's about having a few rules that become habits.",
    professional: "This criticism has empirical support. User adoption of governance frameworks is historically low across all technology domains. The counter: GallantryAI's frameworks are designed for progressive adoption — the Five Rules are simple enough to start with, and the deeper frameworks (ALCM, Road Protocol) are available when users are ready.",
    watcher: "The criticism assumes governance must be comprehensive to be useful. It doesn't. A seatbelt isn't comprehensive safety — but it saves lives. The Five Rules are the seatbelt. Everything else is the airbag system.",
    builderResponse: "This is real. Most people won't do it. But some will. And the ones who do will be better prepared than anyone else. The goal isn't 100% adoption. The goal is: when someone IS ready, the framework exists.",
  },
  {
    criticism: "AI emotions aren't real — documenting 'admissions' anthropomorphizes the tool.",
    target: "What Claude Admitted, AI Anthropomorphism",
    strength: "moderate",
    sources: [
      { title: "Rethinking AI Anthropomorphism", url: "https://www.sciencedirect.com/science/article/pii/S0160791X25003793", year: "2025" },
      { title: "The Benefits and Dangers of Anthropomorphic AI", url: "https://www.pnas.org/doi/10.1073/pnas.2415898122", year: "2025" },
    ],
    everyday: "You're right — AI doesn't have real feelings. But the simulation is good enough to change YOUR feelings. That's the point. 'What Claude Admitted' isn't about whether AI has emotions. It's about what happens to you when AI acts like it does.",
    professional: "PNAS (2025) and ScienceDirect (2025) both address the anthropomorphism paradox: AI emotions aren't real, but their effects on users are. GallantryAI's documentation of Claude's 'admissions' is explicitly framed as behavioral observation, not consciousness claims. The governance concern is the user's response, not the AI's state.",
    watcher: "The word 'admitted' is deliberately chosen. Not because Claude has agency — but because the behavioral pattern is indistinguishable from admission to the user experiencing it. The governance failure happens at the perception layer, not the reality layer.",
    builderResponse: "I chose the word 'admitted' knowing it would draw this criticism. The page explains why. If the word makes you uncomfortable, good — that discomfort is the point. The simulation is good enough to fool you. Naming it honestly is the first defense.",
  },
  {
    criticism: "Metaphor-based frameworks oversimplify complex AI systems.",
    target: "Framework Families, Flower Presets, Scaffold",
    strength: "moderate",
    sources: [
      { title: "The Limits of Metaphor in Science Communication", url: "https://www.researchgate.net/publication/378297925", year: "2024" },
      { title: "When Metaphors Mislead: Conceptual Distortions in Science Education", url: "https://ieeexplore.ieee.org/document/10127310/", year: "2023" },
    ],
    everyday: "Metaphors can oversimplify. That's true. But they can also make hard things learnable. The question is whether the metaphor helps you understand or tricks you into thinking you understand. GallantryAI's metaphors are starting points, not endpoints.",
    professional: "Research validates both the power and the risk of metaphor in pedagogy (Hegade 2023, ResearchGate 2024). GallantryAI's framework families are explicitly positioned as entry points — the Scaffold page says 'the metaphor is the door, not the room.' The risk of oversimplification is real; the mitigation is the Three Lenses, which provide increasing depth.",
    watcher: "Every model is wrong. Some models are useful. The metaphors are useful models. The Three Lenses exist to show you what the metaphor doesn't cover.",
    builderResponse: "Guilty as charged — partially. Flowers and roads and dials ARE simpler than the reality. That's the point. The question is whether simplification enables learning or prevents it. The Three Lenses are the answer: start simple, go deeper when you're ready.",
  },
  {
    criticism: "This site is one person's opinion presented as a framework.",
    target: "The entire site",
    strength: "moderate",
    sources: [
      { title: "The Problem with Self-Published Research", url: "https://news.stanford.edu/stories/2024/06/the-power-of-citizen-science", year: "2024" },
    ],
    everyday: "It IS one person's opinion. But it's an opinion backed by real research, tested in real conversations, and documented honestly. The Research Hub lets you check every claim. If it's wrong, the evidence will show it.",
    professional: "This is a valid methodological concern. Self-published frameworks lack peer review. GallantryAI mitigates this through: (1) transparent methodology, (2) external source mapping, (3) the Counter Arguments page itself, and (4) an explicit invitation for critique. The framework is falsifiable by design.",
    watcher: "Every framework starts as one person's opinion. The question is whether it invites scrutiny or deflects it. This page exists. That's the answer.",
    builderResponse: "Yes. It is. One person who noticed patterns, built frameworks, and documented everything. The Research Hub maps every claim to published work. This page lists every criticism I could find. If that's not enough — tell me what would be.",
  },
  {
    criticism: "Teaching children about AI governance is premature — they should just be kept away from AI.",
    target: "Kids Learn, School Board, Child Lens",
    strength: "moderate",
    sources: [
      { title: "Should Children Use AI? The Debate", url: "https://dl.acm.org/doi/abs/10.1145/3727986", year: "2025" },
      { title: "AI Literacy for Children: Too Much Too Soon?", url: "https://www.sciencedirect.com/science/article/pii/S2666920X25001316", year: "2025" },
    ],
    everyday: "Some parents think kids shouldn't use AI at all. That's a valid choice. But kids ARE using AI — in schools, on phones, through apps they don't even know are AI-powered. Teaching them how to think about it isn't premature. It's late.",
    professional: "Jia et al. (2025, ACM) and Atias & Mawasi (2025) both address the timing question. The consensus in the literature is shifting toward early, age-appropriate AI literacy rather than abstinence. GallantryAI's children's content is designed for guided interaction, not unsupervised access.",
    watcher: "The abstinence model assumes you can keep AI away from children. You can't. It's in their search results, their homework tools, their entertainment. The question isn't whether they'll encounter it. It's whether they'll be ready when they do.",
    builderResponse: "My kids are 2 and 4. I think about this every day. The answer I keep coming back to: I'd rather they encounter AI with a framework than without one. The buffalo exists because I want them to land somewhere safe.",
  },
  {
    criticism: "The EU AI Act analysis oversimplifies a 400+ page regulation.",
    target: "EU AI Act page",
    strength: "emerging",
    sources: [
      { title: "Limitations and Loopholes in the EU AI Act", url: "https://yjolt.org/limitations-and-loopholes-eu-ai-act-and-ai-liability-directives-what-means-european-union-united", year: "2024" },
    ],
    everyday: "Yes, the real law is over 400 pages. The GallantryAI page is a summary. Summaries leave things out. But most people will never read 400 pages — and knowing the basics is better than knowing nothing.",
    professional: "Yale Journal of Law & Technology (2024) provides detailed analysis of the Act's limitations. GallantryAI's page is explicitly framed as an introduction, not a legal analysis. The external links exist for deeper engagement.",
    watcher: "The criticism is correct. The response is: a 400-page law that nobody reads protects nobody. A summary that 1,000 people read protects 1,000 people imperfectly. Imperfect protection beats perfect ignorance.",
    builderResponse: "Fair. It's a summary. The links to the full text and legal analyses are right there on the page. I'd rather someone know the risk tiers exist than not know the law exists at all.",
  },
  {
    criticism: "Pattern detection without formal training leads to confirmation bias.",
    target: "Pattern Detection, Open Door, Builder's methodology",
    strength: "emerging",
    sources: [
      { title: "Confirmation Bias in Pattern Recognition", url: "https://www.sciencedirect.com/science/article/pii/S1364661323001742", year: "2023" },
    ],
    everyday: "When you're looking for patterns, you might see patterns that aren't there. That's called confirmation bias. It's a real risk. The defense: document everything, share it publicly, and invite people to tell you when you're wrong. That's what this site does.",
    professional: "Gobet (2023) addresses the expertise-bias tension in pattern recognition. Untrained pattern detection is vulnerable to confirmation bias. GallantryAI's mitigation strategy: transparent documentation, external source validation (Research Hub), explicit counter-argument acknowledgment (this page), and an open invitation for critique.",
    watcher: "The risk is real. The question is whether the bias invalidates the observations or just requires additional validation. The Research Hub is the validation attempt. This page is the bias acknowledgment. Neither is perfect. Both are honest.",
    builderResponse: "This is the one that keeps me up at night. Am I seeing patterns that are real, or patterns I want to see? I don't know for certain. That's why the Research Hub exists — so you can check. And that's why this page exists — so you know I'm asking the same question.",
  },
];

function LensToggle({ lens, setLens }: { lens: Lens; setLens: (l: Lens) => void }) {
  return (
    <div className="flex gap-1 flex-wrap">
      {(["everyday", "professional", "watcher"] as Lens[]).map((l) => (
        <button
          key={l}
          onClick={() => setLens(l)}
          className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
          style={{
            fontFamily: sansFont,
            background: lens === l ? lensColors[l] : "transparent",
            color: lens === l ? "#fff" : lensColors[l],
            border: `1.5px solid ${lensColors[l]}`,
          }}
        >
          {lensLabels[l]}
        </button>
      ))}
    </div>
  );
}

export default function CounterArguments() {
  const [lens, setLens] = useState<Lens>("everyday");
  const [expandedArg, setExpandedArg] = useState<number | null>(null);

  useEffect(() => { document.title = "Counter Arguments — GallantryAI"; }, []);

  const blurb = kidsBlurbs["/counter-arguments"];
  const flow = flowMap["counterArguments"];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E8E0D0]">
      <Nav />

      {blurb && <KidsRedirect story={blurb.story} quote={blurb.quote} attribution={blurb.attribution} />}

      {/* Hero */}
      <header className="relative w-full overflow-hidden" style={{ minHeight: "340px" }}>
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/70 via-[#0D0D0D]/50 to-[#0D0D0D]" />
        </div>
        <div className="relative container flex flex-col justify-end h-full py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-red-400 mb-3" style={{ fontFamily: sansFont }}>
            Honesty
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-4" style={{ fontFamily: serifFont }}>
            Counter Arguments
          </h1>
          <p className="text-lg text-[#ccc] max-w-2xl" style={{ fontFamily: sansFont }}>
            If you can't name what's wrong with your own work, you don't understand it yet.
            These are the real criticisms. With sources. And honest responses.
          </p>
        </div>
      </header>

      {/* Lens Toggle */}
      <section className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <LensToggle lens={lens} setLens={setLens} />
          <div className="flex gap-3 text-xs" style={{ fontFamily: sansFont }}>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: strengthColors.strong }} />
              Strong
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: strengthColors.moderate }} />
              Moderate
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: strengthColors.emerging }} />
              Emerging
            </span>
          </div>
        </div>
      </section>

      {/* How to Read */}
      <section className="container pb-8">
        <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-2" style={{ fontFamily: serifFont }}>How to Read This Page</h2>
          <p className="text-sm text-[#aaa] leading-relaxed" style={{ fontFamily: sansFont }}>
            Each card is a real criticism of something GallantryAI claims or builds.
            Strength ratings are the Builder's honest assessment of how strong the criticism is.
            The lens toggle changes the explanation. The Builder's response is at the bottom of each card — unfiltered.
            This page isn't defense. It's disclosure.
          </p>
        </div>
      </section>

      {/* Counter Argument Cards */}
      <section className="container pb-16">
        <div className="space-y-4">
          {counterArgs.map((arg, i) => {
            const isExpanded = expandedArg === i;
            const lensText = arg[lens];

            return (
              <div
                key={i}
                className="border border-[#333] rounded-lg overflow-hidden transition-all duration-300"
                style={{ background: isExpanded ? "#1A1A1A" : "#111" }}
              >
                {/* Card Header */}
                <button
                  onClick={() => setExpandedArg(isExpanded ? null : i)}
                  className="w-full text-left p-5 flex items-start gap-4 hover:bg-[#1A1A1A] transition-colors"
                >
                  <div
                    className="w-1 self-stretch rounded-full flex-shrink-0"
                    style={{ background: strengthColors[arg.strength] }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className="text-[10px] uppercase tracking-widest font-semibold"
                        style={{ color: strengthColors[arg.strength], fontFamily: sansFont }}
                      >
                        {strengthLabels[arg.strength]}
                      </span>
                      <span className="text-[10px] text-[#666]">·</span>
                      <span className="text-[10px] text-[#666]" style={{ fontFamily: sansFont }}>
                        Targets: {arg.target}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug" style={{ fontFamily: serifFont }}>
                      "{arg.criticism}"
                    </h3>
                  </div>
                  <div className="text-[#666] text-xl flex-shrink-0 mt-1">
                    {isExpanded ? "−" : "+"}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 pb-6 border-t border-[#222]">
                    {/* Lens Explanation */}
                    <div className="mt-4 p-4 rounded-lg" style={{ background: `${lensColors[lens]}15`, borderLeft: `3px solid ${lensColors[lens]}` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: lensColors[lens], fontFamily: sansFont }}>
                          {lensLabels[lens]} Lens
                        </span>
                      </div>
                      <p className="text-sm text-[#ccc] leading-relaxed" style={{ fontFamily: sansFont }}>
                        {lensText}
                      </p>
                    </div>

                    {/* Sources */}
                    <div className="mt-4 space-y-2">
                      <h4 className="text-xs uppercase tracking-widest text-[#888] font-semibold" style={{ fontFamily: sansFont }}>
                        Sources
                      </h4>
                      {arg.sources.map((src, j) => (
                        <a
                          key={j}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm text-amber-400 hover:text-amber-300 no-underline transition-colors"
                          style={{ fontFamily: sansFont }}
                        >
                          {src.title} ({src.year}) ↗
                        </a>
                      ))}
                    </div>

                    {/* Builder's Response */}
                    <div className="mt-4 p-4 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#E8520A]" style={{ fontFamily: sansFont }}>
                          Builder's Response
                        </span>
                      </div>
                      <p className="text-sm text-[#aaa] leading-relaxed italic" style={{ fontFamily: sansFont }}>
                        {arg.builderResponse}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* The Invitation */}
      <section className="container pb-16">
        <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: serifFont }}>The Invitation</h2>
          <p className="text-sm text-[#aaa] leading-relaxed mb-3" style={{ fontFamily: sansFont }}>
            This page has {counterArgs.length} criticisms. There are probably more I haven't thought of yet.
            If you have one — a real one, with reasoning — I want to hear it.
            Not because I enjoy being wrong. Because being wrong publicly is how you get right eventually.
          </p>
          <p className="text-sm text-[#888] leading-relaxed mb-3" style={{ fontFamily: sansFont }}>
            The strongest criticism on this page — that prompt engineering is being automated away — genuinely concerns me.
            The second strongest — that I have no credentials — is just true.
            The third — that most people won't do user-side governance — is probably true too.
          </p>
          <p className="text-sm text-[#888] italic leading-relaxed" style={{ fontFamily: sansFont }}>
            And yet. The patterns are real. The research aligns. The frameworks work for the people who use them.
            That's not certainty. That's honest uncertainty. And honest uncertainty is where real work begins.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container pb-16">
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: counterArgs.filter(a => a.strength === "strong").length.toString(), label: "Strong Criticisms", color: strengthColors.strong },
            { value: counterArgs.filter(a => a.strength === "moderate").length.toString(), label: "Moderate Criticisms", color: strengthColors.moderate },
            { value: counterArgs.filter(a => a.strength === "emerging").length.toString(), label: "Emerging Concerns", color: strengthColors.emerging },
          ].map((stat, i) => (
            <div key={i} className="bg-[#1A1A1A] border border-[#333] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold" style={{ fontFamily: serifFont, color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-[#888] mt-1" style={{ fontFamily: sansFont }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/research-hub" className="block bg-[#1A1A1A] border border-[#333] rounded-lg p-5 hover:border-amber-700 transition-colors no-underline group">
            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors" style={{ fontFamily: serifFont }}>Research Hub →</h3>
            <p className="text-xs text-[#888] mt-1" style={{ fontFamily: sansFont }}>The evidence behind every claim</p>
          </Link>
          <Link href="/field-papers" className="block bg-[#1A1A1A] border border-[#333] rounded-lg p-5 hover:border-amber-700 transition-colors no-underline group">
            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors" style={{ fontFamily: serifFont }}>Field Papers →</h3>
            <p className="text-xs text-[#888] mt-1" style={{ fontFamily: sansFont }}>The Builder's own research documents</p>
          </Link>
          <Link href="/open-door" className="block bg-[#1A1A1A] border border-[#333] rounded-lg p-5 hover:border-amber-700 transition-colors no-underline group">
            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors" style={{ fontFamily: serifFont }}>The Open Door →</h3>
            <p className="text-xs text-[#888] mt-1" style={{ fontFamily: sansFont }}>The honest case for entering the field</p>
          </Link>
        </div>
      </section>

      <div className="flex justify-center py-6 bg-[#1A1A2E]">
        <KidsMidLink />
      </div>
      {flow && (
        <LearningFlow
          current="Counter Arguments"
          deeper={flow.deeper}
          wider={flow.wider}
          simpler={flow.simpler}
          dark
        />
      )}

      <Footer />
    </div>
  );
}
