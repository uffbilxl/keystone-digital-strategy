"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

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

export function WhyStructure() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="what-we-do"
      className="py-24 md:py-32"
      style={{ background: "#0C2340", borderTop: "1px solid rgba(159,176,190,0.1)" }}
    >
      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase mb-16"
          style={{ color: "#AD8A52", letterSpacing: "0.28em" }}
        >
          What We Do
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(159,176,190,0.1)" }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: i * 0.1 }}
              className="relative flex flex-col p-10 overflow-hidden"
              style={{
                background: hovered === p.n ? "rgba(255,255,255,0.05)" : "rgba(10,29,53,0.95)",
                minHeight: "420px",
                transition: "background 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={() => setHovered(p.n)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Ghost number */}
              <span
                className="absolute font-bold select-none pointer-events-none"
                style={{
                  fontSize: "10rem",
                  color: hovered === p.n ? "rgba(173,138,82,0.05)" : "rgba(255,255,255,0.03)",
                  lineHeight: 1,
                  bottom: "-16px",
                  right: "-8px",
                  letterSpacing: "-0.05em",
                  transition: "color 0.3s ease",
                }}
              >
                {p.n}
              </span>

              {/* Icon */}
              <div
                className="mb-10"
                style={{ color: hovered === p.n ? "#C2A065" : "rgba(255,255,255,0.3)", transition: "color 0.3s ease" }}
              >
                {p.icon}
              </div>

              {/* Title + desc + tags — all from top so they align */}
              <div className="flex flex-col gap-5 relative z-10">
                <div>
                  <h3
                    className="font-semibold text-white mb-3"
                    style={{
                      fontSize: "clamp(1.4rem,2vw,1.75rem)",
                      letterSpacing: "-0.02em",
                      lineHeight: "1.2",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.8" }}
                  >
                    {p.desc}
                  </p>
                </div>

                <div
                  className="flex flex-wrap gap-2 pt-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1"
                      style={{
                        color: hovered === p.n ? "#C2A065" : "rgba(255,255,255,0.3)",
                        border: `1px solid ${hovered === p.n ? "rgba(173,138,82,0.35)" : "rgba(255,255,255,0.08)"}`,
                        letterSpacing: "0.05em",
                        transition: "color 0.3s ease, border-color 0.3s ease",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
