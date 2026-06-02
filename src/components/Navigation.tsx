"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

const links = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "About", href: "#about" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(12, 35, 64, 0.96)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(159,176,190,0.12)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex-shrink-0"
          >
            <Logo variant="light" />
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-xs font-medium uppercase group"
                style={{ color: "rgba(255,255,255,0.62)", letterSpacing: "0.18em", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.62)")}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full"
                  style={{ background: "#AD8A52", transition: "width 0.25s ease" }}
                />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="contact-btn hidden md:inline-flex items-center px-4 py-2 text-xs font-semibold uppercase"
              style={{
                letterSpacing: "0.18em",
                color: "#C2A065",
                borderRadius: "3px",
              }}
            >
              Contact Us
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  transform: menuOpen ? "rotate(45deg) translate(3px, 4px)" : "none",
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  transform: menuOpen ? "rotate(-45deg) translate(3px, -4px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -10 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
        className="fixed top-16 left-0 right-0 z-40 md:hidden"
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
          background: "rgba(10, 30, 56, 0.98)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(159,176,190,0.12)",
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.72)", letterSpacing: "0.22em" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold uppercase tracking-widest rounded mt-2"
            style={{
              letterSpacing: "0.18em",
              background: "rgba(173,138,82,0.15)",
              border: "1px solid rgba(173,138,82,0.4)",
              color: "#C2A065",
            }}
          >
            Contact Us
          </a>
        </div>
      </motion.div>
    </>
  );
}
