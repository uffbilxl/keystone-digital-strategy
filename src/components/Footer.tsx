"use client";

import { Logo } from "./Logo";

const links = {
  Practice: ["Strategic Architecture", "Operating Model Design", "Transformation Leadership", "Executive Advisory"],
  Insights: ["Strategy", "Transformation", "Operating Models", "Leadership"],
  Company: ["About", "Contact", "Privacy Policy", "Terms"],
};

export function Footer() {
  return (
    <footer style={{ background: "#0A1E38", borderTop: "1px solid rgba(159,176,190,0.1)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Logo variant="light" className="mb-6" />
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)", maxWidth: "240px" }}>
              The structure everything else depends on.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C2A065")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.28em" }}
              >
                {section}
              </h3>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.48)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.48)")}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.04em" }}>
            © {new Date().getFullYear()} Keystone Digital Strategy. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "#AD8A52" }}
            />
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.04em" }}>
              Confidential · Not for distribution
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
