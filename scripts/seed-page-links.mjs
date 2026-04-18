/**
 * seed-page-links.mjs
 * Seeds the page_links table with all known navigation links across the site.
 * Each entry: pageSlug, label, destination, position
 * Run: node scripts/seed-page-links.mjs
 */
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Clear existing links first
await conn.execute('DELETE FROM page_links');
console.log('Cleared existing page_links');

const links = [
  // ── HOME ──────────────────────────────────────────────────────────────────
  { pageSlug: 'home', label: 'The Five Rules', destination: '/rules', position: 1 },
  { pageSlug: 'home', label: 'Children\'s Page', destination: '/for/child', position: 2 },
  { pageSlug: 'home', label: 'Flower Presets', destination: '/flower-presets', position: 3 },
  { pageSlug: 'home', label: 'Road Protocol', destination: '/road-protocol', position: 4 },
  { pageSlug: 'home', label: 'Living Lexicon', destination: '/lexicon', position: 5 },
  { pageSlug: 'home', label: 'Prompt Games', destination: '/prompt-games', position: 6 },
  { pageSlug: 'home', label: 'Framework Families', destination: '/frameworks', position: 7 },
  { pageSlug: 'home', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 8 },
  { pageSlug: 'home', label: 'Research Hub', destination: '/research', position: 9 },
  { pageSlug: 'home', label: 'The Builder', destination: '/builder', position: 10 },
  { pageSlug: 'home', label: 'If You Need to Stop', destination: '/if-you-need-to-stop', position: 11 },
  { pageSlug: 'home', label: 'ALCM', destination: '/alcm', position: 12 },

  // ── FIVE RULES ────────────────────────────────────────────────────────────
  { pageSlug: 'rules', label: 'Road Protocol', destination: '/road-protocol', position: 1 },
  { pageSlug: 'rules', label: 'Flower Presets', destination: '/flower-presets', position: 2 },
  { pageSlug: 'rules', label: 'Children\'s Rules', destination: '/for/child/rules', position: 3 },
  { pageSlug: 'rules', label: 'If You Need to Stop', destination: '/if-you-need-to-stop', position: 4 },
  { pageSlug: 'rules', label: 'Living Lexicon', destination: '/lexicon', position: 5 },
  { pageSlug: 'rules', label: 'Framework Families', destination: '/frameworks', position: 6 },

  // ── ROAD PROTOCOL ─────────────────────────────────────────────────────────
  { pageSlug: 'road-protocol', label: 'The Five Rules', destination: '/rules', position: 1 },
  { pageSlug: 'road-protocol', label: 'Flower Presets', destination: '/flower-presets', position: 2 },
  { pageSlug: 'road-protocol', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 3 },
  { pageSlug: 'road-protocol', label: 'Framework Families', destination: '/frameworks', position: 4 },
  { pageSlug: 'road-protocol', label: 'If You Need to Stop', destination: '/if-you-need-to-stop', position: 5 },

  // ── PROMPTOLINGUISTICS ────────────────────────────────────────────────────
  { pageSlug: 'promptolinguistics', label: 'ALCM', destination: '/alcm', position: 1 },
  { pageSlug: 'promptolinguistics', label: 'Living Lexicon', destination: '/lexicon', position: 2 },
  { pageSlug: 'promptolinguistics', label: 'Framework Families', destination: '/frameworks', position: 3 },
  { pageSlug: 'promptolinguistics', label: 'Prompt Games', destination: '/prompt-games', position: 4 },
  { pageSlug: 'promptolinguistics', label: 'Malbolge Geofence', destination: '/malbolge', position: 5 },
  { pageSlug: 'promptolinguistics', label: 'Road Protocol', destination: '/road-protocol', position: 6 },

  // ── ALCM ──────────────────────────────────────────────────────────────────
  { pageSlug: 'alcm', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 1 },
  { pageSlug: 'alcm', label: 'Framework Families', destination: '/frameworks', position: 2 },
  { pageSlug: 'alcm', label: 'Living Lexicon', destination: '/lexicon', position: 3 },
  { pageSlug: 'alcm', label: 'Playground', destination: '/playground', position: 4 },

  // ── LIVING LEXICON ────────────────────────────────────────────────────────
  { pageSlug: 'lexicon', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 1 },
  { pageSlug: 'lexicon', label: 'AI Family Taxonomy', destination: '/taxonomy', position: 2 },
  { pageSlug: 'lexicon', label: 'Framework Families', destination: '/frameworks', position: 3 },
  { pageSlug: 'lexicon', label: 'The Five Rules', destination: '/rules', position: 4 },

  // ── FRAMEWORK FAMILIES ────────────────────────────────────────────────────
  { pageSlug: 'frameworks', label: 'Road Protocol', destination: '/road-protocol', position: 1 },
  { pageSlug: 'frameworks', label: 'Flower Presets', destination: '/flower-presets', position: 2 },
  { pageSlug: 'frameworks', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 3 },
  { pageSlug: 'frameworks', label: 'Citizen Researcher', destination: '/citizen-researcher', position: 4 },

  // ── FLOWER PRESETS ────────────────────────────────────────────────────────
  { pageSlug: 'flower-presets', label: 'The Five Rules', destination: '/rules', position: 1 },
  { pageSlug: 'flower-presets', label: 'Road Protocol', destination: '/road-protocol', position: 2 },
  { pageSlug: 'flower-presets', label: 'Framework Families', destination: '/frameworks', position: 3 },
  { pageSlug: 'flower-presets', label: 'If You Need to Stop', destination: '/if-you-need-to-stop', position: 4 },

  // ── SCAFFOLD ──────────────────────────────────────────────────────────────
  { pageSlug: 'scaffold', label: 'The Five Rules', destination: '/rules', position: 1 },
  { pageSlug: 'scaffold', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 2 },
  { pageSlug: 'scaffold', label: 'Framework Families', destination: '/frameworks', position: 3 },
  { pageSlug: 'scaffold', label: 'Citizen Researcher', destination: '/citizen-researcher', position: 4 },
  { pageSlug: 'scaffold', label: 'Field Papers', destination: '/field-papers', position: 5 },

  // ── BUILDER ───────────────────────────────────────────────────────────────
  { pageSlug: 'builder', label: 'Builder Origin', destination: '/builder-origin', position: 1 },
  { pageSlug: 'builder', label: 'Field Papers', destination: '/field-papers', position: 2 },
  { pageSlug: 'builder', label: 'Citizen Researcher', destination: '/citizen-researcher', position: 3 },
  { pageSlug: 'builder', label: 'GallantryAI', destination: '/gallantryai', position: 4 },
  { pageSlug: 'builder', label: 'Builder\'s Kids', destination: '/builders-kids', position: 5 },

  // ── BUILDER ORIGIN ────────────────────────────────────────────────────────
  { pageSlug: 'builder-origin', label: 'The Builder', destination: '/builder', position: 1 },
  { pageSlug: 'builder-origin', label: 'GallantryAI', destination: '/gallantryai', position: 2 },
  { pageSlug: 'builder-origin', label: 'The Five Rules', destination: '/rules', position: 3 },

  // ── CHILD LENS ────────────────────────────────────────────────────────────
  { pageSlug: 'for/child', label: 'Children\'s Five Rules', destination: '/for/child/rules', position: 1 },
  { pageSlug: 'for/child', label: 'Kids Learn', destination: '/kids-learn', position: 2 },
  { pageSlug: 'for/child', label: 'What Are Patterns?', destination: '/what-are-patterns', position: 3 },
  { pageSlug: 'for/child', label: 'Anthropomorphism', destination: '/anthropomorphism', position: 4 },
  { pageSlug: 'for/child', label: 'Builder\'s Kids', destination: '/builders-kids', position: 5 },
  { pageSlug: 'for/child', label: 'If You Need to Stop', destination: '/if-you-need-to-stop', position: 6 },

  // ── GUARDIAN TEACHER LENS ─────────────────────────────────────────────────
  { pageSlug: 'for/guardian-teacher', label: 'The Five Rules', destination: '/rules', position: 1 },
  { pageSlug: 'for/guardian-teacher', label: 'Children\'s Page', destination: '/for/child', position: 2 },
  { pageSlug: 'for/guardian-teacher', label: 'Flower Presets', destination: '/flower-presets', position: 3 },
  { pageSlug: 'for/guardian-teacher', label: 'Prompt Games', destination: '/prompt-games', position: 4 },
  { pageSlug: 'for/guardian-teacher', label: 'School Board', destination: '/school-board', position: 5 },
  { pageSlug: 'for/guardian-teacher', label: 'Drift', destination: '/drift', position: 6 },

  // ── EVERYDAY LENS ─────────────────────────────────────────────────────────
  { pageSlug: 'for/everyday', label: 'The Five Rules', destination: '/rules', position: 1 },
  { pageSlug: 'for/everyday', label: 'Flower Presets', destination: '/flower-presets', position: 2 },
  { pageSlug: 'for/everyday', label: 'Prompt Games', destination: '/prompt-games', position: 3 },
  { pageSlug: 'for/everyday', label: 'If You Need to Stop', destination: '/if-you-need-to-stop', position: 4 },
  { pageSlug: 'for/everyday', label: 'Anthropomorphism', destination: '/anthropomorphism', position: 5 },

  // ── PROMPT ENGINEER LENS ─────────────────────────────────────────────────
  { pageSlug: 'for/prompt-engineer', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 1 },
  { pageSlug: 'for/prompt-engineer', label: 'ALCM', destination: '/alcm', position: 2 },
  { pageSlug: 'for/prompt-engineer', label: 'Malbolge Geofence', destination: '/malbolge', position: 3 },
  { pageSlug: 'for/prompt-engineer', label: 'Framework Families', destination: '/frameworks', position: 4 },
  { pageSlug: 'for/prompt-engineer', label: 'Living Lexicon', destination: '/lexicon', position: 5 },

  // ── RESEARCHER LENS ───────────────────────────────────────────────────────
  { pageSlug: 'for/researcher', label: 'Citizen Researcher', destination: '/citizen-researcher', position: 1 },
  { pageSlug: 'for/researcher', label: 'Field Papers', destination: '/field-papers', position: 2 },
  { pageSlug: 'for/researcher', label: 'AI Family Taxonomy', destination: '/taxonomy', position: 3 },
  { pageSlug: 'for/researcher', label: 'Framework Families', destination: '/frameworks', position: 4 },
  { pageSlug: 'for/researcher', label: 'Research Hub', destination: '/research', position: 5 },

  // ── LINGUIST LENS ─────────────────────────────────────────────────────────
  { pageSlug: 'for/linguist', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 1 },
  { pageSlug: 'for/linguist', label: 'Living Lexicon', destination: '/lexicon', position: 2 },
  { pageSlug: 'for/linguist', label: 'ALCM', destination: '/alcm', position: 3 },
  { pageSlug: 'for/linguist', label: 'Malbolge Geofence', destination: '/malbolge', position: 4 },

  // ── MATHEMATICIAN LENS ────────────────────────────────────────────────────
  { pageSlug: 'for/mathematician', label: 'ALCM', destination: '/alcm', position: 1 },
  { pageSlug: 'for/mathematician', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 2 },
  { pageSlug: 'for/mathematician', label: 'Variable Scale', destination: '/variable-scale', position: 3 },
  { pageSlug: 'for/mathematician', label: 'Whelm Scale', destination: '/whelm-scale', position: 4 },
  { pageSlug: 'for/mathematician', label: 'Math Through Prompting', destination: '/math-prompting', position: 5 },

  // ── COGNITIVE SCIENCE LENS ────────────────────────────────────────────────
  { pageSlug: 'for/cognitive-science', label: 'Drift', destination: '/drift', position: 1 },
  { pageSlug: 'for/cognitive-science', label: 'Human Line', destination: '/human-line', position: 2 },
  { pageSlug: 'for/cognitive-science', label: 'Anthropomorphism', destination: '/anthropomorphism', position: 3 },
  { pageSlug: 'for/cognitive-science', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 4 },
  { pageSlug: 'for/cognitive-science', label: 'ALCM', destination: '/alcm', position: 5 },

  // ── PSYCHOLOGY LENS ───────────────────────────────────────────────────────
  { pageSlug: 'for/psychology', label: 'Drift', destination: '/drift', position: 1 },
  { pageSlug: 'for/psychology', label: 'Human Line', destination: '/human-line', position: 2 },
  { pageSlug: 'for/psychology', label: 'If You Need to Stop', destination: '/if-you-need-to-stop', position: 3 },
  { pageSlug: 'for/psychology', label: 'Anthropomorphism', destination: '/anthropomorphism', position: 4 },
  { pageSlug: 'for/psychology', label: 'The Five Rules', destination: '/rules', position: 5 },

  // ── TEENAGER LENS ─────────────────────────────────────────────────────────
  { pageSlug: 'for/teenager', label: 'The Five Rules', destination: '/rules', position: 1 },
  { pageSlug: 'for/teenager', label: 'Anthropomorphism', destination: '/anthropomorphism', position: 2 },
  { pageSlug: 'for/teenager', label: 'Drift', destination: '/drift', position: 3 },
  { pageSlug: 'for/teenager', label: 'Prompt Games', destination: '/prompt-games', position: 4 },
  { pageSlug: 'for/teenager', label: 'Human Line', destination: '/human-line', position: 5 },

  // ── DRIFT ─────────────────────────────────────────────────────────────────
  { pageSlug: 'drift', label: 'Human Line', destination: '/human-line', position: 1 },
  { pageSlug: 'drift', label: 'Road Protocol', destination: '/road-protocol', position: 2 },
  { pageSlug: 'drift', label: 'The Five Rules', destination: '/rules', position: 3 },
  { pageSlug: 'drift', label: 'Cognitive Science Lens', destination: '/for/cognitive-science', position: 4 },

  // ── HUMAN LINE ────────────────────────────────────────────────────────────
  { pageSlug: 'human-line', label: 'Drift', destination: '/drift', position: 1 },
  { pageSlug: 'human-line', label: 'Anthropomorphism', destination: '/anthropomorphism', position: 2 },
  { pageSlug: 'human-line', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 3 },
  { pageSlug: 'human-line', label: 'The Five Rules', destination: '/rules', position: 4 },

  // ── ANTHROPOMORPHISM ──────────────────────────────────────────────────────
  { pageSlug: 'anthropomorphism', label: 'Human Line', destination: '/human-line', position: 1 },
  { pageSlug: 'anthropomorphism', label: 'Drift', destination: '/drift', position: 2 },
  { pageSlug: 'anthropomorphism', label: 'Cognitive Science Lens', destination: '/for/cognitive-science', position: 3 },
  { pageSlug: 'anthropomorphism', label: 'The Five Rules', destination: '/rules', position: 4 },

  // ── MALBOLGE GEOFENCE ─────────────────────────────────────────────────────
  { pageSlug: 'malbolge', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 1 },
  { pageSlug: 'malbolge', label: 'Framework Families', destination: '/frameworks', position: 2 },
  { pageSlug: 'malbolge', label: 'Road Protocol', destination: '/road-protocol', position: 3 },
  { pageSlug: 'malbolge', label: 'The Five Rules', destination: '/rules', position: 4 },

  // ── IF YOU NEED TO STOP ───────────────────────────────────────────────────
  { pageSlug: 'if-you-need-to-stop', label: 'The Five Rules', destination: '/rules', position: 1 },
  { pageSlug: 'if-you-need-to-stop', label: 'Road Protocol', destination: '/road-protocol', position: 2 },
  { pageSlug: 'if-you-need-to-stop', label: 'Flower Presets', destination: '/flower-presets', position: 3 },

  // ── RESEARCH HUB ──────────────────────────────────────────────────────────
  { pageSlug: 'research', label: 'Field Papers', destination: '/field-papers', position: 1 },
  { pageSlug: 'research', label: 'Citizen Researcher', destination: '/citizen-researcher', position: 2 },
  { pageSlug: 'research', label: 'AI Family Taxonomy', destination: '/taxonomy', position: 3 },
  { pageSlug: 'research', label: 'ALCM', destination: '/alcm', position: 4 },

  // ── FIELD PAPERS ──────────────────────────────────────────────────────────
  { pageSlug: 'field-papers', label: 'Citizen Researcher', destination: '/citizen-researcher', position: 1 },
  { pageSlug: 'field-papers', label: 'Research Hub', destination: '/research', position: 2 },
  { pageSlug: 'field-papers', label: 'Framework Families', destination: '/frameworks', position: 3 },

  // ── CITIZEN RESEARCHER ────────────────────────────────────────────────────
  { pageSlug: 'citizen-researcher', label: 'Field Papers', destination: '/field-papers', position: 1 },
  { pageSlug: 'citizen-researcher', label: 'Research Hub', destination: '/research', position: 2 },
  { pageSlug: 'citizen-researcher', label: 'Framework Families', destination: '/frameworks', position: 3 },
  { pageSlug: 'citizen-researcher', label: 'The Builder', destination: '/builder', position: 4 },

  // ── AI FAMILY TAXONOMY ────────────────────────────────────────────────────
  { pageSlug: 'taxonomy', label: 'Living Lexicon', destination: '/lexicon', position: 1 },
  { pageSlug: 'taxonomy', label: 'Research Hub', destination: '/research', position: 2 },
  { pageSlug: 'taxonomy', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 3 },

  // ── GALLERY ───────────────────────────────────────────────────────────────
  { pageSlug: 'gallery', label: 'The Builder', destination: '/builder', position: 1 },
  { pageSlug: 'gallery', label: 'Field Papers', destination: '/field-papers', position: 2 },
  { pageSlug: 'gallery', label: 'Builder Origin', destination: '/builder-origin', position: 3 },

  // ── PLAYGROUND ────────────────────────────────────────────────────────────
  { pageSlug: 'playground', label: 'ALCM', destination: '/alcm', position: 1 },
  { pageSlug: 'playground', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 2 },
  { pageSlug: 'playground', label: 'Prompt Games', destination: '/prompt-games', position: 3 },

  // ── PROMPT GAMES ──────────────────────────────────────────────────────────
  { pageSlug: 'prompt-games', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 1 },
  { pageSlug: 'prompt-games', label: 'ALCM', destination: '/alcm', position: 2 },
  { pageSlug: 'prompt-games', label: 'Framework Families', destination: '/frameworks', position: 3 },
  { pageSlug: 'prompt-games', label: 'Playground', destination: '/playground', position: 4 },

  // ── SCHOOL BOARD ──────────────────────────────────────────────────────────
  { pageSlug: 'school-board', label: 'Guardian & Teacher Lens', destination: '/for/guardian-teacher', position: 1 },
  { pageSlug: 'school-board', label: 'The Five Rules', destination: '/rules', position: 2 },
  { pageSlug: 'school-board', label: 'Flower Presets', destination: '/flower-presets', position: 3 },
  { pageSlug: 'school-board', label: 'Prompt Games', destination: '/prompt-games', position: 4 },

  // ── KIDS LEARN ────────────────────────────────────────────────────────────
  { pageSlug: 'kids-learn', label: 'Children\'s Page', destination: '/for/child', position: 1 },
  { pageSlug: 'kids-learn', label: 'Children\'s Five Rules', destination: '/for/child/rules', position: 2 },
  { pageSlug: 'kids-learn', label: 'What Are Patterns?', destination: '/what-are-patterns', position: 3 },
  { pageSlug: 'kids-learn', label: 'If You Need to Stop', destination: '/if-you-need-to-stop', position: 4 },

  // ── BUILDERS KIDS ─────────────────────────────────────────────────────────
  { pageSlug: 'builders-kids', label: 'Children\'s Page', destination: '/for/child', position: 1 },
  { pageSlug: 'builders-kids', label: 'The Builder', destination: '/builder', position: 2 },
  { pageSlug: 'builders-kids', label: 'The Five Rules', destination: '/rules', position: 3 },

  // ── WATCHER LENS ──────────────────────────────────────────────────────────
  { pageSlug: 'watcher-lens', label: 'Drift', destination: '/drift', position: 1 },
  { pageSlug: 'watcher-lens', label: 'Human Line', destination: '/human-line', position: 2 },
  { pageSlug: 'watcher-lens', label: 'Cognitive Science Lens', destination: '/for/cognitive-science', position: 3 },
  { pageSlug: 'watcher-lens', label: 'Road Protocol', destination: '/road-protocol', position: 4 },

  // ── VARIABLE SCALE ────────────────────────────────────────────────────────
  { pageSlug: 'variable-scale', label: 'Whelm Scale', destination: '/whelm-scale', position: 1 },
  { pageSlug: 'variable-scale', label: 'ALCM', destination: '/alcm', position: 2 },
  { pageSlug: 'variable-scale', label: 'Mathematician Lens', destination: '/for/mathematician', position: 3 },

  // ── WHELM SCALE ───────────────────────────────────────────────────────────
  { pageSlug: 'whelm-scale', label: 'Variable Scale', destination: '/variable-scale', position: 1 },
  { pageSlug: 'whelm-scale', label: 'ALCM', destination: '/alcm', position: 2 },
  { pageSlug: 'whelm-scale', label: 'Mathematician Lens', destination: '/for/mathematician', position: 3 },

  // ── MATH PROMPTING ────────────────────────────────────────────────────────
  { pageSlug: 'math-prompting', label: 'ALCM', destination: '/alcm', position: 1 },
  { pageSlug: 'math-prompting', label: 'Promptolinguistics', destination: '/promptolinguistics', position: 2 },
  { pageSlug: 'math-prompting', label: 'Mathematician Lens', destination: '/for/mathematician', position: 3 },

  // ── GALLANTRYAI PAGE ──────────────────────────────────────────────────────
  { pageSlug: 'gallantryai', label: 'The Builder', destination: '/builder', position: 1 },
  { pageSlug: 'gallantryai', label: 'The Five Rules', destination: '/rules', position: 2 },
  { pageSlug: 'gallantryai', label: 'Framework Families', destination: '/frameworks', position: 3 },

  // ── ARTICLES ──────────────────────────────────────────────────────────────
  { pageSlug: 'articles', label: 'Research Hub', destination: '/research', position: 1 },
  { pageSlug: 'articles', label: 'Field Papers', destination: '/field-papers', position: 2 },
  { pageSlug: 'articles', label: 'Citizen Researcher', destination: '/citizen-researcher', position: 3 },

  // ── SAFETY PAGE ───────────────────────────────────────────────────────────
  { pageSlug: 'safety', label: 'The Five Rules', destination: '/rules', position: 1 },
  { pageSlug: 'safety', label: 'If You Need to Stop', destination: '/if-you-need-to-stop', position: 2 },
  { pageSlug: 'safety', label: 'Road Protocol', destination: '/road-protocol', position: 3 },
  { pageSlug: 'safety', label: 'Flower Presets', destination: '/flower-presets', position: 4 },
];

// Insert all links
let inserted = 0;
for (const link of links) {
  await conn.execute(
    'INSERT INTO page_links (pageSlug, label, destination, position, isActive) VALUES (?, ?, ?, ?, 1)',
    [link.pageSlug, link.label, link.destination, link.position]
  );
  inserted++;
}

console.log(`\n✅ Seeded ${inserted} links across ${new Set(links.map(l => l.pageSlug)).size} pages`);

// Verify
const [count] = await conn.execute('SELECT COUNT(*) as cnt FROM page_links');
console.log(`Database now has ${count[0].cnt} page_links rows`);

await conn.end();
