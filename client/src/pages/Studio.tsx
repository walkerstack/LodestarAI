/**
 * GALLANTRYAI STUDIO
 * Owner-only content management dashboard.
 * Accessible at /studio — only visible and usable when logged in as owner (admin).
 *
 * Sections:
 *   1. Page List — all site pages
 *   2. Block Editor — view, edit, reorder, delete blocks on a page
 *   3. Block Creator — add text, card, doc blocks
 *   4. Media Library — upload and manage photos and docs
 *   5. Link Manager — view and reroute links per page
 */

import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { toast } from "sonner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StudioPageEditor from "@/components/studio/StudioPageEditor";
import StudioMediaLibrary from "@/components/studio/StudioMediaLibrary";
import StudioLinkManager from "@/components/studio/StudioLinkManager";

type StudioTab = "pages" | "media" | "links";

export default function Studio() {
  const { user, loading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<StudioTab>("pages");
  const [selectedPage, setSelectedPage] = useState<{ slug: string; label: string; path: string } | null>(null);

  const { data: pageList, isLoading: pagesLoading } = trpc.studio.getPageList.useQuery();

  // ── Auth guard ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#080604" }}>
        <p style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>Loading…</p>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "#080604" }}>
        <p style={{ color: "#c8b89a", fontFamily: "'Playfair Display', serif", fontSize: "1.25rem" }}>
          This area is private.
        </p>
        <Link href="/" style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
          ← Return home
        </Link>
      </div>
    );
  }

  // ── Tabs ────────────────────────────────────────────────────────────────
  const tabs: { id: StudioTab; label: string }[] = [
    { id: "pages", label: "Pages & Blocks" },
    { id: "media", label: "Media Library" },
    { id: "links", label: "Link Manager" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0d0b08", color: "#e8ddd0" }}>
      <Nav />

      {/* ── Header ── */}
      <div
        className="w-full px-6 py-8 border-b"
        style={{ borderColor: "#2a2218", background: "#080604" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <span style={{ color: "#E8520A", fontSize: "0.75rem", letterSpacing: "0.15em", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase" }}>
              Private
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#f0e8d8", fontWeight: 700 }}>
            Studio
          </h1>
          <p style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Your site. Your content. No code required.
          </p>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className="w-full px-6 border-b" style={{ borderColor: "#2a2218", background: "#0a0806" }}>
        <div className="max-w-5xl mx-auto flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedPage(null);
              }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                padding: "0.875rem 1.25rem",
                color: activeTab === tab.id ? "#E8520A" : "#8a7a6a",
                background: "transparent",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #E8520A" : "2px solid transparent",
                cursor: "pointer",
                transition: "color 0.15s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 w-full px-6 py-8">
        <div className="max-w-5xl mx-auto">

          {/* PAGES & BLOCKS TAB */}
          {activeTab === "pages" && !selectedPage && (
            <div>
              <p style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                Select a page to view and edit its content blocks.
              </p>

              {pagesLoading ? (
                <p style={{ color: "#8a7a6a" }}>Loading pages…</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(pageList ?? []).map((page) => (
                    <button
                      key={page.slug}
                      onClick={() => setSelectedPage(page)}
                      style={{
                        background: "#130f0a",
                        border: "1px solid #2a2218",
                        borderRadius: "8px",
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "border-color 0.15s, background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#E8520A";
                        (e.currentTarget as HTMLButtonElement).style.background = "#1a1208";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2218";
                        (e.currentTarget as HTMLButtonElement).style.background = "#130f0a";
                      }}
                    >
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#e8ddd0", fontWeight: 500 }}>
                        {page.label}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#5a4a3a", marginTop: "0.25rem" }}>
                        {page.path}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PAGE EDITOR — when a page is selected */}
          {activeTab === "pages" && selectedPage && (
            <StudioPageEditor
              page={selectedPage}
              onBack={() => setSelectedPage(null)}
            />
          )}

          {/* MEDIA LIBRARY TAB */}
          {activeTab === "media" && <StudioMediaLibrary />}

          {/* LINK MANAGER TAB */}
          {activeTab === "links" && (
            <StudioLinkManager
              pages={pageList ?? []}
            />
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}
