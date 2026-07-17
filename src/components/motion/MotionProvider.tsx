"use client";

import { MotionConfig } from "framer-motion";

// Centralizes reduced-motion handling: framer-motion will automatically
// disable/soften animations for users with prefers-reduced-motion, and
// (unlike prefers-reduced-motion) also picks up next/js OS-level toggles
// exposed via useReducedMotion() elsewhere if ever needed.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
