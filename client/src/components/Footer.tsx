/*
 * GALLANTRYAI Footer — Matches Nav 6-category structure
 * Enter Your Lens | Foundation | For You | Tools | Research | Explore
 * Buffalo = Guardian (shows the way) — kids link uses buffalo
 *
 * Build 2B: Now DB-driven via trpc.studio.getPublishedNavItems.
 * Falls back to hardcoded arrays if DB is empty or unavailable.
 * isFooter = true items appear here. Lenses section is excluded from footer.
 */

import { Link } from "wouter";
import PageStudioBlocks from "./studio/PageStudioBlocks";
import { trpc } from "@/lib/trpc";
import { lenses, foundationLinks, forYouLinks, toolsLinks, researchLinks, exploreLinks } from "@/lib/navData";

const BUFFALO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png";

type FooterLink = { label: string; path: string; colour?: string | null };

const SECTION_LABELS: Record<string, string> = {
  lenses: "Enter Your Lens",
  foundation: "Foundation",
  "for-you": "For You",
  tools: "Tools",
  research: "Research",
  explore: "Explore",
};

const FALLBACK: Record<string, FooterLink[]> = {
  lenses: lenses.map((i) => ({ label: i.label, path: i.path, colour: i.color })),
  foundation: foundationLinks.map((i) => ({ label: i.label, path: i.path })),
  "for-you": forYouLinks.map((i) => ({ label: i.label, path: i.path, colour: (i as { color?: string }).color })),
  tools: toolsLinks.map((i) => ({ label: i.label, path: i.path })),
  research: researchLinks.map((i) => ({ label: i.label, path: i.path })),
  explore: exploreLinks.map((i) => ({ label: i.label, path: i.path })),
};

const SECTIONS = ["lenses", "foundation", "for-you", "tools", "research", "explore"] as const;

export default function Footer() {
  // DB-driven nav items — falls back to hardcoded if DB empty
  const { data: dbNavItems } = trpc.studio.getPublishedNavItems.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  function getFooterSection(section: typeof SECTIONS[number]): FooterLink[] {
    const fromDb = dbNavItems?.filter((i) => i.section === section && i.isFooter);
    if (fromDb && fromDb.length > 0) {
      return fromDb
        .sort((a, b) => a.position - b.position)
        .map((i) => ({ label: i.label, path: i.path, colour: i.colour }));
    }
    return FALLBACK[section] ?? [];
  }

  const footerSections = SECTIONS.map((section) => ({
    section,
    label: SECTION_LABELS[section],
    items: getFooterSection(section),
  }));

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

        {/* Links — organized by Nav categories */}
        <div className="mt-6 pt-4 border-t border-[#e8e0d0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-xs text-[#888]">
            {footerSections.map(({ section, label, items }) => (
              <div key={section} className="space-y-1.5">
                <div className="text-[10px] uppercase tracking-widest text-[#aaa] font-semibold mb-2">{label}</div>
                {items.filter((item) => item.path).map((item) => (
                  <Link
                    key={item.path}
                    href={item.path ?? '/'}
                    className="block hover:text-[#E8520A] no-underline transition-colors"
                    style={item.colour ? { color: item.colour } : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
                {/* Safety links nested under For You */}
                {section === "for-you" && (
                  <>
                    <div className="text-[10px] uppercase tracking-widest text-[#aaa] font-semibold mt-4 mb-2">Safety</div>
                    <Link href="/if-you-need-to-stop" className="block text-rose-500 hover:text-rose-700 no-underline transition-colors font-medium">If You Need to Stop</Link>
                    <Link href="/human-line" className="block text-amber-600 hover:text-amber-800 no-underline transition-colors font-medium">The Human Line</Link>
                    <Link href="/" className="block hover:text-[#E8520A] no-underline transition-colors">Home</Link>
                  </>
                )}
              </div>
            ))}
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
