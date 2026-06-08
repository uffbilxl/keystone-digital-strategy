"use client";

import { useState, useEffect, useCallback } from "react";
import { LogoMark } from "@/components/Logo";
import type { Submission } from "@/lib/submission-types";
import type { ClientAccount } from "@/lib/client-accounts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

const EMPTY_FORM = { clientName: "", email: "", password: "", notes: "" };

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"enquiries" | "clients">("enquiries");

  // Enquiries
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);

  // Clients
  const [clients, setClients] = useState<ClientAccount[]>([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async (pw: string) => {
    setLoading(true);
    const res = await fetch("/api/admin", { headers: { "x-admin-password": pw } });
    setLoading(false);
    if (res.status === 401) { setError("Wrong password."); setAuthed(false); return; }
    const data = await res.json();
    setSubmissions(data.submissions || []);
  }, []);

  const fetchClients = useCallback(async (pw: string) => {
    setClientsLoading(true);
    const res = await fetch("/api/admin/clients", { headers: { "x-admin-password": pw } });
    setClientsLoading(false);
    if (res.ok) { const data = await res.json(); setClients(data.clients || []); }
  }, []);

  useEffect(() => {
    if (authed) { fetchSubmissions(password); fetchClients(password); }
  }, [authed, password, fetchSubmissions, fetchClients]);

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

  function openAdd() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(client: ClientAccount) {
    setForm({ clientName: client.clientName, email: client.email, password: client.password, notes: client.notes });
    setEditingId(client.id);
    setShowForm(true);
  }

  async function saveClient() {
    if (!form.clientName.trim() || !form.email.trim()) return;
    if (editingId) {
      await fetch("/api/admin/clients", {
        method: "PATCH",
        headers: { "x-admin-password": password, "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
      setClients((prev) => prev.map((c) => c.id === editingId ? { ...c, ...form } : c));
    } else {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "x-admin-password": password, "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setClients((prev) => [...prev, data.client]);
    }
    setShowForm(false);
    setEditingId(null);
  }

  async function deleteClient(id: string) {
    if (!confirm("Delete this client account?")) return;
    await fetch("/api/admin/clients", {
      method: "DELETE",
      headers: { "x-admin-password": password, "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setClients((prev) => prev.filter((c) => c.id !== id));
  }

  function toggleReveal(id: string) {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  async function handleCopy(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  const unread = submissions.filter((s) => !s.read).length;

  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#0C2340" }}>
        <div className="w-full max-w-sm p-8 rounded-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(159,176,190,0.15)" }}>
          <div className="flex flex-col items-center gap-4 mb-8">
            <LogoMark size={52} archColor="#FFFFFF" keystoneColor="#C2A065" />
            <div className="text-center">
              <p className="font-semibold text-white text-base" style={{ letterSpacing: "-0.01em" }}>Keystone Admin</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>Restricted access</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase mb-2" style={{ color: "rgba(159,176,190,0.7)", letterSpacing: "0.2em" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-sm text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${error ? "rgba(220,80,80,0.5)" : "rgba(159,176,190,0.2)"}`, color: "#fff", fontFamily: "inherit" }}
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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F6F7F9", fontFamily: "inherit" }}>
      <header style={{ background: "#0C2340", borderBottom: "1px solid rgba(159,176,190,0.12)" }}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <LogoMark size={30} archColor="#FFFFFF" keystoneColor="#C2A065" />
              <span className="font-semibold text-white text-sm" style={{ letterSpacing: "-0.01em" }}>Keystone Admin</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTab("enquiries")}
                className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-sm transition-colors duration-200"
                style={{ background: tab === "enquiries" ? "rgba(255,255,255,0.1)" : "transparent", color: tab === "enquiries" ? "#fff" : "rgba(255,255,255,0.4)" }}
              >
                Enquiries
                {unread > 0 && (
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "#AD8A52", color: "#fff" }}>{unread}</span>
                )}
              </button>
              <button
                onClick={() => setTab("clients")}
                className="text-xs px-3 py-1.5 rounded-sm transition-colors duration-200"
                style={{ background: tab === "clients" ? "rgba(255,255,255,0.1)" : "transparent", color: tab === "clients" ? "#fff" : "rgba(255,255,255,0.4)" }}
              >
                Client Accounts
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { fetchSubmissions(password); fetchClients(password); }}
              className="text-xs transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              Refresh
            </button>
            <button
              onClick={() => { setAuthed(false); setPassword(""); setSelected(null); setShowForm(false); }}
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

      {tab === "enquiries" ? (
        <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex gap-6">
          <div className="w-80 flex-shrink-0 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xs font-semibold uppercase" style={{ color: "#5E6B78", letterSpacing: "0.22em" }}>Enquiries</h2>
              <span className="text-xs" style={{ color: "#9FB0BE" }}>{submissions.length} total</span>
            </div>
            {loading && <p className="text-sm text-center py-8" style={{ color: "#9FB0BE" }}>Loading...</p>}
            {!loading && submissions.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 py-12 rounded-sm text-center" style={{ border: "1px dashed #E3E7EB" }}>
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
                style={{ background: "#fff", border: `1px solid ${selected?.id === s.id ? "#0C2340" : "#E3E7EB"}`, boxShadow: selected?.id === s.id ? "0 2px 12px rgba(12,35,64,0.08)" : "none" }}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-semibold text-sm truncate" style={{ color: "#0C2340" }}>{s.name}</span>
                  {!s.read && <span className="flex-shrink-0 w-2 h-2 rounded-full mt-1" style={{ background: "#AD8A52" }} />}
                </div>
                <p className="text-xs truncate mb-1.5" style={{ color: "#5E6B78" }}>{s.email}</p>
                <p className="text-xs line-clamp-2" style={{ color: "#9FB0BE", lineHeight: "1.5" }}>{s.challenge}</p>
                <p className="text-xs mt-2" style={{ color: "#C2C9D0" }}>{formatDate(s.receivedAt)}</p>
              </button>
            ))}
          </div>

          <div className="flex-1 min-w-0">
            {!selected ? (
              <div className="h-full flex flex-col items-center justify-center gap-3 rounded-sm" style={{ border: "1px dashed #E3E7EB", minHeight: "400px" }}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#9FB0BE" strokeWidth="1.5">
                  <path d="M2 5l8 6 8-6M2 5h16v11H2V5z" />
                </svg>
                <p className="text-sm" style={{ color: "#9FB0BE" }}>Select an enquiry to read it</p>
              </div>
            ) : (
              <div className="rounded-sm overflow-hidden" style={{ background: "#fff", border: "1px solid #E3E7EB" }}>
                <div className="px-8 py-5 flex items-start justify-between gap-4" style={{ borderBottom: "1px solid #E3E7EB" }}>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: "#0C2340", letterSpacing: "-0.01em" }}>{selected.name}</h3>
                    {selected.company && <p className="text-sm mt-0.5" style={{ color: "#5E6B78" }}>{selected.company}</p>}
                    <a href={`mailto:${selected.email}`} className="text-sm mt-1 inline-block transition-colors duration-150" style={{ color: "#AD8A52" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#0C2340"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#AD8A52"; }}>
                      {selected.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button onClick={() => markRead(selected.id, !selected.read)} className="text-xs px-3 py-1.5 rounded-sm transition-all duration-150" style={{ background: selected.read ? "#F6F7F9" : "rgba(173,138,82,0.1)", color: selected.read ? "#9FB0BE" : "#AD8A52", border: `1px solid ${selected.read ? "#E3E7EB" : "rgba(173,138,82,0.3)"}` }}>
                      {selected.read ? "Mark unread" : "Mark read"}
                    </button>
                    <a href={`mailto:${selected.email}?subject=Re: Your Keystone enquiry`} className="text-xs px-3 py-1.5 rounded-sm transition-colors duration-150" style={{ background: "#0C2340", color: "#fff" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#0d2a4d"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#0C2340"; }}>
                      Reply
                    </a>
                    <button onClick={() => deleteSubmission(selected.id)} className="text-xs px-3 py-1.5 rounded-sm transition-colors duration-150" style={{ background: "rgba(220,80,80,0.08)", color: "rgba(200,60,60,0.8)", border: "1px solid rgba(220,80,80,0.2)" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,80,80,0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(220,80,80,0.08)"; }}>
                      Delete
                    </button>
                  </div>
                </div>
                <div className="px-8 py-4 flex items-center gap-6" style={{ borderBottom: "1px solid #E3E7EB", background: "#FAFBFC" }}>
                  {[{ label: "Received", value: formatDate(selected.receivedAt) }, { label: "Status", value: selected.read ? "Read" : "Unread" }].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs uppercase mb-0.5" style={{ color: "#9FB0BE", letterSpacing: "0.18em" }}>{label}</p>
                      <p className="text-sm font-medium" style={{ color: "#1F252D" }}>{value}</p>
                    </div>
                  ))}
                </div>
                <div className="px-8 py-7">
                  <p className="text-xs font-semibold uppercase mb-4" style={{ color: "#9FB0BE", letterSpacing: "0.2em" }}>Message</p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#1F252D", lineHeight: "1.8" }}>{selected.challenge}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xs font-semibold uppercase" style={{ color: "#5E6B78", letterSpacing: "0.22em" }}>Client Accounts</h2>
              <p className="text-xs mt-1" style={{ color: "#9FB0BE" }}>{clients.length} account{clients.length !== 1 ? "s" : ""} stored</p>
            </div>
            <button
              onClick={openAdd}
              className="text-xs px-4 py-2 rounded-sm font-semibold transition-colors duration-200"
              style={{ background: "#0C2340", color: "#fff", letterSpacing: "0.06em" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#0d2a4d"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#0C2340"; }}
            >
              + Add Account
            </button>
          </div>

          {showForm && (
            <div className="mb-6 p-6 rounded-sm" style={{ background: "#fff", border: "1px solid #E3E7EB" }}>
              <h3 className="text-sm font-semibold mb-5" style={{ color: "#0C2340", letterSpacing: "-0.01em" }}>
                {editingId ? "Edit Account" : "New Client Account"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "clientName", label: "Client Name", placeholder: "e.g. Acme Corp", type: "text" },
                  { key: "email", label: "Gmail Address", placeholder: "client@gmail.com", type: "email" },
                  { key: "password", label: "Password", placeholder: "Gmail password", type: "text" },
                  { key: "notes", label: "Notes", placeholder: "Optional notes", type: "text" },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold uppercase mb-2" style={{ color: "rgba(94,107,120,0.8)", letterSpacing: "0.18em" }}>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-sm text-sm outline-none"
                      style={{ background: "#F6F7F9", border: "1px solid #E3E7EB", color: "#1F252D", fontFamily: "inherit" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(173,138,82,0.5)"; e.currentTarget.style.background = "#fff"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#E3E7EB"; e.currentTarget.style.background = "#F6F7F9"; }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-5">
                <button
                  onClick={saveClient}
                  className="text-xs px-5 py-2.5 rounded-sm font-semibold transition-colors duration-200"
                  style={{ background: "#AD8A52", color: "#fff", letterSpacing: "0.06em" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#C2A065"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#AD8A52"; }}
                >
                  {editingId ? "Save Changes" : "Add Account"}
                </button>
                <button
                  onClick={() => { setShowForm(false); setEditingId(null); }}
                  className="text-xs px-4 py-2.5 rounded-sm transition-colors duration-200"
                  style={{ background: "#F6F7F9", color: "#5E6B78", border: "1px solid #E3E7EB" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#E3E7EB"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#F6F7F9"; }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {clientsLoading ? (
            <p className="text-sm text-center py-16" style={{ color: "#9FB0BE" }}>Loading...</p>
          ) : clients.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 rounded-sm" style={{ border: "1px dashed #E3E7EB" }}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#9FB0BE" strokeWidth="1.5">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
                <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
              </svg>
              <p className="text-sm" style={{ color: "#9FB0BE" }}>No client accounts yet</p>
            </div>
          ) : (
            <div className="rounded-sm overflow-hidden" style={{ border: "1px solid #E3E7EB" }}>
              <table className="w-full" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#FAFBFC", borderBottom: "1px solid #E3E7EB" }}>
                    {["Client Name", "Gmail", "Password", "Notes", "Added", ""].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase" style={{ color: "#9FB0BE", letterSpacing: "0.18em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c, i) => (
                    <tr key={c.id} style={{ background: i % 2 === 0 ? "#fff" : "#FAFBFC", borderBottom: "1px solid #F0F2F4" }}>
                      <td className="px-5 py-4 text-sm font-medium" style={{ color: "#0C2340", whiteSpace: "nowrap" }}>{c.clientName}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm" style={{ color: "#1F252D" }}>{c.email}</span>
                          <button
                            onClick={() => handleCopy(c.email, `email-${c.id}`)}
                            title="Copy email"
                            style={{ color: copied === `email-${c.id}` ? "#AD8A52" : "#C2C9D0", background: "none", border: "none", cursor: "pointer", padding: "2px", lineHeight: 1, flexShrink: 0 }}
                          >
                            {copied === `email-${c.id}` ? (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            ) : (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono" style={{ color: "#1F252D", letterSpacing: revealedIds.has(c.id) ? "0" : "0.1em" }}>
                            {revealedIds.has(c.id) ? c.password : "••••••••"}
                          </span>
                          <button onClick={() => toggleReveal(c.id)} title={revealedIds.has(c.id) ? "Hide" : "Reveal"} style={{ color: "#C2C9D0", background: "none", border: "none", cursor: "pointer", padding: "2px", lineHeight: 1, flexShrink: 0 }}>
                            {revealedIds.has(c.id) ? (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                            ) : (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                            )}
                          </button>
                          <button onClick={() => handleCopy(c.password, `pw-${c.id}`)} title="Copy password" style={{ color: copied === `pw-${c.id}` ? "#AD8A52" : "#C2C9D0", background: "none", border: "none", cursor: "pointer", padding: "2px", lineHeight: 1, flexShrink: 0 }}>
                            {copied === `pw-${c.id}` ? (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            ) : (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm" style={{ color: "#9FB0BE" }}>{c.notes || "—"}</td>
                      <td className="px-5 py-4 text-xs" style={{ color: "#C2C9D0", whiteSpace: "nowrap" }}>{formatDate(c.createdAt)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openEdit(c)}
                            className="text-xs px-3 py-1.5 rounded-sm transition-colors duration-200"
                            style={{ background: "#F6F7F9", color: "#5E6B78", border: "1px solid #E3E7EB" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#E3E7EB"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "#F6F7F9"; }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteClient(c.id)}
                            className="text-xs px-3 py-1.5 rounded-sm transition-colors duration-200"
                            style={{ background: "rgba(220,80,80,0.08)", color: "rgba(200,60,60,0.8)", border: "1px solid rgba(220,80,80,0.2)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,80,80,0.15)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(220,80,80,0.08)"; }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
