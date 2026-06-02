"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  { n: "01", tag: "Brand Identity" },
  { n: "02", tag: "Web Development" },
  { n: "03", tag: "Cybersecurity" },
  { n: "04", tag: "Brand Identity" },
  { n: "05", tag: "Web Development" },
  { n: "06", tag: "Full Service" },
];

export function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="work"
      className="py-24 md:py-32"
      style={{ background: "#fff", borderTop: "1px solid var(--hair)" }}
    >
      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium uppercase"
            style={{ color: "var(--mist)", letterSpacing: "0.28em" }}
          >
            Selected Work
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-xs"
            style={{ color: "var(--mist)" }}
          >
            100+ projects. Case studies coming soon.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex flex-col justify-between p-8 cursor-default"
              style={{
                aspectRatio: "1",
                border: "1px solid var(--hair)",
                marginTop: "-1px",
                marginLeft: "-1px",
                background: hovered === p.n ? "var(--paper)" : "#fff",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={() => setHovered(p.n)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className="text-xs font-medium"
                style={{
                  color: hovered === p.n ? "var(--navy)" : "var(--mist)",
                  letterSpacing: "0.1em",
                  transition: "color 0.2s ease",
                }}
              >
                {p.n}
              </span>
              <div>
                <p
                  className="text-xs font-semibold uppercase mb-1.5"
                  style={{
                    color: hovered === p.n ? "#AD8A52" : "var(--mist)",
                    letterSpacing: "0.18em",
                    transition: "color 0.2s ease",
                  }}
                >
                  {p.tag}
                </p>
                <p className="text-xs" style={{ color: "var(--hair)" }}>
                  Coming soon
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
