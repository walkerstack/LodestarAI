/*
 * GALLANTRYAI Footer
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

        {/* Links */}
        <div className="mt-6 pt-4 border-t border-[#e8e0d0] flex flex-wrap gap-4 text-xs text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <Link href="/" className="hover:text-[#E8520A] no-underline transition-colors">Home</Link>
          <Link href="/promptolinguistics" className="hover:text-[#E8520A] no-underline transition-colors">Promptolinguistics</Link>
          <Link href="/lexicon" className="hover:text-[#E8520A] no-underline transition-colors">Living Lexicon</Link>
          <Link href="/gallery" className="hover:text-[#E8520A] no-underline transition-colors">Gallery</Link>
          <Link href="/articles" className="hover:text-[#E8520A] no-underline transition-colors">Articles</Link>
          <Link href="/if-you-need-to-stop" className="text-rose-500 hover:text-rose-700 no-underline transition-colors font-medium">If You Need to Stop</Link>
          <span className="text-[#ccc]">·</span>
          <span className="text-[#aaa]">whatisgallantryai.com</span>
        </div>
      </div>
    </footer>
  );
}
