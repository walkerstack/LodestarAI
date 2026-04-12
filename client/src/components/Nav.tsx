/*
 * GALLANTRYAI Navigation — Categorized menu
 * Foundation | Tools | Research | For You | Explore | Lenses
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
  { label: "The Watcher", path: "/for/watcher", color: "text-gray-400" },
];

const foundationLinks = [
  { label: "Gallantry AI", path: "/gallantry-ai" },
  { label: "The Three Lenses", path: "/three-lenses" },
  { label: "The Five Rules", path: "/rules" },
  { label: "Road Protocol", path: "/road-protocol" },
  { label: "The Scaffold", path: "/scaffold" },
  { label: "User-Side Governance", path: "/user-governance" },
  { label: "Dual Strategy", path: "/dual-strategy" },
];

const toolsLinks = [
  { label: "Flower Presets", path: "/flower-presets" },
  { label: "Prompt Games", path: "/prompt-games" },
  { label: "Math Through Prompting", path: "/math-prompting" },
  { label: "Promptology Playground", path: "/playground" },
  { label: "Framework Families", path: "/frameworks" },
  { label: "Whelm Scale", path: "/whelm-scale" },
  { label: "Variable Scale Theory", path: "/variable-scale" },
  { label: "Malbolge Geofence", path: "/malbolge" },
];

const researchLinks = [
  { label: "Promptolinguistics", path: "/promptolinguistics" },
  { label: "ALCM", path: "/alcm" },
  { label: "Living Lexicon", path: "/lexicon" },
  { label: "AI Family Taxonomy", path: "/taxonomy" },
  { label: "What Claude Admitted", path: "/what-claude-admitted" },
  { label: "EU AI Act", path: "/eu-ai-act" },
];

const forYouLinks = [
  { label: "School Board", path: "/school-board" },
  { label: "Kids Learn", path: "/kids-learn" },
];

const exploreLinks = [
  { label: "Gallery", path: "/gallery" },
  { label: "Articles", path: "/articles" },
  { label: "The Human Line", path: "/human-line" },
  { label: "Field Papers", path: "/field-papers" },
  { label: "The Watcher", path: "/for/watcher" },
  { label: "Citizen Researcher", path: "/citizen-researcher" },
  { label: "The Builder", path: "/builder" },
  { label: "Builder Origin", path: "/builder-origin" },
  { label: "The Open Door", path: "/open-door" },
];

type NavSection = "lenses" | "foundation" | "tools" | "research" | "forYou" | "explore" | null;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<NavSection>(null);
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
            className={`block px-4 py-2 text-sm hover:bg-[#FAF6EF] transition-colors no-underline ${item.color || "text-[#2D2D2D]"}`}
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
    <header className="w-full sticky top-0 z-50 bg-[#FAF6EF] border-b border-[#e8e0d0]">
      <div className="brand-top-bar" />

      <div className="container flex items-center justify-between py-3">
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
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-[#2D2D2D]" ref={navRef} style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <div className="relative">
            <DropdownButton label="Enter Your Lens" section="lenses" />
            {activeDropdown === "lenses" && <DropdownMenu items={lenses} onClose={closeAll} />}
          </div>
          <div className="relative">
            <DropdownButton label="Foundation" section="foundation" />
            {activeDropdown === "foundation" && <DropdownMenu items={foundationLinks} onClose={closeAll} />}
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

          <Link href="/if-you-need-to-stop" className="text-rose-600 hover:text-rose-700 transition-colors no-underline text-xs font-semibold uppercase tracking-wide">
            Safety
          </Link>
          <Link href="/human-line" className="text-amber-700 hover:text-amber-800 transition-colors no-underline text-xs font-semibold uppercase tracking-wide">
            The Human Line
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

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[#e8e0d0] bg-[#FAF6EF] px-4 py-4 space-y-1 rounded-b-2xl max-h-[80vh] overflow-y-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>

          <div className="section-label mb-2">Enter Your Lens</div>
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
            <div className="section-label mb-2">For You</div>
            {forYouLinks.map((item) => (
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

          <div className="border-t border-[#e8e0d0] pt-3 mt-3">
            <Link href="/if-you-need-to-stop" onClick={closeAll} className="block text-sm font-semibold text-rose-600 no-underline py-1">
              If You Need to Stop
            </Link>
            <Link href="/human-line" onClick={closeAll} className="block text-sm font-semibold text-amber-700 no-underline py-1">
              The Human Line
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
