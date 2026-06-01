"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedBackground } from "../AnimatedBackground";

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
    title: "Brand Identity",
    desc: "From logo to social presence - we build a visual identity that is distinct, consistent, and built to last.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Web Development",
    desc: "Fast, modern, responsive websites - engineered with care and designed to perform from day one.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Cybersecurity Testing",
    desc: "We test your site the way attackers would - so vulnerabilities are found and fixed before they are exploited.",
  },
];

export function WhyStructure() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="what-we-do"
      style={{ background: "var(--navy)", borderTop: "1px solid rgba(159,176,190,0.1)" }}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <AnimatedBackground />
      <div className="grid-overlay" style={{ opacity: 0.3 }} />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="block text-xs font-semibold uppercase mb-4"
            style={{ color: "#C2A065", letterSpacing: "0.34em" }}
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.07 }}
            className="font-semibold text-white"
            style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.018em", lineHeight: "1.15", maxWidth: "560px" }}
          >
            Three disciplines.<br />One team.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.1 + i * 0.1 }}
              className="flex flex-col gap-5 p-7 rounded-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(159,176,190,0.12)",
                transition: "border-color 0.25s ease, background 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(173,138,82,0.35)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(159,176,190,0.12)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <div
                className="flex items-center justify-center rounded-sm flex-shrink-0"
                style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(173,138,82,0.1)",
                  border: "1px solid rgba(173,138,82,0.25)",
                  color: "#C2A065",
                }}
              >
                {p.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2" style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.48)", lineHeight: "1.72" }}>
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
