/**
 * migrate-frameworks.mjs
 * Seeds Frameworks family items into content_blocks.
 * Additive only.
 */

import { createConnection } from 'mysql2/promise';
import 'dotenv/config';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD';

// All framework items flattened with a unique cardId
const frameworkItems = [
  { cardId: 'flowers-accessibility', heading: 'Cognitive Accessibility Presets', body: '12 flowers matched to cognitive and emotional needs: Amaryllis (ADHD/Focus), Snapdragon (Autism/Directness), Snowdrop (Anxiety/Ease), Hyacinth (Dyslexia/Visual), Foxglove (Chronic Pain/Energy), Dandelion (Executive Dysfunction), White Poppy (PTSD/Safe Space), Zinnia (Memory/Dementia), Gladiolus (TBI/Processing), Pansy (Sensory Overload), Wisteria (Depression/Support), Tiger Lily (Gifted-2E/Complexity).', imageUrl: `${CDN}/flower-accessibility-presets_96e0cf1f.png`, linkUrl: '/flower-presets', linkLabel: 'Explore Flower Presets →' },
  { cardId: 'flowers-essence', heading: 'Essence Modulation', body: '12 flowers for tone: Lavender (Calm), Rose (Empathy), Sunflower (Motivate), Orchid (Refine), Lotus (Ground), Daisy (Simplify), Tulip (Balance), Jasmine (Persuade), Iris (Analyze), Peony (Enrich), Bluebell (Reassure), Chrysanthemum (Structure). Say the flower. The AI shifts tone.', imageUrl: `${CDN}/essence-modulation-12-flowers_f6e48b49.png`, linkUrl: '/flower-presets', linkLabel: 'Explore Flower Presets →' },
  { cardId: 'flowers-spectrum', heading: 'The 12-Essence Spectrum', body: 'The complete document rewriting system. Same input, twelve different outputs. Each essence transforms the material without changing the meaning. This is what modulation looks like at scale.', imageUrl: `${CDN}/12-essence-spectrum-complete_083ff007.png`, linkUrl: '/flower-presets', linkLabel: 'Explore Flower Presets →' },
  { cardId: 'animals-pecking', heading: 'The Pecking Order v3.0', body: 'Sheep (Soft & Kind) — gentle, supportive, no pressure. Rooster (Action & Hype) — energetic, direct, momentum-driven. Barn Owl (Wise & Analytical) — measured, evidence-based, patient. Pig (Logic & Rules) — structured, rule-following, no ambiguity.', imageUrl: `${CDN}/barnyard-pecking-order-v3_315af488.png`, linkUrl: '/taxonomy', linkLabel: 'Explore AI Taxonomy →' },
  { cardId: 'landscapes-cognition', heading: 'Landscape of Cognition v3.0', body: 'Misty Coast (Soft Landing) — ease into the subject. Volcano (Urgent Acceleration) — force and heat. Mountain Peak (High-Status Standard) — precision from altitude. Open Ocean (Structured Container) — vast but held.', imageUrl: `${CDN}/landscape-of-cognition-v3_c47b41ef.png`, linkUrl: '/promptolinguistics', linkLabel: 'Explore Promptolinguistics →' },
  { cardId: 'landscapes-vehicular', heading: 'Vehicular & Acceleration Modes v4.0', body: 'Drift (Soft Glide) — let it coast. Launch (Urgent Force) — full throttle. Climb (High-Status Persistence) — steady uphill. Ocean Cruise (Massive Container) — slow, enormous, deliberate.', imageUrl: `${CDN}/vehicular-acceleration-v4_592e2c6f.png`, linkUrl: '/promptolinguistics', linkLabel: 'Explore Promptolinguistics →' },
  { cardId: 'harvest-cognitive', heading: 'Cognitive Harvest v7.0', body: 'Strawberry (Soft/Sensory) — gentle sensory-aware support. Orange (Mobility/Physical) — practical, movement-focused. Green Apple (Cognitive/Intellectual) — clear, structured thinking support. Grape Cluster (Communication/Speech) — patient, multi-path communication.', imageUrl: `${CDN}/cognitive-harvest-disability-v7_26a1b821.png`, linkUrl: '/flower-presets', linkLabel: 'Explore Flower Presets →' },
  { cardId: 'pathways-geometry', heading: 'Geometry of Insight: 5 Pathways', body: 'The Skip — insight through harmony, not force. The Loose — precision from alignment before release. The Dream — insight arrives when conditions are ready. The Pop — collapse is the reveal. The Forge — shared heat between human and AI.', imageUrl: `${CDN}/geometry-of-insight-5-pathways_666fcf61.png`, linkUrl: '/citizen-researcher', linkLabel: 'Explore Citizen Researcher →' },
  { cardId: 'pathways-action', heading: 'Action Card Dashboard', body: 'The same five pathways as interactive action cards. Each card shows the input condition, the pathway mechanic, and the expected output. Use when you know what you have and need to know where to take it.', imageUrl: `${CDN}/action-card-dashboard-5-pathways_363a3e2e.png`, linkUrl: '/citizen-researcher', linkLabel: 'Explore Citizen Researcher →' },
  { cardId: 'seasons-framework', heading: 'Framework of the Seasons', body: 'Spring (Generate) — open, expansive, new growth. Summer (Execute) — full power, build and deliver. Autumn (Cut) — prune, decide, remove what does not serve. Winter (Consolidate) — rest, review, prepare for the next cycle. Season = direction. Weather = condition. Together = control.', imageUrl: `${CDN}/seasons-framework-dark_2483ec58.png`, linkUrl: '/promptolinguistics', linkLabel: 'Explore Promptolinguistics →' },
];

async function run() {
  const conn = await createConnection(process.env.DATABASE_URL);

  const [existing] = await conn.execute(
    `SELECT content FROM content_blocks WHERE pageSlug = 'frameworks' AND blockType = 'card'`
  );
  const existingIds = existing.map(r => {
    try { return JSON.parse(r.content).cardId; } catch { return null; }
  }).filter(Boolean);

  let added = 0, skipped = 0;
  for (let i = 0; i < frameworkItems.length; i++) {
    const item = frameworkItems[i];
    if (existingIds.includes(item.cardId)) { skipped++; continue; }
    const content = JSON.stringify(item);
    await conn.execute(
      `INSERT INTO content_blocks (pageSlug, blockType, position, content, createdAt, updatedAt)
       VALUES ('frameworks', 'card', ?, ?, NOW(), NOW())`,
      [i + 1, content]
    );
    added++;
    console.log(`  added: ${item.cardId}`);
  }

  console.log(`\nframeworks: added ${added}, skipped ${skipped}`);
  await conn.end();
}

run().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
