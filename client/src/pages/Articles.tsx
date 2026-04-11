/*
 * GALLANTRYAI — Articles / Field Reports
 * Design: Editorial Register
 * Living feed of field reports, notes, and observations.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const articles = [
  {
    id: 1,
    title: "Will Awareness Change Output?",
    subtitle: "Field Report Vol. 01",
    date: "February 2026",
    tag: "FIELD REPORT",
    tagColor: "bg-[#2A9D8F] text-white",
    excerpt:
      "The seed hypothesis. What happens when the human brings intentional awareness into the session before the first token is typed? This is where GallantryAI began.",
  },
  {
    id: 2,
    title: "The Missing Variable",
    subtitle: "Seven-Lens Analysis",
    date: "March 2026",
    tag: "ANALYSIS",
    tagColor: "bg-[#1A1A2E] text-white",
    excerpt:
      "Seven analytical lenses applied to the same session data. The variable that kept appearing in the gap between models was not the model. It was the watcher.",
  },
  {
    id: 3,
    title: "Register Integrity",
    subtitle: "Three-Engine Comparison",
    date: "March 2026",
    tag: "RESEARCH",
    tagColor: "bg-orange-600 text-white",
    excerpt:
      "Testing across three AI engines revealed that the quality of output was not a function of the model alone. Register Integrity — the human's ability to hold their voice — was the key variable.",
  },
  {
    id: 4,
    title: "Kids, Milk & Crumbs",
    subtitle: "Context Bridge Report",
    date: "March 2026",
    tag: "FIELD NOTE",
    tagColor: "bg-purple-600 text-white",
    excerpt:
      "A visual translation attempt and its failure map. What happens when you try to explain a complex framework to an AI that has never seen a kitchen table at 5am.",
  },
  {
    id: 5,
    title: "The Barney Poem",
    subtitle: "AI Governance in Plain Language",
    date: "April 2026",
    tag: "CREATIVE",
    tagColor: "bg-sky-500 text-white",
    excerpt:
      "What if AI governance was explained the way Barney the Dinosaur would explain it? A poem. A proof of concept. A test of register collapse resistance.",
  },
];

export default function Articles() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]">
      <Nav />

      <main className="flex-1 container py-12">
        <div className="section-label mb-2">Field Reports & Notes</div>
        <h1
          className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Articles
        </h1>
        <p className="text-sm text-[#888] mb-8 max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Living documents. Field reports. Notes from the kitchen table. All original. All ongoing.
        </p>

        <div className="space-y-6 max-w-2xl">
          {articles.map((article) => (
            <div
              key={article.id}
              className="border-l-4 border-[#E8520A] pl-5 py-2 hover:bg-orange-50/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`tag-pill text-[10px] ${article.tagColor}`}>{article.tag}</span>
                <span className="text-xs text-[#aaa]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {article.date}
                </span>
              </div>
              <h2
                className="font-bold text-[#1A1A2E] text-lg leading-snug mb-0.5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {article.title}
              </h2>
              <div className="text-xs text-[#E8520A] font-semibold uppercase tracking-wide mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {article.subtitle}
              </div>
              <p className="text-sm text-[#2D2D2D] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {article.excerpt}
              </p>
              <div className="mt-2 text-xs text-[#888] italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Full article coming soon.
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[#e8e0d0] pt-8">
          <p className="text-sm text-[#888] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            More field reports are being written. The research is ongoing.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
