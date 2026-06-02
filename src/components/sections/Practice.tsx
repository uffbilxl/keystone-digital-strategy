"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

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
      "Custom design, no templates",
      "Fully responsive, mobile-first",
      "SEO foundations built in",
      "CMS integration if needed",
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
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: index * 0.08 }}
      className="flex flex-col p-8 cursor-default"
      style={{
        background: "#fff",
        borderTop: `2px solid ${hovered ? "#AD8A52" : "var(--hair)"}`,
        borderLeft: "1px solid var(--hair)",
        borderRight: "1px solid var(--hair)",
        borderBottom: "1px solid var(--hair)",
        transition: "border-color 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <span className="text-xs" style={{ color: hovered ? "#AD8A52" : "var(--mist)", letterSpacing: "0.12em", transition: "color 0.2s ease" }}>
          {svc.index}
        </span>
        <div style={{ color: hovered ? "#AD8A52" : "var(--navy)", transition: "color 0.2s ease" }}>
          {svc.icon}
        </div>
      </div>

      <h3 className="font-semibold mb-2" style={{ color: "var(--navy)", fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
        {svc.title}
      </h3>
      <p className="text-sm mb-7" style={{ color: "var(--steel)" }}>
        {svc.summary}
      </p>

      <ul className="flex flex-col gap-2.5 flex-1 mb-7">
        {svc.outcomes.map((o) => (
          <li key={o} className="flex items-start gap-3">
            <span
              className="flex-shrink-0 mt-2"
              style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#AD8A52", display: "block" }}
            />
            <span className="text-sm" style={{ color: "var(--charcoal)", lineHeight: "1.6" }}>{o}</span>
          </li>
        ))}
      </ul>

      <div className="pt-6" style={{ borderTop: "1px solid var(--hair)" }}>
        <p className="text-xs" style={{ color: "var(--mist)", lineHeight: "1.6" }}>{svc.engagement}</p>
      </div>
    </motion.div>
  );
}

export function Practice() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="services" style={{ background: "var(--paper)", borderTop: "1px solid var(--hair)" }} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div ref={headerRef} className="flex items-end justify-between mb-14 gap-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium uppercase"
            style={{ color: "var(--mist)", letterSpacing: "0.28em" }}
          >
            Services
          </motion.p>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="text-xs font-medium transition-opacity duration-200 hover:opacity-50"
            style={{ color: "var(--navy)", letterSpacing: "0.08em" }}
          >
            Get a quote →
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((svc, i) => <ServiceCard key={svc.index} svc={svc} index={i} />)}
        </div>
      </div>
    </section>
  );
}
