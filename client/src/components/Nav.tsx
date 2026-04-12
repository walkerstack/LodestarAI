/*
 * GALLANTRYAI Navigation
 * Design: The Living Document — editorial register
 * Orange top bar. Clean sans. The watcher is always present.
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const lenses = [
  { label: "Child", path: "/for/child", color: "text-sky-500" },
  { label: "Guardian & Teacher", path: "/for/guardian-teacher", color: "text-green-600" },
  { label: "Prompt Engineer", path: "/for/prompt-engineer", color: "text-orange-600" },
  { label: "Linguist", path: "/for/linguist", color: "text-purple-600" },
  { label: "Mathematician", path: "/for/mathematician", color: "text-blue-600" },
  { label: "Cognitive Science", path: "/for/cognitive-science", color: "text-slate-600" },
  { label: "Psychology", path: "/for/psychology", color: "text-rose-600" },
  { label: "Researcher", path: "/for/researcher", color: "text-teal-600" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [lensOpen, setLensOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="w-full sticky top-0 z-50 bg-[#FAF6EF] border-b border-[#e8e0d0]">
      {/* Orange top bar */}
      <div className="brand-top-bar" />

      <div className="container flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="mg-avatar text-xs">G</div>
          <div>
            <div className="font-bold text-sm tracking-tight text-[#1A1A2E]" style={{ fontFamily: "'Playfair Display', serif" }}>
              GallantryAI
            </div>
            <div className="text-[10px] text-[#E8520A] font-medium tracking-wide uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              A Thinking Partner. Not a Shortcut.
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#2D2D2D]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {/* Enter Through Your Lens dropdown */}
          <div className="relative">
            <button
              onClick={() => setLensOpen(!lensOpen)}
              className="flex items-center gap-1 hover:text-[#E8520A] transition-colors"
            >
              Enter Your Lens
              <span className="text-[10px]">{lensOpen ? "▲" : "▼"}</span>
            </button>
            {lensOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-[#e8e0d0] rounded-2xl shadow-lg py-2 z-50 overflow-hidden">
                {lenses.map((lens) => (
                  <Link
                    key={lens.path}
                    href={lens.path}
                    onClick={() => setLensOpen(false)}
                    className={`block px-4 py-2 text-sm hover:bg-[#FAF6EF] transition-colors no-underline ${lens.color}`}
                  >
                    {lens.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/promptolinguistics" className={`hover:text-[#E8520A] transition-colors no-underline ${location === '/promptolinguistics' ? 'text-[#E8520A]' : ''}`}>
            Promptolinguistics
          </Link>
          <Link href="/lexicon" className={`hover:text-[#E8520A] transition-colors no-underline ${location === '/lexicon' ? 'text-[#E8520A]' : ''}`}>
            Lexicon
          </Link>
          <Link href="/gallery" className={`hover:text-[#E8520A] transition-colors no-underline ${location === '/gallery' ? 'text-[#E8520A]' : ''}`}>
            Gallery
          </Link>
          <Link href="/articles" className={`hover:text-[#E8520A] transition-colors no-underline ${location === '/articles' ? 'text-[#E8520A]' : ''}`}>
            Articles
          </Link>
          <Link href="/human-line" className={`hover:text-[#E8520A] transition-colors no-underline ${location === '/human-line' ? 'text-[#E8520A]' : ''}`}>
            The Human Line
          </Link>
          <Link href="/if-you-need-to-stop" className="text-rose-600 hover:text-rose-700 transition-colors no-underline text-xs font-semibold uppercase tracking-wide">
            If You Need to Stop
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[#2D2D2D]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#e8e0d0] bg-[#FAF6EF] px-4 py-4 space-y-3 rounded-b-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <div className="section-label mb-2">Enter Your Lens</div>
          {lenses.map((lens) => (
            <Link
              key={lens.path}
              href={lens.path}
              onClick={() => setOpen(false)}
              className={`block text-sm font-medium no-underline ${lens.color}`}
            >
              {lens.label}
            </Link>
          ))}
          <div className="border-t border-[#e8e0d0] pt-3 space-y-2">
            {[
              { label: "Promptolinguistics", path: "/promptolinguistics" },
              { label: "Living Lexicon", path: "/lexicon" },
              { label: "Gallery", path: "/gallery" },
              { label: "Articles", path: "/articles" },
              { label: "The Human Line", path: "/human-line" },
            ].map((item) => (
              <Link key={item.path} href={item.path} onClick={() => setOpen(false)} className="block text-sm font-medium text-[#2D2D2D] no-underline hover:text-[#E8520A]">
                {item.label}
              </Link>
            ))}
            <Link href="/if-you-need-to-stop" onClick={() => setOpen(false)} className="block text-sm font-semibold text-rose-600 no-underline">
              If You Need to Stop
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
