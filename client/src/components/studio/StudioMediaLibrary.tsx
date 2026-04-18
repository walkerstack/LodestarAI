/**
 * StudioMediaLibrary
 * Upload and manage photos and documents.
 * Mobile-first: large tap/drop zone, clear file list, copy URL button.
 */

import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type MediaItem = {
  id: number;
  filename: string;
  url: string;
  fileKey: string;
  mimeType: string;
  mediaType: "image" | "doc";
  fileSize: number | null;
  createdAt: Date;
};

const MAX_SIZE_MB = 15;

export default function StudioMediaLibrary() {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState<"all" | "image" | "doc">("all");

  const { data: mediaItems, isLoading } = trpc.studio.getMedia.useQuery();

  const uploadMutation = trpc.studio.uploadMedia.useMutation({
    onSuccess: () => {
      utils.studio.getMedia.invalidate();
      toast.success("File uploaded");
    },
    onError: (e) => toast.error(`Upload failed: ${e.message}`),
  });

  const deleteMutation = trpc.studio.deleteMedia.useMutation({
    onSuccess: () => {
      utils.studio.getMedia.invalidate();
      toast.success("File removed");
    },
    onError: () => toast.error("Failed to remove file"),
  });

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
      return;
    }

    const mediaType: "image" | "doc" = file.type.startsWith("image/") ? "image" : "doc";

    setUploading(true);
    try {
      const buffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(buffer);
      const base64 = btoa(Array.from(uint8, (b) => String.fromCharCode(b)).join(""));
      await uploadMutation.mutateAsync({
        filename: file.name,
        mimeType: file.type,
        mediaType,
        dataBase64: base64,
        fileSize: file.size,
      });
    } catch {
      // error handled by mutation
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(() => toast.success("URL copied to clipboard"));
  };

  const filtered = (mediaItems ?? []).filter(
    (m) => filter === "all" || m.mediaType === filter
  );

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div>
      <p style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
        Upload photos and documents. Copy the URL to use in a card or doc block.
      </p>

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          background: dragging ? "#221508" : "#130f0a",
          border: `2px dashed ${dragging ? "#E8520A" : "#2a2218"}`,
          borderRadius: "10px",
          padding: "2rem",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "1.5rem",
          transition: "all 0.15s",
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.doc,.docx,.txt"
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <p style={{ color: "#E8520A", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}>Uploading…</p>
        ) : (
          <>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📎</div>
            <p style={{ color: "#c8b89a", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", margin: 0 }}>
              Tap to upload or drag a file here
            </p>
            <p style={{ color: "#5a4a3a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", marginTop: "0.35rem" }}>
              Photos (JPG, PNG, WEBP) or Docs (PDF, Word) — max {MAX_SIZE_MB}MB
            </p>
          </>
        )}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {(["all", "image", "doc"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? "#221508" : "transparent",
              border: `1px solid ${filter === f ? "#E8520A" : "#2a2218"}`,
              borderRadius: "6px",
              color: filter === f ? "#E8520A" : "#8a7a6a",
              padding: "0.4rem 0.85rem",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              textTransform: "capitalize",
            }}
          >
            {f === "all" ? "All Files" : f === "image" ? "Photos" : "Docs"}
          </button>
        ))}
      </div>

      {/* File list */}
      {isLoading ? (
        <p style={{ color: "#8a7a6a", fontFamily: "'DM Sans', sans-serif" }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#5a4a3a", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}>
          No files yet. Upload one above.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#130f0a",
                border: "1px solid #2a2218",
                borderRadius: "8px",
                padding: "0.875rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              {/* Thumbnail or icon */}
              {item.mediaType === "image" ? (
                <img
                  src={item.url}
                  alt={item.filename}
                  style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "4px", flexShrink: 0 }}
                />
              ) : (
                <div style={{ width: "48px", height: "48px", background: "#1a1208", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>
                  📄
                </div>
              )}

              {/* Info */}
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#c8b89a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.filename}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#5a4a3a", marginTop: "0.15rem" }}>
                  {formatSize(item.fileSize)} · {item.mediaType}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                <button
                  onClick={() => copyUrl(item.url)}
                  title="Copy URL"
                  style={{ background: "transparent", border: "1px solid #2a221844", borderRadius: "4px", color: "#7ecb8f", padding: "0.35rem 0.6rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem" }}
                >
                  Copy URL
                </button>
                <button
                  onClick={() => { if (confirm("Remove this file?")) deleteMutation.mutate({ id: item.id }); }}
                  title="Delete"
                  style={{ background: "transparent", border: "1px solid #ff6b6b44", borderRadius: "4px", color: "#ff6b6b", padding: "0.35rem 0.6rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem" }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
