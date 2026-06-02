"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cases = [
  {
    sector: "Financial Services",
    title: "Restructuring the strategic architecture of a global insurer",
    challenge:
      "A FTSE 100 insurer faced declining market share, deteriorating margins, and persistent misalignment between its strategy, operating model, and portfolio of businesses. The board had commissioned three consecutive transformation programmes, none of which had delivered.",
    approach:
      "We defined a revised corporate strategy, redesigned the group operating model to eliminate structural duplication, and built a portfolio prioritisation framework that aligned capital allocation to strategic priorities. A governance redesign clarified decision rights across the group and business units.",
    outcome: "£340M of capital reallocated to high-growth priorities. Operating cost base reduced by 18% over 24 months. Group EBITDA margin improved from 11% to 19%.",
    metrics: [
      { label: "Capital reallocated", value: "£340M" },
      { label: "Cost reduction", value: "18%" },
      { label: "EBITDA improvement", value: "+8pp" },
    ],
  },
  {
    sector: "Healthcare",
    title: "Designing a new operating model for a national health system",
    challenge:
      "A national health system employing 42,000 people was preparing for the largest structural reform in its 30-year history. The existing operating model was fragmented, accountability unclear, and leadership alignment absent. Change had repeatedly stalled.",
    approach:
      "We designed the target operating model from the ground up - defining a clear accountability architecture, redesigning care coordination structures, and building the governance framework for the transition. An executive alignment programme brought 18 senior leaders to consensus on the new model before implementation.",
    outcome: "New operating model adopted across all 14 regions. Coordination failures reduced by 34%. Patient experience scores improved 22 points in 12 months.",
    metrics: [
      { label: "Regions aligned", value: "14" },
      { label: "Coordination failures", value: "−34%" },
      { label: "Patient experience", value: "+22 pts" },
    ],
  },
  {
    sector: "Technology",
    title: "Building the growth architecture for a scaling enterprise SaaS business",
    challenge:
      "A Series C enterprise SaaS business had grown to $120M ARR but was experiencing the structural symptoms of scale: slowing revenue growth, rising churn, declining sales efficiency, and leadership misalignment on the path to profitability.",
    approach:
      "We conducted a strategic diagnosis of the growth model, identified the structural root causes of declining efficiency, and designed a revised go-to-market and customer success architecture. A new operating model clarified accountability between product, sales, and customer success, and a strategic roadmap defined the path to $300M ARR.",
    outcome: "NRR improved from 87% to 112% in 18 months. Sales efficiency ratio improved 2.1x. Business reached $280M ARR within 24 months of engagement.",
    metrics: [
      { label: "NRR improvement", value: "87→112%" },
      { label: "Sales efficiency", value: "2.1x" },
      { label: "ARR achieved", value: "$280M" },
    ],
  },
];

function CaseCard({ c, index }: { c: typeof cases[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  // Scroll-based vertical parallax per card – each card moves at slightly different rate
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 30 : 50, index % 2 === 0 ? -30 : -50]);

  return (
    <motion.div
      ref={ref}
      style={{
        y: cardY,
        background: "#fff",
        border: "1px solid var(--hair)",
        transformOrigin: "center top",
      }}
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
      className="flex flex-col overflow-hidden"
    >
      {/* Sector tag + title */}
      <div className="p-8 pb-6" style={{ borderBottom: "1px solid var(--hair)" }}>
        <div className="flex items-center gap-3 mb-5">
          <motion.span
            className="text-xs font-semibold uppercase px-2.5 py-1"
            style={{
              background: "rgba(173,138,82,0.08)",
              color: "#AD8A52",
              letterSpacing: "0.16em",
              border: "1px solid rgba(173,138,82,0.18)",
            }}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
          >
            {c.sector}
          </motion.span>
        </div>

        <div style={{ overflow: "hidden" }}>
          <motion.h3
            className="font-semibold leading-tight"
            style={{ color: "var(--navy)", fontSize: "1.15rem", letterSpacing: "-0.012em", lineHeight: "1.35" }}
            initial={{ y: "105%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 + index * 0.1 }}
          >
            {c.title}
          </motion.h3>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-8 flex flex-col gap-7">
        {[
          { label: "Challenge", text: c.challenge },
          { label: "Approach", text: c.approach },
        ].map(({ label, text }, li) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3 + index * 0.1 + li * 0.1 }}
          >
            <p className="text-xs font-semibold uppercase mb-3" style={{ color: "var(--mist)", letterSpacing: "0.2em" }}>
              {label}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--steel)", lineHeight: "1.75" }}>
              {text}
            </p>
          </motion.div>
        ))}

        {/* Outcome box */}
        <motion.div
          className="p-5"
          style={{ background: "rgba(12,35,64,0.03)", border: "1px solid rgba(12,35,64,0.07)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.5 + index * 0.1 }}
        >
          <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#AD8A52", letterSpacing: "0.2em" }}>
            Outcome
          </p>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--charcoal)" }}>
            {c.outcome}
          </p>

          {/* Metric numbers with stagger */}
          <div className="grid grid-cols-3 gap-3">
            {c.metrics.map((m, mi) => (
              <motion.div
                key={m.label}
                className="flex flex-col gap-1"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.65 + index * 0.1 + mi * 0.08 }}
              >
                <span
                  className="font-semibold"
                  style={{ color: "var(--navy)", fontSize: "1.1rem", letterSpacing: "-0.01em" }}
                >
                  {m.value}
                </span>
                <span className="text-xs" style={{ color: "var(--mist)", lineHeight: "1.4" }}>
                  {m.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function CaseStudies() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  // Section-level scroll parallax for background elements
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgGlowY = useTransform(sectionProgress, [0, 1], [80, -80]);
  const bgGlowX = useTransform(sectionProgress, [0, 1], [-20, 20]);

  return (
    <section
      ref={sectionRef}
      id="engagements"
      style={{ background: "var(--navy)", borderTop: "1px solid rgba(159,176,190,0.08)" }}
      className="py-28 md:py-36 relative overflow-hidden"
    >
      <div className="grid-overlay" style={{ opacity: 0.25 }} />

      {/* Parallax background orb */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          right: "-15%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(173,138,82,0.06), transparent 65%)",
          y: bgGlowY,
          x: bgGlowX,
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "5%",
          left: "-10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(173,138,82,0.04), transparent 65%)",
          y: useTransform(sectionProgress, [0, 1], [-40, 40]),
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                className="font-semibold text-white"
                style={{ fontSize: "clamp(2rem,3.5vw,2.75rem)", letterSpacing: "-0.018em", lineHeight: "1.15" }}
                initial={{ y: "105%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                Work that defines outcomes
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm md:max-w-xs"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              Illustrative engagements. Details anonymised in accordance with client confidentiality.
            </motion.p>
          </div>
        </div>

        {/* Cards – slight vertical offset stagger for depth */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {cases.map((c, i) => (
            <div
              key={c.title}
              style={{ marginTop: i === 1 ? "40px" : i === 2 ? "20px" : "0px" }}
            >
              <CaseCard c={c} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
