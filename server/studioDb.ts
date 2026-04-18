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
  InsertContentBlock,
  InsertMediaItem,
  InsertPageLink,
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
