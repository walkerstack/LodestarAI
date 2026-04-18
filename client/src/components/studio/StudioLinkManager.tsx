/**
 * StudioLinkManager
 * View all links on each page. Change where a link goes.
 * Mobile-first: clean list, inline edit, clear save/cancel.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type ScanResult = { destination: string; label: string; sources: string[] };

type Page = { slug: string; label: string; path: string };
type PageLink = {
  id: number;
  pageSlug: string;
  label: string;
  destination: string;
  position: number;
  isActive: boolean;
};

interface Props {
  pages: Page[];
}

const inputStyle: React.CSSProperties = {
  background: "#0d0b08",
  border: "1px solid #2a2218",
  borderRadius: "6px",
  color: "#e8ddd0",
  padding: "0.55rem 0.75rem",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.9rem",
  width: "100%",
  boxSizing: "border-box",
};

export default function StudioLinkManager({ pages }: Props) {
  const utils = trpc.useUtils();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDest, setEditDest] = useState("");
  const [editLabel, setEditLabel] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newDest, setNewDest] = useState("");
  const [scanResults, setScanResults] = useState<ScanResult[] | null>(null);
  const [showScan, setShowScan] = useState(false);
  const [scanFilter, setScanFilter] = useState("");

  const scanMutation = trpc.studio.scanLinks.useMutation({
    onSuccess: (data) => {
      setScanResults(data);
      setShowScan(true);
      toast.success(`Found ${data.length} unique paths`);
    },
    onError: (e) => toast.error(`Scan failed: ${e.message}`),
  });

  const { data: links, isLoading } = trpc.studio.getLinksByPage.useQuery(
    { pageSlug: selectedSlug ?? "" },
    { enabled: !!selectedSlug }
  );

  const updateMutation = trpc.studio.updateLink.useMutation({
    onSuccess: () => {
      utils.studio.getLinksByPage.invalidate({ pageSlug: selectedSlug ?? "" });
      setEditingId(null);
      toast.success("Link updated");
    },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });

  const createMutation = trpc.studio.createLink.useMutation({
    onSuccess: () => {
      utils.studio.getLinksByPage.invalidate({ pageSlug: selectedSlug ?? "" });
      setShowAddForm(false);
      setNewLabel("");
      setNewDest("");
      toast.success("Link added");
    },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });

  const deleteMutation = trpc.studio.deleteLink.useMutation({
    onSuccess: () => {
      utils.studio.getLinksByPage.invalidate({ pageSlug: selectedSlug ?? "" });
      toast.success("Link removed");
    },
    onError: () => toast.error("Failed to remove link"),
  });

  const startEdit = (link: PageLink) => {
    setEditingId(link.id);
    setEditDest(link.destination);
    setEditLabel(link.label);
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateMutation.mutate({ id: editingId, label: editLabel, destination: editDest });
  };

  const handleAdd = () => {
    if (!selectedSlug || !newLabel || !newDest) return;
    createMutation.mutate({
      pageSlug: selectedSlug,
      label: newLabel,
      destination: newDest,
      position: links ? links.length : 0,
    });
  };

  const filteredScan = scanResults
    ? scanResults.filter(
        (r) =>
          !scanFilter ||
          r.destination.toLowerCase().includes(scanFilter.toLowerCase()) ||
          r.label.toLowerCase().includes(scanFilter.toLowerCase())
      )
    : [];

  return (
    <div>
      <p style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
        Select a page to see its links. Click any link to change where it goes.
      </p>

      {/* ── Link Scanner ── */}
      <div style={{ marginBottom: "2rem", background: "#0d0b08", border: "1px solid #2a2218", borderRadius: "8px", padding: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: showScan && scanResults ? "1rem" : "0" }}>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#c8b89a", fontWeight: 600 }}>Link Scanner</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#5a4a3a", marginTop: "0.15rem" }}>Scan all source files for internal paths</div>
          </div>
          <button
            onClick={() => scanMutation.mutate()}
            disabled={scanMutation.isPending}
            style={{ background: "#E8520A", border: "none", borderRadius: "6px", color: "#fff", padding: "0.5rem 1rem", cursor: scanMutation.isPending ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600, opacity: scanMutation.isPending ? 0.7 : 1 }}
          >
            {scanMutation.isPending ? "Scanning…" : "Scan Now"}
          </button>
        </div>

        {showScan && scanResults && (
          <div>
            <input
              value={scanFilter}
              onChange={(e) => setScanFilter(e.target.value)}
              placeholder="Filter paths…"
              style={{ ...inputStyle, marginBottom: "0.75rem" }}
            />
            <div style={{ maxHeight: "320px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {filteredScan.map((r) => (
                <div key={r.destination} style={{ background: "#130f0a", border: "1px solid #2a2218", borderRadius: "6px", padding: "0.6rem 0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                    <div style={{ flex: 1, overflow: "hidden" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#E8520A", fontWeight: 500 }}>{r.destination}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#5a4a3a", marginTop: "0.1rem" }}>{r.sources.slice(0, 2).join(", ")}{r.sources.length > 2 ? ` +${r.sources.length - 2} more` : ""}</div>
                    </div>
                    <a
                      href={r.destination}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ background: "transparent", border: "1px solid #2a2218", borderRadius: "4px", color: "#8a7a6a", padding: "0.25rem 0.5rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", textDecoration: "none", flexShrink: 0 }}
                    >
                      Visit
                    </a>
                  </div>
                </div>
              ))}
              {filteredScan.length === 0 && (
                <p style={{ color: "#5a4a3a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", textAlign: "center", padding: "1rem" }}>No paths match.</p>
              )}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#3a2a1a", marginTop: "0.5rem", textAlign: "right" }}>
              {filteredScan.length} of {scanResults.length} paths shown
            </div>
          </div>
        )}
      </div>

      {/* Page selector */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#8a7a6a", display: "block", marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Page
        </label>
        <select
          value={selectedSlug ?? ""}
          onChange={(e) => { setSelectedSlug(e.target.value || null); setEditingId(null); setShowAddForm(false); }}
          style={{ ...inputStyle, maxWidth: "400px" }}
        >
          <option value="">— Select a page —</option>
          {pages.map((p) => (
            <option key={p.slug} value={p.slug}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* Links for selected page */}
      {selectedSlug && (
        <>
          {isLoading ? (
            <p style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif" }}>Loading links…</p>
          ) : !links || links.length === 0 ? (
            <div style={{ background: "#130f0a", border: "1px dashed #2a2218", borderRadius: "8px", padding: "1.5rem", textAlign: "center", marginBottom: "1rem" }}>
              <p style={{ color: "#5a4a3a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}>
                No managed links on this page yet. Add one below.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
              {links.map((link) => (
                <div
                  key={link.id}
                  style={{
                    background: "#130f0a",
                    border: "1px solid #2a2218",
                    borderRadius: "8px",
                    padding: "0.875rem 1rem",
                  }}
                >
                  {editingId === link.id ? (
                    /* Edit mode */
                    <div>
                      <div style={{ marginBottom: "0.5rem" }}>
                        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8a7a6a", display: "block", marginBottom: "0.25rem" }}>Label</label>
                        <input style={inputStyle} value={editLabel} onChange={(e) => setEditLabel(e.target.value)} />
                      </div>
                      <div style={{ marginBottom: "0.75rem" }}>
                        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8a7a6a", display: "block", marginBottom: "0.25rem" }}>Goes to</label>
                        <input style={inputStyle} value={editDest} onChange={(e) => setEditDest(e.target.value)} placeholder="/page-path or https://…" />
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => setEditingId(null)}
                          style={{ flex: 1, background: "transparent", border: "1px solid #2a2218", borderRadius: "6px", color: "#8a7a6a", padding: "0.5rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveEdit}
                          disabled={updateMutation.isPending}
                          style={{ flex: 2, background: "#E8520A", border: "none", borderRadius: "6px", color: "#fff", padding: "0.5rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600 }}
                        >
                          {updateMutation.isPending ? "Saving…" : "Save"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* View mode */
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ flex: 1, overflow: "hidden" }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#c8b89a", fontWeight: 500 }}>
                          {link.label}
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#5a4a3a", marginTop: "0.15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          → {link.destination}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                        <button
                          onClick={() => startEdit(link)}
                          style={{ background: "transparent", border: "1px solid #E8520A44", borderRadius: "4px", color: "#E8520A", padding: "0.35rem 0.6rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem" }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => { if (confirm("Remove this link?")) deleteMutation.mutate({ id: link.id }); }}
                          style={{ background: "transparent", border: "1px solid #ff6b6b44", borderRadius: "4px", color: "#ff6b6b", padding: "0.35rem 0.6rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem" }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add link */}
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              style={{ background: "#1a1208", border: "1px dashed #E8520A88", borderRadius: "8px", color: "#E8520A", padding: "0.75rem 1.5rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", width: "100%" }}
            >
              + Add Link
            </button>
          ) : (
            <div style={{ background: "#130f0a", border: "1px solid #E8520A44", borderRadius: "8px", padding: "1.25rem" }}>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", color: "#c8b89a", fontSize: "0.9rem", marginBottom: "0.75rem", fontWeight: 600 }}>New Link</h4>
              <div style={{ marginBottom: "0.5rem" }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8a7a6a", display: "block", marginBottom: "0.25rem" }}>Label</label>
                <input style={inputStyle} value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="e.g. Road Protocol" />
              </div>
              <div style={{ marginBottom: "0.75rem" }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8a7a6a", display: "block", marginBottom: "0.25rem" }}>Goes to</label>
                <input style={inputStyle} value={newDest} onChange={(e) => setNewDest(e.target.value)} placeholder="/road-protocol or https://…" />
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => { setShowAddForm(false); setNewLabel(""); setNewDest(""); }} style={{ flex: 1, background: "transparent", border: "1px solid #2a2218", borderRadius: "6px", color: "#8a7a6a", padding: "0.5rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}>Cancel</button>
                <button onClick={handleAdd} disabled={!newLabel || !newDest || createMutation.isPending} style={{ flex: 2, background: "#E8520A", border: "none", borderRadius: "6px", color: "#fff", padding: "0.5rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600, opacity: newLabel && newDest ? 1 : 0.5 }}>
                  {createMutation.isPending ? "Adding…" : "Add Link"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
