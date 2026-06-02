"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ParticleCanvas } from "../ParticleCanvas";

const team = [
  {
    role: "Full Stack Developer",
    company: "Developer · AI Specialist",
    bio: "Spent the past couple of years building full-stack applications, experimenting with machine learning pipelines, and getting comfortable with the kind of productive ambiguity that comes with working at the edge of what AI can currently do.\n\nI'm drawn to work where the decisions made early save someone a lot of pain later — whether that's in architecture, data design, or the unglamorous business of writing tests properly.",
  },
  {
    role: "Full Stack Developer",
    company: "Developer · Systems Engineer",
    bio: "I focus on building things that are actually useful — clean interfaces, reliable back-ends, and systems smart enough to handle the tedious work without making a mess of the interesting parts.\n\nI'm interested in the point where AI becomes a genuine engineering tool rather than a marketing claim, and I try to build with that distinction in mind.",
  },
  {
    role: "Penetration Tester",
    company: "Security · Startups · Communities",
    bio: "Most of what I do sits somewhere between security, startups, and building things for people who are trying to build things themselves — which sounds chaotic but has turned out to be a decent way to learn quickly.\n\nOn the security side, I work on finding the gaps before someone else does — a job that rewards genuine curiosity more than most.",
  },
  {
    role: "UI/UX Designer",
    company: "Design · Brand · Experience",
    bio: "I work at the intersection of how something looks and how something feels — which are rarely as different as people assume. Good design is mostly decisions: what to include, what to remove, and what the person on the other side actually needs to understand.\n\nI'm drawn to projects where design is treated as thinking, not decoration.",
  },
];

type TeamMember = typeof team[0];

function FlipCard({ member, index, inView }: { member: TeamMember; index: number; inView: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.2 + index * 0.1 }}
      // min-h-[280px] on mobile, fixed 320px on md+
      className="cursor-pointer min-h-[280px] md:h-[320px]"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── Front ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "rgba(10,29,53,0.95)",
            border: "1px solid rgba(159,176,190,0.1)",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              className="font-semibold text-white"
              style={{ fontSize: "clamp(0.95rem,1.2vw,1.05rem)", letterSpacing: "-0.01em", lineHeight: "1.3", marginBottom: "8px" }}
            >
              {member.role}
            </p>
            <p style={{ color: "#AD8A52", fontSize: "12px", lineHeight: "1.5" }}>{member.company}</p>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "auto 0" }} />

          {/* Hint */}
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px" }}>
            Tap to read →
          </p>
        </div>

        {/* ── Back ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(5,14,26,0.98)",
            border: "1px solid rgba(173,138,82,0.2)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            overflow: "hidden",
          }}
        >
          <div className="flex items-center justify-between flex-shrink-0">
            <p style={{ color: "#C2A065", fontSize: "11px", fontWeight: 600 }}>{member.role}</p>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px" }}>✕</span>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              paddingRight: "4px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.08) transparent",
            }}
          >
            {member.bio.split("\n\n").map((para, i, arr) => (
              <p
                key={i}
                style={{
                  color: "rgba(255,255,255,0.52)",
                  fontSize: "12px",
                  lineHeight: "1.85",
                  marginBottom: i < arr.length - 1 ? "12px" : 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgGlowY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "#0C2340", borderTop: "1px solid rgba(159,176,190,0.08)" }}
    >
      <ParticleCanvas count={25} />
      <div className="grid-overlay" style={{ opacity: 0.1 }} />

      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "0%", right: "-15%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(173,138,82,0.05), transparent 65%)",
          y: bgGlowY,
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6 md:px-10">

        {/* Story */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-16 md:pb-20"
          style={{ borderBottom: "1px solid rgba(159,176,190,0.08)" }}
        >
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div style={{ overflow: "hidden", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
              <motion.h2
                className="font-semibold text-white"
                style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)", letterSpacing: "-0.025em", lineHeight: "1.1" }}
                initial={{ y: "105%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                Small team.<br />Serious work.
              </motion.h2>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-7 flex flex-col gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.85" }}>
              Keystone Digital Strategy is a digital consultancy. We are four specialists working together to deliver brand, web, and security services to clients worldwide.
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.85" }}>
              Our work speaks for itself: 100+ successful projects across 3 years, delivered for clients across multiple industries and continents. Every engagement is senior-led.
            </p>
            <div className="flex items-center gap-8 pt-4">
              {[
                { n: "3+", label: "Years" },
                { n: "100+", label: "Projects" },
                { n: "Global", label: "Reach" },
              ].map(({ n, label }, i) => (
                <motion.div
                  key={label}
                  className="flex flex-col gap-0.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                >
                  <span className="font-semibold text-white" style={{ fontSize: "1.3rem", letterSpacing: "-0.025em" }}>{n}</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Team */}
        <div className="pt-14 md:pt-16">
          <div style={{ overflow: "hidden", paddingBottom: "0.1em", marginBottom: "2rem" }}>
            <motion.h3
              className="font-semibold text-white"
              style={{ fontSize: "clamp(1.1rem,1.8vw,1.4rem)", letterSpacing: "-0.015em" }}
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              The team
            </motion.h3>
          </div>

          {/* Responsive grid: 1 col mobile → 2 col tablet → 4 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member, i) => (
              <FlipCard key={i} member={member} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
