/*
 * ============================================================
 * GALLANTRYAI — The Five Rules
 * DB-driven shell — all content from content_blocks for pageSlug "rules".
 * DARK THEME PAGE.
 *
 * PAGE STANDARD:
 * 1. KidsRedirect — top of page                   [DONE]
 * 2. KidsMidLink — bottom before footer            [DONE]
 * 3. LearningFlow — bottom of page                [DONE]
 *
 * NON-EDITABLE FROM STUDIO:
 * - Rule card expand/collapse interaction (JavaScript behaviour)
 * - LearningFlow links — edit via Studio Learning Matrix tab
 * - KidsMidLink position (locked)
 * - KidsRedirect position (locked)
 * ============================================================
 */

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import KidsMidLink from "@/components/KidsMidLink";
import StudioBlocks from "@/components/studio/StudioBlocks";

const PAGE_SLUG = "rules";

export default function FiveRules() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen" style={{ background: '#080604' }}>
      <Nav />
      <KidsRedirect
        story={kidsBlurbs["/five-rules"]?.story ?? ""}
        quote={kidsBlurbs["/five-rules"]?.quote ?? ""}
        attribution={kidsBlurbs["/five-rules"]?.attribution ?? ""}
      />

      {/* All page content comes from the database */}
      <StudioBlocks pageSlug={PAGE_SLUG} />

      <div className="flex justify-center py-4">
        <KidsMidLink />
      </div>

      <LearningFlow
        current="Five Rules"
        deeper={flowMap.rules?.deeper ?? []}
        wider={flowMap.rules?.wider ?? []}
        simpler={flowMap.rules?.simpler ?? []}
        dark
      />
      <div style={{ background: '#080604' }}>
        <Footer />
      </div>
    </div>
  );
}
