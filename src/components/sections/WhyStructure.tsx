"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    n: "01",
    title: "Brand Identity",
    desc: "From logo to social presence. We build visual identities that are distinct, consistent, and built to last.",
  },
  {
    n: "02",
    title: "Web Development",
    desc: "Fast, modern, responsive websites. Engineered with care and designed to perform from day one.",
  },
  {
    n: "03",
    title: "Cybersecurity Testing",
    desc: "We test your site the way attackers would. Vulnerabilities found and fixed before they are exploited.",
  },
];

export function WhyStructure() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="what-we-do"
      className="py-24 md:py-32"
      style={{ background: "#fff", borderTop: "1px solid var(--hair)" }}
    >
      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase mb-16"
          style={{ color: "var(--mist)", letterSpacing: "0.28em" }}
        >
          What We Do
        </motion.p>

        <div>
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid grid-cols-12 gap-6 py-10"
              style={{ borderTop: "1px solid var(--hair)" }}
            >
              <div className="col-span-1">
                <span className="text-xs" style={{ color: "var(--mist)", letterSpacing: "0.1em" }}>
                  {p.n}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h3
                  className="font-semibold"
                  style={{ color: "var(--navy)", fontSize: "1.05rem", letterSpacing: "-0.01em" }}
                >
                  {p.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-7">
                <p className="text-sm leading-relaxed" style={{ color: "var(--steel)", lineHeight: "1.75" }}>
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
          {/* closing border */}
          <div style={{ borderTop: "1px solid var(--hair)" }} />
        </div>
      </div>
    </section>
  );
}
