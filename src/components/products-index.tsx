"use client";

import Image from "next/image";
import Link from "next/link";
import { MaskedLines, Reveal } from "@/components/motion-primitives";
import { CATEGORIES } from "@/lib/catalog";

export function ProductsIndex() {
  const totalLines = CATEGORIES.reduce(
    (n, c) => n + c.groups.reduce((m, g) => m + g.items.length, 0),
    0,
  );

  return (
    <>
      {/* No photo here on purpose: the desks below carry the imagery, so the
          opener is pure type against the ink field. */}
      <section className="grain relative flex min-h-[62svh] items-end overflow-hidden bg-ink pb-16 pt-36 md:pb-20">
        <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10">
          <p className="mb-8 flex items-center gap-3 font-text text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-cream/60">
            <span className="h-px w-10 bg-signal" />
            What we offer
          </p>

          <MaskedLines
            as="h1"
            lines={["Five desks.", "One standard."]}
            className="font-display max-w-[14ch] text-[clamp(2.75rem,8vw,7.5rem)] font-extrabold text-cream"
          />

          <p className="mt-10 max-w-xl font-text text-lg text-cream/80">
            {CATEGORIES.length} commodity desks, {totalLines} traded lines. Every
            one sourced, inspected and shipped under the same compliance regime —
            ISO 22000, HACCP, Halal, BRC and FDA.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <ul className="mx-auto max-w-[92rem] px-6 md:px-10">
          {CATEGORIES.map((c, i) => (
            <li key={c.slug} className="border-b border-ink/15 last:border-b-0">
              <Reveal>
                <Link
                  href={`/products/${c.slug}`}
                  className="group grid grid-cols-1 items-center gap-5 py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal sm:grid-cols-2 sm:gap-8 sm:py-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0 lg:py-14"
                >
                  {/* One text block below lg so the tall image cannot stretch the
                      rows apart; `lg:contents` promotes these back to grid items,
                      where explicit columns put the image back in the middle. */}
                  <div className="flex flex-col gap-3 lg:contents">
                    <span className="font-display text-sm font-semibold text-signal lg:col-start-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h2 className="font-display text-[clamp(1.85rem,4.2vw,3.5rem)] font-extrabold uppercase leading-[1.02] text-ink transition-colors duration-500 group-hover:text-signal lg:col-span-7 lg:col-start-2 lg:row-start-1">
                      {c.cardTitle.replace("\n", " ")}
                    </h2>

                    <p className="font-text text-sm leading-relaxed text-ink-50 lg:col-span-2 lg:col-start-10 lg:row-start-1">
                      {c.groups.length} groups ·{" "}
                      {c.groups.reduce((n, g) => n + g.items.length, 0)} lines
                    </p>

                    <span
                      aria-hidden
                      className="font-display text-2xl text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-hover:text-signal lg:col-start-12 lg:row-start-1 lg:justify-self-end"
                    >
                      &rarr;
                    </span>
                  </div>

                  {/* Below lg the image is simply present: a hover reward is no
                      reward on a touch screen. At lg it sits on its own row and
                      opens downward under the title on hover. */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink sm:aspect-[4/3] lg:col-span-10 lg:col-start-2 lg:row-start-2 lg:aspect-auto lg:h-0 lg:opacity-0 lg:transition-all lg:duration-700 lg:ease-[var(--ease-out-expo)] lg:group-hover:mt-8 lg:group-hover:h-72 lg:group-hover:opacity-100">
                    {c.hero && (
                      <Image
                        src={c.hero}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 80vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
