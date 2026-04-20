/**
 * seed-all-pages.mjs
 * Inserts one text block on every page that currently has zero blocks.
 * Run: node scripts/seed-all-pages.mjs
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const SITE_PAGES = [
  { slug: "home", label: "Home" },
  { slug: "rules", label: "Five Rules" },
  { slug: "road-protocol", label: "Road Protocol" },
  { slug: "promptolinguistics", label: "Promptolinguistics" },
  { slug: "alcm", label: "ALCM" },
  { slug: "lexicon", label: "Living Lexicon" },
  { slug: "field-papers", label: "Field Papers" },
  { slug: "citizen-researcher", label: "Citizen Researcher" },
  { slug: "research-hub", label: "Research Hub" },
  { slug: "builder", label: "Builder" },
  { slug: "builder-origin", label: "Builder Origin" },
  { slug: "builders-kids", label: "Builder's Kids" },
  { slug: "frameworks", label: "Framework Families" },
  { slug: "taxonomy", label: "AI Family Taxonomy" },
  { slug: "malbolge", label: "Malbolge Geofence" },
  { slug: "playground", label: "Promptology Playground" },
  { slug: "prompt-games", label: "Prompt Games" },
  { slug: "flower-presets", label: "Flower Presets" },
  { slug: "human-line", label: "Human Line" },
  { slug: "drift", label: "Drift" },
  { slug: "anthropomorphism", label: "Anthropomorphism" },
  { slug: "hallucinations", label: "Hallucinations" },
  { slug: "scaffold", label: "Scaffold" },
  { slug: "three-voices", label: "Three Voices" },
  { slug: "whelm-scale", label: "Whelm Scale" },
  { slug: "variable-scale", label: "Variable Scale" },
  { slug: "math-prompting", label: "Math Prompting" },
  { slug: "user-governance", label: "User Governance" },
  { slug: "dual-strategy", label: "Dual Strategy" },
  { slug: "gallantry-ai", label: "GallantryAI Page" },
  { slug: "eu-ai-act", label: "EU AI Act" },
  { slug: "what-claude-admitted", label: "What Claude Admitted" },
  { slug: "what-the-ai-said", label: "What the AI Said" },
  { slug: "open-door", label: "Open Door" },
  { slug: "counter-arguments", label: "Counter Arguments" },
  { slug: "screenshot-sharing", label: "Screenshot Sharing" },
  { slug: "field-report-review", label: "Field Report Review" },
  { slug: "gallery", label: "Gallery" },
  { slug: "articles", label: "Articles" },
  { slug: "safety", label: "Safety Page" },
  { slug: "school-board", label: "School Board" },
  { slug: "kids-learn", label: "Kids Learn" },
  { slug: "prompts", label: "Prompt Library" },
  { slug: "for-child", label: "Child Lens" },
  { slug: "for-child-rules", label: "Child: Five Rules" },
  { slug: "for-child-patterns", label: "Child: Patterns" },
  { slug: "for-child-prompts", label: "Child: Prompts" },
  { slug: "for-teenager", label: "Teenager Lens" },
  { slug: "for-everyday", label: "Everyday Person Lens" },
  { slug: "for-guardian-teacher", label: "Guardian/Teacher Lens" },
  { slug: "for-prompt-engineer", label: "Prompt Engineer Lens" },
  { slug: "for-linguist", label: "Linguist Lens" },
  { slug: "for-mathematician", label: "Mathematician Lens" },
  { slug: "for-cognitive-science", label: "Cognitive Science Lens" },
  { slug: "for-psychology", label: "Psychology Lens" },
  { slug: "for-researcher", label: "Researcher Lens" },
  { slug: "for-watcher", label: "Watcher Lens" },
];

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Get all slugs that already have blocks
const [existing] = await conn.execute('SELECT DISTINCT pageSlug FROM content_blocks');
const hasBlocks = new Set(existing.map(r => r.pageSlug));

let seeded = 0;
for (const page of SITE_PAGES) {
  if (hasBlocks.has(page.slug)) continue;

  const content = JSON.stringify({
    heading: page.label,
    body: `This is the ${page.label} page. Tap to edit this block.`,
    font: "dmsans",
    size: "medium",
  });

  await conn.execute(
    `INSERT INTO content_blocks (pageSlug, blockType, position, content, status, createdAt, updatedAt)
     VALUES (?, 'text', 1, ?, 'published', NOW(), NOW())`,
    [page.slug, content]
  );
  console.log(`Seeded: ${page.slug}`);
  seeded++;
}

console.log(`\nDone. ${seeded} pages seeded. ${hasBlocks.size} pages already had blocks.`);
await conn.end();
