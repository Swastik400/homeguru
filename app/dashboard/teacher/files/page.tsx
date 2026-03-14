"use client";
import React, { useState, useRef } from "react";
import {
  Upload, Plus, Search, MoreVertical, Download, Trash2, Share2,
  Grid, List as ListIcon, HardDrive, FolderOpen, FileText,
  Film, Archive, Image, X, CheckCircle2, Eye,
} from "lucide-react";
import "@/components/teacher/CourseBuilder.css";

/* ──────────────────────────────────
   TYPES
────────────────────────────────── */
interface FileItem {
  id: number;
  name: string;
  type: "pdf" | "sheet" | "video" | "archive" | "image" | "doc";
  folder: string;
  size: string;
  date: string;
}

interface Folder {
  name: string;
  items: number;
  color: string;
  bg: string;
}

/* ──────────────────────────────────
   DATA
────────────────────────────────── */
const FOLDERS: Folder[] = [
  { name: "Class Materials", items: 12, color: "#4f46e5", bg: "#eef2ff" },
  { name: "Assignments",     items: 24, color: "#7c3aed", bg: "#f5f3ff" },
  { name: "Live Recordings", items: 8,  color: "#059669", bg: "#ecfdf5" },
  { name: "Student Work",    items: 48, color: "#d97706", bg: "#fffbeb" },
  { name: "Exam Papers",     items: 6,  color: "#db2777", bg: "#fdf2f8" },
  { name: "Resources",       items: 33, color: "#0284c7", bg: "#f0f9ff" },
];

const INITIAL_FILES: FileItem[] = [
  { id: 1, name: "Intro_to_Spanish_Notes.pdf",    type: "pdf",     folder: "Class Materials", size: "2.4 MB",  date: "12 Mar, 2026" },
  { id: 2, name: "Calculus_Sheet_4.xlsx",          type: "sheet",   folder: "Assignments",     size: "1.1 MB",  date: "11 Mar, 2026" },
  { id: 3, name: "Quantum_Physics_Lab_Vid.mp4",    type: "video",   folder: "Live Recordings", size: "420 MB", date: "10 Mar, 2026" },
  { id: 4, name: "Web_Dev_Assets.zip",             type: "archive", folder: "Resources",       size: "15.8 MB", date: "09 Mar, 2026" },
  { id: 5, name: "Chapter3_Diagram.png",           type: "image",   folder: "Class Materials", size: "3.2 MB",  date: "08 Mar, 2026" },
  { id: 6, name: "Mid_Term_Paper_2026.pdf",        type: "pdf",     folder: "Exam Papers",     size: "0.9 MB",  date: "07 Mar, 2026" },
  { id: 7, name: "Student_Submission_Aarav.docx",  type: "doc",     folder: "Student Work",    size: "540 KB",  date: "06 Mar, 2026" },
  { id: 8, name: "Biology_Lab_Recording.mp4",      type: "video",   folder: "Live Recordings", size: "210 MB", date: "05 Mar, 2026" },
];

const FILE_ICON: Record<FileItem["type"], { icon: React.ElementType; color: string; bg: string }> = {
  pdf:     { icon: FileText, color: "#dc2626", bg: "#fef2f2" },
  sheet:   { icon: FileText, color: "#16a34a", bg: "#f0fdf4" },
  video:   { icon: Film,     color: "#2563eb", bg: "#eff6ff" },
  archive: { icon: Archive,  color: "#d97706", bg: "#fffbeb" },
  image:   { icon: Image,    color: "#7c3aed", bg: "#f5f3ff" },
  doc:     { icon: FileText, color: "#0284c7", bg: "#f0f9ff" },
};

const TYPE_LABELS: Record<FileItem["type"], string> = {
  pdf: "PDF", sheet: "Spreadsheet", video: "Video",
  archive: "Archive", image: "Image", doc: "Document",
};

const STORAGE_BREAKDOWN = [
  { label: "Documents", value: 2.8, color: "#dc2626" },
  { label: "Videos",    value: 1.4, color: "#2563eb" },
  { label: "Archives",  value: 0.6, color: "#d97706" },
  { label: "Images",    value: 0.4, color: "#7c3aed" },
];
const TOTAL_STORAGE = 10;
const USED_STORAGE = 4.2;

/* ──────────────────────────────────
   UPLOAD MODAL
────────────────────────────────── */
function UploadModal({ onClose, onUpload, folders }: { onClose: () => void; onUpload: (f: FileItem) => void; folders: Folder[] }) {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [folder, setFolder] = useState(folders[0]?.name || "Class Materials");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFileName(file.name);
    setUploaded(false);
  };

  const handleUpload = () => {
    if (!fileName) return;
    const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
    const type: FileItem["type"] =
      ext === "pdf" ? "pdf" : ext === "xlsx" || ext === "csv" ? "sheet" :
      ext === "mp4" || ext === "mov" ? "video" :
      ext === "zip" || ext === "rar" ? "archive" :
      ext === "png" || ext === "jpg" || ext === "jpeg" ? "image" : "doc";
    onUpload({ id: Date.now(), name: fileName, type, folder, size: "—", date: "14 Mar, 2026" });
    setUploaded(true);
    setTimeout(onClose, 1200);
  };

  return (
    <div className="agent-loading-backdrop" onClick={onClose}>
      <div className="agent-loading-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111", margin: 0, fontFamily: "'Matter', sans-serif" }}>Upload File</h3>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: "2px 0 0", fontFamily: "'Matter', sans-serif" }}>Drag & drop or click to choose a file</p>
          </div>
          <button onClick={onClose}><X size={18} className="text-gray-400 hover:text-gray-700" /></button>
        </div>

        <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${dragging ? "#111" : "#e5e7eb"}`,
              borderRadius: 12, padding: "28px 0", textAlign: "center",
              cursor: "pointer", background: dragging ? "#f9fafb" : "#fff",
              transition: "all 0.2s",
            }}
          >
            <Upload style={{ width: 28, height: 28, color: "#9ca3af", margin: "0 auto 8px" }} />
            <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", fontFamily: "'Matter', sans-serif", margin: "0 0 4px" }}>
              {fileName || "Click or drag file here"}
            </p>
            <p style={{ fontSize: 11, color: "#9ca3af", fontFamily: "'Matter', sans-serif", margin: 0 }}>PDF, DOCX, XLSX, MP4, ZIP, PNG — max 500 MB</p>
            <input ref={fileRef} type="file" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          </div>

          {/* Folder select */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6, fontFamily: "'Matter', sans-serif" }}>Save to Folder</label>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontFamily: "'Matter', sans-serif", outline: "none", background: "#fff" }}
            >
              {folders.map((f) => <option key={f.name}>{f.name}</option>)}
            </select>
          </div>
        </div>

        <div style={{ padding: "14px 22px", background: "#fafafa", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between" }}>
          <button onClick={onClose} style={{ padding: "9px 16px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontWeight: 500, color: "#6b7280", cursor: "pointer", fontFamily: "'Matter', sans-serif" }}>Cancel</button>
          {uploaded ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#16a34a", fontWeight: 600, fontSize: 13, fontFamily: "'Matter', sans-serif" }}>
              <CheckCircle2 size={16} /> Uploaded!
            </div>
          ) : (
            <button
              onClick={handleUpload}
              disabled={!fileName}
              style={{ padding: "9px 20px", background: fileName ? "#111" : "#d1d5db", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, cursor: fileName ? "pointer" : "not-allowed", fontFamily: "'Matter', sans-serif" }}
            >
              <Upload style={{ width: 13, height: 13, display: "inline", marginRight: 6 }} />
              Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────
   NEW FOLDER MODAL
────────────────────────────────── */
const FOLDER_COLORS = [
  { color: "#4f46e5", bg: "#eef2ff", label: "Indigo"  },
  { color: "#7c3aed", bg: "#f5f3ff", label: "Violet"  },
  { color: "#059669", bg: "#ecfdf5", label: "Green"   },
  { color: "#d97706", bg: "#fffbeb", label: "Amber"   },
  { color: "#db2777", bg: "#fdf2f8", label: "Pink"    },
  { color: "#0284c7", bg: "#f0f9ff", label: "Sky"     },
  { color: "#dc2626", bg: "#fef2f2", label: "Red"     },
  { color: "#111111", bg: "#f3f4f6", label: "Slate"   },
];

function NewFolderModal({ onClose, onCreate }: { onClose: () => void; onCreate: (f: Folder) => void }) {
  const [name, setName] = useState("");
  const [picked, setPicked] = useState(FOLDER_COLORS[0]);
  const [done, setDone] = useState(false);

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), items: 0, color: picked.color, bg: picked.bg });
    setDone(true);
    setTimeout(onClose, 900);
  };

  return (
    <div className="agent-loading-backdrop" onClick={onClose}>
      <div className="agent-loading-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400, padding: 0, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111", margin: 0, fontFamily: "'Matter', sans-serif" }}>New Folder</h3>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: "2px 0 0", fontFamily: "'Matter', sans-serif" }}>Give your folder a name and pick a colour</p>
          </div>
          <button onClick={onClose}><X size={18} className="text-gray-400 hover:text-gray-700" /></button>
        </div>

        <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Folder name */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6, fontFamily: "'Matter', sans-serif" }}>Folder Name *</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="e.g. Homework Submissions"
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontFamily: "'Matter', sans-serif", outline: "none", boxSizing: "border-box" }}
              onFocus={(e) => (e.target.style.borderColor = "#111")}
              onBlur={(e)  => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>

          {/* Colour picker */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 8, fontFamily: "'Matter', sans-serif" }}>Folder Colour</label>
            {/* Preview */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: picked.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FolderOpen style={{ width: 20, height: 20, color: picked.color }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", fontFamily: "'Matter', sans-serif" }}>{name || "Untitled Folder"}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 8 }}>
              {FOLDER_COLORS.map((c) => (
                <button
                  key={c.color}
                  title={c.label}
                  onClick={() => setPicked(c)}
                  style={{
                    width: 30, height: 30, borderRadius: 8, background: c.bg,
                    border: picked.color === c.color ? `2.5px solid ${c.color}` : "2px solid transparent",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "border 0.15s",
                  }}
                >
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: c.color, display: "block" }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 22px", background: "#fafafa", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={onClose} style={{ padding: "9px 16px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontWeight: 500, color: "#6b7280", cursor: "pointer", fontFamily: "'Matter', sans-serif" }}>Cancel</button>
          {done ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#16a34a", fontWeight: 600, fontSize: 13, fontFamily: "'Matter', sans-serif" }}>
              <CheckCircle2 size={16} /> Folder Created!
            </div>
          ) : (
            <button
              onClick={handleCreate}
              disabled={!name.trim()}
              style={{ padding: "9px 20px", background: name.trim() ? "#111" : "#d1d5db", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, cursor: name.trim() ? "pointer" : "not-allowed", fontFamily: "'Matter', sans-serif", display: "flex", alignItems: "center", gap: 6 }}
            >
              <Plus style={{ width: 13, height: 13 }} /> Create Folder
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────
   PAGE
────────────────────────────────── */
export default function FileManagerPage() {
  const [folders, setFolders] = useState<Folder[]>(FOLDERS);
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showNewFolder, setShowNewFolder] = useState(false);

  const handleCreateFolder = (f: Folder) => setFolders((p) => [...p, f]);

  const handleUpload = (f: FileItem) => setFiles((p) => [f, ...p]);
  const handleDelete = (id: number) => {
    setFiles((p) => p.filter((f) => f.id !== id));
    if (selectedFile?.id === id) setSelectedFile(null);
  };

  const filtered = files.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchFolder = activeFolder ? f.folder === activeFolder : true;
    return matchSearch && matchFolder;
  });

  return (
    <div className="billing-page">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#111] font-matter tracking-tight">File Manager</h1>
          <p className="text-[12px] text-gray-400 mt-0.5 font-matter">Manage class materials, assignments, recordings and more.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#111] text-white rounded-xl text-[12px] font-bold hover:bg-black transition-all shadow-sm"
          >
            <Upload className="w-4 h-4" /> Upload File
          </button>
          <button
            onClick={() => setShowNewFolder(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-[#111] rounded-xl text-[12px] font-bold hover:bg-gray-50 transition-all"
          >
            <Plus className="w-4 h-4" /> New Folder
          </button>
        </div>
      </div>

      {/* STORAGE BAR — compact top strip */}
      <div className="bg-white border border-[#eee] rounded-2xl p-4 mb-6 flex items-center gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-3 shrink-0">
          <HardDrive className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-[11px] text-gray-400 font-matter font-medium uppercase tracking-wide">Storage Used</p>
            <p className="text-[15px] font-bold text-[#111] font-matter leading-none mt-0.5">{USED_STORAGE} GB <span className="text-gray-400 font-normal text-[12px]">/ {TOTAL_STORAGE} GB</span></p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#111] rounded-full transition-all" style={{ width: `${(USED_STORAGE / TOTAL_STORAGE) * 100}%` }} />
          </div>
          <div className="flex gap-4">
            {STORAGE_BREAKDOWN.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-[11px] text-gray-400 font-matter">{s.label} {s.value} GB</span>
              </div>
            ))}
          </div>
        </div>
        <button className="shrink-0 px-3 py-2 bg-[#111] text-white text-[11px] font-bold rounded-lg hover:bg-black transition-all font-matter">
          Upgrade
        </button>
      </div>

      {/* FOLDERS SCROLL */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-bold text-[#111] font-matter">Folders</h2>
        <span className="text-[12px] text-gray-400 font-matter">{folders.length} folders</span>
      </div>
      <div className="credits-scroll-container hide-scrollbar" style={{ overflowX: "auto" }}>
        <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        <div className="credits-cards" style={{ gap: 12 }}>
          {/* All files card */}
          <button
            onClick={() => setActiveFolder(null)}
            className="credits-card"
            style={{
              minWidth: 160, padding: "16px 18px",
              borderColor: activeFolder === null ? "#111" : "#e5e7eb",
              boxShadow: activeFolder === null ? "0 4px 16px rgba(0,0,0,0.10)" : undefined,
            }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: "#f3f4f6" }}>
              <FolderOpen className="w-5 h-5 text-gray-500" />
            </div>
            <div className="credits-amount" style={{ fontSize: 14, marginBottom: 2 }}>All Files</div>
            <div className="credits-label" style={{ fontSize: 11, marginBottom: 0 }}>{files.length} files</div>
          </button>

          {folders.map((folder) => (
            <button
              key={folder.name}
              onClick={() => setActiveFolder(folder.name)}
              className="credits-card"
              style={{
                minWidth: 160, padding: "16px 18px",
                borderColor: activeFolder === folder.name ? "#111" : "#e5e7eb",
                boxShadow: activeFolder === folder.name ? "0 4px 16px rgba(0,0,0,0.10)" : undefined,
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: folder.bg }}>
                <FolderOpen className="w-5 h-5" style={{ color: folder.color }} />
              </div>
              <div className="credits-amount" style={{ fontSize: 14, marginBottom: 2 }}>{folder.name}</div>
              <div className="credits-label" style={{ fontSize: 11, marginBottom: 0 }}>{folder.items} files</div>
            </button>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div className="billing-tabs mt-6 flex gap-6 items-center justify-between">
        <div className="flex gap-6">
          <button
            className="billing-tab"
            style={{ borderBottomColor: "#111", color: "#111" }}
          >
            {activeFolder ?? "All Files"}
            <span className="ml-2 text-[10px] font-bold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{filtered.length}</span>
          </button>
        </div>
        <div className="flex items-center gap-3 pb-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
            <input
              type="text"
              placeholder="Search files…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[12px] font-matter focus:outline-none focus:border-gray-300 w-48"
            />
          </div>
          {/* View toggle */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-[#111] text-white" : "text-gray-400 hover:bg-gray-50"} transition-colors`}>
              <ListIcon className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-[#111] text-white" : "text-gray-400 hover:bg-gray-50"} transition-colors`}>
              <Grid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── FILE LIST (Detail view matches project-metadata style) ── */}
      {viewMode === "list" ? (
        <div className="project-metadata" style={{ borderRadius: "0 0 16px 16px" }}>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 font-matter text-[14px]">No files found.</p>
            </div>
          ) : (
            <div>
              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: 0, padding: "0 0 10px", borderBottom: "1px solid #f0f0f0", marginBottom: 4 }}>
                {["Name", "Type", "Size", "Modified", ""].map((h, i) => (
                  <span key={i} style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif", padding: "0 8px" }}>{h}</span>
                ))}
              </div>
              {filtered.map((file) => {
                const ft = FILE_ICON[file.type];
                const Icon = ft.icon;
                const isSelected = selectedFile?.id === file.id;
                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(isSelected ? null : file)}
                    style={{
                      display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: 0,
                      padding: "10px 8px", borderRadius: 10, cursor: "pointer",
                      background: isSelected ? "#f9fafb" : "transparent",
                      borderLeft: isSelected ? "3px solid #111" : "3px solid transparent",
                      transition: "all 0.15s", alignItems: "center",
                      marginBottom: 2,
                    }}
                    onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "#f9fafb"; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                  >
                    {/* Name */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 0 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: ft.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon style={{ width: 16, height: 16, color: ft.color }} />
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: 0, fontFamily: "'Matter', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 240 }}>{file.name}</p>
                        <p style={{ fontSize: 11, color: "#9ca3af", margin: 0, fontFamily: "'Matter', sans-serif" }}>{file.folder}</p>
                      </div>
                    </div>
                    {/* Type */}
                    <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "'Matter', sans-serif", padding: "0 8px" }}>{TYPE_LABELS[file.type]}</span>
                    {/* Size */}
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#111", fontFamily: "'Matter', sans-serif", padding: "0 8px" }}>{file.size}</span>
                    {/* Date */}
                    <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: "'Matter', sans-serif", padding: "0 8px" }}>{file.date}</span>
                    {/* Actions */}
                    <div style={{ display: "flex", gap: 4, padding: "0 4px" }} onClick={(e) => e.stopPropagation()}>
                      <button title="Preview" style={{ padding: 6, border: "none", background: "none", cursor: "pointer", color: "#9ca3af", borderRadius: 6 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                      ><Eye style={{ width: 14, height: 14 }} /></button>
                      <button title="Download" style={{ padding: 6, border: "none", background: "none", cursor: "pointer", color: "#9ca3af", borderRadius: 6 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                      ><Download style={{ width: 14, height: 14 }} /></button>
                      <button title="Share" style={{ padding: 6, border: "none", background: "none", cursor: "pointer", color: "#9ca3af", borderRadius: 6 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                      ><Share2 style={{ width: 14, height: 14 }} /></button>
                      <button title="Delete" onClick={() => handleDelete(file.id)} style={{ padding: 6, border: "none", background: "none", cursor: "pointer", color: "#9ca3af", borderRadius: 6 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                      ><Trash2 style={{ width: 14, height: 14 }} /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Inline detail panel when a file is selected */}
          {selectedFile && (() => {
            const ft = FILE_ICON[selectedFile.type];
            const Icon = ft.icon;
            return (
              <div style={{ marginTop: 24, padding: "20px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 14 }}>
                <div className="meta-header" style={{ marginBottom: 16, paddingBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: ft.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon style={{ width: 22, height: 22, color: ft.color }} />
                    </div>
                    <div>
                      <h3 className="meta-title" style={{ fontSize: 18 }}>{selectedFile.name}</h3>
                      <span className="meta-username">{selectedFile.folder} · {TYPE_LABELS[selectedFile.type]}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ padding: "7px 14px", background: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "'Matter', sans-serif" }}>
                      <Download style={{ width: 13, height: 13 }} /> Download
                    </button>
                    <button style={{ padding: "7px 14px", background: "#fff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "'Matter', sans-serif" }}>
                      <Share2 style={{ width: 13, height: 13 }} /> Share
                    </button>
                    <button onClick={() => handleDelete(selectedFile.id)} style={{ padding: "7px 14px", background: "#fff", color: "#dc2626", border: "1px solid #fee2e2", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "'Matter', sans-serif" }}>
                      <Trash2 style={{ width: 13, height: 13 }} /> Delete
                    </button>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
                  {[
                    { label: "File Size", value: selectedFile.size },
                    { label: "Type", value: TYPE_LABELS[selectedFile.type] },
                    { label: "Folder", value: selectedFile.folder },
                    { label: "Last Modified", value: selectedFile.date },
                  ].map(({ label, value }) => (
                    <div key={label} className="info-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 4, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 14px" }}>
                      <span className="info-label" style={{ textAlign: "left" }}>{label}</span>
                      <span className="info-value" style={{ textAlign: "left" }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        /* GRID VIEW */
        <div style={{ background: "#fff", borderRadius: "0 0 16px 16px", padding: 24 }}>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 font-matter text-[14px]">No files found.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
              {filtered.map((file) => {
                const ft = FILE_ICON[file.type];
                const Icon = ft.icon;
                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(selectedFile?.id === file.id ? null : file)}
                    style={{
                      border: `1.5px solid ${selectedFile?.id === file.id ? "#111" : "#e5e7eb"}`,
                      borderRadius: 12, padding: "16px 14px", cursor: "pointer",
                      background: "#fff", transition: "all 0.15s",
                      boxShadow: selectedFile?.id === file.id ? "0 4px 14px rgba(0,0,0,0.08)" : "none",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#d1d5db"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = selectedFile?.id === file.id ? "#111" : "#e5e7eb"; }}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: ft.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                      <Icon style={{ width: 20, height: 20, color: ft.color }} />
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#111", fontFamily: "'Matter', sans-serif", margin: "0 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</p>
                    <p style={{ fontSize: 11, color: "#9ca3af", fontFamily: "'Matter', sans-serif", margin: "0 0 10px" }}>{file.size}</p>
                    <div style={{ display: "flex", gap: 6 }} onClick={(e) => e.stopPropagation()}>
                      <button title="Download" style={{ flex: 1, padding: "5px 0", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Download style={{ width: 12, height: 12, color: "#6b7280" }} />
                      </button>
                      <button title="Delete" onClick={() => handleDelete(file.id)} style={{ flex: 1, padding: "5px 0", background: "#fff5f5", border: "1px solid #fee2e2", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Trash2 style={{ width: 12, height: 12, color: "#dc2626" }} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} onUpload={handleUpload} folders={folders} />}
      {showNewFolder && <NewFolderModal onClose={() => setShowNewFolder(false)} onCreate={handleCreateFolder} />}
    </div>
  );
}
