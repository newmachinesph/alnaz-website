"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { MaskedLines, Reveal } from "@/components/motion-primitives";
import { CATEGORIES } from "@/lib/catalog";

// The grid is deliberately uneven: spans, offsets and differing image ratios
// break the row rhythm so the section reads as an editorial spread, not a card
// dump. Row one spans 5+4+3; row two spans 4+3 and leaves the rest as air.
// One-column phones get a landscape crop — five stacked 4:5 portraits is a
// scroll marathon. The uneven editorial rhythm only kicks in at lg.
const LAYOUT = [
  { cell: "lg:col-span-5", frame: "aspect-[4/3] sm:aspect-[4/5] lg:aspect-[5/6]" },
  { cell: "lg:col-span-4 lg:mt-20", frame: "aspect-[4/3] sm:aspect-[4/5]" },
  { cell: "lg:col-span-3 lg:mt-36", frame: "aspect-[4/3] sm:aspect-[4/5] lg:aspect-[3/4.4]" },
  { cell: "lg:col-span-4", frame: "aspect-[4/3] sm:aspect-[4/5] lg:aspect-[4/3.4]" },
  { cell: "lg:col-span-3 lg:mt-16", frame: "aspect-[4/3] sm:aspect-[4/5] lg:aspect-[3/3.6]" },
];

export function Products() {
  const reduced = useReducedMotion();

  return (
    <section id="products" className="relative bg-cream pb-28 pt-24 md:pb-40 md:pt-32">
      <div className="mx-auto max-w-[92rem] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="mb-8 flex items-center gap-3 font-text text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-ink-80">
                <span className="h-px w-10 bg-signal" />
                What we offer
              </p>
            </Reveal>
            <MaskedLines
              lines={["Our Products"]}
              className="font-display text-[clamp(2.5rem,6.5vw,6.5rem)] font-extrabold text-ink"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-xs font-text text-base leading-relaxed text-ink-80">
              Five desks, one operating standard. Each line is sourced,
              inspected and shipped under the same compliance regime.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-12 lg:gap-x-8">
          {CATEGORIES.map((c, i) => (
            <li key={c.slug} className={`sm:col-span-1 ${LAYOUT[i].cell}`}>
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 1,
                  delay: (i % 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex h-full flex-col"
              >
                <Link
                  href={`/products/${c.slug}`}
                  className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                >
                  <div
                    className={`grain relative overflow-hidden bg-ink ${LAYOUT[i].frame}`}
                  >
                    {c.hero && (
                      <Image
                        src={c.hero}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
                      />
                    )}
                    <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25" />
                    <span className="font-display absolute left-5 top-4 text-sm font-semibold tracking-[0.1em] text-cream/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative mt-5 flex items-start justify-between gap-4 border-t border-ink/15 pt-4">
                    {/* Accent rule wipes across the divider on hover. */}
                    <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                    <div>
                      <h3 className="font-display whitespace-pre-line text-xl font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-ink md:text-2xl">
                        {c.cardTitle}
                      </h3>
                      <p className="mt-3 max-w-[36ch] font-text text-sm leading-relaxed text-ink-50">
                        {c.groups
                          .slice(0, 4)
                          .map((g) => g.name)
                          .join(" · ")}
                        {c.groups.length > 4 && (
                          <span className="whitespace-nowrap text-ink-50/70">
                            {" "}
                            +{c.groups.length - 4} more
                          </span>
                        )}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-lg text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:text-signal"
                    >
                      &rarr;
                    </span>
                  </div>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
