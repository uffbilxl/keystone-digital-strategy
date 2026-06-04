"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { ParticleCanvas } from "../ParticleCanvas";

const services = [
  {
    n: "01",
    title: "Brand Identity",
    summary: "We craft identities that mean something.",
    outcomes: [
      "Logo design & brand mark",
      "Colour palette & typography system",
      "Social media branding & templates",
      "Brand guidelines document",
      "Business card & stationery design",
    ],
    engagement: "Delivered in 2–4 weeks. Full brand kit included.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Social Media Branding",
    summary: "Cohesive presence across every platform.",
    outcomes: [
      "Platform-specific profile & cover design",
      "Content template library",
      "Visual tone of voice guidelines",
      "Story & reel templates",
      "Launch-ready asset pack",
    ],
    engagement: "Standalone or bundled with Brand Identity. 1–2 weeks.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Web Design & Development",
    summary: "Websites that look sharp and load fast.",
    outcomes: [
      "Custom design, no templates",
      "Fully responsive, mobile-first",
      "SEO foundations built in",
      "CMS integration if needed",
      "Performance optimised",
    ],
    engagement: "2–6 weeks depending on scope. Hosting setup included.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M8 10l2 2-2 2M13 14h3" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Cybersecurity Testing",
    summary: "We find the holes before the attackers do.",
    outcomes: [
      "Penetration testing (web & network)",
      "Vulnerability assessment report",
      "OWASP Top 10 coverage",
      "Security header & SSL audit",
      "Remediation guidance",
    ],
    engagement: "Delivered post-build or as a standalone audit. 1–2 weeks.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    n: "05",
    title: "Social Media Management",
    summary: "Consistent presence, real engagement, measurable growth.",
    outcomes: [
      "LinkedIn profile & company page management",
      "Content creation & monthly scheduling",
      "Community engagement & DM handling",
      "Monthly analytics & performance report",
      "Hashtag & audience growth strategy",
    ],
    engagement: "Ongoing monthly retainer. Onboarding in the first week.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M7 17V10M12 17V7M17 17v-4" />
      </svg>
    ),
  },
  {
    n: "06",
    title: "AI Promotional Videos",
    summary: "Scroll-stopping videos built with AI — real voices, clean captions, zero production overhead.",
    outcomes: [
      "Generative AI video production",
      "Natural, human-sounding AI voiceover",
      "Custom captions styled to your brand",
      "Tailored scripts per product or campaign",
      "Optimised for social, ads & web",
    ],
    engagement: "Per video or monthly package. First draft in 3–5 days.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M10 8l6 3.5-6 3.5V8z" />
        <path d="M7 21h10M12 17v4" />
      </svg>
    ),
  },
];

function ServiceCard({ svc, index, inView }: { svc: typeof services[0]; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const rotateX = useSpring(rawRX, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(rawRY, { stiffness: 180, damping: 24 });
  const spotlight = useMotionTemplate`radial-gradient(200px circle at ${glowX}% ${glowY}%, rgba(173,138,82,0.09), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rawRX.set((y - 0.5) * -8);
    rawRY.set((x - 0.5) * 8);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="pillar-card relative flex flex-col overflow-hidden cursor-default"
      style={{
        background: "rgba(10,29,53,0.95)",
        border: "1px solid rgba(159,176,190,0.08)",
        rotateX,
        rotateY,
        transformPerspective: "1100px",
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rawRX.set(0); rawRY.set(0); glowX.set(50); glowY.set(50); }}
      whileHover={{ borderColor: "rgba(173,138,82,0.3)", boxShadow: "0 0 0 1px rgba(173,138,82,0.12), 0 24px 48px rgba(0,0,0,0.3)" } as never}
    >
      {/* Cursor spotlight */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />

      {/* Large ghost number */}
      <span
        className="absolute font-bold select-none pointer-events-none"
        style={{ fontSize: "9rem", color: "rgba(255,255,255,0.025)", lineHeight: 1, bottom: "-12px", right: "-6px", letterSpacing: "-0.05em" }}
      >
        {svc.n}
      </span>

      {/* Icon */}
      <div className="mb-8 relative z-10" style={{ color: "rgba(255,255,255,0.3)" }}>{svc.icon}</div>

      {/* Content */}
      <div className="flex flex-col gap-5 flex-1 relative z-10">
        <div>
          <div style={{ overflow: "hidden", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
            <motion.h3
              className="font-semibold text-white mb-3"
              style={{ fontSize: "clamp(1.3rem,1.8vw,1.6rem)", letterSpacing: "-0.02em", lineHeight: "1.2" }}
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 + index * 0.1 }}
            >
              {svc.title}
            </motion.h3>
          </div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", lineHeight: "1.7" }}>{svc.summary}</p>
        </div>

        <ul className="flex flex-col gap-2.5 flex-1">
          {svc.outcomes.map((o, oi) => (
            <motion.li
              key={o}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.35 + index * 0.1 + oi * 0.05 }}
            >
              <span className="flex-shrink-0 mt-[7px]" style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#AD8A52", display: "block" }} />
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.65" }}>{o}</span>
            </motion.li>
          ))}
        </ul>

        <div className="pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", lineHeight: "1.6" }}>{svc.engagement}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Practice() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-8% 0px" });

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "#0C2340", borderTop: "1px solid rgba(159,176,190,0.08)" }}
    >
      <ParticleCanvas count={25} />
      <div className="grid-overlay" style={{ opacity: 0.1 }} />

      <motion.div
        className="absolute pointer-events-none"
        style={{ top: "-10%", right: "-15%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(173,138,82,0.05), transparent 65%)", y: bgY }}
      />

      <div ref={headerRef} className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-14 md:mb-20 gap-8">
          <div style={{ overflow: "hidden", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
            <motion.h2
              className="font-semibold text-white"
              style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)", letterSpacing: "-0.025em", lineHeight: "1.1" }}
              initial={{ y: "105%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              What we offer
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="text-sm font-medium transition-opacity duration-200 hover:opacity-50 flex-shrink-0"
            style={{ color: "#C2A065" }}
          >
            Get a quote →
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(159,176,190,0.06)" }}>
          {services.map((svc, i) => (
            <ServiceCard key={svc.n} svc={svc} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
