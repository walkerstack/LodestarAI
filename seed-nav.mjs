/**
 * seed-nav.mjs
 * ─────────────────────────────────────────────────────────────
 * Seeds the nav_items table from the existing navData.ts arrays.
 * Run once: node seed-nav.mjs
 * Safe to re-run — checks count first, skips if already seeded.
 * ─────────────────────────────────────────────────────────────
 */

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { config } from "dotenv";

config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("[seed-nav] DATABASE_URL not set. Aborting.");
  process.exit(1);
}

// ── Nav data (copied from navData.ts) ──────────────────────────

const lenses = [
  { label: "Everyday Person", path: "/for/everyday", colour: "text-amber-600" },
  { label: "Child", path: "/for/child", colour: "text-sky-500" },
  { label: "Teenager", path: "/for/teenager", colour: "text-indigo-600" },
  { label: "Guardian & Teacher", path: "/for/guardian-teacher", colour: "text-green-600" },
  { label: "Prompt Engineer", path: "/for/prompt-engineer", colour: "text-orange-600" },
  { label: "Linguist", path: "/for/linguist", colour: "text-purple-600" },
  { label: "Mathematician", path: "/for/mathematician", colour: "text-blue-600" },
  { label: "Cognitive Science", path: "/for/cognitive-science", colour: "text-slate-600" },
  { label: "Psychology", path: "/for/psychology", colour: "text-rose-600" },
  { label: "Researcher", path: "/for/researcher", colour: "text-teal-600" },
  { label: "The Watcher", path: "/for/watcher", colour: "text-black" },
];

const foundationLinks = [
  { label: "Gallantry AI", path: "/gallantry-ai" },
  { label: "The Three Voices", path: "/three-voices" },
  { label: "The Five Rules", path: "/rules" },
  { label: "Road Protocol", path: "/road-protocol" },
  { label: "Drift", path: "/drift" },
  { label: "Hallucinations", path: "/hallucinations" },
  { label: "Anthropomorphism", path: "/anthropomorphism" },
  { label: "The Scaffold", path: "/scaffold" },
  { label: "User-Side Governance", path: "/user-governance" },
  { label: "Dual Strategy", path: "/dual-strategy" },
];

const forYouLinks = [
  { label: "Guardian & Teacher", path: "/for/guardian-teacher", colour: "#16a34a" },
  { label: "School Board", path: "/school-board", colour: "#0d9488" },
  { label: "Kids Learn", path: "/kids-learn", colour: "#7c3aed" },
  { label: "Child Five Rules", path: "/for/child/rules", colour: "#e11d48" },
  { label: "What Are Patterns?", path: "/for/child/patterns", colour: "#059669" },
  { label: "First Prompts (Kids)", path: "/for/child/prompts", colour: "#E8520A" },
];

const toolsLinks = [
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

const researchLinks = [
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

const exploreLinks = [
  { label: "Gallery", path: "/gallery" },
  { label: "Articles", path: "/articles" },
  { label: "The Human Line", path: "/human-line" },
  { label: "Field Papers", path: "/field-papers" },
  { label: "Citizen Researcher", path: "/citizen-researcher" },
  { label: "The Builder", path: "/builder" },
  { label: "Builder Origin", path: "/builder-origin" },
  { label: "The Builder's Kids", path: "/builders-kids" },
  { label: "The Open Door", path: "/open-door" },
];

// ── Build rows ──────────────────────────────────────────────────

function buildRows(items, section, isFooter = true) {
  return items.map((item, i) => ({
    section,
    label: item.label,
    path: item.path,
    colour: item.colour ?? item.color ?? null,
    position: i,
    isPublished: true, // seed as published — matches current live site
    isFooter,
  }));
}

const allRows = [
  ...buildRows(lenses, "lenses", false),         // lenses don't appear in footer
  ...buildRows(foundationLinks, "foundation"),
  ...buildRows(forYouLinks, "for-you"),
  ...buildRows(toolsLinks, "tools"),
  ...buildRows(researchLinks, "research"),
  ...buildRows(exploreLinks, "explore"),
];

// ── Seed ────────────────────────────────────────────────────────

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection);

// Check if already seeded
const existing = await connection.query("SELECT COUNT(*) as count FROM nav_items");
const count = existing[0][0].count;

if (count > 0) {
  console.log(`[seed-nav] Already seeded (${count} rows). Skipping.`);
  await connection.end();
  process.exit(0);
}

console.log(`[seed-nav] Seeding ${allRows.length} nav items...`);

for (const row of allRows) {
  await connection.execute(
    `INSERT INTO nav_items (section, label, path, colour, position, isPublished, isFooter, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [row.section, row.label, row.path, row.colour, row.position, row.isPublished ? 1 : 0, row.isFooter ? 1 : 0]
  );
}

console.log(`[seed-nav] Done. ${allRows.length} rows inserted.`);
await connection.end();
