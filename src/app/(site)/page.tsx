"use client";

import { useState } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { Hero } from "@/components/sections/Hero";
import { WhyStructure } from "@/components/sections/WhyStructure";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <Hero />
      <WhyStructure />

      {/* Quick links to pages */}
      <section className="py-24" style={{ background: "var(--paper)", borderTop: "1px solid var(--hair)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium uppercase mb-12"
            style={{ color: "var(--mist)", letterSpacing: "0.28em" }}
          >
            Explore
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: "Our Services", desc: "Brand identity, web development, and cybersecurity testing.", href: "/services" },
              { label: "Our Work", desc: "100+ projects delivered across multiple industries.", href: "/work" },
              { label: "About Us", desc: "Four specialists. Three years. Serious results.", href: "/about" },
            ].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={item.href}
                  className="group flex flex-col gap-4 p-7 h-full"
                  style={{ background: "#fff", border: "1px solid var(--hair)", borderTop: "2px solid var(--hair)", transition: "border-color 0.2s ease", display: "flex" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderTopColor = "#AD8A52"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderTopColor = "var(--hair)"; }}
                >
                  <h3 className="font-semibold" style={{ color: "var(--navy)", fontSize: "1.05rem", letterSpacing: "-0.01em" }}>
                    {item.label}
                  </h3>
                  <p className="text-sm flex-1" style={{ color: "var(--steel)", lineHeight: "1.7" }}>
                    {item.desc}
                  </p>
                  <span className="text-sm font-medium" style={{ color: "#AD8A52" }}>
                    View →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
