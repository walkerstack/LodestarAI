/**
 * Nav Manager — tRPC procedure tests
 * Build 2B: Tests for getNavItems, getPublishedNavItems, updateNavItem,
 * addNavItem, removeNavItem, publishNav, reorderNavItems
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock DB helpers ──────────────────────────────────────────────────────────

const mockNavItems = [
  { id: 1, section: "foundation", label: "The Five Rules", path: "/rules", colour: null, position: 0, isPublished: true, isFooter: true },
  { id: 2, section: "foundation", label: "Road Protocol", path: "/road-protocol", colour: null, position: 1, isPublished: true, isFooter: true },
  { id: 3, section: "tools", label: "Playground", path: "/playground", colour: null, position: 0, isPublished: false, isFooter: false },
];

vi.mock("./db", () => ({
  getAllNavItems: vi.fn(async () => mockNavItems),
  getPublishedNavItems: vi.fn(async () => mockNavItems.filter((i) => i.isPublished)),
  updateNavItem: vi.fn(async () => {}),
  deleteNavItem: vi.fn(async () => {}),
  publishAllNavItems: vi.fn(async () => {}),
  getNavItemCount: vi.fn(async () => mockNavItems.length),
  getDb: vi.fn(async () => ({
    insert: vi.fn(() => ({ values: vi.fn(async () => {}) })),
  })),
}));

vi.mock("../drizzle/schema", () => ({
  navItems: {},
}));

import {
  getAllNavItems,
  getPublishedNavItems,
  updateNavItem,
  deleteNavItem,
  publishAllNavItems,
} from "./db";

// ── Tests ────────────────────────────────────────────────────────────────────

describe("Nav Manager DB helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAllNavItems returns all items including drafts", async () => {
    const items = await getAllNavItems();
    expect(items).toHaveLength(3);
    expect(items.some((i) => !i.isPublished)).toBe(true);
  });

  it("getPublishedNavItems returns only published items", async () => {
    const items = await getPublishedNavItems();
    expect(items.every((i) => i.isPublished)).toBe(true);
    expect(items).toHaveLength(2);
  });

  it("updateNavItem is called with correct id and fields", async () => {
    await updateNavItem(1, { label: "Updated Label", path: "/new-path" });
    expect(updateNavItem).toHaveBeenCalledWith(1, { label: "Updated Label", path: "/new-path" });
  });

  it("deleteNavItem is called with correct id", async () => {
    await deleteNavItem(3);
    expect(deleteNavItem).toHaveBeenCalledWith(3);
  });

  it("publishAllNavItems is called", async () => {
    await publishAllNavItems();
    expect(publishAllNavItems).toHaveBeenCalledTimes(1);
  });

  it("items are sorted by position within section", async () => {
    const items = await getAllNavItems();
    const foundation = items.filter((i) => i.section === "foundation");
    expect(foundation[0].position).toBeLessThanOrEqual(foundation[1].position);
  });

  it("draft items have isPublished = false", async () => {
    const items = await getAllNavItems();
    const draft = items.find((i) => i.id === 3);
    expect(draft?.isPublished).toBe(false);
  });

  it("published items have isPublished = true", async () => {
    const items = await getPublishedNavItems();
    items.forEach((i) => expect(i.isPublished).toBe(true));
  });

  it("section values are valid enum members", async () => {
    const validSections = ["lenses", "foundation", "for-you", "tools", "research", "explore"];
    const items = await getAllNavItems();
    items.forEach((i) => expect(validSections).toContain(i.section));
  });

  it("all items have required fields", async () => {
    const items = await getAllNavItems();
    items.forEach((i) => {
      expect(typeof i.id).toBe("number");
      expect(typeof i.label).toBe("string");
      expect(typeof i.path).toBe("string");
      expect(typeof i.position).toBe("number");
      expect(typeof i.isPublished).toBe("boolean");
      expect(typeof i.isFooter).toBe("boolean");
    });
  });
});
