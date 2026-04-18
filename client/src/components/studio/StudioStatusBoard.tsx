/**
 * StudioStatusBoard — workplace board view of all pages with live status dots.
 * Green = ≥3 blocks, Yellow = 1-2 blocks, Grey = 0 blocks.
 * Click any card → opens that page in the block editor.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";

type PageStatus = {
  slug: string;
  label: string;
  path: string;
  blockCount: number;
  status: "green" | "yellow" | "grey";
};

type FilterMode = "all" | "green" | "yellow" | "grey";

interface StudioStatusBoardProps {
  onSelectPage: (page: { slug: string; label: string; path: string }) => void;
}

const STATUS_DOT: Record<"green" | "yellow" | "grey", string> = {
  green: "#22c55e",
  yellow: "#f59e0b",
  grey: "#4a4030",
};

const STATUS_LABEL: Record<"green" | "yellow" | "grey", string> = {
  green: "Ready",
  yellow: "Partial",
  grey: "Empty",
};

// Page clusters for visual grouping
const CLUSTERS: { label: string; slugs: string[] }[] = [
  {
    label: "Foundation",
    slugs: ["home", "rules", "road-protocol", "safety", "flower-presets"],
  },
  {
    label: "Scaffold",
    slugs: [
      "scaffold",
      "promptolinguistics",
      "alcm",
      "human-line",
      "drift",
      "malbolge",
      "user-governance",
      "dual-strategy",
    ],
  },
  {
    label: "Concepts",
    slugs: [
      "anthropomorphism",
      "hallucinations",
      "three-voices",
      "whelm-scale",
      "variable-scale",
      "math-prompting",
      "taxonomy",
    ],
  },
  {
    label: "Builder",
    slugs: [
      "builder",
      "builder-origin",
      "builders-kids",
      "gallantry-ai",
      "citizen-researcher",
      "field-papers",
    ],
  },
  {
    label: "Research",
    slugs: [
      "research-hub",
      "lexicon",
      "frameworks",
      "playground",
      "prompt-games",
      "prompts",
      "articles",
      "gallery",
    ],
  },
  {
    label: "Children's",
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
];

export default function StudioStatusBoard({ onSelectPage }: StudioStatusBoardProps) {
  const [filter, setFilter] = useState<FilterMode>("all");
  const { data, isLoading } = trpc.studio.getPageStatus.useQuery();

  if (isLoading) {
    return (
      <p style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif" }}>
        Loading page status…
      </p>
    );
  }

  const pages = data ?? [];
  const pageMap = new Map<string, PageStatus>(pages.map((p) => [p.slug, p]));

  // Summary counts
  const greenCount = pages.filter((p) => p.status === "green").length;
  const yellowCount = pages.filter((p) => p.status === "yellow").length;
  const greyCount = pages.filter((p) => p.status === "grey").length;

  const filterButtons: { id: FilterMode; label: string; color: string; count: number }[] = [
    { id: "all", label: "All", color: "#8a7a6a", count: pages.length },
    { id: "green", label: "Ready", color: "#22c55e", count: greenCount },
    { id: "yellow", label: "Partial", color: "#f59e0b", count: yellowCount },
    { id: "grey", label: "Empty", color: "#4a4030", count: greyCount },
  ];

  return (
    <div>
      {/* Summary bar */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        {filterButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            style={{
              background: filter === btn.id ? "#1a1410" : "transparent",
              border: `1px solid ${filter === btn.id ? btn.color : "#2a2218"}`,
              borderRadius: "20px",
              padding: "0.375rem 0.875rem",
              color: filter === btn.id ? btn.color : "#8a7a6a",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "all 0.15s",
            }}
          >
            {btn.id !== "all" && (
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: btn.color,
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
            )}
            {btn.label}
            <span
              style={{
                background: "#2a2218",
                borderRadius: "10px",
                padding: "0 6px",
                fontSize: "0.7rem",
                color: "#8a7a6a",
              }}
            >
              {btn.count}
            </span>
          </button>
        ))}
      </div>

      {/* Clusters */}
      {CLUSTERS.map((cluster) => {
        const clusterPages = cluster.slugs
          .map((slug) => pageMap.get(slug))
          .filter((p): p is PageStatus => !!p)
          .filter((p) => filter === "all" || p.status === filter);

        if (clusterPages.length === 0) return null;

        return (
          <div key={cluster.label} style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#5a4a3a",
                marginBottom: "0.75rem",
              }}
            >
              {cluster.label}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "0.5rem",
              }}
            >
              {clusterPages.map((page) => (
                <button
                  key={page.slug}
                  onClick={() => onSelectPage(page)}
                  style={{
                    background: "#130f0a",
                    border: "1px solid #2a2218",
                    borderRadius: "8px",
                    padding: "0.75rem 1rem",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.625rem",
                    transition: "border-color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = STATUS_DOT[page.status])
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#2a2218")
                  }
                >
                  {/* Status dot */}
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: STATUS_DOT[page.status],
                      flexShrink: 0,
                      marginTop: "3px",
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.875rem",
                        color: "#e8ddd0",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {page.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.7rem",
                        color: "#5a4a3a",
                        marginTop: "0.125rem",
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                      }}
                    >
                      <span>{STATUS_LABEL[page.status]}</span>
                      <span style={{ color: "#3a2a18" }}>·</span>
                      <span>{page.blockCount} block{page.blockCount !== 1 ? "s" : ""}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Unclustered pages */}
      {(() => {
        const clusteredSlugs = new Set(CLUSTERS.flatMap((c) => c.slugs));
        const unclustered = pages.filter(
          (p) =>
            !clusteredSlugs.has(p.slug) &&
            (filter === "all" || p.status === filter)
        );
        if (unclustered.length === 0) return null;
        return (
          <div style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#5a4a3a",
                marginBottom: "0.75rem",
              }}
            >
              Other
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "0.5rem",
              }}
            >
              {unclustered.map((page) => (
                <button
                  key={page.slug}
                  onClick={() => onSelectPage(page)}
                  style={{
                    background: "#130f0a",
                    border: "1px solid #2a2218",
                    borderRadius: "8px",
                    padding: "0.75rem 1rem",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.625rem",
                  }}
                >
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: STATUS_DOT[page.status],
                      flexShrink: 0,
                      marginTop: "3px",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.875rem",
                        color: "#e8ddd0",
                        fontWeight: 500,
                      }}
                    >
                      {page.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.7rem",
                        color: "#5a4a3a",
                        marginTop: "0.125rem",
                      }}
                    >
                      {STATUS_LABEL[page.status]} · {page.blockCount} block{page.blockCount !== 1 ? "s" : ""}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
