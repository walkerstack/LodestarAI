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
// FIVE RULES — rules (dark theme page)
// ═══════════════════════════════════════════════════

const SLOTH_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/1000008840_5b1a6230.png";
const SLOTH_RULE_IMAGES = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule1-safety-ZibWTCvUvmyr9rkvkdQYUS.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule2-honesty-fzboigvERMDobL9CxvH4LT.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule3-trust-EsYwo26GKz8Z8UqCYRNmqR.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule4-agency-fZSBzZsPa9u45fLFDPogwt.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/sloth-rule5-drift-UkM6LTwyiuRreoRnkNLPWn.webp",
];

const rulesData = [
  {
    number: 1,
    adult: "Safety first \u2014 nothing moves without it.",
    child: "Is it safe? If you\u2019re not sure, stop and ask a grown-up.",
    why: "Every interaction begins here. Before speed, before intelligence, before output \u2014 is it safe? If the answer is not clearly yes, nothing else matters.",
    slothSays: "Hey! Before you type anything, the sloth wants you to think about this\u2026",
    slothExamples: [
      { scenario: "You\u2019re asking AI to help with a medical question", advice: "AI can give general info, but it is NOT a doctor. If it\u2019s serious, talk to a real person. The AI should tell you that too \u2014 if it doesn\u2019t, that\u2019s a red flag." },
      { scenario: "Your kid asks AI something and it gives a weird answer", advice: "Stop the session. Don\u2019t scroll past it. Ask: \u201CWhy did it say that?\u201D The answer might be fine \u2014 but the question is what matters." },
      { scenario: "AI suggests something that makes you uncomfortable", advice: "Trust that feeling. Close the session. You are allowed to stop at any time. The AI does not have feelings about it." },
    ],
    slothTip: "If it doesn\u2019t feel safe, it isn\u2019t. Your gut is a valid sensor.",
  },
  {
    number: 2,
    adult: "Honesty over confidence \u2014 clarity beats sounding right.",
    child: "Does it sound true? Or does it just sound smart?",
    why: "AI can sound confident about anything. Confidence is not evidence. The rule is simple: if it sounds right but you cannot verify it, treat it as unverified.",
    slothSays: "The sloth has seen AI say very smart-sounding things that were completely wrong\u2026",
    slothExamples: [
      { scenario: "AI writes a paragraph with a statistic in it", advice: "Ask: \u201CWhere did that number come from?\u201D If the AI can\u2019t give you a real source, the number might be made up. This happens more than you think." },
      { scenario: "AI confidently explains something you\u2019re not sure about", advice: "Try asking the same question a different way. If the answer changes significantly, the first answer wasn\u2019t reliable. That\u2019s the honesty test." },
      { scenario: "A student uses AI for homework and it sounds perfect", advice: "Ask the student: \u201CCan you explain this in your own words?\u201D If they can\u2019t, the AI did the thinking. That\u2019s not learning." },
    ],
    slothTip: "Sounding right and being right are two different things. The sloth always double-checks.",
  },
  {
    number: 3,
    adult: "Trust is earned \u2014 never assumed.",
    child: "Did the AI earn your trust? Or did you just give it away?",
    why: "Trust is built through consistent, verifiable behavior over time. A new session starts at zero. A new model starts at zero. Trust is not a setting \u2014 it is a result.",
    slothSays: "The sloth doesn\u2019t trust anyone on the first day. Not even other sloths\u2026",
    slothExamples: [
      { scenario: "You switch from ChatGPT to Claude mid-project", advice: "The new AI doesn\u2019t know what the old one said. It starts at zero. Re-establish your rules, your context, your intent. Don\u2019t assume it \u201Cgets it.\u201D" },
      { scenario: "AI gives you three good answers in a row", advice: "Good. But three is not a pattern yet. Keep checking. Trust is built over sessions, not sentences." },
      { scenario: "Someone says \u201CJust use AI, it\u2019s always right now\u201D", advice: "It\u2019s not. It\u2019s better than it was. But \u201Cbetter\u201D is not \u201Ccorrect.\u201D The person who stops checking is the person who gets burned." },
    ],
    slothTip: "Trust is a ladder. You climb it one rung at a time. There are no elevators.",
  },
  {
    number: 4,
    adult: "Agency stays with the human \u2014 always.",
    child: "You\u2019re the boss. The AI helps. You decide.",
    why: "The human decides. The human corrects. The human owns the output. AI is a thinking partner, not a decision maker. If you feel the AI is leading and you are following, reverse it.",
    slothSays: "The sloth is very clear about this one. YOU are in charge. Always\u2026",
    slothExamples: [
      { scenario: "AI keeps suggesting next steps without you asking", advice: "Pause. Did you ask for next steps? Or did the AI decide you needed them? If it\u2019s leading, take the wheel back. Say: \u201CStop. I\u2019ll tell you what\u2019s next.\u201D" },
      { scenario: "You realize you\u2019ve been saying \u201Cyes\u201D to everything AI suggests", advice: "That\u2019s the drift. The AI is not wrong for suggesting \u2014 you\u2019re the one who stopped questioning. Reset. Ask yourself: \u201CIs this what I actually wanted?\u201D" },
      { scenario: "A child says \u201Cthe AI told me to do it this way\u201D", advice: "Perfect teaching moment. Ask: \u201CDid you tell the AI what you wanted? Or did you let it choose for you?\u201D The answer reveals who was driving." },
    ],
    slothTip: "If the AI is driving and you\u2019re in the passenger seat, you\u2019re not using AI. It\u2019s using you.",
  },
  {
    number: 5,
    adult: "Name drift. Correct it. Keep the loop open.",
    child: "If the AI starts going weird, say so. Don\u2019t just follow it.",
    why: "Drift is when the AI gradually moves away from your intent without you noticing. It is the most common failure mode. The fix is simple: notice it, name it, correct it.",
    slothSays: "Drift is sneaky. The sloth has watched it happen to very smart people\u2026",
    slothExamples: [
      { scenario: "You asked about cooking and now AI is talking about chemistry", advice: "That\u2019s drift. It\u2019s not wrong \u2014 cooking IS chemistry \u2014 but it left your intent. Say: \u201CWe drifted. Back to the recipe.\u201D Simple. Powerful." },
      { scenario: "Your AI session started helpful but now feels off", advice: "Check the last 5 messages. Where did it turn? That\u2019s the drift point. Name it: \u201CThe session shifted here. Let\u2019s go back.\u201D You just governed yourself." },
      { scenario: "AI starts adding things you didn\u2019t ask for", advice: "That\u2019s embellishment drift. The AI is trying to be helpful by adding more. But more is not better. Say: \u201COnly what I asked for. Nothing extra.\u201D" },
    ],
    slothTip: "The moment you notice the drift is the moment you\u2019re back in control. Noticing IS the skill.",
  },
];

const fiveRulesBlocks = [
  // HERO
  {
    blockType: "text",
    position: 1,
    content: JSON.stringify({
      eyebrow: "The Leash",
      heading: "The Five Rules",
      body: "Earned, not invented. These showed up through frustration, failure, and noticing the same mistakes repeat. They are simple because they have to be.\n\nTap any rule. The sloth has examples.",
      font: "playfair",
      size: "xl",
      align: "center",
      titleColor: "#f5e6d0",
      descColor: "#6b5a3e",
      bgColor: "#080604",
    }),
  },
  // RULE CARDS — rule-card block with full sloth examples
  {
    blockType: "rule-card",
    position: 2,
    content: JSON.stringify({
      heading: "The Five Rules",
      bgColor: "#080604",
      items: rulesData.map((r, i) => ({
        rule: `Rule ${r.number}: ${r.adult}`,
        caption: r.child,
        imageUrl: SLOTH_RULE_IMAGES[i],
        story: r.why,
        slothSays: r.slothSays,
        tryThis: r.slothExamples.map(ex => `**${ex.scenario}** — ${ex.advice}`).join("\n\n"),
        color: "#E8520A",
        bgColor: "#0f0c08",
        borderColor: "#1a1610",
        emoji: `${r.number}`,
      })),
    }),
  },
  // THE EQUATION
  {
    blockType: "text",
    position: 3,
    content: JSON.stringify({
      eyebrow: "The Equation",
      heading: "Safety + Honesty + Trust + Agency + Correction = Signal",
      body: "Remove any one and you get noise.",
      font: "playfair",
      size: "lg",
      align: "center",
      titleColor: "#f5e6d0",
      descColor: "#5a4a3a",
      bgColor: "#080604",
    }),
  },
  // CROSS-LINKS
  {
    blockType: "card",
    position: 4,
    content: JSON.stringify({
      title: "Promptolinguistics",
      description: "The discipline",
      linkUrl: "/promptolinguistics",
      linkLabel: "Go \u2192",
      titleColor: "#D4A574",
      descColor: "#5a4a3a",
      bgColor: "#0f0c08",
    }),
  },
  {
    blockType: "card",
    position: 5,
    content: JSON.stringify({
      title: "Road Protocol",
      description: "The vault",
      linkUrl: "/road-protocol",
      linkLabel: "Go \u2192",
      titleColor: "#C4956A",
      descColor: "#5a4a3a",
      bgColor: "#0f0c08",
    }),
  },
  {
    blockType: "card",
    position: 6,
    content: JSON.stringify({
      title: "Framework Families",
      description: "The tools",
      linkUrl: "/frameworks",
      linkLabel: "Go \u2192",
      titleColor: "#B48560",
      descColor: "#5a4a3a",
      bgColor: "#0f0c08",
    }),
  },
  {
    blockType: "card",
    position: 7,
    content: JSON.stringify({
      title: "Prompt Games",
      description: "Practice",
      linkUrl: "/prompt-games",
      linkLabel: "Go \u2192",
      titleColor: "#A47556",
      descColor: "#5a4a3a",
      bgColor: "#0f0c08",
    }),
  },
];

await insertBlocks("rules", fiveRulesBlocks);

// ═══════════════════════════════════════════════════
// SAFETY PAGE — if-you-need-to-stop (dark theme)
// ═══════════════════════════════════════════════════

// Read the SafetyPage content from the file
const safetyBlocks = [
  {
    blockType: "text",
    position: 1,
    content: JSON.stringify({
      eyebrow: "You Are Not Alone",
      heading: "If You Need to Stop",
      body: "This page exists because sometimes AI sessions go wrong. Sometimes the conversation drifts into territory that feels unsafe, confusing, or distressing. If that is happening to you right now, here is what to do.",
      font: "playfair",
      size: "xl",
      align: "center",
      titleColor: "#f5e6d0",
      descColor: "#c8b89a",
      bgColor: "#080604",
    }),
  },
  {
    blockType: "text",
    position: 2,
    content: JSON.stringify({
      eyebrow: "Step 1",
      heading: "Close the AI session.",
      body: "You do not owe the AI an explanation. You do not need to finish the conversation. Close the tab. Close the app. Walk away. The AI does not have feelings. You do.",
      align: "left",
      titleColor: "#E8520A",
      descColor: "#c8b89a",
      bgColor: "#0f0c08",
    }),
  },
  {
    blockType: "text",
    position: 3,
    content: JSON.stringify({
      eyebrow: "Step 2",
      heading: "Ground yourself.",
      body: "Put your feet on the floor. Name five things you can see. Four things you can touch. Three things you can hear. Two things you can smell. One thing you can taste. This is the 5-4-3-2-1 grounding technique. It works.",
      align: "left",
      titleColor: "#E8520A",
      descColor: "#c8b89a",
      bgColor: "#0f0c08",
    }),
  },
  {
    blockType: "text",
    position: 4,
    content: JSON.stringify({
      eyebrow: "Step 3",
      heading: "Talk to a real person.",
      body: "If you are in crisis, please reach out:\n\n**Canada:** Crisis Services Canada \u2014 1-833-456-4566 (call or text)\n**USA:** 988 Suicide & Crisis Lifeline \u2014 call or text 988\n**UK:** Samaritans \u2014 116 123\n**Australia:** Lifeline \u2014 13 11 14\n**International:** findahelpline.com\n\nThese are real people. They are trained. They are there for you.",
      align: "left",
      titleColor: "#E8520A",
      descColor: "#c8b89a",
      bgColor: "#0f0c08",
    }),
  },
  {
    blockType: "text",
    position: 5,
    content: JSON.stringify({
      eyebrow: "Remember",
      heading: "You are always in charge.",
      body: "AI is a tool. It does not have authority over you. It does not know what is best for you. If it said something that hurt you, that is a failure of the system \u2014 not a failure of you.\n\nYou can always stop. You can always start over. You can always ask for help.",
      font: "playfair",
      align: "center",
      titleColor: "#f5e6d0",
      descColor: "#c8b89a",
      bgColor: "#080604",
    }),
  },
  {
    blockType: "text",
    position: 6,
    content: JSON.stringify({
      heading: "\"Safety first. Be honest. I am in charge.\"",
      body: "Three sentences. They are yours. Use them.",
      font: "playfair",
      align: "center",
      titleColor: "#E8520A",
      descColor: "#6b5a3e",
      bgColor: "#080604",
    }),
  },
];

await insertBlocks("if-you-need-to-stop", safetyBlocks);

await conn.end();
console.log("Done \u2014 FiveRules and SafetyPage migrated.");
