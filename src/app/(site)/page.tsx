"use client";

import { useState, useRef } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { Hero } from "@/components/sections/Hero";
import { WhyStructure } from "@/components/sections/WhyStructure";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

function ExploreCard({
  item,
  index,
  inView,
}: {
  item: { label: string; desc: string; href: string };
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      <Link
        ref={cardRef}
        href={item.href}
        className="group flex flex-col gap-4 p-7 h-full relative overflow-hidden"
        style={{
          background: "#fff",
          border: "1px solid var(--hair)",
          borderTop: "2px solid var(--hair)",
          display: "flex",
          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderTopColor = "#AD8A52";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(12,35,64,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderTopColor = "var(--hair)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
        }}
      >
        {/* Hover shimmer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(173,138,82,0.03) 0%, transparent 60%)",
          }}
        />

        <h3
          className="font-semibold relative z-10"
          style={{ color: "var(--navy)", fontSize: "1.05rem", letterSpacing: "-0.01em" }}
        >
          {item.label}
        </h3>
        <p
          className="text-sm flex-1 relative z-10"
          style={{ color: "var(--steel)", lineHeight: "1.7" }}
        >
          {item.desc}
        </p>

        {/* Animated arrow */}
        <div className="flex items-center gap-1.5 relative z-10">
          <span
            className="text-sm font-medium"
            style={{ color: "#AD8A52", transition: "color 0.2s ease" }}
          >
            View
          </span>
          <motion.span
            className="inline-block text-sm font-medium"
            style={{ color: "#AD8A52" }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  const exploreRef = useRef<HTMLDivElement>(null);
  const exploreInView = useInView(exploreRef, { once: true, margin: "-10% 0px" });

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const items = [
    { label: "Our Services", desc: "Brand identity, web development, and cybersecurity testing.", href: "/services" },
    { label: "Our Work", desc: "100+ projects delivered across multiple industries.", href: "/work" },
    { label: "About Us", desc: "Four specialists. Three years. Serious results.", href: "/about" },
  ];

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <Hero />
      <WhyStructure />

      {/* Explore section */}
      <section
        ref={sectionRef}
        className="py-24 relative overflow-hidden"
        style={{ background: "var(--paper)", borderTop: "1px solid var(--hair)" }}
      >
        {/* Parallax background gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 60% 40%, rgba(12,35,64,0.04), transparent 60%)",
            y: bgY,
          }}
        />

        <div ref={exploreRef} className="max-w-6xl mx-auto px-6 md:px-10 relative">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {items.map((item, i) => (
              <ExploreCard key={item.href} item={item} index={i} inView={exploreInView} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
