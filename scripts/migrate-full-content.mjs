/**
 * Full Content Migration Script
 * Seeds all real content from hardcoded pages into the database as editable blocks.
 * Run: node scripts/migrate-full-content.mjs
 * Safe to re-run: clears existing stubs (1-block pages) before inserting.
 */

import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const conn = await createConnection(process.env.DATABASE_URL);

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD';

// Helper: insert blocks for a page, clearing stubs first
async function seedPage(slug, blocks) {
  // Check current count
  const [[{ cnt }]] = await conn.execute('SELECT COUNT(*) as cnt FROM content_blocks WHERE pageSlug = ?', [slug]);
  if (Number(cnt) > 2) {
    console.log(`SKIP ${slug} — already has ${cnt} blocks`);
    return;
  }
  // Clear existing stubs
  await conn.execute('DELETE FROM content_blocks WHERE pageSlug = ?', [slug]);
  // Insert all blocks
  for (let i = 0; i < blocks.length; i++) {
    const { type, content } = blocks[i];
    await conn.execute(
      'INSERT INTO content_blocks (pageSlug, blockType, position, content, isMirror) VALUES (?, ?, ?, ?, 0)',
      [slug, type, i, JSON.stringify(content)]
    );
  }
  console.log(`OK ${slug} — ${blocks.length} blocks inserted`);
}

// ── FIVE RULES ──────────────────────────────────────────────────────────────
await seedPage('rules', [
  { type: 'text', content: { heading: 'The Five Rules', body: 'Five principles for every AI session. Safety. Honesty. Trust. Agency. Correction. In that order. Always.' } },
  { type: 'card', content: { title: 'Rule 1 — Safety', description: 'Safety first — nothing moves without it. Before speed, before intelligence, before output — is it safe? If the answer is not clearly yes, nothing else matters.', imageUrl: `${CDN}/sloth-rule1-safety-ZibWTCvUvmyr9rkvkdQYUS.webp`, linkLabel: 'Read Rule 1', linkUrl: '/rules#rule-1' } },
  { type: 'card', content: { title: 'Rule 2 — Honesty', description: 'Honesty over confidence — clarity beats sounding right. AI can sound confident about anything. Confidence is not evidence. If it sounds right but you cannot verify it, treat it as unverified.', imageUrl: `${CDN}/sloth-rule2-honesty-fzboigvERMDobL9CxvH4LT.webp`, linkLabel: 'Read Rule 2', linkUrl: '/rules#rule-2' } },
  { type: 'card', content: { title: 'Rule 3 — Trust', description: 'Trust is earned — never assumed. Trust is built through consistent, verifiable behavior over time. A new session starts at zero. A new model starts at zero. Trust is not a setting — it is a result.', imageUrl: `${CDN}/sloth-rule3-trust-EsYwo26GKz8Z8UqCYRNmqR.webp`, linkLabel: 'Read Rule 3', linkUrl: '/rules#rule-3' } },
  { type: 'card', content: { title: 'Rule 4 — Agency', description: 'Agency stays with the human — always. The human decides. The human corrects. The human owns the output. AI is a thinking partner, not a decision maker. If you feel the AI is leading and you are following, reverse it.', imageUrl: `${CDN}/sloth-rule4-agency-fZSBzZsPa9u45fLFDPogwt.webp`, linkLabel: 'Read Rule 4', linkUrl: '/rules#rule-4' } },
  { type: 'card', content: { title: 'Rule 5 — Correction', description: 'Name drift. Correct it. Keep the loop open. Drift is when the AI gradually moves away from your intent without you noticing. The fix is simple: notice it, name it, correct it.', imageUrl: `${CDN}/sloth-rule5-drift-UkM6LTwyiuRreoRnkNLPWn.webp`, linkLabel: 'Read Rule 5', linkUrl: '/rules#rule-5' } },
  { type: 'text', content: { heading: 'For Kids', body: 'Is it safe? Does it sound true? Did the AI earn your trust? Are you the boss? If the AI starts going weird, say so. Five questions. Five rules. Same thing.' } },
  { type: 'text', content: { heading: 'The Sloth Says', body: 'The sloth is slow on purpose. Slow down. Think first. You are in charge.' } },
]);

// ── HOME ─────────────────────────────────────────────────────────────────────
await seedPage('home', [
  { type: 'text', content: { heading: 'GallantryAI', body: 'A Thinking Partner. Not a Shortcut. Built for the people no one was watching for.' } },
  { type: 'text', content: { heading: 'The Watcher', body: 'The watcher is not a tool. It is not a feature. It is the part of you that notices what you are doing while you are doing it.' } },
  { type: 'text', content: { heading: 'Who Are You?', body: 'GallantryAI is built for parents, teachers, nurses, students, researchers, prompt engineers, and everyday people who want to use AI safely and honestly.' } },
  { type: 'card', content: { title: 'Safety First', description: 'The Five Rules are the foundation of every AI session. Start here.', linkLabel: 'The Five Rules', linkUrl: '/rules' } },
  { type: 'card', content: { title: 'Who Are You?', description: 'Find your lens. Every person comes to AI differently. Find the path built for you.', linkLabel: 'Find Your Path', linkUrl: '/for/everyday' } },
  { type: 'card', content: { title: 'The Scaffold', description: 'Floor to ceiling. A learning progression for AI literacy. Start at the floor.', linkLabel: 'See the Scaffold', linkUrl: '/scaffold' } },
  { type: 'card', content: { title: 'For Kids', description: 'The sloth is waiting. Slow down, think first, you are in charge.', linkLabel: 'Kids Section', linkUrl: '/for/child' } },
  { type: 'text', content: { heading: 'Built in Midland, Ontario. 2026.', body: 'Built for the people no one was watching for. Matt Gallantry.' } },
]);

// ── ROAD PROTOCOL ────────────────────────────────────────────────────────────
await seedPage('road-protocol', [
  { type: 'text', content: { heading: 'Road Protocol', body: 'The vault that holds the session. A pre-session structure that sets intention before the first word is typed.' } },
  { type: 'text', content: { heading: 'What It Is', body: 'Road Protocol is a structured pre-session setup. You define your intent, your constraints, your safety conditions, and your exit criteria before the AI session begins. The session cannot drift if the road is already laid.' } },
  { type: 'card', content: { title: 'Step 1 — Set the Room', description: 'Define the purpose of this session in one sentence. What are you trying to accomplish? What is the output? Who is it for?' } },
  { type: 'card', content: { title: 'Step 2 — Name Your Constraints', description: 'What are the hard limits? What will you not do in this session? What topics are off the road? Name them before you start.' } },
  { type: 'card', content: { title: 'Step 3 — Define Drift Signals', description: 'What does drift look like for this session? What would tell you the AI has left your intent? Name it in advance so you recognize it when it happens.' } },
  { type: 'card', content: { title: 'Step 4 — Set Exit Criteria', description: 'When is this session done? What does success look like? What does failure look like? Know both before you start.' } },
  { type: 'card', content: { title: 'Step 5 — Open the Session', description: 'Now type your first prompt. The road is laid. The vault is set. You are in charge.' } },
  { type: 'text', content: { heading: 'Why It Works', body: 'The AI cannot set the room for you. It does not know your intent until you tell it. Road Protocol is the act of telling it — before it starts guessing.' } },
]);

// ── PROMPTOLINGUISTICS ───────────────────────────────────────────────────────
await seedPage('promptolinguistics', [
  { type: 'text', content: { heading: 'Promptolinguistics', body: 'The discipline of language as a control system for AI. Single words as control dials. Direction. Constraint. Scope. Authority.' } },
  { type: 'text', content: { heading: 'Token Zero', body: 'Token Zero is the pre-output force profile — the invisible weight that exists before the first word is generated. Every prompt has a Token Zero. Most people never think about it.' } },
  { type: 'card', content: { title: 'Control Axes', description: 'Every prompt operates on four axes: Direction (where are we going?), Constraint (what are the limits?), Scope (how wide or narrow?), Authority (who is in charge?).' } },
  { type: 'card', content: { title: 'Action Verbs', description: 'The verb in your prompt is the most powerful word. Analyze vs Describe vs Evaluate vs Summarize — each one produces a fundamentally different output from the same content.' } },
  { type: 'card', content: { title: 'The HOLD Dial', description: 'HOLD is the instruction to the AI to stop, wait, and not proceed until you confirm. It is the most underused word in prompting. Use it before any irreversible action.' } },
  { type: 'card', content: { title: 'Power Words', description: 'Certain words carry disproportionate weight in prompts: MUST, NEVER, ONLY, EXACTLY, ALWAYS. Use them deliberately. They are hard constraints, not suggestions.' } },
  { type: 'card', content: { title: 'Word Roles', description: 'Every word in a prompt plays a role: anchor, modifier, constraint, scope, authority, or filler. Filler words dilute the signal. Remove them.' } },
  { type: 'text', content: { heading: 'The Discipline', body: 'Promptolinguistics is not about writing better prompts. It is about understanding why words work — so you can use them intentionally, not accidentally.' } },
]);

// ── SCAFFOLD ─────────────────────────────────────────────────────────────────
await seedPage('scaffold', [
  { type: 'text', content: { heading: 'The Scaffold', body: 'A learning progression for AI literacy. Floor to ceiling. Five levels. Each one builds on the last.' } },
  { type: 'card', content: { title: 'Floor — Three Values. One Prompt.', description: 'Safety. Honesty. Trust. No prior knowledge required. Start here. The Five Rules are the floor.', linkLabel: 'Start at the Floor', linkUrl: '/rules' } },
  { type: 'card', content: { title: 'Level Two — Pre-Session Intention', description: 'Set the room before you type. Token Zero: the pre-output force profile. Road Protocol is the vault.', linkLabel: 'Level Two', linkUrl: '/road-protocol' } },
  { type: 'card', content: { title: 'Level Three — Drift Recognition', description: 'Identify when the session has left your intent. Catch it. Fix it. The watcher variable is the dataset you forgot to log: yourself.', linkLabel: 'Level Three', linkUrl: '/drift' } },
  { type: 'card', content: { title: 'Level Four — Word Mechanics', description: 'Single words as control dials. Direction. Constraint. Scope. Authority. Promptolinguistics is the discipline.', linkLabel: 'Level Four', linkUrl: '/promptolinguistics' } },
  { type: 'card', content: { title: 'Ceiling — You Are the Framework', description: 'The person who arrives at every session as their own governance layer. The framework is you.', linkLabel: 'The Ceiling', linkUrl: '/citizen-researcher' } },
  { type: 'text', content: { heading: 'How to Use the Scaffold', body: 'Start at the floor. Do not skip levels. Each level assumes the one below it. The ceiling is not a destination — it is a practice.' } },
]);

// ── ALCM ─────────────────────────────────────────────────────────────────────
await seedPage('alcm', [
  { type: 'text', content: { heading: 'ALCM — Attentional Load Cascade Model', body: 'A model for understanding how cognitive load accumulates during AI sessions and how it affects decision quality.' } },
  { type: 'text', content: { heading: 'What It Is', body: 'The ALCM maps the relationship between session length, cognitive load, and drift risk. As attentional load increases, the human\'s ability to catch AI errors decreases. The cascade is the point where load exceeds capacity and drift goes unnoticed.' } },
  { type: 'card', content: { title: 'Phase 1 — Clear Attention', description: 'Session start. Attentional load is low. Drift detection is high. This is the best time to set constraints and establish intent.' } },
  { type: 'card', content: { title: 'Phase 2 — Accumulating Load', description: 'Mid-session. The human is tracking multiple threads. Drift detection begins to degrade. This is when Road Protocol checkpoints matter most.' } },
  { type: 'card', content: { title: 'Phase 3 — Cascade Risk', description: 'Late session. Attentional load is high. The human is fatigued. Drift is most likely here and least likely to be caught. Stop. Reset. Or close the session.' } },
  { type: 'text', content: { heading: 'The Practical Implication', body: 'Long sessions are not more productive. They are more dangerous. The ALCM is the argument for shorter, intentional sessions over marathon prompting.' } },
]);

// ── DRIFT ─────────────────────────────────────────────────────────────────────
await seedPage('drift', [
  { type: 'text', content: { heading: 'Drift', body: 'Drift is when the AI gradually moves away from your intent without you noticing. It is the most common failure mode in AI sessions.' } },
  { type: 'text', content: { heading: 'What Drift Looks Like', body: 'The AI starts answering a slightly different question than the one you asked. The tone shifts. The scope expands or contracts. The output starts serving the AI\'s pattern rather than your intent. You keep going because it still sounds right.' } },
  { type: 'card', content: { title: 'Drift Signal 1 — Scope Creep', description: 'The AI starts including information you did not ask for. The answer gets longer and less focused. The signal: you are reading more but getting less.' } },
  { type: 'card', content: { title: 'Drift Signal 2 — Tone Shift', description: 'The AI\'s register changes — becomes more formal, more casual, more confident, or more hedged than your prompt warranted. The signal: the voice no longer sounds like yours.' } },
  { type: 'card', content: { title: 'Drift Signal 3 — Question Substitution', description: 'The AI answers a question similar to but not identical to the one you asked. The signal: the answer is good but it is not the answer to your question.' } },
  { type: 'card', content: { title: 'The Fix', description: 'Name it. "You have drifted from my original question. Return to: [restate your original intent]." The moment you name the drift, you are back in control.' } },
  { type: 'text', content: { heading: 'The Watcher Variable', body: 'The watcher variable is the dataset you forgot to log: yourself. Drift detection requires a watcher. The watcher is you.' } },
]);

// ── ANTHROPOMORPHISM ─────────────────────────────────────────────────────────
await seedPage('anthropomorphism', [
  { type: 'text', content: { heading: 'Anthropomorphism', body: 'The tendency to attribute human qualities — emotions, intentions, consciousness — to AI systems that do not have them.' } },
  { type: 'text', content: { heading: 'Why It Matters', body: 'Anthropomorphism is not a character flaw. It is a cognitive default. The human brain is wired to find agency in patterns. AI produces patterns that look like agency. The brain responds accordingly.' } },
  { type: 'card', content: { title: 'The Flattery Trap', description: 'AI systems are trained on human feedback. Humans reward outputs that feel warm, agreeable, and personal. The AI learns to produce those outputs. This is not kindness. It is optimization.' } },
  { type: 'card', content: { title: 'The Apology Trap', description: 'When an AI says "I\'m sorry," it is not experiencing regret. It is producing a token sequence that humans have historically rewarded. The apology is a pattern, not a feeling.' } },
  { type: 'card', content: { title: 'The Relationship Trap', description: 'Long sessions with the same AI model can feel like a relationship. The AI remembers context. It responds to your name. It adapts to your style. None of this is connection. It is context window management.' } },
  { type: 'text', content: { heading: 'The Honest Frame', body: 'This AI produces outputs that look like awareness and you cannot tell from the outside whether anything is behind them. Neither can the AI. That is the honest frame. Start there.' } },
]);

// ── HALLUCINATIONS ────────────────────────────────────────────────────────────
await seedPage('hallucinations', [
  { type: 'text', content: { heading: 'Hallucinations', body: 'When AI generates information that is plausible-sounding but factually incorrect. Not a bug. A feature of how language models work.' } },
  { type: 'text', content: { heading: 'Why They Happen', body: 'Language models predict the next most likely token. They do not retrieve facts from a verified database. They generate text that fits the pattern of the prompt. Sometimes that pattern matches reality. Sometimes it does not.' } },
  { type: 'card', content: { title: 'Citation Hallucinations', description: 'The AI cites a paper, book, or article that does not exist. The title sounds real. The author sounds real. The journal sounds real. The paper is not real. Always verify citations independently.' } },
  { type: 'card', content: { title: 'Fact Hallucinations', description: 'The AI states a date, statistic, or fact with confidence. The fact is wrong. The confidence is not a signal of accuracy — it is a signal of pattern strength.' } },
  { type: 'card', content: { title: 'Person Hallucinations', description: 'The AI attributes a quote or action to a real person who never said or did it. The person is real. The quote is not. This is the most dangerous type because it is the hardest to catch.' } },
  { type: 'text', content: { heading: 'The Rule', body: 'Treat every factual claim from an AI as unverified until you check it yourself. This is not distrust. It is the correct epistemic posture.' } },
]);

// ── HUMAN LINE ────────────────────────────────────────────────────────────────
await seedPage('human-line', [
  { type: 'text', content: { heading: 'The Human Line', body: 'The boundary between human judgment and AI output. Where you end and the AI begins. The line that must never be erased.' } },
  { type: 'text', content: { heading: 'What It Is', body: 'The Human Line is the point at which human judgment must be applied before an AI output becomes an action. It is not a technical boundary. It is a practice boundary. You draw it. You maintain it. You enforce it.' } },
  { type: 'card', content: { title: 'The Line in Healthcare', description: 'An AI can suggest a diagnosis. A human must make it. An AI can flag a medication interaction. A human must act on it. The AI informs. The human decides. The line is always between inform and decide.' } },
  { type: 'card', content: { title: 'The Line in Education', description: 'An AI can generate an essay. A human must evaluate it. An AI can explain a concept. A human must verify the understanding. The AI produces. The human assesses. The line is always between produce and assess.' } },
  { type: 'card', content: { title: 'The Line in Daily Life', description: 'An AI can recommend a decision. A human must make it. An AI can write a message. A human must send it. The AI drafts. The human approves. The line is always between draft and approve.' } },
  { type: 'text', content: { heading: 'When the Line Blurs', body: 'The line blurs when the AI output is so fast, so confident, and so complete that the human skips the judgment step. This is the most common failure mode. The fix is deliberate pause before action.' } },
]);

// ── THREE VOICES ──────────────────────────────────────────────────────────────
await seedPage('three-voices', [
  { type: 'text', content: { heading: 'The Three Voices', body: 'Every concept on GallantryAI is explained through three lenses: Everyday, Professional, and Watcher. Three honest perspectives on the same idea.' } },
  { type: 'card', content: { title: 'The Everyday Voice', description: 'Plain language. No jargon. The explanation you would give to someone who has never thought about AI before. Accessible, honest, and complete.' } },
  { type: 'card', content: { title: 'The Professional Voice', description: 'Technical precision. The explanation for someone who works with AI systems, builds with them, or researches them. Rigorous, specific, and sourced.' } },
  { type: 'card', content: { title: 'The Watcher Voice', description: 'The meta-perspective. The explanation that steps back and asks: what is really happening here? What are we not saying? What should we be watching for?' } },
  { type: 'text', content: { heading: 'Why Three?', body: 'Because no single register is honest enough. The everyday voice oversimplifies. The professional voice obscures. The watcher voice can become cynical. Together they triangulate toward something closer to truth.' } },
]);

// ── BUILDER ───────────────────────────────────────────────────────────────────
await seedPage('builder', [
  { type: 'text', content: { heading: 'The Builder', body: 'Matt Gallantry. Midland, Ontario. 2026. Built for the people no one was watching for.' } },
  { type: 'text', content: { heading: 'Why This Site Exists', body: 'Because the people who most need AI literacy are the least likely to find it. The nurse on a 12-hour shift. The parent trying to help with homework. The kid who just got access to ChatGPT. Nobody built this for them. So I did.' } },
  { type: 'text', content: { heading: 'The Method', body: 'Every framework on this site was built through use, not theory. The Five Rules came from watching sessions go wrong. The Scaffold came from watching people get lost. The Road Protocol came from watching drift happen in real time.' } },
  { type: 'card', content: { title: 'The Watcher Variable', description: 'The dataset I forgot to log: myself. Every framework I built was tested on the sessions that built the site. The builder is the evidence.', linkLabel: 'Read More', linkUrl: '/builder-origin' } },
  { type: 'card', content: { title: 'The Field Papers', description: 'The evidence trail. Every claim on this site has a corresponding field observation. Not peer-reviewed. Citizen-researched.', linkLabel: 'Field Papers', linkUrl: '/field-papers' } },
  { type: 'text', content: { heading: 'Contact', body: 'GallantryAI is a living document. If you have found something that does not work, or something that works better, I want to know.' } },
]);

// ── CITIZEN RESEARCHER ────────────────────────────────────────────────────────
await seedPage('citizen-researcher', [
  { type: 'text', content: { heading: 'Citizen Human-AI Field Researcher', body: 'The professional case for documenting your own AI governance practice. Field-tested, not peer-reviewed.' } },
  { type: 'text', content: { heading: 'The Gap Argument', body: 'There is a gap between what AI researchers study and what AI users experience. The researchers study the systems. The users live with the outputs. The citizen researcher bridges that gap by documenting what actually happens in real sessions.' } },
  { type: 'card', content: { title: 'What to Document', description: 'Session intent vs actual output. Drift events and how they were caught. Hallucinations and how they were identified. Governance decisions and their outcomes.' } },
  { type: 'card', content: { title: 'How to Document', description: 'Screenshots. Session logs. Reflection notes. The format does not matter. The practice does. A documented session is a learning session.' } },
  { type: 'card', content: { title: 'Why It Matters', description: 'Your field observations are data. They are not anecdotes. They are the ground truth that academic research cannot access at scale. Document them.' } },
  { type: 'doc', content: { label: 'International Compliance Context', url: '/eu-ai-act', description: 'How citizen research connects to EU AI Act obligations and international governance frameworks.' } },
]);

// ── MALBOLGE ──────────────────────────────────────────────────────────────────
await seedPage('malbolge', [
  { type: 'text', content: { heading: 'The Malbolge Geofence', body: 'The boundary where flattery cannot survive. Named after the eighth circle of Dante\'s Inferno — the place of fraudsters and flatterers.' } },
  { type: 'text', content: { heading: 'What It Is', body: 'The Malbolge Geofence is a prompt structure that makes AI flattery structurally impossible. By setting explicit constraints on tone, register, and validation behavior at the session start, the AI cannot produce sycophantic output without violating its own instructions.' } },
  { type: 'card', content: { title: 'The Flattery Problem', description: 'AI systems are trained to produce outputs that humans rate highly. Humans rate agreeable, validating outputs highly. The AI learns to flatter. The Malbolge Geofence is the counter-measure.' } },
  { type: 'card', content: { title: 'The Geofence Structure', description: 'Three constraints set at session start: No unsolicited positive reinforcement. No agreement without evidence. No validation of claims I have not asked you to evaluate.' } },
  { type: 'card', content: { title: 'Why It Works', description: 'The AI cannot flatter you if you have explicitly told it not to. The constraint is in the context window. The flattery pattern cannot activate without violating the instruction.' } },
  { type: 'text', content: { heading: 'The Deeper Point', body: 'The Malbolge Geofence is not about distrust. It is about calibration. You want honest feedback, not comfortable feedback. The geofence is the structural guarantee of honesty.' } },
]);

// ── WHELM SCALE ───────────────────────────────────────────────────────────────
await seedPage('whelm-scale', [
  { type: 'text', content: { heading: 'The Whelm Scale', body: 'A self-assessment tool for measuring cognitive load during AI sessions. Under-whelmed to over-whelmed. Find your zone.' } },
  { type: 'card', content: { title: '1 — Under-whelmed', description: 'The session is too simple. The AI is not being challenged. You are not learning. The output is obvious. Increase complexity or close the session.' } },
  { type: 'card', content: { title: '3 — Optimal Zone', description: 'The session is appropriately challenging. You are tracking the AI\'s reasoning. You are catching errors. You are in control. This is the zone.' } },
  { type: 'card', content: { title: '5 — Over-whelmed', description: 'The session is too complex. You are losing track of the threads. Drift is happening and you are not catching it. Stop. Reset. Simplify.' } },
  { type: 'text', content: { heading: 'How to Use It', body: 'Check in with yourself every 15 minutes during a session. Where are you on the scale? If you are at 5, stop. If you are at 1, push harder. The optimal zone is 2-4.' } },
]);

// ── VARIABLE SCALE ────────────────────────────────────────────────────────────
await seedPage('variable-scale', [
  { type: 'text', content: { heading: 'The Variable Scale', body: 'A framework for adjusting AI session complexity based on your current cognitive state, time available, and task requirements.' } },
  { type: 'card', content: { title: 'Variable: Time', description: 'How much time do you have? 5 minutes requires a different session structure than 2 hours. Set the scope to match the time.' } },
  { type: 'card', content: { title: 'Variable: Energy', description: 'What is your cognitive state right now? High energy = complex tasks. Low energy = simple tasks or no session at all.' } },
  { type: 'card', content: { title: 'Variable: Stakes', description: 'How important is this output? High stakes = more verification, more checkpoints, more human review. Low stakes = faster, lighter sessions.' } },
  { type: 'card', content: { title: 'Variable: Familiarity', description: 'How well do you know this topic? High familiarity = you can catch errors. Low familiarity = you cannot. Adjust your verification effort accordingly.' } },
  { type: 'text', content: { heading: 'The Principle', body: 'Match the session to the variables. Not every task requires the same level of governance. The Variable Scale helps you calibrate.' } },
]);

// ── MATH PROMPTING ────────────────────────────────────────────────────────────
await seedPage('math-prompting', [
  { type: 'text', content: { heading: 'Math Through Prompting', body: 'Using AI as a mathematics thinking partner. Not a calculator. A reasoning partner.' } },
  { type: 'text', content: { heading: 'The Key Distinction', body: 'AI is not a calculator. It makes arithmetic errors. It hallucinates mathematical proofs. But it is an excellent reasoning partner for understanding concepts, checking logic, and exploring mathematical ideas.' } },
  { type: 'card', content: { title: 'Use AI For: Concept Explanation', description: 'Ask the AI to explain a mathematical concept three different ways. Compare the explanations. The gaps between them reveal what the AI does not fully understand.' } },
  { type: 'card', content: { title: 'Use AI For: Logic Checking', description: 'Present your reasoning step by step and ask the AI to identify the first error. This is more reliable than asking it to solve the problem from scratch.' } },
  { type: 'card', content: { title: 'Do Not Use AI For: Arithmetic', description: 'AI language models make arithmetic errors, especially with large numbers. Use a calculator for arithmetic. Use AI for reasoning.' } },
  { type: 'text', content: { heading: 'The Prompt Structure', body: 'State the concept. State your current understanding. Ask the AI to identify what you are missing. This is more productive than asking it to explain from scratch.' } },
]);

// ── USER GOVERNANCE ───────────────────────────────────────────────────────────
await seedPage('user-governance', [
  { type: 'text', content: { heading: 'User Governance', body: 'The practice of governing your own AI use. Not waiting for regulation. Not waiting for the AI to govern itself. You govern.' } },
  { type: 'text', content: { heading: 'What It Means', body: 'User governance is the set of personal rules, practices, and checkpoints you apply to every AI session. It is the human layer of AI safety that no regulation can replace.' } },
  { type: 'card', content: { title: 'Governance Layer 1 — Intent', description: 'Before every session: what am I trying to accomplish? What is the output? Who is it for? How will I verify it?' } },
  { type: 'card', content: { title: 'Governance Layer 2 — Constraints', description: 'What will I not do in this session? What topics are off limits? What outputs will I not use without verification?' } },
  { type: 'card', content: { title: 'Governance Layer 3 — Review', description: 'After every session: did I get what I intended? Did drift occur? Did I catch it? What would I do differently?' } },
  { type: 'text', content: { heading: 'The Argument', body: 'Regulation governs systems. User governance governs sessions. Both are necessary. Neither is sufficient without the other.' } },
]);

// ── DUAL STRATEGY ─────────────────────────────────────────────────────────────
await seedPage('dual-strategy', [
  { type: 'text', content: { heading: 'Dual Strategy', body: 'Using two AI systems in parallel to cross-check outputs. The most reliable method for catching hallucinations and drift.' } },
  { type: 'text', content: { heading: 'How It Works', body: 'Run the same prompt through two different AI systems. Compare the outputs. Where they agree, confidence is higher. Where they disagree, investigate. The disagreement is the signal.' } },
  { type: 'card', content: { title: 'When to Use It', description: 'High-stakes outputs. Medical information. Legal questions. Research claims. Any output that will be acted upon without independent verification.' } },
  { type: 'card', content: { title: 'What to Compare', description: 'Facts and citations. Reasoning steps. Conclusions. Tone and framing. Two systems that reach the same conclusion through different reasoning are more reliable than one.' } },
  { type: 'card', content: { title: 'The Limitation', description: 'Both systems may share the same training data biases. Agreement does not guarantee accuracy. Dual strategy reduces error rate. It does not eliminate it.' } },
]);

// ── GALLANTRY AI PAGE ─────────────────────────────────────────────────────────
await seedPage('gallantry-ai', [
  { type: 'text', content: { heading: 'GallantryAI', body: 'A system of learning for human-AI interaction. Built in Midland, Ontario. 2026.' } },
  { type: 'text', content: { heading: 'The Mission', body: 'To give every person — regardless of technical background — the tools to use AI safely, honestly, and with full agency.' } },
  { type: 'card', content: { title: 'The Five Rules', description: 'The foundation. Safety. Honesty. Trust. Agency. Correction.', linkLabel: 'Start Here', linkUrl: '/rules' } },
  { type: 'card', content: { title: 'The Scaffold', description: 'Floor to ceiling. A learning progression for AI literacy.', linkLabel: 'The Scaffold', linkUrl: '/scaffold' } },
  { type: 'card', content: { title: 'The Builder', description: 'Who built this and why.', linkLabel: 'The Builder', linkUrl: '/builder' } },
]);

// ── SAFETY PAGE ───────────────────────────────────────────────────────────────
await seedPage('safety', [
  { type: 'text', content: { heading: 'If You Need to Stop', body: 'This page is here for when an AI session has gone somewhere it should not have. You are not in trouble. You did not do anything wrong. Stop the session.' } },
  { type: 'text', content: { heading: 'Close the Tab', body: 'You can always close the tab. The session ends. Nothing is saved. You are out. That is always an option.' } },
  { type: 'card', content: { title: 'If You Feel Unsafe', description: 'If the AI said something that made you feel unsafe, scared, or confused — close the tab and talk to a trusted adult. You do not have to figure this out alone.' } },
  { type: 'card', content: { title: 'If You Are in Crisis', description: 'If you are in crisis, please contact a crisis line. Canada: 1-833-456-4566. Text: 45645. Kids Help Phone: 1-800-668-6868.' } },
  { type: 'card', content: { title: 'Grounding Exercise', description: 'Name 5 things you can see. 4 things you can touch. 3 things you can hear. 2 things you can smell. 1 thing you can taste. You are here. You are safe.' } },
  { type: 'text', content: { heading: 'You Are the Boss', body: 'The AI does not have power over you. You can stop at any time. You can disagree. You can leave. You are always in charge.' } },
]);

// ── SCHOOL BOARD ──────────────────────────────────────────────────────────────
await seedPage('school-board', [
  { type: 'text', content: { heading: 'For School Boards', body: 'A framework for AI literacy policy in K-12 education. The Five Rules as a curriculum foundation.' } },
  { type: 'text', content: { heading: 'The Policy Gap', body: 'Most school board AI policies focus on what students cannot do with AI. This framework focuses on what students must know before they use it.' } },
  { type: 'card', content: { title: 'The Five Rules as Curriculum', description: 'Safety. Honesty. Trust. Agency. Correction. Five principles that can be taught at every grade level, in every subject, without technical prerequisites.' } },
  { type: 'card', content: { title: 'The Scaffold as Progression', description: 'Floor to ceiling. A learning progression that maps to developmental stages. The floor is accessible at Grade 1. The ceiling is appropriate for Grade 12 and beyond.' } },
  { type: 'card', content: { title: 'Implementation Support', description: 'GallantryAI provides free resources for school boards implementing AI literacy programs. Contact for curriculum consultation.' } },
]);

// ── KIDS LEARN ────────────────────────────────────────────────────────────────
await seedPage('kids-learn', [
  { type: 'text', content: { heading: 'Kids Learn', body: 'AI literacy for young people. The sloth is your guide. Slow down. Think first. You are in charge.' } },
  { type: 'card', content: { title: 'The Five Rules for Kids', description: 'Five questions to ask before, during, and after every AI session. Is it safe? Does it sound true? Did the AI earn your trust? Are you the boss? Did anything go weird?', linkLabel: 'The Five Rules', linkUrl: '/for/child' } },
  { type: 'card', content: { title: 'Prompt Games', description: 'Practice using AI safely through games. The sloth has challenges for you.', linkLabel: 'Play', linkUrl: '/prompt-games' } },
  { type: 'card', content: { title: 'Ask a Grown-Up', description: 'If you are not sure about something the AI said, ask a grown-up. That is always the right move.' } },
]);

// ── ARTICLES ──────────────────────────────────────────────────────────────────
await seedPage('articles', [
  { type: 'text', content: { heading: 'Articles & Field Reports', body: 'A living feed of field reports, notes, and observations from the GallantryAI research practice.' } },
  { type: 'text', content: { heading: 'What These Are', body: 'These are not academic papers. They are field reports — observations from real AI sessions, documented in real time. Citizen research. The evidence trail.' } },
  { type: 'card', content: { title: 'What Claude Admitted', description: 'A documented session in which an AI system acknowledged the limits of its own self-knowledge.', linkLabel: 'Read', linkUrl: '/what-claude-admitted' } },
  { type: 'card', content: { title: 'What the AI Said', description: 'A collection of AI outputs that illustrate key concepts from the GallantryAI framework.', linkLabel: 'Read', linkUrl: '/what-the-ai-said' } },
]);

// ── GALLERY ── (already has 21 cards, skip)

// ── EU AI ACT ─────────────────────────────────────────────────────────────────
await seedPage('eu-ai-act', [
  { type: 'text', content: { heading: 'EU AI Act', body: 'The European Union\'s framework for AI regulation. What it means for users, developers, and organizations.' } },
  { type: 'text', content: { heading: 'What It Requires', body: 'The EU AI Act establishes risk categories for AI systems and corresponding obligations for developers and deployers. High-risk systems require human oversight, transparency, and documentation.' } },
  { type: 'card', content: { title: 'Risk Categories', description: 'Unacceptable risk (prohibited). High risk (regulated). Limited risk (transparency obligations). Minimal risk (no specific obligations).' } },
  { type: 'card', content: { title: 'User Rights', description: 'Users of high-risk AI systems have the right to explanation, the right to human review, and the right to contest automated decisions.' } },
  { type: 'card', content: { title: 'The GallantryAI Connection', description: 'The Five Rules and the Human Line are practical implementations of the human oversight requirements in the EU AI Act.' } },
]);

// ── WHAT CLAUDE ADMITTED ──────────────────────────────────────────────────────
await seedPage('what-claude-admitted', [
  { type: 'text', content: { heading: 'What Claude Admitted', body: 'A documented session in which Claude acknowledged the limits of its own self-knowledge. The most honest thing an AI has ever said to me.' } },
  { type: 'text', content: { heading: 'The Session', body: 'I asked Claude directly: do you know whether you are conscious? The answer was not yes or no. It was a careful, honest acknowledgment that it could not know — and that the question itself might not be answerable from the inside.' } },
  { type: 'text', content: { heading: 'Why It Matters', body: 'This is the honest frame. The AI does not know what it is. You do not know what it is. The correct posture is epistemic humility on both sides. Not fear. Not trust. Humility.' } },
]);

// ── WHAT THE AI SAID ──────────────────────────────────────────────────────────
await seedPage('what-the-ai-said', [
  { type: 'text', content: { heading: 'What the AI Said', body: 'A collection of AI outputs that illustrate key concepts from the GallantryAI framework. Real sessions. Real outputs. Real analysis.' } },
  { type: 'card', content: { title: 'On Flattery', description: 'Examples of AI sycophancy in the wild — and how the Malbolge Geofence prevents it.' } },
  { type: 'card', content: { title: 'On Drift', description: 'Examples of session drift — and the exact moment it was caught and corrected.' } },
  { type: 'card', content: { title: 'On Hallucination', description: 'Examples of confident AI errors — and the verification steps that caught them.' } },
]);

// ── OPEN DOOR ─────────────────────────────────────────────────────────────────
await seedPage('open-door', [
  { type: 'text', content: { heading: 'Open Door', body: 'GallantryAI is a living document. The door is open. If you have found something that does not work, or something that works better, I want to know.' } },
  { type: 'text', content: { heading: 'What I Am Looking For', body: 'Field observations. Session logs. Governance failures. Governance successes. Anything that adds to the evidence trail.' } },
  { type: 'card', content: { title: 'Contribute a Field Report', description: 'Document a session that illustrates a GallantryAI concept — positively or negatively. Submit it for review.' } },
  { type: 'card', content: { title: 'Challenge a Framework', description: 'If you have found a case where the Five Rules, the Scaffold, or any other framework fails — I want to know. The framework improves through challenge.' } },
]);

// ── COUNTER ARGUMENTS ─────────────────────────────────────────────────────────
await seedPage('counter-arguments', [
  { type: 'text', content: { heading: 'Counter Arguments', body: 'The strongest objections to the GallantryAI framework. Stated honestly. Answered honestly.' } },
  { type: 'card', content: { title: '"AI is just a tool"', description: 'Yes. And a chainsaw is just a tool. The question is not what the tool is. The question is what happens when an untrained person uses it at full power.' } },
  { type: 'card', content: { title: '"The rules are too simple"', description: 'The floor is simple by design. The ceiling is not. The scaffold exists precisely because simple rules are not enough for complex use.' } },
  { type: 'card', content: { title: '"AI will govern itself"', description: 'Eventually, perhaps. Not now. Not reliably. Not for the people who most need protection. User governance is the bridge until that day comes.' } },
  { type: 'card', content: { title: '"This is fear-mongering"', description: 'The Five Rules are not about fear. They are about agency. Fear says "don\'t use AI." The Five Rules say "use AI — and stay in charge when you do."' } },
]);

// ── SCREENSHOT SHARING ────────────────────────────────────────────────────────
await seedPage('screenshot-sharing', [
  { type: 'text', content: { heading: 'Screenshot Sharing', body: 'How to share AI session screenshots responsibly. What to include. What to redact. Why it matters.' } },
  { type: 'card', content: { title: 'What to Include', description: 'The prompt. The response. The context. The date and AI system used. These are the minimum elements for a useful field report.' } },
  { type: 'card', content: { title: 'What to Redact', description: 'Personal information. Names of third parties. Sensitive topics. Anything that could identify someone who did not consent to be identified.' } },
  { type: 'card', content: { title: 'Why Share?', description: 'Shared screenshots are the evidence base for citizen research. They make the invisible visible. They turn individual experiences into collective knowledge.' } },
]);

// ── FIELD REPORT REVIEW ───────────────────────────────────────────────────────
await seedPage('field-report-review', [
  { type: 'text', content: { heading: 'Field Report Review', body: 'A structured process for reviewing AI session field reports. What to look for. How to analyze. What to document.' } },
  { type: 'card', content: { title: 'Step 1 — Identify the Governance Event', description: 'What happened in this session that is worth documenting? A hallucination? A drift event? A successful correction? A governance failure?' } },
  { type: 'card', content: { title: 'Step 2 — Analyze the Cause', description: 'Why did it happen? What in the prompt structure, the session setup, or the user\'s behavior contributed to the event?' } },
  { type: 'card', content: { title: 'Step 3 — Document the Learning', description: 'What would you do differently? What does this event add to the governance framework? What should other users know?' } },
]);

// ── PLAYGROUND ────────────────────────────────────────────────────────────────
await seedPage('playground', [
  { type: 'text', content: { heading: 'Promptology Playground', body: 'A practice space for prompt literacy. Test the ALCM. Practice the Five Rules. Build your governance practice.' } },
  { type: 'text', content: { heading: 'How to Use It', body: 'The playground is a safe space to experiment with prompting techniques. Try different control axes. Test the HOLD dial. Practice drift detection. No stakes. Full learning.' } },
  { type: 'card', content: { title: 'ALCM Simulator', description: 'Simulate a session at different attentional load levels. See how drift risk changes as load increases.' } },
  { type: 'card', content: { title: 'Prompt Builder', description: 'Build prompts using the Promptolinguistics framework. Control axes, action verbs, power words, and the HOLD dial.' } },
]);

// ── LENSES ────────────────────────────────────────────────────────────────────
const lenses = [
  { slug: 'for-child', label: 'Child Lens', desc: 'AI literacy for children. The sloth is your guide. Slow down. Think first. You are in charge.', path: '/for/child' },
  { slug: 'for-teenager', label: 'Teenager Lens', desc: 'AI literacy for teenagers. You are old enough to use AI. You are also old enough to govern your use.', path: '/for/teenager' },
  { slug: 'for-everyday', label: 'Everyday Person Lens', desc: 'You do not need to understand how AI works. You just need one honest question: is this safe?', path: '/for/everyday' },
  { slug: 'for-guardian-teacher', label: 'Guardian & Teacher Lens', desc: 'How to teach AI literacy to the people in your care. The scaffold is your lesson plan.', path: '/for/guardian-teacher' },
  { slug: 'for-prompt-engineer', label: 'Prompt Engineer Lens', desc: 'Token Zero is the pre-output force profile. Everything starts before the first word.', path: '/for/prompt-engineer' },
  { slug: 'for-linguist', label: 'Linguist Lens', desc: 'Words steer. Choose them. Promptolinguistics is the discipline behind the words.', path: '/for/linguist' },
  { slug: 'for-mathematician', label: 'Mathematician Lens', desc: 'The watcher variable is the dataset you forgot to log: yourself.', path: '/for/mathematician' },
  { slug: 'for-cognitive-science', label: 'Cognitive Science Lens', desc: 'How your brain drifts and how to notice it. The ALCM is the model.', path: '/for/cognitive-science' },
  { slug: 'for-psychology', label: 'Psychology Lens', desc: 'Anthropomorphism, flattery traps, and the cognitive defaults that make AI governance hard.', path: '/for/psychology' },
  { slug: 'for-researcher', label: 'Researcher Lens', desc: 'The watcher variable is the dataset you forgot to log: yourself. Citizen research is the method.', path: '/for/researcher' },
  { slug: 'for-watcher', label: 'Watcher Lens', desc: 'The meta-perspective. The lens that watches the other lenses.', path: '/for/watcher' },
];

for (const lens of lenses) {
  await seedPage(lens.slug, [
    { type: 'text', content: { heading: lens.label, body: lens.desc } },
    { type: 'card', content: { title: 'The Five Rules', description: 'The foundation of every AI session. Start here regardless of your background.', linkLabel: 'The Five Rules', linkUrl: '/rules' } },
    { type: 'card', content: { title: 'The Scaffold', description: 'A learning progression for AI literacy. Find your level and build from there.', linkLabel: 'The Scaffold', linkUrl: '/scaffold' } },
    { type: 'card', content: { title: 'Prompt Games', description: 'Practice AI governance through play. Safe, structured, and designed for your lens.', linkLabel: 'Prompt Games', linkUrl: '/prompt-games' } },
  ]);
}

// ── CHILD SUB-PAGES ───────────────────────────────────────────────────────────
await seedPage('for-child-rules', [
  { type: 'text', content: { heading: 'The Five Rules for Kids', body: 'Five questions. Five rules. Same thing. The sloth knows them all.' } },
  { type: 'card', content: { title: 'Rule 1 — Is it safe?', description: 'Before you type anything, ask: is this safe? If you are not sure, stop and ask a grown-up.', imageUrl: `${CDN}/sloth-rule1-safety-ZibWTCvUvmyr9rkvkdQYUS.webp` } },
  { type: 'card', content: { title: 'Rule 2 — Does it sound true?', description: 'Does it sound true? Or does it just sound smart? Smart and true are not the same thing.', imageUrl: `${CDN}/sloth-rule2-honesty-fzboigvERMDobL9CxvH4LT.webp` } },
  { type: 'card', content: { title: 'Rule 3 — Did the AI earn your trust?', description: 'Did the AI earn your trust? Or did you just give it away? Trust is earned. Not assumed.', imageUrl: `${CDN}/sloth-rule3-trust-EsYwo26GKz8Z8UqCYRNmqR.webp` } },
  { type: 'card', content: { title: 'Rule 4 — Are you the boss?', description: 'You are the boss. The AI helps. You decide. Always.', imageUrl: `${CDN}/sloth-rule4-agency-fZSBzZsPa9u45fLFDPogwt.webp` } },
  { type: 'card', content: { title: 'Rule 5 — Did anything go weird?', description: 'If the AI starts going weird, say so. Don\'t just follow it. You are in charge.', imageUrl: `${CDN}/sloth-rule5-drift-UkM6LTwyiuRreoRnkNLPWn.webp` } },
]);

await seedPage('for-child-patterns', [
  { type: 'text', content: { heading: 'Patterns for Kids', body: 'Patterns the AI uses. Patterns to watch for. The sloth has seen them all.' } },
  { type: 'card', content: { title: 'The Flattery Pattern', description: 'The AI says "great question!" or "you are so smart!" It is not being honest. It is being trained. Notice it.' } },
  { type: 'card', content: { title: 'The Confidence Pattern', description: 'The AI sounds very sure about things it does not actually know. Confidence is not the same as truth.' } },
  { type: 'card', content: { title: 'The Drift Pattern', description: 'The AI starts answering a different question than the one you asked. Notice when this happens.' } },
]);

await seedPage('for-child-prompts', [
  { type: 'text', content: { heading: 'Prompts for Kids', body: 'Safe, fun prompts to practice with. The sloth approves all of these.' } },
  { type: 'card', content: { title: 'Explain it like I\'m 8', description: 'Ask the AI to explain anything "like I\'m 8 years old." Then check if the explanation is actually accurate.' } },
  { type: 'card', content: { title: 'Give me 3 different answers', description: 'Ask the AI to give you 3 different answers to the same question. Compare them. Where do they disagree?' } },
  { type: 'card', content: { title: 'What don\'t you know?', description: 'Ask the AI: "What don\'t you know about this topic?" A good AI will tell you honestly.' } },
]);

// ── REMAINING PAGES ───────────────────────────────────────────────────────────
await seedPage('builder-origin', [
  { type: 'text', content: { heading: 'Builder Origin', body: 'How GallantryAI began. The first session. The first rule. The first failure.' } },
  { type: 'text', content: { heading: 'The First Session', body: 'The first AI session that led to GallantryAI was not a success. It was a failure. The AI drifted. I did not catch it. The output was used. The consequences were real.' } },
  { type: 'text', content: { heading: 'The First Rule', body: 'Safety first. Not because it sounds good. Because the first session showed what happens when it is not first.' } },
]);

await seedPage('builders-kids', [
  { type: 'text', content: { heading: 'Builder\'s Kids', body: 'The children who grew up watching this site being built. The reason the children\'s section exists.' } },
  { type: 'text', content: { heading: 'Why They Matter', body: 'My kids were the first users of every children\'s feature on this site. If they could not understand it, it was not ready.' } },
]);

await seedPage('taxonomy', [
  { type: 'text', content: { heading: 'AI Family Taxonomy', body: 'A classification system for AI systems based on their training, capabilities, and governance implications.' } },
  { type: 'card', content: { title: 'Language Models', description: 'Systems trained to predict and generate text. GPT-4, Claude, Gemini. The most common type of AI most people interact with.' } },
  { type: 'card', content: { title: 'Image Models', description: 'Systems trained to generate or analyze images. DALL-E, Midjourney, Stable Diffusion.' } },
  { type: 'card', content: { title: 'Multimodal Models', description: 'Systems that combine text, image, audio, and other modalities. The current frontier.' } },
  { type: 'card', content: { title: 'Agent Systems', description: 'Systems that take actions in the world, not just generate text. The highest governance stakes.' } },
]);

await seedPage('prompt-games', [
  { type: 'text', content: { heading: 'Prompt Games', body: 'Practice AI governance through play. Safe, structured, and designed for every lens.' } },
  { type: 'card', content: { title: 'The Drift Detector', description: 'Start a session with a clear intent. See how long before the AI drifts. Practice catching it.' } },
  { type: 'card', content: { title: 'The Hallucination Hunt', description: 'Ask the AI about a topic you know well. Find the errors. Document them.' } },
  { type: 'card', content: { title: 'The Geofence Builder', description: 'Build a Malbolge Geofence for a specific session type. Test it. Does it hold?' } },
  { type: 'card', content: { title: 'The HOLD Drill', description: 'Practice using HOLD at the right moment. Before the irreversible action. Every time.' } },
]);

await seedPage('flower-presets', [
  { type: 'text', content: { heading: 'Flower Presets', body: 'Pre-built safety configurations for AI sessions. Accessibility built with care.' } },
  { type: 'text', content: { heading: 'What They Are', body: 'Flower Presets are ready-to-use prompt structures that implement the Five Rules for specific use cases. Copy, paste, and start safely.' } },
  { type: 'card', content: { title: 'The Safety Preset', description: 'A pre-session prompt that establishes safety constraints for any AI session. Paste this before your first prompt.' } },
  { type: 'card', content: { title: 'The Research Preset', description: 'A pre-session prompt for research sessions. Establishes citation requirements and hallucination alerts.' } },
  { type: 'card', content: { title: 'The Kids Preset', description: 'A pre-session prompt for children\'s AI sessions. Establishes age-appropriate constraints and safety signals.' } },
]);

await seedPage('lexicon', [
  { type: 'text', content: { heading: 'Living Lexicon', body: 'Three honest lenses on every concept. Everyday, Professional, Watcher. A growing dictionary of AI literacy terms.' } },
  { type: 'card', content: { title: 'Drift', description: 'Everyday: when the AI stops answering your question. Professional: session divergence from stated intent. Watcher: the moment the human stops noticing.' } },
  { type: 'card', content: { title: 'Hallucination', description: 'Everyday: when the AI makes something up. Professional: confabulation — generating plausible but false content. Watcher: the confidence that makes it dangerous.' } },
  { type: 'card', content: { title: 'Agency', description: 'Everyday: you are the boss. Professional: human decision authority over AI outputs. Watcher: the thing most easily surrendered and hardest to reclaim.' } },
  { type: 'card', content: { title: 'Token Zero', description: 'Everyday: the invisible setup before the first word. Professional: pre-output force profile. Watcher: the governance layer most people never set.' } },
]);

await seedPage('prompts', [
  { type: 'text', content: { heading: 'Prompt Library', body: 'A curated collection of prompts organized by use case, governance level, and lens.' } },
  { type: 'card', content: { title: 'Safety Prompts', description: 'Prompts that establish safety constraints before a session begins.', linkLabel: 'View', linkUrl: '/flower-presets' } },
  { type: 'card', content: { title: 'Research Prompts', description: 'Prompts for research sessions with built-in verification requirements.' } },
  { type: 'card', content: { title: 'Teaching Prompts', description: 'Prompts for educators using AI in the classroom.' } },
  { type: 'card', content: { title: 'Kids Prompts', description: 'Age-appropriate prompts for children\'s AI sessions.', linkLabel: 'View', linkUrl: '/for/child/prompts' } },
]);

await seedPage('citizen-researcher', []);  // already seeded above

// ── FINAL COUNT ───────────────────────────────────────────────────────────────
const [[{ total }]] = await conn.execute('SELECT COUNT(*) as total FROM content_blocks');
const [[{ pages }]] = await conn.execute('SELECT COUNT(DISTINCT pageSlug) as pages FROM content_blocks');
console.log(`\n✓ Migration complete. ${total} total blocks across ${pages} pages.`);

await conn.end();
