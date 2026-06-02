"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    index: "01",
    title: "Brand Identity",
    deliverables: "Logo & brand mark, colour palette, typography system, brand guidelines, stationery design.",
    timeline: "2–4 weeks",
  },
  {
    index: "02",
    title: "Social Media Branding",
    deliverables: "Profile & cover design, content templates, story & reel formats, launch-ready asset pack.",
    timeline: "1–2 weeks",
  },
  {
    index: "03",
    title: "Web Design & Development",
    deliverables: "Custom design, fully responsive, SEO foundations, CMS integration, performance optimised.",
    timeline: "2–6 weeks",
  },
  {
    index: "04",
    title: "Cybersecurity Testing",
    deliverables: "Penetration testing, OWASP Top 10 coverage, vulnerability report, SSL & header audit, remediation guidance.",
    timeline: "1–2 weeks",
  },
];

export function Practice() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="py-24 md:py-32"
      style={{ background: "var(--paper)", borderTop: "1px solid var(--hair)" }}
    >
      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-16 gap-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium uppercase"
            style={{ color: "var(--mist)", letterSpacing: "0.28em" }}
          >
            Services
          </motion.p>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="text-xs font-medium transition-opacity duration-200 hover:opacity-60"
            style={{ color: "var(--navy)", letterSpacing: "0.08em" }}
          >
            Get a quote →
          </motion.a>
        </div>

        <div>
          {services.map((svc, i) => (
            <motion.div
              key={svc.index}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="grid grid-cols-12 gap-6 py-9 cursor-default"
              style={{
                borderTop: "1px solid var(--hair)",
                transition: "background 0.2s ease",
                background: hovered === svc.index ? "#fff" : "transparent",
                margin: "0 -24px",
                padding: "36px 24px",
              }}
              onMouseEnter={() => setHovered(svc.index)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="col-span-1">
                <span className="text-xs" style={{ color: "var(--mist)", letterSpacing: "0.1em" }}>
                  {svc.index}
                </span>
              </div>
              <div className="col-span-12 md:col-span-3">
                <h3
                  className="font-semibold"
                  style={{
                    color: "var(--navy)",
                    fontSize: "1rem",
                    letterSpacing: "-0.01em",
                    transition: "color 0.2s ease",
                  }}
                >
                  {svc.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="text-sm" style={{ color: "var(--steel)", lineHeight: "1.7" }}>
                  {svc.deliverables}
                </p>
              </div>
              <div className="col-span-12 md:col-span-2 md:text-right">
                <span className="text-xs" style={{ color: "var(--mist)", letterSpacing: "0.08em" }}>
                  {svc.timeline}
                </span>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid var(--hair)" }} />
        </div>
      </div>
    </section>
  );
}
