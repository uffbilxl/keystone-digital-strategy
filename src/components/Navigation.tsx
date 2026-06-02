"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(12,35,64,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(159,176,190,0.1)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo variant="light" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-sm font-medium group"
                  style={{
                    color: active ? "#fff" : "rgba(255,255,255,0.5)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = active ? "#fff" : "rgba(255,255,255,0.5)"; }}
                >
                  {link.label}
                  {/* Active underline */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px"
                    style={{ width: active ? "100%" : "0", background: "#AD8A52", transition: "width 0.25s ease" }}
                  />
                  {/* Hover underline */}
                  {!active && (
                    <span
                      className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full"
                      style={{ background: "rgba(173,138,82,0.4)", transition: "width 0.25s ease" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="contact-btn hidden md:inline-flex items-center px-4 py-2 text-sm font-medium"
              style={{ color: "#C2A065", borderRadius: "3px" }}
            >
              Contact Us
            </Link>

            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="block w-5 h-px transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.8)", transform: menuOpen ? "rotate(45deg) translate(3px,4px)" : "none" }} />
              <span className="block w-5 h-px transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.8)", opacity: menuOpen ? 0 : 1 }} />
              <span className="block w-5 h-px transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.8)", transform: menuOpen ? "rotate(-45deg) translate(3px,-4px)" : "none" }} />
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
          background: "rgba(10,30,56,0.98)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(159,176,190,0.1)",
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium"
              style={{ color: isActive(link.href) ? "#fff" : "rgba(255,255,255,0.6)" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium mt-2"
            style={{
              background: "rgba(173,138,82,0.12)",
              border: "1px solid rgba(173,138,82,0.35)",
              color: "#C2A065",
            }}
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </>
  );
}
