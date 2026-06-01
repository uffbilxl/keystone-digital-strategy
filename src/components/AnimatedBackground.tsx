"use client";

import { motion } from "framer-motion";

interface Orb {
  size: number;
  x: string;
  y: string;
  duration: number;
  delay: number;
  opacity: number;
}

const orbs: Orb[] = [
  { size: 320, x: "10%", y: "20%", duration: 18, delay: 0, opacity: 0.06 },
  { size: 200, x: "75%", y: "10%", duration: 22, delay: 3, opacity: 0.05 },
  { size: 260, x: "60%", y: "65%", duration: 16, delay: 6, opacity: 0.04 },
  { size: 150, x: "30%", y: "75%", duration: 24, delay: 2, opacity: 0.05 },
  { size: 180, x: "85%", y: "45%", duration: 20, delay: 9, opacity: 0.04 },
];

export function AnimatedBackground({ gold = false }: { gold?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: gold
              ? `radial-gradient(circle, rgba(173,138,82,${orb.opacity * 1.5}), transparent 70%)`
              : `radial-gradient(circle, rgba(159,176,190,${orb.opacity}), transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.08, 0.96, 1.04, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
