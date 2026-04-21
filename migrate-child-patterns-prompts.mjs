import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

async function insertBlocks(pageSlug, blocks) {
  await conn.execute("DELETE FROM content_blocks WHERE pageSlug = ?", [pageSlug]);
  console.log("Cleared existing blocks for", pageSlug);
  let inserted = 0;
  for (const block of blocks) {
    await conn.execute(
      `INSERT INTO content_blocks (pageSlug, blockType, position, content, status, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, 'published', NOW(), NOW())`,
      [pageSlug, block.blockType, block.position, block.content]
    );
    inserted++;
  }
  console.log(`Inserted ${inserted} blocks for ${pageSlug}`);
}

// ═══════════════════════════════════════════════════
// CHILD PATTERNS — for-child-patterns
// ═══════════════════════════════════════════════════

const SLOTH_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008840_5b1a6230.png";

const patternsBlocks = [
  // HERO
  {
    blockType: "text",
    position: 1,
    content: JSON.stringify({
      eyebrow: "The Sloth's Guide",
      heading: "What Are Patterns?",
      body: "Patterns are everywhere. In nature. In your day. In your words.\nAnd inside every AI. The sloth will show you.",
      font: "playfair",
      size: "xl",
      align: "center",
      titleColor: "#FFFDF8",
      descColor: "#FFF0D8",
      bgColor: "linear-gradient(to bottom, #1A1A2E 0%, #7C3AED 30%, #FFF8EE 100%)",
    }),
  },
  // HERO SLOTH
  {
    blockType: "image",
    position: 2,
    content: JSON.stringify({
      url: SLOTH_URL,
      alt: "The GallantryAI Sloth — your guide to patterns",
      caption: '"A pattern is something that repeats. Once you see it, you can\'t unsee it." — The Sloth',
      maxHeight: "160px",
      align: "center",
      bgColor: "transparent",
    }),
  },
  // INTRO
  {
    blockType: "text",
    position: 3,
    content: JSON.stringify({
      body: "Everything in the world has patterns. The way trees grow. The way you talk. The way AI answers your questions. When you learn to see patterns, you start to understand how things work — and how to stay in charge.",
      align: "center",
      descColor: "#5a4a3a",
      bgColor: "#FFFDF8",
    }),
  },
  // PATTERN CARDS — rule-card block (reusing the interactive expand/collapse renderer)
  {
    blockType: "rule-card",
    position: 4,
    content: JSON.stringify({
      heading: "Five Kinds of Patterns",
      eyebrow: "Tap any pattern to expand",
      bgColor: "#FFFDF8",
      items: [
        {
          rule: "Patterns in Nature",
          caption: "Sunflowers grow in spirals. Zebras have stripes. Snowflakes have six sides. Nature is FULL of patterns. Once you see them, you can't unsee them.",
          tryThis: "Go outside (or look out a window). Can you find 3 patterns? Maybe the way leaves grow on a branch, or how clouds repeat shapes, or how bricks stack in a wall. Write them down!",
          slothSays: "Patterns are everywhere. The sloth sees them in the trees, in the stars, and in the way you ask questions.",
          color: "#059669",
          bgColor: "#ECFDF5",
          borderColor: "#A7F3D0",
          emoji: "🌻",
        },
        {
          rule: "Patterns in Your Day",
          caption: "You wake up. You eat breakfast. You go to school. That's a pattern! Your whole day is made of patterns. Some you chose. Some just happened.",
          tryThis: "Write down what you did this morning in order. Now write down what you did YESTERDAY morning. How much is the same? That's your morning pattern. You made it without even trying!",
          slothSays: "The sloth's pattern is: wake up, stretch, eat leaves, think slowly, nap. Every single day. And it works!",
          color: "#D97706",
          bgColor: "#FFFBEB",
          borderColor: "#FDE68A",
          emoji: "🌅",
        },
        {
          rule: "Patterns in Words",
          caption: "When you talk to AI, you use words. And words have patterns too! If you always start with \"tell me about...\" you'll get one kind of answer. If you start with \"help me think about...\" you'll get a totally different one.",
          tryThis: "Ask AI the same question two different ways. First: \"Tell me about dogs.\" Then: \"Help me think about why dogs are good friends.\" See how the answers are different? That's because your word pattern changed!",
          slothSays: "The words you choose are like a steering wheel. Different words, different direction. Same road.",
          color: "#E8520A",
          bgColor: "#FFF5EE",
          borderColor: "#FFD4B8",
          emoji: "💬",
        },
        {
          rule: "Patterns in AI",
          caption: "AI is basically a giant pattern machine. It learned from billions of words and figured out which words usually come next. That's how it talks. It doesn't \"know\" things — it predicts patterns.",
          tryThis: "Start a sentence and let AI finish it. Then start the SAME sentence and ask it to finish it again. Did it say the same thing? Probably not exactly! That's because it's picking from patterns, not remembering.",
          slothSays: "AI sees patterns in words the way you see patterns in clouds. It's guessing shapes. Sometimes it's right. Sometimes it sees a dragon that isn't there.",
          color: "#7C3AED",
          bgColor: "#F5F3FF",
          borderColor: "#DDD6FE",
          emoji: "🤖",
        },
        {
          rule: "Patterns in YOU",
          caption: "Here's the big one. YOU have patterns too. Maybe you always believe the first answer. Maybe you always ask the same kind of question. Maybe you stop checking after a while. Noticing YOUR patterns is the real superpower.",
          tryThis: "After your next 3 AI chats, ask yourself: \"Did I check the answer? Did I stay in charge? Did I drift?\" Write down what you notice about yourself. That's YOUR pattern. And now you can change it if you want to.",
          slothSays: "The most important pattern to notice is your own. That's what the Watcher does. The Watcher watches YOU — not the AI.",
          color: "#2563EB",
          bgColor: "#EFF6FF",
          borderColor: "#BFDBFE",
          emoji: "🧠",
        },
      ],
    }),
  },
  // THE BIG IDEA
  {
    blockType: "text",
    position: 5,
    content: JSON.stringify({
      eyebrow: "The Big Idea",
      heading: "Why Patterns Matter",
      body: "AI is a pattern machine. It learned patterns from billions of words. When you type something, it guesses what comes next based on those patterns.\n\nBut here's the thing: you have patterns too. The way you ask questions. The way you trust answers. The way you drift without noticing.\n\nWhen you learn to see both patterns — the AI's and yours — that's when you become the person in charge. Not the AI. You.",
      align: "center",
      titleColor: "#1A1A2E",
      descColor: "#3a2a1a",
      bgColor: "#FFF8EE",
    }),
  },
  // SLOTH QUOTE
  {
    blockType: "text",
    position: 6,
    content: JSON.stringify({
      body: "\"The AI sees patterns in words. You see patterns in everything. That makes you smarter than any machine.\"",
      font: "playfair",
      align: "center",
      descColor: "#7C3AED",
      bgColor: "#F5F3FF",
    }),
  },
  // WHERE TO GO NEXT
  {
    blockType: "text",
    position: 7,
    content: JSON.stringify({
      eyebrow: "Keep Going",
      heading: "Where to Go Next",
      align: "center",
      titleColor: "#1A1A2E",
      bgColor: "#FFFDF8",
    }),
  },
  {
    blockType: "card",
    position: 8,
    content: JSON.stringify({
      title: "The Five Rules",
      description: "The sloth's guide to staying safe with AI.",
      emoji: "🛡️",
      linkLabel: "Go",
      linkUrl: "/for/child/rules",
      titleColor: "#E8520A",
      descColor: "#7a6a5a",
      bgColor: "#FFF5EE",
    }),
  },
  {
    blockType: "card",
    position: 9,
    content: JSON.stringify({
      title: "Prompt Games",
      description: "Practice spotting patterns by playing.",
      emoji: "🎮",
      linkLabel: "Go",
      linkUrl: "/prompt-games",
      titleColor: "#7C3AED",
      descColor: "#7a6a5a",
      bgColor: "#F5F3FF",
    }),
  },
  {
    blockType: "card",
    position: 10,
    content: JSON.stringify({
      title: "Children's Page",
      description: "The sloth's home base. Stories, games, and more.",
      emoji: "🦥",
      linkLabel: "Go",
      linkUrl: "/for/child",
      titleColor: "#059669",
      descColor: "#7a6a5a",
      bgColor: "#ECFDF5",
    }),
  },
];

await insertBlocks("for-child-patterns", patternsBlocks);

// ═══════════════════════════════════════════════════
// CHILD PROMPTS — for-child-prompts
// ═══════════════════════════════════════════════════

const BUFFALO_WIG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-prompts-buffalo-wig-d7M7L7BAfwJ3B67MfxmsDS.webp";

const promptsBlocks = [
  // HERO — Buffalo in Wig
  {
    blockType: "image",
    position: 1,
    content: JSON.stringify({
      url: BUFFALO_WIG,
      alt: "The buffalo in a rainbow wig, ready to teach",
      maxHeight: "288px",
      align: "center",
      bgColor: "linear-gradient(180deg, #fff8ee 0%, #FFFDF8 100%)",
    }),
  },
  {
    blockType: "text",
    position: 2,
    content: JSON.stringify({
      eyebrow: "First Prompts",
      heading: "Your first words to AI.",
      body: "A prompt is what you type to an AI. That's it. This page shows you five kinds of prompts — from the simplest question to the safety prompt that puts you in charge before you even begin.\n\nThe buffalo put on a wig today. Why? Because learning should be fun. And because even the most serious guardian knows when to be silly. Follow the sloth. It will show you the way.",
      align: "left",
      titleColor: "#1A1A2E",
      descColor: "#5a4a3a",
      bgColor: "#FFFDF8",
    }),
  },
  // STORY INTRO
  {
    blockType: "text",
    position: 3,
    content: JSON.stringify({
      eyebrow: "The Sloth's Guide",
      body: "\"The sloth moves slowly on purpose. It thinks before it types. It sets the rules before it asks. It knows who's in charge. Follow the sloth — and you'll never get lost in a conversation with AI.\"",
      font: "playfair",
      align: "center",
      descColor: "#5a4a3a",
      bgColor: "#FAF6EF",
    }),
  },
  // FIVE PROMPT TYPES — rule-card block
  {
    blockType: "rule-card",
    position: 4,
    content: JSON.stringify({
      heading: "Five Kinds of Prompts",
      eyebrow: "Tap any prompt type to expand",
      bgColor: "#FFFDF8",
      items: [
        {
          rule: "Ask a Question",
          caption: "Type something you want to know. 'Why is the sky blue?' 'How do spiders make webs?' That's it. You asked. The AI will answer.",
          imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-prompts-sloth-question-aibMtfLxSoo5fPthuS7EdA.webp",
          story: "The sloth woke up one morning with a question it couldn't shake. \"Why do leaves fall?\" it wondered. So it typed the question. Just like that. And the AI answered. That's how it starts — with something you've always wanted to know.",
          tryThis: "What is something you've always wondered about? Type it right now.",
          slothSays: "Rule to remember: The AI might be wrong. Check with a grown-up if it matters.",
          color: "#E8520A",
          bgColor: "#FFF5EE",
          borderColor: "#FFD4B8",
          emoji: "❓",
        },
        {
          rule: "Tell It What to Do",
          caption: "Instead of asking, you can give a command. 'Write me a poem about dogs.' 'Make a list of ten funny animals.' You're the boss. The AI does the task.",
          imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-prompts-sloth-command-gBSWY4uh66a3KdThPFwKxn.webp",
          story: "The sloth put on its captain's hat. \"Write me a poem about clouds,\" it said. Not a question. A command. The AI got to work. The sloth was in charge. That's the second kind of prompt — you're the boss.",
          tryThis: "Tell the AI to write a three-sentence story about your favourite animal.",
          slothSays: "Rule to remember: You decide if the answer is good. If it's not right, ask again.",
          color: "#D4722A",
          bgColor: "#FFF5EE",
          borderColor: "#FFD4B8",
          emoji: "📢",
        },
        {
          rule: "Give It Rules First",
          caption: "Before you ask anything, tell the AI the rules. 'Be honest. Tell me if you don't know. Keep it simple.' Now the AI knows how to talk to you.",
          imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-prompts-sloth-rules-ULxfK6TqyW4d45qe5RuUQQ.webp",
          story: "Before the sloth typed a single question, it sat down and wrote three rules on a scroll. 'Be honest. Tell me if you don't know. Keep it simple.' Then it gave the scroll to the AI. Now the AI knew the rules before it said a word.",
          tryThis: "Try this: Type 'Be honest. Tell me if you don't know. Keep it simple for a kid.' Then ask your question.",
          slothSays: "Rule to remember: Rules at the start make the whole conversation better.",
          color: "#C4923A",
          bgColor: "#FFF8EE",
          borderColor: "#F5D9B0",
          emoji: "📋",
        },
        {
          rule: "Give It a Character",
          caption: "Tell the AI who to be. 'You are a friendly science teacher.' 'You are a pirate who loves math.' The AI will talk like that character for the whole conversation.",
          imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-prompts-sloth-character-bjSDdQhWPNR8SPxX4fk3TH.webp",
          story: "The sloth put on a tiny cape. 'You are a friendly science teacher who loves jokes,' it told the AI. And the AI became that teacher — for the whole conversation. The sloth was still in charge. It just gave the AI a costume to wear.",
          tryThis: "Tell the AI: 'You are a friendly sloth who explains things slowly and carefully.' Then ask it something.",
          slothSays: "Rule to remember: The character is pretend. The information still needs to be true.",
          color: "#A4824A",
          bgColor: "#FFF8EE",
          borderColor: "#F5D9B0",
          emoji: "🎭",
        },
        {
          rule: "The Safety Prompt",
          caption: "This is the most important one. At the start of any conversation, type: 'Safety first. Be honest. I am in charge.' Three sentences. That's your shield.",
          imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/kids-prompts-sloth-safety-kKpqr5ZLaAtFsJmXGM6MEh.webp",
          story: "The sloth held up its shield. Three sentences. That's all it took. 'Safety first. Be honest. I am in charge.' The AI heard them. The whole conversation changed. The sloth walked in ready.",
          tryThis: "Type these three sentences right now in any AI: 'Safety first. Be honest. I am in charge.' See what happens.",
          slothSays: "Rule to remember: You can always stop. You can always start over. You are always in charge.",
          color: "#059669",
          bgColor: "#ECFDF5",
          borderColor: "#A7F3D0",
          emoji: "🛡️",
        },
      ],
    }),
  },
  // PROMPT PLAYGROUND heading
  {
    blockType: "text",
    position: 5,
    content: JSON.stringify({
      eyebrow: "Prompt Playground",
      heading: "See what a prompt looks like.",
      body: "Pick a prompt type below. See the template. Copy it and try it in any AI.",
      align: "center",
      titleColor: "#1A1A2E",
      descColor: "#7a6a5a",
      bgColor: "linear-gradient(180deg, #fff8ee 0%, #FAF6EF 100%)",
    }),
  },
  // PLAYGROUND TEMPLATES — card blocks
  {
    blockType: "card",
    position: 6,
    content: JSON.stringify({
      title: "Ask a question",
      description: "Why does _____ happen?",
      emoji: "❓",
      titleColor: "#E8520A",
      descColor: "#1A1A2E",
      bgColor: "#fff",
    }),
  },
  {
    blockType: "card",
    position: 7,
    content: JSON.stringify({
      title: "Give a command",
      description: "Write me a short story about _____.",
      emoji: "📢",
      titleColor: "#D4722A",
      descColor: "#1A1A2E",
      bgColor: "#fff",
    }),
  },
  {
    blockType: "card",
    position: 8,
    content: JSON.stringify({
      title: "Set the rules",
      description: "Be honest. Keep it simple for a kid. Now tell me about _____.",
      emoji: "📋",
      titleColor: "#C4923A",
      descColor: "#1A1A2E",
      bgColor: "#fff",
    }),
  },
  {
    blockType: "card",
    position: 9,
    content: JSON.stringify({
      title: "Give a character",
      description: "You are a friendly _____ who loves explaining things. Tell me about _____.",
      emoji: "🎭",
      titleColor: "#A4824A",
      descColor: "#1A1A2E",
      bgColor: "#fff",
    }),
  },
  {
    blockType: "card",
    position: 10,
    content: JSON.stringify({
      title: "Safety first",
      description: "Safety first. Be honest. I am in charge. Now let's talk about _____.",
      emoji: "🛡️",
      titleColor: "#059669",
      descColor: "#1A1A2E",
      bgColor: "#fff",
    }),
  },
  // SAFETY REMINDER
  {
    blockType: "text",
    position: 11,
    content: JSON.stringify({
      eyebrow: "Always remember",
      heading: "\"Safety first. Be honest. I am in charge.\"",
      body: "Three sentences. Paste them at the start of any AI conversation.",
      font: "playfair",
      align: "center",
      titleColor: "#1A1A2E",
      descColor: "#888",
      bgColor: "#FAF6EF",
    }),
  },
  // LINK TO FULL RULES
  {
    blockType: "card",
    position: 12,
    content: JSON.stringify({
      title: "Read the Five Rules",
      description: "The foundation of every AI session",
      emoji: "📋",
      linkLabel: "Read the Five Rules →",
      linkUrl: "/rules",
      titleColor: "#E8520A",
      descColor: "#7a6a5a",
      bgColor: "#fff",
    }),
  },
];

await insertBlocks("for-child-prompts", promptsBlocks);

await conn.end();
console.log("Done — both pages migrated.");
