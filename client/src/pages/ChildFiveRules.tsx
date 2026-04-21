/*
 * ============================================================
 * GALLANTRYAI — The Five Rules (Kids Version)
 * Built by Matthew. Directed by Matthew. This is his work.
 *
 * PAGE PURPOSE:
 * The Five Rules explained for children. Sloth-guided. Warm white.
 * Each rule has a sloth image, a kid explanation, and a "try this" activity.
 * DB-driven shell — all content comes from content_blocks for pageSlug "for-child-rules".
 *
 * PAGE STANDARD:
 * 1. Hero image — CDN only, dark overlay          [DONE — in DB blocks]
 * 2. KidsRedirect — top of page                   [PENDING — add KidsRedirect component]
 * 3. KidsMidLink — mid-page right edge            [DONE]
 * 4. LearningFlow — bottom of page                [DONE]
 * 5. Teenager entry point                         [PENDING]
 * 6. Professional entry point                     [PENDING]
 * 7. Interactive element contrast                 [DONE — rule cards are tappable]
 *
 * NON-EDITABLE FROM STUDIO:
 * - Rule card expand/collapse interaction (JavaScript behaviour)
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

const PAGE_SLUG = "for-child-rules";

export default function ChildFiveRules() {
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
            current="The Five Rules (Kids)"
            deeper={flowMap["for-child-rules"]?.deeper ?? []}
            wider={flowMap["for-child-rules"]?.wider ?? []}
            simpler={flowMap["for-child-rules"]?.simpler ?? []}
          />
        </div>
      </section>

      <div style={{ background: "#FFFDF8" }}>
        <Footer />
      </div>
    </div>
  );
}
