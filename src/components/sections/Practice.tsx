"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    index: "01",
    title: "Brand Identity",
    summary: "We craft identities that mean something.",
    outcomes: [
      "Logo design & brand mark",
      "Colour palette & typography system",
      "Social media branding & templates",
      "Brand guidelines document",
      "Business card & stationery design",
    ],
    engagement: "Delivered in 2–4 weeks. Full brand kit included.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Social Media Branding",
    summary: "Cohesive presence across every platform.",
    outcomes: [
      "Platform-specific profile & cover design",
      "Content template library",
      "Visual tone of voice guidelines",
      "Story & reel templates",
      "Launch-ready asset pack",
    ],
    engagement: "Standalone or bundled with Brand Identity. 1–2 weeks.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Web Design & Development",
    summary: "Websites that look sharp and load fast.",
    outcomes: [
      "Custom design - no templates",
      "Fully responsive, mobile-first",
      "SEO foundations built in",
      "CMS integration (if needed)",
      "Performance optimised",
    ],
    engagement: "2–6 weeks depending on scope. Hosting setup included.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M8 10l2 2-2 2M13 14h3" />
      </svg>
    ),
  },
  {
    index: "04",
    title: "Cybersecurity Testing",
    summary: "We find the holes before the attackers do.",
    outcomes: [
      "Penetration testing (web & network)",
      "Vulnerability assessment report",
      "OWASP Top 10 coverage",
      "Security header & SSL audit",
      "Remediation guidance",
    ],
    engagement: "Delivered post-build or as a standalone audit. 1–2 weeks.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

function ServiceCard({ svc, index }: { svc: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: index * 0.09 }}
      className="group flex flex-col p-8 rounded-sm"
      style={{
        background: "#fff",
        border: "1px solid var(--hair)",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(12,35,64,0.18)";
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = "0 8px 32px rgba(12,35,64,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--hair)";
        el.style.transform = "none";
        el.style.boxShadow = "none";
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <span className="text-xs font-semibold" style={{ color: "rgba(173,138,82,0.6)", letterSpacing: "0.18em" }}>
          {svc.index}
        </span>
        <div
          className="flex items-center justify-center rounded-sm"
          style={{ width: "36px", height: "36px", background: "rgba(12,35,64,0.05)", border: "1px solid rgba(12,35,64,0.08)", color: "var(--navy)" }}
        >
          {svc.icon}
        </div>
      </div>

      <h3 className="font-semibold mb-2" style={{ color: "var(--navy)", fontSize: "1.15rem", letterSpacing: "-0.012em" }}>
        {svc.title}
      </h3>
      <p className="text-sm mb-6" style={{ color: "var(--steel)" }}>{svc.summary}</p>

      <ul className="flex flex-col gap-2 flex-1 mb-6">
        {svc.outcomes.map((o) => (
          <li key={o} className="flex items-start gap-2.5">
            <span className="mt-1.5 flex-shrink-0" style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#AD8A52", display: "block" }} />
            <span className="text-sm" style={{ color: "var(--charcoal)" }}>{o}</span>
          </li>
        ))}
      </ul>

      <div className="pt-5" style={{ borderTop: "1px solid var(--hair)" }}>
        <p className="text-xs" style={{ color: "var(--mist)" }}>{svc.engagement}</p>
      </div>
    </motion.div>
  );
}

export function Practice() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="services" style={{ background: "var(--paper)", borderTop: "1px solid var(--hair)" }} className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div ref={headerRef} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="block text-xs font-semibold uppercase mb-4"
              style={{ color: "#AD8A52", letterSpacing: "0.34em" }}
            >
              Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.07 }}
              className="font-semibold"
              style={{ fontSize: "clamp(2rem,3.5vw,2.75rem)", color: "var(--navy)", letterSpacing: "-0.018em", lineHeight: "1.15" }}
            >
              What we offer
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm md:max-w-xs"
            style={{ color: "var(--steel)" }}
          >
            Everything you need to launch, grow, and protect your digital presence - delivered by specialists.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc, i) => <ServiceCard key={svc.index} svc={svc} index={i} />)}
        </div>
      </div>
    </section>
  );
}
