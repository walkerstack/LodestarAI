/*
 * GALLANTRYAI — Cognitive Science Lens
 * Built by Matthew. Directed by Matthew. This is his work.
 *
 * DB-DRIVEN. All content comes from content_blocks (pageSlug = "cognitive-science").
 * Edit content in Studio — tap any block on this page when logged in as admin.
 *
 * PAGE STANDARD (non-negotiable):
 * 1. KidsRedirect — top of page, always
 * 2. KidsMidLink — mid-page floating circle, always
 * 3. LearningFlow — bottom of page, always
 * 4. Nav at top, Footer at bottom
 *
 * CANNOT BE EDITED FROM STUDIO (interaction logic):
 *   - KidsRedirect position (locked)
 *   - KidsMidLink position (locked)
 *   - LearningFlow navigation (edit via Studio → Learning Matrix tab)
 *
 * EVERYTHING ELSE IS EDITABLE FROM STUDIO.
 */
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import KidsMidLink from "@/components/KidsMidLink";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import StudioBlocks from "@/components/studio/StudioBlocks";

const PAGE_SLUG = "cognitive-science";

export default function CognitiveScienceLens() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#080604" }}>
      <Nav />
      <KidsRedirect {...kidsBlurbs["/for/cognitive-science"]} />

      {/* ── ALL PAGE CONTENT — DB-driven via Studio ── */}
      <StudioBlocks pageSlug={PAGE_SLUG} />

      <KidsMidLink />

      {/* ── LEARNING FLOW — already DB-driven, edit via Studio → Learning Matrix ── */}
      <LearningFlow
        current="Cognitive Science Lens"
        deeper={flowMap.cognitiveScience.deeper}
        wider={flowMap.cognitiveScience.wider}
        simpler={flowMap.cognitiveScience.simpler}
      />

      <Footer />
    </div>
  );
}
