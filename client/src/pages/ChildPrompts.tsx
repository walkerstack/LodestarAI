/*
 * ============================================================
 * GALLANTRYAI — Kids First Prompts
 * DB-driven shell — all content from content_blocks for pageSlug "for-child-prompts".
 *
 * PAGE STANDARD:
 * 1. KidsRedirect — top of page                   [DONE]
 * 2. KidsMidLink — mid-page right edge            [DONE]
 * 3. LearningFlow — bottom of page                [DONE]
 * 4. Interactive element contrast                  [DONE — prompt cards are tappable]
 *
 * NON-EDITABLE FROM STUDIO:
 * - Prompt card expand/collapse interaction (JavaScript behaviour)
 * - LearningFlow links — edit via Studio Learning Matrix tab
 * - KidsMidLink position (locked)
 * - KidsRedirect position (locked)
 * ============================================================
 */

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KidsRedirect from "@/components/KidsRedirect";
import KidsMidLink from "@/components/KidsMidLink";
import LearningFlow from "@/components/LearningFlow";
import { flowMap } from "@/lib/learningFlowMap";
import StudioBlocks from "@/components/studio/StudioBlocks";

const PAGE_SLUG = "for-child-prompts";

export default function ChildPrompts() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFFDF8" }}>
      <Nav />
      <KidsRedirect
        story="This page is all about your first prompts — the first things you can type to an AI. It starts with the easiest thing (asking a question) and goes all the way to giving the AI rules before it even starts talking. The sloth will guide you."
        quote="Your first prompt is already inside you. It's the thing you've always wanted to know."
        attribution="First Prompts"
      />

      <main className="flex-1">
        {/* All page content comes from the database */}
        <StudioBlocks pageSlug={PAGE_SLUG} />

        {/* Learning Flow — edit via Studio Learning Matrix tab */}
        <LearningFlow
          current="Kids First Prompts"
          deeper={flowMap["for-child-prompts"]?.deeper ?? []}
          wider={flowMap["for-child-prompts"]?.wider ?? []}
          simpler={flowMap["for-child-prompts"]?.simpler ?? []}
        />
      </main>

      <KidsMidLink />
      <Footer />
    </div>
  );
}
