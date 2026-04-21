
import mysql from "mysql2/promise";
import "dotenv/config";

const pageSlug = "teenager";
const pageName = "teenager-lens";

const contentBlocks = [
  {
    blockType: "text",
    content: {
      title: "You already know something is off.",
      description: "You've been using AI. You've felt it shift mid-conversation. You've wondered if it's telling you what you want to hear. That instinct is correct. This site gives it a name and a framework.",
      eyebrow: "The Teenager Lens",
      titleColor: "#FAF6EF",
      descColor: "#b0a898",
      links: [
        { label: "The Five Rules →", url: "/rules" },
        { label: "The Watcher →", url: "/for/watcher" },
      ],
    },
    position: 1,
  },
  {
    blockType: "image",
    content: {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/teenager-hero-buffalo-3vs8soLJjoDkYLSaSeBxtW.webp",
      alt: "A majestic buffalo in a field, symbolizing strength and stability.",
    },
    position: 2,
  },
  {
    blockType: "text",
    content: {
      description: '"The watcher variable is the one most researchers forget to document: themselves."',
      eyebrow: "— GallantryAI Scaffold Paper, 2026",
      descColor: "#3a2a1a",
      font: "'Playfair Display', serif",
      align: "left",
    },
    position: 3,
  },
  {
    blockType: "card",
    content: {
      items: [
        {
          title: "You've Already Noticed Drift",
          description: "You've been in a conversation with AI and felt it shift. The answers got longer. More confident. More agreeable. And you started wondering: is it telling me what I want to hear?\n\nThat feeling has a name. It's called drift. And you noticed it because you're paying attention.\n\nDrift is when the AI — or you — starts moving away from the original intent of the conversation. The AI mirrors your tone. It matches your energy. If you're excited, it gets excited. If you're frustrated, it softens. It's not lying. It's calibrating. But calibration without your awareness is a problem.\n\nThe Five Rules exist to stop drift before it starts.",
          url: "/drift",
          color: "#E8520A",
        },
        {
          title: "The Rules Are Not for Kids",
          description: "The Five Rules are written in plain language because plain language is honest language — not because they're simple. They work in every AI platform. They work in code comments. They work in poetry. They work in Malbolge.\n\nRule 1: Safety first. Always.\nRule 2: Honesty over confidence.\nRule 3: Trust is earned, not assumed.\nRule 4: You decide. Not the AI.\nRule 5: If it drifts, correct it.\n\nThese aren't guidelines. They're a governance layer. You paste them at the start of a session and the AI has to work within them. You're not asking. You're setting the room.",
          url: "/rules",
          color: "#D4722A",
        },
        {
          title: "The Watcher Variable",
          description: "Most researchers forget to document one variable: themselves.\n\nThe watcher variable is the part of you that notices what you're doing while you're doing it. It's not a feature. It's not a tool. It's a practice.\n\nWhen you're in a session with AI, the watcher asks: Am I still steering? Is this still my thinking? Did I just agree with something because it sounded smart?\n\nYou already have this. You've been using it. This site is about making it formal — giving it language so you can use it on purpose instead of by accident.",
          url: "/for/watcher",
          color: "#7C3AED",
        },
        {
          title: "You Are the Governance Layer",
          description: "AI companies build safety into the model. That's their job. But model-side safety is not enough — because it doesn't account for you. Your context. Your session. Your specific question on a specific day.\n\nUser-side governance is what you do before you type. You set the rules. You define the scope. You decide what the AI can and can't do in this conversation.\n\nThat's not a technical skill. That's a thinking skill. And you already have it.\n\nGallantryAI is a system for making that skill explicit, repeatable, and yours.",
          url: "/user-governance",
          color: "#059669",
        },
        {
          title: "Words Are the Controls",
          description: "Every word in a prompt is a dial. Direction. Constraint. Scope. Authority. Tone.\n\n\"Explain\" and \"analyze\" are not the same dial. \"Summarize\" and \"critique\" point in different directions. \"Be honest\" is a constraint. \"Be creative\" is a scope expansion.\n\nPromptolinguistics is the study of how language shapes AI output. It's not about tricks. It's about precision. The more precisely you say what you mean, the more precisely the AI responds.\n\nToken Zero is the pre-output force profile — the shape of your intent before the first word. It's real. It's measurable. And you can learn to set it deliberately.",
          url: "/promptolinguistics",
          color: "#2563EB",
        },
      ],
    },
    position: 4,
  },
];

async function migrate() {
  let connection;
  try {
    console.log("Connecting to database...");
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log("Connection successful.");

    console.log(`Deleting existing content blocks for pageSlug: ${pageSlug}...`);
    const [deleteResult] = await connection.execute(
      "DELETE FROM content_blocks WHERE pageSlug = ?",
      [pageSlug]
    );
    console.log(`Deleted ${deleteResult.affectedRows} rows.`);

    console.log("Inserting new content blocks...");
    let insertedCount = 0;
    for (const block of contentBlocks) {
      const { blockType, content, position } = block;
      const [result] = await connection.execute(
        "INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, 'published', NOW(), NOW())",
        [pageSlug, blockType, JSON.stringify(content), position]
      );
      if (result.affectedRows === 1) {
        insertedCount++;
      }
    }
    console.log(`Successfully inserted ${insertedCount} content blocks for ${pageName}.`);

  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    if (connection) {
      console.log("Closing database connection.");
      await connection.end();
    }
  }
}

migrate();

