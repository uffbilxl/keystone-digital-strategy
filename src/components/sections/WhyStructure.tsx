"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const pillars = [
  {
    n: "01",
    title: "Brand Identity",
    desc: "From logo to social presence. We build visual identities that are distinct, consistent, and built to last across every touchpoint.",
    tags: ["Logo Design", "Brand Guidelines", "Social Branding", "Stationery"],
  },
  {
    n: "02",
    title: "Web Development",
    desc: "Fast, modern, responsive websites engineered with care. No templates — every site is designed and built from the ground up.",
    tags: ["Custom Design", "Mobile-First", "SEO", "Performance"],
  },
  {
    n: "03",
    title: "Cybersecurity Testing",
    desc: "We test your site the way real attackers would. Vulnerabilities found, documented, and remediated before they become a problem.",
    tags: ["Penetration Testing", "OWASP Top 10", "Vulnerability Report", "SSL Audit"],
  },
];

export function WhyStructure() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="what-we-do"
      className="py-24 md:py-32"
      style={{ background: "#fff", borderTop: "1px solid var(--hair)" }}
    >
      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header row */}
        <div className="flex items-end justify-between mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium uppercase"
            style={{ color: "var(--mist)", letterSpacing: "0.28em" }}
          >
            What We Do
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs hidden md:block"
            style={{ color: "var(--hair)", letterSpacing: "0.12em" }}
          >
            Three disciplines
          </motion.p>
        </div>

        {/* Service rows */}
        <div>
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group"
              style={{ borderTop: "1px solid var(--hair)" }}
              onMouseEnter={() => setHovered(p.n)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="py-10 grid grid-cols-12 gap-6 transition-all duration-300"
                style={{
                  paddingLeft: hovered === p.n ? "12px" : "0",
                  borderLeft: hovered === p.n ? "2px solid #AD8A52" : "2px solid transparent",
                }}
              >
                {/* Number */}
                <div className="col-span-12 md:col-span-1 flex items-start pt-1">
                  <span
                    className="text-xs font-medium"
                    style={{
                      color: hovered === p.n ? "#AD8A52" : "var(--mist)",
                      letterSpacing: "0.1em",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {p.n}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-12 md:col-span-4">
                  <h3
                    className="font-semibold"
                    style={{
                      fontSize: "clamp(1.5rem,2.2vw,2rem)",
                      color: "var(--navy)",
                      letterSpacing: "-0.02em",
                      lineHeight: "1.2",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {p.title}
                  </h3>
                </div>

                {/* Description + tags */}
                <div className="col-span-12 md:col-span-6 flex flex-col justify-between gap-6">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--steel)", lineHeight: "1.8" }}>
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1"
                        style={{
                          color: "var(--mist)",
                          border: "1px solid var(--hair)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="col-span-12 md:col-span-1 flex items-start justify-end pt-1">
                  <span
                    className="text-lg transition-all duration-300"
                    style={{
                      color: "var(--hair)",
                      opacity: hovered === p.n ? 1 : 0,
                      transform: hovered === p.n ? "translateX(0)" : "translateX(-6px)",
                    }}
                  >
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid var(--hair)" }} />
        </div>
      </div>
    </section>
  );
}
