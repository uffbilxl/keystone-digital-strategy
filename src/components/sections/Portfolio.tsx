"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Placeholder - user will provide real projects
const projects = [
  { n: "01", label: "Coming Soon", tag: "Brand Identity", locked: true },
  { n: "02", label: "Coming Soon", tag: "Web Development", locked: true },
  { n: "03", label: "Coming Soon", tag: "Cybersecurity", locked: true },
  { n: "04", label: "Coming Soon", tag: "Brand Identity", locked: true },
  { n: "05", label: "Coming Soon", tag: "Web Development", locked: true },
  { n: "06", label: "Coming Soon", tag: "Full Service", locked: true },
];

export function Portfolio() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="work"
      style={{ background: "var(--paper)", borderTop: "1px solid var(--hair)" }}
      className="py-28 md:py-36"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div ref={headerRef} className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="block text-xs font-semibold uppercase mb-4"
              style={{ color: "#AD8A52", letterSpacing: "0.34em" }}
            >
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.07 }}
              className="font-semibold"
              style={{
                fontSize: "clamp(2rem,3.5vw,2.75rem)",
                color: "var(--navy)",
                letterSpacing: "-0.018em",
                lineHeight: "1.15",
              }}
            >
              10 projects. All successful.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm md:max-w-xs"
            style={{ color: "var(--steel)" }}
          >
            Case studies dropping soon. Each project tells its own story.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
                delay: (i % 3) * 0.08 + 0.1,
              }}
              className="group relative overflow-hidden rounded-sm"
              style={{
                background: "#fff",
                border: "1px solid var(--hair)",
                aspectRatio: "4/3",
                minHeight: "220px",
              }}
            >
              {/* Background pattern */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "linear-gradient(90deg, rgba(12,35,64,0.03) 1px, transparent 1px), linear-gradient(rgba(12,35,64,0.03) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Lock icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "rgba(12,35,64,0.06)",
                    border: "1px solid rgba(12,35,64,0.1)",
                  }}
                >
                  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="var(--mist)" strokeWidth="1.5">
                    <rect x="4" y="9" width="12" height="9" rx="1.5" />
                    <path d="M7 9V6.5a3 3 0 0 1 6 0V9" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold" style={{ color: "var(--mist)" }}>
                    Coming Soon
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--hair)" }}>
                    {p.n} / {projects.length.toString().padStart(2, "0")}
                  </p>
                </div>
              </div>

              {/* Tag */}
              <div className="absolute bottom-4 left-4">
                <span
                  className="text-xs font-semibold uppercase px-2.5 py-1 rounded-sm"
                  style={{
                    background: "rgba(173,138,82,0.08)",
                    color: "#AD8A52",
                    letterSpacing: "0.16em",
                    border: "1px solid rgba(173,138,82,0.18)",
                  }}
                >
                  {p.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
