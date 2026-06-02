"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { ParticleCanvas } from "./ParticleCanvas";

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
      <motion.div
        initial={{ y: "108%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function MiniArch({
  springX,
  springY,
}: {
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  const rotateY = useTransform(springX, [-400, 400], [-3, 3]);
  const rotateX = useTransform(springY, [-200, 200], [2, -2]);
  const x = useTransform(springX, [-400, 400], [-10, 10]);
  const y = useTransform(springY, [-200, 200], [-7, 7]);

  return (
    <motion.div
      className="absolute pointer-events-none hidden md:flex items-center"
      style={{
        right: "-1%",
        top: 0,
        bottom: 0,
        rotateY,
        rotateX,
        x,
        y,
        transformPerspective: "1100px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="absolute"
        style={{
          inset: "10%",
          background: "radial-gradient(ellipse at 50% 45%, rgba(173,138,82,0.09), transparent 65%)",
          filter: "blur(44px)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        width="340"
        height="420"
        viewBox="0 0 100 100"
        fill="none"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="pgArchGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#AD8A52" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#AD8A52" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#pgArchGlow)" />

        <motion.path
          d="M 12,86 L 12,48 A 38,38 0 0 1 88,48 L 88,86 L 72,86 L 72,48 A 22,22 0 0 0 28,48 L 28,86 Z"
          fill="rgba(173,138,82,0.03)"
          stroke="rgba(173,138,82,0.2)"
          strokeWidth="0.45"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />

        <motion.rect
          x="6.5" y="85.6" width="87" height="3" rx="0.6"
          fill="rgba(173,138,82,0.15)"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          style={{ transformOrigin: "50px 87px" }}
          transition={{ duration: 0.8, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
        />

        {[
          [61.66, 29.34, 70.14, 15.77],
          [69.42, 37.67, 83.55, 30.16],
          [38.34, 29.34, 29.86, 15.77],
          [30.58, 37.67, 16.45, 30.16],
        ].map((ln, i) => (
          <motion.line
            key={i}
            x1={ln[0]} y1={ln[1]} x2={ln[2]} y2={ln[3]}
            stroke="rgba(173,138,82,0.3)"
            strokeWidth="0.7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.3 + i * 0.12 }}
          />
        ))}

        <motion.polygon
          points="41.5,8.5 58.5,8.5 55.8,27.5 44.2,27.5"
          fill="rgba(173,138,82,0.12)"
          stroke="#C2A065"
          strokeWidth="0.6"
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: "50px 18px" }}
          transition={{ duration: 0.7, delay: 2.6 }}
        />

        <motion.circle
          cx="50" cy="55" r="4"
          fill="none"
          stroke="rgba(173,138,82,0.25)"
          strokeWidth="0.4"
          animate={{ r: [4, 13], opacity: [0.5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 2.9 }}
        />
      </motion.svg>
    </motion.div>
  );
}

export function PageHero({ label, title, description }: PageHeroProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 40, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 18 });

  const glowX = useTransform(springX, [-400, 400], [30, 70]);
  const glowY = useTransform(springY, [-200, 200], [20, 80]);
  const bgGlow = useMotionTemplate`radial-gradient(500px circle at ${glowX}% ${glowY}%, rgba(173,138,82,0.07), transparent 60%)`;

  // Split title on explicit line breaks for multi-line reveals
  const lines = title.split("\\n");

  return (
    <section
      className="relative pt-28 md:pt-36 pb-16 md:pb-28 overflow-hidden"
      style={{ background: "#0C2340", borderBottom: "1px solid rgba(159,176,190,0.08)" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        rawX.set(e.clientX - rect.left - rect.width / 2);
        rawY.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
    >
      <ParticleCanvas count={30} />
      <div className="grid-overlay" style={{ opacity: 0.12 }} />
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: bgGlow }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.007) 2px, rgba(255,255,255,0.007) 3px)" }}
      />

      <MiniArch springX={springX} springY={springY} />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 z-10">
        <h1
          className="font-semibold text-white"
          style={{ fontSize: "clamp(2.5rem,5vw,4rem)", letterSpacing: "-0.025em", lineHeight: "1.08", maxWidth: "680px" }}
        >
          {lines.map((line, i) => (
            <RevealLine key={i} delay={0.1 + i * 0.12}>{line}</RevealLine>
          ))}
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 + lines.length * 0.12 + 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-sm"
            style={{ color: "rgba(255,255,255,0.42)", maxWidth: "460px", lineHeight: "1.85", fontWeight: 400 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
