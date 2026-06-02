"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#fff", borderTop: "1px solid var(--hair)" }}
    >
      {/* Subtle parallax bg wash */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(12,35,64,0.03), transparent 60%)", y: bgY }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-10 relative">
        <div className="flex items-end justify-between mb-16 gap-8">
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              className="font-semibold"
              style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)", color: "var(--navy)", letterSpacing: "-0.02em", lineHeight: "1.1" }}
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
            className="text-xs flex-shrink-0"
            style={{ color: "var(--mist)" }}
          >
            Case studies coming soon.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3">
          {projects.map((p, i) => {
            // Stagger each cell from a slightly different direction
            const col = i % 3;
            const row = Math.floor(i / 3);
            const initialX = col === 0 ? -16 : col === 2 ? 16 : 0;
            const initialY = row === 0 ? -16 : 16;

            return (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, x: initialX, y: initialY, scale: 0.97 }}
                animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                className="group flex flex-col justify-between p-8 cursor-default relative overflow-hidden"
                style={{
                  aspectRatio: "1",
                  border: "1px solid var(--hair)",
                  marginTop: "-1px",
                  marginLeft: "-1px",
                  background: "#fff",
                  transition: "background 0.25s ease, box-shadow 0.25s ease",
                }}
                whileHover={{
                  background: "var(--paper)",
                  boxShadow: "inset 0 0 0 1px rgba(173,138,82,0.2)",
                } as never}
              >
                {/* Gold corner accent on hover */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0.5 origin-left"
                  style={{ background: "linear-gradient(90deg, #AD8A52, transparent)" }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 } as never}
                  transition={{ duration: 0.3 }}
                />

                <span className="text-xs font-medium" style={{ color: "var(--mist)" }}>{p.n}</span>

                <div>
                  <motion.p
                    className="text-xs font-semibold mb-1.5"
                    style={{ color: "var(--navy)", letterSpacing: "0.02em" }}
                    initial={{ y: 6, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                  >
                    {p.tag}
                  </motion.p>
                  <p className="text-xs" style={{ color: "var(--hair)" }}>Coming soon</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
