"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "./Logo";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [splitting, setSplitting] = useState(false);

  useEffect(() => {
    // Fill the loading bar over ~1.6s
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        // Short pause then split
        setTimeout(() => {
          setSplitting(true);
          setTimeout(onComplete, 700);
        }, 200);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!splitting ? (
        // Full-screen splash
        <motion.div
          key="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0C2340" }}
        >
          {/* Grid overlay */}
          <div className="grid-overlay" style={{ opacity: 0.3 }} />

          {/* Gold radial glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle, rgba(173,138,82,0.1), transparent 65%)",
            }}
          />

          <div className="relative flex flex-col items-center gap-10">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <LogoMark size={96} archColor="#FFFFFF" keystoneColor="#C2A065" />
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
              className="flex flex-col items-center gap-1"
            >
              <span
                className="font-semibold text-white"
                style={{ fontSize: "22px", letterSpacing: "-0.01em" }}
              >
                Keystone
              </span>
              <span
                className="font-medium uppercase text-white/50"
                style={{ fontSize: "9px", letterSpacing: "0.32em" }}
              >
                Digital Strategy
              </span>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="relative overflow-hidden"
              style={{ width: "160px", height: "1px", background: "rgba(255,255,255,0.1)" }}
            >
              <div
                className="absolute inset-y-0 left-0 transition-none"
                style={{
                  width: `${progress * 100}%`,
                  background: "linear-gradient(90deg, #AD8A52, #C2A065)",
                  transition: "width 0.05s linear",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : (
        // Split panels
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
