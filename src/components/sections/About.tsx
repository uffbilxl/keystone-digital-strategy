"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

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
const NetworkIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
    <path d="M12 7v4M12 11l-5 6M12 11l5 6" />
  </svg>
);
const SearchIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" /><line x1="16.65" y1="16.65" x2="21" y2="21" />
  </svg>
);
const LockIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const BugIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2l1.88 1.88M14.12 3.88 16 2" /><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
    <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z" />
    <path d="M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-3 1.5-6 3-8M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M18 13c1.5 2 3 5 3 8" />
  </svg>
);

const team = [
  {
    role: "Full Stack Developer",
    discipline: "Computer Science with AI",
    icons: [CodeIcon, AiIcon, DbIcon],
    company: "Developer · AI Specialist",
    bio: "Spent the past couple of years building full-stack applications, experimenting with machine learning pipelines, and getting comfortable with the kind of productive ambiguity that comes with working at the edge of what AI can currently do.\n\nI'm drawn to work where the decisions made early save someone a lot of pain later — whether that's in architecture, data design, or the unglamorous business of writing tests properly. When not writing code, probably reading about it, or convincing myself the next side project will be the one that sticks.",
  },
  {
    role: "Full Stack Developer",
    discipline: "Computer Science with AI",
    icons: [CodeIcon, AiIcon, DbIcon],
    company: "Developer · Systems Engineer",
    bio: "I focus on building things that are actually useful — clean interfaces, reliable back-ends, and systems smart enough to handle the tedious work without making a mess of the interesting parts.\n\nI'm interested in the point where AI becomes a genuine engineering tool rather than a marketing claim, and I try to build with that distinction in mind. There is something satisfying about engineering at scale — where what you ship eventually runs in the background of industries that do not get to have outages.\n\nOutside of structured work, I contribute to projects where the brief is usually some version of 'make this smarter' — which suits me well.",
  },
  {
    role: "Penetration Tester",
    discipline: "Cyber Security Graduate",
    icons: [ShieldIcon, TerminalIcon, BugIcon],
    company: "Security · Startups · Communities",
    bio: "Most of what I do sits somewhere between security, startups, and building things for people who are trying to build things themselves — which sounds chaotic but has turned out to be a decent way to learn quickly.\n\nI have been involved in founding and co-founding several initiatives across technology and community building. Each started from a version of the same observation: the infrastructure around people who want to create is usually worse than it needs to be, and fixing that is worth the effort.\n\nOn the security side, I work on finding the gaps before someone else does — a job that rewards genuine curiosity more than most. The combination of that and the startup work has given me a clear picture of what it looks like when security is treated as an afterthought, and why it should not be.",
  },
  {
    role: "Security Analyst",
    discipline: "Cyber Security Graduate",
    icons: [ShieldIcon, SearchIcon, LockIcon],
    company: "Security · Ethical Hacking",
    bio: "I spend a healthy amount of time breaking things legally, fixing them properly, and occasionally staring at error messages like they have personally offended me. Through hands-on projects I have built solid skills in Python, Linux, networking, and ethical hacking, with a focus on solving real-world problems in a field that genuinely refuses to sit still.\n\nAlongside the technical work, I am involved in community building and practical education — running events, pushing for learning that actually feels useful, and creating opportunities that go beyond what looks good on paper. I believe the best security work comes from people who are as interested in the human side of systems as the technical one.",
  },
];

type TeamMember = typeof team[0];

function FlipCard({ member, index, inView }: { member: TeamMember; index: number; inView: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.2 + index * 0.08 }}
      style={{ perspective: "1200px", height: "380px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer"
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "#fff",
            border: "1px solid var(--hair)",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Icons row */}
          <div style={{ display: "flex", gap: "12px" }}>
            {member.icons.map((Icon, i) => (
              <div
                key={i}
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "var(--paper)",
                  border: "1px solid var(--hair)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0C2340",
                }}
              >
                <Icon size={28} />
              </div>
            ))}
          </div>

          <div>
            <p className="font-semibold mb-2" style={{ color: "var(--navy)", fontSize: "1.15rem", letterSpacing: "-0.015em" }}>
              {member.role}
            </p>
            <p className="text-sm mb-3" style={{ color: "var(--mist)" }}>
              {member.discipline}
            </p>
            <p className="text-xs" style={{ color: "#AD8A52", letterSpacing: "0.04em" }}>
              {member.company}
            </p>
          </div>

        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "var(--navy)",
            border: "1px solid rgba(159,176,190,0.12)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            overflow: "hidden",
          }}
        >
          <div className="flex items-center justify-between flex-shrink-0">
            <p className="text-xs font-semibold" style={{ color: "#AD8A52", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              {member.role}
            </p>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>✕ close</span>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              paddingRight: "4px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.1) transparent",
            }}
          >
            {member.bio.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-xs leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: "1.85",
                  marginBottom: i < member.bio.split("\n\n").length - 1 ? "12px" : 0,
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
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="about"
      className="py-24 md:py-32"
      style={{ background: "var(--paper)", borderTop: "1px solid var(--hair)" }}
    >
      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-10">

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
              style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)", color: "var(--navy)", letterSpacing: "-0.02em", lineHeight: "1.15" }}
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
              Keystone Digital Strategy is a digital consultancy. We are four specialists working together to deliver brand, web, and security services to clients worldwide.
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
                  <span className="font-semibold" style={{ color: "var(--navy)", fontSize: "1.25rem", letterSpacing: "-0.02em" }}>{n}</span>
                  <span className="text-xs uppercase" style={{ color: "var(--mist)", letterSpacing: "0.14em" }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Team */}
        <div className="pt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-end justify-between mb-10"
          >
            <p className="text-xs font-medium uppercase" style={{ color: "var(--mist)", letterSpacing: "0.28em" }}>
              The Team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <FlipCard key={i} member={member} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
