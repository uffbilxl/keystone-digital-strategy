"use client";

import { motion, useInView } from "framer-motion";
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: index * 0.12 }}
      className="flex flex-col overflow-hidden rounded-sm"
      style={{ background: "#fff", border: "1px solid var(--hair)" }}
    >
      {/* Header */}
      <div className="p-8 pb-6" style={{ borderBottom: "1px solid var(--hair)" }}>
        <div className="flex items-center gap-3 mb-5">
          <span
            className="text-xs font-semibold uppercase px-2.5 py-1 rounded-sm"
            style={{
              background: "rgba(173,138,82,0.08)",
              color: "#AD8A52",
              letterSpacing: "0.16em",
              border: "1px solid rgba(173,138,82,0.18)",
            }}
          >
            {c.sector}
          </span>
        </div>
        <h3
          className="font-semibold leading-tight"
          style={{ color: "var(--navy)", fontSize: "1.15rem", letterSpacing: "-0.012em", lineHeight: "1.35" }}
        >
          {c.title}
        </h3>
      </div>

      {/* Body */}
      <div className="flex-1 p-8 flex flex-col gap-7">
        {[
          { label: "Challenge", text: c.challenge },
          { label: "Approach", text: c.approach },
        ].map(({ label, text }) => (
          <div key={label}>
            <p
              className="text-xs font-semibold uppercase mb-3"
              style={{ color: "var(--mist)", letterSpacing: "0.2em" }}
            >
              {label}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--steel)", lineHeight: "1.75" }}>
              {text}
            </p>
          </div>
        ))}

        {/* Outcome */}
        <div
          className="p-5 rounded-sm"
          style={{ background: "rgba(12,35,64,0.03)", border: "1px solid rgba(12,35,64,0.07)" }}
        >
          <p
            className="text-xs font-semibold uppercase mb-3"
            style={{ color: "#AD8A52", letterSpacing: "0.2em" }}
          >
            Outcome
          </p>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--charcoal)" }}>
            {c.outcome}
          </p>
          <div className="grid grid-cols-3 gap-3">
            {c.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <span
                  className="font-semibold"
                  style={{ color: "var(--navy)", fontSize: "1.1rem", letterSpacing: "-0.01em" }}
                >
                  {m.value}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--mist)", lineHeight: "1.4" }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CaseStudies() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="engagements"
      style={{ background: "var(--navy)", borderTop: "1px solid rgba(159,176,190,0.1)" }}
      className="py-28 md:py-36 relative overflow-hidden"
    >
      <div className="grid-overlay" style={{ opacity: 0.3 }} />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div ref={headerRef} className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="block text-xs font-semibold uppercase mb-4"
            style={{ color: "#C2A065", letterSpacing: "0.34em" }}
          >
            Selected Engagements
          </motion.span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.07 }}
              className="font-semibold text-white"
              style={{
                fontSize: "clamp(2rem,3.5vw,2.75rem)",
                letterSpacing: "-0.018em",
                lineHeight: "1.15",
              }}
            >
              Work that defines outcomes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="text-sm md:max-w-xs"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Illustrative engagements. Details anonymised in accordance with client confidentiality.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <CaseCard key={c.title} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
