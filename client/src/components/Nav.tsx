/*
 * GALLANTRYAI Navigation — Categorized menu
 * Who Are You? | Foundation | For You | Tools | Research | Explore
 * Buffalo = Guardian (shows the way) — kids link uses buffalo
 * Sloth = Guide (helps you see it) — stays as OopsSloth
 */

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import PromptPanel from "@/components/PromptPanel";
import { lenses, foundationLinks, forYouLinks, toolsLinks, researchLinks, exploreLinks } from "@/lib/navData";

const BUFFALO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png";

// Nav data arrays imported from @/lib/navData.ts — edit there, not here

type NavSection = "lenses" | "foundation" | "forYou" | "tools" | "research" | "explore" | null;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<NavSection>(null);
  const [promptOpen, setPromptOpen] = useState(false);
  const [location] = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggleDropdown(section: NavSection) {
    setActiveDropdown(activeDropdown === section ? null : section);
  }

  function DropdownButton({ label, section }: { label: string; section: NavSection }) {
    return (
      <button
        onClick={() => toggleDropdown(section)}
        className={`flex items-center gap-1 transition-colors ${activeDropdown === section ? "text-[#E8520A]" : "hover:text-[#E8520A]"}`}
      >
        {label}
        <span className="text-[10px]">{activeDropdown === section ? "▲" : "▼"}</span>
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
            className="block px-4 py-2 text-sm hover:bg-[#FAF6EF] transition-colors no-underline"
            style={{ color: item.color || '#2D2D2D' }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    );
  }

  function closeAll() {
    setActiveDropdown(null);
    setOpen(false);
  }

  return (
    <>
    <header className="w-full sticky top-0 z-50 bg-[#FAF6EF] border-b border-[#e8e0d0]">
      <div className="brand-top-bar" />

      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPromptOpen((v) => !v)}
            aria-label="Open prompt library"
            className="mg-avatar text-xs transition-all duration-200 cursor-pointer select-none"
            style={{
              boxShadow: "0 0 0 2px rgba(232,82,10,0.5), 0 0 14px rgba(232,82,10,0.35), 0 3px 8px rgba(0,0,0,0.4)",
              transform: "translateY(0px)",
              background: "#1A1A2E",
              border: "none",
            }}
            onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(1px) scale(0.95)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 2px rgba(232,82,10,0.7), 0 0 8px rgba(232,82,10,0.5), 0 1px 3px rgba(0,0,0,0.4)"; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 2px rgba(232,82,10,0.5), 0 0 14px rgba(232,82,10,0.35), 0 3px 8px rgba(0,0,0,0.4)"; }}
            onTouchStart={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(1px) scale(0.95)"; }}
            onTouchEnd={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0px)"; }}
          >G</button>
        <Link href="/" className="flex items-center gap-0 no-underline">
          <div>
            <div className="font-bold text-sm tracking-tight text-[#1A1A2E]" style={{ fontFamily: "'Playfair Display', serif" }}>
              GallantryAI
            </div>
            <div className="text-[10px] text-[#E8520A] font-medium tracking-wide uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              A Thinking Partner. Not a Shortcut.
            </div>
          </div>
        </Link>
        </div>

        {/* Desktop Nav — order: Lenses | Foundation | For You | Tools | Research | Explore */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-[#2D2D2D]" ref={navRef} style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <div className="relative">
            <DropdownButton label="Who Are You?" section="lenses" />
            {activeDropdown === "lenses" && <DropdownMenu items={lenses} onClose={closeAll} />}
          </div>
          <div className="relative">
            <DropdownButton label="Foundation" section="foundation" />
            {activeDropdown === "foundation" && <DropdownMenu items={foundationLinks} onClose={closeAll} />}
          </div>
          <div className="relative">
            <DropdownButton label="For You" section="forYou" />
            {activeDropdown === "forYou" && <DropdownMenu items={forYouLinks} onClose={closeAll} />}
          </div>
          <div className="relative">
            <DropdownButton label="Tools" section="tools" />
            {activeDropdown === "tools" && <DropdownMenu items={toolsLinks} onClose={closeAll} />}
          </div>
          <div className="relative">
            <DropdownButton label="Research" section="research" />
            {activeDropdown === "research" && <DropdownMenu items={researchLinks} onClose={closeAll} />}
          </div>
          <div className="relative">
            <DropdownButton label="Explore" section="explore" />
            {activeDropdown === "explore" && <DropdownMenu items={exploreLinks} onClose={closeAll} />}
          </div>

          <Link href="/for/child" className="no-underline flex items-center gap-1 hover:scale-110 transition-transform" title="Psst, hey kids!">
            <img src={BUFFALO_IMG} alt="Psst, hey kids!" className="w-7 h-7 rounded-full object-cover" style={{ border: '2px solid rgba(232,82,10,0.5)' }} />
          </Link>
        </nav>

        <button
          className="lg:hidden p-2 text-[#2D2D2D]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu — order: Lenses | Foundation | For You | Tools | Research | Explore */}
      {open && (
        <div className="lg:hidden border-t border-[#e8e0d0] bg-[#FAF6EF] px-4 py-4 space-y-1 rounded-b-2xl max-h-[80vh] overflow-y-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>

          <div className="section-label mb-2">Who Are You?</div>
          {lenses.map((lens) => (
            <Link key={lens.path} href={lens.path} onClick={closeAll} className={`block text-sm font-medium no-underline py-1 ${lens.color}`}>
              {lens.label}
            </Link>
          ))}

          <div className="border-t border-[#e8e0d0] pt-3 mt-3">
            <div className="section-label mb-2">Foundation</div>
            {foundationLinks.map((item) => (
              <Link key={item.path} href={item.path} onClick={closeAll} className="block text-sm font-medium text-[#2D2D2D] no-underline hover:text-[#E8520A] py-1">
                {item.label}
              </Link>
            ))}
          </div>

          {/* For You — above Tools */}
          <div className="border-t border-[#e8e0d0] pt-3 mt-3">
            <div className="section-label mb-2">For You</div>
            {forYouLinks.map((item) => (
              <Link key={item.path} href={item.path} onClick={closeAll} className="block text-sm font-medium no-underline hover:text-[#E8520A] py-1" style={{ color: item.color || '#2D2D2D' }}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-[#e8e0d0] pt-3 mt-3">
            <div className="section-label mb-2">Tools</div>
            {toolsLinks.map((item) => (
              <Link key={item.path} href={item.path} onClick={closeAll} className="block text-sm font-medium text-[#2D2D2D] no-underline hover:text-[#E8520A] py-1">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-[#e8e0d0] pt-3 mt-3">
            <div className="section-label mb-2">Research</div>
            {researchLinks.map((item) => (
              <Link key={item.path} href={item.path} onClick={closeAll} className="block text-sm font-medium text-[#2D2D2D] no-underline hover:text-[#E8520A] py-1">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-[#e8e0d0] pt-3 mt-3">
            <div className="section-label mb-2">Explore</div>
            {exploreLinks.map((item) => (
              <Link key={item.path} href={item.path} onClick={closeAll} className="block text-sm font-medium text-[#2D2D2D] no-underline hover:text-[#E8520A] py-1">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Buffalo guardian + Safety links at bottom */}
          <div className="border-t border-[#e8e0d0] pt-3 mt-3">
            <Link href="/for/child" onClick={closeAll} className="flex items-center gap-2 no-underline py-2">
              <img src={BUFFALO_IMG} alt="Psst, hey kids!" className="w-8 h-8 rounded-full object-cover" style={{ border: '2px solid rgba(232,82,10,0.5)' }} />
              <span className="text-sm font-bold text-sky-600">Psst, hey kids!</span>
            </Link>

          </div>
        </div>
      )}
    </header>

    <PromptPanel isOpen={promptOpen} onClose={() => setPromptOpen(false)} />
    </>
  );
}
