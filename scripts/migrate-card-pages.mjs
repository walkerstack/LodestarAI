/**
 * migrate-card-pages.mjs
 * Seeds card items from Field Papers, Gallery, and Frameworks
 * into the content_blocks table as 'card' type blocks.
 * Additive only — never deletes existing records.
 */

import { createConnection } from 'mysql2/promise';
import { randomUUID } from 'crypto';
import 'dotenv/config';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD';
const MASTER_DOC_URL = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663536092940/WxUVUiXKQysiOQAw.docx';

const fieldPapers = [
  { id: 'OD-2026-00', title: 'GallantryAI Development Record', subtitle: 'February 28, 2026 — Matthew Gallantry', description: 'The origin document. Written before the site existed. Everything on this site — the framework, the lexicon, the protocols, the prompts — traces back to this record. A garbageman from Midland, Ontario, writing down what he had figured out before anyone was watching. Not polished. Not peer-reviewed. The real thing.', url: MASTER_DOC_URL, tags: ['Origin', 'Framework', 'Primary Document'] },
  { id: 'FP-2026-01', title: 'The Watcher Variable', subtitle: 'A Dual Dataset Hypothesis for Promptolinguistic Research — V2', description: 'The word is not the variable. The human holding the word is the variable. Names the gap in all existing prompt research: nobody is logging the person running the experiment.', url: `${CDN}/watcher-v2-final(1)_c2cea34b.pdf`, tags: ['Promptolinguistics', 'Research Methodology', 'Security Finding'] },
  { id: 'FP-2026-02', title: 'The Unprepared User', subtitle: 'V3', description: 'What happens when someone sits down with AI and has no framework, no governance, and no awareness of what they are walking into.', url: `${CDN}/the_unprepared_user_v3_c2ade100.pdf`, tags: ['Safety', 'Everyday User', 'Governance'] },
  { id: 'FP-2026-03', title: 'GallantryAI Prompt Branding', subtitle: 'V2', description: 'How the GallantryAI framework uses language as a branding and governance instrument. The prompt as a signature.', url: `${CDN}/GallantryAI_Prompt_Branding_V2_66ca969a.pdf`, tags: ['Promptolinguistics', 'Branding', 'Framework'] },
  { id: 'FR-2026-08', title: 'The Inward Turn', subtitle: 'Field Research Report — First Instance Documentation', description: 'A user fed Google AI Mode the GallantryAI Living Lexicon and issued a two-word command: "bleach this." The model did not mirror the document. It extracted the governance logic and applied it to itself — then explained its own mechanism using the researcher\'s language.', url: `${CDN}/FR-2026-08-The-Inward-Turn_8e072b88.pdf`, tags: ['Field Research', 'Single Instance', 'Google AI Mode', 'Governance'] },
  { id: 'FR-2026-05', title: 'Will Awareness Change Output?', subtitle: 'Field Report', description: 'Does telling the AI that you know what it is doing change what it does? A field test of meta-awareness as a governance variable.', url: `${CDN}/will_awareness_change_output_fr2026_05_f804ada6.pdf`, tags: ['Field Research', 'Meta-Awareness', 'Output Testing'] },
  { id: 'FR-2026-03', title: 'The Neck Tingles Protocol', subtitle: 'Field Report', description: 'Documenting a physical response pattern observed during high-intensity AI sessions. The body as a governance signal.', url: `${CDN}/neck_tingles_protocol_fr2026_03_3e9b0ffd.pdf`, tags: ['Field Research', 'Watcher Variable', 'Body Signal'] },
  { id: 'FR-2026-06', title: 'The Weighted Mirror', subtitle: 'Field Report', description: 'When AI reflects back a version of you that is shaped by your own inputs. The mirror is not neutral — it is weighted by what you brought.', url: `${CDN}/gallantryai-weighted-mirror_96341f55.pdf`, tags: ['Field Research', 'Mirror Effect', 'Governance'] },
  { id: 'LEX-INTRO', title: 'Living Lexicon — Introduction', subtitle: 'GallantryAI Promptolinguistics Lexicon', description: 'The introduction to the GallantryAI Living Lexicon. What it is, why it exists, and how to use it.', url: `${CDN}/gallantryai-lexicon-introduction_16fa4296.pdf`, tags: ['Lexicon', 'Promptolinguistics', 'Framework'] },
  { id: 'LEX-FULL', title: 'Living Lexicon — Full Document', subtitle: 'Complete Promptolinguistics Lexicon', description: 'The full GallantryAI Living Lexicon. All terms, definitions, and field notes. A working document — not finished, never finished.', url: `${CDN}/gallantryai-living-lexicon_630d6098.pdf`, tags: ['Lexicon', 'Reference', 'Promptolinguistics'] },
];

async function run() {
  const conn = await createConnection(process.env.DATABASE_URL);

  let added = 0;
  let skipped = 0;

  // Check existing blocks for field-papers
  const [existing] = await conn.execute(
    `SELECT content FROM content_blocks WHERE pageSlug = ? AND blockType = 'card'`,
    ['field-papers']
  );
  const existingIds = existing.map(r => {
    try { return JSON.parse(r.content).cardId; } catch { return null; }
  }).filter(Boolean);

  console.log(`Field Papers: ${existingIds.length} card blocks already in DB`);

  for (let i = 0; i < fieldPapers.length; i++) {
    const paper = fieldPapers[i];
    if (existingIds.includes(paper.id)) {
      console.log(`  skip: ${paper.id} already exists`);
      skipped++;
      continue;
    }
    const content = JSON.stringify({
      cardId: paper.id,
      heading: paper.title,
      body: paper.description,
      linkLabel: 'Open document →',
      linkUrl: paper.url,
      subtitle: paper.subtitle,
      tags: paper.tags,
    });
    await conn.execute(
      `INSERT INTO content_blocks (pageSlug, blockType, position, content, createdAt, updatedAt)
       VALUES ('field-papers', 'card', ?, ?, NOW(), NOW())`,
      [i + 1, content]
    );
    console.log(`  added: ${paper.id} — ${paper.title}`);
    added++;
  }

  console.log(`\nField Papers: added ${added}, skipped ${skipped}`);
  await conn.end();
}

run().catch(err => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
