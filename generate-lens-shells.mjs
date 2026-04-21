import { writeFileSync } from 'fs';

const pages = [
  // { file, pageSlug, componentName, kidsBlurbPath, flowMapKey, currentLabel, bgColor }
  { file: 'client/src/pages/lenses/TeenagerLens.tsx', pageSlug: 'teenager', componentName: 'TeenagerLens', kidsBlurbPath: '/for/teenager', flowMapKey: 'teenager', currentLabel: 'Teenager Lens', bgColor: '#080604' },
  { file: 'client/src/pages/lenses/EverydayLens.tsx', pageSlug: 'everyday', componentName: 'EverydayLens', kidsBlurbPath: '/for/everyday', flowMapKey: 'everyday', currentLabel: 'Everyday Person Lens', bgColor: '#080604' },
  { file: 'client/src/pages/lenses/GuardianTeacherLens.tsx', pageSlug: 'guardian-teacher', componentName: 'GuardianTeacherLens', kidsBlurbPath: '/for/guardian-teacher', flowMapKey: 'guardianTeacher', currentLabel: 'Guardian & Teacher Lens', bgColor: '#080604' },
  { file: 'client/src/pages/lenses/CognitiveScienceLens.tsx', pageSlug: 'cognitive-science', componentName: 'CognitiveScienceLens', kidsBlurbPath: '/for/cognitive-science', flowMapKey: 'cognitiveScience', currentLabel: 'Cognitive Science Lens', bgColor: '#080604' },
  { file: 'client/src/pages/lenses/LinguistLens.tsx', pageSlug: 'linguist', componentName: 'LinguistLens', kidsBlurbPath: '/for/linguist', flowMapKey: 'linguist', currentLabel: 'Linguist Lens', bgColor: '#080604' },
  { file: 'client/src/pages/lenses/MathematicianLens.tsx', pageSlug: 'mathematician', componentName: 'MathematicianLens', kidsBlurbPath: '/for/mathematician', flowMapKey: 'mathematician', currentLabel: 'Mathematician Lens', bgColor: '#080604' },
  { file: 'client/src/pages/lenses/PromptEngineerLens.tsx', pageSlug: 'prompt-engineer', componentName: 'PromptEngineerLens', kidsBlurbPath: '/for/prompt-engineer', flowMapKey: 'promptEngineer', currentLabel: 'Prompt Engineer Lens', bgColor: '#080604' },
  { file: 'client/src/pages/lenses/PsychologyLens.tsx', pageSlug: 'psychology', componentName: 'PsychologyLens', kidsBlurbPath: '/for/psychology', flowMapKey: 'psychology', currentLabel: 'Psychology Lens', bgColor: '#080604' },
  { file: 'client/src/pages/lenses/ResearcherLens.tsx', pageSlug: 'researcher', componentName: 'ResearcherLens', kidsBlurbPath: '/for/researcher', flowMapKey: 'researcher', currentLabel: 'Researcher Lens', bgColor: '#080604' },
  { file: 'client/src/pages/lenses/WatcherLens.tsx', pageSlug: 'watcher', componentName: 'WatcherLens', kidsBlurbPath: '/for/watcher', flowMapKey: 'watcher', currentLabel: 'Watcher Lens', bgColor: '#080604' },
  { file: 'client/src/pages/ThreeLenses.tsx', pageSlug: 'three-lenses', componentName: 'ThreeLenses', kidsBlurbPath: '/three-lenses', flowMapKey: 'threeVoices', currentLabel: 'Three Lenses', bgColor: '#080604' },
];

for (const p of pages) {
  const content = `/*
 * GALLANTRYAI — ${p.currentLabel}
 * Built by Matthew. Directed by Matthew. This is his work.
 *
 * DB-DRIVEN. All content comes from content_blocks (pageSlug = "${p.pageSlug}").
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

const PAGE_SLUG = "${p.pageSlug}";

export default function ${p.componentName}() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "${p.bgColor}" }}>
      <Nav />
      <KidsRedirect {...kidsBlurbs["${p.kidsBlurbPath}"]} />

      {/* ── ALL PAGE CONTENT — DB-driven via Studio ── */}
      <StudioBlocks pageSlug={PAGE_SLUG} />

      <KidsMidLink />

      {/* ── LEARNING FLOW — already DB-driven, edit via Studio → Learning Matrix ── */}
      <LearningFlow
        current="${p.currentLabel}"
        deeper={flowMap.${p.flowMapKey}.deeper}
        wider={flowMap.${p.flowMapKey}.wider}
        simpler={flowMap.${p.flowMapKey}.simpler}
      />

      <Footer />
    </div>
  );
}
`;
  writeFileSync(p.file, content);
  console.log(`Written: ${p.file}`);
}

console.log('All 11 lens page shells generated.');
