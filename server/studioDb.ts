/**
 * Studio database query helpers.
 * All Studio operations go through these helpers.
 * Called from server/routers/studio.ts
 */

import { eq, asc } from "drizzle-orm";
import {
  contentBlocks,
  mediaLibrary,
  pageLinks,
  studioPages,
  learningFlow,
  lexiconTerms,
  promptGames,
  InsertContentBlock,
  InsertMediaItem,
  InsertPageLink,
  InsertStudioPage,
  InsertLexiconTerm,
  InsertPromptGame,
  promptPanelItems,
  InsertPromptPanelItem,
} from "../drizzle/schema";
import { getDb } from "./db";

// ─────────────────────────────────────────────
// CONTENT BLOCKS
// ─────────────────────────────────────────────

export async function getBlocksByPage(pageSlug: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(contentBlocks)
    .where(eq(contentBlocks.pageSlug, pageSlug))
    .orderBy(asc(contentBlocks.position));
}

export async function getAllPageSlugs() {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .selectDistinct({ pageSlug: contentBlocks.pageSlug })
    .from(contentBlocks)
    .orderBy(asc(contentBlocks.pageSlug));
  return rows.map((r) => r.pageSlug);
}

export async function createBlock(data: InsertContentBlock) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(contentBlocks).values(data);
  return result;
}

export async function updateBlock(
  id: number,
  data: Partial<Pick<InsertContentBlock, "content" | "position" | "blockType">>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contentBlocks).set(data).where(eq(contentBlocks.id, id));
}

export async function deleteBlock(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(contentBlocks).where(eq(contentBlocks.id, id));
}

export async function reorderBlocks(
  pageSlug: string,
  orderedIds: number[]
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Update each block's position based on its index in the ordered list
  for (let i = 0; i < orderedIds.length; i++) {
    await db
      .update(contentBlocks)
      .set({ position: i })
      .where(eq(contentBlocks.id, orderedIds[i]));
  }
}

export async function mirrorBlock(sourceId: number, targetPageSlug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Get source block
  const source = await db
    .select()
    .from(contentBlocks)
    .where(eq(contentBlocks.id, sourceId))
    .limit(1);

  if (!source.length) throw new Error("Source block not found");

  // Get max position on target page
  const existing = await db
    .select()
    .from(contentBlocks)
    .where(eq(contentBlocks.pageSlug, targetPageSlug))
    .orderBy(asc(contentBlocks.position));

  const maxPos = existing.length > 0 ? existing[existing.length - 1].position + 1 : 0;

  // Insert mirror
  await db.insert(contentBlocks).values({
    pageSlug: targetPageSlug,
    blockType: source[0].blockType,
    position: maxPos,
    content: source[0].content,
    isMirror: true,
    mirrorSourceId: sourceId,
  });
}

// ─────────────────────────────────────────────
// MEDIA LIBRARY
// ─────────────────────────────────────────────

export async function getAllMedia() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mediaLibrary).orderBy(asc(mediaLibrary.createdAt));
}

export async function createMediaItem(data: InsertMediaItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(mediaLibrary).values(data);
}

export async function deleteMediaItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(mediaLibrary).where(eq(mediaLibrary.id, id));
}

// ─────────────────────────────────────────────
// PAGE LINKS
// ─────────────────────────────────────────────

export async function getLinksByPage(pageSlug: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(pageLinks)
    .where(eq(pageLinks.pageSlug, pageSlug))
    .orderBy(asc(pageLinks.position));
}

export async function getAllLinks() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pageLinks).orderBy(asc(pageLinks.pageSlug), asc(pageLinks.position));
}

export async function createLink(data: InsertPageLink) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(pageLinks).values(data);
}

export async function updateLink(
  id: number,
  data: Partial<Pick<InsertPageLink, "label" | "destination" | "isActive" | "position">>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(pageLinks).set(data).where(eq(pageLinks.id, id));
}

export async function deleteLink(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(pageLinks).where(eq(pageLinks.id, id));
}

// ─────────────────────────────────────────────
// STUDIO PAGES (template builder)
// ─────────────────────────────────────────────

export async function getAllStudioPages() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(studioPages).orderBy(asc(studioPages.createdAt));
}

export async function getStudioPageBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(studioPages).where(eq(studioPages.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function createStudioPage(data: InsertStudioPage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(studioPages).values(data);
}

export async function updateStudioPage(
  id: number,
  data: Partial<Pick<InsertStudioPage, "label" | "isPublished" | "navCategory">>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(studioPages).set(data).where(eq(studioPages.id, id));
}

export async function deleteStudioPage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(studioPages).where(eq(studioPages.id, id));
}

/**
 * Copy all content blocks from a source page slug to a new target page slug.
 * Preserves block type, content, and position order.
 * Returns the number of blocks copied.
 */
export async function copyBlocksToNewPage(sourceSlug: string, targetSlug: string): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const sourceBlocks = await db
    .select()
    .from(contentBlocks)
    .where(eq(contentBlocks.pageSlug, sourceSlug))
    .orderBy(asc(contentBlocks.position));
  if (sourceBlocks.length === 0) return 0;
  const newBlocks = sourceBlocks.map((b, i) => ({
    pageSlug: targetSlug,
    blockType: b.blockType,
    position: i,
    content: b.content,
    isMirror: false,
    mirrorSourceId: null,
  }));
  await db.insert(contentBlocks).values(newBlocks);
  return newBlocks.length;
}

// ─────────────────────────────────────────────
// LEARNING FLOW
// ─────────────────────────────────────────────

export async function getAllLearningFlow() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(learningFlow).orderBy(asc(learningFlow.pageSlug));
}

export async function getLearningFlowBySlug(pageSlug: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(learningFlow)
    .where(eq(learningFlow.pageSlug, pageSlug));
  return rows[0] ?? null;
}

export interface FlowLinkInput {
  label: string;
  href: string;
  description: string;
}

export async function upsertLearningFlow(
  pageSlug: string,
  data: { deeperLinks?: FlowLinkInput[]; widerLinks?: FlowLinkInput[]; simplerLinks?: FlowLinkInput[] }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const serialized = {
    ...(data.deeperLinks !== undefined ? { deeperLinks: JSON.stringify(data.deeperLinks) } : {}),
    ...(data.widerLinks !== undefined ? { widerLinks: JSON.stringify(data.widerLinks) } : {}),
    ...(data.simplerLinks !== undefined ? { simplerLinks: JSON.stringify(data.simplerLinks) } : {}),
  };
  const existing = await getLearningFlowBySlug(pageSlug);
  if (existing) {
    await db
      .update(learningFlow)
      .set(serialized)
      .where(eq(learningFlow.pageSlug, pageSlug));
  } else {
    await db.insert(learningFlow).values({ pageSlug, ...serialized });
  }
}

export function parseLearningFlowRow(row: { deeperLinks: string | null; widerLinks: string | null; simplerLinks: string | null }) {
  return {
    deeper: row.deeperLinks ? (JSON.parse(row.deeperLinks) as FlowLinkInput[]) : [],
    wider: row.widerLinks ? (JSON.parse(row.widerLinks) as FlowLinkInput[]) : [],
    simpler: row.simplerLinks ? (JSON.parse(row.simplerLinks) as FlowLinkInput[]) : [],
  };
}

// ─────────────────────────────────────────────
// LEXICON TERMS
// ─────────────────────────────────────────────

export async function getAllLexiconTerms() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(lexiconTerms).orderBy(asc(lexiconTerms.position), asc(lexiconTerms.term));
}

export async function createLexiconTerm(data: InsertLexiconTerm) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(lexiconTerms).values(data);
  return result;
}

export async function updateLexiconTerm(id: number, data: Partial<InsertLexiconTerm>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(lexiconTerms).set(data).where(eq(lexiconTerms.id, id));
}

export async function deleteLexiconTerm(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(lexiconTerms).where(eq(lexiconTerms.id, id));
}

// ─────────────────────────────────────────────
// PROMPT GAMES
// ─────────────────────────────────────────────

export async function getAllPromptGames() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(promptGames).orderBy(asc(promptGames.position), asc(promptGames.title));
}

export async function createPromptGame(data: InsertPromptGame) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(promptGames).values(data);
  return result;
}

export async function updatePromptGame(id: number, data: Partial<InsertPromptGame>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(promptGames).set(data).where(eq(promptGames.id, id));
}

export async function deletePromptGame(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(promptGames).where(eq(promptGames.id, id));
}

// ─────────────────────────────────────────────
// PROMPT PANEL ITEMS (G Button)
// ─────────────────────────────────────────────

export async function getAllPromptPanelItems() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(promptPanelItems).orderBy(asc(promptPanelItems.categoryId), asc(promptPanelItems.position));
}

export async function createPromptPanelItem(data: InsertPromptPanelItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(promptPanelItems).values(data);
  return result;
}

export async function updatePromptPanelItem(id: number, data: Partial<InsertPromptPanelItem>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(promptPanelItems).set(data).where(eq(promptPanelItems.id, id));
}

export async function deletePromptPanelItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(promptPanelItems).where(eq(promptPanelItems.id, id));
}

// ─────────────────────────────────────────────
// BUILD 3 — DRAFT / PUBLISH / UNDO HELPERS
// ─────────────────────────────────────────────

/**
 * Returns only published blocks for a page.
 * Used by StudioBlocks.tsx in visitor (live) mode.
 */
export async function getPublishedBlocks(pageSlug: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(contentBlocks)
    .where(eq(contentBlocks.pageSlug, pageSlug))
    .orderBy(asc(contentBlocks.position));
}

/**
 * Returns ALL blocks for a page (published + draft).
 * Used by StudioBlocks.tsx in admin edit mode.
 * Includes draftContent and previousContent so the editor can show working state.
 */
export async function getDraftBlocks(pageSlug: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(contentBlocks)
    .where(eq(contentBlocks.pageSlug, pageSlug))
    .orderBy(asc(contentBlocks.position));
}

/**
 * Saves a working draft for a block without publishing.
 * Sets status = "draft" and stores the new content in draftContent.
 * The live content column is unchanged — visitors still see the old version.
 */
export async function saveDraft(blockId: number, draftContent: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(contentBlocks)
    .set({ draftContent, status: "draft" })
    .where(eq(contentBlocks.id, blockId));
}

/**
 * Publishes a single block.
 * - Saves current live content into previousContent (for undo)
 * - Copies draftContent into content (makes it live)
 * - Clears draftContent
 * - Sets status = "published"
 * If there is no draftContent, does nothing (block is already live).
 */
export async function publishBlock(blockId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db
    .select()
    .from(contentBlocks)
    .where(eq(contentBlocks.id, blockId))
    .limit(1);
  if (!rows.length) throw new Error(`Block ${blockId} not found`);
  const block = rows[0];
  if (!block.draftContent) return; // nothing to publish
  await db
    .update(contentBlocks)
    .set({
      previousContent: block.content,
      content: block.draftContent,
      draftContent: null,
      status: "published",
    })
    .where(eq(contentBlocks.id, blockId));
}

/**
 * Publishes all draft blocks on a page at once.
 * Called from the "Publish All" button in the Studio lens header.
 */
export async function publishAllDrafts(pageSlug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const blocks = await db
    .select()
    .from(contentBlocks)
    .where(eq(contentBlocks.pageSlug, pageSlug));
  for (const block of blocks) {
    if (block.status === "draft" && block.draftContent) {
      await db
        .update(contentBlocks)
        .set({
          previousContent: block.content,
          content: block.draftContent,
          draftContent: null,
          status: "published",
        })
        .where(eq(contentBlocks.id, block.id));
    }
  }
}

/**
 * Undoes the last publish for a block.
 * Restores previousContent back into content.
 * Clears previousContent after restore.
 * If there is no previousContent, does nothing.
 */
export async function undoLastEdit(blockId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db
    .select()
    .from(contentBlocks)
    .where(eq(contentBlocks.id, blockId))
    .limit(1);
  if (!rows.length) throw new Error(`Block ${blockId} not found`);
  const block = rows[0];
  if (!block.previousContent) return; // nothing to undo
  await db
    .update(contentBlocks)
    .set({
      content: block.previousContent,
      previousContent: null,
      draftContent: null,
      status: "published",
    })
    .where(eq(contentBlocks.id, block.id));
}
