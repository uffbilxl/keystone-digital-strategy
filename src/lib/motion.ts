import type { Transition } from "framer-motion";

// Typed bezier curve - Framer Motion requires tuple type for custom easing
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];

export const transition = (delay = 0, duration = 0.65): Transition => ({
  duration,
  ease: EASE_OUT,
  delay,
});

export const fadeUp = (delay = 0, duration = 0.65) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: transition(delay, duration),
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
});
