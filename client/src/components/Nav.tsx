/*
 * GALLANTRYAI Navigation — Updated with all new pages
 * Design: The Living Document — editorial register
 * Orange top bar. Clean sans. The watcher is always present.
 * Now includes: Builder, Frameworks, Citizen Researcher, Road Protocol, Five Rules
 */

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const lenses = [
  { label: "Everyday Person", path: "/for/everyday", color: "text-amber-600" },
  { label: "Child", path: "/for/child", color: "text-sky-500" },
  { label: "Guardian & Teacher", path: "/for/guardian-teacher", color: "text-green-600" },
  { label: "Prompt Engineer", path: "/for/prompt-engineer", color: "text-orange-600" },
  { label: "Linguist", path: "/for/linguist", color: "text-purple-600" },
  { label: "Mathematician", path: "/for/mathematician", color: "text-blue-600" },
  { label: "Cognitive Science", path: "/for/cognitive-science", color: "text-slate-600" },
  { label: "Psychology", path: "/for/psychology", color: "text-rose-600" },
  { label: "Researcher", path: "/for/researcher", color: "text-teal-600" },
];

const learnLinks = [
  { label: "The Five Rules", path: "/rules" },
  { label: "ALCM", path: "/alcm" },
  { label: "Whelm Scale", path: "/whelm-scale" },
  { label: "Variable Scale Theory", path: "/variable-scale" },
  { label: "Promptolinguistics", path: "/promptolinguistics" },
  { label: "Framework Families", path: "/frameworks" },
  { label: "Living Lexicon", path: "/lexicon" },
  { label: "Road Protocol", path: "/road-protocol" },
  { label: "Flower Presets", path: "/flower-presets" },
  { label: "AI Family Taxonomy", path: "/taxonomy" },
  { label: "Prompt Games", path: "/prompt-games" },
  { label: "Malbolge Geofence", path: "/malbolge" },
  { label: "Promptology Playground", path: "/playground" },
];

const exploreLinks = [
  { label: "Gallery", path: "/gallery" },
  { label: "Articles", path: "/articles" },
  { label: "The Human Line", path: "/human-line" },
  { label: "Field Papers", path: "/field-papers" },
  { label: "Citizen Researcher", path: "/citizen-researcher" },
  { label: "The Builder", path: "/builder" },
  { label: "Builder Origin", path: "/builder-origin" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [lensOpen, setLensOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [location] = useLocation();

  const lensRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (lensRef.current && !lensRef.current.contains(e.target as Node)) setLensOpen(false);
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) setLearnOpen(false);
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) setExploreOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function DropdownButton({ label, isOpen, onClick }: { label: string; isOpen: boolean; onClick: () => void }) {
    return (
      <button onClick={onClick} className="flex items-center gap-1 hover:text-[#E8520A] transition-colors">
        {label}
        <span className="text-[10px]">{isOpen ? "▲" : "▼"}</span>
      </button>
    );
  }

  function DropdownMenu({ items, onClose }: { items: { label: string; path: string; color?: string }[]; onClose: () => void }) {
    return (
      <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-[#e8e0d0] rounded-2xl shadow-lg py-2 z-50 overflow-hidden">
        {items.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            onClick={onClose}
            className={`block px-4 py-2 text-sm hover:bg-[#FAF6EF] transition-colors no-underline ${item.color || "text-[#2D2D2D]"}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    );
  }

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
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-[#2D2D2D]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {/* Enter Through Your Lens */}
          <div className="relative" ref={lensRef}>
            <DropdownButton label="Enter Your Lens" isOpen={lensOpen} onClick={() => { setLensOpen(!lensOpen); setLearnOpen(false); setExploreOpen(false); }} />
            {lensOpen && <DropdownMenu items={lenses} onClose={() => setLensOpen(false)} />}
          </div>

          {/* Learn dropdown */}
          <div className="relative" ref={learnRef}>
            <DropdownButton label="Learn" isOpen={learnOpen} onClick={() => { setLearnOpen(!learnOpen); setLensOpen(false); setExploreOpen(false); }} />
            {learnOpen && <DropdownMenu items={learnLinks} onClose={() => setLearnOpen(false)} />}
          </div>

          {/* Explore dropdown */}
          <div className="relative" ref={exploreRef}>
            <DropdownButton label="Explore" isOpen={exploreOpen} onClick={() => { setExploreOpen(!exploreOpen); setLensOpen(false); setLearnOpen(false); }} />
            {exploreOpen && <DropdownMenu items={exploreLinks} onClose={() => setExploreOpen(false)} />}
          </div>

          <Link href="/human-line" className="text-[#E8520A] hover:text-orange-700 transition-colors no-underline text-xs font-semibold">
            The Human Line
          </Link>

          <Link href="/if-you-need-to-stop" className="text-rose-600 hover:text-rose-700 transition-colors no-underline text-xs font-semibold uppercase tracking-wide">
            If You Need to Stop
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-[#2D2D2D]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[#e8e0d0] bg-[#FAF6EF] px-4 py-4 space-y-3 rounded-b-2xl max-h-[80vh] overflow-y-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <div className="section-label mb-2">Enter Your Lens</div>
          {lenses.map((lens) => (
            <Link key={lens.path} href={lens.path} onClick={() => setOpen(false)} className={`block text-sm font-medium no-underline ${lens.color}`}>
              {lens.label}
            </Link>
          ))}

          <div className="border-t border-[#e8e0d0] pt-3">
            <div className="section-label mb-2">Learn</div>
            {learnLinks.map((item) => (
              <Link key={item.path} href={item.path} onClick={() => setOpen(false)} className="block text-sm font-medium text-[#2D2D2D] no-underline hover:text-[#E8520A] py-1">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-[#e8e0d0] pt-3">
            <div className="section-label mb-2">Explore</div>
            {exploreLinks.map((item) => (
              <Link key={item.path} href={item.path} onClick={() => setOpen(false)} className="block text-sm font-medium text-[#2D2D2D] no-underline hover:text-[#E8520A] py-1">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-[#e8e0d0] pt-3">
            <Link href="/human-line" onClick={() => setOpen(false)} className="block text-sm font-semibold text-[#E8520A] no-underline py-1">
              The Human Line
            </Link>
            <Link href="/if-you-need-to-stop" onClick={() => setOpen(false)} className="block text-sm font-semibold text-rose-600 no-underline py-1">
              If You Need to Stop
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
