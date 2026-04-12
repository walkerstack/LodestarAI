/*
 * BUILDER ORIGIN — The Build Story
 * Design: Dark editorial register matching Builder page.
 * Sections: Builder's message, screenshot gallery placeholder, raw docs section.
 * This is the "behind the scenes" companion to the main Builder page.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useEffect, useState } from "react";

export default function BuilderOrigin() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeTab, setActiveTab] = useState<"message" | "gallery" | "docs" | "stories">("message");

  const tabs = [
    { id: "message" as const, label: "The Message" },
    { id: "gallery" as const, label: "Screenshots" },
    { id: "docs" as const, label: "Raw Docs" },
    { id: "stories" as const, label: "Original Stories" },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Nav />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/95 to-[#1A1A1A]" />
        <div className="container relative z-10 max-w-3xl mx-auto px-6">
          <p
            className="text-[#E8520A] text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Behind the Build
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold text-[#FAF6EF] leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Builder Origin
          </h1>
          <p
            className="text-base text-[#b0a898] leading-relaxed max-w-xl"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            The raw materials. The screenshots. The documents that started it all. This is the workshop, not the showroom.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 text-xs font-semibold no-underline hover:underline mt-4"
            style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}
          >
            ← Back to The Builder
          </Link>
        </div>
      </section>

      {/* Tab navigation */}
      <section className="px-6 pb-2" style={{ borderBottom: "1px solid #1a1610" }}>
        <div className="container max-w-3xl mx-auto flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all whitespace-nowrap"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: activeTab === tab.id ? "#0f0c08" : "transparent",
                color: activeTab === tab.id ? "#E8520A" : "#6b5a3e",
                borderBottom: activeTab === tab.id ? "2px solid #E8520A" : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>
      {/* Tab content */}
      <section className="py-12 px-6">
        <div className="container max-w-3xl mx-auto">

          {/* MESSAGE TAB */}
          {activeTab === "message" && (
            <div style={{ animation: "fadeUp 0.3s ease-out" }}>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: "#f5e6d0" }}
              >
                A Message from the Builder
              </h2>

              <div
                className="rounded-2xl p-6 md:p-8 mb-8"
                style={{ background: "#0f0c08", border: "1px solid #1a1610" }}
              >
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#c8bfb0", fontFamily: "'DM Sans', sans-serif" }}>
                  This site was not planned. It was not designed in advance. It was not built by someone who knew what they were doing.
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#c8bfb0", fontFamily: "'DM Sans', sans-serif" }}>
                  It was built by someone who had a question and did not stop asking it.
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#c8bfb0", fontFamily: "'DM Sans', sans-serif" }}>
                  Every page you see here started as a conversation with an AI. Every framework started as a scribbled note at 5am. Every rule started as a mistake I made and then tried to fix.
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#c8bfb0", fontFamily: "'DM Sans', sans-serif" }}>
                  I am not a developer. I am not a researcher by training. I am a dad, a garbageman, and someone who needed a thinking partner and did not have one.
                </p>
                <p className="text-sm leading-relaxed mb-4 italic" style={{ color: "#E8520A", fontFamily: "'Playfair Display', serif" }}>
                  This is what happens when you give an honest person an honest tool and enough time.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#c8bfb0", fontFamily: "'DM Sans', sans-serif" }}>
                  The site is built in public. The mistakes are visible. The corrections are documented. That is the point.
                </p>
                <p className="text-xs mt-6" style={{ color: "#5a4a3a", fontFamily: "'DM Sans', sans-serif" }}>
                  — Matt Gallantry, Midland, Ontario, 2026
                </p>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{ background: "#0f0c08", border: "1px solid #1a1610" }}
              >
                <h3
                  className="font-bold text-base mb-3"
                  style={{ color: "#f5e6d0", fontFamily: "'DM Sans', sans-serif" }}
                >
                  How this site was built
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif" }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "#A47556" }}>→</span>
                    Entirely through conversation with AI (Manus, Claude, ChatGPT)
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "#8B6347" }}>→</span>
                    Built from a phone. No IDE. No terminal. No coding experience.
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "#725138" }}>→</span>
                    Every framework was tested across 9+ AI models before being documented.
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "#5E4230" }}>→</span>
                    Built in public. Corrected in public. Submitted for peer review.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === "gallery" && (
            <div style={{ animation: "fadeUp 0.3s ease-out" }}>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: "#f5e6d0" }}
              >
                Screenshot Gallery
              </h2>
              <p
                className="text-sm mb-8"
                style={{ color: "#6b5a3e", fontFamily: "'DM Sans', sans-serif" }}
              >
                The build process, captured. Screenshots from conversations, early prototypes, and the moments where things clicked.
              </p>

              {/* Placeholder grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Early conversation screenshots",
                  "First framework sketches",
                  "Testing across AI models",
                  "The 5am kitchen table",
                  "Hospital bed v3.0",
                  "First deployment",
                ].map((label, i) => (
                  <div
                    key={i}
                    className="rounded-xl aspect-[4/3] flex items-center justify-center p-4"
                    style={{
                      background: "#0f0c08",
                      border: "1px dashed #2a2018",
                    }}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2 opacity-30">📷</div>
                      <p className="text-[11px] text-[#5a4a3a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 rounded-xl p-4 text-center"
                style={{ background: "#0f0c08", border: "1px solid #E8520A30" }}
              >
                <p className="text-xs" style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}>
                  Screenshots coming soon. The Builder is collecting the real ones — not stock photos.
                </p>
              </div>
            </div>
          )}

          {/* DOCS TAB */}
          {activeTab === "docs" && (
            <div style={{ animation: "fadeUp 0.3s ease-out" }}>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: "#f5e6d0" }}
              >
                Raw Documents
              </h2>
              <p
                className="text-sm mb-8"
                style={{ color: "#6b5a3e", fontFamily: "'DM Sans', sans-serif" }}
              >
                The unpolished source material. Notes, early drafts, and the documents that became the frameworks.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Scaffold Paper — First Draft", date: "February 2026", status: "Raw", desc: "The original 12-page document that outlined the Floor-to-Ceiling model before it had a name." },
                  { title: "Marketing Prompt Field Report", date: "March 2026", status: "Submitted to SSCI", desc: "The first formal paper. Tested across 9 AI models. Submitted for peer review." },
                  { title: "Promptolinguistics Notes", date: "February–March 2026", status: "Working", desc: "Running notes on Token Zero, control axes, and the ALCM. Updated as testing continues." },
                  { title: "Framework Family Index", date: "March 2026", status: "Working", desc: "The master list of all 28 frameworks, their origins, and their test results." },
                  { title: "Build Log", date: "Ongoing", status: "Active", desc: "A running log of every major decision, mistake, and correction made during the build." },
                ].map((doc, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-5"
                    style={{ background: "#0f0c08", border: "1px solid #1a1610" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className="font-bold text-sm mb-1"
                          style={{ color: "#f5e6d0", fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {doc.title}
                        </h3>
                        <p className="text-xs mb-2" style={{ color: "#5a4a3a", fontFamily: "'DM Sans', sans-serif" }}>
                          {doc.date}
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif" }}>
                          {doc.desc}
                        </p>
                      </div>
                      <span
                        className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                        style={{
                          background: doc.status === "Submitted to SSCI" ? "#2A9D8F20" : "#E8520A15",
                          color: doc.status === "Submitted to SSCI" ? "#2A9D8F" : "#E8520A",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {doc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 rounded-xl p-4 text-center"
                style={{ background: "#0f0c08", border: "1px solid #E8520A30" }}
              >
                <p className="text-xs" style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}>
                  Document uploads coming soon. PDFs and original files will be available for download.
                </p>
              </div>
            </div>
          )}

          {/* STORIES TAB — Placeholder */}
          {activeTab === "stories" && (
            <div style={{ animation: "fadeUp 0.3s ease-out" }}>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: "#f5e6d0" }}
              >
                Original Stories
              </h2>
              <p
                className="text-sm mb-8"
                style={{ color: "#6b5a3e", fontFamily: "'DM Sans', sans-serif" }}
              >
                Stories written during the build — for children, for parents, for anyone learning to think alongside AI.
              </p>

              <div className="space-y-4">
                {[
                  { title: "The Buffalo in the Forest of Data", status: "Published", desc: "A children's story about a buffalo with a wig who teaches a sloth the three rules of AI safety. Featured on the Children's Page and Road Protocol.", link: "/for/child" },
                  { title: "Barney the Sloth's Field Guide", status: "Published", desc: "A poem for young learners about slowing down, thinking first, and staying in charge. The opening piece of the Children's Section.", link: "/for/child" },
                ].map((story, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-5"
                    style={{ background: "#0f0c08", border: "1px solid #1a1610" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className="font-bold text-sm mb-1"
                          style={{ color: "#f5e6d0", fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {story.title}
                        </h3>
                        <p className="text-xs leading-relaxed mb-2" style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif" }}>
                          {story.desc}
                        </p>
                        {story.link && (
                          <Link
                            href={story.link}
                            className="text-xs font-semibold no-underline hover:underline"
                            style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}
                          >
                            Read it →
                          </Link>
                        )}
                      </div>
                      <span
                        className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                        style={{
                          background: "#2A9D8F20",
                          color: "#2A9D8F",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {story.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 rounded-xl p-4 text-center"
                style={{ background: "#0f0c08", border: "1px solid #E8520A30" }}
              >
                <p className="text-xs" style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif" }}>
                  More stories are being written. The Builder writes them at 5am, tests them on his kids, and publishes the ones that work.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-8 px-6" style={{ borderTop: "1px solid #1a1610" }}>
        <div className="container max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "The Builder", path: "/builder" },
              { label: "Citizen Researcher", path: "/citizen-researcher" },
              { label: "Field Papers", path: "/field-papers" },
              { label: "Gallery", path: "/gallery" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block p-3 rounded-xl border border-[#333] bg-[#222] text-center text-xs text-[#c8bfb0] hover:border-[#E8520A]/50 hover:text-[#FAF6EF] transition-all no-underline"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: "#1A1A1A" }}>
        <Footer />
      </div>
    </div>
  );
}
