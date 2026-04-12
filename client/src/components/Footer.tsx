/*
 * GALLANTRYAI Footer — Updated with all pages
 * Design: The Living Document — editorial register
 * Matches document footer: italic left, bold right. Safety. Honesty. Trust.
 */

import { Link } from "wouter";

export default function Footer() {
  return (
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

        {/* Links — organized by section */}
        <div className="mt-6 pt-4 border-t border-[#e8e0d0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[#888]">
            {/* Learn */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-widest text-[#aaa] font-semibold mb-2">Learn</div>
              <Link href="/promptolinguistics" className="block hover:text-[#E8520A] no-underline transition-colors">Promptolinguistics</Link>
              <Link href="/frameworks" className="block hover:text-[#E8520A] no-underline transition-colors">Framework Families</Link>
              <Link href="/lexicon" className="block hover:text-[#E8520A] no-underline transition-colors">Living Lexicon</Link>
              <Link href="/rules" className="block hover:text-[#E8520A] no-underline transition-colors">The Five Rules</Link>
              <Link href="/road-protocol" className="block hover:text-[#E8520A] no-underline transition-colors">Road Protocol</Link>
              <Link href="/flower-presets" className="block hover:text-[#E8520A] no-underline transition-colors">Flower Presets</Link>
              <Link href="/taxonomy" className="block hover:text-[#E8520A] no-underline transition-colors">AI Family Taxonomy</Link>
            </div>

            {/* Explore */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-widest text-[#aaa] font-semibold mb-2">Explore</div>
              <Link href="/gallery" className="block hover:text-[#E8520A] no-underline transition-colors">Gallery</Link>
              <Link href="/articles" className="block hover:text-[#E8520A] no-underline transition-colors">Articles</Link>
              <Link href="/human-line" className="block hover:text-[#E8520A] no-underline transition-colors">The Human Line</Link>
              <Link href="/field-papers" className="block hover:text-[#E8520A] no-underline transition-colors">Field Papers</Link>
            </div>

            {/* Research */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-widest text-[#aaa] font-semibold mb-2">Research</div>
              <Link href="/citizen-researcher" className="block hover:text-[#E8520A] no-underline transition-colors">Citizen Researcher</Link>
              <Link href="/builder" className="block hover:text-[#E8520A] no-underline transition-colors">The Builder</Link>
            </div>

            {/* Safety */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-widest text-[#aaa] font-semibold mb-2">Safety</div>
              <Link href="/if-you-need-to-stop" className="block text-rose-500 hover:text-rose-700 no-underline transition-colors font-medium">If You Need to Stop</Link>
              <Link href="/" className="block hover:text-[#E8520A] no-underline transition-colors">Home</Link>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#e8e0d0] text-[10px] text-[#aaa]">
            <span>배움을 정합니다 — I humbly seek to learn.</span>
            <span className="ml-4">whatisgallantryai.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
