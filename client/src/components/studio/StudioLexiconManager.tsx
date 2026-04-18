/**
 * STUDIO — Lexicon Manager
 * Add, edit, remove Living Lexicon terms from Studio.
 * Data lives in the database. Public LivingLexicon page reads from here.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";

type LexiconTerm = {
  id: number;
  term: string;
  category: string;
  link: string | null;
  everyday: string;
  professional: string;
  watcher: string;
  position: number;
  isActive: boolean;
};

const CATEGORIES = ["CORE", "FRAMEWORK", "SAFETY", "CHILDREN", "RESEARCH", "TOOLS"];

const inputStyle: React.CSSProperties = {
  background: "#1a1610",
  border: "1px solid #3a3020",
  borderRadius: "6px",
  color: "#e8ddd0",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.875rem",
  padding: "0.5rem 0.75rem",
  width: "100%",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  color: "#8a7a6a",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: "0.25rem",
  display: "block",
};

const btnStyle = (primary?: boolean): React.CSSProperties => ({
  background: primary ? "#E8520A" : "transparent",
  border: primary ? "none" : "1px solid #3a3020",
  borderRadius: "6px",
  color: primary ? "#fff" : "#8a7a6a",
  cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.8rem",
  fontWeight: 600,
  padding: "0.4rem 0.9rem",
});

function TermForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Partial<LexiconTerm>;
  onSave: (data: Partial<LexiconTerm>) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Partial<LexiconTerm>>({
    term: "",
    category: "CORE",
    link: "",
    everyday: "",
    professional: "",
    watcher: "",
    isActive: true,
    ...initial,
  });

  const set = (key: keyof LexiconTerm, val: string | boolean) =>
    setForm((f) => ({ ...f, [key]: val }));

  return (
    <div
      style={{
        background: "#110f0c",
        border: "1px solid #3a3020",
        borderRadius: "10px",
        padding: "1.5rem",
        marginBottom: "1rem",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <label style={labelStyle}>Term *</label>
          <input
            style={inputStyle}
            value={form.term ?? ""}
            onChange={(e) => set("term", e.target.value)}
            placeholder="e.g. Token Zero"
          />
        </div>
        <div>
          <label style={labelStyle}>Category</label>
          <select
            style={inputStyle}
            value={form.category ?? "CORE"}
            onChange={(e) => set("category", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>Link (optional — page path or URL)</label>
        <input
          style={inputStyle}
          value={form.link ?? ""}
          onChange={(e) => set("link", e.target.value)}
          placeholder="/promptolinguistics"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>Everyday Voice *</label>
        <textarea
          style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
          value={form.everyday ?? ""}
          onChange={(e) => set("everyday", e.target.value)}
          placeholder="Plain language definition..."
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>Professional Voice *</label>
        <textarea
          style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
          value={form.professional ?? ""}
          onChange={(e) => set("professional", e.target.value)}
          placeholder="Technical / academic definition..."
        />
      </div>
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Watcher Voice *</label>
        <textarea
          style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
          value={form.watcher ?? ""}
          onChange={(e) => set("watcher", e.target.value)}
          placeholder="The observer's perspective..."
        />
      </div>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <button style={btnStyle(true)} onClick={() => onSave(form)} disabled={saving}>
          {saving ? "Saving…" : "Save Term"}
        </button>
        <button style={btnStyle()} onClick={onCancel}>Cancel</button>
        <label style={{ ...labelStyle, margin: 0, display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <input
            type="checkbox"
            checked={form.isActive ?? true}
            onChange={(e) => set("isActive", e.target.checked)}
          />
          Active
        </label>
      </div>
    </div>
  );
}

export default function StudioLexiconManager() {
  const utils = trpc.useUtils();
  const { data: terms, isLoading } = trpc.studio.getLexiconTerms.useQuery();
  const createMutation = trpc.studio.createLexiconTerm.useMutation({
    onSuccess: () => { utils.studio.getLexiconTerms.invalidate(); setAdding(false); },
  });
  const updateMutation = trpc.studio.updateLexiconTerm.useMutation({
    onSuccess: () => { utils.studio.getLexiconTerms.invalidate(); setEditingId(null); },
  });
  const deleteMutation = trpc.studio.deleteLexiconTerm.useMutation({
    onSuccess: () => utils.studio.getLexiconTerms.invalidate(),
  });

  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("ALL");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const filtered = (terms ?? []).filter((t) => {
    const matchSearch = t.term.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "ALL" || t.category === filterCat;
    return matchSearch && matchCat;
  });

  if (isLoading) {
    return (
      <div style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif", padding: "2rem" }}>
        Loading lexicon terms…
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ color: "#e8ddd0", fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
            Living Lexicon
          </h2>
          <p style={{ color: "#8a7a6a", fontSize: "0.8rem", margin: "0.25rem 0 0" }}>
            {terms?.length ?? 0} terms · {terms?.filter((t) => t.isActive).length ?? 0} active
          </p>
        </div>
        {!adding && (
          <button style={btnStyle(true)} onClick={() => setAdding(true)}>
            + Add Term
          </button>
        )}
      </div>

      {/* Add form */}
      {adding && (
        <TermForm
          initial={{}}
          onSave={(data) => createMutation.mutate(data as Parameters<typeof createMutation.mutate>[0])}
          onCancel={() => setAdding(false)}
          saving={createMutation.isPending}
        />
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <input
          style={{ ...inputStyle, width: "220px" }}
          placeholder="Search terms…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          style={{ ...inputStyle, width: "140px" }}
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
        >
          <option value="ALL">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Term list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {filtered.map((term) => (
          <div key={term.id}>
            {editingId === term.id ? (
              <TermForm
                initial={term}
                onSave={(data) => updateMutation.mutate({ id: term.id, ...data } as Parameters<typeof updateMutation.mutate>[0])}
                onCancel={() => setEditingId(null)}
                saving={updateMutation.isPending}
              />
            ) : (
              <div
                style={{
                  background: "#110f0c",
                  border: "1px solid #2a2418",
                  borderRadius: "8px",
                  padding: "0.875rem 1rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  opacity: term.isActive ? 1 : 0.5,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span style={{ color: "#e8ddd0", fontWeight: 700, fontSize: "0.95rem" }}>{term.term}</span>
                    <span style={{
                      background: "#1a1610",
                      border: "1px solid #3a3020",
                      borderRadius: "4px",
                      color: "#8a7a6a",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      padding: "0.1rem 0.4rem",
                      textTransform: "uppercase",
                    }}>{term.category}</span>
                    {!term.isActive && (
                      <span style={{ color: "#6a5a4a", fontSize: "0.7rem" }}>hidden</span>
                    )}
                  </div>
                  <p style={{ color: "#8a7a6a", fontSize: "0.8rem", margin: 0, lineHeight: 1.5 }}>
                    {term.everyday.length > 120 ? term.everyday.slice(0, 120) + "…" : term.everyday}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button style={btnStyle()} onClick={() => setEditingId(term.id)}>Edit</button>
                  {confirmDelete === term.id ? (
                    <>
                      <button
                        style={{ ...btnStyle(), color: "#e05030", borderColor: "#e05030" }}
                        onClick={() => { deleteMutation.mutate({ id: term.id }); setConfirmDelete(null); }}
                      >
                        Confirm
                      </button>
                      <button style={btnStyle()} onClick={() => setConfirmDelete(null)}>Cancel</button>
                    </>
                  ) : (
                    <button
                      style={{ ...btnStyle(), color: "#6a5a4a" }}
                      onClick={() => setConfirmDelete(term.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p style={{ color: "#6a5a4a", fontSize: "0.875rem", padding: "1rem 0" }}>
            No terms match your search.
          </p>
        )}
      </div>
    </div>
  );
}
