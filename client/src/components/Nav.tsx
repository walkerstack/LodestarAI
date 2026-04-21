/*
 * GALLANTRYAI Navigation — Categorized menu
 * Who Are You? | Foundation | For You | Tools | Research | Explore
 * Buffalo = Guardian (shows the way) — kids link uses buffalo
 * Sloth = Guide (helps you see it) — stays as OopsSloth
 * RADIAL DIAL: Who Are You? opens a circular arc of 9 role tiles
 * Professional tile opens 6-lens sub-panel in the centre of the dial
 */

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import PromptPanel from "@/components/PromptPanel";
import { lenses, foundationLinks, forYouLinks, toolsLinks, researchLinks, exploreLinks } from "@/lib/navData";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import AnnouncementBanner from "@/components/AnnouncementBanner";

const BUFFALO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png";

type NavSection = "lenses" | "foundation" | "forYou" | "tools" | "research" | "explore" | "safety" | null;
type HatSubPanel = "professional" | null;
type MobileAccordion = "foundation" | "forYou" | "tools" | "research" | "explore" | "professional" | null;

const HAT_IMAGES = {
  everyday: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-everyday-beybTXLC8QnfyMUD766qb2.webp",
  professional: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-professional-Fg9sYkU5aXzzfwEsbyWxt8.webp",
  watcher: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-watcher-2z7xaSNcuP9a9S5SHxTje8.webp",
  teen: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-teen-4Ste3xYAShZ9GirHrM8P9g.webp",
  child: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-child-mTNyShRSmpgki7dvScCRzn.webp",
  parent: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-parent-cVBEHf7WdLFfRrw6fKApvV.webp",
  nurse: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-nurse-Lk4Ji3iMnC2ZQcEoCCvRPP.webp",
  student: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-student-NQ43cYLVZYLpo2S6gS7mKh.webp",
  teacher: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/nav-tile-parent-cVBEHf7WdLFfRrw6fKApvV.webp",
};

const hatTiles = [
  { label: "Everyday",          icon: "◎", path: "/for/everyday",         border: "#E8520A", text: "#C2400C", desc: "Plain language. Real life.",              img: HAT_IMAGES.everyday },
  { label: "Child",              icon: "★", path: "/for/child",            border: "#3B82F6", text: "#1D4ED8", desc: "Safe. Simple. Yours.",                   img: HAT_IMAGES.child },
  { label: "Teen",               icon: "◇", path: "/for/teenager",         border: "#7C3AED", text: "#5B21B6", desc: "Your rules. Your pace.",                 img: HAT_IMAGES.teen },
  { label: "Guardian / Teacher", icon: "🏠", path: "/for/guardian-teacher", border: "#D97706", text: "#92400E", desc: "Learning AI alongside your kids.",      img: HAT_IMAGES.parent },
  { label: "Watcher",            icon: "◉", path: "/for/watcher",          border: "#6B7280", text: "#9CA3AF", desc: "The part that notices.",                 img: HAT_IMAGES.watcher },
  { label: "Professional",       icon: "◈", path: "",                       border: "#4F46E5", text: "#3730A3", desc: "Precise. Structured. Deep.",             img: HAT_IMAGES.professional },
];

const professionalLenses = [
  { label: "Prompt Engineer",   path: "/for/prompt-engineer",   desc: "Token Zero. Force profiles. Precision.",      color: "#4F46E5" },
  { label: "Researcher",        path: "/for/researcher",        desc: "Evidence. Methodology. Citizen science.",     color: "#0891B2" },
  { label: "Linguist",          path: "/for/linguist",          desc: "Words steer. Choose them carefully.",         color: "#7C3AED" },
  { label: "Mathematician",     path: "/for/mathematician",     desc: "Structure. Proof. Elegant constraint.",       color: "#059669" },
  { label: "Cognitive Science", path: "/for/cognitive-science", desc: "How your brain drifts. How to notice.",       color: "#D97706" },
  { label: "Guardian & Teacher",path: "/for/guardian-teacher",  desc: "The scaffold is your lesson plan.",           color: "#DC2626" },
];

// Radial dial geometry — 9 tiles on a circle, starting from top, clockwise
// Dial container: 480×480px, centre at (240,240)
// Tile radius from centre: 170px
// Tile size: 80×80px (so offset by -40,-40)
const DIAL_SIZE = 480;
const DIAL_CENTRE = DIAL_SIZE / 2;
const TILE_RADIUS = 170;
const TILE_W = 80;
const TILE_H = 88;

function getDialPosition(index: number, total: number) {
  // Spread tiles evenly around the full circle, starting from top (-90deg)
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const x = DIAL_CENTRE + TILE_RADIUS * Math.cos(angle) - TILE_W / 2;
  const y = DIAL_CENTRE + TILE_RADIUS * Math.sin(angle) - TILE_H / 2;
  return { x, y };
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<NavSection>(null);
  const [mobileAccordion, setMobileAccordion] = useState<MobileAccordion>(null);
  const [promptOpen, setPromptOpen] = useState(false);
  const [hatSubPanel, setHatSubPanel] = useState<HatSubPanel>(null);
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);
  const [location] = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  // Fetch published nav items from DB — DB is source of truth, navData.ts is fallback
  const { data: dbNavItems } = trpc.studio.getPublishedNavItems.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // cache 5 min — nav doesn't need to refresh constantly
  });

  // Also fetch custom studio pages for merging into nav sections
  const { data: dbNavPages } = trpc.studio.getNavPages.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  /**
   * Returns nav items for a given section.
   * If DB has items for this section, use them (sorted by position).
   * Otherwise fall back to the hardcoded navData.ts array.
   * Also merges in any custom studio pages for this section.
   */
  function getNavSection(
    section: "lenses" | "foundation" | "for-you" | "tools" | "research" | "explore",
    fallback: { label: string; path: string; color?: string; colour?: string }[]
  ) {
    const fromDb = dbNavItems?.filter((i) => i.section === section);
    const base = fromDb && fromDb.length > 0
      ? fromDb
          .sort((a, b) => a.position - b.position)
          .map((i) => ({ label: i.label, path: i.path, color: i.colour ?? undefined }))
      : fallback.map((i) => ({ label: i.label, path: i.path, color: (i as { color?: string; colour?: string }).color ?? (i as { color?: string; colour?: string }).colour ?? undefined }));
    // Merge in custom studio pages for this section
    const extra = dbNavPages
      ?.filter((p) => p.navCategory === section)
      .map((p) => ({ label: p.label, path: p.path, color: undefined })) ?? [];
    return [...base, ...extra];
  }

  const mergedLenses = getNavSection("lenses", lenses);
  const mergedFoundation = getNavSection("foundation", foundationLinks);
  const mergedForYou = getNavSection("for-you", forYouLinks);
  const mergedTools = getNavSection("tools", toolsLinks);
  const mergedResearch = getNavSection("research", researchLinks);
  const mergedExplore = getNavSection("explore", exploreLinks);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setHatSubPanel(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggleDropdown(section: NavSection) {
    setActiveDropdown(activeDropdown === section ? null : section);
    if (activeDropdown === section) setHatSubPanel(null);
  }

  function closeAll() {
    setActiveDropdown(null);
    setMobileAccordion(null);
    setHatSubPanel(null);
    setOpen(false);
    setHoveredTile(null);
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

  // ── RADIAL DIAL ──────────────────────────────────────────────────────────────
  function RadialDial({ onClose }: { onClose: () => void }) {
    return (
      <div
        className="absolute top-full mt-2 z-50"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        <div
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{ background: '#FAF6EF', border: '1px solid #e8e0d0', width: `${DIAL_SIZE}px` }}
        >
          {/* Dial area */}
          <div style={{ position: 'relative', width: `${DIAL_SIZE}px`, height: `${DIAL_SIZE}px` }}>

            {/* Subtle ring guide */}
            <div style={{
              position: 'absolute',
              left: DIAL_CENTRE - TILE_RADIUS - TILE_W / 2,
              top: DIAL_CENTRE - TILE_RADIUS - TILE_H / 2,
              width: (TILE_RADIUS + TILE_W / 2) * 2,
              height: (TILE_RADIUS + TILE_H / 2) * 2,
              borderRadius: '50%',
              border: '1px dashed rgba(232,82,10,0.12)',
              pointerEvents: 'none',
            }} />

            {/* Centre — either GallantryAI mark or Professional sub-panel */}
            <div style={{
              position: 'absolute',
              left: DIAL_CENTRE - 72,
              top: DIAL_CENTRE - 72,
              width: 144,
              height: 144,
              borderRadius: '50%',
              background: hatSubPanel === 'professional' ? '#F0F4FF' : 'rgba(232,82,10,0.06)',
              border: hatSubPanel === 'professional' ? '2px solid #4F46E5' : '1.5px solid rgba(232,82,10,0.18)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              transition: 'all 0.2s ease',
            }}>
              {hatSubPanel === 'professional' ? (
                <div style={{ padding: '8px', textAlign: 'center' }}>
                  <button
                    onClick={() => setHatSubPanel(null)}
                    style={{ color: '#4F46E5', fontSize: '9px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", marginBottom: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    ← Back
                  </button>
                  <div style={{ fontSize: '8px', fontWeight: 700, color: '#3730A3', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.05em', lineHeight: 1.3 }}>
                    PROFESSIONAL<br />LENSES
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#E8520A', fontFamily: "'Playfair Display', serif", textAlign: 'center', lineHeight: 1.2 }}>
                    Who<br />Are You?
                  </div>
                </>
              )}
            </div>

            {/* Professional sub-panel lenses — arranged around centre when open */}
            {hatSubPanel === 'professional' && (
              <div style={{
                position: 'absolute',
                left: 0, top: 0,
                width: DIAL_SIZE, height: DIAL_SIZE,
                pointerEvents: 'none',
              }}>
                {professionalLenses.map((lens, i) => {
                  const angle = (i / professionalLenses.length) * 2 * Math.PI - Math.PI / 2;
                  const r = 110;
                  const lx = DIAL_CENTRE + r * Math.cos(angle) - 44;
                  const ly = DIAL_CENTRE + r * Math.sin(angle) - 26;
                  return (
                    <Link
                      key={lens.path}
                      href={lens.path}
                      onClick={() => { setHatSubPanel(null); onClose(); }}
                      style={{
                        position: 'absolute',
                        left: lx,
                        top: ly,
                        width: 88,
                        height: 52,
                        background: 'white',
                        border: `1.5px solid ${lens.color}44`,
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px',
                        textDecoration: 'none',
                        pointerEvents: 'all',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
                        cursor: 'pointer',
                        zIndex: 3,
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = 'scale(1.08)';
                        el.style.boxShadow = `0 4px 16px ${lens.color}44`;
                        el.style.borderColor = lens.color;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = 'scale(1)';
                        el.style.boxShadow = 'none';
                        el.style.borderColor = `${lens.color}44`;
                      }}
                    >
                      <span style={{ fontSize: '8px', fontWeight: 700, color: lens.color, fontFamily: "'DM Sans', sans-serif", textAlign: 'center', lineHeight: 1.2 }}>{lens.label}</span>
                      <span style={{ fontSize: '7px', color: '#9CA3AF', textAlign: 'center', lineHeight: 1.2, marginTop: '2px' }}>{lens.desc}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* 9 role tiles on the arc */}
            {hatTiles.map((hat, i) => {
              const { x, y } = getDialPosition(i, hatTiles.length);
              const isProfessional = hat.label === 'Professional';
              const isHovered = hoveredTile === hat.label;
              const isDimmed = hoveredTile !== null && !isHovered;

              const tileStyle: React.CSSProperties = {
                position: 'absolute',
                left: x,
                top: y,
                width: TILE_W,
                height: TILE_H,
                borderRadius: '12px',
                overflow: 'hidden',
                border: `1.5px solid ${hat.border}${isHovered ? 'ff' : '66'}`,
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease',
                transform: isHovered
                  ? 'perspective(400px) translateZ(12px) scale(1.12)'
                  : 'perspective(400px) translateZ(0px) scale(1)',
                boxShadow: isHovered ? `0 6px 20px ${hat.border}55` : 'none',
                opacity: isDimmed ? 0.45 : 1,
                zIndex: isHovered ? 5 : 1,
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                background: '#fff',
              };

              const inner = (
                <>
                  <div style={{ width: '100%', height: 52, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={hat.img}
                      alt={hat.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.35) 100%)` }} />
                  </div>
                  <div style={{ padding: '4px 4px 3px', background: '#fff', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: '8px', fontWeight: 700, color: hat.text, fontFamily: "'DM Sans', sans-serif", textAlign: 'center', lineHeight: 1.2 }}>{hat.label}</div>
                    {isProfessional && (
                      <div style={{ fontSize: '7px', color: hat.border, textAlign: 'center', marginTop: '1px', fontFamily: "'DM Sans', sans-serif" }}>6 lenses ›</div>
                    )}
                  </div>
                </>
              );

              if (isProfessional) {
                return (
                  <button
                    key={hat.label}
                    style={{ ...tileStyle, background: '#fff' }}
                    onMouseEnter={() => setHoveredTile(hat.label)}
                    onMouseLeave={() => setHoveredTile(null)}
                    onClick={() => setHatSubPanel('professional')}
                  >
                    {inner}
                  </button>
                );
              }

              return (
                <Link
                  key={hat.label}
                  href={hat.path}
                  style={tileStyle}
                  onMouseEnter={() => setHoveredTile(hat.label)}
                  onMouseLeave={() => setHoveredTile(null)}
                  onClick={onClose}
                >
                  {inner}
                </Link>
              );
            })}
          </div>

          {/* Bottom strip */}
          <div style={{ borderTop: '1px solid #e8e0d0', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAF6EF' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="/rules" onClick={onClose} style={{ fontSize: '11px', fontWeight: 700, color: '#E8520A', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>Five Rules</Link>
              <Link href="/prompts" onClick={onClose} style={{ fontSize: '11px', fontWeight: 700, color: '#4F46E5', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>Prompt Library</Link>
              <Link href="/field-papers" onClick={onClose} style={{ fontSize: '11px', fontWeight: 700, color: '#374151', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>Field Papers</Link>
            </div>
            <Link href="/flower-presets" onClick={onClose} style={{ fontSize: '10px', color: '#9CA3AF', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif' " }}>Simpler view →</Link>
          </div>
        </div>
      </div>
    );
  }
  // ── END RADIAL DIAL ──────────────────────────────────────────────────────────

  function toggleMobileAccordion(section: MobileAccordion) {
    setMobileAccordion(mobileAccordion === section ? null : section);
  }

  function MobileAccordionSection({
    label,
    section,
    items,
    accentColor = '#E8520A',
  }: {
    label: string;
    section: MobileAccordion;
    items: { label: string; path: string; color?: string }[];
    accentColor?: string;
  }) {
    const isOpen = mobileAccordion === section;
    return (
      <div className="border-t border-[#e8e0d0]">
        <button
          onClick={() => toggleMobileAccordion(section)}
          className="w-full flex items-center justify-between py-3 px-0"
        >
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accentColor, fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
          <span className="text-[10px] text-[#9CA3AF]" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block', transition: 'transform 0.2s ease' }}>▼</span>
        </button>
        {isOpen && (
          <div className="pb-3 space-y-0.5">
            {items.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={closeAll}
                className="block text-sm font-medium no-underline py-1.5 pl-2 rounded-lg hover:bg-[#F5EFE6] transition-colors"
                style={{ color: item.color || '#2D2D2D', fontFamily: "'DM Sans', sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
    <AnnouncementBanner />
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

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-[#2D2D2D]" ref={navRef} style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <div className="relative">
            <DropdownButton label="Who Are You?" section="lenses" />
            {activeDropdown === "lenses" && <RadialDial onClose={closeAll} />}
          </div>
          <div className="relative">
            <DropdownButton label="Foundation" section="foundation" />
            {activeDropdown === "foundation" && <DropdownMenu items={mergedFoundation} onClose={closeAll} />}
          </div>
          <div className="relative">
            <DropdownButton label="For You" section="forYou" />
            {activeDropdown === "forYou" && <DropdownMenu items={mergedForYou} onClose={closeAll} />}
          </div>
          <div className="relative">
            <DropdownButton label="Tools" section="tools" />
            {activeDropdown === "tools" && <DropdownMenu items={mergedTools} onClose={closeAll} />}
          </div>
          <div className="relative">
            <DropdownButton label="Research" section="research" />
            {activeDropdown === "research" && <DropdownMenu items={mergedResearch} onClose={closeAll} />}
          </div>
          <div className="relative">
            <DropdownButton label="Explore" section="explore" />
            {activeDropdown === "explore" && <DropdownMenu items={mergedExplore} onClose={closeAll} />}
          </div>

          {/* Red Cross — Crisis + Human Line */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'safety' ? null : 'safety')}
              className="flex items-center justify-center w-7 h-7 rounded-full transition-all hover:scale-110"
              style={{ background: '#DC2626', border: '2px solid #991B1B' }}
              title="Crisis & Human Line"
              aria-label="Safety links"
            >
              <span className="text-white font-bold text-sm leading-none select-none">+</span>
            </button>
            {activeDropdown === 'safety' && (
              <div className="absolute right-0 top-full mt-2 z-50 bg-white border border-red-200 rounded-xl shadow-xl overflow-hidden" style={{ minWidth: '180px' }}>
                <div className="px-3 py-2 border-b border-red-100">
                  <p className="text-[9px] font-bold tracking-widest uppercase text-red-600">Safety Links</p>
                </div>
                <Link href="/if-you-need-to-stop" onClick={closeAll} className="no-underline flex items-center gap-2 px-3 py-2.5 hover:bg-red-50 transition-colors">
                  <span className="text-red-600 font-bold text-xs">✚</span>
                  <span className="text-sm font-semibold text-red-700">If You Need to Stop</span>
                </Link>
                <Link href="/human-line" onClick={closeAll} className="no-underline flex items-center gap-2 px-3 py-2.5 hover:bg-red-50 transition-colors">
                  <span className="text-red-600 font-bold text-xs">—</span>
                  <span className="text-sm font-semibold text-red-700">The Human Line</span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/for/child" className="no-underline flex items-center gap-1 hover:scale-110 transition-transform" title="Psst, hey kids!">
            <img src={BUFFALO_IMG} alt="Psst, hey kids!" className="w-7 h-7 rounded-full object-cover" style={{ border: '2px solid rgba(232,82,10,0.5)' }} />
          </Link>
          {isAdmin && (
            <Link href="/studio" className="no-underline" title="Studio">
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E8520A', fontFamily: "'DM Sans', sans-serif", padding: '0.2rem 0.5rem', border: '1px solid #E8520A44', borderRadius: '4px' }}>Studio</span>
            </Link>
          )}
        </nav>

        <button
          className="lg:hidden p-2 text-[#2D2D2D]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu — unchanged */}
      {open && (
        <div className="lg:hidden border-t border-[#e8e0d0] bg-[#FAF6EF] px-4 py-4 rounded-b-2xl max-h-[85vh] overflow-y-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>

          {/* WHO ARE YOU — image tiles */}
          <div className="mb-1">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#E8520A] mb-3">Who Are You?</p>
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              {hatTiles.map((hat) => {
                const isPro = hat.label === 'Professional';
                const tileContent = (
                  <>
                    <div className="w-full relative overflow-hidden" style={{ height: '80px' }}>
                      <img src={hat.img} alt={hat.label} className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.9) 100%)` }} />
                    </div>
                    <div className="px-2.5 py-2" style={{ background: '#fff' }}>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-base" style={{ color: hat.border }}>{hat.icon}</span>
                        <span className="text-xs font-bold" style={{ color: hat.text }}>{hat.label}</span>
                      </div>
                      <p className="text-[9px] leading-tight opacity-70" style={{ color: hat.text }}>{isPro ? '6 lenses ›' : hat.desc}</p>
                    </div>
                  </>
                );
                if (isPro) {
                  return (
                    <button
                      key={hat.label}
                      onClick={() => setMobileAccordion(mobileAccordion === 'professional' ? null : 'professional' as MobileAccordion)}
                      className="no-underline rounded-2xl overflow-hidden flex flex-col text-left w-full"
                      style={{
                        border: `1.5px solid ${hat.border}44`,
                        boxShadow: `0 2px 8px ${hat.border}18`,
                        transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                        background: 'transparent',
                        padding: 0,
                        cursor: 'pointer',
                      }}
                    >
                      {tileContent}
                    </button>
                  );
                }
                return (
                  <Link
                    key={hat.label}
                    href={hat.path}
                    onClick={closeAll}
                    className="no-underline rounded-2xl overflow-hidden flex flex-col"
                    style={{
                      border: `1.5px solid ${hat.border}44`,
                      boxShadow: `0 2px 8px ${hat.border}18`,
                      transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                    }}
                    onTouchStart={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'scale(0.96)';
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 1px 4px ${hat.border}30`;
                    }}
                    onTouchEnd={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 8px ${hat.border}18`;
                    }}
                  >
                    {tileContent}
                  </Link>
                );
              })}
            </div>
            {/* Professional lenses sub-list — mobile */}
            {mobileAccordion === 'professional' && (
              <div className="mb-3 rounded-xl overflow-hidden" style={{ border: '1.5px solid #4F46E544', background: '#F5F3FF' }}>
                <p className="text-[9px] font-bold tracking-widest uppercase text-[#4F46E5] px-3 pt-2.5 pb-1">Professional Lenses</p>
                {professionalLenses.map((lens) => (
                  <Link
                    key={lens.label}
                    href={lens.path}
                    onClick={closeAll}
                    className="no-underline flex items-start gap-2 px-3 py-2 border-t border-[#4F46E522]"
                  >
                    <span className="text-xs font-bold" style={{ color: lens.color, minWidth: 110 }}>{lens.label}</span>
                    <span className="text-[9px] leading-tight opacity-60" style={{ color: '#374151' }}>{lens.desc}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Direct stream */}
            <div className="flex gap-4 pb-3 border-b border-[#e8e0d0]">
              <Link href="/rules" onClick={closeAll} className="text-xs font-semibold text-[#E8520A] no-underline">Five Rules</Link>
              <Link href="/prompts" onClick={closeAll} className="text-xs font-semibold text-[#4F46E5] no-underline">Prompt Library</Link>
              <Link href="/field-papers" onClick={closeAll} className="text-xs font-semibold text-[#374151] no-underline">Field Papers</Link>
            </div>
          </div>

          {/* ACCORDION SECTIONS */}
          <MobileAccordionSection label="Foundation" section="foundation" items={mergedFoundation} accentColor="#E8520A" />
          <MobileAccordionSection label="For You" section="forYou" items={mergedForYou} accentColor="#7C3AED" />
          <MobileAccordionSection label="Tools" section="tools" items={mergedTools} accentColor="#0891B2" />
          <MobileAccordionSection label="Research" section="research" items={mergedResearch} accentColor="#059669" />
          <MobileAccordionSection label="Explore" section="explore" items={mergedExplore} accentColor="#D97706" />

          {/* Red Cross — Safety links */}
          <div className="border-t border-[#e8e0d0] pt-3 mt-1 mb-1">
            <div className="flex gap-3">
              <Link href="/if-you-need-to-stop" onClick={closeAll} className="no-underline flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: '#FEF2F2', border: '1.5px solid #DC2626' }}>
                <span className="text-red-600 font-bold text-xs">✚</span>
                <span className="text-xs font-bold text-red-700">If You Need to Stop</span>
              </Link>
              <Link href="/human-line" onClick={closeAll} className="no-underline flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: '#FEF2F2', border: '1.5px solid #DC2626' }}>
                <span className="text-red-600 font-bold text-xs">—</span>
                <span className="text-xs font-bold text-red-700">Human Line</span>
              </Link>
            </div>
          </div>

          {/* Buffalo — kids link */}
          <div className="border-t border-[#e8e0d0] pt-3 mt-1">
            <Link href="/for/child" onClick={closeAll} className="flex items-center gap-2 no-underline py-1">
              <img src={BUFFALO_IMG} alt="Psst, hey kids!" className="w-8 h-8 rounded-full object-cover" style={{ border: '2px solid rgba(232,82,10,0.5)' }} />
              <span className="text-sm font-bold text-sky-600">Psst, hey kids!</span>
            </Link>
          </div>
          <div className="border-t border-[#e8e0d0] pt-3 mt-1">
            <Link href="/studio" onClick={closeAll} className="no-underline flex items-center gap-2 py-1">
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E8520A', fontFamily: "'DM Sans', sans-serif" }}>⚙ Studio</span>
            </Link>
          </div>
        </div>
      )}
    </header>

    <PromptPanel isOpen={promptOpen} onClose={() => setPromptOpen(false)} />
    </>
  );
}
