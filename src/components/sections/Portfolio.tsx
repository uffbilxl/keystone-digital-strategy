"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ParticleCanvas } from "../ParticleCanvas";

const projects = [
  { n: "01", tag: "Brand Identity",    note: "Identity system & full brand guidelines." },
  { n: "02", tag: "Web Development",   note: "Custom site, mobile-first, performance optimised." },
  { n: "03", tag: "Cybersecurity",     note: "Full penetration test & vulnerability report." },
  { n: "04", tag: "Brand Identity",    note: "Logo, social kit & stationery suite." },
  { n: "05", tag: "Web Development",   note: "CMS-powered site with SEO foundations." },
  { n: "06", tag: "Full Service",      note: "Brand, web & security delivered end-to-end." },
];

export function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const bgX = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "#0C2340", borderTop: "1px solid rgba(159,176,190,0.08)" }}
    >
      <ParticleCanvas count={28} />
      <div className="grid-overlay" style={{ opacity: 0.1 }} />

      <motion.div
        className="absolute pointer-events-none"
        style={{ bottom: "-5%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(173,138,82,0.05), transparent 65%)", y: bgY, x: bgX }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-14 md:mb-20 gap-8">
          <div style={{ overflow: "hidden", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
            <motion.h2
              className="font-semibold text-white"
              style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)", letterSpacing: "-0.025em", lineHeight: "1.1" }}
              initial={{ y: "105%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              100+ projects.<br />All successful.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm flex-shrink-0"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Case studies coming soon.
          </motion.p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(159,176,190,0.06)" }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="group relative overflow-hidden cursor-default"
              style={{
                background: "rgba(10,29,53,0.95)",
                padding: "40px 36px",
                minHeight: "220px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "background 0.3s ease",
              }}
              whileHover={{ background: "rgba(14,38,68,0.98)" } as never}
            >
              {/* Gold top reveal on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0"
                style={{ height: "2px", background: "linear-gradient(90deg, #AD8A52, transparent)", transformOrigin: "left", scaleX: 0 }}
                whileHover={{ scaleX: 1 } as never}
                transition={{ duration: 0.4 }}
              />

              {/* Ghost number */}
              <span
                className="absolute font-bold select-none pointer-events-none"
                style={{ fontSize: "8rem", color: "rgba(255,255,255,0.025)", lineHeight: 1, bottom: "-8px", right: "12px", letterSpacing: "-0.05em" }}
              >
                {p.n}
              </span>

              <div className="relative z-10">
                <motion.span
                  className="inline-block text-xs font-semibold mb-4 px-2.5 py-1"
                  style={{ color: "#AD8A52", border: "1px solid rgba(173,138,82,0.25)", letterSpacing: "0.04em" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                >
                  {p.tag}
                </motion.span>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.38)", lineHeight: "1.65" }}>{p.note}</p>
              </div>

              <div className="relative z-10 flex items-center justify-between mt-8">
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>Coming soon</span>
                <motion.span
                  style={{ color: "rgba(173,138,82,0)", fontSize: "1rem", transition: "color 0.2s ease" }}
                  whileHover={{ color: "#AD8A52" } as never}
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
