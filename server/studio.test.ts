/**
 * Studio router tests.
 * Tests the core Studio tRPC procedures using the admin context.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import type { TrpcContext } from "./_core/context";

// Mock the studioDb module
vi.mock("./studioDb", () => ({
  getBlocksByPage: vi.fn().mockResolvedValue([]),
  getAllPageSlugs: vi.fn().mockResolvedValue([]),
  createBlock: vi.fn().mockResolvedValue(undefined),
  updateBlock: vi.fn().mockResolvedValue(undefined),
  deleteBlock: vi.fn().mockResolvedValue(undefined),
  reorderBlocks: vi.fn().mockResolvedValue(undefined),
  mirrorBlock: vi.fn().mockResolvedValue(undefined),
  getAllMedia: vi.fn().mockResolvedValue([]),
  createMediaItem: vi.fn().mockResolvedValue(undefined),
  deleteMediaItem: vi.fn().mockResolvedValue(undefined),
  getLinksByPage: vi.fn().mockResolvedValue([]),
  getAllLinks: vi.fn().mockResolvedValue([]),
  createLink: vi.fn().mockResolvedValue(undefined),
  updateLink: vi.fn().mockResolvedValue(undefined),
  deleteLink: vi.fn().mockResolvedValue(undefined),
}));

// Mock storage
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ key: "test-key", url: "https://cdn.example.com/test.jpg" }),
}));

import * as studioDb from "./studioDb";
import { appRouter } from "./routers";

type AdminUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AdminUser = {
    id: 1,
    openId: "test-admin",
    name: "Matthew",
    email: null,
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Studio Router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    vi.clearAllMocks();
    caller = appRouter.createCaller(createAdminContext());
  });

  describe("studio.getPageList", () => {
    it("returns the full site page list", async () => {
      const pages = await caller.studio.getPageList();
      expect(Array.isArray(pages)).toBe(true);
      expect(pages.length).toBeGreaterThan(0);
    });

    it("includes all required fields", async () => {
      const pages = await caller.studio.getPageList();
      const first = pages[0];
      expect(first).toHaveProperty("slug");
      expect(first).toHaveProperty("label");
      expect(first).toHaveProperty("path");
    });

    it("includes the home page", async () => {
      const pages = await caller.studio.getPageList();
      const homePage = pages.find((p) => p.slug === "home");
      expect(homePage).toBeDefined();
      expect(homePage?.path).toBe("/");
    });
  });

  describe("studio.getBlocks", () => {
    it("calls getBlocksByPage with the correct slug", async () => {
      await caller.studio.getBlocks({ pageSlug: "rules" });
      expect(studioDb.getBlocksByPage).toHaveBeenCalledWith("rules");
    });

    it("returns empty array when no blocks exist", async () => {
      const blocks = await caller.studio.getBlocks({ pageSlug: "rules" });
      expect(blocks).toEqual([]);
    });
  });

  describe("studio.createBlock", () => {
    it("creates a text block with valid content", async () => {
      const content = JSON.stringify({ heading: "Test", body: "Body text", font: "dmsans", size: "medium" });
      const result = await caller.studio.createBlock({ pageSlug: "rules", blockType: "text", position: 0, content });
      expect(result.success).toBe(true);
      expect(studioDb.createBlock).toHaveBeenCalledWith(
        expect.objectContaining({ pageSlug: "rules", blockType: "text" })
      );
    });

    it("creates a card block", async () => {
      const content = JSON.stringify({ title: "Card Title", description: "Desc", linkLabel: "Read", linkUrl: "/rules" });
      const result = await caller.studio.createBlock({ pageSlug: "home", blockType: "card", position: 1, content });
      expect(result.success).toBe(true);
    });
  });

  describe("studio.updateBlock", () => {
    it("updates block content", async () => {
      const content = JSON.stringify({ body: "Updated text" });
      const result = await caller.studio.updateBlock({ id: 1, content });
      expect(result.success).toBe(true);
      expect(studioDb.updateBlock).toHaveBeenCalledWith(1, expect.objectContaining({ content }));
    });
  });

  describe("studio.deleteBlock", () => {
    it("deletes a block by id", async () => {
      const result = await caller.studio.deleteBlock({ id: 5 });
      expect(result.success).toBe(true);
      expect(studioDb.deleteBlock).toHaveBeenCalledWith(5);
    });
  });

  describe("studio.reorderBlocks", () => {
    it("reorders blocks with ordered ids", async () => {
      const result = await caller.studio.reorderBlocks({ pageSlug: "rules", orderedIds: [3, 1, 2] });
      expect(result.success).toBe(true);
      expect(studioDb.reorderBlocks).toHaveBeenCalledWith("rules", [3, 1, 2]);
    });
  });

  describe("studio.getMedia", () => {
    it("returns media items array", async () => {
      const media = await caller.studio.getMedia();
      expect(Array.isArray(media)).toBe(true);
    });
  });

  describe("studio.getAllLinks", () => {
    it("returns all links array", async () => {
      const links = await caller.studio.getAllLinks();
      expect(Array.isArray(links)).toBe(true);
    });
  });

  describe("studio.createLink", () => {
    it("creates a link for a page", async () => {
      const result = await caller.studio.createLink({
        pageSlug: "rules",
        label: "Road Protocol",
        destination: "/road-protocol",
        position: 0,
      });
      expect(result.success).toBe(true);
      expect(studioDb.createLink).toHaveBeenCalledWith(
        expect.objectContaining({ pageSlug: "rules", label: "Road Protocol" })
      );
    });
  });

  describe("studio.updateLink", () => {
    it("updates a link destination", async () => {
      const result = await caller.studio.updateLink({ id: 1, destination: "/new-destination" });
      expect(result.success).toBe(true);
      expect(studioDb.updateLink).toHaveBeenCalledWith(1, expect.objectContaining({ destination: "/new-destination" }));
    });
  });

  describe("studio.deleteLink", () => {
    it("deletes a link by id", async () => {
      const result = await caller.studio.deleteLink({ id: 2 });
      expect(result.success).toBe(true);
      expect(studioDb.deleteLink).toHaveBeenCalledWith(2);
    });
  });
});
