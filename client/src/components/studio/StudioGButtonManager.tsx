/**
 * StudioGButtonManager.tsx
 * Studio tab for managing the G Button (PromptPanel) prompts.
 * Owner can add, edit, toggle active, and delete any prompt in any category.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";

const CATEGORY_OPTIONS = [
  { id: "power",    label: "Power Prompts",    color: "#E8520A", bg: "#1a0e08" },
  { id: "session",  label: "Session Tools",    color: "#D4722A", bg: "#160e06" },
  { id: "flower",   label: "Flower Presets",   color: "#2980B9", bg: "#06101a" },
  { id: "kids",     label: "Kids Prompts",     color: "#059669", bg: "#061410" },
  { id: "language", label: "Language Physics", color: "#7C3AED", bg: "#0e0814" },
];

const EMPTY_FORM = {
  categoryId: "power",
  categoryLabel: "Power Prompts",
  categoryColor: "#E8520A",
  categoryBgColor: "#1a0e08",
  title: "",
  description: "",
  promptText: "",
  link: "",
  linkLabel: "",
  position: 0,
  isActive: true,
};

type FormState = typeof EMPTY_FORM;

export default function StudioGButtonManager() {
  const utils = trpc.useUtils();
  const { data: items, isLoading } = trpc.studio.getPromptPanelItems.useQuery();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [filterCat, setFilterCat] = useState("all");

  const createMutation = trpc.studio.createPromptPanelItem.useMutation({
    onSuccess: () => { utils.studio.getPromptPanelItems.invalidate(); setShowAdd(false); setForm(EMPTY_FORM); },
  });
  const updateMutation = trpc.studio.updatePromptPanelItem.useMutation({
    onSuccess: () => { utils.studio.getPromptPanelItems.invalidate(); setEditingId(null); },
  });
  const deleteMutation = trpc.studio.deletePromptPanelItem.useMutation({
    onSuccess: () => utils.studio.getPromptPanelItems.invalidate(),
  });

  function handleCategoryChange(catId: string, target: FormState, setter: (f: FormState) => void) {
    const cat = CATEGORY_OPTIONS.find(c => c.id === catId);
    if (cat) {
      setter({ ...target, categoryId: cat.id, categoryLabel: cat.label, categoryColor: cat.color, categoryBgColor: cat.bg });
    }
  }

  function startEdit(item: NonNullable<typeof items>[0]) {
    setEditingId(item.id);
    setForm({
      categoryId: item.categoryId,
      categoryLabel: item.categoryLabel,
      categoryColor: item.categoryColor,
      categoryBgColor: item.categoryBgColor,
      title: item.title,
      description: item.description ?? "",
      promptText: item.promptText,
      link: item.link ?? "",
      linkLabel: item.linkLabel ?? "",
      position: item.position,
      isActive: item.isActive,
    });
    setShowAdd(false);
  }

  function handleSaveEdit() {
    if (!editingId) return;
    updateMutation.mutate({
      id: editingId,
      ...form,
      description: form.description || null,
      link: form.link || null,
      linkLabel: form.linkLabel || null,
    });
  }

  function handleCreate() {
    createMutation.mutate({
      ...form,
      description: form.description || null,
      link: form.link || null,
      linkLabel: form.linkLabel || null,
    });
  }

  const filtered = (items ?? []).filter(i => filterCat === "all" || i.categoryId === filterCat);

  const catColor = (catId: string) => CATEGORY_OPTIONS.find(c => c.id === catId)?.color ?? "#E8520A";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#f5ede0", fontFamily: "'Playfair Display', serif" }}>
            G Button Manager
          </h2>
          <p className="text-xs mt-1" style={{ color: "#8a7a6a" }}>
            {items?.length ?? 0} prompts across {CATEGORY_OPTIONS.length} categories. Changes go live immediately.
          </p>
        </div>
        <button
          onClick={() => { setShowAdd(true); setEditingId(null); setForm(EMPTY_FORM); }}
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{ background: "#E8520A", color: "#fff" }}
        >
          + Add Prompt
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-5">
        {["all", ...CATEGORY_OPTIONS.map(c => c.id)].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all"
            style={{
              background: filterCat === cat ? (catColor(cat) || "#E8520A") : "#1a1510",
              color: filterCat === cat ? "#fff" : "#8a7a6a",
              border: `1px solid ${filterCat === cat ? (catColor(cat) || "#E8520A") : "#2a2218"}`,
            }}
          >
            {cat === "all" ? "All" : CATEGORY_OPTIONS.find(c => c.id === cat)?.label ?? cat}
          </button>
        ))}
      </div>

      {/* Add form */}
      {showAdd && (
        <PromptForm
          form={form}
          setForm={setForm}
          onCategoryChange={(id) => handleCategoryChange(id, form, setForm)}
          onSave={handleCreate}
          onCancel={() => setShowAdd(false)}
          isSaving={createMutation.isPending}
          title="Add New Prompt"
        />
      )}

      {/* Items list */}
      {isLoading ? (
        <p style={{ color: "#8a7a6a" }}>Loading...</p>
      ) : (
        <div className="space-y-2">
          {filtered.map(item => (
            <div key={item.id}>
              {editingId === item.id ? (
                <PromptForm
                  form={form}
                  setForm={setForm}
                  onCategoryChange={(id) => handleCategoryChange(id, form, setForm)}
                  onSave={handleSaveEdit}
                  onCancel={() => setEditingId(null)}
                  isSaving={updateMutation.isPending}
                  title="Edit Prompt"
                />
              ) : (
                <div
                  className="rounded-xl p-4 flex items-start justify-between gap-3"
                  style={{
                    background: "#120f0a",
                    border: `1.5px solid ${item.isActive ? catColor(item.categoryId) + "40" : "#2a2218"}`,
                    opacity: item.isActive ? 1 : 0.5,
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: catColor(item.categoryId) + "20", color: catColor(item.categoryId) }}
                      >
                        {item.categoryLabel}
                      </span>
                      {!item.isActive && (
                        <span className="text-[10px] text-[#8a7a6a] italic">hidden</span>
                      )}
                    </div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#f5ede0", fontFamily: "'Playfair Display', serif" }}>
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-xs mb-2" style={{ color: "#8a7a6a" }}>{item.description}</p>
                    )}
                    <pre className="text-[11px] rounded-lg p-2 whitespace-pre-wrap leading-relaxed" style={{ background: "#0a0806", color: "#a89070", border: "1px solid #2a2218", maxHeight: "80px", overflow: "hidden" }}>
                      {item.promptText.slice(0, 200)}{item.promptText.length > 200 ? "…" : ""}
                    </pre>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => startEdit(item)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={{ background: "#1a1510", color: "#E8520A", border: "1px solid #E8520A40" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => updateMutation.mutate({ id: item.id, isActive: !item.isActive })}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={{ background: "#1a1510", color: item.isActive ? "#8a7a6a" : "#059669", border: "1px solid #2a2218" }}
                    >
                      {item.isActive ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={() => { if (confirm(`Delete "${item.title}"?`)) deleteMutation.mutate({ id: item.id }); }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={{ background: "#1a1510", color: "#c0392b", border: "1px solid #c0392b40" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center py-8 text-sm" style={{ color: "#8a7a6a" }}>No prompts in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Shared form component ────────────────────────────────────────────────────
function PromptForm({
  form,
  setForm,
  onCategoryChange,
  onSave,
  onCancel,
  isSaving,
  title,
}: {
  form: FormState;
  setForm: (f: FormState) => void;
  onCategoryChange: (catId: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  title: string;
}) {
  const inputStyle = {
    background: "#0a0806",
    border: "1px solid #2a2218",
    color: "#e8ddd0",
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "13px",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
  };

  return (
    <div className="rounded-xl p-5 mb-4" style={{ background: "#1a1510", border: "1.5px solid #E8520A50" }}>
      <h3 className="text-sm font-bold mb-4" style={{ color: "#E8520A", fontFamily: "'Playfair Display', serif" }}>{title}</h3>
      <div className="space-y-3">
        {/* Category */}
        <div>
          <label className="block text-xs mb-1" style={{ color: "#8a7a6a" }}>Category</label>
          <select
            value={form.categoryId}
            onChange={e => onCategoryChange(e.target.value)}
            style={inputStyle}
          >
            {[
              { id: "power",    label: "Power Prompts" },
              { id: "session",  label: "Session Tools" },
              { id: "flower",   label: "Flower Presets" },
              { id: "kids",     label: "Kids Prompts" },
              { id: "language", label: "Language Physics" },
            ].map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
        {/* Title */}
        <div>
          <label className="block text-xs mb-1" style={{ color: "#8a7a6a" }}>Title *</label>
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. The Habergeon Prompt"
            style={inputStyle}
          />
        </div>
        {/* Description */}
        <div>
          <label className="block text-xs mb-1" style={{ color: "#8a7a6a" }}>Short description</label>
          <input
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="One line explaining what this prompt does"
            style={inputStyle}
          />
        </div>
        {/* Prompt text */}
        <div>
          <label className="block text-xs mb-1" style={{ color: "#8a7a6a" }}>Prompt text *</label>
          <textarea
            value={form.promptText}
            onChange={e => setForm({ ...form, promptText: e.target.value })}
            placeholder="The actual prompt to copy and paste..."
            rows={5}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>
        {/* Link + label */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1" style={{ color: "#8a7a6a" }}>Link (optional)</label>
            <input
              value={form.link}
              onChange={e => setForm({ ...form, link: e.target.value })}
              placeholder="/prompt-games"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: "#8a7a6a" }}>Link label</label>
            <input
              value={form.linkLabel}
              onChange={e => setForm({ ...form, linkLabel: e.target.value })}
              placeholder="See Prompt Games →"
              style={inputStyle}
            />
          </div>
        </div>
        {/* Position + Active */}
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-xs mb-1" style={{ color: "#8a7a6a" }}>Position</label>
            <input
              type="number"
              value={form.position}
              onChange={e => setForm({ ...form, position: parseInt(e.target.value) || 0 })}
              style={{ ...inputStyle, width: "80px" }}
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={e => setForm({ ...form, isActive: e.target.checked })}
            />
            <label htmlFor="isActive" className="text-xs" style={{ color: "#8a7a6a" }}>Active (visible in panel)</label>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onSave}
            disabled={isSaving || !form.title || !form.promptText}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: "#E8520A", color: "#fff", opacity: isSaving || !form.title || !form.promptText ? 0.5 : 1 }}
          >
            {isSaving ? "Saving…" : "Save"}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: "#1a1510", color: "#8a7a6a", border: "1px solid #2a2218" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
