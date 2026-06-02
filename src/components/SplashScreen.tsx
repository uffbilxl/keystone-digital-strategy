"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

// The arch animation itself — identical brand shape, drawn with pathLength
function SplashArch() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 220, height: 260 }}>
      {/* Soft bloom behind arch */}
      <motion.div
        className="absolute"
        style={{
          inset: "10%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(173,138,82,0.14), transparent 65%)",
          filter: "blur(32px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.7] }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
      />

      <svg
        viewBox="0 0 100 100"
        width="220"
        height="260"
        fill="none"
        style={{ overflow: "visible" }}
      >
        {/* Arch body */}
        <motion.path
          d="M 12,86 L 12,48 A 38,38 0 0 1 88,48 L 88,86 L 72,86 L 72,48 A 22,22 0 0 0 28,48 L 28,86 Z"
          fill="rgba(173,138,82,0.04)"
          stroke="rgba(173,138,82,0.35)"
          strokeWidth="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
        />

        {/* Foundation bar */}
        <motion.rect
          x="6.5" y="85.6" width="87" height="3" rx="0.6"
          fill="rgba(173,138,82,0.25)"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          style={{ transformOrigin: "50px 87px" }}
          transition={{ duration: 0.7, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Framework lines */}
        {([
          [61.66, 29.34, 70.14, 15.77],
          [69.42, 37.67, 83.55, 30.16],
          [38.34, 29.34, 29.86, 15.77],
          [30.58, 37.67, 16.45, 30.16],
        ] as [number, number, number, number][]).map((ln, i) => (
          <motion.line
            key={i}
            x1={ln[0]} y1={ln[1]} x2={ln[2]} y2={ln[3]}
            stroke="rgba(173,138,82,0.4)"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: 1.9 + i * 0.1 }}
          />
        ))}

        {/* Keystone wedge — drops in last */}
        <motion.polygon
          points="41.5,8.5 58.5,8.5 55.8,27.5 44.2,27.5"
          fill="#AD8A52"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          strokeLinejoin="round"
          initial={{ opacity: 0, y: -12, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          style={{ transformOrigin: "50px 18px" }}
          transition={{ duration: 0.6, delay: 2.35, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Pulse ripple on completion */}
        <motion.circle
          cx="50" cy="47" r="38"
          fill="none"
          stroke="rgba(173,138,82,0.2)"
          strokeWidth="0.5"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: [0.9, 1.08], opacity: [0, 0.6, 0] }}
          style={{ transformOrigin: "50px 47px" }}
          transition={{ duration: 0.9, delay: 2.85, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);
  const [skip] = useState(() =>
    typeof window !== "undefined" && sessionStorage.getItem("ks_splash") === "1"
  );

  useEffect(() => {
    // Already shown this session — skip immediately
    if (skip || sessionStorage.getItem("ks_splash") === "1") {
      onComplete();
      return;
    }
    sessionStorage.setItem("ks_splash", "1");

    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 700);
    }, 3500);

    return () => clearTimeout(exitTimer);
  }, [onComplete]);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0C2340" }}
        >
          {/* Subtle grid */}
          <div className="grid-overlay" style={{ opacity: 0.1 }} />

          {/* Ambient glow */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "15%", left: "50%", transform: "translateX(-50%)",
              width: "500px", height: "500px",
              background: "radial-gradient(circle, rgba(173,138,82,0.08), transparent 65%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />

          <div className="flex flex-col items-center gap-8">
            {/* Arch draw — the entry ritual */}
            <SplashArch />

            {/* Wordmark fades in after arch is mostly drawn */}
            <motion.div
              className="flex flex-col items-center gap-1.5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-semibold text-white" style={{ fontSize: "20px", letterSpacing: "-0.01em" }}>
                Keystone
              </span>
              <span className="font-medium text-white/40" style={{ fontSize: "10px", letterSpacing: "0.04em" }}>
                Digital Strategy
              </span>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        /* Split exit — panels slide away */
        <div key="split" className="fixed inset-0 z-[9999] pointer-events-none">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2"
            style={{ background: "#0C2340" }}
          />
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2"
            style={{ background: "#0C2340" }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
