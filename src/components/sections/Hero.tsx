"use client";

import { motion } from "framer-motion";

const fade = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, delay },
});

export function Hero() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      className="relative min-h-screen flex flex-col justify-between"
      style={{ background: "#0C2340" }}
    >
      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-6 md:px-10 pt-32 pb-16">

        {/* Label */}
        <motion.p
          {...fade(0)}
          className="text-xs font-medium uppercase mb-10"
          style={{ color: "rgba(255,255,255,0.32)", letterSpacing: "0.28em" }}
        >
          Digital Strategy
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fade(0.1)}
          className="font-semibold text-white"
          style={{
            fontSize: "clamp(3rem,7vw,6.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: "1.02",
            maxWidth: "900px",
          }}
        >
          Brands built.<br />
          Websites secured.<br />
          <span style={{ color: "#AD8A52" }}>Done right.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fade(0.2)}
          className="mt-10 font-medium"
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "clamp(0.95rem,1.4vw,1.1rem)",
            maxWidth: "420px",
            lineHeight: "1.75",
          }}
        >
          Brand identities, websites, and cybersecurity testing.
          Delivered by a four-person specialist team.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(0.3)} className="mt-10 flex items-center gap-6">
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); scrollTo("services"); }}
            className="text-sm font-semibold transition-opacity duration-200 hover:opacity-70"
            style={{ color: "#AD8A52", letterSpacing: "0.04em" }}
          >
            Our Services →
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
            className="text-sm font-medium transition-opacity duration-200 hover:opacity-70"
            style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Bottom strip */}
      <motion.div
        {...fade(0.45)}
        className="max-w-6xl mx-auto w-full px-6 md:px-10 pb-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="pt-8 flex items-center gap-12">
          {[
            { n: "3+", label: "Years" },
            { n: "10+", label: "Projects" },
            { n: "4", label: "Specialists" },
          ].map(({ n, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="font-semibold text-white" style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
                {n}
              </span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.32)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
