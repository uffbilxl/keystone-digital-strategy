"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LogoMark } from "../Logo";

const team = [
  { role: "Full Stack Developer", discipline: "Computer Science with AI", icon: "code" },
  { role: "Full Stack Developer", discipline: "Computer Science with AI", icon: "code" },
  { role: "Penetration Tester", discipline: "Cyber Security Graduate", icon: "shield" },
  { role: "Security Analyst", discipline: "Cyber Security Graduate", icon: "shield" },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="about"
      style={{ background: "var(--paper)", borderTop: "1px solid var(--hair)" }}
      className="py-28 md:py-36"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Story */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          >
            <span className="block text-xs font-semibold uppercase mb-4" style={{ color: "#AD8A52", letterSpacing: "0.34em" }}>
              About Keystone
            </span>
            <h2
              className="font-semibold mb-6"
              style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "var(--navy)", letterSpacing: "-0.018em", lineHeight: "1.15" }}
            >
              Small team.<br />Serious work.
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: "var(--steel)", lineHeight: "1.8" }}>
                Keystone Digital Strategy is a boutique digital consultancy based in Mayfair, London. We are four specialists - two cybersecurity graduates and two computer science and AI engineers - working together to deliver brand, web, and security services to clients worldwide.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--steel)", lineHeight: "1.8" }}>
                Our work speaks for itself: 10 successful projects in 3 years, delivered for clients across multiple industries and continents.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--steel)", lineHeight: "1.8" }}>
                We operate globally. Every engagement is senior-led, with no hand-off to junior staff.
              </p>
            </div>

            {/* Location pill */}
            <div className="mt-8 flex items-center gap-3">
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-sm"
                style={{ background: "#fff", border: "1px solid var(--hair)", display: "inline-flex" }}
              >
                <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="var(--navy)" strokeWidth="1.5">
                  <path d="M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path d="M10 18s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" />
                </svg>
                <span className="text-xs font-medium" style={{ color: "var(--navy)", letterSpacing: "0.08em" }}>
                  Mayfair, London · Worldwide
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "3+", label: "Years in business" },
                { n: "10+", label: "Successful projects" },
                { n: "4", label: "Core specialists" },
                { n: "Global", label: "Client reach" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col gap-1.5 p-6 rounded-sm"
                  style={{ background: "#fff", border: "1px solid var(--hair)" }}
                >
                  <span className="font-semibold" style={{ fontSize: "2rem", color: "var(--navy)", letterSpacing: "-0.02em" }}>
                    {s.n}
                  </span>
                  <span className="text-xs uppercase" style={{ color: "var(--mist)", letterSpacing: "0.18em" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Mark */}
            <div
              className="flex items-center justify-center p-8 rounded-sm"
              style={{ background: "var(--navy)", border: "1px solid rgba(159,176,190,0.1)" }}
            >
              <LogoMark size={72} archColor="#FFFFFF" keystoneColor="#C2A065" />
            </div>
          </motion.div>
        </div>

        {/* Team */}
        <div ref={teamRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
            className="mb-10"
          >
            <span className="block text-xs font-semibold uppercase mb-4" style={{ color: "#AD8A52", letterSpacing: "0.34em" }}>
              The Team
            </span>
            <h2
              className="font-semibold"
              style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "var(--navy)", letterSpacing: "-0.018em", lineHeight: "1.15" }}
            >
              The team
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: i * 0.08 }}
                className="flex flex-col gap-4 p-6 rounded-sm"
                style={{ background: "#fff", border: "1px solid var(--hair)" }}
              >
                {/* Avatar placeholder */}
                <div
                  className="flex items-center justify-center rounded-sm"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "var(--navy)",
                    border: "1px solid rgba(159,176,190,0.1)",
                  }}
                >
                  {member.icon === "shield" ? (
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--navy)", letterSpacing: "-0.01em" }}>
                    {member.role}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--mist)" }}>
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
