"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  const [form, setForm] = useState({ name: "", company: "", email: "", challenge: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("contact@keystonedigitalstrategy.co.uk").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(159,176,190,0.2)",
    borderRadius: "2px",
    padding: "12px 14px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "rgba(159,176,190,0.7)",
    marginBottom: "8px",
  };

  return (
    <section
      id="contact"
      className="relative py-16 md:py-28 lg:py-36 overflow-hidden"
      style={{ background: "#0C2340", borderTop: "none" }}
    >
      <div className="grid-overlay" style={{ opacity: 0.35 }} />
      <div className="absolute pointer-events-none" style={{ bottom: "-100px", left: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(173,138,82,0.07), transparent 70%)" }} />

      <div ref={sectionRef} className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">

          {/* Left */}
          <div>
            <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
              <motion.h2
                initial={{ y: "105%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="font-semibold text-white"
                style={{ fontSize: "clamp(2rem,3.5vw,2.75rem)", letterSpacing: "-0.018em", lineHeight: "1.15" }}
              >
                Let&apos;s work together.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="text-sm leading-relaxed mb-12"
              style={{ color: "rgba(255,255,255,0.5)", maxWidth: "380px", lineHeight: "1.8" }}
            >
              Whether you need a brand built from scratch, a website developed, or your existing site tested for vulnerabilities - we are ready to help.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-5"
            >
              {[
                {
                  label: "Email",
                  value: "contact@keystonedigitalstrategy.co.uk",
                  icon: (
                    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 5l8 6 8-6M2 5h16v11H2V5z" />
                    </svg>
                  ),
                },
                {
                  label: "Serving",
                  value: "Clients Worldwide",
                  icon: (
                    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="10" cy="10" r="8" />
                      <path d="M2 10h16M10 2a12 12 0 0 1 0 16M10 2a12 12 0 0 0 0 16" />
                    </svg>
                  ),
                },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-start gap-3">
                  <div
                    className="flex items-center justify-center rounded-sm flex-shrink-0 mt-0.5"
                    style={{ width: "32px", height: "32px", background: "rgba(173,138,82,0.1)", border: "1px solid rgba(173,138,82,0.22)", color: "#C2A065" }}
                  >
                    {icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs uppercase" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>{label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>{value}</span>
                      {label === "Email" && (
                        <button
                          onClick={copyEmail}
                          title={copied ? "Copied!" : "Copy email"}
                          style={{ color: copied ? "#C2A065" : "rgba(255,255,255,0.28)", background: "none", border: "none", cursor: "pointer", padding: "2px", lineHeight: 1, transition: "color 0.2s" }}
                          onMouseEnter={(e) => { if (!copied) e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                          onMouseLeave={(e) => { if (!copied) e.currentTarget.style.color = "rgba(255,255,255,0.28)"; }}
                        >
                          {copied ? (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.15 }}
          >
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center text-center gap-6 p-12 rounded-sm h-full"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(173,138,82,0.25)", minHeight: "400px" }}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: "56px", height: "56px", background: "rgba(173,138,82,0.12)", border: "1px solid rgba(173,138,82,0.35)" }}
                >
                  <svg viewBox="0 0 20 20" width="22" height="22" fill="none" stroke="#C2A065" strokeWidth="2">
                    <path d="M4 10l4 4 8-8" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">Message received.</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>We will be in touch within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-5 md:p-8 rounded-sm"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(159,176,190,0.12)" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(173,138,82,0.5)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(159,176,190,0.2)"; }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Optional" style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(173,138,82,0.5)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(159,176,190,0.2)"; }} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(173,138,82,0.5)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(159,176,190,0.2)"; }} />
                </div>
                <div>
                  <label style={labelStyle}>What do you need?</label>
                  <textarea name="challenge" value={form.challenge} onChange={handleChange} required
                    placeholder="Tell us about your project - brand, website, security testing, or all three..."
                    rows={4} style={{ ...inputStyle, resize: "vertical", minHeight: "110px" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(173,138,82,0.5)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(159,176,190,0.2)"; }} />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm text-sm font-semibold transition-all duration-200"
                  style={{ background: loading ? "rgba(173,138,82,0.6)" : "#AD8A52", color: "#fff", letterSpacing: "0.08em", cursor: loading ? "not-allowed" : "pointer" }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#C2A065"; }}
                  onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#AD8A52"; }}
                >
                  {loading ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      Sending…
                    </>
                  ) : (
                    <>Send Message <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" /></svg></>
                  )}
                </button>
                <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.25)", marginTop: "-4px" }}>
                  All enquiries are treated in strict confidence.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
