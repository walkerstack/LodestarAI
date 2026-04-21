/*
 * GALLANTRYAI — Child Lens Page
 * 
 * DB-DRIVEN. All content comes from content_blocks (pageSlug = "for-child").
 * Edit content in Studio — tap any block on this page when logged in as admin.
 * 
 * SHELL ONLY — this file contains:
 *   - Nav (top)
 *   - Watcher peek bar + popup (interaction logic — stays React)
 *   - StudioBlocks (renders all DB content blocks in order)
 *   - LearningFlow (bottom — already DB-driven)
 *   - Footer (bottom)
 * 
 * CANNOT BE EDITED FROM STUDIO (interaction logic):
 *   - Watcher peek button and popup behaviour
 *   - Carousel swipe/arrow interaction (data is editable, behaviour is not)
 *   - LearningFlow navigation links (edit via Studio → Learning Matrix tab)
 * 
 * EVERYTHING ELSE IS EDITABLE FROM STUDIO.
 */
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import { Link } from "wouter";
import StudioBlocks from "@/components/studio/StudioBlocks";

const PAGE_SLUG = "for-child";

export default function ChildLens() {
  const [watcherPopup, setWatcherPopup] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#FFFDF8", fontFamily: "'Nunito', 'DM Sans', sans-serif" }}
    >
      <Nav />

      {/* ── Watcher peek bar — interaction logic, stays React ── */}
      <div className="w-full flex justify-center py-4" style={{ background: "#1A1A2E" }}>
        <button
          onClick={() => setWatcherPopup(true)}
          className="transition-all hover:scale-110 focus:outline-none"
          aria-label="Peek at the Watcher"
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png"
            alt="The buffalo wearing a wig"
            className="w-16 h-16 rounded-full object-cover"
            style={{
              boxShadow: "0 0 24px 8px rgba(255,253,248,0.5), 0 0 48px 16px rgba(232,82,10,0.3)",
              border: "2px solid rgba(255,253,248,0.6)",
            }}
          />
        </button>
      </div>

      {/* Watcher popup — interaction logic, stays React */}
      {watcherPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setWatcherPopup(false)}
        >
          <div
            className="relative rounded-3xl p-6 md:p-8 max-w-sm w-full text-center"
            style={{ background: "#FFFDF8", boxShadow: "0 0 60px rgba(232,82,10,0.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setWatcherPopup(false)}
              className="absolute top-3 right-4 text-[#999] hover:text-[#333] text-lg"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="text-4xl mb-3">🔭</div>
            <h3
              className="text-lg font-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A2E" }}
            >
              Want to see something cool?
            </h3>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#555" }}>
              There's a page called{" "}
              <strong style={{ color: "#E8520A" }}>The Watcher</strong>. It's a little bit spooky
              — but in a good way.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>
              It shows how AI watches you — and how{" "}
              <strong style={{ color: "#E8520A" }}>you can watch it back</strong>. The buffalo is
              there too, with his binoculars.
            </p>
            <p
              className="text-xs italic mb-5"
              style={{ color: "#999", fontFamily: "'Playfair Display', serif" }}
            >
              "The one who watches the watcher — that's the one in charge."
            </p>
            <Link
              href="/for/watcher"
              className="inline-block px-6 py-3 rounded-full text-sm font-bold no-underline transition-all hover:scale-[1.05]"
              style={{ background: "#1A1A2E", color: "#fff" }}
            >
              Peek at the Watcher →
            </Link>
          </div>
        </div>
      )}

      {/* ── ALL PAGE CONTENT — DB-driven via Studio ── */}
      <StudioBlocks pageSlug={PAGE_SLUG} />

      {/* ── LEARNING FLOW — already DB-driven, edit via Studio → Learning Matrix ── */}
      <LearningFlow
        current="Child Lens"
        deeper={flowMap.child.deeper}
        wider={flowMap.child.wider}
        simpler={flowMap.child.simpler}
      />

      <Footer />
    </div>
  );
}
