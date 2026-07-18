import type { Variants } from "framer-motion";

export const EASE_STANDARD = [0.16, 1, 0.3, 1] as const;

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
};

export function staggerContainer(stagger = 0.08): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };
}
