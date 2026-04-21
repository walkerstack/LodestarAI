/*
 * ============================================================
 * GALLANTRYAI — What Are Patterns? (Kids Version)
 * DB-driven shell — all content from content_blocks for pageSlug "for-child-patterns".
 *
 * PAGE STANDARD:
 * 1. KidsMidLink — mid-page right edge            [DONE]
 * 2. LearningFlow — bottom of page                [DONE]
 * 3. Interactive element contrast                  [DONE — pattern cards are tappable]
 *
 * NON-EDITABLE FROM STUDIO:
 * - Pattern card expand/collapse interaction (JavaScript behaviour)
 * - LearningFlow links — edit via Studio Learning Matrix tab
 * - KidsMidLink position (locked)
 * ============================================================
 */

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import KidsMidLink from "@/components/KidsMidLink";
import StudioBlocks from "@/components/studio/StudioBlocks";

const PAGE_SLUG = "for-child-patterns";

export default function ChildPatterns() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFFDF8" }}>
      <Nav />
      <KidsMidLink />

      {/* All page content comes from the database */}
      <StudioBlocks pageSlug={PAGE_SLUG} />

      {/* Learning Flow — edit via Studio Learning Matrix tab */}
      <section className="py-10 px-6" style={{ background: "#FFF8EE" }}>
        <div className="max-w-4xl mx-auto">
          <LearningFlow
            current="What Are Patterns? (Kids)"
            deeper={flowMap["for-child-patterns"]?.deeper ?? []}
            wider={flowMap["for-child-patterns"]?.wider ?? []}
            simpler={flowMap["for-child-patterns"]?.simpler ?? []}
          />
        </div>
      </section>

      <div style={{ background: "#FFFDF8" }}>
        <Footer />
      </div>
    </div>
  );
}
