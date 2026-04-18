/**
 * seed-learning-flow.mjs
 * Seeds the learning_flow table from the existing learningFlowMap data.
 * Each page gets one row: deeperSlug (first deeper href), widerSlug (first wider href), simplerSlug (first simpler href).
 * Run: node scripts/seed-learning-flow.mjs
 */

import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

// Map from flowMap key → page slug (as used in the DB)
// The flowMap uses camelCase keys; we need the URL slug
const keyToSlug = {
  alcm: "alcm",
  whelmScale: "whelm-scale",
  variableScale: "variable-scale",
  roadProtocol: "road-protocol",
  fiveRules: "rules",
  promptolinguistics: "promptolinguistics",
  frameworks: "frameworks",
  promptGames: "prompt-games",
  flowerPresets: "flower-presets",
  taxonomy: "taxonomy",
  lexicon: "lexicon",
  everyday: "for/everyday",
  child: "for/child",
  teenager: "for/teenager",
  drift: "drift",
  euAiAct: "eu-ai-act",
  whatClaudeAdmitted: "what-claude-admitted",
  openDoor: "open-door",
  guardianTeacher: "for/guardian-teacher",
  researchHub: "research-hub",
  counterArguments: "counter-arguments",
  screenshotSharing: "screenshot-sharing",
  fieldReportReview: "field-report-review",
  whatTheAiSaid: "what-the-ai-said",
  buildersKids: "builders-kids",
  anthropomorphism: "anthropomorphism",
  psychology: "for/psychology",
  cognitiveScience: "for/cognitive-science",
  researcher: "for/researcher",
  promptEngineer: "for/prompt-engineer",
  linguist: "for/linguist",
  mathematician: "for/mathematician",
  builder: "builder",
  builderOrigin: "builder-origin",
  citizenResearcher: "citizen-researcher",
  gallery: "gallery",
  humanLine: "human-line",
  kidsLearn: "kids-learn",
  malbolge: "malbolge",
  mathPrompting: "math-prompting",
  playground: "playground",
  safety: "if-you-need-to-stop",
  scaffold: "scaffold",
  schoolBoard: "school-board",
  articles: "articles",
  watcher: "for/watcher",
};

// Extract just the slug from an href like "/rules" → "rules", "/for/child" → "for/child"
function hrefToSlug(href) {
  return href.replace(/^\//, "");
}

// The flow data — first entry of each direction becomes the DB slug
const flowData = {
  alcm: { deeper: "/promptolinguistics", wider: "/road-protocol", simpler: "/rules" },
  "whelm-scale": { deeper: "/variable-scale", wider: "/alcm", simpler: "/rules" },
  "variable-scale": { deeper: "/alcm", wider: "/whelm-scale", simpler: "/rules" },
  "road-protocol": { deeper: "/alcm", wider: "/frameworks", simpler: "/rules" },
  rules: { deeper: "/road-protocol", wider: "/prompt-games", simpler: "/for/child" },
  promptolinguistics: { deeper: "/alcm", wider: "/prompt-games", simpler: "/rules" },
  frameworks: { deeper: "/alcm", wider: "/road-protocol", simpler: "/rules" },
  "prompt-games": { deeper: "/promptolinguistics", wider: "/flower-presets", simpler: "/rules" },
  "flower-presets": { deeper: "/whelm-scale", wider: "/prompt-games", simpler: "/for/everyday" },
  taxonomy: { deeper: "/alcm", wider: "/prompt-games", simpler: "/rules" },
  lexicon: { deeper: "/alcm", wider: "/frameworks", simpler: "/rules" },
  "for/everyday": { deeper: "/rules", wider: "/prompt-games", simpler: null },
  "for/child": { deeper: "/rules", wider: "/prompt-games", simpler: null },
  "for/teenager": { deeper: "/promptolinguistics", wider: "/for/everyday", simpler: "/for/child" },
  drift: { deeper: "/for/watcher", wider: "/road-protocol", simpler: "/rules" },
  "eu-ai-act": { deeper: "/user-governance", wider: "/road-protocol", simpler: "/rules" },
  "what-claude-admitted": { deeper: "/alcm", wider: "/eu-ai-act", simpler: "/rules" },
  "open-door": { deeper: "/what-claude-admitted", wider: "/builder", simpler: "/rules" },
  "for/guardian-teacher": { deeper: "/road-protocol", wider: "/for/child", simpler: "/rules" },
  "research-hub": { deeper: "/field-papers", wider: "/what-claude-admitted", simpler: "/three-voices" },
  "counter-arguments": { deeper: "/research-hub", wider: "/open-door", simpler: "/rules" },
  "screenshot-sharing": { deeper: "/user-governance", wider: "/road-protocol", simpler: "/for/everyday" },
  "field-report-review": { deeper: "/research-hub", wider: "/citizen-researcher", simpler: "/three-voices" },
  "what-the-ai-said": { deeper: "/what-claude-admitted", wider: "/human-line", simpler: "/rules" },
  "builders-kids": { deeper: "/anthropomorphism", wider: "/for/everyday", simpler: "/for/child" },
  anthropomorphism: { deeper: "/drift", wider: "/rules", simpler: "/for/child" },
  "for/psychology": { deeper: "/drift", wider: "/for/cognitive-science", simpler: "/for/everyday" },
  "for/cognitive-science": { deeper: "/drift", wider: "/for/psychology", simpler: "/for/everyday" },
  "for/researcher": { deeper: "/drift", wider: "/field-papers", simpler: "/for/everyday" },
  "for/prompt-engineer": { deeper: "/drift", wider: "/promptolinguistics", simpler: "/for/everyday" },
  "for/linguist": { deeper: "/drift", wider: "/lexicon", simpler: "/for/everyday" },
  "for/mathematician": { deeper: "/drift", wider: "/alcm", simpler: "/for/everyday" },
  builder: { deeper: "/field-papers", wider: "/builder-origin", simpler: "/rules" },
  "builder-origin": { deeper: "/builder", wider: "/builders-kids", simpler: "/rules" },
  "citizen-researcher": { deeper: "/field-papers", wider: "/builder", simpler: "/rules" },
  gallery: { deeper: "/field-papers", wider: "/research-hub", simpler: "/rules" },
  "human-line": { deeper: "/drift", wider: "/rules", simpler: "/for/everyday" },
  "kids-learn": { deeper: "/for/child", wider: "/rules", simpler: "/for/child" },
  malbolge: { deeper: "/promptolinguistics", wider: "/drift", simpler: "/rules" },
  "math-prompting": { deeper: "/alcm", wider: "/for/mathematician", simpler: "/rules" },
  playground: { deeper: "/promptolinguistics", wider: "/prompt-games", simpler: "/prompt-games" },
  "if-you-need-to-stop": { deeper: "/rules", wider: "/flower-presets", simpler: "/rules" },
  scaffold: { deeper: "/frameworks", wider: "/rules", simpler: "/rules" },
  "school-board": { deeper: "/for/guardian-teacher", wider: "/kids-learn", simpler: "/rules" },
  articles: { deeper: "/field-papers", wider: "/research-hub", simpler: "/rules" },
  "for/watcher": { deeper: "/drift", wider: "/rules", simpler: "/for/everyday" },
  // Additional pages
  "gallantry-ai": { deeper: "/alcm", wider: "/builder", simpler: "/rules" },
  "three-voices": { deeper: "/promptolinguistics", wider: "/lexicon", simpler: "/rules" },
  "user-governance": { deeper: "/eu-ai-act", wider: "/road-protocol", simpler: "/rules" },
  "dual-strategy": { deeper: "/eu-ai-act", wider: "/user-governance", simpler: "/rules" },
  "field-papers": { deeper: "/citizen-researcher", wider: "/research-hub", simpler: "/rules" },
  "hallucinations": { deeper: "/drift", wider: "/anthropomorphism", simpler: "/rules" },
  "prompts": { deeper: "/promptolinguistics", wider: "/prompt-games", simpler: "/rules" },
  "builders-kids": { deeper: "/anthropomorphism", wider: "/for/everyday", simpler: "/for/child" },
};

async function main() {
  const conn = await mysql.createConnection(DB_URL);

  // Clear existing
  await conn.execute("DELETE FROM learning_flow");
  console.log("Cleared existing learning_flow rows");

  let count = 0;
  for (const [pageSlug, links] of Object.entries(flowData)) {
    const deeperSlug = links.deeper ? hrefToSlug(links.deeper) : null;
    const widerSlug = links.wider ? hrefToSlug(links.wider) : null;
    const simplerSlug = links.simpler ? hrefToSlug(links.simpler) : null;

    await conn.execute(
      "INSERT INTO learning_flow (pageSlug, deeperSlug, widerSlug, simplerSlug) VALUES (?, ?, ?, ?)",
      [pageSlug, deeperSlug, widerSlug, simplerSlug]
    );
    count++;
  }

  console.log(`✅ Seeded ${count} learning flow rows`);
  await conn.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
