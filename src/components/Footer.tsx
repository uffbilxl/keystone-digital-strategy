"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const sections = [
  {
    heading: "Services",
    items: [
      { label: "Brand Identity", href: "/services#brand-identity" },
      { label: "Social Media Branding", href: "/services#social-media-branding" },
      { label: "Web Development", href: "/services#web-development" },
      { label: "Cybersecurity Testing", href: "/services#cybersecurity-testing" },
      { label: "Social Media Management", href: "/services#social-media-management" },
      { label: "AI Promotional Videos", href: "/services#ai-promotional-videos" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Our Work", href: "/work" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const EMAIL = "contact@keystonedigitalstrategy.co.uk";

export function Footer() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <footer style={{ background: "#0A1E38", borderTop: "1px solid rgba(159,176,190,0.1)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <Logo variant="light" className="mb-6" />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)", maxWidth: "280px", lineHeight: "1.75" }}>
              Brand identity, web development, and cybersecurity testing. Delivered by specialists.
            </p>
            <address className="not-italic mt-5" style={{ color: "rgba(255,255,255,0.28)", fontSize: "12px", lineHeight: "1.9", letterSpacing: "0.02em" }}>
              Keystone Digital Strategy Limited<br />
              3rd Floor, 45 Albemarle Street<br />
              Mayfair, London<br />
              W1S 4JL
            </address>
            <div className="flex items-center gap-2 mt-5">
              <a
                href={`mailto:${EMAIL}`}
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.32)", letterSpacing: "0.04em" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#C2A065"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.32)"; }}
              >
                {EMAIL}
              </a>
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
            </div>
          </div>

          {/* Links */}
          {sections.map((section) => (
            <div key={section.heading}>
              <h3
                className="text-xs font-semibold uppercase mb-5"
                style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.28em" }}
              >
                {section.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.22)", letterSpacing: "0.04em" }}>
            © {new Date().getFullYear()} Keystone Digital Strategy. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.22)", letterSpacing: "0.04em" }}>
            45 Albemarle Street, Mayfair, London W1S 4JL
          </p>
        </div>
      </div>
    </footer>
  );
}
