"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade-and-rise on first entry into the viewport. The workhorse reveal. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.08 * i, ease: EASE },
  }),
};

/**
 * Headline reveal: each line is clipped by its own mask and slides up.
 * Lines stay separate block elements so the clip never crops descenders.
 */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  as: Tag = "h2",
  startDelay = 0,
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "p";
  startDelay?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <Tag className={className}>
      <div ref={ref}>
        {lines.map((line, i) => (
          <span key={line} className={`line-mask ${lineClassName ?? ""}`}>
            <motion.span
              className="block"
              custom={i + startDelay}
              variants={lineVariants}
              initial={reduced ? "visible" : "hidden"}
              animate={inView ? "visible" : undefined}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </div>
    </Tag>
  );
}

/** Counts from 0 to `value` once the number scrolls into view. */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className={className}>
      {reduced ? value : display}
      {suffix}
    </span>
  );
}
