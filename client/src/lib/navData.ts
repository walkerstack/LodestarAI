/*
 * GALLANTRYAI — Nav Data
 * ─────────────────────────────────────────────────────────────
 * All navigation link arrays live here. Nav.tsx imports from this file.
 * When adding, removing, or renaming nav items — edit THIS file only.
 * Nav.tsx handles all JSX, dropdown logic, and mobile menu behaviour.
 *
 * GHOST CODE — Page Standard
 * ─────────────────────────────────────────────────────────────
 * This file is the single source of truth for nav content.
 * Every route in App.tsx should have a corresponding entry here
 * OR be intentionally excluded (e.g. /404, /backstage).
 *
 * SECTIONS:
 * 1. lenses         — Enter Your Lens dropdown
 * 2. foundationLinks — Foundation dropdown
 * 3. forYouLinks    — For You dropdown
 * 4. toolsLinks     — Tools dropdown
 * 5. researchLinks  — Research dropdown
 * 6. exploreLinks   — Explore dropdown
 *
 * RULES:
 * - Add new pages to the correct section AND to Footer.tsx
 * - Never add a route to App.tsx without adding it here and in Footer.tsx
 * - Labels must match the page title exactly
 * - Paths must match the route in App.tsx exactly
 * ─────────────────────────────────────────────────────────────
 */

export const lenses = [
  { label: "Everyday Person", path: "/for/everyday", color: "text-amber-600" },
  { label: "Child", path: "/for/child", color: "text-sky-500" },
  { label: "Teenager", path: "/for/teenager", color: "text-indigo-600" },
  { label: "Guardian & Teacher", path: "/for/guardian-teacher", color: "text-green-600" },
  { label: "Prompt Engineer", path: "/for/prompt-engineer", color: "text-orange-600" },
  { label: "Linguist", path: "/for/linguist", color: "text-purple-600" },
  { label: "Mathematician", path: "/for/mathematician", color: "text-blue-600" },
  { label: "Cognitive Science", path: "/for/cognitive-science", color: "text-slate-600" },
  { label: "Psychology", path: "/for/psychology", color: "text-rose-600" },
  { label: "Researcher", path: "/for/researcher", color: "text-teal-600" },
  { label: "The Watcher", path: "/for/watcher", color: "text-black" },
];

export const foundationLinks = [
  { label: "Gallantry AI", path: "/gallantry-ai" },
  { label: "The Three Voices", path: "/three-lenses" },
  { label: "The Five Rules", path: "/rules" },
  { label: "Road Protocol", path: "/road-protocol" },
  { label: "Drift", path: "/drift" },
  { label: "Hallucinations", path: "/hallucinations" },
  { label: "Anthropomorphism", path: "/anthropomorphism" },
  { label: "The Scaffold", path: "/scaffold" },
  { label: "User-Side Governance", path: "/user-governance" },
  { label: "Dual Strategy", path: "/dual-strategy" },
];

export const forYouLinks = [
  { label: "School Board", path: "/school-board", color: "#0d9488" },
  { label: "Kids Learn", path: "/kids-learn", color: "#7c3aed" },
  { label: "Child Five Rules", path: "/for/child/rules", color: "#e11d48" },
  { label: "What Are Patterns?", path: "/for/child/patterns", color: "#059669" },
  { label: "First Prompts (Kids)", path: "/for/child/prompts", color: "#E8520A" },
];

export const toolsLinks = [
  { label: "Prompt Library", path: "/prompts" },
  { label: "Flower Presets", path: "/flower-presets" },
  { label: "Prompt Games", path: "/prompt-games" },
  { label: "Math Through Prompting", path: "/math-prompting" },
  { label: "Promptology Playground", path: "/playground" },
  { label: "Framework Families", path: "/frameworks" },
  { label: "Whelm Scale", path: "/whelm-scale" },
  { label: "Variable Scale Theory", path: "/variable-scale" },
  { label: "Malbolge Geofence", path: "/malbolge" },
];

export const researchLinks = [
  { label: "Promptolinguistics", path: "/promptolinguistics" },
  { label: "ALCM", path: "/alcm" },
  { label: "Living Lexicon", path: "/lexicon" },
  { label: "AI Family Taxonomy", path: "/taxonomy" },
  { label: "What Claude Admitted", path: "/what-claude-admitted" },
  { label: "EU AI Act", path: "/eu-ai-act" },
  { label: "Research Hub", path: "/research-hub" },
  { label: "Field Events", path: "/research-hub?category=field" },
  { label: "Counter Arguments", path: "/counter-arguments" },
  { label: "Screenshot Sharing", path: "/screenshot-sharing" },
  { label: "Field Report Review", path: "/field-report-review" },
  { label: "What the AI Said", path: "/what-the-ai-said" },
];

export const exploreLinks = [
  { label: "Gallery", path: "/gallery" },
  { label: "Articles", path: "/articles" },
  { label: "The Human Line", path: "/human-line" },
  { label: "Field Papers", path: "/field-papers" },
  { label: "The Watcher", path: "/for/watcher" },
  { label: "Citizen Researcher", path: "/citizen-researcher" },
  { label: "The Builder", path: "/builder" },
  { label: "Builder Origin", path: "/builder-origin" },
  { label: "The Builder's Kids", path: "/builders-kids" },
  { label: "The Open Door", path: "/open-door" },
];
