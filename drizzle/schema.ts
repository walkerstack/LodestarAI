import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─────────────────────────────────────────────
// STUDIO TABLES
// ─────────────────────────────────────────────

/**
 * content_blocks — stores all editable content blocks for every page.
 * Each block belongs to a page (by slug), has a type, a position order,
 * and a JSON content field that holds the block's data.
 *
 * Block types:
 *   text  — { heading?: string, body: string, font: 'playfair'|'dmsans', size: 'large'|'medium'|'small' }
 *   card  — { title: string, description: string, imageUrl?: string, linkLabel?: string, linkUrl?: string, font: string, size: string }
 *   doc   — { label: string, url: string, description?: string }
 *   image — { url: string, alt: string }
 */
export const contentBlocks = mysqlTable("content_blocks", {
  id: int("id").autoincrement().primaryKey(),
  /** The page slug this block belongs to, e.g. 'rules', 'field-papers', 'home' */
  pageSlug: varchar("pageSlug", { length: 128 }).notNull(),
  /** Block type: text | card | doc | image */
  blockType: mysqlEnum("blockType", ["text", "card", "doc", "image"]).notNull(),
  /** Display order on the page. Lower = higher on page. */
  position: int("position").notNull().default(0),
  /** JSON-encoded content specific to the block type */
  content: text("content").notNull(),
  /** Whether this block is a mirror of another block */
  isMirror: boolean("isMirror").notNull().default(false),
  /** If this is a mirror, the id of the source block */
  mirrorSourceId: int("mirrorSourceId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContentBlock = typeof contentBlocks.$inferSelect;
export type InsertContentBlock = typeof contentBlocks.$inferInsert;

/**
 * media_library — stores all uploaded photos and documents.
 * Files are stored in S3; this table stores the metadata and URL.
 */
export const mediaLibrary = mysqlTable("media_library", {
  id: int("id").autoincrement().primaryKey(),
  /** Original filename as uploaded */
  filename: varchar("filename", { length: 255 }).notNull(),
  /** Public CDN URL from S3 */
  url: text("url").notNull(),
  /** S3 key for the file */
  fileKey: varchar("fileKey", { length: 512 }).notNull(),
  /** MIME type: image/jpeg, image/png, application/pdf, etc. */
  mimeType: varchar("mimeType", { length: 128 }).notNull(),
  /** Media type for filtering: image | doc */
  mediaType: mysqlEnum("mediaType", ["image", "doc"]).notNull(),
  /** File size in bytes */
  fileSize: int("fileSize"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MediaItem = typeof mediaLibrary.$inferSelect;
export type InsertMediaItem = typeof mediaLibrary.$inferInsert;

/**
 * page_links — stores all navigational links on each page.
 * This allows the owner to reroute links without touching code.
 * Links are identified by page + label. Destination can be changed.
 */
export const pageLinks = mysqlTable("page_links", {
  id: int("id").autoincrement().primaryKey(),
  /** The page slug this link lives on */
  pageSlug: varchar("pageSlug", { length: 128 }).notNull(),
  /** Human-readable label for the link, e.g. "Road Protocol" */
  label: varchar("label", { length: 255 }).notNull(),
  /** Where the link currently points */
  destination: varchar("destination", { length: 512 }).notNull(),
  /** Display order on the page */
  position: int("position").notNull().default(0),
  /** Whether this link is active (visible to visitors) */
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PageLink = typeof pageLinks.$inferSelect;
export type InsertPageLink = typeof pageLinks.$inferInsert;
