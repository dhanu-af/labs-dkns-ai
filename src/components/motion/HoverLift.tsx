"use client";

import { motion } from "framer-motion";

interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical lift in px on hover. */
  y?: number;
  scale?: number;
}

// Wraps the whileHover lift pattern used on cards and quick-link pills.
export function HoverLift({ children, className, y = -4, scale }: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{ y, ...(scale ? { scale } : {}) }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
