/**
 * GALLANTRYAI STUDIO
 * Owner-only content management dashboard.
 * Password login works on any device — no Manus OAuth required.
 * Deploy: 2026-04-18T18:22Z — Site Map + Status Board tabs
 */

import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link, useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StudioPageEditor from "@/components/studio/StudioPageEditor";
import StudioMediaLibrary from "@/components/studio/StudioMediaLibrary";
import StudioLinkManager from "@/components/studio/StudioLinkManager";
import StudioSiteMap from "@/components/studio/StudioSiteMap";
import StudioStatusBoard from "@/components/studio/StudioStatusBoard";
import StudioPageBuilder from "@/components/studio/StudioPageBuilder";
import StudioLearningMatrix from "@/components/studio/StudioLearningMatrix";
import StudioLexiconManager from "@/components/studio/StudioLexiconManager";
import StudioPromptGamesManager from "@/components/studio/StudioPromptGamesManager";
import StudioGButtonManager from "@/components/studio/StudioGButtonManager";
import StudioNavManager from "@/components/studio/StudioNavManager";
import StudioSiteBannerManager from "@/components/studio/StudioSiteBannerManager";

type StudioTab = "pages" | "media" | "links" | "sitemap" | "statusboard" | "pagebuilder" | "learningmatrix" | "lexicon" | "promptgames" | "gbutton" | "navmanager" | "banner";

// ── Page list with Mirror Edit buttons ─────────────────────────────────────
type PageMeta = { slug: string; label: string; path: string };

function StudioPageListWithMirror({
  pageList,
  onSelectPage,
}: {
  pageList: PageMeta[];
  onSelectPage: (page: PageMeta) => void;
}) {
  const [, setLocation] = useLocation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {pageList.map((page) => (
        <div
          key={page.slug}
          style={{
            background: "#130f0a",
            border: "1px solid #2a2218",
            borderRadius: "8px",
            padding: "1rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
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
            }}
          >
            {page.path}
          </div>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
            <button
              onClick={() => onSelectPage(page)}
              style={{
                flex: 1,
                background: "transparent",
                border: "1px solid #2a2218",
                borderRadius: "6px",
                color: "#8a7a6a",
                fontSize: "0.75rem",
                fontFamily: "'DM Sans', sans-serif",
                padding: "0.35rem 0.5rem",
                cursor: "pointer",
              }}
            >
              Block List
            </button>
            <button
              onClick={() => setLocation(`/studio/mirror/${page.slug}`)}
              style={{
                flex: 1,
                background: "#E8520A",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "0.75rem",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                padding: "0.35rem 0.5rem",
                cursor: "pointer",
              }}
            >
              Mirror Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Studio Login Screen ──────────────────────────────────────────────────────
// Primary: Log in with Manus (owner ID check). Fallback: password form.
// Password form stays until owner confirms Manus login works on live site.
function StudioLoginForm() {
  // Password removed April 19, 2026 — Manus OAuth is the only entry point.
  function handleManusLogin() {
    // Redirect to Manus OAuth — after login, server checks owner ID
    const returnPath = "/studio";
    const loginUrl = getLoginUrl();
    // Append return path so OAuth callback redirects back to Studio
    window.location.href = loginUrl + "&returnPath=" + encodeURIComponent(returnPath);
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
          Owner access only.
        </p>

        {/* ── PRIMARY: Log in with Manus ── */}
        <button
          onClick={handleManusLogin}
          style={{
            width: "100%",
            background: "#E8520A",
            color: "#fff",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            padding: "0.875rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "background 0.15s",
            marginBottom: "1.5rem",
          }}
        >
          Log in with Manus →
        </button>

        {/* Password removed — April 19, 2026. Manus OAuth is the only entry point. */}

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

// ── Main Studio ─────────────────────────────────────────────────────────────────────────────────
export default function Studio() {
  const { user, loading, isAuthenticated, logout, refresh } = useAuth();
  const [activeTab, setActiveTab] = useState<StudioTab>("pages");
  const [selectedPage, setSelectedPage] = useState<{
    slug: string;
    label: string;
    path: string;
  } | null>(null);
  const [ownerUpgradeAttempted, setOwnerUpgradeAttempted] = useState(false);
  const [ownerUpgradeError, setOwnerUpgradeError] = useState<string | null>(null);

  const { data: pageList, isLoading: pagesLoading } =
    trpc.studio.getPageList.useQuery();

  // Auto-upgrade owner role after Manus OAuth — fires once when authenticated but not yet admin
  const ownerLoginMutation = trpc.studio.studioOwnerLogin.useMutation({
    onSuccess: () => {
      refresh(); // re-fetch auth.me so role updates in UI
    },
    onError: (err) => {
      setOwnerUpgradeError(err.message);
    },
  });

  useEffect(() => {
    if (!loading && isAuthenticated && user?.role !== "admin" && !ownerUpgradeAttempted) {
      setOwnerUpgradeAttempted(true);
      ownerLoginMutation.mutate();
    }
  }, [loading, isAuthenticated, user?.role, ownerUpgradeAttempted]);

  // Loading auth state or upgrade in progress
  if (loading || (isAuthenticated && user?.role !== "admin" && !ownerUpgradeAttempted && !ownerUpgradeError)) {
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

  // Upgrade in progress
  if (isAuthenticated && user?.role !== "admin" && ownerUpgradeAttempted && ownerLoginMutation.isPending) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#080604" }}
      >
        <p style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif" }}>
          Verifying owner access…
        </p>
      </div>
    );
  }

  // Not the owner or not logged in — show login screen
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
    { id: "pagebuilder", label: "Page Builder" },
    { id: "learningmatrix", label: "Learning Matrix" },
    { id: "lexicon", label: "Lexicon Manager" },
    { id: "promptgames", label: "Prompt Games" },
    { id: "gbutton", label: "G Button" },
    { id: "navmanager", label: "Nav & Footer" },
    { id: "banner", label: "Site Banner" },
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
        <div className="max-w-5xl mx-auto" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
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
          {/* Logout button — top right of Studio header */}
          <button
            onClick={() => logout()}
            style={{
              background: "none",
              border: "1px solid #2a2218",
              borderRadius: "6px",
              color: "#5a4a3a",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              marginTop: "0.25rem",
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.color = "#f0e8d8"; (e.target as HTMLButtonElement).style.borderColor = "#5a4a3a"; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.color = "#5a4a3a"; (e.target as HTMLButtonElement).style.borderColor = "#2a2218"; }}
          >
            Log out
          </button>
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
<StudioPageListWithMirror pageList={pageList ?? []} onSelectPage={setSelectedPage} />
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

          {/* ── Page Builder ── */}
          {activeTab === "pagebuilder" && (
            <div>
              <p
                style={{
                  color: "#8a7a6a",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  marginBottom: "1.5rem",
                }}
              >
                Create new pages from templates. Manage your custom pages. Assign to nav.
              </p>
              <StudioPageBuilder />
            </div>
          )}

          {/* ── Learning Matrix ── */}
          {activeTab === "learningmatrix" && (
            <StudioLearningMatrix />
          )}

          {/* ── Lexicon Manager ── */}
          {activeTab === "lexicon" && <StudioLexiconManager />}

          {/* ── Prompt Games Manager ── */}
          {activeTab === "promptgames" && <StudioPromptGamesManager />}

          {/* ── G Button Manager ── */}
          {activeTab === "gbutton" && <StudioGButtonManager />}

          {/* ── Nav & Footer Manager ── */}
          {activeTab === "navmanager" && <StudioNavManager />}

          {/* ── Site Banner Manager ── */}
          {activeTab === "banner" && <StudioSiteBannerManager />}

        </div>
      </div>

      <Footer />
    </div>
  );
}
