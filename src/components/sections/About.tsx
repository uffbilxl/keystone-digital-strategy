"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const team = [
  {
    role: "Full Stack Developer",
    discipline: "Computer Science with AI",
    icon: "code",
    company: "Incoming Technology Developer Intern @ Barclays",
    bio: "Studying Computer Science with AI at Birmingham City University — a degree that has a habit of pulling in every direction at once, which turns out to be excellent preparation for working in tech. Spent the past couple of years building full-stack applications, experimenting with machine learning pipelines, and getting comfortable with the kind of productive ambiguity that comes with working at the edge of what AI can currently do.\n\nIncoming Technology Developer Intern at Barclays, where the scale of the engineering problems is matched only by the weight of the responsibility behind them. I'm drawn to work where the decisions made early save someone a lot of pain later — whether that's in architecture, data design, or the unglamorous business of writing tests. When not writing code, probably reading about it, or convincing myself the next side project will be the one that sticks.",
  },
  {
    role: "Full Stack Developer",
    discipline: "Computer Science with AI",
    icon: "code",
    company: "Incoming Summer Intern @ AVEVA",
    bio: "Computer Science with AI student at Birmingham City University. I focus on building things that are actually useful — clean interfaces, reliable back-ends, and systems smart enough to handle the tedious work without making a mess of the interesting parts.\n\nIncoming Summer Intern at AVEVA, working on software that underpins industrial infrastructure at a global scale. There is something satisfying about engineering at that level — where what you ship eventually runs in the background of industries that do not get to have outages. I'm interested in the point where AI becomes a genuine engineering tool rather than a marketing claim, and I try to build with that distinction in mind.\n\nOutside of coursework, I contribute to projects where the brief is usually some version of 'make this smarter' — which I find suits me.",
  },
  {
    role: "Penetration Tester",
    discipline: "Cyber Security Graduate",
    icon: "shield",
    company: "Incoming Cyber Security Analyst Intern @ National Gas",
    bio: "Cyber Security student at BCU. Most of what I do sits somewhere between security, startups, and student communities — which sounds chaotic but has turned out to be a decent way to learn quickly.\n\nIncoming Cyber Security Analyst Intern at National Gas. Founder of Unihack, co-founder of Zentic Health, and creator of BCU Innovation Labs. Each of those started from a version of the same observation: the infrastructure around students who want to build things is usually worse than it needs to be, and fixing that is worth the effort.\n\nOn the security side, I work on finding the gaps before someone else does — which is a job that rewards genuine curiosity more than most. The combination of that and the startup work has given me a fairly clear picture of what it looks like when security is treated as an afterthought, and why it shouldn't be.",
  },
  {
    role: "Security Analyst",
    discipline: "Cyber Security Graduate",
    icon: "shield",
    company: "BCU · BCUSCA Vice President",
    bio: "Currently running bsc --degree=cybersecurity at Birmingham City University — where I spend a healthy amount of time breaking things legally, fixing them properly, and occasionally staring at error messages like they have personally offended me. Through coursework and hands-on projects I have built solid skills in Python, Linux, networking, and ethical hacking, with a focus on solving real-world problems in a field that genuinely refuses to sit still.\n\nAlongside the degree, I'm Course Rep for Cyber Security and a Visiting Demonstrator — helping staff and students navigate the same organised chaos I voluntarily enrolled in. I'm also Vice President for Cyber at the BCU Student Computing Association (BCUSCA), where I run events, push practical learning, and try to build opportunities that actually feel useful — not just good on paper.",
  },
];

function FlipCard({ member, index, inView }: { member: typeof team[0]; index: number; inView: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.2 + index * 0.08 }}
      style={{ perspective: "1200px", height: "320px" }}
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
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "var(--paper)",
              border: "1px solid var(--hair)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {member.icon === "shield" ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0C2340" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0C2340" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
            )}
          </div>

          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--navy)", fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
              {member.role}
            </p>
            <p className="text-xs mb-3" style={{ color: "var(--mist)" }}>
              {member.discipline}
            </p>
            <p className="text-xs" style={{ color: "#AD8A52", letterSpacing: "0.02em" }}>
              {member.company}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs" style={{ color: "var(--hair)", letterSpacing: "0.1em" }}>Tap to read bio</span>
            <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="var(--hair)" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
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
            <p className="text-xs" style={{ color: "var(--hair)" }}>Click a card to read their bio</p>
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
