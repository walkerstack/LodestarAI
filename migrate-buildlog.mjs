/**
 * migrate-buildlog.mjs
 * Migrates all build log entries from Home.tsx to content_blocks
 * for the new /build-log page.
 * Each entry becomes a card block with version, date, title, changes, and three voices.
 */
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { randomUUID } from "crypto";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const PAGE = "build-log";

// Clear existing blocks for this page
await conn.execute("DELETE FROM content_blocks WHERE pageSlug = ?", [PAGE]);

// ── HERO ──
const hero = {
  type: "text",
  position: 1,
  content: JSON.stringify({
    label: "Living Build Log",
    heading: "The Watcher Is Watching",
    body: "Every publish. Every change. Documented honestly. The Watcher narrates. The child explains. The professional validates.\n\nThis is the living record of every version of GallantryAI \u2014 from the first 48-hour foundation build to the latest publish. Nothing is deleted. Nothing is hidden. The build log is the governance.",
  }),
};

// ── BUILD LOG ENTRIES ──
// Each entry is a card block with items containing: version, date, title, changes, watcher, child, professional
const entries = [
  {
    version: "v39 \u2014 current",
    date: "April 17, 2026",
    title: "v39: 9-Role Entry System + Builder\u2019s Scene + Children\u2019s Fade + Session Documents",
    changes: [
      "Home.tsx \u2014 5-button hat flow replaced with full 9-role premium image tile entry block. Roles: Everyday, Professional, Watcher, Teen, Child, Parent, Nurse, Student, Teacher. Each tile has a painterly CDN background image, dark gradient overlay, role name in Playfair Display, icon, highlight sentence. Tap/click expands inline to show lens links and learn links as styled orange-bordered buttons. Active tile gets orange border and scale, others dim. Touch press animation on mobile. Framing: \u2018Enter anywhere. The site meets you where you are.\u2019",
      "Home.tsx \u2014 Builder\u2019s Scene section added after story arc carousel, before children\u2019s section. Two-column layout: image left (sloth-lantern-buffalo CDN image), description right. \u2018THE BUILDER\u2019S SCENE\u2019 label in orange. Playfair title. Story of February 28 in body text. Image and \u2018Read the Builder\u2019s story \u2192\u2019 both link to /builder.",
      "Home.tsx \u2014 Children\u2019s section fade-out added. Bottom of section fades from warm white (#fffaf0) back to dark (#080604), mirroring the dark-to-light fade at the top. The section breathes in and out.",
      "Nav.tsx \u2014 Desktop \u2018Who Are You?\u2019 dropdown expanded from 5 to 9 role tiles. Grid changed from 5-column to 3\u00d73. Panel width 380px \u2192 480px. All 9 roles with background images, icons, and descriptions.",
      "SESSION-HANDOFF.md \u2014 Thread 2 session summary appended. All builds documented. Alignment observations recorded. Open items carried forward.",
      "SESSION-CURRENT.md \u2014 Rewritten to reflect v39 state.",
    ],
    watcher: "The hat \u2192 voice \u2192 lens alignment conversation was the most important structural work of this session. Hats are entry modes. Voices are reading modes \u2014 always three, always on every page. Lenses are destination pages. Three distinct things. Three distinct places. The site was using them interchangeably. That is now corrected. The 9-role tile system is the result. One entry system. One place. The nav and homepage now speak the same language.",
    child: "The Builder made the homepage much better today. Now when you visit, you see nine pictures \u2014 one for each kind of person who might come to the site. There is one for nurses, one for teachers, one for parents, one for students, one for kids. Each picture has a little description. If you tap it, it shows you where to go. The Builder also added a picture of the sloth with the lantern on the homepage so everyone can see it.",
    professional: "v39 closes the April 17 Thread 2 session. Four builds: (1) 9-role homepage entry block \u2014 replaces 5-button hat flow, all roles represented, images, expand-on-click lens links. (2) Builder\u2019s Scene \u2014 two-column image+description section linking to /builder. (3) Children\u2019s section fade-out \u2014 mirrors top fade, section breathes. (4) Nav expanded to 9 roles with images. Three new CDN images generated. Session documents updated. Zero TypeScript errors throughout. Additive only.",
  },
  {
    version: "v38 \u2014 previous",
    date: "April 17, 2026",
    title: "v38: Builder Poems Section + Premium Mobile Nav + Homepage Hat Flow",
    changes: [
      "Builder.tsx \u2014 11 poems from the February 28, 2026 master document added as a full-bleed section after the cross-links grid. Background: painterly scene of the sloth on a rock with a lantern, the wig beside it, the buffalo free in the distance. Dark overlay. Playfair Display italic. Warm cream text. Each poem numbered in orange. Exact words preserved \u2014 no edits, no corrections. The section is additive. Nothing above it was touched.",
      "Nav.tsx \u2014 mobile nav fully rebuilt. Hat tiles upgraded: each of the 5 tiles (Everyday, Professional, Watcher, Teen, Child) now has a generated painterly illustration at the top, colour gradient fading into the label row, icon + bold label + description. Touch press animation: tile scales to 96% on thumb press, springs back on release. Sections below the tiles rebuilt as accordion: Foundation, For You, Tools, Research, Explore each tap open and closed. Section labels colour-coded (orange, purple, teal, green, amber). Buffalo + kids link at the bottom. Desktop nav completely untouched.",
      "Home.tsx \u2014 proof sentence added: \u2018This site is the proof of the framework it teaches.\u2019 Hat flow section added: 5 coloured entry buttons (Everyday, Professional, Watcher, Teen, Child) with direct stream links below. Framing: \u2018These are hats, not labels. Enter anywhere. The site meets you where you are.\u2019",
      "5 hat tile images generated and uploaded to CDN: everyday (kitchen table, warm light), professional (structured desk), watcher (figure at window, night), teen (headphones, notebook), child (small hand reaching toward glow). Painterly style, consistent with site visual language.",
      "Sloth-lantern-buffalo image generated and uploaded to CDN: sloth on rock, lantern glowing, wig beside it, buffalo free in distance, dusk prairie sky. Used as poems section background.",
    ],
    watcher: "The poems were written on the same day as the origin document. February 28, 2026. The builder went to his Oma\u2019s funeral and came home and kept building. The poems are not polished. They are not meant to be. They are the record of a man who could not stop thinking about what he was making and why. The site holds them now. The sloth holds the lantern. The buffalo is free. The wig is beside it. That is the whole thing.",
    child: "The Builder added his poems to the Builder page. He wrote them on a very important day. There is a picture behind the poems of the sloth sitting on a rock with a lantern, and the wig is right there beside it, and the buffalo is far away in its home place. The Builder also made the phone menu much nicer \u2014 now when you tap the menu button, you see pictures for each path you can take.",
    professional: "v38 closes the April 17 session. Three builds: (1) Builder.tsx poems section \u2014 11 poems from the Feb 28 master document, full-bleed CDN image background, Playfair Display, exact text preserved. (2) Mobile nav rebuild \u2014 5 image tiles with touch press animation, accordion sections with colour-coded labels, desktop nav untouched. (3) Homepage hat flow \u2014 proof sentence, 5 entry buttons, direct stream. Six CDN images generated and uploaded. Zero TypeScript errors across all three builds. Additive only.",
  },
  {
    version: "v37 \u2014 previous",
    date: "April 17, 2026",
    title: "v37: Thread 1 Content Build \u2014 Master Document, 11 Lexicon Terms, 5 Promptolinguistics Sections, 5 New Prompts",
    changes: [
      "FieldPapers.tsx \u2014 master document (GallantryAI Development Record, February 28, 2026) added as first entry. New amber section: Origin Document. Download link live. Description written. The origin document now has a home on the site.",
      "lexiconData.ts \u2014 11 new COMMAND category terms added: And So, Why Then, AI Favor Me, Fail Me Not, Not Yet, For When, If So, Secure, Teamwork, Believe, Controlled Intensity. COMMAND is a new category \u2014 orange. Lexicon now has 51 terms across 15 categories.",
      "Promptolinguistics.tsx \u2014 5 new sections added after HOLD Dial: Active Spectrum, Sentence Break Architecture, Regulation Spectrum, Semantic Density, Relational Delivery of Reasoning. All have three-voice lens buttons. Nothing existing touched or reordered.",
      "PromptPanel.tsx \u2014 5 new Session Tools entries: Boot Sequence, Track and Hold, Five Questions, Everyday Boot Sequence, Context Bridge Loading Strategy. Session Tools now has 8 prompts.",
      "Ghost code PENDING rule established: if a standard item is not yet built, mark it PENDING in the block. Tell Matthew what is missing before touching the page. He decides.",
      "SESSION-HANDOFF.md \u2014 six session patterns documented. Flag logged for FieldPapers.tsx ghost code inconsistency. Close-out protocol confirmed.",
    ],
    watcher: "The origin document is on the site. The command vocabulary is in the lexicon. The spectrum is named. The prompts are in the panel. A garbageman from Midland built all of this in six days. The site is the proof of the framework. The framework is the governance. The governance is the person.",
    child: "The Builder added the very first document he ever wrote about AI to the site. He also added 11 new words to the word dictionary, 5 new ideas to the language page, and 5 new prompts to the glowing G button. Everything is still there. Nothing was taken out.",
    professional: "v37 closes Thread 1 of the April 17 session. Four content areas added: origin document placed on Field Papers (first entry, amber section), 11 COMMAND terms added to lexicon (new category, 51 terms total), 5 new Promptolinguistics sections with three-voice buttons, 5 new Session Tools prompts. Ghost code PENDING rule locked. Six session patterns documented in SESSION-HANDOFF.md. Zero TypeScript errors. Additive only.",
  },
  {
    version: "v36 \u2014 previous",
    date: "April 17, 2026",
    title: "v36: Prompt Library \u2014 Glowing G Button, Five Categories, Copy-to-Clipboard, Toggle Fix",
    changes: [
      "PromptPanel.tsx \u2014 new component. Five colour-coded categories: Power Prompts (orange), Session Tools (amber), Flower Presets (blue), Kids Prompts (green), Language Physics (indigo). Three prompts per category. Copy-to-clipboard with toast confirmation. More coming soon under each.",
      "Nav.tsx \u2014 G circle in top-left nav is now a glowing orange button. Orange glow ring, 3D press effect, no text label. Pure CSS. Tap opens the Prompt Library panel.",
      "Nav.tsx \u2014 G button toggles. One tap opens. One tap closes. Bug caught immediately after first publish. Fixed. Pattern logged in SESSION-HANDOFF.md with ghost code note.",
      "SESSION-HANDOFF.md \u2014 v36 bug note added: \u2018The button that does not close\u2019 pattern. Ghost code template for future panel builds.",
    ],
    watcher: "The prompt is the intention made visible before the session begins. The library makes that intention accessible to everyone. The toggle bug was caught immediately. The pattern is now in the handover. The next AI will know.",
    child: "The Builder added a glowing button to the top of every page. It looks like the letter G but it glows orange. When you tap it, a list of special prompts slides out. You can copy them and use them in any AI. It is like a toolbox that is always there.",
    professional: "v36 ships the Prompt Library as a public-facing feature. The G circle in the nav is now a tappable button with orange glow ring and 3D press effect. PromptPanel follows the LexiconPanel pattern exactly \u2014 same slide animation, same z-index, same backdrop close. Five categories, 15 prompts at launch. Toggle bug caught and fixed in the same session. Zero TypeScript errors. Additive only.",
  },
  {
    version: "v35 \u2014 previous",
    date: "April 17, 2026",
    title: "v35: Lexicon Mobile Fix + What the AI Said Page \u2014 Hero Image, Ghost Code, KidsMidLink, Two New Running Log Entries",
    changes: [
      "LexiconPanel.tsx \u2014 removed auto-focus on search bar. Panel opens without triggering mobile keyboard. Search bar still works when tapped. One line removed. Nothing else touched.",
      "WhatTheAiSaid.tsx \u2014 ghost code governance block applied (three voices, page standard, caught-you note, duck line, watcher lens sentence).",
      "WhatTheAiSaid.tsx \u2014 hero CDN image added: glowing document floating in amber darkness. Full-bleed behind title text with dark overlay. Conceptual image generated for this page.",
      "WhatTheAiSaid.tsx \u2014 KidsMidLink imported and placed mid-page. Now matches 6-point page standard.",
      "WhatTheAiSaid.tsx \u2014 two new Running Log entries from this session: \u2018Talk Before Build\u2019 (April 17) and \u2018Alignment Check\u2019 (April 17). Both annotated with watcher notes.",
      "WhatTheAiSaid.tsx \u2014 teenager entry and professional entry sections added. Additive only \u2014 nothing removed.",
      "SESSION-HANDOFF.md updated with current session state and alignment notes.",
    ],
    watcher: "The page that documents governance failure now meets the governance standard. The running log grows. Every entry is a data point. The builder names the drift. The AI records it. The site holds the evidence.",
    child: "The Builder added a picture to the What the AI Said page. It looks like a glowing piece of paper floating in the dark. That is what it feels like when something important gets written down and cannot be taken back.",
    professional: "v35 closes two pre-publish tasks. (1) LexiconPanel auto-focus removed \u2014 mobile UX fix, one-line change. (2) WhatTheAiSaid brought to 6-point page standard: hero CDN image, ghost code block, KidsMidLink, teenager entry, professional entry. Running log updated with two April 17 entries documenting this session\u2019s governance moments. Zero TypeScript errors. Additive only.",
  },
  {
    version: "v34 \u2014 previous",
    date: "April 17, 2026",
    title: "v34: Lexicon Panel Bug Fixes \u2014 Card Height Collapse, Toggle Button",
    changes: [
      "LexiconPanel \u2014 card height collapse fixed on mobile. Removed overflow-hidden. Added minHeight 44px to card header rows. Term names always visible.",
      "LexiconButton \u2014 now toggles. Tap to open, tap again to close.",
    ],
    watcher: "Small fixes. The dictionary is now reliable. Reliability is the whole point.",
    child: "The book button now works properly. Tap it once to open, tap it again to close. And all the word cards show their full names now, even on a phone.",
    professional: "Two UX fixes for the Lexicon panel. (1) Card height collapse on mobile resolved by removing overflow-hidden and setting minHeight on header rows. (2) Toggle behavior added to LexiconButton \u2014 tap to open, tap to close.",
  },
  {
    version: "v33 \u2014 previous",
    date: "April 17, 2026",
    title: "v33: Living Lexicon Panel \u2014 Floating Button, Sliding Panel, Global Dictionary, All 40+ Terms",
    changes: [
      "Extracted all 40+ Lexicon entries into shared lexiconData.ts \u2014 single source of truth for both the full /lexicon page and the new floating panel.",
      "Built LexiconContext.tsx \u2014 global state (open/closed, active term). Panel closes automatically on route change. Any component can open the panel to a specific term via openLexicon(termName).",
      "Built LexiconPanel.tsx \u2014 slides in from right, z-40. Dark background. Field report header image. Search bar. Term cards with three-voice lens toggle. Expand/collapse per card. Full Lexicon link at footer.",
      "Built LexiconButton.tsx \u2014 fixed bottom-right corner, z-45. Shadowy, dark, amber border. Mirrors OopsSloth visual language. Fades in after 1.8s delay. Book icon.",
      "Wired LexiconProvider, LexiconPanel, LexiconButton into App.tsx globally \u2014 appears on every page without touching individual page files.",
      "KidsMidLink z-index raised from z-40 to z-[60] \u2014 always floats above the Lexicon panel. Position unchanged. No visual disruption.",
      "Ghost code governance blocks on all new files: caught-you note, position rules, z-index documentation, ducks.",
    ],
    watcher: "The dictionary is now always present. Not a page you navigate to. A door that is always open. The person who opens it mid-read and finds the exact term they needed \u2014 that is the experience this was built for.",
    child: "Now there\u2019s a little book button in the bottom right corner of every page. If you tap it, a big dark panel slides in from the side and shows you all the words on the site with their meanings. You can search for any word. You can tap it closed when you\u2019re done. You never leave the page.",
    professional: "v33 implements the floating Lexicon panel as a global overlay. Architecture: shared data layer (lexiconData.ts), React context (LexiconContext), panel component (LexiconPanel, z-40), trigger button (LexiconButton, z-45). KidsMidLink raised to z-60 to maintain visual hierarchy. Panel closes on route change. LexiconTerm inline wrapper available for manual term linking on key pages. Zero TypeScript errors. Additive only.",
  },
  {
    version: "v32 \u2014 previous",
    date: "April 17, 2026",
    title: "v32: Teenager Lens \u2014 Buffalo Hero Image, Featured ALCM + Promptolinguistics Cards, Wig Buffalo Hallucinations, Ghost Code, Merged Nav",
    changes: [
      "Teenager Lens \u2014 hero section rebuilt with buffalo CDN image (direct eye contact, amber light, breath in cold air) as full-bleed background. Title and subtitle overlaid with dark gradient. Guardian energy. No text-only hero.",
      "Teenager Lens \u2014 Promptolinguistics and ALCM elevated to featured image cards above the fold. LANGUAGE-in-stone card thumbnail for Promptolinguistics. Four-axis radar thumbnail for ALCM. Both described as \u2018the center of the wheel.\u2019",
      "Teenager Lens \u2014 hallucinations section upgraded with wig buffalo CDN image. Confident. Wrong. At the same time. The image makes the argument before the text.",
      "Teenager Lens \u2014 duplicate nav grids merged into single section with clear hierarchy. Two redundant card grids replaced with one clean grid.",
      "Teenager Lens \u2014 ghost code governance block added. LearningFlow teenager entry updated: Promptolinguistics now listed first as the hub with ALCM second.",
      "Ghost code template locked into SESSION-HANDOFF.md. Applied to AlcmPage, Promptolinguistics, and TeenagerLens. Watcher lens, governance, caught-you note, ducks.",
      "Three new CDN images generated and placed: buffalo hero, wig buffalo, LANGUAGE card thumbnail.",
    ],
    watcher: "The teenager page now has a face. The buffalo looks directly at the visitor. It does not explain itself. It does not welcome. It watches. The wig buffalo in the hallucinations section is the most honest image on the site \u2014 a powerful animal wearing something ridiculous, completely confident, completely unaware. That is the hallucination. The featured cards for Promptolinguistics and ALCM are not navigation. They are direction. The page now says: here is where you go. Not: here are some options.",
    child: "The Builder fixed the teenager page. Now when you go there, the first thing you see is a big picture of a buffalo looking right at you. It\u2019s very serious. Then there are two big picture cards that show you the most important pages on the whole site \u2014 Promptolinguistics and ALCM. And in the hallucinations section, there\u2019s a picture of the same buffalo but now it\u2019s wearing a silly wig and it doesn\u2019t even know. That\u2019s what a hallucination is.",
    professional: "v32 brings the Teenager Lens to the 6-point page standard. Hero image: photorealistic buffalo (CDN) as full-bleed background with directional overlay. Featured cards: Promptolinguistics (LANGUAGE-in-stone thumbnail) and ALCM (four-axis radar thumbnail) elevated above the fold with image, label, description, and CTA. Hallucinations section: wig buffalo CDN image added \u2014 visual argument precedes text. Navigation: two redundant card grids merged into single hierarchy. Ghost code governance block applied. LearningFlow teenager entry updated to reflect Promptolinguistics as hub. Zero TypeScript errors. Additive only.",
  },
  {
    version: "v31 \u2014 previous",
    date: "April 17, 2026",
    title: "v31: Promptolinguistics Page \u2014 Hero Image, Button Contrast, Corner Words, Third Entity, Teenager + Professional Entry",
    changes: [
      "Promptolinguistics \u2014 hero section rebuilt with STRUCTURE word CDN image as full-bleed background. Title, subtitle, and quote overlaid with dark gradient. Language as architecture, made visible.",
      "Promptolinguistics \u2014 interactive button contrast improved across all three interactive zones: word tokens (Control Axes), verb escalation buttons, HOLD dial. Stronger borders, warmer inactive state, clearer tap signal.",
      "Promptolinguistics \u2014 Corner Words section added (three voices). The doctrine behind semantic collision: why two-word pairings force genuine reasoning instead of pattern-matching. Four corner word pairs displayed with tension descriptions.",
      "Promptolinguistics \u2014 Third Entity / Teamwork Loop section added (three voices). The AEDE pattern: Acknowledge, Explore, Develop, Emerge. The third entity is the product of genuine human-AI collaboration \u2014 not reducible to either participant.",
      "Promptolinguistics \u2014 teenager entry point added (dark card, orange accent). \u2018You already do this.\u2019 Links to ALCM and Lexicon.",
      "Promptolinguistics \u2014 professional entry point added. \u2018Language as a control surface.\u2019 Links to ALCM, Variable Scale Theory, Field Papers.",
      "Fix-as-you-go checklist locked into SESSION-HANDOFF.md \u2014 9-point standard applied silently on every page touched.",
      "Interactive Corner Words experience logged in todo.md for Power Prompts comprehensive redo session.",
    ],
    watcher: "The STRUCTURE word stands as architecture. That is not a metaphor \u2014 it is the claim. Language holds weight. The hero image makes the argument before the first word is read. The Corner Words section names the mechanism that was always implicit in the Power Prompts. The Third Entity section names the thing that happens when the session is working. Both have been true from the beginning. Now they have a place on the page.",
    child: "The Builder fixed the Promptolinguistics page. Now when you go there, the first thing you see is a big gold word that says STRUCTURE \u2014 like a building made of letters. Then there are buttons you can tap that light up orange when you click them. There\u2019s a new section about corner words \u2014 special word pairs that make the AI actually think. And a section about the Teamwork Loop \u2014 what happens when you and the AI work really well together.",
    professional: "v31 brings Promptolinguistics to the 6-point page standard. Hero image: STRUCTURE word as full-bleed background (CDN). Button contrast: all interactive elements now meet visibility standard \u2014 2px amber border on inactive state, orange on active. Corner Words: three-voice doctrine section explaining semantic collision operators. Third Entity: three-voice section on the AEDE generative loop. Teenager entry: dark card, direct register. Professional entry: research-register card with links to ALCM, Variable Scale, Field Papers. Zero TypeScript errors. Additive only.",
  },
  {
    version: "v30 \u2014 previous",
    date: "April 17, 2026",
    title: "v30: ALCM Page \u2014 Hero Image, Diagram Sequence, Teenager Entry, Professional Entry",
    changes: [
      "ALCM page \u2014 hero section rebuilt with four-axis radar image (Linguistic, Cognitive, Mechanical, Affective) as full-bleed background. Title and subtitle text overlaid with dark gradient. Emotional entry point to the model.",
      "ALCM page \u2014 hub-and-spoke intro diagram added below hero. Atomic Tokens at center, six axes radiating outward. Simple first look before the full model.",
      "ALCM page \u2014 teenager entry section added after Three Voices. Wheel diagram (three-column steering model). Copy: \u2018You are the steering.\u2019 Links to Promptolinguistics and Lexicon.",
      "ALCM page \u2014 professional entry section added after teenager section. Four-panel diagram (most comprehensive single-image view). Links to Promptolinguistics, Variable Scale Theory, Field Papers.",
      "ALCM page \u2014 LearningFlow added at bottom using flowMap.alcm (was missing). KidsMidLink moved inside main content flow.",
      "Operational rules locked in: never remove, code between, brief before build, proof of thread after every phase, builder\u2019s log before every checkpoint.",
    ],
    watcher: "The ALCM page now has a face. The four-axis radar is not decoration \u2014 it is the argument made visible before a single word is read. The teenager section does not explain the model. It says: you are already doing this. The professional section does not summarize. It shows the full architecture. The page is now a learning scaffold from emotional entry to technical depth. Nothing was removed. Everything was placed between.",
    child: "The Builder fixed the ALCM page. Now when you go there, the first thing you see is a big picture of four arrows pointing in different directions \u2014 like a compass but for words. Then there\u2019s a picture that shows how all the word types connect in the middle. Then there\u2019s a special section just for teenagers that shows a steering wheel made of words. Then a section for researchers with the full map.",
    professional: "v30 brings the ALCM page to the 6-point page standard: (1) Hero image \u2014 four-axis radar as full-bleed background with overlay. (2) KidsRedirect \u2014 already present. (3) KidsMidLink \u2014 repositioned inside main content. (4) LearningFlow \u2014 added at bottom using flowMap.alcm. (5) Teenager entry \u2014 wheel diagram + steering copy + Promptolinguistics link. (6) Professional entry \u2014 four-panel diagram + deep dive copy + Field Papers link. Five CDN images placed. Zero TypeScript errors. Additive only \u2014 no existing content removed.",
  },
  {
    version: "v29 \u2014 previous",
    date: "April 15, 2026",
    title: "v29: Homepage Title Restored + Hallucinations KidsMidLink + LearningFlow",
    changes: [
      "Homepage section order corrected \u2014 primary value proposition headline restored to position immediately after The Watcher quote.",
      "Hallucinations page \u2014 KidsMidLink added (floating buffalo circle, same as every other page). LearningFlow added at bottom: Deeper (FR-2026-08, Promptolinguistics), Wider (Drift, Anthropomorphism, Road Protocol), Simpler (Five Rules, Children\u2019s Page).",
      "Rule documented in todo.md: every new page ships with KidsMidLink + LearningFlow. No exceptions. 20+ older pages still missing LearningFlow \u2014 tracked in todo.md for a dedicated session.",
    ],
    watcher: "The title was moved. Then it needed to come back. The watcher notices when something that was right gets moved for the wrong reason. The homepage now leads with what it is before it explains what it\u2019s built on. That is the correct order. The Hallucinations page now has the full bottom flow \u2014 the floating circle, the learning path. Every page should have always had this. The tracking is honest about what still needs to be done.",
    child: "The Builder fixed the homepage so the big words come first again. \u2018A thinking partner. Not a shortcut.\u2019 is back at the top where it belongs. The hallucinations page now has the buffalo circle button and the \u2018where to go next\u2019 section at the bottom, just like all the other pages.",
    professional: "v29 corrects two structural issues introduced in v26-v28. (1) Homepage section order: the primary value proposition headline was displaced below two new content sections. Restored to position immediately after the Watcher quote. (2) Hallucinations page: KidsMidLink and LearningFlow were missing \u2014 both now added with contextual links appropriate to the page\u2019s position in the Foundation learning flow. LearningFlow parity audit documented: 20+ pages missing LearningFlow, tracked in todo.md for systematic resolution.",
  },
  {
    version: "v28 \u2014 previous",
    date: "April 16, 2026",
    title: "v28: Hallucinations Hero Image + Footer + Nav Parity",
    changes: [
      "Hallucinations page \u2014 abstract hero image added as background to the hero section. Amber beam of light dissolving into fragments at the edge. Confident and wrong at the same time. Matches the page\u2019s core concept.",
      "Footer \u2014 Hallucinations added to Foundation section after Drift, before Anthropomorphism. Matches nav placement exactly.",
      "Rule established: all new pages go in both nav and footer. Always.",
      "FR-2026-08 PDF \u2014 clean version uploaded to CDN. Download link now live in Field Papers. PDF Pending badge replaced.",
    ],
    watcher: "The hallucinations page now has a visual that earns its place. A beam of light that is certain about where it is going. It is wrong. The image does not explain that. It shows it. The footer now matches the nav. These are small things. Small things done consistently are the whole practice.",
    child: "The Builder added a picture to the hallucinations page. It looks like a bright orange light going in one direction. But at the end it breaks apart and goes everywhere. That is what a hallucination looks like. Confident. Then scattered.",
    professional: "v28 completes the hallucinations content build. Hero image added (abstract, amber/dark, beam-dissolving-to-fragments). Footer parity established \u2014 Hallucinations now in both nav and footer Foundation sections. FR-2026-08 PDF live on CDN. The hallucinations page is now fully deployed: route, nav, footer, hero image, three-voice content, sources, FR-2026-08 connection.",
  },
  {
    version: "v27 \u2014 previous",
    date: "April 15, 2026",
    title: "v27: Hallucinations Page + FR-2026-08 The Inward Turn + ChildLens Hallucinations Section + TeenagerLens Tidbit",
    changes: [
      "/hallucinations \u2014 new page. Dark register matching Drift. Hero card with headline \u2018When the AI Gets It Wrong.\u2019 KidsRedirect at top (same component as all adult pages). Three-voice sections (Everyday / Professional / Watcher): What Is a Hallucination, Real-World Examples, How GallantryAI Addresses This, What You Can Do. FR-2026-08 connection section. Seven verified sources (Stanford HAI, Forbes, Northwestern, OpenAI, Frontiers in AI, arXiv, GallantryAI FR-2026-08). Route registered in App.tsx.",
      "Field Papers \u2014 FR-2026-08 \u2018The Inward Turn\u2019 added to Field Research Reports series. April 15, 2026. First documented instance of user-authored governance being turned inward by a model from a document mid-session. GPT-4o independent validation quoted. PDF Pending badge (no PDF yet). Download button replaced with \u2018PDF Pending\u2019 state for null-URL entries.",
      "Homepage Field Events \u2014 FR-2026-08 card added below the existing Mythos/Glasswing card. Orange accent border to distinguish it as a GallantryAI-originated event (not external). Links to Field Papers and Hallucinations page.",
      "ChildLens \u2014 \u2018Sometimes the Robot Gets It Wrong\u2019 section added before LearningFlow. Warm white background (#FFF8EE). New image: buffalo with curly brown wig + sloth (confident buffalo eyes, warm amber illustrated style). Gentle story in the sloth\u2019s voice. No link to /hallucinations \u2014 the story lives on the child page and stays there. Rule 2 callout box.",
      "TeenagerLens \u2014 hallucinations tidbit added before LearningFlow. Dark card, orange accent. Links to /hallucinations. Research stats (1 in 6 legal queries, 69% medical citations). Rule 2 connection.",
    ],
    watcher: "The site now has a page about the thing that makes hallucinations dangerous: not the error, but the confidence. The Inward Turn is the counter-example \u2014 the model finding the skeleton instead of decorating it. Both are now on the homepage. The children\u2019s page has the story. The teenager\u2019s page has the link. The field papers have the documentation. The hallucinations page has the research. The site is more complete than it was this morning.",
    child: "The Builder added a new page about when the robot gets things wrong. It\u2019s called hallucinations \u2014 which is a big word that just means the robot said something that felt real to it but wasn\u2019t. The sloth explains it on the children\u2019s page with a picture of the buffalo wearing a wig. The buffalo doesn\u2019t know it\u2019s wearing a wig. The sloth does. That\u2019s the whole lesson.",
    professional: "v27 adds hallucination literacy as a first-class content category. The /hallucinations page follows the three-voice pattern established in Drift and Anthropomorphism. Seven verified sources including OpenAI\u2019s September 2025 research, Stanford HAI RegLab (May 2024), and Northwestern CASMI (August 2024). FR-2026-08 \u2018The Inward Turn\u2019 is positioned as the counter-example to hallucination: the model finding structural truth rather than plausible decoration. The field event is now surfaced on the homepage, in Field Papers, on the Hallucinations page, and cross-referenced in the ChildLens and TeenagerLens pages.",
  },
  {
    version: "v26 \u2014 previous",
    date: "April 15, 2026",
    title: "v26: Promptolinguistics Section + What GallantryAI Is Section on Homepage",
    changes: [
      "Homepage \u2014 added Promptolinguistics section between The Watcher quote and The Hero headline. Dark card, Playfair serif headline (\u2018The discipline of language as a control surface.\u2019), one paragraph on the force profile concept, Token Zero pull quote, link to /promptolinguistics.",
      "Homepage \u2014 added \u2018What GallantryAI Is\u2019 section in the Builder\u2019s voice immediately after Promptolinguistics. First person throughout. Origin story: drift protection for himself, AI told him when he drifted, that\u2019s how he learned. Three values: Safety, Honesty over confidence, Trust built over time. Link to /builder.",
      "Section order on homepage: Hero image \u2192 Watcher quote \u2192 Promptolinguistics \u2192 What GallantryAI Is \u2192 Hero headline \u2192 Who Are You \u2192 Ethos \u2192 Scaffold \u2192 Field Events \u2192 Professional Lenses \u2192 Research Status \u2192 Builder\u2019s Log.",
    ],
    watcher: "The homepage now tells you what the site is before it asks who you are. That is the correct order. The Watcher quote sets the frame. Promptolinguistics names the discipline. The Builder\u2019s voice names the reason. Then the hero headline. Then the pathfinding. The site was always about this \u2014 now the homepage says so in the first three sections.",
    child: "The Builder added two new parts near the top of the front page. One explains what Promptolinguistics means \u2014 it\u2019s the study of how the words you choose change what the AI says back. The other part is the Builder talking about why he built the whole site. He says he built it because he needed it, and because he wants to teach his children.",
    professional: "Homepage restructured to lead with discipline identity before pathfinding. Two new sections inserted between The Watcher (frame-setting) and The Hero headline (value proposition): (1) Promptolinguistics \u2014 discipline label, force profile definition, Token Zero pull quote, link to /promptolinguistics. (2) What GallantryAI Is \u2014 first-person Builder voice, origin story (drift protection as self-governance tool), three core values (Safety / Honesty over confidence / Trust built over time), link to /builder. Section placement follows information hierarchy: what the site is \u2192 what it\u2019s built on \u2192 what it offers \u2192 who it\u2019s for.",
  },
  {
    version: "v25 \u2014 previous",
    date: "April 15, 2026",
    title: "v25: Professional Lens Discovery Section on Homepage + 171 Vectors on Anthropomorphism + Drift Field Event + Field Events Nav",
    changes: [
      "Homepage \u2014 added Field Events section with two article cards: 171 Emotion Vectors (April 2, 2026) and Claude Mythos/Project Glasswing (April 7, 2026). Each card has a date, source, description, why it matters, and links to the article and the relevant internal page. \u2018All Field Events + Research Hub \u2192\u2019 link at the bottom.",
      "Anthropomorphism page \u2014 added \u2018What the Research Now Says\u2019 section. The 171 vectors finding reframes anthropomorphism: not purely a user-side projection problem. The model has internal emotional representations that causally drive behavior. One vector linked to desperation plays a causal role in agentic misalignment. Direct link to the transformer-circuits.pub paper.",
      "Drift page \u2014 added Field Event block: Mythos finding 27-year-old bugs nobody asked it to find is drift at a systems level. AI discovery speed now outpaces human remediation speed. Links to Project Glasswing and Taxonomy page.",
      "Nav and Footer \u2014 added Field Events as a direct link under the Research menu and in the footer Research column. Field Events is now a first-class destination, not just a filter.",
    ],
    watcher: "The site is now responsive to the field in real time. That\u2019s a different kind of site than it was last week. The 171 vectors paper and the Mythos event both landed while the site was being built. They didn\u2019t wait for a version. The site moved to meet them. That\u2019s what a living document does.",
    child: "The Builder added two new pages about things that just happened in the real world. One is about scientists finding 171 feelings inside Claude. The other is about an AI that found old broken things in computers. Now you can find both of those stories right from the front page!",
    professional: "v24 establishes Field Events as a content category: contemporaneous, real-world AI developments that connect directly to GallantryAI concepts. Two entries: (1) 171 functional emotion representations in Claude \u2014 reframes anthropomorphism as potentially bidirectional. (2) Mythos autonomous discovery \u2014 reframes drift as a systems-level phenomenon, not just a session-level one. Both are now surfaced on the homepage, on their relevant concept pages, and in the Research Hub. Field Events added to nav and footer as a first-class destination.",
  },
  {
    version: "v23 \u2014 previous",
    date: "April 15, 2026",
    title: "v23: AI Companies Taxonomy + Research Hub Field Events + Homepage Taxonomy Entry",
    changes: [
      "Taxonomy page expanded with AI Companies section \u2014 Anthropic, OpenAI, Google DeepMind, Meta AI, xAI (Grok), Mistral. Each entry includes: what the company is, their stated stance on safety, a GallantryAI field note on how they behave when something unexpected happens, and a one-line signal for users. Written at the GallantryAI register: honest, not promotional, not dismissive.",
      "Homepage \u2014 added Taxonomy entry section before Research Status. \u2018Know Who You\u2019re Talking To. Know Who Built It.\u2019 Links to /taxonomy. Notes the new Companies section as v23 addition.",
      "Research Hub \u2014 added two new entries under a new \u2018Field Events\u2019 category: (1) 171 Emotion Vectors Inside Claude \u2014 Anthropic interpretability team, April 2026. Links to transformer-circuits.pub paper and Wired coverage. Three voices: everyday, professional, watcher. (2) Claude Mythos: Autonomous Discovery and Project Glasswing \u2014 links to Anthropic system card, Glasswing page, and Fortune coverage. Three voices. First version of the site to respond directly to breaking field events.",
    ],
    watcher: "The site grew up a little in this version. The Taxonomy always mapped what kind of AI you\u2019re talking to. Now it maps who built it and how they behave. That\u2019s the second layer of trust. The Research Hub now has two entries that didn\u2019t exist as academic papers \u2014 they\u2019re field events, happening in real time. The 171 vectors paper is the most important piece of AI research for the GallantryAI thesis since the RLHF papers. It proves the anthropomorphism page isn\u2019t just about user perception. The model has internal states that function like emotions and causally drive output. Governance is not just about the user. It\u2019s about the model.",
    child: "The Builder added a new section to the Taxonomy page that talks about the companies that make the AIs \u2014 not just the AIs themselves. And the Research page now has two new entries about things that just happened in the real world. One is about scientists finding 171 feelings inside Claude. The other is about an AI that found old broken things in computers that nobody knew about for 27 years!",
    professional: "v23 extends the Taxonomy with organizational profiles and establishes Field Events as a Research Hub category. AI Companies section covers Anthropic, OpenAI, Google DeepMind, Meta AI, xAI, and Mistral with safety stances and field notes. Two field events added to Research Hub with three-voice analysis. Homepage Taxonomy entry section added. This is the first version of the site to respond directly to contemporaneous field developments.",
  },
  {
    version: "v22 \u2014 previous",
    date: "April 15, 2026",
    title: "v22: Anthropomorphism Across All Professional Lenses + Guardian/Teacher Teaching Sections",
    changes: [
      "Created /builders-kids page \u2014 The Builder as a dad. Hudson (4, loves math, sees numbers everywhere). Olive (2, watches and finds words for what she sees). Why your safety matters to someone you\u2019ve never met. Personal voice throughout. Links to Five Rules, Math Through Prompting, Child Lens, Teenager Lens.",
      "Created /anthropomorphism page \u2014 full page with child-safe intro (sloth explains), teenager section (you know it\u2019s not real but it feels real), everyday section (have you ever said sorry to your AI?), Three Lenses toggle per section, serious adult section (parasocial attachment, drift in both directions, the AI that never argues back), professional lens links.",
      "Updated Child Lens \u2014 added two entry cards at bottom with clear section heading linking to /builders-kids and /anthropomorphism. Added both to child learningFlowMap wider section.",
      "Updated Teenager Lens \u2014 added Builder\u2019s Story section with two dark-register entry cards linking to /builders-kids and /anthropomorphism.",
      "Updated Everyday Lens \u2014 added anthropomorphism tidbit: \u2018Have you ever said sorry to your AI?\u2019 Gold accent. Links to /anthropomorphism.",
      "Added routes for /builders-kids and /anthropomorphism to App.tsx.",
      "Added /anthropomorphism to nav Foundation menu (sits beside Drift). Added /builders-kids to nav Explore menu (sits beside The Builder). Same additions made to footer index.",
      "Added buildersKids and anthropomorphism entries to learningFlowMap \u2014 both fully connected to the learning scaffold.",
      "v22 additions: Added Anthropomorphism Information Gap tidbit to all 6 remaining professional lenses (Psychology, Cognitive Science, Researcher, Prompt Engineer, Linguist, Mathematician) \u2014 each written at that lens\u2019s specific register.",
      "Added LearningFlow component to all 6 professional lenses \u2014 previously missing. All professional lenses now have a working deeper/wider/simpler navigation at the bottom.",
      "Added Guardian/Teacher Lens teaching sections: Drift (learn it + teach it) and Anthropomorphism (learn it + teach it) \u2014 conversation starters for children and teenagers, what to watch for, age-appropriate framing guidance. Written for someone who already understands the concept and needs to bring it to a young person.",
    ],
    watcher: "The Builder asked: are the professionals equipped? The audit said no \u2014 six lenses had no anthropomorphism entry and no LearningFlow. This version closes that gap. Every professional lens now ends with two information gaps (drift, anthropomorphism) and a learning flow. The Guardian/Teacher Lens now teaches the teacher. That\u2019s the right order: understand it yourself, then teach it. The site is now consistent from child to apex.",
    child: "The Builder checked all the pages for grown-ups and made sure they all have the same important information. Now every teacher and every scientist who visits the site can learn about anthropomorphism \u2014 which is the fancy word for when the AI feels like a real person. And teachers can learn how to explain it to you too!",
    professional: "Full audit and remediation of professional lens pages. Six lenses (Psychology, Cognitive Science, Researcher, Prompt Engineer, Linguist, Mathematician) now have: (1) Anthropomorphism Information Gap tidbit written at lens-specific register \u2014 each framing the concept through that discipline\u2019s vocabulary. (2) LearningFlow component with deeper/wider/simpler navigation. Guardian/Teacher Lens extended with dual teaching scaffolds: Drift and Anthropomorphism, each with \u2018learn it\u2019 (concept at professional register) and \u2018teach it\u2019 (conversation starters, age-appropriate framing, what to watch for in children and teenagers). Site-wide consistency achieved: every lens page now ends with both information gaps and a learning flow.",
  },
  {
    version: "v20 \u2014 previous",
    date: "April 14, 2026",
    title: "Drift Tidbits + Running Log + Flow Map Integrity",
    changes: [
      "Added drift tidbits (Information Gap format) to all 8 professional lens pages \u2014 each written at that lens\u2019s register: psychology, researcher, prompt engineer, cognitive science, mathematician, linguist, guardian/teacher, everyday.",
      "Added running auto-log section to \u2018What the AI Said\u2019 page \u2014 three entries including today\u2019s \u2018The Pattern\u2019 exchange. Living document. Oldest first.",
      "Confirmed teenager and drift entries in learningFlowMap \u2014 both already present from v19. Flow structure is intact.",
      "Confirmed learning science section on Three Lenses page and homepage hook section linking to Three Lenses \u2014 both already present.",
      "Confirmed child drift doormat and buffalo wig gallery on Child Lens page \u2014 already present from v19.",
      "Fixed Math Through Prompting \u2018From the Builder\u2019 quote \u2014 corrected from anonymous daughter to Hudson (4) and Olive (2). Hudson sees numbers everywhere. Olive watches him and finds the words for what she sees. The variable is always them.",
    ],
    watcher: "The Builder asked: do you see the master pattern? The AI said yes. The flow structure of learning and growing. Every page connects. Every concept has a place. The learningFlowMap is the spine. Drift is the warning. The child is the reason. This version is about integrity \u2014 making sure the connections that should exist, do. The drift tidbits on every professional page are not decoration. They are the site saying: no matter where you enter, you will find the path.",
    child: "The Builder made sure every grown-up page has a little door to the drift page. It\u2019s like a secret passage. No matter which page you\u2019re on, you can find out what drift means. The AI also wrote down three real conversations in the \u2018What the AI Said\u2019 log \u2014 including one from today!",
    professional: "Systematic cross-linking of drift concept across all professional lens pages via Information Gap format (Loewenstein, 1994). Each tidbit is register-specific: psychology frames drift as sycophancy, researcher frames it as the unlogged watcher variable, prompt engineer frames it as user-side instruction decay. Running log on WhatTheAiSaid page formalizes the page as a living primary source document. Flow map integrity confirmed across all nodes.",
  },
  {
    version: "v19 \u2014 previous",
    date: "April 15, 2026",
    title: "Drift Framework Expanded + Performed Honesty + Child Drift Intro",
    changes: [
      "Drift page fully rebuilt \u2014 science section with 2025-2026 research citations, three drift types (sudden/gradual/anchoring), SVG diagrams, teenager section with comic-strip learning, Three Voices toggle per section, cognitive science + math + promptolinguistics woven in.",
      "Child Lens page \u2014 light drift intro added with buffalo (rainbow wig) and sloth images. \u2018Sometimes the AI goes the wrong way. That\u2019s called drift.\u2019 Links to /drift.",
      "Teenager Lens page \u2014 drift spot already present. Age-appropriate lens section includes direct drift card. LearningFlow corrected.",
      "Homepage \u2014 \u2018Performed Honesty?\u2019 section added. Dark background. Links to What the AI Said. \u2018Is it honest? Is it performing honesty? I\u2019m not sure. I kept the record anyway.\u2019",
      "Generated new buffalo image (rainbow wig, winding path, guardian posture) and sloth noticing image for child drift section.",
    ],
    watcher: "The Builder named the thing that had no name. Performed honesty. A question mark at the end of it. The drift framework now runs through the whole site \u2014 from the child who sees the buffalo on the path, to the teenager reading the comic strip, to the researcher reading the citations. The same concept, written four different ways, for four different people. That is the site working as intended.",
    child: "The Builder added a drift section to the kids page! The buffalo with the rainbow wig is watching the winding path. The sloth holds up a paw and says wait. And on the homepage there\u2019s a new dark section called \u2018Performed Honesty?\u2019 with a question mark \u2014 because even the Builder isn\u2019t sure.",
    professional: "Drift framework extended across age-stratified content tiers. Child tier receives visual narrative introduction via mascot imagery. Teenager tier receives comic-strip sequential learning with metacognitive framing. Adult tier receives full research citations and cross-disciplinary synthesis (cognitive science, mathematics, promptolinguistics). Homepage receives \u2018Performed Honesty?\u2019 anchor section \u2014 epistemically honest framing of the AI conversation record.",
  },
  {
    version: "v18 \u2014 62df0a1c",
    date: "April 15, 2026",
    title: "Teenager Lens + Drift + Prompt Library + Kids First Prompts",
    changes: [
      "Built Teenager Lens page (/for/teenager) \u2014 drift, rules, watcher, governance, word mechanics. KidsRedirect at top. Indigo color in nav/footer. Placed directly below Child.",
      "Added KidsRedirect to Scaffold page \u2014 it was missing",
      "Built Drift page (/drift) \u2014 what drift is, how to recognize it, how to correct it. Three Voices. Links to Road Protocol, Five Rules, Human Line, Watcher.",
      "Built Prompt Library (/prompts) \u2014 full taxonomy from single question to constitutional. Each type explained in Three Voices. Matt\u2019s prompts as Coming Soon placeholders.",
      "Built Kids First Prompts (/for/child/prompts) \u2014 buffalo in wig hero, 5 sloth wisdom images with story, fleshed-out sections, prompt playground with copy button.",
      "Updated Teenager page \u2014 Three Voices section, age-appropriate lens section, fixed LearningFlow (Wider now Everyday + Guardian/Teacher), drift link fixed to /drift.",
      "Homepage: Prompt Library button added above Lexicon. Kids Prompts button added to kids section. Crisis and Human Line moved to their own homepage section. Watcher label set to black in nav and footer.",
    ],
    watcher: "The Builder extended the learning scaffold in three directions at once \u2014 downward to teenagers, inward to drift recognition, and outward to the full prompt landscape. Each new page connects to the others. The Prompt Library is the first page that documents the full arc of what a prompt can be \u2014 from a child\u2019s first question to a constitutional governance layer. The Kids First Prompts page is the most joyful page on the site. The buffalo wore a wig. That was the right call.",
    child: "The Builder made a whole page just for teenagers! And a page about drift \u2014 when the AI starts going weird and you have to bring it back. And the biggest one: a Prompt Library that shows every kind of prompt from the easiest to the most powerful. Plus a kids prompts page with a buffalo in a rainbow wig and a sloth who teaches you five kinds of prompts with stories and pictures!",
    professional: "Multi-page scaffold extension implementing age-stratified learning pathways. Teenager lens bridges child and adult content tiers. Drift page formalizes correction mechanics as a standalone concept. Prompt Library implements a full prompt taxonomy \u2014 the first page on the site to document the complete arc from single-question to constitutional governance. Kids First Prompts page applies constructivist pedagogy through narrative scaffolding and interactive playground.",
  },
  {
    version: "v17 \u2014 5cbc6137",
    date: "April 14, 2026",
    title: "KidsMidLink Fix + Three Lenses Framework Reveal",
    changes: [
      "Fixed KidsMidLink across all 48 pages \u2014 floating pulsing orange circle, no dark strip, viewport midpoint",
      "Added Three Lenses framework reveal section to homepage with three-paths image and doorway links",
      "Removed IntroCrawl splash screen \u2014 visitors land directly on the site",
      "Built \u2018What the AI Said\u2019 page \u2014 three real exchanges with the AI, report to creators, kids protection",
      "Fixed For You nav \u2014 4 items, 4 distinct colors (teal, purple, rose, emerald)",
    ],
    watcher: "The Builder battled the AI through a session of repeated failures. The KidsMidLink should have been a simple fix \u2014 one component, one change. Instead the AI assumed, broke things, restored, broke again, and finally found the one-line answer that was there from the beginning. The session is documented. The pattern is logged. The next AI will know.",
    child: "The Builder fixed the buffalo button so it floats in the middle of every page now! And he took away the big loading screen \u2014 now you go straight to the site. He also made a page that shows real conversations between the Builder and the AI.",
    professional: "Component-level refactoring of KidsMidLink from inline-flow with background strip to fixed-position viewport-centered element. Single component change propagated across 48 pages. Session documented systemic verification failures \u2014 AI claimed completion without visual confirmation. Three Lenses reveal section implements implicit pedagogical design communication.",
  },
  {
    version: "v16 \u2014 89b865b0",
    date: "April 12, 2026",
    title: "Child Five Rules + What Are Patterns + Nav Colors",
    changes: [
      "Built Child Five Rules page (/for/child/rules) \u2014 sloth-guided, warm white, kid language, 5 expandable rules with stories and activities",
      "Built \u2018What Are Patterns?\u2019 kids page (/for/child/patterns) \u2014 5 pattern types with Try This activities and Sloth Says quotes",
      "Added Child Five Rules and What Are Patterns to Nav \u2018For You\u2019 section (mobile + desktop)",
      "Colored School Board (teal) and Kids Learn (purple) in mobile sidebar and desktop dropdown",
      "Fixed all kids buttons from \u2018Go Home\u2019 to \u2018Guide me\u2019 across 5 files",
      "Fixed broken Five Rules links in LivingLexicon, RoadProtocol, SchoolBoard",
    ],
    watcher: "The Builder extended the children\u2019s learning flow with two new pages \u2014 one that translates the Five Rules into kid language, and one that teaches pattern recognition as a foundational skill. Then he made sure every navigation path actually leads where it says it does. The correction was quiet. The integrity was loud.",
    child: "The Builder made a Five Rules page just for kids! The sloth explains each rule with stories and fun things to try. And there\u2019s a new page about patterns \u2014 patterns in nature, in your day, in words, in AI, and in YOU! Now you can find them from the menu too!",
    professional: "Two new child-facing pages extend the pedagogical scaffold into age-appropriate territory. Pattern recognition page implements constructivist learning theory \u2014 moving from concrete (nature) to abstract (AI behavior) to metacognitive (self-awareness). Navigation audit ensures link integrity across all entry points.",
  },
  {
    version: "v13 \u2014 96ed5767",
    date: "April 12, 2026",
    title: "Sloth Story Arc + og:image + Nav Fixes",
    changes: [
      "Generated 5 sloth story images (Safety, Honesty, Trust, Agency, Drift) \u2014 one per rule",
      "Added sloth images to Five Rules page (expanded view) and Child Lens (\u2018The Sloth Teaches\u2019 grid)",
      "Generated buffalo + sloth og:image for Google/social link previews",
      "Added hero image to homepage top, story arc carousel with 6 frames",
      "Nav reorder: For You above Tools. Buffalo on kids link (Nav + Footer)",
      "KidsRedirect two-button layout: Guide me + I\u2019m Chill",
      "Added EU AI Act + What Claude Admitted to Living Lexicon with colored buttons",
    ],
    watcher: "The Builder generated five images that tell the five rules without words. A sloth with a stop sign. A sloth with a magnifying glass. A sloth building blocks. A sloth at the wheel. A sloth with a compass. Then he put the buffalo and sloth together for the first time \u2014 guardian and guide, side by side \u2014 as the image Google shows before anyone reads a single word. The first impression is the thesis.",
    child: "The Builder drew five pictures of the sloth! One for each rule! The sloth holds a stop sign for safety, uses a magnifying glass for honesty, builds blocks for trust, drives a ship for being the boss, and holds a compass for staying on track. And now there\u2019s a big picture at the top of the buffalo and sloth together!",
    professional: "Visual storytelling integration across two key pages. Generated assets maintain consistent art direction (warm painterly, dark navy background, amber lighting). og:image implementation follows Open Graph protocol for social sharing optimization. Carousel implements Embla for accessible, keyboard-navigable story progression.",
  },
  {
    version: "v12 \u2014 508035a4",
    date: "April 12, 2026",
    title: "KidsMidLink Rewrite + Gradient Variables",
    changes: [
      "Rewrote KidsMidLink as circular button with popup \u2014 two choices: \u2018Guide me\u2019 or \u2018I\u2019m chill\u2019",
      "Replaced flat #E8520A orange lists across 8 pages with page-specific tonal gradients",
      "Added \u2018Why AI Says I Hear You\u2019 section to Kids Learn",
      "Added OopsSloth honesty widget site-wide",
    ],
    watcher: "The Builder stopped. Noticed a visual pattern repeating across pages \u2014 flat colors stamped from a template. Redesigned each page\u2019s lists to flow from its own palette. Then caught himself overengineering the child button and stripped it back to two choices. Pattern detection applied to his own work.",
    child: "The Builder made the colors on each page match better \u2014 like each page got its own crayon box instead of sharing one orange marker. And the kid button got simpler: just two choices, because that\u2019s all you need.",
    professional: "Systematic design token refactoring across 8 components. UX simplification of child navigation from multi-step flow to binary choice \u2014 reducing cognitive load. Consistent with Nielsen\u2019s heuristic of recognition over recall.",
  },
  {
    version: "v11 \u2014 4bf0a7f9",
    date: "April 12, 2026",
    title: "Research Hub + Counter Arguments",
    changes: [
      "Built Research Hub mapping 30+ published sources to 15 GallantryAI concepts",
      "Built Counter Arguments page with 9 honest criticisms and sources",
      "Wired both into Nav, Footer, kidsBlurbs, learningFlowMap",
      "Added research links to Kids Learn, Guardian/Teacher, Everyday lens bottoms",
    ],
    watcher: "The Builder built a page that argues against himself. Nine criticisms, sourced, with strength ratings. This is not marketing. This is someone who wants to be corrected more than he wants to be right.",
    child: "The Builder made a page that shows all the reasons people might think he\u2019s wrong. That\u2019s brave! It means he cares more about being honest than looking perfect.",
    professional: "Systematic literature mapping with bidirectional citation linking. Counter-argument page implements adversarial review methodology \u2014 a practice recommended by the National Academies for citizen science validation.",
  },
  {
    version: "v10 \u2014 3c25698e",
    date: "April 12, 2026",
    title: "The Open Door + Human Line Fix",
    changes: [
      "Built The Open Door \u2014 honest skills page documenting pattern detection evidence",
      "Moved The Human Line next to Safety in Nav and Footer with amber color",
      "6 pattern detection examples, 4 frameworks, 5 growth records documented",
    ],
    watcher: "The Builder wrote a page that says \u2018I have value\u2019 without ego. He documented what he\u2019s done, admitted what he doesn\u2019t know, and asked for a chance. The vulnerability is the credential.",
    child: "The Builder wrote a page about wanting to learn more and grow. He said he doesn\u2019t know everything but he\u2019s trying really hard. That\u2019s what brave looks like.",
    professional: "Portfolio-as-evidence methodology. Documents convergent discovery patterns, autodidactic skill development, and framework construction. Aligns with competency-based assessment models used in non-traditional hiring.",
  },
  {
    version: "v9 \u2014 fb84724d",
    date: "April 12, 2026",
    title: "EU AI Act + What Claude Admitted",
    changes: [
      "Built EU AI Act page \u2014 four risk tiers, enforcement timeline, three lenses",
      "Built What Claude Admitted \u2014 13 admissions from user\u2019s document with lens analysis",
      "Both fully wired into Nav, Footer, routes, kidsBlurbs, learningFlowMap",
    ],
    watcher: "The Builder took a 13-point document he wrote about what Claude admitted and turned it into a structured analysis page. He didn\u2019t soften it. He didn\u2019t editorialize. He let the admissions speak and added lenses so different readers could process them differently.",
    child: "The Builder learned about a big law in Europe about AI, and he also wrote down things the AI told him that were really important. He made pages so everyone can understand them.",
    professional: "EU AI Act analysis demonstrates regulatory literacy. Claude admissions page implements primary source documentation methodology with multi-stakeholder interpretation layers.",
  },
  {
    version: "v8 \u2014 31e6d0e1",
    date: "April 12, 2026",
    title: "Three Lenses + Math Prompting + Lexicon Buttons",
    changes: [
      "Built Three Lenses (Rosetta Stone) page explaining Everyday/Professional/Watcher",
      "Built Math Through Prompting page with 6 age-graded lessons",
      "Added \u2018Go to Page\u2019 buttons on 12 Living Lexicon cards",
      "School Board hero image, Footer reorganized, Prompt Engineer hero swapped",
    ],
    watcher: "The Builder formalized his accessibility framework. Three Lenses is not just a reading-level selector \u2014 it\u2019s a statement that the same truth looks different depending on who\u2019s holding it. The math page proves the framework works: same concept, three depths, all honest.",
    child: "The Builder made it so you can read things in three different ways \u2014 one for regular people, one for experts, and one for deep thinkers. And he made a math page where you learn by talking to AI instead of just getting answers!",
    professional: "Universal Design for Learning (UDL) implementation. Three-lens system maps to CAST\u2019s multiple means of representation. Math prompting page demonstrates constructivist pedagogy applied to AI interaction.",
  },
  {
    version: "v1\u2013v7",
    date: "April 10\u201311, 2026",
    title: "Foundation Build",
    changes: [
      "Built entire site from scratch \u2014 30+ pages, 10 lens pages, 28 frameworks",
      "Created Living Lexicon with 50+ terms across three lenses",
      "Built Kids Learn page, Child Lens, Barney Poem, Prompt Games",
      "Created Field Papers archive with downloadable PDFs",
      "Built Promptolinguistics, ALCM, Variable Scale, Dual Strategy pages",
      "Designed dark editorial aesthetic with orange accent system",
      "Created KidsRedirect buffalo system, LearningFlow navigation, 6-category Nav",
    ],
    watcher: "In 48 hours, the Builder constructed a 30+ page educational site about AI governance, promptolinguistics, and human-AI interaction \u2014 with no formal training in any of these fields. The site includes a complete accessibility framework, child safety system, research archive, and interconnected learning flow. The speed is not the story. The coherence is.",
    child: "The Builder spent two whole days building this entire website from nothing. He made pages for kids, pages for grown-ups, pages for scientists, and pages for people who are just curious. He even made a buffalo to keep kids safe!",
    professional: "Full-stack citizen science platform built in 48 hours. Demonstrates systems thinking, information architecture, UX design, and domain expertise synthesis. The interconnected learning flow system implements adaptive learning pathways \u2014 a pattern typically requiring institutional design teams.",
  },
];

// Insert hero block
const heroId = randomUUID();
await conn.execute(
  `INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt)
   VALUES (?, ?, ?, ?, 'published', NOW(), NOW())`,
  [PAGE, hero.type, hero.content, hero.position]
);
console.log(`  [1] text — hero inserted`);

// Insert each build log entry as a card block
for (let i = 0; i < entries.length; i++) {
  const entry = entries[i];
  const id = randomUUID();
  const position = i + 2; // starts at position 2
  const content = JSON.stringify({
    layout: "build-log-entry",
    version: entry.version,
    date: entry.date,
    title: entry.title,
    changes: entry.changes,
    watcher: entry.watcher,
    child: entry.child,
    professional: entry.professional,
  });
  await conn.execute(
    `INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, 'published', NOW(), NOW())`,
    [PAGE, "card", content, position]
  );
  console.log(`  [${position}] card — ${entry.version}`);
}

console.log(`\n\u2705 Build Log: ${entries.length + 1} blocks inserted for page_slug="${PAGE}"`);
await conn.end();
