
import "dotenv/config";
import mysql from "mysql2/promise";

const pageSlug = "mathematician";

const contentBlocks = [
  {
    blockType: "image",
    content: {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/mathematician-lens-hero-8T94zAE4WP7TJtmxq7HoxM.webp",
      alt: "",
      eyebrow: "Lens: Mathematician",
      caption: null,
    },
    position: 1,
  },
  {
    blockType: "text",
    content: {
      title: 'Language Has Geometry.<br /><span class="text-[#818cf8]">Prompts Have Equations.</span>',
      description: "Every prompt is a vector in a high-dimensional space. Every word shifts the trajectory. Every constraint narrows the solution set. If you think in functions, mappings, and transformations — this is where language becomes your kind of math.",
      eyebrow: null,
      titleColor: "#FAF6EF",
      descColor: "#b0a898",
      bgColor: "#1A1A2E",
      align: "left",
      font: "Playfair Display",
      links: [],
    },
    position: 2,
  },
  {
    blockType: "text",
    content: {
      title: "The Math of Language",
      description: "Promptolinguistics treats words as operators in a formal system. The ALCM maps eight axes of linguistic force: Direction, Constraint, Scope, Authority, Tone, Zoom, Perspective, and Depth. Each axis is a dimension. Each prompt is a point in this 8-dimensional space.",
      eyebrow: null,
      titleColor: "#1A1A2E",
      descColor: "#555",
      bgColor: "#FAF6EF",
      align: "left",
      font: "Playfair Display",
      links: [
        {
          label: "Promptolinguistics →",
          url: "/promptolinguistics",
        },
        {
          label: "Prompt Engineer Lens →",
          url: "/for/prompt-engineer",
        },
      ],
    },
    position: 3,
  },
  {
    blockType: "text",
    content: {
      title: "Words as Force Vectors",
      description: "Action verbs form an escalation ladder: TRY (force=1) through FORCE (force=6). The HOLD dial adds a second dimension: STRONG through FORWARD. Together, they form a 2D control surface.",
      eyebrow: null,
      titleColor: "#1A1A2E",
      descColor: "#555",
      bgColor: "#f5f0e8",
      align: "left",
      font: "Playfair Display",
      links: [
        {
          label: "Promptolinguistics →",
          url: "/promptolinguistics",
        },
      ],
    },
    position: 4,
  },
  {
    blockType: "text",
    content: {
      title: "The ALCM as Coordinate System",
      description: "Eight axes define the ALCM space. Each axis is a continuum. The axes are orthogonal in practice — changing Scope doesn'''t necessarily change Authority. This independence allows for precise, predictable prompt engineering.",
      eyebrow: null,
      titleColor: "#1A1A2E",
      descColor: "#555",
      bgColor: "#FAF6EF",
      align: "left",
      font: "Playfair Display",
      links: [
        {
          label: "Full ALCM Breakdown →",
          url: "/promptolinguistics",
        },
      ],
    },
    position: 5,
  },
  {
    blockType: "text",
    content: {
      title: "Token Geometry — Token Zero",
      description: "Token Zero is the geometric origin of the prompt space. The efficiency of a prompt can be measured as the ratio of displacement magnitude to token count.",
      eyebrow: null,
      titleColor: "#FAF6EF",
      descColor: "#b0a898",
      bgColor: "#1A1A2E",
      align: "left",
      font: "Playfair Display",
      links: [
        {
          label: "Token Efficiency Strategy →",
          url: "/promptolinguistics",
        },
      ],
    },
    position: 6,
  },
  {
    blockType: "text",
    content: {
      title: "Constraint as Mathematical Function",
      description: "CAN opens possibility space. SHOULD implies obligation. MUST enforces necessity. ONLY restricts to a subset. NEVER eliminates entirely. Each constraint word is a set operation on the model'''s output space.",
      eyebrow: null,
      titleColor: "#1A1A2E",
      descColor: "#555",
      bgColor: "#FAF6EF",
      align: "left",
      font: "Playfair Display",
      links: [
        {
          label: "Word Mechanics →",
          url: "/promptolinguistics",
        },
        {
          label: "Prompt Engineer Lens →",
          url: "/for/prompt-engineer",
        },
      ],
    },
    position: 7,
  },
  {
    blockType: "card",
    content: {
      items: [
        {
          title: "Floor",
          description: "Fixed rules. No variables. The Five Rules are constants.",
          url: null,
          color: "#6366f1",
          emoji: null,
          imageUrl: null,
          bgColor: "white",
        },
        {
          title: "Level Two",
          description: "One variable: intention. Set the slope before you start.",
          url: null,
          color: "#6366f1",
          emoji: null,
          imageUrl: null,
          bgColor: "white",
        },
        {
          title: "Level Three",
          description: "Drift detection. The curve bends. You notice when trajectory diverges.",
          url: null,
          color: "#6366f1",
          emoji: null,
          imageUrl: null,
          bgColor: "white",
        },
        {
          title: "Level Four",
          description: "Eight ALCM axes as independent variables. Each word is a partial derivative.",
          url: null,
          color: "#6366f1",
          emoji: null,
          imageUrl: null,
          bgColor: "white",
        },
        {
          title: "Ceiling",
          description: "The framework is internalized. You don'''t calculate — you intuit.",
          url: null,
          color: "#6366f1",
          emoji: null,
          imageUrl: null,
          bgColor: "white",
        },
      ],
    },
    position: 8,
  },
  {
    blockType: "card",
    content: {
      items: [
        {
          title: "Promptolinguistics",
          description: "The full ALCM, action verbs, HOLD dial.",
          url: "/promptolinguistics",
          color: "#6366f1",
          emoji: null,
          imageUrl: null,
          bgColor: "white",
        },
        {
          title: "Prompt Engineer Lens",
          description: "Technical depth — frameworks, Malbolge, operators.",
          url: "/for/prompt-engineer",
          color: "#E8520A",
          emoji: null,
          imageUrl: null,
          bgColor: "white",
        },
        {
          title: "Cognitive Science Lens",
          description: "How the brain processes AI interaction.",
          url: "/for/cognitive-science",
          color: "#2A9D8F",
          emoji: null,
          imageUrl: null,
          bgColor: "white",
        },
        {
          title: "Framework Families",
          description: "Visual models that organize the math.",
          url: "/frameworks",
          color: "#c87533",
          emoji: null,
          imageUrl: null,
          bgColor: "white",
        },
        {
          title: "Field Papers",
          description: "The raw research behind the models.",
          url: "/field-papers",
          color: "#6366f1",
          emoji: null,
          imageUrl: null,
          bgColor: "white",
        },
        {
          title: "Everyday Person Lens",
          description: "The simple version first.",
          url: "/for/everyday",
          color: "#E8520A",
          emoji: null,
          imageUrl: null,
          bgColor: "white",
        },
        {
          title: "Guardian & Teacher Lens",
          description: "How to teach these concepts.",
          url: "/for/guardian-teacher",
          color: "#2A9D8F",
          emoji: null,
          imageUrl: null,
          bgColor: "white",
        },
        {
          title: "Researcher Lens",
          description: "The methodology and honest disclaimers.",
          url: "/for/researcher",
          color: "#c87533",
          emoji: null,
          imageUrl: null,
          bgColor: "white",
        },
      ],
    },
    position: 9,
  },
  {
    blockType: "text",
    content: {
      title: null,
      description: '"The mathematician sees what the linguist feels and the psychologist intuits: that language has structure beyond grammar. The ALCM is not a metaphor for mathematics — it is mathematics, waiting for someone to formalize it. The equations above are invitations, not conclusions."',
      eyebrow: "The Watcher Notes",
      titleColor: null,
      descColor: "#b0a898",
      bgColor: "#1A1A2E",
      align: "center",
      font: "Playfair Display",
      links: [],
    },
    position: 10,
  },
  {
    blockType: "text",
    content: {
      title: null,
      description: 'You model systems. You know that small perturbations compound. Here is the variable most AI governance frameworks haven\'t formalized: <strong style="color: #FAF6EF">the rate of drift as a function of session length.</strong> It is not linear. It is not random. It follows a pattern — and it starts with the human, not the model.',
      eyebrow: null,
      titleColor: null,
      descColor: "#c8b89a",
      bgColor: "#1a1208",
      align: "left",
      font: "DM Sans",
      links: [
        {
          label: "What is drift? →",
          url: "/drift",
        },
      ],
    },
    position: 11,
  },
  {
    blockType: "text",
    content: {
      title: null,
      description: 'You model systems with precision. Here is the variable most AI governance frameworks haven\'t formalized: <strong style="color: #FAF6EF">the human\'s trust in the model is a function of anthropomorphism, not accuracy.</strong> Users trust confident-sounding AI more than accurate-but-uncertain AI. The confidence signal is social, not mathematical. That\'s the gap anthropomorphism creates in your model.',
      eyebrow: "Information Gap",
      titleColor: null,
      descColor: "#c8b89a",
      bgColor: "#100c18",
      align: "left",
      font: "DM Sans",
      links: [
        {
          label: "What is anthropomorphism? →",
          url: "/anthropomorphism",
        },
      ],
    },
    position: 12,
  },
];

async function migrate() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  try {
    console.log(`Deleting existing content blocks for page: ${pageSlug}`);
    await connection.execute("DELETE FROM content_blocks WHERE pageSlug = ?", [pageSlug]);
    console.log("Inserting new content blocks...");
    for (const block of contentBlocks) {
      await connection.execute(
        "INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, 'published', NOW(), NOW())",
        [pageSlug, block.blockType, JSON.stringify(block.content), block.position]
      );
    }
    console.log(`Successfully migrated ${contentBlocks.length} content blocks for page: ${pageSlug}`);
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await connection.end();
  }
}

migrate();

