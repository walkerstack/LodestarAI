/**
 * GALLANTRYAI STUDIO
 * Owner-only content management dashboard.
 * Password login works on any device — no Manus OAuth required.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StudioPageEditor from "@/components/studio/StudioPageEditor";
import StudioMediaLibrary from "@/components/studio/StudioMediaLibrary";
import StudioLinkManager from "@/components/studio/StudioLinkManager";
import StudioSiteMap from "@/components/studio/StudioSiteMap";
import StudioStatusBoard from "@/components/studio/StudioStatusBoard";

type StudioTab = "pages" | "media" | "links" | "sitemap" | "statusboard";

// ── Password Login Screen ────────────────────────────────────────────────────
function StudioLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginMutation = trpc.studio.studioLogin.useMutation({
    onSuccess: () => {
      // Reload the page — the session cookie is now set
      window.location.reload();
    },
    onError: () => {
      setError("Wrong password. Try again.");
      setLoading(false);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    loginMutation.mutate({ password });
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "#080604" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          background: "#130f0a",
          border: "1px solid #2a2218",
          borderRadius: "12px",
          padding: "2.5rem 2rem",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.75rem",
            color: "#f0e8d8",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Studio
        </div>
        <p
          style={{
            color: "#5a4a3a",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Enter your password to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{
              width: "100%",
              background: "#0a0806",
              border: "1px solid #2a2218",
              borderRadius: "8px",
              padding: "0.875rem 1rem",
              color: "#f0e8d8",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              outline: "none",
              marginBottom: "1rem",
              boxSizing: "border-box",
            }}
          />

          {error && (
            <p
              style={{
                color: "#E8520A",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                marginBottom: "1rem",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%",
              background: loading || !password ? "#3a2a18" : "#E8520A",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              padding: "0.875rem",
              borderRadius: "8px",
              border: "none",
              cursor: loading || !password ? "not-allowed" : "pointer",
              transition: "background 0.15s",
            }}
          >
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link
            href="/"
            style={{
              color: "#3a2a18",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
            }}
          >
            ← Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main Studio ──────────────────────────────────────────────────────────────
export default function Studio() {
  const { user, loading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<StudioTab>("pages");
  const [selectedPage, setSelectedPage] = useState<{
    slug: string;
    label: string;
    path: string;
  } | null>(null);

  const { data: pageList, isLoading: pagesLoading } =
    trpc.studio.getPageList.useQuery();

  // Loading auth state
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#080604" }}
      >
        <p style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>
          Loading…
        </p>
      </div>
    );
  }

  // Not logged in — show password form
  if (!isAuthenticated || user?.role !== "admin") {
    return <StudioLoginForm />;
  }

  // ── Handle page selection from Site Map or Status Board ──────────────────
  function handleSelectPageFromMap(page: { slug: string; label: string; path: string }) {
    setSelectedPage(page);
    setActiveTab("pages");
  }

  // ── Tabs ─────────────────────────────────────────────────────────────────
  const tabs: { id: StudioTab; label: string }[] = [
    { id: "pages", label: "Pages & Blocks" },
    { id: "media", label: "Media Library" },
    { id: "links", label: "Link Manager" },
    { id: "sitemap", label: "Site Map" },
    { id: "statusboard", label: "Status Board" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0d0b08", color: "#e8ddd0" }}
    >
      <Nav />

      {/* Header */}
      <div
        className="w-full px-6 py-8 border-b"
        style={{ borderColor: "#2a2218", background: "#080604" }}
      >
        <div className="max-w-5xl mx-auto">
          <span
            style={{
              color: "#E8520A",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              fontFamily: "'DM Sans', sans-serif",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.25rem",
            }}
          >
            Private
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              color: "#f0e8d8",
              fontWeight: 700,
            }}
          >
            Studio
          </h1>
          <p
            style={{
              color: "#8a7a6a",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              marginTop: "0.25rem",
            }}
          >
            Your site. Your content. No code required.
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div
        className="w-full px-6 border-b"
        style={{ borderColor: "#2a2218", background: "#0a0806" }}
      >
        <div className="max-w-5xl mx-auto flex overflow-x-auto">
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
                borderBottom:
                  activeTab === tab.id
                    ? "2px solid #E8520A"
                    : "2px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 w-full px-6 py-8">
        <div className="max-w-5xl mx-auto">

          {/* ── Pages & Blocks ── */}
          {activeTab === "pages" && !selectedPage && (
            <div>
              <p
                style={{
                  color: "#8a7a6a",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  marginBottom: "1.5rem",
                }}
              >
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
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.9rem",
                          color: "#e8ddd0",
                          fontWeight: 500,
                        }}
                      >
                        {page.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.75rem",
                          color: "#5a4a3a",
                          marginTop: "0.25rem",
                        }}
                      >
                        {page.path}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "pages" && selectedPage && (
            <StudioPageEditor
              page={selectedPage}
              onBack={() => setSelectedPage(null)}
            />
          )}

          {/* ── Media Library ── */}
          {activeTab === "media" && <StudioMediaLibrary />}

          {/* ── Link Manager ── */}
          {activeTab === "links" && (
            <StudioLinkManager pages={pageList ?? []} />
          )}

          {/* ── Site Map ── */}
          {activeTab === "sitemap" && (
            <div>
              <p
                style={{
                  color: "#8a7a6a",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  marginBottom: "1.5rem",
                }}
              >
                Click any page node to open its block editor.
              </p>
              <StudioSiteMap onSelectPage={handleSelectPageFromMap} />
            </div>
          )}

          {/* ── Status Board ── */}
          {activeTab === "statusboard" && (
            <div>
              <p
                style={{
                  color: "#8a7a6a",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  marginBottom: "1.5rem",
                }}
              >
                All pages at a glance. Filter by status. Click any card to edit.
              </p>
              <StudioStatusBoard onSelectPage={handleSelectPageFromMap} />
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}
