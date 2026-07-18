"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useMotionValueEvent } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  className?: string;
  /** Optional suffix, e.g. "+". */
  suffix?: string;
}

// Counts up from 0 to a resolved number (fetched server-side, not a live
// subscription) once scrolled into view. Respects reduced-motion via the
// ancestor MotionConfig (framer-motion's `animate()` still checks it).
export function AnimatedCounter({ value, className, suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, value, motionValue]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
