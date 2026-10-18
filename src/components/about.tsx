"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Counter, MaskedLines, Reveal } from "@/components/motion-primitives";
import { CERTIFICATIONS, STATS } from "@/lib/content";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="relative bg-cream py-24 md:py-40">
      <div className="mx-auto max-w-[92rem] px-6 md:px-10">
        <div
          ref={ref}
          className="grid gap-14 lg:grid-cols-12 lg:gap-16"
        >
          {/* Sticky image column. Deliberately taller than the viewport gutter
              so the parallax has room to travel. */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              {/* Portrait only once the image sits in its own column; full-width
                  portrait would eat an entire tablet viewport before any copy. */}
              <div className="grain relative aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/10] lg:aspect-[4/5]">
                <motion.div
                  style={reduced ? undefined : { y: imageY }}
                  className="absolute -inset-y-[8%] inset-x-0"
                >
                  <Image
                    src="/images/about-cargo-ship.jpg"
                    alt="Container vessel berthed alongside a gantry crane"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>

              <Reveal delay={0.1}>
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  {CERTIFICATIONS.map((c) => (
                    <li
                      key={c}
                      className="font-text text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-80"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-8">
            <Reveal>
              <p className="mb-8 flex items-center gap-3 font-text text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-ink-80">
                <span className="h-px w-10 bg-signal" />
                About ALNAZ
              </p>
            </Reveal>

            <MaskedLines
              lines={["A bridge between", "makers and markets"]}
              className="font-display text-[clamp(2.25rem,5vw,4.75rem)] font-extrabold text-ink"
            />

            <div className="mt-10 max-w-[62ch] space-y-6 font-text text-base leading-[1.75] text-ink-80 md:text-lg">
              <Reveal delay={0.05}>
                <p>
                  Founded in 2004, ALNAZ International grew from a boutique
                  trading firm into a diversified global enterprise. Today we
                  are a strategic bridge connecting manufacturers and
                  wholesalers across Turkey, Asia, Eastern Europe and the Middle
                  East, enabling seamless international trade and long-term
                  partnerships.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p>
                  We specialise in the procurement and supply of bulk
                  agricultural commodities alongside building and construction
                  materials. Our import and export desks keep finished goods and
                  FMCG moving between markets with consistency, reliability and
                  quality.
                </p>
              </Reveal>
              <Reveal delay={0.19}>
                <p>
                  We also support businesses through tailored sourcing —
                  including private label manufacturing and unbranded bulk goods
                  — so partners can build and expand their own brands with
                  confidence. Every product meets internationally recognised
                  standards, backed by a dedicated team of over 125
                  professionals.
                </p>
              </Reveal>
            </div>

            <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink/15 pt-10 md:grid-cols-4">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={0.06 * i}>
                  <div>
                    <dd className="font-display text-[clamp(2rem,3.4vw,3.25rem)] font-extrabold text-ink">
                      <Counter value={s.value} suffix={s.suffix} />
                    </dd>
                    <dt className="mt-2 font-text text-[0.72rem] uppercase tracking-[0.18em] text-ink-50">
                      {s.label}
                    </dt>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
