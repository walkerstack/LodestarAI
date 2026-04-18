/**
 * StudioSiteMap — scaffold hierarchy diagram with live status dots.
 * Shows the site structure from Floor → Level 2 → Level 3 → Level 4 → Ceiling → Research,
 * plus Children's cluster and Lenses cluster.
 * Click any node → opens that page in the block editor.
 */

import { trpc } from "@/lib/trpc";

type PageStatus = {
  slug: string;
  label: string;
  path: string;
  blockCount: number;
  status: "green" | "yellow" | "grey";
};

interface StudioSiteMapProps {
  onSelectPage: (page: { slug: string; label: string; path: string }) => void;
}

const DOT_COLOR: Record<"green" | "yellow" | "grey", string> = {
  green: "#22c55e",
  yellow: "#f59e0b",
  grey: "#3a2a18",
};

// ── Scaffold Levels ──────────────────────────────────────────────────────────
const SCAFFOLD_LEVELS: {
  level: string;
  color: string;
  slugs: string[];
}[] = [
  {
    level: "Floor",
    color: "#E8520A",
    slugs: ["home", "rules", "safety", "flower-presets"],
  },
  {
    level: "Level 2",
    color: "#D4722A",
    slugs: ["road-protocol", "promptolinguistics", "scaffold"],
  },
  {
    level: "Level 3",
    color: "#C4923A",
    slugs: ["alcm", "human-line", "drift", "three-voices"],
  },
  {
    level: "Level 4",
    color: "#A4824A",
    slugs: [
      "malbolge",
      "whelm-scale",
      "variable-scale",
      "math-prompting",
      "user-governance",
      "dual-strategy",
    ],
  },
  {
    level: "Ceiling",
    color: "#8A6E2F",
    slugs: ["citizen-researcher", "field-papers", "builder", "frameworks"],
  },
  {
    level: "Research",
    color: "#6A5A28",
    slugs: ["research-hub", "lexicon", "taxonomy", "gallery", "articles"],
  },
];

// ── Other Clusters ───────────────────────────────────────────────────────────
const OTHER_CLUSTERS: {
  label: string;
  color: string;
  slugs: string[];
}[] = [
  {
    label: "Children's",
    color: "#3b82f6",
    slugs: [
      "for-child",
      "for-child-rules",
      "for-child-patterns",
      "for-child-prompts",
      "kids-learn",
      "school-board",
    ],
  },
  {
    label: "Lenses",
    color: "#8b5cf6",
    slugs: [
      "for-teenager",
      "for-everyday",
      "for-guardian-teacher",
      "for-prompt-engineer",
      "for-linguist",
      "for-mathematician",
      "for-cognitive-science",
      "for-psychology",
      "for-researcher",
      "for-watcher",
    ],
  },
  {
    label: "Field Notes",
    color: "#6b7280",
    slugs: [
      "what-claude-admitted",
      "what-the-ai-said",
      "open-door",
      "counter-arguments",
      "screenshot-sharing",
      "field-report-review",
      "eu-ai-act",
    ],
  },
  {
    label: "Tools",
    color: "#10b981",
    slugs: [
      "playground",
      "prompt-games",
      "prompts",
      "builder-origin",
      "builders-kids",
      "gallantry-ai",
      "anthropomorphism",
      "hallucinations",
    ],
  },
];

function PageNode({
  page,
  accentColor,
  onSelectPage,
}: {
  page: PageStatus;
  accentColor: string;
  onSelectPage: (page: { slug: string; label: string; path: string }) => void;
}) {
  return (
    <button
      onClick={() => onSelectPage(page)}
      title={`${page.label} — ${page.blockCount} block${page.blockCount !== 1 ? "s" : ""}`}
      style={{
        background: "#130f0a",
        border: `1px solid #2a2218`,
        borderRadius: "6px",
        padding: "0.5rem 0.75rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
        textAlign: "left",
        transition: "border-color 0.15s",
        minWidth: 0,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = accentColor)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2218")}
    >
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: DOT_COLOR[page.status],
          flexShrink: 0,
          boxShadow: page.status === "green" ? `0 0 6px ${DOT_COLOR.green}60` : "none",
        }}
      />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8rem",
          color: "#c8b89a",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {page.label}
      </span>
    </button>
  );
}

export default function StudioSiteMap({ onSelectPage }: StudioSiteMapProps) {
  const { data, isLoading } = trpc.studio.getPageStatus.useQuery();

  if (isLoading) {
    return (
      <p style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif" }}>
        Loading site map…
      </p>
    );
  }

  const pages = data ?? [];
  const pageMap = new Map<string, PageStatus>(pages.map((p) => [p.slug, p]));

  // Legend
  const greenCount = pages.filter((p) => p.status === "green").length;
  const yellowCount = pages.filter((p) => p.status === "yellow").length;
  const greyCount = pages.filter((p) => p.status === "grey").length;

  return (
    <div>
      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {[
          { color: "#22c55e", label: `Ready (${greenCount})` },
          { color: "#f59e0b", label: `Partial (${yellowCount})` },
          { color: "#3a2a18", label: `Empty (${greyCount})` },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              color: "#8a7a6a",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: item.color,
                display: "inline-block",
              }}
            />
            {item.label}
          </div>
        ))}
      </div>

      {/* ── Scaffold Hierarchy ── */}
      <div
        style={{
          background: "#0a0806",
          border: "1px solid #2a2218",
          borderRadius: "12px",
          padding: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1rem",
            color: "#E8520A",
            marginBottom: "1.25rem",
            letterSpacing: "0.05em",
          }}
        >
          The Scaffold
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {SCAFFOLD_LEVELS.map((level, levelIdx) => {
            const levelPages = level.slugs
              .map((slug) => pageMap.get(slug))
              .filter((p): p is PageStatus => !!p);

            return (
              <div key={level.level} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                {/* Level label */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "64px",
                    paddingTop: "0.4rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: level.color,
                      fontWeight: 600,
                    }}
                  >
                    {level.level}
                  </div>
                  {/* Connector line */}
                  {levelIdx < SCAFFOLD_LEVELS.length - 1 && (
                    <div
                      style={{
                        width: "1px",
                        height: "1rem",
                        background: `${level.color}40`,
                        margin: "0.25rem auto 0",
                      }}
                    />
                  )}
                </div>

                {/* Page nodes */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    flex: 1,
                  }}
                >
                  {levelPages.map((page) => (
                    <PageNode
                      key={page.slug}
                      page={page}
                      accentColor={level.color}
                      onSelectPage={onSelectPage}
                    />
                  ))}
                  {levelPages.length === 0 && (
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.75rem",
                        color: "#3a2a18",
                        fontStyle: "italic",
                        paddingTop: "0.4rem",
                      }}
                    >
                      No pages mapped
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Other Clusters ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {OTHER_CLUSTERS.map((cluster) => {
          const clusterPages = cluster.slugs
            .map((slug) => pageMap.get(slug))
            .filter((p): p is PageStatus => !!p);

          return (
            <div
              key={cluster.label}
              style={{
                background: "#0a0806",
                border: "1px solid #2a2218",
                borderRadius: "12px",
                padding: "1.25rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: cluster.color,
                  marginBottom: "0.875rem",
                  fontWeight: 600,
                }}
              >
                {cluster.label}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                {clusterPages.map((page) => (
                  <PageNode
                    key={page.slug}
                    page={page}
                    accentColor={cluster.color}
                    onSelectPage={onSelectPage}
                  />
                ))}
                {clusterPages.length === 0 && (
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: "#3a2a18",
                      fontStyle: "italic",
                    }}
                  >
                    No pages mapped
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
