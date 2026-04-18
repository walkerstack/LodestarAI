/**
 * Studio Router — owner-only tRPC procedures for the GallantryAI Studio CMS.
 * All procedures use adminProcedure — only the site owner can call them.
 */

import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { sql } from "drizzle-orm";
import { getDb } from "../db";
import { contentBlocks } from "../../drizzle/schema";
import {
  getBlocksByPage,
  getAllPageSlugs,
  createBlock,
  updateBlock,
  deleteBlock,
  reorderBlocks,
  mirrorBlock,
  getAllMedia,
  createMediaItem,
  deleteMediaItem,
  getLinksByPage,
  getAllLinks,
  createLink,
  updateLink,
  deleteLink,
  getAllStudioPages,
  createStudioPage,
  updateStudioPage,
  deleteStudioPage,
  getAllLearningFlow,
  upsertLearningFlow,
} from "../studioDb";
import { storagePut } from "../storage";

// ─────────────────────────────────────────────
// KNOWN PAGES — the full site page list
// ─────────────────────────────────────────────

const SITE_PAGES = [
  { slug: "home", label: "Home", path: "/" },
  { slug: "rules", label: "Five Rules", path: "/rules" },
  { slug: "road-protocol", label: "Road Protocol", path: "/road-protocol" },
  { slug: "promptolinguistics", label: "Promptolinguistics", path: "/promptolinguistics" },
  { slug: "alcm", label: "ALCM", path: "/alcm" },
  { slug: "lexicon", label: "Living Lexicon", path: "/lexicon" },
  { slug: "field-papers", label: "Field Papers", path: "/field-papers" },
  { slug: "citizen-researcher", label: "Citizen Researcher", path: "/citizen-researcher" },
  { slug: "research-hub", label: "Research Hub", path: "/research-hub" },
  { slug: "builder", label: "Builder", path: "/builder" },
  { slug: "builder-origin", label: "Builder Origin", path: "/builder-origin" },
  { slug: "builders-kids", label: "Builder's Kids", path: "/builders-kids" },
  { slug: "frameworks", label: "Framework Families", path: "/frameworks" },
  { slug: "taxonomy", label: "AI Family Taxonomy", path: "/taxonomy" },
  { slug: "malbolge", label: "Malbolge Geofence", path: "/malbolge" },
  { slug: "playground", label: "Promptology Playground", path: "/playground" },
  { slug: "prompt-games", label: "Prompt Games", path: "/prompt-games" },
  { slug: "flower-presets", label: "Flower Presets", path: "/flower-presets" },
  { slug: "human-line", label: "Human Line", path: "/human-line" },
  { slug: "drift", label: "Drift", path: "/drift" },
  { slug: "anthropomorphism", label: "Anthropomorphism", path: "/anthropomorphism" },
  { slug: "hallucinations", label: "Hallucinations", path: "/hallucinations" },
  { slug: "scaffold", label: "Scaffold", path: "/scaffold" },
  { slug: "three-voices", label: "Three Voices", path: "/three-voices" },
  { slug: "whelm-scale", label: "Whelm Scale", path: "/whelm-scale" },
  { slug: "variable-scale", label: "Variable Scale", path: "/variable-scale" },
  { slug: "math-prompting", label: "Math Prompting", path: "/math-prompting" },
  { slug: "user-governance", label: "User Governance", path: "/user-governance" },
  { slug: "dual-strategy", label: "Dual Strategy", path: "/dual-strategy" },
  { slug: "gallantry-ai", label: "GallantryAI Page", path: "/gallantry-ai" },
  { slug: "eu-ai-act", label: "EU AI Act", path: "/eu-ai-act" },
  { slug: "what-claude-admitted", label: "What Claude Admitted", path: "/what-claude-admitted" },
  { slug: "what-the-ai-said", label: "What the AI Said", path: "/what-the-ai-said" },
  { slug: "open-door", label: "Open Door", path: "/open-door" },
  { slug: "counter-arguments", label: "Counter Arguments", path: "/counter-arguments" },
  { slug: "screenshot-sharing", label: "Screenshot Sharing", path: "/screenshot-sharing" },
  { slug: "field-report-review", label: "Field Report Review", path: "/field-report-review" },
  { slug: "gallery", label: "Gallery", path: "/gallery" },
  { slug: "articles", label: "Articles", path: "/articles" },
  { slug: "safety", label: "Safety Page", path: "/if-you-need-to-stop" },
  { slug: "school-board", label: "School Board", path: "/school-board" },
  { slug: "kids-learn", label: "Kids Learn", path: "/kids-learn" },
  { slug: "prompts", label: "Prompt Library", path: "/prompts" },
  // Lenses
  { slug: "for-child", label: "Child Lens", path: "/for/child" },
  { slug: "for-child-rules", label: "Child: Five Rules", path: "/for/child/rules" },
  { slug: "for-child-patterns", label: "Child: Patterns", path: "/for/child/patterns" },
  { slug: "for-child-prompts", label: "Child: Prompts", path: "/for/child/prompts" },
  { slug: "for-teenager", label: "Teenager Lens", path: "/for/teenager" },
  { slug: "for-everyday", label: "Everyday Person Lens", path: "/for/everyday" },
  { slug: "for-guardian-teacher", label: "Guardian/Teacher Lens", path: "/for/guardian-teacher" },
  { slug: "for-prompt-engineer", label: "Prompt Engineer Lens", path: "/for/prompt-engineer" },
  { slug: "for-linguist", label: "Linguist Lens", path: "/for/linguist" },
  { slug: "for-mathematician", label: "Mathematician Lens", path: "/for/mathematician" },
  { slug: "for-cognitive-science", label: "Cognitive Science Lens", path: "/for/cognitive-science" },
  { slug: "for-psychology", label: "Psychology Lens", path: "/for/psychology" },
  { slug: "for-researcher", label: "Researcher Lens", path: "/for/researcher" },
  { slug: "for-watcher", label: "Watcher Lens", path: "/for/watcher" },
];

export const studioRouter = router({
  // ── PUBLIC — studio password login ──
  studioLogin: publicProcedure
    .input(z.object({ password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { ENV } = await import("../_core/env");
      if (input.password !== ENV.studioPassword) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Wrong password" });
      }
      // Ensure owner exists in the users table so authenticateRequest can find them
      // Without this, the cookie is valid but the DB lookup fails on the next request
      const { upsertUser } = await import("../db");
      await upsertUser({
        openId: ENV.ownerOpenId,
        name: ENV.ownerName,
        email: null,
        loginMethod: "studio_password",
        lastSignedIn: new Date(),
        role: "admin",
      });
      // Use the SDK to create a proper session token for the owner
      // This sets the standard app_session_id cookie the auth system already reads
      const { sdk } = await import("../_core/sdk");
      const { getSessionCookieOptions } = await import("../_core/cookies");
      const { COOKIE_NAME } = await import("../../shared/const");
      const token = await sdk.createSessionToken(ENV.ownerOpenId, {
        expiresInMs: 7 * 24 * 60 * 60 * 1000,
        name: ENV.ownerName,
      });
      const opts = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, token, { ...opts, maxAge: 7 * 24 * 60 * 60 * 1000 });
      return { success: true };
    }),

  // ── PUBLIC — published custom pages for nav ──
  getNavPages: publicProcedure.query(async () => {
    return getAllStudioPages().then(pages =>
      pages.filter(p => p.isPublished && p.navCategory)
        .map(p => ({ slug: p.slug, label: p.label, path: p.path, navCategory: p.navCategory! }))
    );
  }),

  // ── PUBLIC — live pages fetch their blocks ──
  getPublicBlocks: publicProcedure
    .input(z.object({ pageSlug: z.string() }))
    .query(async ({ input }) => {
      return getBlocksByPage(input.pageSlug);
    }),

  // ── PAGE LIST ──────────────────────────────
  getPageList: adminProcedure.query(async () => {
    return SITE_PAGES;
  }),

  // ── PAGE STATUS (block counts for Site Map + Status Board) ────────────────
  getPageStatus: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return SITE_PAGES.map(p => ({ ...p, blockCount: 0, status: 'grey' as const }));
    const rows = await db
      .select({ pageSlug: contentBlocks.pageSlug, count: sql<number>`count(*)` })
      .from(contentBlocks)
      .groupBy(contentBlocks.pageSlug);
    const countMap = new Map(rows.map(r => [r.pageSlug, Number(r.count)]));
    return SITE_PAGES.map(p => {
      const blockCount = countMap.get(p.slug) ?? 0;
      const status: 'green' | 'yellow' | 'grey' =
        blockCount >= 3 ? 'green' : blockCount > 0 ? 'yellow' : 'grey';
      return { ...p, blockCount, status };
    });
  }),

  // ── CONTENT BLOCKS ────────────────────────
  getBlocks: adminProcedure
    .input(z.object({ pageSlug: z.string() }))
    .query(async ({ input }) => {
      return getBlocksByPage(input.pageSlug);
    }),

  createBlock: adminProcedure
    .input(
      z.object({
        pageSlug: z.string(),
        blockType: z.enum(["text", "card", "doc", "image"]),
        position: z.number().int().min(0).default(0),
        content: z.string(), // JSON string
      })
    )
    .mutation(async ({ input }) => {
      await createBlock({
        pageSlug: input.pageSlug,
        blockType: input.blockType,
        position: input.position,
        content: input.content,
      });
      return { success: true };
    }),

  updateBlock: adminProcedure
    .input(
      z.object({
        id: z.number().int(),
        content: z.string().optional(),
        position: z.number().int().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateBlock(id, data);
      return { success: true };
    }),

  deleteBlock: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      await deleteBlock(input.id);
      return { success: true };
    }),

  reorderBlocks: adminProcedure
    .input(
      z.object({
        pageSlug: z.string(),
        orderedIds: z.array(z.number().int()),
      })
    )
    .mutation(async ({ input }) => {
      await reorderBlocks(input.pageSlug, input.orderedIds);
      return { success: true };
    }),

  mirrorBlock: adminProcedure
    .input(
      z.object({
        sourceId: z.number().int(),
        targetPageSlug: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await mirrorBlock(input.sourceId, input.targetPageSlug);
      return { success: true };
    }),

  // ── MEDIA LIBRARY ─────────────────────────
  getMedia: adminProcedure.query(async () => {
    return getAllMedia();
  }),

  uploadMedia: adminProcedure
    .input(
      z.object({
        filename: z.string(),
        mimeType: z.string(),
        mediaType: z.enum(["image", "doc"]),
        dataBase64: z.string(), // base64 encoded file data
        fileSize: z.number().int().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Decode base64 to buffer
      const buffer = Buffer.from(input.dataBase64, "base64");

      // Generate unique key
      const suffix = Date.now().toString(36);
      const safeName = input.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
      const fileKey = `studio-media/${suffix}-${safeName}`;

      // Upload to S3
      const { url } = await storagePut(fileKey, buffer, input.mimeType);

      // Save to DB
      await createMediaItem({
        filename: input.filename,
        url,
        fileKey,
        mimeType: input.mimeType,
        mediaType: input.mediaType,
        fileSize: input.fileSize,
      });

      return { url, fileKey };
    }),

  deleteMedia: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      await deleteMediaItem(input.id);
      return { success: true };
    }),

  // ── PAGE LINKS ────────────────────────────
  getAllLinks: adminProcedure.query(async () => {
    return getAllLinks();
  }),

  getLinksByPage: adminProcedure
    .input(z.object({ pageSlug: z.string() }))
    .query(async ({ input }) => {
      return getLinksByPage(input.pageSlug);
    }),

  createLink: adminProcedure
    .input(
      z.object({
        pageSlug: z.string(),
        label: z.string(),
        destination: z.string(),
        position: z.number().int().min(0).default(0),
      })
    )
    .mutation(async ({ input }) => {
      await createLink(input);
      return { success: true };
    }),

  updateLink: adminProcedure
    .input(
      z.object({
        id: z.number().int(),
        label: z.string().optional(),
        destination: z.string().optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateLink(id, data);
      return { success: true };
    }),

  deleteLink: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      await deleteLink(input.id);
      return { success: true };
    }),

  // ── PAGE BUILDER ─────────────────────────
  getStudioPages: adminProcedure.query(async () => {
    return getAllStudioPages();
  }),
  createStudioPage: adminProcedure
    .input(
      z.object({
        slug: z.string().min(1).max(128),
        label: z.string().min(1).max(255),
        path: z.string().min(1).max(255),
        template: z.enum(["blank", "article", "lens", "card-grid"]).default("blank"),
        navCategory: z.string().max(64).optional(),
        isPublished: z.boolean().default(false),
      })
    )
    .mutation(async ({ input }) => {
      await createStudioPage(input);
      return { success: true };
    }),
  updateStudioPage: adminProcedure
    .input(
      z.object({
        id: z.number().int(),
        label: z.string().min(1).max(255).optional(),
        navCategory: z.string().max(64).nullable().optional(),
        isPublished: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateStudioPage(id, data);
      return { success: true };
    }),
  deleteStudioPage: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      await deleteStudioPage(input.id);
      return { success: true };
    }),

  // ─────────────────────────────────────────────
  // LEARNING FLOW
  // ─────────────────────────────────────────────

  getLearningFlow: adminProcedure.query(async () => {
    return getAllLearningFlow();
  }),

  upsertLearningFlow: adminProcedure
    .input(
      z.object({
        pageSlug: z.string().min(1).max(128),
        deeperSlug: z.string().max(128).nullable().optional(),
        widerSlug: z.string().max(128).nullable().optional(),
        simplerSlug: z.string().max(128).nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { pageSlug, ...data } = input;
      await upsertLearningFlow(pageSlug, data);
      return { success: true };
    }),
});
