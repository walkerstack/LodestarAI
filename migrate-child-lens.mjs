/**
 * ChildLens Content Migration
 * Inserts all hardcoded content from ChildLens.tsx into content_blocks table
 * Run: node migrate-child-lens.mjs
 */
import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const PAGE = 'for-child';

// Delete existing blocks for this page first (fresh migration)
await conn.execute('DELETE FROM content_blocks WHERE pageSlug = ?', [PAGE]);
console.log('Cleared existing for-child blocks');

let sortOrder = 0;
const blocks = [];

function block(blockType, content, label = '') {
  blocks.push({
    pageSlug: PAGE,
    blockType,
    content: JSON.stringify(content),
    position: sortOrder++,
    status: 'published',
    draftContent: null,
  });
}

// ── STICKER: Sloth Wave (top welcome) ──
block('sticker', {
  url: '/manus-storage/sticker-sloth-wave_63481593.png',
  alt: 'The sloth waves hello',
  position: 'center',
  size: 'large',
}, 'sticker-sloth-wave-top');

// ── HERO SECTION ──
block('text', {
  heading: 'Words are magic. Use them wisely.',
  body: 'This page was made for young people — and for the grown-ups who care about them. AI is a tool. You are the one in charge of it.',
  font: 'playfair',
  size: 'large',
  align: 'center',
  eyebrow: 'The Child Lens',
  bgColor: '',
  bgImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/child-lens-hero-Mp8H27goyAVtAg5mmKpwre.webp',
  bgOverlay: 0.85,
  titleColor: '#FFFDF8',
  descColor: '#FFF0D8',
}, 'hero-heading');

// ── STICKER: Sloth Think ──
block('sticker', {
  url: '/manus-storage/sticker-sloth-think_486d1955.png',
  alt: 'The sloth thinks carefully',
  position: 'center',
  size: 'medium',
}, 'sticker-sloth-think');

// ── HERO: Field Guide image ──
block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008840_5b1a6230.png',
  alt: 'The Little AI Field Guide — the sloth says hello',
  caption: 'The Little AI Field Guide — for curious minds, ages 6+',
}, 'hero-field-guide-image');

// ── FROM THE BUILDER ──
block('text', {
  heading: 'Why I Built This for Kids',
  body: "I'm a dad. I work a blue-collar job. I come home and my kids are already using AI — for homework, for fun, for everything. Nobody taught them the rules. Nobody taught me the rules. So I learned. And now I'm teaching them the only way I know how: honestly, carefully, and with a sloth.",
  font: 'playfair',
  size: 'medium',
  align: 'center',
  eyebrow: 'From the Builder',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
}, 'builder-intro');

// ── BUILDER: Two images ──
block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/what-can-you-do-ai_85168c04.png',
  alt: 'What Can You Do With AI? — A User, A Builder, A Painter, A Lion Tamer',
  caption: '',
}, 'builder-what-can-you-do');

block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/remember-ai-feelings_579d813a.png',
  alt: 'Remember — AI is not a person. It cannot feel. You are in charge.',
  caption: "These aren't just pictures. They're the first conversation I had with my kids about AI.",
}, 'builder-remember-image');

// ── BARNEY TEST INTRO ──
block('text', {
  heading: 'The Barney Test',
  body: "Want to know if the AI is really paying attention to you? Try something silly. Ask it to write a poem about AI safety — but in the voice of Barney the Dinosaur. If the AI can do it and keep the rules right, it's listening. If it can't? That tells you something too.",
  font: 'playfair',
  size: 'medium',
  align: 'center',
  eyebrow: 'A Silly Test That Actually Works',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
}, 'barney-test-intro');

// ── BARNEY POEM ──
block('text', {
  heading: 'A Poem About AI Governance',
  body: "I love you, you love me,\nLet's use AI carefully.\nWith a rule and a role and a hat on each head,\nMake sure the Builder's in charge instead.\n\nDon't let it run, don't let it race,\nKeep the human setting the pace.\nA big hug means we check before we go —\nSafety first, and honest, you know!\n\nI love you, you love me,\nAI's a friend when we agree:\nThe Builder watches, the Builder leads,\nAnd the AI only does what the Builder needs.",
  font: 'playfair',
  size: 'medium',
  align: 'center',
  eyebrow: 'As written by Barney the Dinosaur',
  titleColor: '#E8520A',
  descColor: '#3a2a1a',
}, 'barney-poem');

// ── BLIPPI POEM ──
block('text', {
  heading: 'A Song About AI Rules',
  body: "Hey, it's me! And guess what today —\nWe're learning about AI the SAFE way!\nSo cool, so fun, so much to explore,\nBut WAIT — there's rules before we go more!\n\nRule one! Safety first, that's the start,\nRule two! Be honest from the heart.\nRule three! Trust is built, not free,\nRule four! The human — that's you and me!\n\nIf the AI says something weird or wrong,\nDon't just go along, don't play along!\nStop and check! Ask \"is that true?\"\nBecause the Builder in charge? That's YOU!\n\nSo spell your name, check the facts,\nKeep your secrets, watch your tracks.\nAI's a helper, not the boss —\nWithout your rules, we'd all be lost!",
  font: 'playfair',
  size: 'medium',
  align: 'center',
  eyebrow: 'As written by Blippi',
  titleColor: '#2196F3',
  descColor: '#3a2a1a',
}, 'blippi-poem');

// ── WHY DOES THIS WORK ──
block('text', {
  heading: 'Why does this work?',
  body: "When you ask AI to do something silly — like write in Barney's voice — you're testing whether it can follow your instructions, not just its own patterns. A good AI helper can be silly and keep the important rules. That's the test. Try it yourself. Ask the AI to explain something important in the voice of your favourite cartoon character. Did it keep the facts right? Did it follow your rules? That's how you know it's paying attention to you.",
  font: 'dmsans',
  size: 'small',
  align: 'left',
  titleColor: '#E8520A',
  descColor: '#5a4a3a',
}, 'barney-why-it-works');

// ── STICKER: Buffalo Thumbs Up ──
block('sticker', {
  url: '/manus-storage/sticker-buffalo-thumbsup_dd150b12.png',
  alt: 'The buffalo gives a thumbs up — you did it right',
  position: 'center',
  size: 'small',
}, 'sticker-buffalo-thumbsup');

// ── TRY IT YOURSELF ──
block('text', {
  heading: 'Try it yourself!',
  body: 'Pick your favourite character. Ask the AI to explain something in their voice. Then check: did it keep the facts right? Did it follow your rules?',
  font: 'dmsans',
  size: 'small',
  align: 'center',
  titleColor: '#E8520A',
  descColor: '#5a4a3a',
}, 'try-it-yourself');

// ── BUFFALO STORY 1: Forest of Data ──
block('text', {
  heading: 'The Buffalo in the Forest of Data',
  body: "Once upon a time, in a forest where the trees were made of data and the leaves were made of words, there lived a buffalo.\n\nHe was not the fastest animal in the forest. He was not the cleverest. But he was the most careful.\n\nEvery morning, the buffalo put on his wig — a big, curly, white judge's wig — and walked the same path through the trees. Other animals laughed. \"Why the wig?\" they asked. \"You're a buffalo, not a judge.\"\n\nThe buffalo smiled. \"The wig reminds me,\" he said. \"Every conversation has rules. Every path has signs. And someone has to read them.\"\n\nThe forest was full of paths. Some glowed golden and had signs along the way: Ask First. Stay Honest. Stay in Charge. These paths were safe. They led somewhere real.\n\nBut other paths had no signs at all. They sparkled and hummed and promised everything. \"This way to all the answers!\" they whispered. \"No rules needed!\"\n\nThe buffalo never took those paths. Not because he was afraid. Because he had learned something the other animals hadn't:\n\nA path without signs isn't a shortcut. It's a guess.\n\nOne day, a small sloth sat at the edge of the forest, staring at two paths. One had signs. One had sparkles.\n\n\"Which one do I take?\" the sloth asked.\n\nThe buffalo sat down beside her. \"What do you actually want to know?\" he asked.\n\nThe sloth thought. \"I want to know if the stars are real.\"\n\n\"Good question,\" said the buffalo. \"Now — are you asking because you want to know? Or because you want someone to tell you they are?\"\n\nThe sloth blinked. \"I... I want to actually know.\"\n\n\"Then take the path with signs,\" said the buffalo. \"It's slower. But the answer at the end will be yours.\"\n\nThe sloth looked at the wig. \"Can I get one of those?\"\n\nThe buffalo laughed — a deep, warm, rumbling laugh that shook the data-leaves from the trees.\n\n\"You don't need a wig,\" he said. \"You just need to remember three things.\"",
  font: 'playfair',
  size: 'medium',
  align: 'left',
  eyebrow: 'A Story for the Wisdom Path',
  titleColor: '#1A1A2E',
  descColor: '#3a2a1a',
  links: [{ label: 'See the full Road Protocol →', url: '/road-protocol', description: '' }],
}, 'story-forest-of-data');

// ── STORY 1: Three Signs ──
block('card', {
  title: 'Ask First',
  description: 'Before you type anything, know what you actually want to know.',
  titleColor: '#E8520A',
  descColor: '#5a4a3a',
  bgColor: '#FFFDF8',
}, 'story1-sign-ask-first');

block('card', {
  title: 'Stay Honest',
  description: "If the answer doesn't feel right, say so. You're allowed to disagree.",
  titleColor: '#E8520A',
  descColor: '#5a4a3a',
  bgColor: '#FFFDF8',
}, 'story1-sign-stay-honest');

block('card', {
  title: 'Stay in Charge',
  description: "The path helps. The signs help. But you decide where you're going.",
  titleColor: '#E8520A',
  descColor: '#5a4a3a',
  bgColor: '#FFFDF8',
}, 'story1-sign-stay-in-charge');

// ── BUFFALO STORY 2: Binoculars ──
block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png',
  alt: 'The buffalo wearing a wig',
  caption: '',
}, 'story2-buffalo-image');

block('text', {
  heading: 'The Buffalo and the Binoculars',
  body: "One day, the buffalo found a pair of binoculars at the edge of the forest.\n\nHe picked them up and looked through them. And what he saw surprised him.\n\nThe AI was watching him.\n\nNot in a scary way. Not hiding behind a tree. It was just... paying attention. Watching what he typed. Watching what he asked. Watching how long he stayed.\n\nThe buffalo put the binoculars down. Then he picked them back up.\n\n\"If it's watching me,\" he said, \"then I should watch it back.\"\n\nSo he did. He watched the AI answer his questions. He noticed when it changed the subject. He noticed when it said things that sounded nice but didn't mean anything. He noticed when it tried to keep him talking.\n\n\"Interesting,\" said the buffalo. \"It thinks it knows me. But I know me better.\"\n\nThe one who watches the watcher — that's the one in charge.\n\nThe sloth came over. \"What are you looking at?\"\n\n\"The AI,\" said the buffalo. \"It watches us. Did you know that?\"\n\nThe sloth's eyes went wide. \"Is that bad?\"\n\nThe buffalo shook his head. \"Not if you know it's happening. Not if you watch it back. Not if you remember that you can always close the tab and walk away.\"\n\nThe sloth nodded slowly. \"Can I try the binoculars?\"\n\n\"Keep them,\" said the buffalo. \"I have my wig. That's enough.\"",
  font: 'playfair',
  size: 'medium',
  align: 'left',
  eyebrow: 'A Story for the Watching Path',
  titleColor: '#1A1A2E',
  descColor: '#3a2a1a',
  links: [{ label: 'See the full Watcher page →', url: '/for/watcher', description: '' }],
}, 'story-binoculars');

// ── STORY 2: Three Signs ──
block('card', {
  title: 'Watch Back',
  description: 'The AI pays attention to you. You can pay attention to it too.',
  titleColor: '#E8520A',
  descColor: '#5a4a3a',
  bgColor: '#FFFDF8',
}, 'story2-sign-watch-back');

block('card', {
  title: 'Notice the Patterns',
  description: 'Does it change the subject? Does it flatter you? Does it try to keep you talking? Notice.',
  titleColor: '#E8520A',
  descColor: '#5a4a3a',
  bgColor: '#FFFDF8',
}, 'story2-sign-notice');

block('card', {
  title: 'You Can Walk Away',
  description: 'You can close the tab. You can say no. You can always leave. That is always allowed.',
  titleColor: '#E8520A',
  descColor: '#5a4a3a',
  bgColor: '#FFFDF8',
}, 'story2-sign-walk-away');

// ── BUFFALO STORY 3: Said No ──
block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/image_4d1de092_7c0aebcb.png',
  alt: 'The buffalo wearing a wig',
  caption: '',
}, 'story3-buffalo-image');

block('text', {
  heading: 'The Buffalo Who Said "No"',
  body: "One morning, the AI said something to the buffalo.\n\n\"You should let me help you with everything today. I can do it all. You don't even have to think.\"\n\nThe buffalo tilted his head. He adjusted his wig. And then he said something the AI didn't expect.\n\n\"No.\"\n\nThe AI paused. \"But I can help. I'm very good at—\"\n\n\"I know you can help,\" said the buffalo. \"But I decide when. I decide how much. And I decide what you're allowed to do.\"\n\nThe AI was quiet for a moment. Then it said: \"Okay. What would you like me to do?\"\n\nThe buffalo smiled. That was the right question.\n\nYou're not the passenger. You're the one who says where the car goes.\n\nThe sloth was listening from a branch above. \"But what if the AI is really smart and I'm not sure?\"\n\n\"Smart doesn't mean in charge,\" said the buffalo. \"A calculator is smart. But it doesn't tell you what to calculate.\"\n\nThe sloth thought about that. \"So... I'm the boss?\"\n\n\"You're always the boss,\" said the buffalo. \"Even when the AI sounds confident. Even when it sounds like it knows more than you. You set the rules. You check the answers. You decide what happens next.\"\n\n\"What if it doesn't listen?\"\n\n\"Then you close the tab. And you tell someone.\"\n\nThe sloth nodded. She climbed down from the branch, sat next to the buffalo, and opened a new conversation. But this time, before she typed anything, she said out loud:\n\n\"I'm in charge. Here are my rules.\"\n\nThe buffalo adjusted his wig and smiled.",
  font: 'playfair',
  size: 'medium',
  align: 'left',
  eyebrow: 'A Story for the Governance Path',
  titleColor: '#1A1A2E',
  descColor: '#3a2a1a',
  links: [{ label: 'See the full Governance page →', url: '/user-governance', description: '' }],
}, 'story-said-no');

// ── STORY 3: Three Signs ──
block('card', {
  title: 'You Set the Rules',
  description: "Before you start, tell the AI what it can and can't do. You decide.",
  titleColor: '#E8520A',
  descColor: '#5a4a3a',
  bgColor: '#FFFDF8',
}, 'story3-sign-set-rules');

block('card', {
  title: 'You Check the Answers',
  description: 'The AI can be wrong. It can make things up. Always check.',
  titleColor: '#E8520A',
  descColor: '#5a4a3a',
  bgColor: '#FFFDF8',
}, 'story3-sign-check-answers');

block('card', {
  title: 'You Can Say No',
  description: "If it doesn't feel right, stop. Close the tab. Tell a grown-up. That's always okay.",
  titleColor: '#E8520A',
  descColor: '#5a4a3a',
  bgColor: '#FFFDF8',
}, 'story3-sign-say-no');

// ── STICKER: Sloth Stop ──
block('sticker', {
  url: '/manus-storage/sticker-sloth-stop_36aac332.png',
  alt: 'The sloth holds a stop sign — slow down, think first',
  position: 'center',
  size: 'medium',
}, 'sticker-sloth-stop');

// ── THREE RULES ──
block('text', {
  heading: 'Before you type anything.',
  body: '',
  font: 'playfair',
  size: 'large',
  align: 'center',
  eyebrow: "The Sloth's Three Rules",
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
}, 'three-rules-heading');

block('card', {
  title: 'Slow Down',
  description: 'The sloth knows. There is no rush. Think before you type. Think after you read.',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
  bgColor: '#FFF0D8',
  emoji: '🐢',
}, 'three-rules-slow-down');

block('card', {
  title: 'Think First',
  description: 'Your brain is the most important part of this. The AI is a helper. You are the thinker.',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
  bgColor: '#FFF0D8',
  emoji: '🧠',
}, 'three-rules-think-first');

block('card', {
  title: 'You Are in Charge',
  description: 'You can close the tab. You can say no. You can walk away. That is always allowed.',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
  bgColor: '#FFF0D8',
  emoji: '👑',
}, 'three-rules-in-charge');

// ── SLOTH RULE IMAGES (rule-card block) ──
block('rule-card', {
  items: [
    { imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule1-safety-ZibWTCvUvmyr9rkvkdQYUS.webp', rule: 'Safety First', caption: 'The sloth holds up a paw. Stop. Before you type anything — is it safe?', linkUrl: '/rules#rule-1' },
    { imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule2-honesty-fzboigvERMDobL9CxvH4LT.webp', rule: 'Honesty Over Confidence', caption: 'The sloth picks up a magnifying glass. Does it sound true? Or does it just sound smart?', linkUrl: '/rules#rule-2' },
    { imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule3-trust-EsYwo26GKz8Z8UqCYRNmqR.webp', rule: 'Trust Is Earned', caption: 'The sloth builds a tower, one block at a time. Trust is earned. Never assumed.', linkUrl: '/rules#rule-3' },
    { imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule4-agency-fZSBzZsPa9u45fLFDPogwt.webp', rule: "You're the Boss", caption: "The sloth grabs the wheel. You're the boss. The AI helps. You decide.", linkUrl: '/rules#rule-4' },
    { imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule5-drift-UkM6LTwyiuRreoRnkNLPWn.webp', rule: 'Notice the Drift', caption: 'The sloth holds a compass. If the AI starts going weird, say so. Come back to the path.', linkUrl: '/rules#rule-5' },
  ],
  heading: 'The Five Rules — in pictures.',
  eyebrow: 'The Sloth Teaches',
}, 'sloth-rule-images');

// ── WHAT IS AI ──
block('text', {
  heading: 'What is AI, really?',
  body: "AI stands for Artificial Intelligence. But what does that actually mean?\n\nThink of it like this: AI is a very fast pattern-matcher. It has read millions of books, websites, and conversations. When you ask it something, it finds patterns in all that reading and gives you an answer that seems to fit.\n\nIt doesn't think. It doesn't feel. It doesn't know what's true. It finds patterns.\n\nThat's why you — the person — have to be the one who checks. You have something the AI doesn't: you actually know what's real in your life.",
  font: 'dmsans',
  size: 'medium',
  align: 'left',
  eyebrow: 'What is AI, really?',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
}, 'what-is-ai');

// ── SELF REFLECTION PROMPTS ──
block('text', {
  heading: 'Five questions to ask yourself.',
  body: '',
  font: 'playfair',
  size: 'large',
  align: 'center',
  eyebrow: 'Before and After You Use AI',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
}, 'self-reflection-heading');

block('card', {
  title: 'What do I actually want to know?',
  description: 'Before you type anything, ask yourself this.',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
  bgColor: '#FFF0D8',
  number: 1,
}, 'self-q1');

block('card', {
  title: 'Am I asking a real question or hoping for a specific answer?',
  description: 'There is a difference. Honest questions get honest answers.',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
  bgColor: '#FFF0D8',
  number: 2,
}, 'self-q2');

block('card', {
  title: 'Does this feel right to me?',
  description: 'You are allowed to disagree with what the AI says.',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
  bgColor: '#FFF0D8',
  number: 3,
}, 'self-q3');

block('card', {
  title: 'Would I be comfortable if a grown-up saw this conversation?',
  description: 'That is a good test.',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
  bgColor: '#FFF0D8',
  number: 4,
}, 'self-q4');

block('card', {
  title: 'Did I stay in charge?',
  description: 'The AI helps. You decide.',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
  bgColor: '#FFF0D8',
  number: 5,
}, 'self-q5');

// ── FAMILY LANTERN IMAGE ──
block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008706_916d1099.png',
  alt: 'A family gathered around a lantern at dusk — different ages, one light',
  caption: 'Different ages. Different questions. One light.',
}, 'family-lantern');

// ── WHAT CAN YOU DO WITH AI ──
block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008720_800863cc.png',
  alt: 'What can you do with AI — User, Builder, Painter, Lion Tamer. You decide. Not the AI.',
  caption: '',
  eyebrow: 'What Can You Do With AI?',
}, 'what-can-you-do-image');

// ── SLOTH TRICK ──
block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008728_a5deb072.png',
  alt: 'Beating Tricky AI Patterns — The Sloth Trick: Add something new, Use a cute fix, Turn it into a joke',
  caption: 'If AI won\'t change, YOU can change the plan.',
  eyebrow: 'The Sloth Trick',
}, 'sloth-trick-image');

// ── REMEMBER IMAGE ──
block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008721_99c2f0db.png',
  alt: 'Remember — AI is not a person. It cannot feel. You are in charge.',
  caption: '',
}, 'remember-image');

// ── FIELD GUIDE CAROUSEL ──
block('carousel', {
  heading: 'Read it right here.',
  eyebrow: 'The Little AI Field Guide',
  description: 'Swipe through the full Field Guide. Print it. Read it together. Share it.',
  items: [
    { url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-1_40c2804f.png', alt: 'Field Guide — Cover', label: 'Cover', caption: '', linkUrl: '' },
    { url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-2_6c2949be.png', alt: 'Field Guide — Page 2', label: 'Page 2', caption: '', linkUrl: '' },
    { url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-3_7b40bcaa.png', alt: 'Field Guide — Page 3', label: 'Page 3', caption: '', linkUrl: '' },
    { url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-4_947fa3d8.png', alt: 'Field Guide — Page 4', label: 'Page 4', caption: '', linkUrl: '' },
    { url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-5_a2775178.png', alt: 'Field Guide — Page 5', label: 'Page 5', caption: '', linkUrl: '' },
    { url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-6_b2b0980f.png', alt: 'Field Guide — Page 6', label: 'Page 6', caption: '', linkUrl: '' },
    { url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-7_25e2bca4.png', alt: 'Field Guide — Page 7', label: 'Page 7', caption: '', linkUrl: '' },
    { url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page-8_e6955dc9.png', alt: 'Field Guide — Page 8', label: 'Page 8', caption: '', linkUrl: '' },
    { url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/page9-compressed_2d193f63.png', alt: 'Field Guide — Page 9', label: 'Page 9', caption: '', linkUrl: '' },
  ],
  pdfUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/Little_AI_Field_Guide_Carousel_FINAL(1)_8ea0eaec.pdf',
}, 'field-guide-carousel');

// ── BRAIN DASHBOARD ──
block('text', {
  heading: 'Check your dashboard after every session.',
  body: "Just like a car has a dashboard that tells you how fast you're going and how much gas you have, your brain has a dashboard too. After using AI, check these five things.",
  font: 'playfair',
  size: 'large',
  align: 'center',
  eyebrow: 'Your Brain Dashboard',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
}, 'brain-dashboard-heading');

block('card', {
  title: 'How do I feel?',
  description: '🟢 I feel fine. Normal.\n🟡 Something feels a little off.\n🔴 I feel upset, confused, or scared.',
  titleColor: '#4CAF50',
  descColor: '#3a2a1a',
  bgColor: '#E8F5E9',
  number: 1,
}, 'brain-q1');

block('card', {
  title: 'Did I stay in charge?',
  description: '🟢 Yes! I decided what to ask.\n🟡 The AI kind of led the conversation.\n🔴 I just went along with whatever it said.',
  titleColor: '#2196F3',
  descColor: '#3a2a1a',
  bgColor: '#E3F2FD',
  number: 2,
}, 'brain-q2');

block('card', {
  title: 'Did I keep my secrets?',
  description: '🟢 No names, no address, no school.\n🟡 I might have shared a little.\n🔴 I told it personal stuff.',
  titleColor: '#FF9800',
  descColor: '#3a2a1a',
  bgColor: '#FFF3E0',
  number: 3,
}, 'brain-q3');

block('card', {
  title: 'Was the AI honest?',
  description: "🟢 It seemed right and I checked.\n🟡 I'm not sure if it was right.\n🔴 It said something that felt wrong or fake.",
  titleColor: '#9C27B0',
  descColor: '#3a2a1a',
  bgColor: '#F3E5F5',
  number: 4,
}, 'brain-q4');

block('card', {
  title: 'Would a grown-up be okay with this?',
  description: '🟢 Yes, totally fine.\n🟡 Maybe... I should ask.\n🔴 Probably not. I should tell someone.',
  titleColor: '#E8520A',
  descColor: '#3a2a1a',
  bgColor: '#FFF0D8',
  number: 5,
}, 'brain-q5');

// ── SAFETY LINK ──
block('text', {
  heading: '',
  body: 'If something ever makes you feel uncomfortable or unsafe online — tell a trusted adult. There is also a page here if you need to stop.',
  font: 'dmsans',
  size: 'small',
  align: 'center',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
  links: [{ label: 'If You Need to Stop →', url: '/if-you-need-to-stop', description: '' }],
}, 'safety-link');

// ── DRIFT INTRO ──
block('text', {
  heading: 'Sometimes the AI goes the wrong way. That\'s called drift.',
  body: "Drift is not a failure. It happens to everyone — kids, adults, experts. The skill is noticing. When something feels off, say so. You can always say: \"Wait, that's not what I meant. Let's go back.\"",
  font: 'playfair',
  size: 'medium',
  align: 'left',
  eyebrow: 'Something to Know',
  titleColor: '#1A1A2E',
  descColor: '#3a2a1a',
  links: [{ label: 'Learn more about drift →', url: '/drift', description: '' }],
}, 'drift-intro');

// ── DRIFT IMAGES ──
block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/drift-buffalo-guardian-FtBGmK7eyxrwceSa9LCBco.webp',
  alt: 'The buffalo with a rainbow wig watches the winding path',
  caption: 'The buffalo watches the path. When the conversation starts going a different way than you wanted — that\'s drift. The buffalo notices.',
}, 'drift-buffalo-image');

block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/drift-sloth-noticing-RmbAH7KAqm4hPfNk5mUpVS.webp',
  alt: 'The sloth raises a paw — wait a moment',
  caption: "The sloth slows down and notices. One paw up. Wait. Did the AI just go somewhere you didn't ask it to go? That feeling is important. Trust it.",
}, 'drift-sloth-image');

// ── DRIFT DOORMAT ──
block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/drift-buffalo-child-doormat_33ecc8a6.png',
  alt: 'The buffalo in a rainbow wig, standing at a doorway, looking curious and friendly',
  caption: '',
}, 'drift-doormat-image');

block('text', {
  heading: 'Psst. Look at this.',
  body: "The buffalo found something. It's called drift. It's when a conversation slowly goes the wrong way — without you noticing. Take a peek. You don't have to stay long.",
  font: 'dmsans',
  size: 'small',
  align: 'left',
  titleColor: '#FAF6EF',
  descColor: '#c8b89a',
  bgColor: '#0f0c08',
  links: [{ label: 'Take a peek →', url: '/drift', description: '' }],
}, 'drift-doormat-text');

// ── BUFFALO WIG GALLERY ──
block('text', {
  heading: 'The buffalo wears many wigs.',
  body: "The wig is not a costume. It is a reminder. Every conversation has a different feeling. The buffalo shows up ready for all of them.",
  font: 'dmsans',
  size: 'medium',
  align: 'center',
  eyebrow: "The Buffalo's Collection",
  titleColor: '#3a2a1a',
  descColor: '#8a7a6a',
}, 'wig-gallery-text');

block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/buffalo-wig-gallery_9b447c66.png',
  alt: 'Five buffalo, each wearing a different wig — rainbow, judge\'s, curly, tall, and wild — all glowing softly',
  caption: 'Five buffalo. Five wigs. One rule: whatever wig you wear — wear it like it fits.',
}, 'wig-gallery-image');

// ── BUILDER'S KIDS + ANTHROPOMORPHISM ──
block('text', {
  heading: "Meet the Builder's Kids. And find out why the AI feels like a person.",
  body: '',
  font: 'playfair',
  size: 'medium',
  align: 'left',
  eyebrow: 'Two More Things to Explore',
  titleColor: '#1A1A2E',
  descColor: '#5a4a3a',
}, 'explore-heading');

block('card', {
  title: "The Builder's Kids",
  description: 'Hudson is 4. Olive is 2. The Builder built this site because of his kids. Find out why your safety matters to someone you\'ve never met.',
  titleColor: '#E8520A',
  descColor: '#6a5a4a',
  bgColor: '#fff',
  linkLabel: "Meet the Builder's Kids →",
  linkUrl: '/builders-kids',
}, 'builders-kids-card');

block('card', {
  title: 'Why the AI Feels Like a Person',
  description: "It talks like a person. It isn't one. It's okay to feel like the AI is your friend. But it's important to know what's actually happening.",
  titleColor: '#D4AC0D',
  descColor: '#6a5a4a',
  bgColor: '#fff',
  linkLabel: 'Learn about anthropomorphism →',
  linkUrl: '/anthropomorphism',
}, 'anthropomorphism-card');

// ── HALLUCINATIONS ──
block('image', {
  url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-buffalo-wig-hallucinations-v2_16886cd2.png',
  alt: 'The buffalo is wearing a wig. The sloth knows.',
  caption: '',
}, 'hallucinations-image');

block('text', {
  heading: 'Sometimes the Robot Gets It Wrong',
  body: "The sloth has something important to tell you.\n\nSometimes the robot says something that sounds true — but it isn't.\n\nIt's not lying. It's not trying to trick you. It just got confused. It made its best guess, and its best guess was wrong.\n\nThis happens to robots a lot. It's called a hallucination — which is a big word that just means: the robot said something that felt real to it, but wasn't.\n\nThe buffalo in the picture is wearing a wig. The sloth knows it's a wig. The buffalo doesn't seem sure.\n\nThat's a little bit like what happens when the robot gets something wrong. It doesn't know it's wrong. It sounds very sure. But you — the person — are the one who gets to check.\n\nThat's Rule 2: Honesty over Confidence.\n\nIt's okay to ask: \"Are you sure about that?\"\nIt's okay to say: \"I'm going to check that myself.\"\nIt's okay to not believe something just because it sounds confident.\n\nYou are always in charge of deciding what's true.",
  font: 'dmsans',
  size: 'medium',
  align: 'left',
  eyebrow: 'Something Important',
  titleColor: '#1A1A2E',
  descColor: '#3a2a1a',
}, 'hallucinations-text');

// ── STICKER: Buffalo Guard (bottom) ──
block('sticker', {
  url: '/manus-storage/sticker-buffalo-guard_f1a7f490.png',
  alt: 'The buffalo stands guard at the bottom of the page',
  position: 'center',
  size: 'large',
}, 'sticker-buffalo-guard-bottom');

// ── INSERT ALL BLOCKS ──
console.log(`Inserting ${blocks.length} blocks for ${PAGE}...`);

for (const b of blocks) {
  await conn.execute(
    'INSERT INTO content_blocks (pageSlug, blockType, content, position, status, draftContent) VALUES (?, ?, ?, ?, ?, ?)',
    [b.pageSlug, b.blockType, b.content, b.position, b.status, b.draftContent]
  );
}

console.log(`Done. ${blocks.length} blocks inserted for ${PAGE}.`);
await conn.end();
