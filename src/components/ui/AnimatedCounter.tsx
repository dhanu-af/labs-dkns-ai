"use client";

import { useEffect, useState } from "react";
import { animate, useMotionValue, useMotionValueEvent } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  className?: string;
  /** Optional suffix, e.g. "+". */
  suffix?: string;
}

// Counts up from 0 to a resolved number (fetched server-side, not a live
// subscription) as soon as the component mounts. Respects reduced-motion via
// the ancestor MotionConfig (framer-motion's `animate()` still checks it).
// Deliberately does not gate on scroll-into-view (e.g. via useInView) --
// verified in this project's sandbox that IntersectionObserver-driven hooks
// don't reliably fire in the preview automation tooling, and the stats bar
// sits right below the fold anyway, so animating on mount is both simpler
// and more robust than a scroll-triggered version we can't fully verify here.
export function AnimatedCounter({ value, className, suffix = "" }: AnimatedCounterProps) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [value, motionValue]);

  return (
    <span className={className}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
