"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const sectors = [
  {
    name: "Financial Services",
    desc: "Strategy and operating model design for banks, insurers, asset managers, and emerging fintech platforms navigating regulatory complexity and digital disruption.",
    icon: "FS",
  },
  {
    name: "Healthcare",
    desc: "Structural alignment for integrated health systems, providers, and life sciences organisations managing transformation across clinical, operational, and digital dimensions.",
    icon: "HC",
  },
  {
    name: "Government",
    desc: "Strategic architecture and operating model reform for public sector organisations delivering complex services across distributed institutions.",
    icon: "GV",
  },
  {
    name: "Technology",
    desc: "Growth architecture and organisational design for scaling technology businesses - from Series B through enterprise transformation and market expansion.",
    icon: "TK",
  },
  {
    name: "Energy",
    desc: "Strategy and transformation leadership for energy majors and utilities managing the structural shift to sustainable, distributed, and digital energy systems.",
    icon: "EN",
  },
  {
    name: "Enterprise",
    desc: "Cross-industry strategic advisory for complex, multi-business enterprise organisations managing portfolio strategy, capital allocation, and operating model coherence.",
    icon: "EX",
  },
];

function SectorCard({ sector, index }: { sector: typeof sectors[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: (index % 3) * 0.1 }}
      className="group relative flex flex-col gap-4 p-7 rounded-sm overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid var(--hair)",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(12,35,64,0.15)";
        el.style.boxShadow = "0 4px 20px rgba(12,35,64,0.06)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--hair)";
        el.style.boxShadow = "none";
        el.style.transform = "none";
      }}
    >
      {/* Monogram */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex items-center justify-center rounded-sm"
          style={{
            width: "36px",
            height: "36px",
            background: "rgba(12,35,64,0.04)",
            border: "1px solid rgba(12,35,64,0.08)",
          }}
        >
          <span
            className="text-xs font-semibold"
            style={{ color: "var(--navy)", letterSpacing: "0.06em" }}
          >
            {sector.icon}
          </span>
        </div>
        <h3
          className="font-semibold"
          style={{ color: "var(--navy)", fontSize: "1rem", letterSpacing: "-0.01em" }}
        >
          {sector.name}
        </h3>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: "var(--steel)", lineHeight: "1.72" }}>
        {sector.desc}
      </p>

      {/* Hover indicator */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-full transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, #AD8A52, transparent)", opacity: 0 }}
      />
    </motion.div>
  );
}

export function Sectors() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="sectors"
      style={{ background: "var(--paper)", borderTop: "1px solid var(--hair)" }}
      className="py-28 md:py-36"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div ref={headerRef} className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="block text-xs font-semibold uppercase mb-4"
            style={{ color: "#AD8A52", letterSpacing: "0.34em" }}
          >
            Sectors
          </motion.span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.06 }}
              className="font-semibold"
              style={{
                fontSize: "clamp(2rem,3.5vw,2.75rem)",
                color: "var(--navy)",
                letterSpacing: "-0.018em",
                lineHeight: "1.15",
              }}
            >
              Where we operate
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm md:max-w-xs"
              style={{ color: "var(--steel)" }}
            >
              Complex organisations across six sectors trust Keystone to build the structures that sustain their ambitions.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((s, i) => (
            <SectorCard key={s.name} sector={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
