import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const PAGE_SLUG = "for-child-rules";

// Delete existing blocks for this page first
await conn.execute("DELETE FROM content_blocks WHERE pageSlug = ?", [PAGE_SLUG]);
console.log("Cleared existing blocks for", PAGE_SLUG);

const blocks = [
  // ── HERO ──
  {
    blockType: "text",
    position: 1,
    content: JSON.stringify({
      eyebrow: "The Sloth's Guide",
      heading: "The Five Rules",
      body: "Five things to remember every time you talk to AI.\nThe sloth teaches them. You practice them. Together.",
      font: "playfair",
      size: "xl",
      align: "center",
      titleColor: "#FFFDF8",
      descColor: "#FFF0D8",
      bgColor: "linear-gradient(to bottom, #1A1A2E 0%, #E8520A 30%, #FFF8EE 100%)",
    }),
  },
  // ── HERO SLOTH IMAGE ──
  {
    blockType: "image",
    position: 2,
    content: JSON.stringify({
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008840_5b1a6230.png",
      alt: "The GallantryAI Sloth — your guide to the Five Rules",
      caption: '"Slow down. Think first. You\'re in charge." — The Sloth',
      maxHeight: "160px",
      align: "center",
      bgColor: "transparent",
    }),
  },
  // ── INTRO ──
  {
    blockType: "text",
    position: 3,
    content: JSON.stringify({
      body: "These are the same five rules the grown-ups use. But the sloth is going to explain them in a way that makes sense for you. Tap any rule to hear the sloth's story.",
      align: "center",
      descColor: "#5a4a3a",
      bgColor: "#FFFDF8",
    }),
  },
  // ── THE FIVE RULES — rule-card block with full content ──
  {
    blockType: "rule-card",
    position: 4,
    content: JSON.stringify({
      heading: "The Five Rules",
      eyebrow: "Tap any rule to expand",
      bgColor: "#FFFDF8",
      items: [
        {
          rule: "Safety First",
          caption: "Is it safe? If you're not sure — stop. Ask a grown-up. The sloth always stops first.",
          imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule1-safety-ZibWTCvUvmyr9rkvkdQYUS.webp",
          linkUrl: "/rules#rule-1",
          story: "Imagine you're walking through a forest with the sloth. You come to a bridge. The sloth holds up a paw. \"Wait,\" it says. \"Let's check if it's safe before we cross.\" That's Rule 1. Before you type anything into AI, ask yourself: is this safe?",
          tryThis: "Before your next AI chat, write down what you want to ask. Then ask yourself: \"Would I be okay if my teacher or parent saw this?\" If yes — go ahead! If not — the sloth says stop.",
          slothSays: "If it doesn't feel safe, it isn't. Your tummy knows before your brain does.",
          color: "#E8520A",
          bgColor: "#FFF5EE",
          borderColor: "#FFD4B8",
        },
        {
          rule: "Honesty Over Confidence",
          caption: "Does it sound true? Or does it just sound smart? Smart-sounding is not the same as right.",
          imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule2-honesty-fzboigvERMDobL9CxvH4LT.webp",
          linkUrl: "/rules#rule-2",
          story: "The sloth picks up a magnifying glass. \"Look closely,\" it says. \"Just because the AI says something in a big, confident voice doesn't mean it's true. Even grown-ups get fooled by this.\"",
          tryThis: "Ask AI a question you already know the answer to. Did it get it right? Now ask it something you DON'T know. Can you check the answer somewhere else? That's the honesty test.",
          slothSays: "The sloth always double-checks. Even when the answer sounds really, really good.",
          color: "#D97706",
          bgColor: "#FFFBEB",
          borderColor: "#FDE68A",
        },
        {
          rule: "Trust Is Earned",
          caption: "Did the AI earn your trust? Or did you just give it away? Trust takes time. Even with sloths.",
          imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule3-trust-EsYwo26GKz8Z8UqCYRNmqR.webp",
          linkUrl: "/rules#rule-3",
          story: "The sloth is building a tower. One block at a time. \"See?\" it says. \"Trust is like this tower. You build it slowly. If someone knocks it down, you start again. You don't just hand someone your tower.\"",
          tryThis: "Use AI three times this week. After each time, give it a trust score from 1 to 5. Was it helpful? Was it honest? Did it make stuff up? Write it down. That's how you build trust — by paying attention.",
          slothSays: "Trust is a ladder. You climb it one rung at a time. There are no elevators.",
          color: "#059669",
          bgColor: "#ECFDF5",
          borderColor: "#A7F3D0",
        },
        {
          rule: "You're the Boss",
          caption: "You're in charge. The AI helps. You decide. If the AI starts leading — take the wheel back.",
          imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule4-agency-fZSBzZsPa9u45fLFDPogwt.webp",
          linkUrl: "/rules#rule-4",
          story: "The sloth grabs the steering wheel. \"This is YOUR ship,\" it says. \"The AI is the map. But YOU decide where to go. If the map says 'turn left' and you know the road goes right — trust yourself.\"",
          tryThis: "Next time AI gives you an answer, don't just say \"okay.\" Ask yourself: \"Is this what I actually wanted?\" If not, tell the AI: \"That's not what I meant. Let me try again.\" YOU are the boss.",
          slothSays: "If the AI is driving and you're just watching — who's really in charge?",
          color: "#7C3AED",
          bgColor: "#F5F3FF",
          borderColor: "#DDD6FE",
        },
        {
          rule: "Notice the Drift",
          caption: "If the AI starts going weird — say so. Don't just follow it. Come back to the path.",
          imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule5-drift-UkM6LTwyiuRreoRnkNLPWn.webp",
          linkUrl: "/rules#rule-5",
          story: "The sloth holds up a compass. \"Sometimes,\" it says, \"you start walking one way and end up somewhere totally different. That's drift. It's not bad — but you have to notice it. Then you can choose: keep going, or come back.\"",
          tryThis: "Start an AI chat about one topic. After 5 messages, check: are you still talking about the same thing? If not — you found drift! Say: \"We drifted. Let's go back.\" Congratulations. You just governed yourself.",
          slothSays: "The moment you notice the drift is the moment you're back in control. Noticing IS the superpower.",
          color: "#2563EB",
          bgColor: "#EFF6FF",
          borderColor: "#BFDBFE",
        },
      ],
    }),
  },
  // ── SELF-REFLECTION PROMPTS ──
  {
    blockType: "text",
    position: 5,
    content: JSON.stringify({
      eyebrow: "Before You Start",
      heading: "Ask Yourself These Questions",
      body: "The sloth asks these every time. Now it's your turn.",
      align: "center",
      titleColor: "#1A1A2E",
      descColor: "#7a6a5a",
      bgColor: "#FFF8EE",
    }),
  },
  {
    blockType: "card",
    position: 6,
    content: JSON.stringify({
      title: "How am I feeling right now?",
      description: "Your mood changes how you use AI. Check in with yourself first.",
      titleColor: "#1A1A2E",
      descColor: "#7a6a5a",
      bgColor: "#fff",
    }),
  },
  {
    blockType: "card",
    position: 7,
    content: JSON.stringify({
      title: "What do I actually want to know?",
      description: "Not what sounds cool. What matters to you right now.",
      titleColor: "#1A1A2E",
      descColor: "#7a6a5a",
      bgColor: "#fff",
    }),
  },
  {
    blockType: "card",
    position: 8,
    content: JSON.stringify({
      title: "Who did I ask the AI to be?",
      description: "Did you set rules? Or did you just start typing?",
      titleColor: "#1A1A2E",
      descColor: "#7a6a5a",
      bgColor: "#fff",
    }),
  },
  {
    blockType: "card",
    position: 9,
    content: JSON.stringify({
      title: "Am I asking a real question or hoping for a specific answer?",
      description: "There's a difference. Honest questions get honest answers.",
      titleColor: "#1A1A2E",
      descColor: "#7a6a5a",
      bgColor: "#fff",
    }),
  },
  {
    blockType: "card",
    position: 10,
    content: JSON.stringify({
      title: "Did I stay in charge?",
      description: "The AI helps. You decide. Always.",
      titleColor: "#1A1A2E",
      descColor: "#7a6a5a",
      bgColor: "#fff",
    }),
  },
  // ── WHERE TO GO NEXT ──
  {
    blockType: "text",
    position: 11,
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
    position: 12,
    content: JSON.stringify({
      title: "Children's Page",
      description: "The sloth's home base. Stories, games, and more.",
      emoji: "🦥",
      linkLabel: "Go",
      linkUrl: "/for/child",
      titleColor: "#E8520A",
      descColor: "#7a6a5a",
      bgColor: "#FFF5EE",
    }),
  },
  {
    blockType: "card",
    position: 13,
    content: JSON.stringify({
      title: "Prompt Games",
      description: "Practice the rules by playing. Learn by doing.",
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
    position: 14,
    content: JSON.stringify({
      title: "Grown-Up Version",
      description: "Ready for more detail? See the full Five Rules.",
      emoji: "📋",
      linkLabel: "Go",
      linkUrl: "/rules",
      titleColor: "#059669",
      descColor: "#7a6a5a",
      bgColor: "#ECFDF5",
    }),
  },
];

let inserted = 0;
for (const block of blocks) {
  await conn.execute(
    `INSERT INTO content_blocks (pageSlug, blockType, position, content, status, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, 'published', NOW(), NOW())`,
    [PAGE_SLUG, block.blockType, block.position, block.content]
  );
  inserted++;
}

console.log(`Inserted ${inserted} blocks for ${PAGE_SLUG}`);
await conn.end();
