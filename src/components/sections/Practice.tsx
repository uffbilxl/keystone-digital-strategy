"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
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

  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const rotateX = useSpring(rawRX, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(rawRY, { stiffness: 180, damping: 24 });
  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${glowX}% ${glowY}%, rgba(12,35,64,0.05), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rawRX.set((y - 0.5) * -7);
    rawRY.set((x - 0.5) * 7);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="flex flex-col p-6 md:p-8 cursor-default relative overflow-hidden"
      style={{
        background: "#fff",
        borderTop: "2px solid var(--hair)",
        borderLeft: "1px solid var(--hair)",
        borderRight: "1px solid var(--hair)",
        borderBottom: "1px solid var(--hair)",
        rotateX,
        rotateY,
        transformPerspective: "1000px",
        willChange: "transform",
        transition: "border-color 0.25s ease, box-shadow 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rawRX.set(0); rawRY.set(0); glowX.set(50); glowY.set(50); }}
      whileHover={{
        borderTopColor: "#AD8A52",
        boxShadow: "0 12px 40px rgba(12,35,64,0.1)",
      } as never}
    >
      {/* Cursor spotlight */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />

      {/* Header */}
      <div className="flex items-start justify-between mb-7 relative z-10">
        <span className="text-xs font-medium" style={{ color: "var(--mist)" }}>{svc.index}</span>
        <div style={{ color: "var(--navy)" }}>{svc.icon}</div>
      </div>

      <div style={{ overflow: "hidden" }} className="relative z-10">
        <motion.h3
          className="font-semibold mb-2"
          style={{ color: "var(--navy)", fontSize: "1.1rem", letterSpacing: "-0.01em" }}
          initial={{ y: "105%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 + index * 0.1 }}
        >
          {svc.title}
        </motion.h3>
      </div>
      <p className="text-sm mb-7 relative z-10" style={{ color: "var(--steel)" }}>{svc.summary}</p>

      <ul className="flex flex-col gap-2.5 flex-1 mb-7 relative z-10">
        {svc.outcomes.map((o, oi) => (
          <motion.li
            key={o}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 + oi * 0.05 }}
          >
            <span className="flex-shrink-0 mt-2" style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#AD8A52", display: "block" }} />
            <span className="text-sm" style={{ color: "var(--charcoal)", lineHeight: "1.6" }}>{o}</span>
          </motion.li>
        ))}
      </ul>

      <div className="pt-6 relative z-10" style={{ borderTop: "1px solid var(--hair)" }}>
        <p className="text-xs" style={{ color: "var(--mist)", lineHeight: "1.6" }}>{svc.engagement}</p>
      </div>
    </motion.div>
  );
}

export function Practice() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="services" style={{ background: "var(--paper)", borderTop: "1px solid var(--hair)" }} className="py-16 md:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div ref={headerRef} className="flex items-end justify-between mb-14 gap-8">
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              className="font-semibold"
              style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)", color: "var(--navy)", letterSpacing: "-0.02em", lineHeight: "1.1" }}
              initial={{ y: "105%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              What we offer
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="text-xs font-medium transition-opacity duration-200 hover:opacity-50 flex-shrink-0"
            style={{ color: "var(--navy)" }}
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
