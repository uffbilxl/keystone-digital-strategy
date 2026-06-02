"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ParticleCanvas } from "../ParticleCanvas";

const CodeIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const AiIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41" />
  </svg>
);
const DbIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
  </svg>
);
const ShieldIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
  </svg>
);
const TerminalIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
const BugIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2l1.88 1.88M14.12 3.88 16 2" /><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
    <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z" />
    <path d="M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-3 1.5-6 3-8M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M18 13c1.5 2 3 5 3 8" />
  </svg>
);
const PenIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);
const LayersIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);
const EyeIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const team = [
  {
    role: "Full Stack Developer",
    company: "Developer · AI Specialist",
    icons: [CodeIcon, AiIcon, DbIcon],
    bio: "Spent the past couple of years building full-stack applications, experimenting with machine learning pipelines, and getting comfortable with the kind of productive ambiguity that comes with working at the edge of what AI can currently do.\n\nI'm drawn to work where the decisions made early save someone a lot of pain later — whether that's in architecture, data design, or the unglamorous business of writing tests properly.",
  },
  {
    role: "Full Stack Developer",
    company: "Developer · Systems Engineer",
    icons: [CodeIcon, AiIcon, DbIcon],
    bio: "I focus on building things that are actually useful — clean interfaces, reliable back-ends, and systems smart enough to handle the tedious work without making a mess of the interesting parts.\n\nI'm interested in the point where AI becomes a genuine engineering tool rather than a marketing claim, and I try to build with that distinction in mind.",
  },
  {
    role: "Penetration Tester",
    company: "Security · Startups · Communities",
    icons: [ShieldIcon, TerminalIcon, BugIcon],
    bio: "Most of what I do sits somewhere between security, startups, and building things for people who are trying to build things themselves — which sounds chaotic but has turned out to be a decent way to learn quickly.\n\nOn the security side, I work on finding the gaps before someone else does — a job that rewards genuine curiosity more than most.",
  },
  {
    role: "UI/UX Designer",
    company: "Design · Brand · Experience",
    icons: [PenIcon, LayersIcon, EyeIcon],
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
      style={{ perspective: "1200px", height: "340px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer"
    >
      <div
        style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front — dark navy */}
        <div
          style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            background: "rgba(10,29,53,0.95)",
            border: "1px solid rgba(159,176,190,0.1)",
            padding: "32px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}
        >
          {/* Role + company */}
          <div>
            <p className="font-semibold text-white mb-2" style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}>
              {member.role}
            </p>
            <p className="text-xs" style={{ color: "#AD8A52" }}>{member.company}</p>
          </div>

          {/* Icon trio */}
          <div className="flex items-center gap-3">
            {member.icons.map((Icon, i) => (
              <div key={i} style={{ color: "rgba(255,255,255,0.2)" }}>
                <Icon size={18} />
              </div>
            ))}
          </div>

          {/* Hover hint */}
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>Hover to read</span>
            <span style={{ color: "rgba(173,138,82,0.4)", fontSize: "10px" }}>→</span>
          </div>
        </div>

        {/* Back — slightly darker */}
        <div
          style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(5,14,26,0.98)",
            border: "1px solid rgba(173,138,82,0.2)",
            padding: "24px",
            display: "flex", flexDirection: "column", gap: "12px", overflow: "hidden",
          }}
        >
          <div className="flex items-center justify-between flex-shrink-0">
            <p className="text-xs font-semibold" style={{ color: "#C2A065" }}>{member.role}</p>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>✕</span>
          </div>
          <div style={{ flex: 1, overflowY: "auto", paddingRight: "4px", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}>
            {member.bio.split("\n\n").map((para, i) => (
              <p key={i} className="text-xs" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.85", marginBottom: i < member.bio.split("\n\n").length - 1 ? "12px" : 0 }}>
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
        style={{ top: "0%", right: "-15%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(173,138,82,0.05), transparent 65%)", y: bgGlowY }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6 md:px-10">

        {/* Story block */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-20"
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
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Team cards */}
        <div className="pt-16">
          <div style={{ overflow: "hidden", paddingBottom: "0.1em", marginBottom: "2.5rem" }}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member, i) => (
              <FlipCard key={i} member={member} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
