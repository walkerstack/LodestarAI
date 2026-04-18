/**
 * migrate-gallery-frameworks.mjs
 * Seeds Gallery images and Frameworks cards into content_blocks.
 * Additive only — never deletes existing records.
 */

import { createConnection } from 'mysql2/promise';
import 'dotenv/config';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD';

const galleryImages = [
  { id: 1, src: `${CDN}/1000005693_e894b781.jpg`, title: 'Atomic Language Control Model', tag: 'ALCM', desc: 'The ALCM diagram — how individual words function as control dials within a prompt.' },
  { id: 2, src: `${CDN}/1000005844_96fb30c8.png`, title: 'AI Steering — Simple Model', tag: 'FRAMEWORK', desc: 'Simplified visual of the GallantryAI steering framework.' },
  { id: 3, src: `${CDN}/1000005860_c6f6c0a8.jpg`, title: 'RLHF vs. GallantryAI', tag: 'RESEARCH', desc: 'Comparison of RLHF and the GallantryAI governance model.' },
  { id: 4, src: `${CDN}/1000006151_42d3ec3d.jpg`, title: 'Human Drift Governance Paradigm', tag: 'FRAMEWORK', desc: 'The Human Drift model — what happens when the watcher stops watching.' },
  { id: 5, src: `${CDN}/1000006152_6286ee82.png`, title: 'Megaphone Diagram', tag: 'VISUAL', desc: 'Visual metaphor for how prompts amplify the human voice into AI output.' },
  { id: 6, src: `${CDN}/1000008068_8df4a03f.jpg`, title: 'Professional Research Visual', tag: 'RESEARCH', desc: 'Field research documentation — professional register.' },
  { id: 7, src: `${CDN}/1000008840_5b1a6230.png`, title: 'Little AI Field Guide', tag: 'CHILDREN', desc: 'Children\'s version of the GallantryAI framework — illustrated, warm, honest.' },
  { id: 8, src: `${CDN}/1000008720_722cab58.png`, title: 'Dark Research Visual I', tag: 'RESEARCH', desc: 'Cinematic research documentation — dark register.' },
  { id: 9, src: `${CDN}/1000008721_fa375364.png`, title: 'Dark Research Visual II', tag: 'RESEARCH', desc: 'Cinematic research documentation — dark register.' },
  { id: 10, src: `${CDN}/1000007496_72281e87.jpg`, title: 'Field Guide — Antique Register I', tag: 'FIELD GUIDE', desc: 'Antique/parchment register — the scroll-and-banner visual tradition.' },
  { id: 11, src: `${CDN}/1000007514_9e0904cc.jpg`, title: 'Field Guide — Antique Register II', tag: 'FIELD GUIDE', desc: 'Antique/parchment register — compass and aged document aesthetic.' },
  { id: 12, src: `${CDN}/1000008740_d2ac3f98.png`, title: 'Little AI Field Guide Cover', tag: 'CHILDREN', desc: 'Field Guide cover — sloth with glasses and a kid. The entry point for children.' },
  { id: 13, src: `${CDN}/1000008728_a5deb072.png`, title: 'Beating Tricky AI Patterns — The Sloth Trick', tag: 'CHILDREN', desc: 'How to slow down and spot when AI is being tricky.' },
  { id: 14, src: `${CDN}/1000008721_99c2f0db.png`, title: 'Remember — You Are In Charge', tag: 'CHILDREN', desc: 'AI cannot feel. You are the one who decides.' },
  { id: 15, src: `${CDN}/1000008720_800863cc.png`, title: 'What Can You Do With AI?', tag: 'CHILDREN', desc: 'User. Builder. Painter. Lion Tamer. Four roles a young person can take with AI.' },
  { id: 16, src: `${CDN}/1000008706_916d1099.png`, title: 'Family Around a Lantern', tag: 'CHILDREN', desc: 'Multi-generational warmth. A family gathered around light.' },
  { id: 17, src: `${CDN}/1000008702_ed6d31fb.png`, title: 'Kids Don\'t Understand AI — But They Understand Colors', tag: 'VISUAL', desc: 'Six color modes for understanding AI behavior.' },
  { id: 18, src: `${CDN}/1000008699_7fca0f91.png`, title: 'Color System Slide Deck — Full Framework', tag: 'FRAMEWORK', desc: 'The full Color/Tone/Metaphor framework for making AI behavior visible to children.' },
  { id: 19, src: `${CDN}/1000008684_20993d6e.png`, title: 'Finding Our Common Pulse', tag: 'RESEARCH', desc: 'Seeing the Truth. Getting it Right. Sharing the Idea. Reaching Consensus.' },
  { id: 20, src: `${CDN}/1000008660_073fd0b8.png`, title: 'The All-Perspectives Audit', tag: 'RESEARCH', desc: 'R-value: 98.7% correlation. The human foundation. Street-legal auditing for families.' },
  { id: 21, src: `${CDN}/1000008218_6cc748c7.png`, title: 'Pie in the Sky', tag: 'FIELD GUIDE', desc: 'Low. Mid. High. A visual framework for AI risk levels.' },
];

async function seedPage(conn, pageSlug, items, idField, titleField, bodyField, imageField, linkField) {
  const [existing] = await conn.execute(
    `SELECT content FROM content_blocks WHERE pageSlug = ? AND blockType = 'card'`,
    [pageSlug]
  );
  const existingIds = existing.map(r => {
    try { return JSON.parse(r.content).cardId; } catch { return null; }
  }).filter(Boolean);

  let added = 0, skipped = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const cardId = String(item[idField]);
    if (existingIds.includes(cardId)) { skipped++; continue; }
    const content = JSON.stringify({
      cardId,
      heading: item[titleField],
      body: item[bodyField],
      imageUrl: item[imageField] || null,
      linkUrl: item[linkField] || null,
      linkLabel: item[linkField] ? 'View →' : null,
    });
    await conn.execute(
      `INSERT INTO content_blocks (pageSlug, blockType, position, content, createdAt, updatedAt)
       VALUES (?, 'card', ?, ?, NOW(), NOW())`,
      [pageSlug, i + 1, content]
    );
    added++;
  }
  console.log(`${pageSlug}: added ${added}, skipped ${skipped}`);
}

async function run() {
  const conn = await createConnection(process.env.DATABASE_URL);

  // Gallery — image cards
  await seedPage(conn, 'gallery', galleryImages, 'id', 'title', 'desc', 'src', null);

  await conn.end();
  console.log('Done.');
}

run().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
