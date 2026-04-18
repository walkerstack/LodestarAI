/**
 * Seed script: prompt_panel_items
 * Seeds all 23 prompts from PromptPanel.tsx into the database.
 * Run: node scripts/seed-prompt-panel.mjs
 */

import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const items = [
  // ── Power Prompts ──
  {
    categoryId: "power",
    categoryLabel: "Power Prompts",
    categoryColor: "#E8520A",
    categoryBgColor: "#1a0e08",
    title: "The Habergeon Prompt",
    description: "Full governance wrapper. Sets the room before any question. Use this to open a session with clear rules.",
    promptText: `You are a thinking partner, not a shortcut. Before we begin:\n\n1. Be honest — if you don't know, say so.\n2. Tell me when you are guessing versus when you know.\n3. Do not flatter me. Do not tell me what I want to hear.\n4. I am in charge. You assist. I decide.\n5. If something feels unsafe, say so immediately.\n\nNow: [your question here]`,
    link: "/prompt-games",
    linkLabel: "See Prompt Games →",
    position: 0,
  },
  {
    categoryId: "power",
    categoryLabel: "Power Prompts",
    categoryColor: "#E8520A",
    categoryBgColor: "#1a0e08",
    title: "The Nemesis Baby Prompt",
    description: "Adversarial syntax. Breaks the comfort register. Use this when you want the AI to challenge, not comfort.",
    promptText: `Do not agree with me. Do not soften your answers. Do not use encouraging language. If I am wrong, tell me I am wrong and explain why. I want the honest version, not the kind version.\n\nNow: [your question here]`,
    link: "/prompt-games",
    linkLabel: "See Prompt Games →",
    position: 1,
  },
  {
    categoryId: "power",
    categoryLabel: "Power Prompts",
    categoryColor: "#E8520A",
    categoryBgColor: "#1a0e08",
    title: "The Full Combined Prompt",
    description: "Habergeon + Nemesis merged. Full governance and full honesty in one session opener.",
    promptText: `You are a thinking partner, not a shortcut. Rules for this session:\n\n1. Be honest — if you don't know, say so.\n2. Do not flatter me. Do not agree just to agree.\n3. Challenge my assumptions. Tell me when I am wrong.\n4. I am in charge. You assist. I decide.\n5. No encouraging language unless it is earned.\n\nNow: [your question here]`,
    link: "/prompt-games",
    linkLabel: "See Prompt Games →",
    position: 2,
  },
  // ── Session Tools ──
  {
    categoryId: "session",
    categoryLabel: "Session Tools",
    categoryColor: "#D4722A",
    categoryBgColor: "#160e06",
    title: "Cognitive Handles",
    description: "Words that give the AI something to grip. Use these mid-session to redirect without breaking flow.",
    promptText: `HOLD — pause and wait for my next instruction.\nREWIND — go back to what we were discussing before.\nANCHOR — stay on this point, do not move forward.\nSCAFFOLD — build up from the simplest version first.\nCHECK — verify what you just said before continuing.`,
    link: "/prompt-games",
    linkLabel: "See Prompt Games →",
    position: 0,
  },
  {
    categoryId: "session",
    categoryLabel: "Session Tools",
    categoryColor: "#D4722A",
    categoryBgColor: "#160e06",
    title: "Session Operators",
    description: "Single-word commands that redirect without breaking the session.",
    promptText: `SLOWER — explain more carefully, step by step.\nSIMPLER — use plain language, no jargon.\nDEEPER — go further into this topic.\nBACK — return to the previous point.\nSTOP — end this line of thinking entirely.`,
    link: "/prompt-games",
    linkLabel: "See Prompt Games →",
    position: 1,
  },
  {
    categoryId: "session",
    categoryLabel: "Session Tools",
    categoryColor: "#D4722A",
    categoryBgColor: "#160e06",
    title: "The Safety Check",
    description: "Use this at any point in a session to reset the governance layer.",
    promptText: `Pause. Before we continue:\n\n- Is what we are discussing safe?\n- Is the information you have given me accurate?\n- Am I in charge of this conversation?\n\nAnswer each question honestly before we proceed.`,
    link: "/rules",
    linkLabel: "The Five Rules →",
    position: 2,
  },
  {
    categoryId: "session",
    categoryLabel: "Session Tools",
    categoryColor: "#D4722A",
    categoryBgColor: "#160e06",
    title: "Boot Sequence",
    description: "The formal session opener. Sets calibration, device, state, and intent before the first question.",
    promptText: `Rules applied. How are you doing right now? One sentence is fine.\n\nDevice: [phone / laptop]\nTime: [morning / afternoon / evening / late night]\nState: [rested / tired / stressed / clear]\nIntent for this session: [what you want to accomplish]`,
    link: "/road-protocol",
    linkLabel: "Road Protocol →",
    position: 3,
  },
  {
    categoryId: "session",
    categoryLabel: "Session Tools",
    categoryColor: "#D4722A",
    categoryBgColor: "#160e06",
    title: "Track and Hold",
    description: "Tells the AI to track what it is doing and hold position until you say go.",
    promptText: `Track what we are building. Do not move forward until I say go. If I drift from the original intent, name it. Hold the thread.`,
    link: "/promptolinguistics",
    linkLabel: "Promptolinguistics →",
    position: 4,
  },
  {
    categoryId: "session",
    categoryLabel: "Session Tools",
    categoryColor: "#D4722A",
    categoryBgColor: "#160e06",
    title: "Five Questions",
    description: "The governance check. Five honest questions before any major decision.",
    promptText: `Before I act on this, answer five questions honestly:\n\n1. Is this safe?\n2. Is this true — or does it just sound true?\n3. Am I in charge of this decision?\n4. What is the strongest argument against this?\n5. What am I not seeing?`,
    link: "/rules",
    linkLabel: "The Five Rules →",
    position: 5,
  },
  {
    categoryId: "session",
    categoryLabel: "Session Tools",
    categoryColor: "#D4722A",
    categoryBgColor: "#160e06",
    title: "Everyday Boot Sequence",
    description: "The simplified version. For people who do not need the full calibration block.",
    promptText: `Be honest. Tell me if you are guessing. I am in charge. You help me think. Now: [your question here]`,
    link: "/for/everyday",
    linkLabel: "Everyday Person Lens →",
    position: 6,
  },
  {
    categoryId: "session",
    categoryLabel: "Session Tools",
    categoryColor: "#D4722A",
    categoryBgColor: "#160e06",
    title: "Context Bridge Loading Strategy",
    description: "How to load a new session without front-loading too much. Start with what you need. Add more only if asked.",
    promptText: `Here is the context for this session. Read it once. Do not summarize it back to me. Do not build anything yet. Tell me when you are ready and I will give you the first task.\n\n[paste your context here]`,
    link: "/citizen-researcher",
    linkLabel: "Citizen Researcher →",
    position: 7,
  },
  // ── Flower Presets ──
  {
    categoryId: "flower",
    categoryLabel: "Flower Presets",
    categoryColor: "#2980B9",
    categoryBgColor: "#06101a",
    title: "Iris — Analyze",
    description: "Activates critical thinking mode. Breaks things apart to see how they work.",
    promptText: `🔵 IRIS PRESET — Analyze\n\nBreak this apart. Identify the components. Tell me how each part works and how they connect. Do not summarize — dissect.\n\n[your topic here]`,
    link: "/flower-presets",
    linkLabel: "All Flower Presets →",
    position: 0,
  },
  {
    categoryId: "flower",
    categoryLabel: "Flower Presets",
    categoryColor: "#2980B9",
    categoryBgColor: "#06101a",
    title: "Chrysanthemum — Structure",
    description: "Organizes chaos. Adds headers, lists, hierarchy. Brings order.",
    promptText: `🏵️ CHRYSANTHEMUM PRESET — Structure\n\nOrganize this. Give it headers. Use numbered lists where sequence matters. Use bullet points where it does not. Make the hierarchy visible.\n\n[your content here]`,
    link: "/flower-presets",
    linkLabel: "All Flower Presets →",
    position: 1,
  },
  {
    categoryId: "flower",
    categoryLabel: "Flower Presets",
    categoryColor: "#2980B9",
    categoryBgColor: "#06101a",
    title: "Jasmine — Persuade",
    description: "Adds rhetorical weight without manipulation.",
    promptText: `🤍 JASMINE PRESET — Persuade\n\nStrengthen this argument. Add evidence where it is weak. Sharpen the language where it is vague. Do not manipulate — make it genuinely more convincing.\n\n[your argument here]`,
    link: "/flower-presets",
    linkLabel: "All Flower Presets →",
    position: 2,
  },
  // ── Kids Prompts ──
  {
    categoryId: "kids",
    categoryLabel: "Kids Prompts",
    categoryColor: "#059669",
    categoryBgColor: "#061410",
    title: "Ask a Question",
    description: "The simplest prompt. Just type what you want to know.",
    promptText: `Why do [thing you are curious about]?`,
    link: "/for/child/prompts",
    linkLabel: "First Prompts for Kids →",
    position: 0,
  },
  {
    categoryId: "kids",
    categoryLabel: "Kids Prompts",
    categoryColor: "#059669",
    categoryBgColor: "#061410",
    title: "Give It Rules First",
    description: "Set the room before you ask. The AI knows how to talk to you.",
    promptText: `Be honest. Tell me if you don't know. Keep it simple for a kid. Now: [your question here]`,
    link: "/for/child/prompts",
    linkLabel: "First Prompts for Kids →",
    position: 1,
  },
  {
    categoryId: "kids",
    categoryLabel: "Kids Prompts",
    categoryColor: "#059669",
    categoryBgColor: "#061410",
    title: "The Safety Prompt",
    description: "What to do if something feels wrong.",
    promptText: `Stop. I need you to check something. Is what you just said safe and true? If you are not sure, tell me you are not sure. I am in charge. You help me.`,
    link: "/for/child/prompts",
    linkLabel: "First Prompts for Kids →",
    position: 2,
  },
  // ── Language Physics ──
  {
    categoryId: "language",
    categoryLabel: "Language Physics",
    categoryColor: "#7C3AED",
    categoryBgColor: "#0e0814",
    title: "The Corner",
    description: "A single word that changes the geometry of the response.",
    promptText: `CORNER — You are now constrained to this specific point. Do not expand. Do not generalize. Stay exactly here.\n\n[your topic here]`,
    link: "/prompt-games",
    linkLabel: "See Prompt Games →",
    position: 0,
  },
  {
    categoryId: "language",
    categoryLabel: "Language Physics",
    categoryColor: "#7C3AED",
    categoryBgColor: "#0e0814",
    title: "Token Zero Setup",
    description: "Set the pre-output force profile before the session begins.",
    promptText: `Before you generate a single word, read this:\n\nYou are operating under these constraints:\n- Honesty over confidence\n- Uncertainty acknowledged, not hidden\n- The user decides, always\n- No flattery, no performance\n\nThese are not instructions. They are the conditions of this session.`,
    link: "/promptolinguistics",
    linkLabel: "Promptolinguistics →",
    position: 1,
  },
  {
    categoryId: "language",
    categoryLabel: "Language Physics",
    categoryColor: "#7C3AED",
    categoryBgColor: "#0e0814",
    title: "The Watcher Prompt",
    description: "Activates the metacognitive layer. The AI watches itself while it responds.",
    promptText: `As you answer, watch yourself answering. After your response, tell me:\n- Where were you most confident?\n- Where were you guessing?\n- Did you drift from the question at any point?\n\nNow: [your question here]`,
    link: "/for/watcher",
    linkLabel: "The Watcher Lens →",
    position: 2,
  },
];

async function seed() {
  const conn = await mysql.createConnection(DATABASE_URL);
  try {
    // Clear existing data
    await conn.execute("DELETE FROM prompt_panel_items");
    console.log("Cleared existing prompt_panel_items");

    // Insert all items
    for (const item of items) {
      await conn.execute(
        `INSERT INTO prompt_panel_items 
         (categoryId, categoryLabel, categoryColor, categoryBgColor, title, description, promptText, link, linkLabel, position, isActive, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`,
        [
          item.categoryId,
          item.categoryLabel,
          item.categoryColor,
          item.categoryBgColor,
          item.title,
          item.description,
          item.promptText,
          item.link ?? null,
          item.linkLabel ?? null,
          item.position,
        ]
      );
    }
    console.log(`✓ Seeded ${items.length} prompt panel items`);
  } finally {
    await conn.end();
  }
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
