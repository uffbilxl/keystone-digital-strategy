"use client";

import { useState, useRef } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { Hero } from "@/components/sections/Hero";
import { WhyStructure } from "@/components/sections/WhyStructure";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const items = [
  { n: "01", label: "Our Services", desc: "Brand identity, web development, and cybersecurity testing.", href: "/services" },
  { n: "02", label: "Our Work",     desc: "100+ projects delivered across multiple industries.",       href: "/work"     },
  { n: "03", label: "About Us",     desc: "Four specialists. Three years. Serious results.",           href: "/about"    },
];

function EditorialRow({
  item,
  index,
  inView,
}: {
  item: typeof items[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.09 }}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      <Link
        href={item.href}
        className="editorial-row flex items-center gap-6 py-7 md:py-8"
        style={{ textDecoration: "none" }}
      >
        {/* Number */}
        <span
          className="editorial-num flex-shrink-0 font-medium tabular-nums"
          style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.75rem", width: "28px", transition: "color 0.2s ease" }}
        >
          {item.n}
        </span>

        {/* Title */}
        <h3
          className="editorial-title font-semibold flex-shrink-0"
          style={{
            color: "#fff",
            fontSize: "clamp(1rem,1.4vw,1.2rem)",
            letterSpacing: "-0.01em",
            minWidth: "160px",
            transition: "color 0.2s ease",
          }}
        >
          {item.label}
        </h3>

        {/* Separator line */}
        <div className="editorial-line flex-1 hidden md:block" style={{ height: "1px", background: "rgba(255,255,255,0.1)", transition: "background 0.3s ease" }} />

        {/* Description */}
        <p
          className="text-sm hidden md:block"
          style={{ color: "rgba(255,255,255,0.35)", maxWidth: "300px", lineHeight: "1.65" }}
        >
          {item.desc}
        </p>

        {/* Arrow */}
        <span
          className="editorial-arrow flex-shrink-0 font-medium text-sm ml-auto md:ml-0"
          style={{ color: "#AD8A52" }}
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  const exploreRef = useRef<HTMLDivElement>(null);
  const inView = useInView(exploreRef, { once: true, margin: "-10% 0px" });

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <Hero />
      <WhyStructure />

      {/* Editorial rows section */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{ background: "#0C2340", borderTop: "1px solid rgba(159,176,190,0.08)" }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(173,138,82,0.04), transparent 60%)", y: bgY }}
        />

        <div ref={exploreRef} className="max-w-6xl mx-auto px-6 md:px-10 relative">
          {/* Section heading */}
          <motion.div
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingTop: "4rem", paddingBottom: "1.5rem" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8rem", fontWeight: 500 }}>Explore</p>
          </motion.div>

          {/* Rows */}
          <div style={{ paddingBottom: "2rem" }}>
            {items.map((item, i) => (
              <EditorialRow key={item.href} item={item} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
