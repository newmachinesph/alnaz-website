"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { MaskedLines } from "@/components/motion-primitives";

const META = [
  { k: "Est.", v: "2004" },
  { k: "HQ", v: "Shanghai" },
  { k: "Markets", v: "Turkey · Asia · EU · MEA" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Image drifts slower than the page; copy drifts faster and dissolves.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="grain relative flex h-[100svh] min-h-[40rem] flex-col justify-end overflow-hidden bg-ink"
    >
      <motion.div
        style={reduced ? undefined : { y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero-containers.jpg"
          alt="Aerial view of stacked shipping containers at a freight terminal"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Two scrims: a vertical one for legibility, a left-weighted one for the copy. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      <motion.div
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
        className="relative mx-auto w-full max-w-[92rem] px-6 pb-16 md:px-10 md:pb-24"
      >
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mb-8 flex items-center gap-3 font-text text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-cream/70 sm:text-[0.72rem] sm:tracking-[0.28em]"
        >
          <span className="h-px w-6 shrink-0 bg-signal sm:w-10" />
          Global sourcing &amp; distribution
        </motion.p>

        <MaskedLines
          as="h1"
          lines={["The Trusted Source", "that You Deserve"]}
          className="font-display max-w-[16ch] text-[clamp(2.75rem,8.4vw,8.5rem)] font-extrabold text-cream"
        />

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md"
          >
            <p className="font-text text-lg text-cream/85 md:text-xl">
              Putting people together. Twenty years of moving commodities,
              materials and finished goods across four continents.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/#products"
                className="group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4 font-text text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-500 hover:bg-signal hover:text-cream"
              >
                What we trade
                <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              <Link
                href="/#about"
                className="rule-link font-text text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-cream"
              >
                Who we are
              </Link>
            </div>
          </motion.div>

          <motion.dl
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-wrap gap-x-8 gap-y-5 border-t border-cream/20 pt-6 md:gap-x-14"
          >
            {META.map((m) => (
              <div key={m.k}>
                <dt className="font-text text-[0.68rem] uppercase tracking-[0.2em] text-cream/50">
                  {m.k}
                </dt>
                <dd className="font-display mt-1 text-base font-semibold text-cream md:text-lg">
                  {m.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>
    </section>
  );
}
