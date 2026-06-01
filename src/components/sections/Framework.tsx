"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stages = [
  {
    n: "01",
    label: "Discover",
    desc: "Understand the current state with depth and rigour. Context, constraints, and the critical questions that need answering.",
  },
  {
    n: "02",
    label: "Define",
    desc: "Crystallise the strategic intent. What success looks like, what it requires, and what must change to make it possible.",
  },
  {
    n: "03",
    label: "Align",
    desc: "Build coherence across leadership. Decisions, priorities, and accountability aligned before execution begins.",
  },
  {
    n: "04",
    label: "Build",
    desc: "Translate strategy into a structured operating architecture. Roles, processes, systems, and governance designed for the goal.",
  },
  {
    n: "05",
    label: "Sustain",
    desc: "Embed the capability to renew and adapt. Structures that hold under pressure and evolve without losing coherence.",
  },
];

export function Framework() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-12% 0px" });

  return (
    <section
      id="framework"
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "var(--navy)" }}
    >
      {/* Grid overlay */}
      <div className="grid-overlay" style={{ opacity: 0.4 }} />

      {/* Gold glow top-right */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle at 75% 15%, rgba(173,138,82,0.08), transparent 65%)",
        }}
      />

      <div ref={sectionRef} className="relative max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-20 md:mb-24 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="block text-xs font-semibold uppercase mb-4"
            style={{ color: "#C2A065", letterSpacing: "0.34em" }}
          >
            Methodology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.07 }}
            className="font-semibold text-white"
            style={{
              fontSize: "clamp(2rem,3.5vw,2.75rem)",
              letterSpacing: "-0.018em",
              lineHeight: "1.15",
              marginBottom: "16px",
            }}
          >
            The Keystone Framework
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="text-sm leading-relaxed mx-auto"
            style={{ color: "rgba(255,255,255,0.48)", maxWidth: "520px" }}
          >
            A five-stage methodology for building the structural architecture that organisations
            can depend on - from diagnosis through to sustained performance.
          </motion.p>
        </div>

        {/* Connector line (desktop) */}
        <div className="hidden md:block absolute left-[80px] right-[80px] pointer-events-none" style={{ top: "calc(50% + 48px)", zIndex: 0 }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.4 }}
            style={{
              height: "1px",
              background: "linear-gradient(90deg, rgba(173,138,82,0.2), rgba(173,138,82,0.5), rgba(173,138,82,0.2))",
              transformOrigin: "left",
            }}
          />
        </div>

        {/* Stages */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.n}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.3 + i * 0.1 }}
              className="group flex flex-col items-center md:items-start text-center md:text-left relative"
            >
              {/* Node */}
              <div
                className="flex items-center justify-center mb-6 flex-shrink-0 z-10"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(173,138,82,0.12)",
                  border: "1px solid rgba(173,138,82,0.35)",
                }}
              >
                <span
                  className="font-semibold text-xs"
                  style={{ color: "#C2A065", letterSpacing: "0.1em" }}
                >
                  {stage.n}
                </span>
              </div>

              {/* Gold accent on hover */}
              <motion.div
                initial={false}
                className="h-px w-6 mb-4 hidden md:block"
                style={{ background: "rgba(173,138,82,0.35)" }}
              />

              <h3
                className="font-semibold mb-3"
                style={{ color: "#fff", fontSize: "1rem", letterSpacing: "-0.01em" }}
              >
                {stage.label}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.75" }}
              >
                {stage.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ color: "#C2A065" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C2A065"; }}
          >
            Discuss a bespoke engagement
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
