/*
 * GALLANTRYAI — Studio Nav & Footer Manager
 * ─────────────────────────────────────────────────────────────
 * Build 2B: Full management UI for nav and footer links.
 * Preview-before-publish: changes are DRAFT until you tap Publish.
 * Mobile-first. Large tap targets. No hover-only interactions.
 *
 * Sections: Lenses | Foundation | For You | Tools | Research | Explore
 * Each item: label, path, colour, section, position, isFooter, isPublished
 * ─────────────────────────────────────────────────────────────
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type NavSection = "lenses" | "foundation" | "for-you" | "tools" | "research" | "explore";

const SECTION_LABELS: Record<NavSection, string> = {
  lenses: "Enter Your Lens",
  foundation: "Foundation",
  "for-you": "For You",
  tools: "Tools",
  research: "Research",
  explore: "Explore",
};

const SECTION_COLOURS: Record<NavSection, string> = {
  lenses: "#E8520A",
  foundation: "#D4722A",
  "for-you": "#7C3AED",
  tools: "#0891B2",
  research: "#059669",
  explore: "#D97706",
};

const ALL_SECTIONS: NavSection[] = ["lenses", "foundation", "for-you", "tools", "research", "explore"];

interface NavItem {
  id: number;
  section: NavSection;
  label: string;
  path: string;
  colour: string | null;
  position: number;
  isPublished: boolean;
  isFooter: boolean;
}

interface EditState {
  id: number;
  label: string;
  path: string;
  colour: string;
  section: NavSection;
  isFooter: boolean;
}

interface AddState {
  section: NavSection;
  label: string;
  path: string;
  colour: string;
  isFooter: boolean;
}

export default function StudioNavManager() {
  const utils = trpc.useUtils();

  const { data: navItems, isLoading } = trpc.studio.getNavItems.useQuery();

  const [editItem, setEditItem] = useState<EditState | null>(null);
  const [addSection, setAddSection] = useState<NavSection | null>(null);
  const [addForm, setAddForm] = useState<AddState | null>(null);
  const [expandedSection, setExpandedSection] = useState<NavSection | null>("foundation");
  const [publishConfirm, setPublishConfirm] = useState(false);

  const updateMutation = trpc.studio.updateNavItem.useMutation({
    onSuccess: () => {
      utils.studio.getNavItems.invalidate();
      utils.studio.getPublishedNavItems.invalidate();
      setEditItem(null);
      toast.success("Item updated. Tap Publish to make it live.");
    },
    onError: (e) => toast.error("Update failed: " + e.message),
  });

  const addMutation = trpc.studio.addNavItem.useMutation({
    onSuccess: () => {
      utils.studio.getNavItems.invalidate();
      setAddSection(null);
      setAddForm(null);
      toast.success("Item added as draft. Tap Publish to make it live.");
    },
    onError: (e) => toast.error("Add failed: " + e.message),
  });

  const removeMutation = trpc.studio.removeNavItem.useMutation({
    onSuccess: () => {
      utils.studio.getNavItems.invalidate();
      utils.studio.getPublishedNavItems.invalidate();
      toast.success("Item removed.");
    },
    onError: (e) => toast.error("Remove failed: " + e.message),
  });

  const publishMutation = trpc.studio.publishNav.useMutation({
    onSuccess: () => {
      utils.studio.getNavItems.invalidate();
      utils.studio.getPublishedNavItems.invalidate();
      setPublishConfirm(false);
      toast.success("Nav & Footer published. Changes are now live on the site.");
    },
    onError: (e) => toast.error("Publish failed: " + e.message),
  });

  function startEdit(item: NavItem) {
    setEditItem({
      id: item.id,
      label: item.label,
      path: item.path,
      colour: item.colour ?? "",
      section: item.section,
      isFooter: item.isFooter,
    });
  }

  function saveEdit() {
    if (!editItem) return;
    updateMutation.mutate({
      id: editItem.id,
      label: editItem.label,
      path: editItem.path,
      colour: editItem.colour || null,
      section: editItem.section,
      isFooter: editItem.isFooter,
    });
  }

  function startAdd(section: NavSection) {
    setAddSection(section);
    setAddForm({ section, label: "", path: "/", colour: "", isFooter: true });
  }

  function saveAdd() {
    if (!addForm || !addForm.label || !addForm.path) return;
    addMutation.mutate({
      section: addForm.section,
      label: addForm.label,
      path: addForm.path,
      colour: addForm.colour || null,
      isFooter: addForm.isFooter,
    });
  }

  function confirmRemove(id: number, label: string) {
    if (window.confirm(`Remove "${label}" from the nav? This cannot be undone.`)) {
      removeMutation.mutate({ id });
    }
  }

  function getSection(section: NavSection): NavItem[] {
    if (!navItems) return [];
    return (navItems as NavItem[])
      .filter((i) => i.section === section)
      .sort((a, b) => a.position - b.position);
  }

  const hasDrafts = navItems?.some((i: NavItem) => !i.isPublished);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-[#c8b89a] text-sm">Loading nav items...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-16">

      {/* ── PUBLISH BANNER ── */}
      <div className="rounded-xl border border-[#2a1f14] bg-[#120c06] p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-sm font-bold text-[#E8520A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Nav & Footer Manager
            </div>
            <div className="text-xs text-[#8a7a6a] mt-0.5">
              {hasDrafts
                ? "You have unpublished changes. Tap Publish to make them live."
                : "All changes are live. Edit below to create new drafts."}
            </div>
          </div>
          {!publishConfirm ? (
            <button
              onClick={() => setPublishConfirm(true)}
              className="shrink-0 px-5 py-2.5 rounded-lg text-sm font-bold transition-all"
              style={{ background: '#E8520A', color: '#fff' }}
            >
              Publish Nav & Footer
            </button>
          ) : (
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => publishMutation.mutate()}
                disabled={publishMutation.isPending}
                className="px-4 py-2 rounded-lg text-sm font-bold"
                style={{ background: '#E8520A', color: '#fff' }}
              >
                {publishMutation.isPending ? "Publishing..." : "Confirm Publish"}
              </button>
              <button
                onClick={() => setPublishConfirm(false)}
                className="px-4 py-2 rounded-lg text-sm border border-[#3a2a1a] text-[#c8b89a]"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="mt-3 text-[10px] text-[#5a4a3a] leading-relaxed">
          Changes you make here are saved as drafts. Nothing changes on the live site until you tap Publish.
          After publishing, visitors will see the updated nav and footer immediately.
        </div>
      </div>

      {/* ── SECTION PANELS ── */}
      {ALL_SECTIONS.map((section) => {
        const items = getSection(section);
        const isExpanded = expandedSection === section;
        const accentColor = SECTION_COLOURS[section];

        return (
          <div key={section} className="rounded-xl border border-[#2a1f14] overflow-hidden">

            {/* Section header — tap to expand/collapse */}
            <button
              onClick={() => setExpandedSection(isExpanded ? null : section)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
              style={{ background: '#0e0905' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
                <span className="text-sm font-semibold text-[#e8e0d0]">{SECTION_LABELS[section]}</span>
                <span className="text-xs text-[#5a4a3a]">({items.length})</span>
              </div>
              <span className="text-[#5a4a3a] text-xs">{isExpanded ? "▲" : "▼"}</span>
            </button>

            {isExpanded && (
              <div className="bg-[#0a0704]">

                {/* Item list */}
                <div className="divide-y divide-[#1a1208]">
                  {items.length === 0 && (
                    <div className="px-4 py-3 text-xs text-[#5a4a3a] italic">No items in this section.</div>
                  )}
                  {items.map((item) => {
                    const isEditing = editItem?.id === item.id;

                    if (isEditing) {
                      return (
                        <div key={item.id} className="p-4 bg-[#120c06] space-y-3">
                          {/* Edit form */}
                          <div className="text-xs font-semibold text-[#E8520A] mb-2">Editing item</div>

                          <div className="space-y-2">
                            <label className="block text-[10px] uppercase tracking-widest text-[#5a4a3a]">Label</label>
                            <input
                              type="text"
                              value={editItem.label}
                              onChange={(e) => setEditItem({ ...editItem, label: e.target.value })}
                              className="w-full bg-[#1a1208] border border-[#3a2a1a] rounded-lg px-3 py-2 text-sm text-[#e8e0d0] focus:outline-none focus:border-[#E8520A]"
                              placeholder="Link label"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-[10px] uppercase tracking-widest text-[#5a4a3a]">Path</label>
                            <input
                              type="text"
                              value={editItem.path}
                              onChange={(e) => setEditItem({ ...editItem, path: e.target.value })}
                              className="w-full bg-[#1a1208] border border-[#3a2a1a] rounded-lg px-3 py-2 text-sm text-[#e8e0d0] focus:outline-none focus:border-[#E8520A] font-mono"
                              placeholder="/path-to-page"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-[10px] uppercase tracking-widest text-[#5a4a3a]">Colour (optional)</label>
                            <input
                              type="text"
                              value={editItem.colour}
                              onChange={(e) => setEditItem({ ...editItem, colour: e.target.value })}
                              className="w-full bg-[#1a1208] border border-[#3a2a1a] rounded-lg px-3 py-2 text-sm text-[#e8e0d0] focus:outline-none focus:border-[#E8520A] font-mono"
                              placeholder="#E8520A or text-sky-500"
                            />
                            <div className="text-[10px] text-[#5a4a3a]">Leave blank for default. Use hex (#E8520A) or Tailwind class (text-sky-500).</div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-[10px] uppercase tracking-widest text-[#5a4a3a]">Section</label>
                            <select
                              value={editItem.section}
                              onChange={(e) => setEditItem({ ...editItem, section: e.target.value as NavSection })}
                              className="w-full bg-[#1a1208] border border-[#3a2a1a] rounded-lg px-3 py-2 text-sm text-[#e8e0d0] focus:outline-none focus:border-[#E8520A]"
                            >
                              {ALL_SECTIONS.map((s) => (
                                <option key={s} value={s}>{SECTION_LABELS[s]}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={editItem.isFooter}
                                onChange={(e) => setEditItem({ ...editItem, isFooter: e.target.checked })}
                                className="w-4 h-4 accent-[#E8520A]"
                              />
                              <span className="text-xs text-[#c8b89a]">Show in footer</span>
                            </label>
                          </div>

                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={saveEdit}
                              disabled={updateMutation.isPending}
                              className="flex-1 py-2.5 rounded-lg text-sm font-bold"
                              style={{ background: '#E8520A', color: '#fff' }}
                            >
                              {updateMutation.isPending ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                              onClick={() => setEditItem(null)}
                              className="px-4 py-2.5 rounded-lg text-sm border border-[#3a2a1a] text-[#c8b89a]"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                        {/* Status dot */}
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: item.isPublished ? '#22c55e' : '#f59e0b' }}
                          title={item.isPublished ? "Live" : "Draft"}
                        />

                        {/* Item info */}
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-sm font-medium truncate"
                            style={{ color: item.colour && item.colour.startsWith('#') ? item.colour : '#e8e0d0' }}
                          >
                            {item.label}
                          </div>
                          <div className="text-[10px] text-[#5a4a3a] font-mono truncate">{item.path}</div>
                          <div className="flex gap-2 mt-0.5">
                            {!item.isPublished && (
                              <span className="text-[9px] bg-amber-900/40 text-amber-400 px-1.5 py-0.5 rounded">DRAFT</span>
                            )}
                            {item.isFooter && (
                              <span className="text-[9px] bg-[#1a1208] text-[#5a4a3a] px-1.5 py-0.5 rounded">footer</span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1 shrink-0">
                          <button
                            onClick={() => startEdit(item)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#c8b89a] hover:text-[#E8520A] transition-colors"
                            style={{ background: '#1a1208' }}
                            title="Edit"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => confirmRemove(item.id, item.label)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5a4a3a] hover:text-rose-500 transition-colors"
                            style={{ background: '#1a1208' }}
                            title="Remove"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add item form */}
                {addSection === section && addForm ? (
                  <div className="p-4 border-t border-[#1a1208] bg-[#120c06] space-y-3">
                    <div className="text-xs font-semibold text-[#E8520A]">New item in {SECTION_LABELS[section]}</div>

                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-[#5a4a3a]">Label</label>
                      <input
                        type="text"
                        value={addForm.label}
                        onChange={(e) => setAddForm({ ...addForm, label: e.target.value })}
                        className="w-full bg-[#1a1208] border border-[#3a2a1a] rounded-lg px-3 py-2 text-sm text-[#e8e0d0] focus:outline-none focus:border-[#E8520A]"
                        placeholder="Link label"
                        autoFocus
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-[#5a4a3a]">Path</label>
                      <input
                        type="text"
                        value={addForm.path}
                        onChange={(e) => setAddForm({ ...addForm, path: e.target.value })}
                        className="w-full bg-[#1a1208] border border-[#3a2a1a] rounded-lg px-3 py-2 text-sm text-[#e8e0d0] focus:outline-none focus:border-[#E8520A] font-mono"
                        placeholder="/path-to-page"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-[#5a4a3a]">Colour (optional)</label>
                      <input
                        type="text"
                        value={addForm.colour}
                        onChange={(e) => setAddForm({ ...addForm, colour: e.target.value })}
                        className="w-full bg-[#1a1208] border border-[#3a2a1a] rounded-lg px-3 py-2 text-sm text-[#e8e0d0] focus:outline-none focus:border-[#E8520A] font-mono"
                        placeholder="#E8520A or text-sky-500"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={addForm.isFooter}
                          onChange={(e) => setAddForm({ ...addForm, isFooter: e.target.checked })}
                          className="w-4 h-4 accent-[#E8520A]"
                        />
                        <span className="text-xs text-[#c8b89a]">Show in footer</span>
                      </label>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={saveAdd}
                        disabled={addMutation.isPending || !addForm.label || !addForm.path}
                        className="flex-1 py-2.5 rounded-lg text-sm font-bold disabled:opacity-50"
                        style={{ background: '#E8520A', color: '#fff' }}
                      >
                        {addMutation.isPending ? "Adding..." : "Add as Draft"}
                      </button>
                      <button
                        onClick={() => { setAddSection(null); setAddForm(null); }}
                        className="px-4 py-2.5 rounded-lg text-sm border border-[#3a2a1a] text-[#c8b89a]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-3 border-t border-[#1a1208]">
                    <button
                      onClick={() => startAdd(section)}
                      className="w-full py-2 rounded-lg text-xs text-[#E8520A] border border-dashed border-[#E8520A]/30 hover:border-[#E8520A]/60 transition-colors"
                    >
                      + Add item to {SECTION_LABELS[section]}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* ── LEGEND ── */}
      <div className="rounded-xl border border-[#1a1208] bg-[#0a0704] p-4">
        <div className="text-[10px] uppercase tracking-widest text-[#5a4a3a] mb-2">Legend</div>
        <div className="flex flex-wrap gap-4 text-xs text-[#5a4a3a]">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Live on site</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Draft — not live yet</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="bg-[#1a1208] text-[#5a4a3a] px-1.5 py-0.5 rounded text-[9px]">footer</span>
            <span>Also in footer</span>
          </div>
        </div>
      </div>

    </div>
  );
}
