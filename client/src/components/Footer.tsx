/*
 * GALLANTRYAI Footer — Matches Nav 6-category structure
 * Enter Your Lens | Foundation | For You | Tools | Research | Explore
 * Buffalo = Guardian (shows the way) — kids link uses buffalo
 */

import { Link } from "wouter";
import PageStudioBlocks from "./studio/PageStudioBlocks";

const BUFFALO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png";

export default function Footer() {
  return (
    <>
    <PageStudioBlocks />
    <footer className="w-full border-t border-[#e8e0d0] bg-[#FAF6EF] mt-16">
      <div className="brand-top-bar" />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Left — italic tagline */}
          <div>
            <p className="text-sm text-[#2D2D2D] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              Built for the people no one was watching for.
            </p>
            <p className="text-xs text-[#888] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Matt Gallantry · Midland, Ontario · GallantryAI · 2026
            </p>
          </div>

          {/* Right — brand mark */}
          <div className="text-right">
            <div className="font-bold text-sm text-[#1A1A2E] tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              GALLANTRYAI →
            </div>
            <div className="text-xs text-[#888] mt-1">Safety · Honesty · Trust</div>
          </div>
        </div>

        {/* Links — organized by Nav categories: Lenses | Foundation | For You | Tools | Research | Explore */}
        <div className="mt-6 pt-4 border-t border-[#e8e0d0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-xs text-[#888]">

            {/* Enter Your Lens */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-widest text-[#aaa] font-semibold mb-2">Enter Your Lens</div>
              <Link href="/for/everyday" className="block hover:text-[#E8520A] no-underline transition-colors">Everyday Person</Link>
              <Link href="/for/child" className="block hover:text-[#E8520A] no-underline transition-colors">Child</Link>
              <Link href="/for/teenager" className="block hover:text-[#E8520A] no-underline transition-colors" style={{ color: '#4338ca' }}>Teenager</Link>
              <Link href="/for/guardian-teacher" className="block hover:text-[#E8520A] no-underline transition-colors">Guardian & Teacher</Link>
              <Link href="/for/prompt-engineer" className="block hover:text-[#E8520A] no-underline transition-colors">Prompt Engineer</Link>
              <Link href="/for/linguist" className="block hover:text-[#E8520A] no-underline transition-colors">Linguist</Link>
              <Link href="/for/mathematician" className="block hover:text-[#E8520A] no-underline transition-colors">Mathematician</Link>
              <Link href="/for/cognitive-science" className="block hover:text-[#E8520A] no-underline transition-colors">Cognitive Science</Link>
              <Link href="/for/psychology" className="block hover:text-[#E8520A] no-underline transition-colors">Psychology</Link>
              <Link href="/for/researcher" className="block hover:text-[#E8520A] no-underline transition-colors">Researcher</Link>
              <Link href="/for/watcher" className="block hover:text-[#E8520A] no-underline transition-colors" style={{ color: '#000' }}>The Watcher</Link>
            </div>

            {/* Foundation */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-widest text-[#aaa] font-semibold mb-2">Foundation</div>
              <Link href="/gallantry-ai" className="block hover:text-[#E8520A] no-underline transition-colors">Gallantry AI</Link>
              <Link href="/three-lenses" className="block hover:text-[#E8520A] no-underline transition-colors">The Three Voices</Link>
              <Link href="/rules" className="block hover:text-[#E8520A] no-underline transition-colors">The Five Rules</Link>
              <Link href="/road-protocol" className="block hover:text-[#E8520A] no-underline transition-colors">Road Protocol</Link>
              <Link href="/drift" className="block hover:text-[#E8520A] no-underline transition-colors">Drift</Link>
              <Link href="/hallucinations" className="block hover:text-[#E8520A] no-underline transition-colors">Hallucinations</Link>
              <Link href="/anthropomorphism" className="block hover:text-[#E8520A] no-underline transition-colors">Anthropomorphism</Link>
              <Link href="/scaffold" className="block hover:text-[#E8520A] no-underline transition-colors">The Scaffold</Link>
              <Link href="/user-governance" className="block hover:text-[#E8520A] no-underline transition-colors">User-Side Governance</Link>
              <Link href="/dual-strategy" className="block hover:text-[#E8520A] no-underline transition-colors">Dual Strategy</Link>
            </div>

            {/* For You — above Tools to match Nav order */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-widest text-[#aaa] font-semibold mb-2">For You</div>
              <Link href="/school-board" className="block hover:text-[#E8520A] no-underline transition-colors">School Board</Link>
              <Link href="/kids-learn" className="block hover:text-[#E8520A] no-underline transition-colors">Kids Learn</Link>
              <Link href="/for/child/rules" className="block hover:text-[#E8520A] no-underline transition-colors">Child Five Rules</Link>
              <Link href="/for/child/patterns" className="block hover:text-[#E8520A] no-underline transition-colors">What Are Patterns?</Link>
              <Link href="/for/child/prompts" className="block hover:text-[#E8520A] no-underline transition-colors">First Prompts (Kids)</Link>

              {/* Safety — nested under For You */}
              <div className="text-[10px] uppercase tracking-widest text-[#aaa] font-semibold mt-4 mb-2">Safety</div>
              <Link href="/if-you-need-to-stop" className="block text-rose-500 hover:text-rose-700 no-underline transition-colors font-medium">If You Need to Stop</Link>
              <Link href="/human-line" className="block text-amber-600 hover:text-amber-800 no-underline transition-colors font-medium">The Human Line</Link>
              <Link href="/" className="block hover:text-[#E8520A] no-underline transition-colors">Home</Link>
            </div>

            {/* Tools */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-widest text-[#aaa] font-semibold mb-2">Tools</div>
              <Link href="/prompts" className="block hover:text-[#E8520A] no-underline transition-colors">Prompt Library</Link>
              <Link href="/flower-presets" className="block hover:text-[#E8520A] no-underline transition-colors">Flower Presets</Link>
              <Link href="/prompt-games" className="block hover:text-[#E8520A] no-underline transition-colors">Prompt Games</Link>
              <Link href="/math-prompting" className="block hover:text-[#E8520A] no-underline transition-colors">Math Through Prompting</Link>
              <Link href="/playground" className="block hover:text-[#E8520A] no-underline transition-colors">Playground</Link>
              <Link href="/frameworks" className="block hover:text-[#E8520A] no-underline transition-colors">Framework Families</Link>
              <Link href="/whelm-scale" className="block hover:text-[#E8520A] no-underline transition-colors">Whelm Scale</Link>
              <Link href="/variable-scale" className="block hover:text-[#E8520A] no-underline transition-colors">Variable Scale Theory</Link>
              <Link href="/malbolge" className="block hover:text-[#E8520A] no-underline transition-colors">Malbolge Geofence</Link>
            </div>

            {/* Research */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-widest text-[#aaa] font-semibold mb-2">Research</div>
              <Link href="/promptolinguistics" className="block hover:text-[#E8520A] no-underline transition-colors">Promptolinguistics</Link>
              <Link href="/alcm" className="block hover:text-[#E8520A] no-underline transition-colors">ALCM</Link>
              <Link href="/lexicon" className="block hover:text-[#E8520A] no-underline transition-colors">Living Lexicon</Link>
              <Link href="/taxonomy" className="block hover:text-[#E8520A] no-underline transition-colors">AI Family Taxonomy</Link>
              <Link href="/what-claude-admitted" className="block hover:text-[#E8520A] no-underline transition-colors">What Claude Admitted</Link>
              <Link href="/eu-ai-act" className="block hover:text-[#E8520A] no-underline transition-colors">EU AI Act</Link>
              <Link href="/research-hub" className="block hover:text-[#E8520A] no-underline transition-colors">Research Hub</Link>
              <Link href="/research-hub?category=field" className="block no-underline transition-colors font-semibold" style={{ color: '#0891B2' }}>Field Events</Link>
              <Link href="/counter-arguments" className="block hover:text-[#E8520A] no-underline transition-colors">Counter Arguments</Link>
              <Link href="/screenshot-sharing" className="block hover:text-[#E8520A] no-underline transition-colors">Screenshot Sharing</Link>
              <Link href="/field-report-review" className="block hover:text-[#E8520A] no-underline transition-colors">Field Report Review</Link>
              <Link href="/what-the-ai-said" className="block hover:text-[#E8520A] no-underline transition-colors">What the AI Said</Link>
            </div>

            {/* Explore */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-widest text-[#aaa] font-semibold mb-2">Explore</div>
              <Link href="/gallery" className="block hover:text-[#E8520A] no-underline transition-colors">Gallery</Link>
              <Link href="/articles" className="block hover:text-[#E8520A] no-underline transition-colors">Articles</Link>
              <Link href="/human-line" className="block hover:text-[#E8520A] no-underline transition-colors">The Human Line</Link>
              <Link href="/field-papers" className="block hover:text-[#E8520A] no-underline transition-colors">Field Papers</Link>
              <Link href="/citizen-researcher" className="block hover:text-[#E8520A] no-underline transition-colors">Citizen Researcher</Link>
              <Link href="/builder" className="block hover:text-[#E8520A] no-underline transition-colors">The Builder</Link>
              <Link href="/builder-origin" className="block hover:text-[#E8520A] no-underline transition-colors">Builder Origin</Link>
              <Link href="/builders-kids" className="block hover:text-[#E8520A] no-underline transition-colors">The Builder's Kids</Link>
              <Link href="/open-door" className="block hover:text-[#E8520A] no-underline transition-colors">The Open Door</Link>
              <Link href="/backstage" className="block hover:text-[#E8520A] no-underline transition-colors">Backstage</Link>
            </div>
          </div>

          {/* Buffalo guardian link for kids */}
          <div className="mt-4 pt-3 border-t border-[#e8e0d0] flex items-center gap-3">
            <Link href="/for/child" className="flex items-center gap-2 no-underline">
              <img src={BUFFALO_IMG} alt="Psst, hey kids!" className="w-7 h-7 rounded-full object-cover" style={{ border: '2px solid rgba(232,82,10,0.5)' }} />
              <span className="text-xs font-bold text-sky-600">Psst, hey kids!</span>
            </Link>
          </div>

          <div className="mt-3 pt-3 border-t border-[#e8e0d0] text-[10px] text-[#aaa]">
            <span>배움을 정합니다 — I humbly seek to learn.</span>
            <span className="ml-4">whatisgallantryai.com</span>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
