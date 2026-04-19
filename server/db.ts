import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, navItems, InsertNavItem, NavItem } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─────────────────────────────────────────────────────────────
// NAV ITEMS — DB helpers for Nav.tsx, Footer.tsx, and Studio Nav Manager
// ─────────────────────────────────────────────────────────────

/**
 * Returns all published nav items, grouped by section.
 * Used by Nav.tsx and Footer.tsx on the live site.
 */
export async function getPublishedNavItems(): Promise<NavItem[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(navItems).where(eq(navItems.isPublished, true));
  } catch (error) {
    console.error("[Database] Failed to get published nav items:", error);
    return [];
  }
}

/**
 * Returns ALL nav items (published + draft).
 * Used by Studio Nav Manager to show the full working set.
 */
export async function getAllNavItems(): Promise<NavItem[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(navItems);
  } catch (error) {
    console.error("[Database] Failed to get all nav items:", error);
    return [];
  }
}

/**
 * Upserts a single nav item.
 * Used by Studio to create or update an item.
 */
export async function upsertNavItem(item: InsertNavItem): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(navItems).values(item).onDuplicateKeyUpdate({
      set: {
        label: item.label,
        path: item.path,
        colour: item.colour ?? null,
        position: item.position,
        isPublished: item.isPublished,
        isFooter: item.isFooter,
      },
    });
  } catch (error) {
    console.error("[Database] Failed to upsert nav item:", error);
    throw error;
  }
}

/**
 * Updates a single nav item by id.
 */
export async function updateNavItem(
  id: number,
  updates: Partial<Pick<NavItem, "label" | "path" | "colour" | "position" | "isPublished" | "isFooter" | "section">>
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(navItems).set(updates).where(eq(navItems.id, id));
  } catch (error) {
    console.error("[Database] Failed to update nav item:", error);
    throw error;
  }
}

/**
 * Deletes a nav item by id.
 */
export async function deleteNavItem(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.delete(navItems).where(eq(navItems.id, id));
  } catch (error) {
    console.error("[Database] Failed to delete nav item:", error);
    throw error;
  }
}

/**
 * Publishes all current nav items (sets isPublished = true for all).
 * Called when Matthew taps Publish in Studio.
 */
export async function publishAllNavItems(): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(navItems).set({ isPublished: true });
  } catch (error) {
    console.error("[Database] Failed to publish nav items:", error);
    throw error;
  }
}

/**
 * Returns the count of nav items in the database.
 * Used to check if seeding is needed.
 */
export async function getNavItemCount(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  try {
    const result = await db.select().from(navItems);
    return result.length;
  } catch (error) {
    console.error("[Database] Failed to count nav items:", error);
    return 0;
  }
}
