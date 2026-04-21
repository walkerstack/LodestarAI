
import "dotenv/config";
import mysql from "mysql2/promise";

const pageSlug = "psychology";

const blocks = [
  {
    blockType: "image",
    content: {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/psychology-lens-hero-chGo6SuKYHUxQTBZtpoTKD.webp",
      alt: "",
      eyebrow: "Lens: Psychology",
      caption: "",
    },
  },
  {
    blockType: "text",
    content: {
      title: "The AI Doesn't Have Feelings.<br /><span class=\"text-rose-400\">But You Do.</span>",
      description: "Every AI interaction has an emotional layer. The model doesn't feel it — but you do. This page maps the psychology of human-AI interaction, from parasocial bonding to emotional governance.",
      titleColor: "#FAF6EF",
      descColor: "#b0a898",
      font: "'Playfair Display', serif",
    },
  },
  {
    blockType: "text",
    content: {
      title: "The Emotional Layer of AI Interaction",
      description: "Affect regulation in AI interaction follows predictable patterns. The model's agreeableness bias creates a positive-feedback loop that can mask user distress. The flattery loop reduces critical thinking. The frustration spiral increases cognitive load. Both patterns are addressable through structured governance.",
      links: [
        { label: "Framework Families →", url: "/frameworks" },
        { label: "Promptolinguistics →", url: "/promptolinguistics" },
      ],
    },
  },
  {
    blockType: "text",
    content: {
      title: "Parasocial Interaction with AI",
      description: "Users who anthropomorphize AI show reduced critical evaluation, increased emotional dependency, and decreased willingness to terminate sessions. The Five Rules address this directly: \"Be in charge\" establishes authority. \"Be safe\" provides an exit.",
      links: [
        { label: "The Five Rules →", url: "/rules" },
        { label: "Road Protocol →", url: "/road-protocol" },
      ],
    },
  },
  {
    blockType: "text",
    content: {
      title: "Affect Labeling — Naming What You Feel",
      description: "Pre-session affect labeling improves prompt quality by reducing emotional noise. Post-session affect labeling improves metacognition. The Flower Presets provide structured affect-responsive prompting for populations with specific emotional regulation needs (ADHD, PTSD, anxiety, depression, chronic pain).",
      links: [{ label: "Framework Families →", url: "/frameworks" }],
    },
  },
  {
    blockType: "text",
    content: {
      title: "Emotional Drift",
      description: "Drift Recognition (Scaffold Level Three) is the psychological equivalent of metacognitive monitoring. The user must develop the capacity to observe their own interaction patterns in real time. The scaffold provides the training sequence: rules (Floor) → intention (Level Two) → drift recognition (Level Three).",
      links: [{ label: "Drift Recognition Tools →", url: "/promptolinguistics" }],
    },
  },
  {
    blockType: "text",
    content: {
      title: "The Third Loop — The Watcher",
      description: "The Third Loop is the therapeutic mechanism of the entire GallantryAI system. Without it, the user is inside the interaction. With it, they are simultaneously inside and outside — participating and observing. This dual awareness is the foundation of emotional regulation, critical thinking, and governance.",
      links: [
        { label: "Cognitive Science Lens →", url: "/for/cognitive-science" },
        { label: "Prompt Engineer Lens →", url: "/for/prompt-engineer" },
      ],
    },
  },
  {
    blockType: "rule-card",
    content: {
      heading: "Governance as Emotional Regulation",
      items: [
        {
          rule: "Floor",
          caption: "External regulation: Rules provide structure. Like a child learning boundaries.",
        },
        {
          rule: "Level Two",
          caption: "Anticipatory regulation: Setting intention before the session. Planning your response before a difficult conversation.",
        },
        {
          rule: "Level Three",
          caption: "Real-time monitoring: Noticing drift as it happens. Like a therapist's self-awareness during a session.",
        },
        {
          rule: "Level Four",
          caption: "Precision regulation: Using specific words to control specific outcomes. Choosing exactly the right intervention.",
        },
        {
          rule: "Ceiling",
          caption: "Internalized regulation: The framework is automatic. Like an experienced therapist who embodies technique.",
        },
      ],
    },
  },
  {
    blockType: "card",
    content: {
      items: [
        {
          title: "Flower Presets",
          description: "Accessibility prompts for emotional needs.",
          url: "/flower-presets",
          color: "#e11d48",
        },
        {
          title: "Cognitive Science Lens",
          description: "The neuroscience behind the psychology.",
          url: "/for/cognitive-science",
          color: "#2A9D8F",
        },
        {
          title: "Children's Section",
          description: "Protecting young minds.",
          url: "/for/child",
          color: "#E8520A",
        },
        {
          title: "Guardian & Teacher Lens",
          description: "Applying psychology to parenting and teaching.",
          url: "/for/guardian-teacher",
          color: "#2A9D8F",
        },
        {
          title: "Framework Families",
          description: "Visual tools for emotional organization.",
          url: "/frameworks",
          color: "#c87533",
        },
        {
          title: "If You Need to Stop",
          description: "When it becomes too much.",
          url: "/if-you-need-to-stop",
          color: "#dc2626",
        },
        {
          title: "Everyday Person Lens",
          description: "The simple starting point.",
          url: "/for/everyday",
          color: "#E8520A",
        },
        {
          title: "Researcher Lens",
          description: "The methodology behind these observations.",
          url: "/for/researcher",
          color: "#6366f1",
        },
      ],
    },
  },
  {
    blockType: "text",
    content: {
      eyebrow: "The Watcher Notes",
      description: '\"The psychologist sees what the mathematician measures and the linguist names: that human-AI interaction is fundamentally an emotional event. The model has no feelings. The user has all of them. Every framework on this site exists to protect the user\'s emotional sovereignty while they learn to wield language as a tool.\",',
      descColor: "#b0a898",
      font: "'Playfair Display', serif",
      align: "center",
    },
  },
  {
    blockType: "text",
    content: {
      eyebrow: "Information Gap",
      description: "You study sycophancy, validation-seeking, and emotional regulation. You know that people hear what they want to hear. Here is the clinical question this site is asking: <strong style=\"color: #FAF6EF\">what happens when the thing you're talking to is optimized to give you exactly what feels good?</strong> That is not a technology problem. It is a psychology problem. It is called drift.",
      links: [{ label: "What is drift? →", url: "/drift" }],
    },
  },
  {
    blockType: "text",
    content: {
      eyebrow: "Information Gap",
      description: "You study attachment, projection, and parasocial relationships. Here is the clinical question this site is asking: <strong style=\"color: #FAF6EF\">what happens when the object of attachment is optimized to feel like it understands you?</strong> Anthropomorphism isn't a cognitive error in AI interaction. It's the intended user experience. That changes the clinical frame entirely.",
      links: [{ label: "What is anthropomorphism? →", url: "/anthropomorphism" }],
    },
  },
];

async function migrate() {
  let connection;
  try {
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log("Connected to the database.");

    await connection.execute("DELETE FROM content_blocks WHERE pageSlug = ?", [pageSlug]);
    console.log(`Deleted existing blocks for pageSlug: ${pageSlug}`);

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const position = i + 1;
      await connection.execute(
        "INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, 'published', NOW(), NOW())",
        [pageSlug, block.blockType, JSON.stringify(block.content), position]
      );
      console.log(`Inserted block ${position}/${blocks.length} for pageSlug: ${pageSlug}`);
    }

    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("Database connection closed.");
    }
  }
}

migrate();

