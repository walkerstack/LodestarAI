/**
 * STUDIO — Prompt Games Manager
 * Add, edit, remove Prompt Games from Studio.
 * Data lives in the database. Public PromptGames page reads from here.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";

type PromptGame = {
  id: number;
  title: string;
  category: string;
  prompt: string;
  poster: string | null;
  learningWhat: string | null;
  learningWhy: string | null;
  learningHow: string | null;
  position: number;
  isActive: boolean;
};

const PROMPT_CATEGORIES = [
  "Governance",
  "Session Setup",
  "Safety",
  "Drift Recognition",
  "Word Mechanics",
  "Children",
  "Research",
  "Other",
];

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

function GameForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Partial<PromptGame>;
  onSave: (data: Partial<PromptGame>) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Partial<PromptGame>>({
    title: "",
    category: "Governance",
    prompt: "",
    poster: "",
    learningWhat: "",
    learningWhy: "",
    learningHow: "",
    isActive: true,
    ...initial,
  });

  const set = (key: keyof PromptGame, val: string | boolean) =>
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
          <label style={labelStyle}>Title *</label>
          <input
            style={inputStyle}
            value={form.title ?? ""}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. The Habergeon Prompt"
          />
        </div>
        <div>
          <label style={labelStyle}>Category</label>
          <select
            style={inputStyle}
            value={form.category ?? "Governance"}
            onChange={(e) => set("category", e.target.value)}
          >
            {PROMPT_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>Prompt Text * (the text users copy)</label>
        <textarea
          style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
          value={form.prompt ?? ""}
          onChange={(e) => set("prompt", e.target.value)}
          placeholder="The full prompt text…"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>What It Is (Learning section)</label>
        <textarea
          style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
          value={form.learningWhat ?? ""}
          onChange={(e) => set("learningWhat", e.target.value)}
          placeholder="What this prompt does…"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={labelStyle}>Why It Works</label>
        <textarea
          style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
          value={form.learningWhy ?? ""}
          onChange={(e) => set("learningWhy", e.target.value)}
          placeholder="The reasoning behind it…"
        />
      </div>
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>How to Use It</label>
        <textarea
          style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
          value={form.learningHow ?? ""}
          onChange={(e) => set("learningHow", e.target.value)}
          placeholder="Step by step instructions…"
        />
      </div>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <button style={btnStyle(true)} onClick={() => onSave(form)} disabled={saving}>
          {saving ? "Saving…" : "Save Prompt"}
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

export default function StudioPromptGamesManager() {
  const utils = trpc.useUtils();
  const { data: games, isLoading } = trpc.studio.getPromptGames.useQuery();
  const createMutation = trpc.studio.createPromptGame.useMutation({
    onSuccess: () => { utils.studio.getPromptGames.invalidate(); setAdding(false); },
  });
  const updateMutation = trpc.studio.updatePromptGame.useMutation({
    onSuccess: () => { utils.studio.getPromptGames.invalidate(); setEditingId(null); },
  });
  const deleteMutation = trpc.studio.deletePromptGame.useMutation({
    onSuccess: () => utils.studio.getPromptGames.invalidate(),
  });

  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const filtered = (games ?? []).filter((g) =>
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.category.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif", padding: "2rem" }}>
        Loading prompt games…
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ color: "#e8ddd0", fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
            Prompt Games
          </h2>
          <p style={{ color: "#8a7a6a", fontSize: "0.8rem", margin: "0.25rem 0 0" }}>
            {games?.length ?? 0} prompts · {games?.filter((g) => g.isActive).length ?? 0} active
          </p>
        </div>
        {!adding && (
          <button style={btnStyle(true)} onClick={() => setAdding(true)}>
            + Add Prompt
          </button>
        )}
      </div>

      {adding && (
        <GameForm
          initial={{}}
          onSave={(data) => createMutation.mutate(data as Parameters<typeof createMutation.mutate>[0])}
          onCancel={() => setAdding(false)}
          saving={createMutation.isPending}
        />
      )}

      <div style={{ marginBottom: "1rem" }}>
        <input
          style={{ ...inputStyle, width: "220px" }}
          placeholder="Search prompts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {filtered.map((game) => (
          <div key={game.id}>
            {editingId === game.id ? (
              <GameForm
                initial={game}
                onSave={(data) => updateMutation.mutate({ id: game.id, ...data } as Parameters<typeof updateMutation.mutate>[0])}
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
                  opacity: game.isActive ? 1 : 0.5,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span style={{ color: "#e8ddd0", fontWeight: 700, fontSize: "0.95rem" }}>{game.title}</span>
                    <span style={{
                      background: "#1a1610",
                      border: "1px solid #3a3020",
                      borderRadius: "4px",
                      color: "#E8520A",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      padding: "0.1rem 0.4rem",
                      textTransform: "uppercase",
                    }}>{game.category}</span>
                    {!game.isActive && (
                      <span style={{ color: "#6a5a4a", fontSize: "0.7rem" }}>hidden</span>
                    )}
                  </div>
                  <p style={{ color: "#8a7a6a", fontSize: "0.8rem", margin: 0, lineHeight: 1.5 }}>
                    {(game.prompt ?? "").length > 120 ? game.prompt!.slice(0, 120) + "…" : game.prompt}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button style={btnStyle()} onClick={() => setEditingId(game.id)}>Edit</button>
                  {confirmDelete === game.id ? (
                    <>
                      <button
                        style={{ ...btnStyle(), color: "#e05030", borderColor: "#e05030" }}
                        onClick={() => { deleteMutation.mutate({ id: game.id }); setConfirmDelete(null); }}
                      >
                        Confirm
                      </button>
                      <button style={btnStyle()} onClick={() => setConfirmDelete(null)}>Cancel</button>
                    </>
                  ) : (
                    <button
                      style={{ ...btnStyle(), color: "#6a5a4a" }}
                      onClick={() => setConfirmDelete(game.id)}
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
            No prompts match your search.
          </p>
        )}
      </div>
    </div>
  );
}
