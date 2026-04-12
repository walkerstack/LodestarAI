/*
 * GALLANTRYAI — Field Papers Page
 * Design: Dark research register — editorial, serious, honest
 * All citizen field research documents. Open access. Not peer reviewed. Honest about its edges.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD";

const papers = [
  {
    series: "Core Framework",
    color: "#E8520A",
    items: [
      {
        id: "FP-2026-01",
        title: "The Watcher Variable",
        subtitle: "A Dual Dataset Hypothesis for Promptolinguistic Research — V2",
        date: "March 29, 2026",
        description: "The word is not the variable. The human holding the word is the variable. Names the gap in all existing prompt research: nobody is logging the person running the experiment.",
        tags: ["Promptolinguistics", "Research Methodology", "Security Finding"],
        url: `${CDN}/watcher-v2-final(1)_c2cea34b.pdf`,
      },
      {
        id: "FP-2026-02",
        title: "The Unprepared User",
        subtitle: "V3",
        date: "2026",
        description: "What happens when someone sits down with AI and has no framework, no governance, and no awareness of what they are walking into.",
        tags: ["Safety", "Everyday User", "Governance"],
        url: `${CDN}/the_unprepared_user_v3_c2ade100.pdf`,
      },
      {
        id: "FP-2026-03",
        title: "GallantryAI Prompt Branding",
        subtitle: "V2",
        date: "2026",
        description: "How the GallantryAI framework uses language as a branding and governance instrument. The prompt as a signature.",
        tags: ["Promptolinguistics", "Branding", "Framework"],
        url: `${CDN}/GallantryAI_Prompt_Branding_V2_66ca969a.pdf`,
      },
    ],
  },
  {
    series: "Field Research Reports",
    color: "#4a7fa5",
    items: [
      {
        id: "FR-2026-05",
        title: "Will Awareness Change Output?",
        subtitle: "Field Report",
        date: "2026",
        description: "Does telling the AI that you know what it is doing change what it does? A field test of meta-awareness as a governance variable.",
        tags: ["Field Research", "Meta-Awareness", "Output Testing"],
        url: `${CDN}/will_awareness_change_output_fr2026_05_f804ada6.pdf`,
      },
      {
        id: "FR-2026-03",
        title: "The Neck Tingles Protocol",
        subtitle: "Field Report",
        date: "2026",
        description: "Documenting a physical response pattern observed during high-intensity AI sessions. The body as a governance signal.",
        tags: ["Field Research", "Watcher Variable", "Body Signal"],
        url: `${CDN}/neck_tingles_protocol_fr2026_03_3e9b0ffd.pdf`,
      },
      {
        id: "FR-2026-06",
        title: "The Weighted Mirror",
        subtitle: "Field Report",
        date: "2026",
        description: "When AI reflects back a version of you that is shaped by your own inputs. The mirror is not neutral — it is weighted by what you brought.",
        tags: ["Field Research", "Mirror Effect", "Governance"],
        url: `${CDN}/gallantryai-weighted-mirror_96341f55.pdf`,
      },
    ],
  },
  {
    series: "Lexicon Series",
    color: "#7a5fa5",
    items: [
      {
        id: "LEX-INTRO",
        title: "Living Lexicon — Introduction",
        subtitle: "GallantryAI Promptolinguistics Lexicon",
        date: "2026",
        description: "The introduction to the GallantryAI Living Lexicon. What it is, why it exists, and how to use it.",
        tags: ["Lexicon", "Promptolinguistics", "Framework"],
        url: `${CDN}/gallantryai-lexicon-introduction_16fa4296.pdf`,
      },
      {
        id: "LEX-FULL",
        title: "Living Lexicon — Full Document",
        subtitle: "Complete Promptolinguistics Lexicon",
        date: "2026",
        description: "The full GallantryAI Living Lexicon. All terms, definitions, and field notes. A working document — not finished, never finished.",
        tags: ["Lexicon", "Reference", "Promptolinguistics"],
        url: `${CDN}/gallantryai-living-lexicon_630d6098.pdf`,
      },
      {
        id: "LEX-A",
        title: "Lexicon Amendment A",
        subtitle: "Additions and Revisions",
        date: "2026",
        description: "First amendment to the Living Lexicon. New terms added, existing terms revised based on field testing.",
        tags: ["Lexicon", "Amendment", "Update"],
        url: `${CDN}/gallantryai-lexicon-amendment-a_292373c1.pdf`,
      },
      {
        id: "LEX-B",
        title: "Lexicon Amendment B",
        subtitle: "Additions and Revisions",
        date: "2026",
        description: "Second amendment to the Living Lexicon.",
        tags: ["Lexicon", "Amendment", "Update"],
        url: `${CDN}/gallantryai-lexicon-amendment-b_359f566e.pdf`,
      },
    ],
  },
  {
    series: "Education & Children",
    color: "#5a8a5a",
    items: [
      {
        id: "EDU-01",
        title: "Teacher & Children's Guide",
        subtitle: "GallantryAI in the Classroom",
        date: "2026",
        description: "A guide for teachers and parents introducing the GallantryAI framework to children. Warm, honest, age-appropriate.",
        tags: ["Children", "Education", "Teachers"],
        url: `${CDN}/gallantryai-teacher-children-guide_05f23c1b.pdf`,
      },
      {
        id: "EDU-02",
        title: "Classroom Technical Architecture",
        subtitle: "GallantryAI Classroom Implementation",
        date: "2026",
        description: "The technical and pedagogical architecture for implementing GallantryAI in a classroom setting.",
        tags: ["Education", "Architecture", "Implementation"],
        url: `${CDN}/gallantry_classroom_technical_architecture_copy_3aeba83b.pdf`,
      },
    ],
  },
  {
    series: "System Documents",
    color: "#8a6a3a",
    items: [
      {
        id: "SYS-01",
        title: "Document System Cold Boot",
        subtitle: "GallantryAI Session Architecture",
        date: "2026",
        description: "How to start a GallantryAI session from scratch. The cold boot protocol — what to load, in what order, and why.",
        tags: ["System", "Protocol", "Session Architecture"],
        url: `${CDN}/gallantryai-document-system-coldboot_b687e090.pdf`,
      },
    ],
  },
];

const baseFont = "'Nunito', 'DM Sans', sans-serif";
const serifFont = "'Playfair Display', serif";

export default function FieldPapers() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0d0b08", fontFamily: baseFont }}>
      <Nav />

      {/* Header */}
      <section className="py-16 px-6 text-center" style={{ borderBottom: "1px solid #2a2018" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "#E8520A" }}>
            Field Research Archive
          </div>
          <h1
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: serifFont, color: "#f5e6d0", lineHeight: 1.2 }}
          >
            The Papers
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#8a7a6a" }}>
            Citizen field research. Kitchen table. 5am. Not peer reviewed. Honest about its edges.
            All documents are open access — read, share, scrutinise.
          </p>
          <div
            className="inline-block mt-4 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest"
            style={{ background: "#1a1208", color: "#E8520A", border: "1px solid #3a2a18" }}
          >
            Single subject · Submitted for scrutiny, not validation
          </div>
        </div>
      </section>

      {/* Papers by series */}
      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {papers.map((series) => (
            <div key={series.series}>
              {/* Series label */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: series.color }}
                />
                <div
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{ color: series.color }}
                >
                  {series.series}
                </div>
                <div className="flex-1 h-px" style={{ background: "#2a2018" }} />
              </div>

              {/* Paper cards */}
              <div className="space-y-4">
                {series.items.map((paper) => (
                  <div
                    key={paper.id}
                    className="rounded-2xl p-6 flex flex-col md:flex-row md:items-start gap-5"
                    style={{ background: "#110e08", border: "1px solid #2a2018" }}
                  >
                    {/* ID badge */}
                    <div
                      className="flex-shrink-0 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-xl self-start"
                      style={{
                        background: "#1a1208",
                        color: series.color,
                        border: `1px solid ${series.color}44`,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {paper.id}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-black text-lg mb-1 leading-snug"
                        style={{ fontFamily: serifFont, color: "#f5e6d0" }}
                      >
                        {paper.title}
                      </div>
                      <div
                        className="text-xs mb-2"
                        style={{ color: "#6a5a4a", fontStyle: "italic" }}
                      >
                        {paper.subtitle} · {paper.date}
                      </div>
                      <p
                        className="text-sm leading-relaxed mb-3"
                        style={{ color: "#9a8a7a" }}
                      >
                        {paper.description}
                      </p>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {paper.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-lg"
                            style={{ background: "#1a1208", color: "#6a5a4a", border: "1px solid #2a2018" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Download */}
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm no-underline transition-opacity hover:opacity-80 self-start"
                      style={{ background: "#E8520A", color: "#fff" }}
                    >
                      Read PDF ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className="py-10 px-6 text-center" style={{ borderTop: "1px solid #2a2018" }}>
        <div className="max-w-lg mx-auto">
          <p
            className="text-sm italic"
            style={{ color: "#5a4a3a", fontFamily: serifFont, lineHeight: 1.7 }}
          >
            All research is citizen-generated. Single subject. Honest about its limits.
            The methodology exists because the wound is the credential.
            The absence is the origin.
          </p>
          <p className="text-xs mt-3" style={{ color: "#3a2a1a" }}>
            Matt Gallantry · Dad · Garbageman · Citizen Human-AI Field Researcher · Midland, Ontario · 2026
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
