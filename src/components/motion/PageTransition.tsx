"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_STANDARD } from "@/components/motion/variants";

// Mounted once around {children} in the protected layout (not a template.tsx --
// Next's template remount happens before AnimatePresence can play an exit
// animation on the outgoing tree). mode="wait" trades ~200ms of perceived
// latency for a clean crossfade between pages.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: EASE_STANDARD }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
