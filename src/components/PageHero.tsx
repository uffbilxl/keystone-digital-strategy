"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section
      className="pt-36 pb-20"
      style={{ background: "#0C2340", borderBottom: "1px solid rgba(159,176,190,0.1)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase mb-5"
          style={{ color: "#AD8A52", letterSpacing: "0.32em" }}
        >
          {label}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.07 }}
          className="font-semibold text-white"
          style={{
            fontSize: "clamp(2.5rem,5vw,4rem)",
            letterSpacing: "-0.025em",
            lineHeight: "1.08",
            maxWidth: "700px",
          }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-6 text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)", maxWidth: "480px", lineHeight: "1.8" }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
