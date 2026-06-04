"use client";

import Link from "next/link";
import { Logo } from "./Logo";

const sections = [
  {
    heading: "Services",
    items: [
      { label: "Brand Identity", href: "/services" },
      { label: "Social Media Branding", href: "/services" },
      { label: "Web Development", href: "/services" },
      { label: "Cybersecurity Testing", href: "/services" },
      { label: "Social Media Management", href: "/services" },
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

export function Footer() {
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
            <a
              href="mailto:contact@keystonedigitalstrategy.co.uk"
              className="inline-block mt-5 text-xs"
              style={{ color: "rgba(255,255,255,0.32)", letterSpacing: "0.04em" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#C2A065"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.32)"; }}
            >
              contact@keystonedigitalstrategy.co.uk
            </a>
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
            Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
