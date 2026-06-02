"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

// Fully self-contained, responsive arch — square container eliminates the
// non-square SVG / overflow:visible centering issue that caused the right-shift.
function SplashArch() {
  return (
    // clamp: 200px min, 52vw on mobile, 260px max — never overflows on any screen
    <div
      style={{
        position: "relative",
        width: "clamp(200px, 52vw, 260px)",
        height: "clamp(200px, 52vw, 260px)",
        flexShrink: 0,
      }}
    >
      {/* Bloom sits inside the container, centred, doesn't affect layout */}
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "130%",
          height: "130%",
          background: "radial-gradient(ellipse, rgba(173,138,82,0.12), transparent 65%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.7] }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
      />

      {/* Square SVG — viewBox 100×100, rendered 100%×100% of container.
          No overflow:visible — everything fits inside the viewBox. */}
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        fill="none"
        style={{ display: "block" }}
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

        {/* Foundation bar — uses pathLength so no transform-origin issues in SVG */}
        <motion.line
          x1="6.5" y1="87.1" x2="93.5" y2="87.1"
          stroke="rgba(173,138,82,0.28)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
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
            stroke="rgba(173,138,82,0.38)"
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
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.8"
          strokeLinejoin="round"
          initial={{ opacity: 0, y: -10, scale: 0.75 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          style={{ transformOrigin: "50% 18%" }}
          transition={{ duration: 0.6, delay: 2.35, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Completion ripple */}
        <motion.circle
          cx="50" cy="47" r="38"
          fill="none"
          stroke="rgba(173,138,82,0.18)"
          strokeWidth="0.5"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.92, 1.07] }}
          style={{ transformOrigin: "50% 47%" }}
          transition={{ duration: 1, delay: 2.85, ease: "easeOut" }}
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
  }, [onComplete, skip]);

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
          <div className="grid-overlay" style={{ opacity: 0.1 }} />

          {/* Centred column — items-center ensures both arch and wordmark are centred */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <SplashArch />

            <motion.div
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-semibold text-white" style={{ fontSize: "20px", letterSpacing: "-0.01em" }}>
                Keystone
              </span>
              <span className="font-medium" style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", letterSpacing: "0.04em" }}>
                Digital Strategy
              </span>
            </motion.div>
          </div>
        </motion.div>
      ) : (
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
