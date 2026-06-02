"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    n: "01",
    title: "Brand Identity",
    desc: "From logo to social presence. We build visual identities that are distinct, consistent, and built to last across every touchpoint.",
    tags: ["Logo Design", "Brand Guidelines", "Social Branding", "Stationery"],
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="4" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.51 7.51l2.83 2.83M21.66 21.66l2.83 2.83M7.51 24.49l2.83-2.83M21.66 10.34l2.83-2.83" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Web Development",
    desc: "Fast, modern, responsive websites engineered with care. No templates — every site is designed and built from the ground up.",
    tags: ["Custom Design", "Mobile-First", "SEO", "Performance"],
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="28" height="20" rx="2" />
        <path d="M10 28h12M16 24v4M10 13l3 3-3 3M17 19h5" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Cybersecurity Testing",
    desc: "We test your site the way real attackers would. Vulnerabilities found, documented, and remediated before they become a problem.",
    tags: ["Penetration Testing", "OWASP Top 10", "Vulnerability Report", "SSL Audit"],
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 2L4 7v9c0 8 6.67 13.33 12 15 5.33-1.67 12-7 12-15V7L16 2z" />
        <path d="M11 16l3 3 7-7" />
      </svg>
    ),
  },
];

type Pillar = typeof pillars[0];

function TiltCard({ p, i, inView }: { p: Pillar; i: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Per-card mouse position for 3D tilt + spotlight
  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const rotateX = useSpring(rawRX, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(rawRY, { stiffness: 180, damping: 24 });

  // Dynamic spotlight follows cursor inside the card
  const spotlight = useMotionTemplate`radial-gradient(200px circle at ${glowX}% ${glowY}%, rgba(173,138,82,0.1), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rawRX.set((y - 0.5) * -9);
    rawRY.set((x - 0.5) * 9);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const handleMouseLeave = () => {
    rawRX.set(0);
    rawRY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: i * 0.12,
      }}
      className="pillar-card relative flex flex-col overflow-hidden"
      style={{
        rotateX,
        rotateY,
        transformPerspective: "1100px",
        transformStyle: "preserve-3d",
        background: "rgba(10,29,53,0.95)",
        cursor: "default",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic cursor spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotlight }}
      />

      {/* Gold edge glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(173,138,82,0)",
          transition: "box-shadow 0.3s ease",
        }}
        whileHover={{ boxShadow: "inset 0 0 0 1px rgba(173,138,82,0.3)" } as never}
      />

      {/* Ghost number */}
      <span
        className="absolute font-bold select-none pointer-events-none"
        style={{
          fontSize: "10rem",
          color: "rgba(255,255,255,0.025)",
          lineHeight: 1,
          bottom: "-16px",
          right: "-8px",
          letterSpacing: "-0.05em",
        }}
      >
        {p.n}
      </span>

      {/* Animated number indicator */}
      <motion.div
        className="mb-6 md:mb-8 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 + i * 0.12 }}
      >
        {/* Icon */}
        <div style={{ color: "rgba(255,255,255,0.28)" }}>{p.icon}</div>

        {/* Number badge */}
        <span
          className="text-xs font-semibold"
          style={{
            color: "rgba(173,138,82,0.55)",
            letterSpacing: "0.14em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {p.n}
        </span>
      </motion.div>

      {/* Content */}
      <div className="flex flex-col gap-5 relative z-10">
        {/* Animated title line */}
        <div>
          <div style={{ overflow: "hidden" }}>
            <motion.h3
              className="font-semibold text-white mb-3"
              style={{
                fontSize: "clamp(1.4rem,2vw,1.75rem)",
                letterSpacing: "-0.02em",
                lineHeight: "1.2",
              }}
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.18 + i * 0.12 }}
            >
              {p.title}
            </motion.h3>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.46)", lineHeight: "1.82" }}
          >
            {p.desc}
          </p>
        </div>

        {/* Tags */}
        <div
          className="flex flex-wrap gap-2 pt-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {p.tags.map((tag, ti) => (
            <motion.span
              key={tag}
              className="text-xs px-2.5 py-1"
              style={{
                color: "rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.08)",
                letterSpacing: "0.05em",
                transition: "color 0.25s ease, border-color 0.25s ease",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.12 + ti * 0.05 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#C2A065";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(173,138,82,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function WhyStructure() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section
      id="what-we-do"
      className="py-16 md:py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#0C2340", borderTop: "1px solid rgba(159,176,190,0.08)" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(173,138,82,0.04), transparent 65%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(12,35,64,0.9), transparent 70%)",
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-10 relative">

        {/* Header */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              className="font-semibold text-white"
              style={{ fontSize: "clamp(1.9rem,3.5vw,2.8rem)", letterSpacing: "-0.025em", lineHeight: "1.1" }}
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              Three disciplines.<br />One team.
            </motion.h2>
          </div>

          <motion.p
            className="text-sm md:max-w-xs"
            style={{ color: "rgba(255,255,255,0.38)", lineHeight: "1.82" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Every engagement is senior-led. No handoffs to juniors, no outsourcing.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(159,176,190,0.08)" }}>
          {pillars.map((p, i) => (
            <TiltCard key={p.n} p={p} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
