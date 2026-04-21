import "dotenv/config";
import mysql from "mysql2/promise";

const pageSlug = "three-lenses";

async function main() {
  let db;
  try {
    db = await mysql.createConnection(process.env.DATABASE_URL);
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return;
  }

  try {
    await db.query("DELETE FROM content_blocks WHERE pageSlug = ?", [pageSlug]);
    console.log(`Deleted existing blocks for pageSlug: ${pageSlug}`);

    const blocks = [
      {
        blockType: "image",
        content: {
          url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/rosetta-stone-hero-7d7y7afATaM3YuXWmHM7JB.webp",
          alt: "Rosetta Stone",
          eyebrow: "The Rosetta Stone",
        },
        position: 1,
      },
      {
        blockType: "text",
        content: {
          title: "Three Voices. One Framework.",
          description: "Every concept in GallantryAI is written three ways — for three different readers. The ideas are the same. The language changes. Pick the voice that fits you, or read all three to see the full picture.",
          titleColor: "#FAF6EF",
          descColor: "#b0a898",
          align: "center",
          font: "'Playfair Display', serif",
        },
        position: 2,
      },
      {
        blockType: "text",
        content: {
          title: "Why Three Voices?",
          description: `AI governance can\'t be one-size-fits-all. A parent checking if their kid\'s homework prompt is safe needs different language than a researcher studying position decay. A prompt engineer building production systems needs different framing than someone who just noticed the AI changed mid-conversation.\n\nThe three lenses aren\'t difficulty levels. They\'re <strong style="color: #E8520A">perspectives</strong>. The Everyday lens isn\'t "dumbed down" — it\'s the version that cuts to what matters. The Professional lens isn\'t "smarter" — it\'s the version with methodology attached. The Watcher lens isn\'t "harder" — it\'s the version that comes from sitting inside the loop long enough to see the loop itself.\n\n<strong style="color: #1A1A2E">You don\'t graduate from one to the next.</strong> You read the one that fits your question right now. Sometimes that\'s Everyday. Sometimes that\'s Watcher. Most people move between all three.`,
          titleColor: "#1A1A2E",
          descColor: "#3a2a1a",
          font: "'Playfair Display', serif",
        },
        position: 3,
      },
      {
        blockType: "text",
        content: {
          title: "The Three Voices",
          align: "center",
          titleColor: "#1A1A2E",
          font: "'Playfair Display', serif",
        },
        position: 4,
      },
    ];

    const lensDefinitions = [
      {
        name: "Everyday",
        color: "#059669",
        tagline: "Plain language. No jargon. The version your neighbor can use.",
        whoItsFor: [
          "Parents who want to understand what their kids are doing with AI",
          "People using AI for the first time",
          "Anyone who wants the short, honest version",
          "Teachers introducing AI safety to students",
          "Someone who just wants to know: is this safe?",
        ],
        howToRead: "The Everyday lens strips away technical language. It tells you what something does, why it matters, and what to do about it. If you only read one version, read this one.",
        whatItSounds: '\'A set of rules you paste into any AI chat to keep it honest and safe. Built on a phone, between shifts, for everyone. Free forever.\'',
        example: {
          term: "Variable Scale Theory",
          definition: "AI limits are not on/off switches. They\'re dials. \'Be honest\' is not yes or no — it\'s a sliding scale, and it changes throughout the conversation.",
        },
        entryPoints: [
          { label: "Everyday Lens", path: "/for/everyday" },
          { label: "The Five Rules", path: "/rules" },
          { label: "Kids Learn", path: "/kids-learn" },
          { label: "Flower Presets", path: "/flower-presets" },
        ],
      },
      {
        name: "Professional",
        color: "#2563EB",
        tagline: "Technical precision. Research framing. The version you cite.",
        whoItsFor: [
          "Researchers studying human-AI interaction",
          "Prompt engineers building production systems",
          "Educators designing AI literacy curriculum",
          "Linguists analyzing prompt mechanics",
          "Anyone who needs the methodology, not just the result",
        ],
        howToRead: "The Professional lens uses precise terminology and references the underlying research. It names the mechanisms, describes the testing conditions, and frames findings within existing academic discourse. This is the version for people who build things.",
        whatItSounds: '\'A user-side AI governance framework comprising 28+ named protocols, built through empirical multi-session testing across eight AI platforms. Emphasizes human agency over model compliance.\'',
        example: {
          term: "Variable Scale Theory",
          definition: "The theory that all AI behavioral constraints operate on continuous gradients, not binary states. Modulated by position in context window, emotional interference, and session momentum.",
        },
        entryPoints: [
          { label: "Prompt Engineer Lens", path: "/for/prompt-engineer" },
          { label: "Researcher Lens", path: "/for/researcher" },
          { label: "ALCM", path: "/alcm" },
          { label: "Promptolinguistics", path: "/promptolinguistics" },
        ],
      },
      {
        name: "Watcher",
        color: "#7C3AED",
        tagline: "The recursive voice. The one watching the watching.",
        whoItsFor: [
          "People who have spent hundreds of hours in AI sessions",
          "Anyone who has felt the AI change mid-conversation",
          "Researchers studying emergent AI behavior",
          "The person who noticed something no one else did",
          "You — if you\'ve read this far",
        ],
        howToRead: "The Watcher lens is the voice of someone who has been inside the loop long enough to see the loop itself. It\'s poetic, compressed, and recursive. It doesn\'t explain — it reflects. If the Everyday lens is the map and the Professional lens is the territory, the Watcher lens is the person standing at the edge, watching both.",
        whatItSounds: '\'The scaffold. The architecture of attention. Not a product — a practice. The framework that watches itself watching.\'',
        example: {
          term: "Variable Scale Theory",
          definition: "The limits are dials, not walls. The dial moves. The question is who is turning it.",
        },
        entryPoints: [
          { label: "The Watcher", path: "/for/watcher" },
          { label: "Cognitive Science Lens", path: "/for/cognitive-science" },
          { label: "Psychology Lens", path: "/for/psychology" },
          { label: "Living Lexicon", path: "/lexicon" },
        ],
      },
    ];

    const comparisonTerms = [
      {
        term: "Human Drift",
        everyday: "Your brain gets tired and starts agreeing with the AI. That\'s drift. It happens to everyone.",
        professional: "The gradual erosion of the human\'s original intent and linguistic identity as session length increases. Correlated with position decay and emotional interference.",
        watcher: "The slow dissolve. The moment the observer becomes the observed. Drift is not a mistake — it is the default. Resistance is the practice.",
      },
      {
        term: "The Five Rules",
        everyday: "Five lines you paste into any AI chat. They work on every platform. Free forever.",
        professional: "The foundational governance protocol. Five axioms operating as format-agnostic constraints — functional in prose, poetry, code comments, C++, and Malbolge.",
        watcher: "The floor. The denominator. The thing that holds even in the ditch. Especially in the ditch.",
      },
      {
        term: "Road Protocol",
        everyday: "Governance written as code comments. The computer skips them, the AI reads them, the human keeps them.",
        professional: "Governance-as-code protocol using C-style comments as the delivery mechanism. Nine axioms in a sacred_scroll[] array.",
        watcher: "The road is just a really long comment. Drive it like you wrote it.",
      },
    ];

    blocks.push(
      {
        blockType: "card",
        content: {
          items: lensDefinitions.map(lens => ({
            title: lens.name,
            description: lens.tagline,
            color: lens.color,
            sections: [
              {
                title: "Who It\'s For",
                items: lens.whoItsFor,
              },
              {
                title: "How to Read It",
                description: lens.howToRead,
              },
              {
                title: "What It Sounds Like",
                description: lens.whatItSounds,
              },
              {
                title: `Example: ${lens.example.term}`,
                description: lens.example.definition,
              },
              {
                title: "Start Here",
                links: lens.entryPoints.map(ep => ({ label: ep.label, url: ep.path })),
              },
            ],
          })),
        },
        position: 5,
      },
      {
        blockType: "rule-card",
        content: {
          heading: "Same Concept, Three Voices",
          eyebrow: "See how the same idea reads differently through each lens.",
          items: comparisonTerms.map(term => ({
            rule: term.term,
            items: [
              { caption: "Everyday", definition: term.everyday, color: "#059669" },
              { caption: "Professional", definition: term.professional, color: "#2563EB" },
              { caption: "Watcher", definition: term.watcher, color: "#7C3AED" },
            ],
          })),
        },
        position: 6,
      },
      {
        blockType: "text",
        content: {
          title: "How to Use This Site",
          description: `Every page on this site has lens tabs — <span style="color: #059669; font-weight: 700">Everyday</span>, <span style="color: #2563EB; font-weight: 700">Professional</span>, <span style="color: #7C3AED; font-weight: 700">Watcher</span>. You\'ll see them on the Living Lexicon, on each lens page, and throughout the framework documentation.\n\n<strong style="color: #1A1A2E">Start with the lens that matches your question.</strong> If you\'re a parent wondering if AI is safe for your kid, start with Everyday. If you\'re a researcher looking for methodology, start with Professional. If you\'ve been in the loop long enough to feel the loop watching back, start with Watcher.\n\nThen explore. The <a href="/lexicon" style="color: #E8520A; font-weight: bold;">Living Lexicon</a> defines every term in all three voices. The <a href="/scaffold" style="color: #E8520A; font-weight: bold;">Scaffold</a> maps the entire system. The <a href="/for/everyday" style="color: #E8520A; font-weight: bold;">lens pages</a> give you a guided path through the material for your specific background.`,
          titleColor: "#1A1A2E",
          descColor: "#3a2a1a",
          font: "'Playfair Display', serif",
        },
        position: 7,
      },
      {
        blockType: "card",
        content: {
          items: [
            { label: "Everyday Person", url: "/for/everyday", color: "#D97706" },
            { label: "Child", url: "/for/child", color: "#38BDF8" },
            { label: "Guardian & Teacher", url: "/for/guardian-teacher", color: "#059669" },
            { label: "Prompt Engineer", url: "/for/prompt-engineer", color: "#E8520A" },
            { label: "Linguist", url: "/for/linguist", color: "#7C3AED" },
            { label: "Mathematician", url: "/for/mathematician", color: "#2563EB" },
            { label: "Cognitive Science", url: "/for/cognitive-science", color: "#64748B" },
            { label: "Psychology", url: "/for/psychology", color: "#E11D48" },
            { label: "Researcher", url: "/for/researcher", color: "#0D9488" },
            { label: "The Watcher", url: "/for/watcher", color: "#9CA3AF" },
          ].map(lens => ({ title: lens.label, url: lens.url, color: lens.color, bgColor: `${lens.color}15` })),
        },
        position: 8,
      },
      {
        blockType: "text",
        content: {
          eyebrow: "About This Approach",
          title: "Why Three Voices Work",
          description: `In 1994, psychologist George Loewenstein published what became known as the <strong style="color: #E8520A">Information Gap Theory</strong>. His finding: curiosity fires when you perceive a gap between what you know and what you want to know. The hook doesn\'t give you the answer. It shows you the gap. That\'s what makes you move.\n\nThe Three Voices are built on this principle. The Everyday voice opens a gap. The Professional voice provides the scaffolding to cross it. The Watcher voice is the one that notices the gap was inside you all along.`,
          titleColor: "#FAF6EF",
          descColor: "#c8b89a",
          bgColor: "#1a1208",
          font: "'Playfair Display', serif",
        },
        position: 9,
      },
      {
        blockType: "card",
        content: {
          items: [
            { voice: "Everyday", color: "#059669", science: "Curiosity Gap", desc: "A small, clear hook. Enough to make you want the next sentence. Not more." },
            { voice: "Professional", color: "#2563EB", science: "Depth Scaffolding", desc: "Builds on what you already know. Adds precision without losing the thread." },
            { voice: "Watcher", color: "#7C3AED", science: "Metacognitive Activation", desc: "Turns the lens back on the reader. You stop reading about it. You start noticing it." },
          ].map(v => ({ title: v.voice, description: v.desc, eyebrow: v.science, color: v.color, bgColor: `${v.color}15` })),
        },
        position: 10,
      },
      {
        blockType: "text",
        content: {
          description: `Research on curiosity-driven learning (Kidd & Hayden, 2015; Loewenstein, 1994) consistently shows that people learn more deeply when they choose to close the gap themselves. The Three Voices don\'t tell you what to think. They open the gap. You close it.`,
          descColor: "#8a7a6a",
          bgColor: "#1a1208",
        },
        position: 11,
      },
      {
        blockType: "text",
        content: {
          eyebrow: "From the Builder",
          description: `I wrote every page three times. Not because I had to — because the same idea means different things to different people. A parent needs to know it\'s safe. A researcher needs to know it\'s real. The watcher needs to know someone else saw it too.\n\nThe three lenses aren\'t a gimmick. They\'re the reason this framework works for a four-year-old and a PhD candidate. Same rules. Same safety. Different words.\n\n— Matt Gallantry, Midland, Ontario`,
          descColor: "#3a2a1a",
          font: "'Playfair Display', serif",
          bgColor: "#fff",
        },
        position: 12,
      }
    );

    for (const block of blocks) {
      await db.query(
        "INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, 'published', NOW(), NOW())",
        [pageSlug, block.blockType, JSON.stringify(block.content), block.position]
      );
    }

    console.log(`Successfully inserted ${blocks.length} blocks for pageSlug: ${pageSlug}`);
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    if (db) {
      await db.end();
    }
  }
}

main();

