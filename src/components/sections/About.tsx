"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const team = [
  { role: "Full Stack Developer", discipline: "Computer Science with AI", initials: "FS" },
  { role: "Full Stack Developer", discipline: "Computer Science with AI", initials: "FS" },
  { role: "Penetration Tester", discipline: "Cyber Security Graduate", initials: "PT" },
  { role: "Security Analyst", discipline: "Cyber Security Graduate", initials: "SA" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="about"
      className="py-24 md:py-32"
      style={{ background: "var(--paper)", borderTop: "1px solid var(--hair)" }}
    >
      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase mb-16"
          style={{ color: "var(--mist)", letterSpacing: "0.28em" }}
        >
          About
        </motion.p>

        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-20" style={{ borderBottom: "1px solid var(--hair)" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <h2
              className="font-semibold"
              style={{
                fontSize: "clamp(1.75rem,3vw,2.5rem)",
                color: "var(--navy)",
                letterSpacing: "-0.02em",
                lineHeight: "1.15",
              }}
            >
              Small team.<br />Serious work.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-7 flex flex-col gap-5"
          >
            <p className="text-sm leading-relaxed" style={{ color: "var(--steel)", lineHeight: "1.85" }}>
              Keystone Digital Strategy is a boutique digital consultancy. We are four specialists working together to deliver brand, web, and security services to clients worldwide.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--steel)", lineHeight: "1.85" }}>
              Our work speaks for itself: 100+ successful projects across 3 years, delivered for clients across multiple industries and continents. Every engagement is senior-led.
            </p>
            <div className="flex items-center gap-8 pt-4">
              {[
                { n: "3+", label: "Years" },
                { n: "100+", label: "Projects" },
                { n: "Global", label: "Reach" },
              ].map(({ n, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="font-semibold" style={{ color: "var(--navy)", fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
                    {n}
                  </span>
                  <span className="text-xs" style={{ color: "var(--mist)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Team */}
        <div className="pt-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs font-medium uppercase mb-10"
            style={{ color: "var(--mist)", letterSpacing: "0.28em" }}
          >
            The Team
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.2 + i * 0.07 }}
                className="flex flex-col gap-5 p-6"
                style={{ background: "#fff", border: "1px solid var(--hair)" }}
              >
                {/* Avatar */}
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    width: "56px",
                    height: "56px",
                    background: "linear-gradient(135deg, #0C2340 0%, #1a3a5c 100%)",
                    border: "1px solid rgba(159,176,190,0.2)",
                  }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: "#C2A065", fontSize: "13px", letterSpacing: "0.08em" }}
                  >
                    {member.initials}
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-sm" style={{ color: "var(--navy)", letterSpacing: "-0.01em" }}>
                    {member.role}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--mist)" }}>
                    {member.discipline}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
