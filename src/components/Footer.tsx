"use client";

import { Logo } from "./Logo";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const sections = [
  {
    heading: "Services",
    items: [
      { label: "Brand Identity", action: () => scrollTo("services") },
      { label: "Social Media Branding", action: () => scrollTo("services") },
      { label: "Web Development", action: () => scrollTo("services") },
      { label: "Cybersecurity Testing", action: () => scrollTo("services") },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About Us", action: () => scrollTo("about") },
      { label: "Our Work", action: () => scrollTo("work") },
      { label: "Contact Us", action: () => scrollTo("contact") },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ background: "#0A1E38", borderTop: "1px solid rgba(159,176,190,0.1)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo variant="light" className="mb-6" />
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)", maxWidth: "280px", lineHeight: "1.75" }}>
              Brand identity, web development, and cybersecurity testing. Delivered by specialists.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="mailto:contact@keystonedigitalstrategy.co.uk"
                className="text-xs transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C2A065")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                contact@keystonedigitalstrategy.co.uk
              </a>
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
                    <button
                      onClick={item.action}
                      className="text-sm text-left transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.48)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.48)")}
                    >
                      {item.label}
                    </button>
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
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
            © {new Date().getFullYear()} Keystone Digital Strategy. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
            Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
