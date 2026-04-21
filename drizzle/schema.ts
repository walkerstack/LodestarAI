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
 *   text      — { heading?: string, body: string, font: 'playfair'|'dmsans', size: 'large'|'medium'|'small' }
 *   card      — { title: string, description: string, imageUrl?: string, linkLabel?: string, linkUrl?: string, font: string, size: string }
 *   doc       — { label: string, url: string, description?: string }
 *   image     — { url: string, alt: string, caption?: string }
 *   carousel  — { items: Array<{ url: string, alt: string, label?: string, caption?: string, linkUrl?: string }> }
 *   rule-card — { items: Array<{ imageUrl: string, rule: string, caption: string, linkUrl?: string }> }
 *   sticker   — { url: string, alt: string, position?: 'left'|'center'|'right', size?: 'small'|'medium'|'large' }
 */
export const contentBlocks = mysqlTable("content_blocks", {
  id: int("id").autoincrement().primaryKey(),
  /** The page slug this block belongs to, e.g. 'rules', 'field-papers', 'home' */
  pageSlug: varchar("pageSlug", { length: 128 }).notNull(),
  /** Block type: text | card | doc | image | carousel | rule-card | sticker */
  blockType: mysqlEnum("blockType", ["text", "card", "doc", "image", "carousel", "rule-card", "sticker"]).notNull(),
  /** Display order on the page. Lower = higher on page. */
  position: int("position").notNull().default(0),
  /** JSON-encoded content specific to the block type */
  content: text("content").notNull(),
  /** Whether this block is a mirror of another block */
  isMirror: boolean("isMirror").notNull().default(false),
  /** If this is a mirror, the id of the source block */
  mirrorSourceId: int("mirrorSourceId"),
  /** Block status: published (live to visitors) or draft (working copy, not yet live) */
  status: mysqlEnum("status", ["published", "draft"]).notNull().default("published"),
  /** Working draft content — JSON string, same shape as content. Null until first edit. */
  draftContent: text("draftContent"),
  /** Previous published content — stored on publish for one-tap undo */
  previousContent: text("previousContent"),
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

/**
 * studio_pages — stores pages created via the Studio Page Template Builder.
 * These are owner-created pages that render via DynamicPage.tsx.
 * Static site pages (hardcoded in SITE_PAGES) are NOT stored here.
 */
export const studioPages = mysqlTable("studio_pages", {
  id: int("id").autoincrement().primaryKey(),
  /** URL slug, e.g. 'my-new-article' — must be unique */
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  /** Human-readable label shown in Studio and nav, e.g. 'My New Article' */
  label: varchar("label", { length: 255 }).notNull(),
  /** URL path, e.g. '/my-new-article' */
  path: varchar("path", { length: 255 }).notNull(),
  /** Template used: blank | article | lens | card-grid */
  template: mysqlEnum("template", ["blank", "article", "lens", "card-grid"]).notNull().default("blank"),
  /** Whether this page is published (visible to visitors) */
  isPublished: boolean("isPublished").notNull().default(false),
  /** Optional nav category to appear in */
  navCategory: varchar("navCategory", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StudioPage = typeof studioPages.$inferSelect;
export type InsertStudioPage = typeof studioPages.$inferInsert;

/**
 * learning_flow — stores the deeper/wider/simpler connections for each page.
 * Replaces the hardcoded learningFlowMap.ts so the owner can edit from Studio.
 */
/**
 * One row per page slug.
 * Each direction stores a JSON array of FlowLink objects:
 * [{ label: string, href: string, description: string }]
 */
export const learningFlow = mysqlTable("learning_flow", {
  id: int("id").autoincrement().primaryKey(),
  /** The page slug this row belongs to, e.g. 'rules' */
  pageSlug: varchar("pageSlug", { length: 128 }).notNull().unique(),
  /** JSON array of Go Deeper links */
  deeperLinks: text("deeperLinks"),
  /** JSON array of Go Wider links */
  widerLinks: text("widerLinks"),
  /** JSON array of Go Simpler links */
  simplerLinks: text("simplerLinks"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export interface FlowLink {
  label: string;
  href: string;
  description: string;
}

export type LearningFlowRow = typeof learningFlow.$inferSelect;
export type InsertLearningFlowRow = typeof learningFlow.$inferInsert;

/**
 * lexicon_terms — stores all Living Lexicon terms.
 * Replaces the hardcoded array in LivingLexicon.tsx.
 * Each term has three voices: everyday, professional, watcher.
 */
export const lexiconTerms = mysqlTable("lexicon_terms", {
  id: int("id").autoincrement().primaryKey(),
  /** The term name, e.g. 'Token Zero' */
  term: varchar("term", { length: 255 }).notNull(),
  /** Category for grouping, e.g. 'CORE', 'CONCEPTS', 'TOOLS' */
  category: varchar("category", { length: 64 }).notNull().default("CORE"),
  /** Optional internal link to a related page, e.g. '/rules' */
  link: varchar("link", { length: 255 }),
  /** Everyday voice definition */
  everyday: text("everyday").notNull(),
  /** Professional voice definition */
  professional: text("professional").notNull(),
  /** Watcher voice definition */
  watcher: text("watcher").notNull(),
  /** Display order */
  position: int("position").notNull().default(0),
  /** Whether this term is visible on the public page */
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LexiconTerm = typeof lexiconTerms.$inferSelect;
export type InsertLexiconTerm = typeof lexiconTerms.$inferInsert;

/**
 * prompt_games — stores all Prompt Games entries.
 * Replaces the hardcoded games array in PromptGames.tsx.
 */
export const promptGames = mysqlTable("prompt_games", {
  id: int("id").autoincrement().primaryKey(),
  /** Game title, e.g. 'The Habergeon Prompt' */
  title: varchar("title", { length: 255 }).notNull(),
  /** Category, e.g. 'Power Prompt', 'Language Physics', 'Session Tools' */
  category: varchar("category", { length: 128 }).notNull(),
  /** The actual prompt text to copy */
  prompt: text("prompt").notNull(),
  /** CDN URL for the poster/cover image */
  poster: varchar("poster", { length: 512 }),
  /** What this prompt does — everyday explanation */
  learningWhat: text("learningWhat"),
  /** Why it works — the mechanism */
  learningWhy: text("learningWhy"),
  /** How to use it */
  learningHow: text("learningHow"),
  /** Display order */
  position: int("position").notNull().default(0),
  /** Whether this game is visible on the public page */
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PromptGame = typeof promptGames.$inferSelect;
export type InsertPromptGame = typeof promptGames.$inferInsert;

/**
 * prompt_panel_items — stores all prompts shown in the G button floating panel.
 * Replaces the hardcoded categories/prompts array in PromptPanel.tsx.
 * Each row is one prompt inside a named category.
 */
export const promptPanelItems = mysqlTable("prompt_panel_items", {
  id: int("id").autoincrement().primaryKey(),
  /** Category id, e.g. 'power', 'session', 'flower', 'kids', 'language' */
  categoryId: varchar("categoryId", { length: 64 }).notNull(),
  /** Category display label, e.g. 'Power Prompts' */
  categoryLabel: varchar("categoryLabel", { length: 128 }).notNull(),
  /** Category accent colour hex, e.g. '#E8520A' */
  categoryColor: varchar("categoryColor", { length: 32 }).notNull().default("#E8520A"),
  /** Category background colour hex for the expanded panel */
  categoryBgColor: varchar("categoryBgColor", { length: 32 }).notNull().default("#1a0e08"),
  /** Prompt title */
  title: varchar("title", { length: 255 }).notNull(),
  /** Short description shown when the prompt is expanded */
  description: text("description"),
  /** The actual prompt text to copy */
  promptText: text("promptText").notNull(),
  /** Optional internal link, e.g. '/prompt-games' */
  link: varchar("link", { length: 512 }),
  /** Label for the link, e.g. 'See Prompt Games →' */
  linkLabel: varchar("linkLabel", { length: 128 }),
  /** Display order within the category */
  position: int("position").notNull().default(0),
  /** Whether this prompt is visible in the panel */
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PromptPanelItem = typeof promptPanelItems.$inferSelect;
export type InsertPromptPanelItem = typeof promptPanelItems.$inferInsert;

/**
 * nav_items — stores all navigation links for Nav.tsx and Footer.tsx.
 * Replaces the hardcoded arrays in navData.ts.
 * Each row is one link in one section of the nav or footer.
 *
 * Sections:
 *   lenses     — Enter Your Lens dropdown
 *   foundation — Foundation dropdown
 *   for-you    — For You dropdown
 *   tools      — Tools dropdown
 *   research   — Research dropdown
 *   explore    — Explore dropdown
 *
 * Preview-before-publish:
 *   isPublished = false → visible in Studio preview only
 *   isPublished = true  → live on the site
 *
 * Footer:
 *   isFooter = true → also appears in the footer
 */
export const navItems = mysqlTable("nav_items", {
  id: int("id").autoincrement().primaryKey(),
  /** Which nav section this item belongs to */
  section: mysqlEnum("section", ["lenses", "foundation", "for-you", "tools", "research", "explore"]).notNull(),
  /** Display label, e.g. 'The Five Rules' */
  label: varchar("label", { length: 255 }).notNull(),
  /** URL path, e.g. '/rules' */
  path: varchar("path", { length: 512 }).notNull(),
  /** Optional colour — Tailwind class or hex, e.g. 'text-sky-500' or '#E8520A' */
  colour: varchar("colour", { length: 128 }),
  /** Display order within the section. Lower = higher in list. */
  position: int("position").notNull().default(0),
  /** Whether this item is live on the site. false = draft/preview only. */
  isPublished: boolean("isPublished").notNull().default(false),
  /** Whether this item also appears in the footer */
  isFooter: boolean("isFooter").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NavItem = typeof navItems.$inferSelect;
export type InsertNavItem = typeof navItems.$inferInsert;

/**
 * site_settings — key/value store for site-wide configuration.
 * Used for the announcement banner, maintenance mode, and other global settings.
 *
 * Known keys:
 *   banner_enabled  — "true" | "false"
 *   banner_text     — string, the announcement text
 *   banner_color    — optional hex color override, defaults to site orange
 *   banner_link     — optional URL the banner links to
 *   banner_link_label — optional label for the banner link
 */
export const siteSettings = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  /** Setting key, e.g. 'banner_enabled', 'banner_text' */
  key: varchar("key", { length: 128 }).notNull().unique(),
  /** Setting value — always stored as a string */
  value: text("value").notNull(),
  /** Optional description for Studio display */
  description: text("description"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;
