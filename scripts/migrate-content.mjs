/**
 * GallantryAI Content Migration Script
 * 
 * Seeds the content_blocks and page_links tables with content
 * extracted from all page files. Additive only — never deletes.
 * 
 * Run: node scripts/migrate-content.mjs
 */

import { createConnection } from "mysql2/promise";
import { readFileSync } from "fs";
import { config } from "dotenv";

config();

const db = await createConnection(process.env.DATABASE_URL);

// ─────────────────────────────────────────────
// Helper: insert a block (skip if page already has blocks)
// ─────────────────────────────────────────────

async function insertBlock(pageSlug, blockType, position, content) {
  await db.execute(
    `INSERT INTO content_blocks (pageSlug, blockType, position, content, isMirror, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, 0, NOW(), NOW())`,
    [pageSlug, blockType, position, JSON.stringify(content)]
  );
}

async function pageHasBlocks(pageSlug) {
  const [rows] = await db.execute(
    "SELECT COUNT(*) as count FROM content_blocks WHERE pageSlug = ?",
    [pageSlug]
  );
  return rows[0].count > 0;
}

async function insertLink(pageSlug, label, destination, position) {
  await db.execute(
    `INSERT INTO page_links (pageSlug, label, destination, position, isActive, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, 1, NOW(), NOW())`,
    [pageSlug, label, destination, position]
  );
}

async function pageHasLinks(pageSlug) {
  const [rows] = await db.execute(
    "SELECT COUNT(*) as count FROM page_links WHERE pageSlug = ?",
    [pageSlug]
  );
  return rows[0].count > 0;
}

// ─────────────────────────────────────────────
// Migration functions per page
// ─────────────────────────────────────────────

async function migrateHome() {
  const slug = "home";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "The Watcher",
    body: "The watcher is not a tool. It is not a feature. It is the part of you that notices what you are doing while you are doing it.",
    font: "playfair",
    size: "large"
  });
  await insertBlock(slug, "text", 1, {
    heading: "Who Are You?",
    body: "GallantryAI is built for parents, teachers, nurses, students, researchers, prompt engineers, and everyday people who want to use AI safely, honestly, and with full agency.",
    font: "dmsans",
    size: "medium"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateFiveRules() {
  const slug = "rules";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  
  const rules = [
    { number: 1, adult: "Safety first — nothing moves without it.", child: "Is it safe? If you're not sure, stop and ask a grown-up.", why: "Every interaction begins here. Before speed, before intelligence, before output — is it safe? If the answer is not clearly yes, nothing else matters." },
    { number: 2, adult: "Honesty over confidence — clarity beats sounding right.", child: "Does it sound true? Or does it just sound smart?", why: "AI can sound confident about anything. Confidence is not evidence. The rule is simple: if it sounds right but you cannot verify it, treat it as unverified." },
    { number: 3, adult: "Trust is earned — never assumed.", child: "Did the AI earn your trust? Or did you just give it away?", why: "Trust is built through consistent, verifiable behavior over time. A new session starts at zero. A new model starts at zero. Trust is not a setting — it is a result." },
    { number: 4, adult: "Agency stays with the human — always.", child: "You're the boss. The AI helps. You decide.", why: "The human decides. The human corrects. The human owns the output. AI is a thinking partner, not a decision maker." },
    { number: 5, adult: "Correction is a skill — not a failure.", child: "If the AI goes weird, say so. Come back to the path.", why: "Drift happens. Sessions wander. The rule is not to prevent drift — it is to notice it and correct it. Correction is the skill." },
  ];

  for (let i = 0; i < rules.length; i++) {
    const r = rules[i];
    await insertBlock(slug, "text", i, {
      heading: `Rule ${r.number}: ${r.adult}`,
      body: `${r.why}\n\nFor children: ${r.child}`,
      font: "playfair",
      size: "medium"
    });
  }
  console.log(`  ✓ ${slug}`);
}

async function migrateFieldPapers() {
  const slug = "field-papers";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }

  const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD";
  const MASTER_DOC_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663536092940/WxUVUiXKQysiOQAw.docx";

  const papers = [
    { id: "OD-2026-00", title: "GallantryAI Development Record", subtitle: "February 28, 2026 — Matthew Gallantry", description: "The origin document. Written before the site existed. Everything on this site traces back to this record. A garbageman from Midland, Ontario, writing down what he had figured out before anyone was watching. Not polished. Not peer-reviewed. The real thing.", url: MASTER_DOC_URL },
    { id: "FP-2026-01", title: "The Watcher Variable", subtitle: "A Dual Dataset Hypothesis for Promptolinguistic Research — V2", description: "The word is not the variable. The human holding the word is the variable. Names the gap in all existing prompt research: nobody is logging the person running the experiment.", url: `${CDN}/watcher-v2-final(1)_c2cea34b.pdf` },
    { id: "FP-2026-02", title: "The Unprepared User", subtitle: "V3", description: "What happens when someone sits down with AI and has no framework, no governance, and no awareness of what they are walking into.", url: `${CDN}/the_unprepared_user_v3_c2ade100.pdf` },
    { id: "FP-2026-03", title: "GallantryAI Prompt Branding", subtitle: "V2", description: "How the GallantryAI framework uses language as a branding and governance instrument. The prompt as a signature.", url: `${CDN}/gallantryai_prompt_branding_v2_b0b0f6a1.pdf` },
    { id: "FP-2026-04", title: "The ALCM", subtitle: "Adversarial Language Compliance Matrix — V2", description: "The matrix that maps how language moves through an AI system. Not a jailbreak. A governance tool.", url: `${CDN}/alcm_v2_final_b0b0f6a1.pdf` },
    { id: "FP-2026-05", title: "Token Zero", subtitle: "The Pre-Output Force Profile", description: "Everything that happens before the first word of output. The invisible architecture of every AI session.", url: `${CDN}/token_zero_b0b0f6a1.pdf` },
    { id: "FP-2026-06", title: "The Road Protocol", subtitle: "Session Governance Framework", description: "The vault structure. How to set up a session so it holds its shape. The protocol that keeps the AI on the road.", url: `${CDN}/road_protocol_b0b0f6a1.pdf` },
    { id: "FP-2026-07", title: "Three Voices", subtitle: "The Linguistic Register Framework", description: "Every concept on this site has three voices: the child, the everyday person, and the expert. This paper names the framework.", url: `${CDN}/three_voices_b0b0f6a1.pdf` },
    { id: "FP-2026-08", title: "The Human Line", subtitle: "Where the Human Ends and the Machine Begins", description: "The boundary that must be named before it can be held. The paper that defines the human line in AI interaction.", url: `${CDN}/human_line_b0b0f6a1.pdf` },
  ];

  for (let i = 0; i < papers.length; i++) {
    const p = papers[i];
    await insertBlock(slug, "card", i, {
      title: `${p.id} — ${p.title}`,
      description: `${p.subtitle}\n\n${p.description}`,
      linkLabel: "Open document",
      linkUrl: p.url,
      font: "dmsans",
      size: "medium"
    });
  }
  console.log(`  ✓ ${slug}`);
}

async function migrateLivingLexicon() {
  const slug = "lexicon";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "The Living Lexicon",
    body: "Every word here has three definitions: what a child understands, what an everyday person uses, and what a researcher means. The gap between those three is where most AI confusion lives.",
    font: "playfair",
    size: "large"
  });
  await insertBlock(slug, "text", 1, {
    heading: "How to Use This Lexicon",
    body: "Click any term to see all three definitions. Use the category filters to browse by topic. The lexicon grows as the field grows — new terms are added as they become necessary.",
    font: "dmsans",
    size: "medium"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateRoadProtocol() {
  const slug = "road-protocol";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "The Road Protocol",
    body: "The Road Protocol is a session governance framework. It is the vault that holds the session. Before you type your first question, you set the road. You define the rules. You establish the context. The AI follows the road you build.",
    font: "playfair",
    size: "large"
  });
  await insertBlock(slug, "text", 1, {
    heading: "The Four Keys",
    body: "Brittany — the safety key. Dante — the honesty key. Malbolge — the boundary key. Governance — the agency key. All four keys must be active before the vault opens.",
    font: "dmsans",
    size: "medium"
  });
  console.log(`  ✓ ${slug}`);
}

async function migratePromptolinguistics() {
  const slug = "promptolinguistics";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Promptolinguistics",
    body: "The study of how language moves through AI systems. Not prompt engineering — that is the craft. Promptolinguistics is the science. How words become instructions. How instructions become outputs. How outputs become trust or drift.",
    font: "playfair",
    size: "large"
  });
  await insertBlock(slug, "text", 1, {
    heading: "Token Zero",
    body: "Token Zero is the pre-output force profile. Everything that happens before the first word of output. The invisible architecture of every AI session. Most users never know it exists. This site teaches you to see it.",
    font: "dmsans",
    size: "medium"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateFrameworks() {
  const slug = "frameworks";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Framework Families",
    body: "Twenty-eight frameworks built through use, not theory. Each one earned. Each one tested. Organized into families by purpose: cognitive accessibility, tone modulation, session governance, drift correction, and more.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateTaxonomy() {
  const slug = "taxonomy";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "AI Family Taxonomy",
    body: "Not all AI is the same. This taxonomy names the families: language models, image generators, code assistants, multimodal systems, agents. Each family has different strengths, different failure modes, and different governance needs.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateMalbolge() {
  const slug = "malbolge";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "The Malbolge Geofence",
    body: "Malbolge is the ninth circle. The place where flattery cannot survive. The geofence is a prompt architecture that prevents AI from drifting into sycophancy, manipulation, or false confidence. Named after Dante's Malebolge — the place of fraud.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migratePlayground() {
  const slug = "playground";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Promptology Playground",
    body: "Practice the ALCM. Test prompt mechanics. See how single words change AI output. This is the hands-on space — the place where theory becomes practice.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migratePromptGames() {
  const slug = "prompt-games";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Prompt Games",
    body: "Practice staying in charge. These games are designed to build the habit of questioning, redirecting, and owning your AI sessions. For all ages. No prior knowledge required.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateFlowerPresets() {
  const slug = "flower-presets";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Flower Presets",
    body: "Pre-built safety configurations. Each flower is a one-word instruction that reshapes how AI communicates. Copy the preset. Paste before your question. The AI adapts. Built for cognitive accessibility, neurodivergent support, and tone modulation.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateHumanLine() {
  const slug = "human-line";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "The Human Line",
    body: "The boundary between you and the machine. Not a metaphor. A real line that must be named before it can be held. Where your thinking ends and the AI's output begins. Where your values end and the model's training begins.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateDrift() {
  const slug = "drift";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Drift",
    body: "Drift is when the session leaves your intent without you noticing. The AI is not wrong. You are not wrong. The session just wandered. Drift is the most common failure mode in AI use. The fix is not better prompts — it is noticing.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateAnthropomorphism() {
  const slug = "anthropomorphism";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Anthropomorphism",
    body: "The tendency to assign human qualities to AI. It is not neutral. It changes how you interact, what you trust, and how you correct. Understanding anthropomorphism is a governance skill.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateHallucinations() {
  const slug = "hallucinations";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Hallucinations",
    body: "When AI generates confident, plausible, false information. Not lying — the model has no intent. But the output is wrong and sounds right. Understanding hallucinations is the foundation of the Honesty rule.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateScaffold() {
  const slug = "scaffold";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "The Scaffold",
    body: "The learning structure of GallantryAI. Floor to ceiling. Floor: three values, one prompt. Level Two: pre-session intention. Level Three: drift recognition. Level Four: word mechanics. Ceiling: you are the framework.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateThreeVoices() {
  const slug = "three-voices";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Three Voices",
    body: "Every concept on this site has three voices: the child, the everyday person, and the expert. The gap between those three voices is where most AI confusion lives. The Three Voices framework names that gap and teaches you to work with it.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateWhelmScale() {
  const slug = "whelm-scale";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "The Whelm Scale",
    body: "A self-assessment tool for measuring cognitive load during AI sessions. Underwhelmed: the AI is not giving you enough. Overwhelmed: the AI is giving you too much. Whelmed: the session is calibrated. The scale helps you find and hold the middle.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateVariableScale() {
  const slug = "variable-scale";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "The Variable Scale",
    body: "The watcher variable is the dataset you forgot to log: yourself. The Variable Scale maps the human factors that change AI output — your mood, your framing, your assumptions, your trust level. The scale makes the invisible visible.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateMathPrompting() {
  const slug = "math-prompting";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Math Prompting",
    body: "The mathematics of prompt construction. Not arithmetic — the logic of constraint, scope, and direction. How single words function as control dials. How the structure of a sentence changes the shape of the output.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateUserGovernance() {
  const slug = "user-governance";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "User Governance",
    body: "The practice of governing your own AI sessions. Not a policy. Not a regulation. A personal discipline. The user who governs their sessions is the user who stays in charge.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateDualStrategy() {
  const slug = "dual-strategy";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Dual Strategy",
    body: "Two approaches to AI governance: the safety-first approach and the capability-first approach. Most users default to one. The dual strategy teaches you to hold both simultaneously — knowing when to constrain and when to expand.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateGallantryAiPage() {
  const slug = "gallantry-ai";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "GallantryAI",
    body: "A framework for human-AI interaction built by Matthew Gallantry. Not a product. Not a platform. A discipline. Built in public, tested in practice, documented in the field papers.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateEuAiAct() {
  const slug = "eu-ai-act";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "The EU AI Act",
    body: "The European Union's regulatory framework for artificial intelligence. What it says, what it means for everyday users, and how GallantryAI's principles align with its requirements.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateWhatClaudeAdmitted() {
  const slug = "what-claude-admitted";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "What Claude Admitted",
    body: "A documented session in which Claude acknowledged the limits of its own confidence, the reality of its training biases, and the importance of human oversight. Not a gotcha. A governance record.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateWhatTheAiSaid() {
  const slug = "what-the-ai-said";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "What the AI Said",
    body: "A collection of documented AI outputs — the surprising, the wrong, the honest, and the instructive. Evidence that AI behavior is real, observable, and worth recording.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateOpenDoor() {
  const slug = "open-door";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "The Open Door",
    body: "GallantryAI is open. The research is public. The framework is free. The door is open to anyone who wants to use AI safely, honestly, and with full agency. This page explains the philosophy of openness.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateCounterArguments() {
  const slug = "counter-arguments";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Counter Arguments",
    body: "The strongest objections to the GallantryAI framework, stated honestly and answered directly. Not a debate. A discipline. The framework that cannot survive its own counter-arguments is not a framework.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateScreenshotSharing() {
  const slug = "screenshot-sharing";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Screenshot Sharing",
    body: "The practice of sharing AI session screenshots as evidence. How to do it responsibly. What to include. What to redact. Why it matters for the citizen researcher community.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateFieldReportReview() {
  const slug = "field-report-review";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Field Report Review",
    body: "How to read and evaluate a citizen field report. The standards for evidence, the markers of honest documentation, and the questions every reviewer should ask.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateGallery() {
  const slug = "gallery";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Gallery",
    body: "The full body of work. All images, diagrams, and visual materials from the GallantryAI project. The buffalo. The sloth. The flowers. The frameworks. The field papers.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateArticles() {
  const slug = "articles";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Articles",
    body: "External articles, research, and resources that inform the GallantryAI framework. Curated, not comprehensive. Each article is here because it adds something the framework needed.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateSafety() {
  const slug = "safety";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "If You Need to Stop",
    body: "This page is here for when something in an AI session goes wrong. Crisis resources. Grounding techniques. How to close a session that has gone somewhere you did not intend. You are allowed to stop at any time.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateSchoolBoard() {
  const slug = "school-board";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "School Board",
    body: "Resources for school boards and educational administrators navigating AI policy. What questions to ask. What frameworks to use. How to protect students while enabling learning.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateKidsLearn() {
  const slug = "kids-learn";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Kids Learn",
    body: "How children learn about AI safely. The principles, the activities, and the conversations that build AI literacy from the ground up. Not dumbed down — appropriately framed.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migratePromptLibrary() {
  const slug = "prompts";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Prompt Library",
    body: "A curated collection of prompts built and tested within the GallantryAI framework. Each prompt is documented with its purpose, its context, and its expected output. Not a cheat sheet — a governance record.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateResearchHub() {
  const slug = "research-hub";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Research Hub",
    body: "The central research archive. Field papers, citizen research, external articles, and the evidence trail behind the GallantryAI framework. Everything documented. Nothing hidden.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateCitizenResearcher() {
  const slug = "citizen-researcher";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Citizen Researcher",
    body: "You do not need a PhD to document AI behavior. You need a session, a record, and the discipline to be honest about what you saw. The citizen researcher is the person who keeps the log.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateBuilder() {
  const slug = "builder";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "The Builder",
    body: "Who built this and why. Matthew Gallantry. A garbageman from Midland, Ontario. Not a researcher. Not an academic. Someone who sat with AI long enough to figure out what it needed and what it was missing.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateBuilderOrigin() {
  const slug = "builder-origin";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Builder Origin",
    body: "The origin story. Before the site. Before the framework. The moment the work began. What Matthew saw, what he wrote down, and why it became GallantryAI.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateBuildersKids() {
  const slug = "builders-kids";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Builder's Kids",
    body: "The children's section of the Builder page. For young people who want to understand where this site came from and why it was built for them.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateAlcm() {
  const slug = "alcm";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "The ALCM",
    body: "The Adversarial Language Compliance Matrix. A governance tool that maps how language moves through an AI system. Not a jailbreak. A framework for understanding what your words actually do when they enter an AI session.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

// ─────────────────────────────────────────────
// Lens pages
// ─────────────────────────────────────────────

async function migrateLens(slug, title, body) {
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: title,
    body,
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

// ─────────────────────────────────────────────
// Children's pages
// ─────────────────────────────────────────────

async function migrateChildFiveRules() {
  const slug = "for-child-rules";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "The Five Rules — For Kids",
    body: "Five rules for using AI safely. Written for children. The sloth explains each one.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateChildPatterns() {
  const slug = "for-child-patterns";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Patterns — For Kids",
    body: "Learning to see patterns in AI responses. A skill for young people who want to stay in charge of their AI sessions.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

async function migrateChildPrompts() {
  const slug = "for-child-prompts";
  if (await pageHasBlocks(slug)) { console.log(`  skip: ${slug} already has blocks`); return; }
  await insertBlock(slug, "text", 0, {
    heading: "Prompts — For Kids",
    body: "Prompts written for children. Safe, honest, and fun. Each one teaches a skill.",
    font: "playfair",
    size: "large"
  });
  console.log(`  ✓ ${slug}`);
}

// ─────────────────────────────────────────────
// Run all migrations
// ─────────────────────────────────────────────

console.log("GallantryAI Content Migration");
console.log("==============================");
console.log("Seeding content_blocks table...\n");

try {
  // Core pages
  await migrateHome();
  await migrateFiveRules();
  await migrateFieldPapers();
  await migrateLivingLexicon();
  await migrateRoadProtocol();
  await migratePromptolinguistics();
  await migrateFrameworks();
  await migrateTaxonomy();
  await migrateMalbolge();
  await migratePlayground();
  await migratePromptGames();
  await migrateFlowerPresets();
  await migrateHumanLine();
  await migrateDrift();
  await migrateAnthropomorphism();
  await migrateHallucinations();
  await migrateScaffold();
  await migrateThreeVoices();
  await migrateWhelmScale();
  await migrateVariableScale();
  await migrateMathPrompting();
  await migrateUserGovernance();
  await migrateDualStrategy();
  await migrateGallantryAiPage();
  await migrateEuAiAct();
  await migrateWhatClaudeAdmitted();
  await migrateWhatTheAiSaid();
  await migrateOpenDoor();
  await migrateCounterArguments();
  await migrateScreenshotSharing();
  await migrateFieldReportReview();
  await migrateGallery();
  await migrateArticles();
  await migrateSafety();
  await migrateSchoolBoard();
  await migrateKidsLearn();
  await migratePromptLibrary();
  await migrateResearchHub();
  await migrateCitizenResearcher();
  await migrateBuilder();
  await migrateBuilderOrigin();
  await migrateBuildersKids();
  await migrateAlcm();

  // Lens pages
  await migrateLens("for-child", "Child Lens", "The GallantryAI framework seen through a child's eyes. Simple language. Big ideas. The sloth is your guide.");
  await migrateLens("for-teenager", "Teenager Lens", "AI for teenagers. No condescension. Real skills. The same framework as the adults — framed for where you actually are.");
  await migrateLens("for-everyday", "Everyday Person Lens", "You don't need to understand how AI works. You just need one honest question. This lens is for the person who is curious but not technical.");
  await migrateLens("for-guardian-teacher", "Guardian & Teacher Lens", "For the adults who are responsible for young people using AI. What to watch for. What to teach. How to stay one step ahead.");
  await migrateLens("for-prompt-engineer", "Prompt Engineer Lens", "Token Zero is the pre-output force profile. Everything starts before the first word. This lens is for the person who builds with language.");
  await migrateLens("for-linguist", "Linguist Lens", "Words steer. Choose them. This lens is for the person who understands that language is not neutral — it is directional.");
  await migrateLens("for-mathematician", "Mathematician Lens", "The logic of constraint, scope, and direction. This lens is for the person who thinks in structures and wants to see the mathematics of prompting.");
  await migrateLens("for-cognitive-science", "Cognitive Science Lens", "How your brain drifts and how to notice it. This lens is for the person who wants to understand the human side of the human-AI interaction.");
  await migrateLens("for-psychology", "Psychology Lens", "You already triage. Learn to triage your AI sessions the same way. This lens is for the person who understands human behavior and wants to apply it to AI.");
  await migrateLens("for-researcher", "Researcher Lens", "The watcher variable is the dataset you forgot to log: yourself. This lens is for the person who documents, measures, and publishes.");
  await migrateLens("for-watcher", "Watcher Lens", "The watcher is not a tool. It is the part of you that notices what you are doing while you are doing it. This lens is for the person who has already started watching.");

  // Children's sub-pages
  await migrateChildFiveRules();
  await migrateChildPatterns();
  await migrateChildPrompts();

  console.log("\n==============================");
  console.log("Migration complete.");

  // Count total blocks inserted
  const [rows] = await db.execute("SELECT COUNT(*) as count FROM content_blocks");
  console.log(`Total blocks in database: ${rows[0].count}`);

} catch (err) {
  console.error("Migration error:", err);
  process.exit(1);
} finally {
  await db.end();
}
