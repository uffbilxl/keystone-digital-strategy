"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";
import { ParticleCanvas } from "../ParticleCanvas";
import { LogoMark } from "../Logo";

function RevealLine({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    // Extra bottom padding so descenders ('y','g','p') aren't clipped
    <div style={{ overflow: "hidden", paddingBottom: "0.14em", marginBottom: "-0.14em", ...style }}>
      <motion.div
        initial={{ y: "108%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FloatingAccent({
  x, y, size, delay, duration, opacity, shape = "circle",
}: {
  x: string; y: string; size: number; delay: number; duration: number; opacity: number; shape?: "circle" | "diamond" | "hline";
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 2.5, delay, ease: "easeOut" }}
    >
      <motion.div
        animate={{
          y: [0, -12, 7, -4, 0],
          rotate: shape === "diamond" ? [0, 6, -4, 2, 0] : [0, 0, 0, 0, 0],
        }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        {shape === "circle" && (
          <div style={{ width: size, height: size, borderRadius: "50%", border: "1px solid rgba(173,138,82,0.28)", background: "radial-gradient(circle, rgba(173,138,82,0.05), transparent 70%)" }} />
        )}
        {shape === "diamond" && (
          <div style={{ width: size, height: size, border: "1px solid rgba(159,176,190,0.14)", transform: "rotate(45deg)" }} />
        )}
        {shape === "hline" && (
          <div style={{ width: size, height: "1px", background: "linear-gradient(90deg, transparent, rgba(173,138,82,0.35), transparent)" }} />
        )}
      </motion.div>
    </motion.div>
  );
}

function HeroArch({ springX, springY }: { springX: ReturnType<typeof useSpring>; springY: ReturnType<typeof useSpring> }) {
  const rotateY = useTransform(springX, [-500, 500], [-4, 4]);
  const rotateX = useTransform(springY, [-300, 300], [3, -3]);
  const translateX = useTransform(springX, [-500, 500], [-14, 14]);
  const translateY = useTransform(springY, [-300, 300], [-10, 10]);

  return (
    <motion.div
      className="absolute pointer-events-none hidden lg:flex items-center"
      style={{ right: "-2%", top: 0, bottom: 0, rotateY, rotateX, x: translateX, y: translateY, transformPerspective: "1200px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute"
        style={{ inset: "15%", background: "radial-gradient(ellipse at 50% 40%, rgba(173,138,82,0.1), transparent 65%)", filter: "blur(48px)" }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg
        width="520" height="620" viewBox="0 0 100 100" fill="none"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="archCenterGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#AD8A52" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#AD8A52" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#archCenterGlow)" />
        <motion.path
          d="M 12,86 L 12,48 A 38,38 0 0 1 88,48 L 88,86 L 72,86 L 72,48 A 22,22 0 0 0 28,48 L 28,86 Z"
          fill="rgba(173,138,82,0.03)" stroke="rgba(173,138,82,0.22)" strokeWidth="0.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.7, ease: "easeInOut" }}
        />
        <motion.rect x="6.5" y="85.6" width="87" height="3" rx="0.6" fill="rgba(173,138,82,0.18)"
          initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          style={{ transformOrigin: "50px 87px" }}
          transition={{ duration: 0.9, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
        />
        {[
          { x1: 61.66, y1: 29.34, x2: 70.14, y2: 15.77, d: 2.8 },
          { x1: 69.42, y1: 37.67, x2: 83.55, y2: 30.16, d: 3.0 },
          { x1: 38.34, y1: 29.34, x2: 29.86, y2: 15.77, d: 2.8 },
          { x1: 30.58, y1: 37.67, x2: 16.45, y2: 30.16, d: 3.0 },
        ].map((ln, i) => (
          <motion.line key={i} x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
            stroke="rgba(173,138,82,0.35)" strokeWidth="0.7"
            initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: ln.d, ease: "easeOut" }}
          />
        ))}
        <motion.polygon points="41.5,8.5 58.5,8.5 55.8,27.5 44.2,27.5"
          fill="rgba(173,138,82,0.15)" stroke="#C2A065" strokeWidth="0.6" strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: "50px 18px" }}
          transition={{ duration: 0.9, delay: 3.0, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.circle cx="50" cy="55" r="8" fill="none" stroke="rgba(173,138,82,0.3)" strokeWidth="0.5"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ transformOrigin: "50px 55px" }}
          transition={{ duration: 0.8, delay: 2.6 }}
        />
        <motion.circle cx="50" cy="55" r="4" fill="rgba(173,138,82,0.08)" stroke="rgba(173,138,82,0.5)" strokeWidth="0.4"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ transformOrigin: "50px 55px" }}
          transition={{ duration: 0.6, delay: 2.9 }}
        />
        <motion.circle cx="50" cy="55" r="4" fill="none" stroke="rgba(173,138,82,0.25)" strokeWidth="0.4"
          animate={{ r: [4, 14], opacity: [0.5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 3.5 }}
        />
      </motion.svg>
    </motion.div>
  );
}

function ServicesMarquee() {
  const items = [
    "Brand Identity",
    "Social Media Management",
    "Web Development",
    "Cybersecurity Testing",
    "AI Promotional Videos",
    "LinkedIn Management",
    "Social Media Branding",
  ];
  const doubled = [...items, ...items];
  return (
    <motion.div
      style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 2.2 }}
    >
      <motion.div
        style={{ display: "flex", alignItems: "center", width: "max-content", padding: "16px 0" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {doubled.flatMap((item, i) => [
          <span
            key={`t-${i}`}
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              marginRight: "2.5rem",
            }}
          >
            {item}
          </span>,
          <span
            key={`d-${i}`}
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "rgba(173,138,82,0.5)",
              flexShrink: 0,
              display: "inline-block",
              marginRight: "2.5rem",
            }}
          />,
        ])}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 40, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 18 });

  const glowBgX = useTransform(springX, [-500, 500], [25, 75]);
  const glowBgY = useTransform(springY, [-300, 300], [20, 80]);
  const bgGlow = useMotionTemplate`radial-gradient(700px circle at ${glowBgX}% ${glowBgY}%, rgba(173,138,82,0.07), transparent 60%)`;

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 700], [0, -90]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  // Stats stay fully visible until 400px scroll, then fade slowly to 900px
  const statsOpacity = useTransform(scrollY, [400, 900], [1, 0]);
  const statsY = useTransform(scrollY, [0, 900], [0, -40]);
  const archScrollY = useTransform(scrollY, [0, 700], [0, -45]);
  const particlesScrollY = useTransform(scrollY, [0, 700], [0, 32]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left - rect.width / 2);
    rawY.set(e.clientY - rect.top - rect.height / 2);
  };

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#0C2340" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
    >
      <motion.div className="absolute inset-0" style={{ y: particlesScrollY }}>
        <ParticleCanvas count={55} />
      </motion.div>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: bgGlow }} />
      <div className="grid-overlay" style={{ opacity: 0.12 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 3px)" }} />

      <FloatingAccent x="4%" y="18%" size={72} delay={1.8} duration={13} opacity={0.35} shape="circle" />
      <FloatingAccent x="7%" y="62%" size={36} delay={2.2} duration={15} opacity={0.28} shape="diamond" />
      <FloatingAccent x="55%" y="8%" size={100} delay={1.2} duration={17} opacity={0.18} shape="hline" />
      <FloatingAccent x="14%" y="82%" size={140} delay={0.8} duration={19} opacity={0.12} shape="hline" />
      <FloatingAccent x="68%" y="78%" size={52} delay={1.5} duration={11} opacity={0.22} shape="diamond" />

      <motion.div className="absolute inset-0" style={{ y: archScrollY }}>
        <HeroArch springX={springX} springY={springY} />
      </motion.div>

      {/* Main content — vertically centred, never touches nav or bottom strip */}
      <motion.div
        className="relative flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-6 md:px-10"
        style={{ paddingTop: "6rem", paddingBottom: "2rem", y: contentY, opacity: contentOpacity, zIndex: 10 }}
      >
        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 700,
            color: "#fff",
            fontSize: "clamp(3rem,7.5vw,7rem)",
            letterSpacing: "-0.03em",
            lineHeight: "1.05",
            maxWidth: "820px",
          }}
        >
          <RevealLine delay={0.3}>Brands built.</RevealLine>
          <RevealLine delay={0.45}>Websites secured.</RevealLine>
          <RevealLine delay={0.6} style={{ paddingBottom: "0.22em", marginBottom: "-0.22em" }}>
            <span style={{ color: "#AD8A52", fontStyle: "italic", position: "relative", display: "inline-block" }}>
              Done right.
              <motion.span
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: "55%",
                  background: "linear-gradient(90deg, transparent, rgba(255,225,140,0.22), transparent)",
                  pointerEvents: "none",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "220%" }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 7, ease: "easeInOut", delay: 4 }}
              />
            </span>
            <motion.span
              style={{
                display: "inline-block",
                width: "4px",
                height: "0.7em",
                background: "#AD8A52",
                marginLeft: "10px",
                verticalAlign: "middle",
                borderRadius: "2px",
              }}
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: 1.8, repeatType: "mirror" }}
            />
          </RevealLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: "2rem", color: "rgba(255,255,255,0.42)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "520px", lineHeight: "1.85", fontWeight: 400 }}
        >
          Six specialist services under one roof. Brand identity, social media, web development, cybersecurity, AI video, and LinkedIn management. Delivered end-to-end by a senior specialist team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4"
          style={{ marginTop: "2.5rem" }}
        >
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); scrollTo("services"); }}
            className="group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold transition-all duration-200"
            style={{ background: "#AD8A52", color: "#fff", letterSpacing: "0.02em" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#C2A065"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#AD8A52"; }}
          >
            Our Services
            <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-200">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium"
            style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.18)", letterSpacing: "0.02em", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.48)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.background = "transparent"; }}
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Service tags */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: "2.2rem", display: "flex", flexWrap: "wrap", gap: "8px" }}
        >
          {["Brand Identity", "Web Dev", "Cybersecurity", "Social Media", "AI Video", "LinkedIn"].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "5px 13px",
                letterSpacing: "0.05em",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex items-center gap-3"
          style={{ marginTop: "3rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
        >
          <div style={{ width: "1px", height: "36px", overflow: "hidden", position: "relative" }}>
            <motion.div
              style={{ position: "absolute", width: "1px", height: "100%", background: "linear-gradient(to bottom, transparent, rgba(173,138,82,0.7), transparent)" }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Services marquee */}
      <div className="relative" style={{ zIndex: 10 }}>
        <ServicesMarquee />
      </div>

      {/* Stats strip — own opacity so it lingers much longer on scroll */}
      <motion.div
        className="relative max-w-6xl mx-auto w-full px-6 md:px-10 pb-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", zIndex: 10, y: statsY, opacity: statsOpacity }}
      >
        <div className="pt-7 flex items-center gap-8 md:gap-14">
          {[
            { n: "3+", label: "Years", delay: 1.4 },
            { n: "100+", label: "Projects", delay: 1.55 },
            { n: "4", label: "Specialists", delay: 1.7 },
          ].map(({ n, label, delay }) => (
            <motion.div
              key={label}
              className="flex items-baseline gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-semibold text-white" style={{ fontSize: "1.5rem", letterSpacing: "-0.025em" }}>{n}</span>
              <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
            </motion.div>
          ))}
          <motion.div
            className="ml-auto hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ delay: 2.2, duration: 1.2 }}
          >
            <LogoMark size={48} archColor="#FFFFFF" keystoneColor="#C2A065" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
