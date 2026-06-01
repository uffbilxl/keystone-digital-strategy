"use client";

import { useState, useEffect, useCallback } from "react";
import { LogoMark } from "@/components/Logo";

interface Submission {
  id: string;
  name: string;
  company: string;
  email: string;
  challenge: string;
  receivedAt: string;
  read: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSubmissions = useCallback(async (pw: string) => {
    setLoading(true);
    const res = await fetch("/api/admin", { headers: { "x-admin-password": pw } });
    setLoading(false);
    if (res.status === 401) { setError("Wrong password."); setAuthed(false); return; }
    const data = await res.json();
    setSubmissions(data.submissions || []);
  }, []);

  useEffect(() => {
    if (authed) fetchSubmissions(password);
  }, [authed, password, fetchSubmissions]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin", { headers: { "x-admin-password": password } });
    if (res.status === 401) { setError("Wrong password."); return; }
    setAuthed(true);
  }

  async function markRead(id: string, read: boolean) {
    await fetch("/api/admin", {
      method: "PATCH",
      headers: { "x-admin-password": password, "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, read } : s));
    if (selected?.id === id) setSelected((s) => s ? { ...s, read } : s);
  }

  async function deleteSubmission(id: string) {
    if (!confirm("Delete this submission?")) return;
    await fetch("/api/admin", {
      method: "DELETE",
      headers: { "x-admin-password": password, "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  const unread = submissions.filter((s) => !s.read).length;

  // Login screen
  if (!authed) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: "#0C2340" }}
      >
        <div
          className="w-full max-w-sm p-8 rounded-sm"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(159,176,190,0.15)" }}
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <LogoMark size={52} archColor="#FFFFFF" keystoneColor="#C2A065" />
            <div className="text-center">
              <p className="font-semibold text-white text-base" style={{ letterSpacing: "-0.01em" }}>
                Keystone Admin
              </p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
                Restricted access
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase mb-2" style={{ color: "rgba(159,176,190,0.7)", letterSpacing: "0.2em" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-sm text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${error ? "rgba(220,80,80,0.5)" : "rgba(159,176,190,0.2)"}`,
                  color: "#fff",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = "rgba(173,138,82,0.5)"; }}
                onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = "rgba(159,176,190,0.2)"; }}
              />
              {error && <p className="text-xs mt-2" style={{ color: "rgba(220,80,80,0.9)" }}>{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-sm text-sm font-semibold transition-colors duration-200"
              style={{ background: "#AD8A52", color: "#fff", letterSpacing: "0.06em" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#C2A065"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#AD8A52"; }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F6F7F9", fontFamily: "inherit" }}>
      {/* Top bar */}
      <header style={{ background: "#0C2340", borderBottom: "1px solid rgba(159,176,190,0.12)" }}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark size={30} archColor="#FFFFFF" keystoneColor="#C2A065" />
            <span className="font-semibold text-white text-sm" style={{ letterSpacing: "-0.01em" }}>
              Keystone Admin
            </span>
            {unread > 0 && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "#AD8A52", color: "#fff" }}
              >
                {unread} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchSubmissions(password)}
              className="text-xs transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              Refresh
            </button>
            <button
              onClick={() => { setAuthed(false); setPassword(""); setSelected(null); }}
              className="text-xs transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex gap-6">

        {/* Submissions list */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xs font-semibold uppercase" style={{ color: "#5E6B78", letterSpacing: "0.22em" }}>
              Enquiries
            </h2>
            <span className="text-xs" style={{ color: "#9FB0BE" }}>
              {submissions.length} total
            </span>
          </div>

          {loading && (
            <p className="text-sm text-center py-8" style={{ color: "#9FB0BE" }}>Loading...</p>
          )}

          {!loading && submissions.length === 0 && (
            <div
              className="flex flex-col items-center justify-center gap-3 py-12 rounded-sm text-center"
              style={{ border: "1px dashed #E3E7EB" }}
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#9FB0BE" strokeWidth="1.5">
                <path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0H4m4 0v4m8-4v4" />
              </svg>
              <p className="text-sm" style={{ color: "#9FB0BE" }}>No enquiries yet</p>
            </div>
          )}

          {submissions.map((s) => (
            <button
              key={s.id}
              onClick={() => { setSelected(s); if (!s.read) markRead(s.id, true); }}
              className="w-full text-left p-4 rounded-sm transition-all duration-150"
              style={{
                background: selected?.id === s.id ? "#fff" : "#fff",
                border: `1px solid ${selected?.id === s.id ? "#0C2340" : "#E3E7EB"}`,
                boxShadow: selected?.id === s.id ? "0 2px 12px rgba(12,35,64,0.08)" : "none",
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-semibold text-sm truncate" style={{ color: "#0C2340" }}>
                  {s.name}
                </span>
                {!s.read && (
                  <span
                    className="flex-shrink-0 w-2 h-2 rounded-full mt-1"
                    style={{ background: "#AD8A52" }}
                  />
                )}
              </div>
              <p className="text-xs truncate mb-1.5" style={{ color: "#5E6B78" }}>
                {s.email}
              </p>
              <p className="text-xs line-clamp-2" style={{ color: "#9FB0BE", lineHeight: "1.5" }}>
                {s.challenge}
              </p>
              <p className="text-xs mt-2" style={{ color: "#C2C9D0" }}>
                {formatDate(s.receivedAt)}
              </p>
            </button>
          ))}
        </div>

        {/* Detail pane */}
        <div className="flex-1 min-w-0">
          {!selected ? (
            <div
              className="h-full flex flex-col items-center justify-center gap-3 rounded-sm"
              style={{ border: "1px dashed #E3E7EB", minHeight: "400px" }}
            >
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#9FB0BE" strokeWidth="1.5">
                <path d="M2 5l8 6 8-6M2 5h16v11H2V5z" />
              </svg>
              <p className="text-sm" style={{ color: "#9FB0BE" }}>Select an enquiry to read it</p>
            </div>
          ) : (
            <div
              className="rounded-sm overflow-hidden"
              style={{ background: "#fff", border: "1px solid #E3E7EB" }}
            >
              {/* Detail header */}
              <div
                className="px-8 py-5 flex items-start justify-between gap-4"
                style={{ borderBottom: "1px solid #E3E7EB" }}
              >
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: "#0C2340", letterSpacing: "-0.01em" }}>
                    {selected.name}
                  </h3>
                  {selected.company && (
                    <p className="text-sm mt-0.5" style={{ color: "#5E6B78" }}>{selected.company}</p>
                  )}
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-sm mt-1 inline-block transition-colors duration-150"
                    style={{ color: "#AD8A52" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#0C2340"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#AD8A52"; }}
                  >
                    {selected.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => markRead(selected.id, !selected.read)}
                    className="text-xs px-3 py-1.5 rounded-sm transition-all duration-150"
                    style={{
                      background: selected.read ? "#F6F7F9" : "rgba(173,138,82,0.1)",
                      color: selected.read ? "#9FB0BE" : "#AD8A52",
                      border: `1px solid ${selected.read ? "#E3E7EB" : "rgba(173,138,82,0.3)"}`,
                    }}
                  >
                    {selected.read ? "Mark unread" : "Mark read"}
                  </button>
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your Keystone enquiry`}
                    className="text-xs px-3 py-1.5 rounded-sm transition-colors duration-150"
                    style={{ background: "#0C2340", color: "#fff" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#0d2a4d"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#0C2340"; }}
                  >
                    Reply
                  </a>
                  <button
                    onClick={() => deleteSubmission(selected.id)}
                    className="text-xs px-3 py-1.5 rounded-sm transition-colors duration-150"
                    style={{ background: "rgba(220,80,80,0.08)", color: "rgba(200,60,60,0.8)", border: "1px solid rgba(220,80,80,0.2)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,80,80,0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(220,80,80,0.08)"; }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div
                className="px-8 py-4 flex items-center gap-6"
                style={{ borderBottom: "1px solid #E3E7EB", background: "#FAFBFC" }}
              >
                {[
                  { label: "Received", value: formatDate(selected.receivedAt) },
                  { label: "Status", value: selected.read ? "Read" : "Unread" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs uppercase mb-0.5" style={{ color: "#9FB0BE", letterSpacing: "0.18em" }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: "#1F252D" }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Message */}
              <div className="px-8 py-7">
                <p className="text-xs font-semibold uppercase mb-4" style={{ color: "#9FB0BE", letterSpacing: "0.2em" }}>
                  Message
                </p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#1F252D", lineHeight: "1.8" }}>
                  {selected.challenge}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
