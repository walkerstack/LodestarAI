/*
 * GALLANTRYAI — Flower Presets
 * DB-driven shell — content from content_blocks for pageSlug "flower-presets".
 * WARM THEME PAGE (#FAF6EF).
 *
 * PAGE STANDARD:
 * 1. KidsRedirect — top of page                      [DONE]
 * 2. KidsMidLink — bottom before footer               [DONE]
 * 3. LearningFlow — bottom of page                    [DONE]
 *
 * NON-EDITABLE FROM STUDIO (interaction logic):
 * - Flower picker expand/collapse, copy-to-clipboard
 * - LearningFlow links — edit via Studio Learning Matrix tab
 * - KidsMidLink / KidsRedirect position (locked)
 *
 * EDITABLE FROM STUDIO:
 * - All text headings and body content
 * - All flower data (names, conditions, behaviors, Token Zeros, colours)
 * - All infographic images
 * - Cross-link cards
 * - How-to-use steps
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import KidsRedirect from "@/components/KidsRedirect";
import { kidsBlurbs } from "@/lib/kidsBlurbs";
import KidsMidLink from "@/components/KidsMidLink";
import StudioBlocks from "@/components/studio/StudioBlocks";
import { useEffect } from "react";

const PAGE_SLUG = "flower-presets";

export default function FlowerPresets() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const flow = flowMap["flower-presets"] ?? flowMap.flowerPresets;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF6EF", fontFamily: "'DM Sans', sans-serif" }}>
      <Nav />
      <KidsRedirect
        story={kidsBlurbs["/flower-presets"]?.story ?? ""}
        quote={kidsBlurbs["/flower-presets"]?.quote ?? ""}
        attribution={kidsBlurbs["/flower-presets"]?.attribution ?? ""}
      />

      {/* DB-driven content blocks */}
      <StudioBlocks pageSlug={PAGE_SLUG} />

      <div className="flex justify-center py-4">
        <KidsMidLink />
      </div>

      {flow && (
        <LearningFlow
          current="Flower Presets"
          deeper={flow.deeper ?? []}
          wider={flow.wider ?? []}
          simpler={flow.simpler ?? []}
        />
      )}
      <Footer />
    </div>
  );
}
