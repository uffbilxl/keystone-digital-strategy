"use client";

import { motion } from "framer-motion";
import { LogoMark } from "../Logo";
import { AnimatedBackground } from "../AnimatedBackground";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay },
});

export function Hero() {
  return (
    <section
      style={{ background: "linear-gradient(180deg, #0d2645, #0a1d35)" }}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Animated floating orbs */}
      <AnimatedBackground gold />

      {/* Grid lines */}
      <div className="grid-overlay" />

      {/* Gold radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          right: "-5%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle at 60% 30%, rgba(173,138,82,0.10), transparent 65%)",
        }}
      />

      {/* Watermark mark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.03 }}>
        <LogoMark size={520} archColor="#FFFFFF" keystoneColor="#AD8A52" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-24">
        {/* Headline */}
        <motion.h1
          {...fadeUp(0.08)}
          className="font-semibold text-white mb-6"
          style={{
            fontSize: "clamp(2.6rem,6vw,5.5rem)",
            letterSpacing: "-0.024em",
            lineHeight: "1.05",
            maxWidth: "820px",
          }}
        >
          Brands built.<br />
          Websites secured.<br />
          <span style={{ color: "#C2A065" }}>Done right.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.17)}
          className="font-medium mb-12"
          style={{
            color: "rgba(255,255,255,0.52)",
            fontSize: "clamp(1rem,1.6vw,1.15rem)",
            maxWidth: "480px",
            lineHeight: "1.7",
          }}
        >
          We build brand identities, design and develop websites,
          and put them through rigorous cybersecurity testing - so
          your digital presence looks great and holds up under pressure.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.25)} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm text-sm font-semibold transition-all duration-200"
            style={{ background: "#AD8A52", color: "#fff", letterSpacing: "0.06em" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#C2A065"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#AD8A52"; }}
          >
            Our Services
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm text-sm font-medium transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.72)", border: "1px solid rgba(255,255,255,0.16)", letterSpacing: "0.04em" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.36)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"; e.currentTarget.style.color = "rgba(255,255,255,0.72)"; }}
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.38)}
          className="mt-20 pt-10 grid grid-cols-3 gap-px max-w-md"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {[
            { n: "3+", label: "Years Experience" },
            { n: "10+", label: "Successful Projects" },
            { n: "4", label: "Specialists" },
          ].map(({ n, label }) => (
            <div key={label} className="flex flex-col gap-1 pr-6">
              <span
                className="font-semibold"
                style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#C2A065", letterSpacing: "-0.02em" }}
              >
                {n}
              </span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.38)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ width: "1px", height: "28px", background: "rgba(173,138,82,0.45)" }}
        />
      </motion.div>
    </section>
  );
}
