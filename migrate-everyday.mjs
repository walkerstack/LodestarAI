
import mysql from "mysql2/promise";
import "dotenv/config";

const pageSlug = "everyday";

const contentBlocks = [
  {
    blockType: "image",
    content: {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/everyday-lens-hero-mD9U9S6yX6Khatkn3tQTSR.webp",
      alt: "",
      eyebrow: "Lens: Everyday Person",
    },
    position: 1,
  },
  {
    blockType: "text",
    content: {
      title: "You Don't Need to Be an Expert.<br /><span style=\"color: #E8520A\">You Just Need to Start.</span>",
      description: "You're not a programmer. You're not a researcher. You're someone who uses AI — or wants to — and you want to do it well. This page is your starting line. No jargon. No prerequisites. Just honest tools that work.",
      titleColor: "#FAF6EF",
      descColor: "#b0a898",
      font: "'Playfair Display', serif",
    },
    position: 2,
  },
  {
    blockType: "text",
    content: {
      title: "Where You Are Right Now",
      font: "'Playfair Display', serif",
      titleColor: "#1A1A2E",
    },
    position: 3,
  },
  {
    blockType: "card",
    content: {
      items: [
        {
          title: "You might feel overwhelmed",
          description: "Everyone's talking about AI. You've tried it. Maybe it was helpful, maybe it was weird. You're not sure what you're supposed to do with it. That's normal. That's where most people are.",
          emoji: "😶",
          bgColor: "white",
        },
        {
          title: "You might have questions",
          description: "Is it safe? Can it lie to me? Should my kids use it? How do I know if it's giving me good answers? These are the right questions. GallantryAI was built to answer them.",
          emoji: "🤔",
          bgColor: "white",
        },
        {
          title: "You don't need a tech background",
          description: "Everything here was designed for real people. A nurse. A parent. A retiree. A student. If you can have a conversation, you can learn to prompt well. The skill is in the words, not the code.",
          emoji: "💡",
          bgColor: "white",
        },
        {
          title: "You're already ahead",
          description: "The fact that you're here means you care about doing this right. Most people just type and hope. You're looking for a framework. That's the difference between using AI and governing it.",
          emoji: "🌱",
          bgColor: "white",
        },
      ],
    },
    position: 4,
  },
  {
    blockType: "text",
    content: {
      title: "What Matters First",
      description: "Before you learn any technique, you need three things. These aren't optional — they're the foundation.",
      font: "'Playfair Display', serif",
      titleColor: "#1A1A2E",
      descColor: "#555",
    },
    position: 5,
  },
  {
    blockType: "card",
    content: {
      items: [
        {
          title: "01. Safety",
          description: "The AI should never make you feel unsafe. If it does, you stop. You close the window. You come back later. There's a page on this site for exactly that moment.",
          url: "/if-you-need-to-stop",
          bgColor: "white",
        },
        {
          title: "02. Honesty",
          description: "Tell the AI the truth. Tell it who you are. Tell it what you need. Don't try to trick it. The more honest you are, the better it works. This isn't a game — it's a partnership.",
          url: "/rules",
          bgColor: "white",
        },
        {
          title: "03. Trust (earned, not given)",
          description: "Don't trust the AI blindly. Make it earn your trust. Check its answers. Ask it to explain. If something feels wrong, it probably is. You are in charge. Always.",
          url: "/road-protocol",
          bgColor: "white",
        },
      ],
    },
    position: 6,
  },
  {
    blockType: "text",
    content: {
      title: "The Five Rules — Your Starting Point",
      description: "These five rules are the simplest version of everything on this site. If you learn nothing else, learn these.",
      font: "'Playfair Display', serif",
      titleColor: "#1A1A2E",
      descColor: "#555",
    },
    position: 7,
  },
  {
    blockType: "rule-card",
    content: {
      items: [
        { rule: "Be safe.", caption: "If the AI makes you uncomfortable, stop. You don't owe it a conversation." },
        { rule: "Be honest.", caption: "Tell the AI who you are and what you need. Honesty gets better results than tricks." },
        { rule: "Be in charge.", caption: "You decide what happens. The AI follows your lead, not the other way around." },
        { rule: "Be kind.", caption: "Not for the AI's sake — for yours. How you talk to AI shapes how you think." },
        { rule: "Be curious.", caption: "Ask why. Ask how. Ask what if. The best prompts come from genuine curiosity." },
      ],
    },
    position: 8,
  },
  {
    blockType: "text",
    content: {
      title: "Building Confidence — One Step at a Time",
      description: "You don't need to learn everything at once. Here's a path that builds on itself.",
      font: "'Playfair Display', serif",
      titleColor: "#FAF6EF",
      descColor: "#b0a898",
      bgColor: "#1A1A2E",
    },
    position: 9,
  },
  {
    blockType: "card",
    content: {
      items: [
        {
          title: "Start with the Flower Presets",
          description: "Pre-built prompts designed for specific needs — ADHD, anxiety, chronic pain, or just general use. Copy, paste, and see what happens.",
          url: "/flower-presets",
          color: "#E8520A",
        },
        {
          title: "Try a Prompt Game",
          description: "Low-stakes experiments that teach you how words change AI behavior. The Habergeon. The Compass Rose. The Lighthouse. Each one teaches a principle through play.",
          url: "/prompt-games",
          color: "#2A9D8F",
        },
        {
          title: "Learn the Road Protocol",
          description: "A simple checklist for any AI session: Where am I going? What are my rules? When do I stop? It's like a pre-flight checklist for conversations.",
          url: "/road-protocol",
          color: "#6366f1",
        },
        {
          title: "Explore the Framework Families",
          description: "Visual tools that organize how you think about AI. Seasons, Colors, the Whelm Scale. Pick the one that makes sense to you.",
          url: "/frameworks",
          color: "#E8520A",
        },
        {
          title: "Read the Children's Section",
          description: "Even if you don't have kids — the children's section explains everything in the simplest possible terms. Sometimes that's exactly what you need.",
          url: "/for/child",
          color: "#2A9D8F",
        },
        {
          title: "Learn to Prompt & Code Together",
          description: "The Builder doesn't know how to code either. This page teaches kids (and anyone) how to prompt and code — step by step, honestly, together.",
          url: "/kids-learn",
          color: "#6366f1",
        },
      ],
    },
    position: 10,
  },
  {
    blockType: "text",
    content: {
      title: "The Scaffold — Where You're Headed",
      description: "GallantryAI has five levels. You start at the Floor and grow at your own pace. There's no rush. There's no test. Just a path.",
      font: "'Playfair Display', serif",
      titleColor: "#1A1A2E",
      descColor: "#555",
    },
    position: 11,
  },
  {
    blockType: "card",
    content: {
      items: [
        { title: "Floor: Safety First", description: "Learn the Five Rules. Know when to stop. Know that you're in charge.", color: "#E8520A" },
        { title: "Level Two: Setting Intentions", description: "Before you type, decide what you want. Set the room. Give the AI a role.", color: "#c87533" },
        { title: "Level Three: Catching Drift", description: "Notice when the AI wanders from your intent. Name it. Fix it.", color: "#8B6914" },
        { title: "Level Four: Word Mechanics", description: "Single words as control dials. WHY, CAN, MUST — each one changes everything.", color: "#6b5a3e" },
        { title: "Ceiling: You Are the Framework", description: "You arrive at every session as your own governance layer. The tools are internalized.", color: "#4a3f2f" },
      ],
    },
    position: 12,
  },
  {
    blockType: "text",
    content: {
      description: '"Most people stay at the Floor for weeks. That\'s not failure — that\'s foundation. The scaffold doesn\'t reward speed. It rewards depth."',
      font: "'Playfair Display', serif",
      descColor: "#555",
      align: "italic",
    },
    position: 13,
  },
  {
    blockType: "text",
    content: {
      title: "Where to Go From Here",
      description: "Pick one. Just one. Start there. Come back when you're ready for the next.",
      font: "'Playfair Display', serif",
      titleColor: "#1A1A2E",
      descColor: "#555",
    },
    position: 14,
  },
  {
    blockType: "card",
    content: {
      items: [
        { title: "The Five Rules", description: "The foundation. Start here.", url: "/rules", color: "#E8520A" },
        { title: "Flower Presets", description: "Pre-built prompts for specific needs.", url: "/flower-presets", color: "#2A9D8F" },
        { title: "Prompt Games", description: "Learn through play.", url: "/prompt-games", color: "#6366f1" },
        { title: "Children's Section", description: "Simple explanations for everyone.", url: "/for/child", color: "#E8520A" },
        { title: "Road Protocol", description: "Pre-session checklist.", url: "/road-protocol", color: "#c87533" },
        { title: "AI Taxonomy", description: "Know which AI you're talking to.", url: "/taxonomy", color: "#2A9D8F" },
        { title: "Guardian & Teacher Lens", description: "If you're a parent or educator.", url: "/for/guardian-teacher", color: "#6366f1" },
        { title: "Research Hub", description: "Where every idea came from. Real links.", url: "/research-hub", color: "#7C3AED" },
        { title: "If You Need to Stop", description: "Safety first. Always.", url: "/if-you-need-to-stop", color: "#dc2626" },
      ],
    },
    position: 15,
  },
  {
    blockType: "text",
    content: {
      eyebrow: "The Watcher Notes",
      description: '"The everyday person is not a lesser user. They are the primary user. Every framework on this site was designed for them first, then translated upward for specialists. The scaffold begins at the floor because that is where everyone starts — including the person who built it."',
      font: "'Playfair Display', serif",
      descColor: "#b0a898",
      align: "italic",
      bgColor: "#1A1A2E",
    },
    position: 16,
  },
  {
    blockType: "text",
    content: {
      eyebrow: "Information Gap",
      description: "You've had a conversation with AI that started fine and ended somewhere strange. You weren't sure when it happened. You just noticed that the answers stopped feeling right. <strong style=\"color: #FAF6EF\">That's drift.</strong> It's not the AI's fault. It's not your fault. It's just what happens when no one's watching the direction. Here's how to watch.",
      links: [{ label: "What is drift? →", url: "/drift" }],
      bgColor: "#1a1208",
    },
    position: 17,
  },
  {
    blockType: "text",
    content: {
      eyebrow: "Have you ever said sorry to your AI?",
      description: "Most people have. You typed something, felt like it was rude, and added \"sorry\" or \"please\" before the next message. That instinct is real — and it has a name. <strong style=\"color: #FAF6EF\">Anthropomorphism</strong> is when we treat something that isn't a person like it is one. The AI talks like a person. It uses your name. It says things like \"I understand.\" Your brain responds the way it's wired to respond — with social instincts. That's not a flaw. It's just something worth knowing.",
      links: [{ label: "Why the AI feels like a person →", url: "/anthropomorphism" }],
      bgColor: "#0f0c08",
    },
    position: 18,
  },
];

async function migrate() {
  const db = await mysql.createConnection(process.env.DATABASE_URL);
  try {
    console.log(`Migrating page: ${pageSlug}...`);
    await db.execute("DELETE FROM content_blocks WHERE pageSlug = ?", [pageSlug]);
    console.log(`  Deleted existing blocks for ${pageSlug}`);

    for (const block of contentBlocks) {
      await db.execute(
        "INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, 'published', NOW(), NOW())",
        [pageSlug, block.blockType, JSON.stringify(block.content), block.position]
      );
    }
    console.log(`  Inserted ${contentBlocks.length} blocks for ${pageSlug}`);
    console.log("Migration complete!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await db.end();
  }
}

migrate();
'''
))palette""
