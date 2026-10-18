"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { MaskedLines, Reveal } from "@/components/motion-primitives";
import type { Category } from "@/lib/catalog";

export const groupId = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function CategoryHero({ category }: { category: Category }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const itemCount = category.groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section
      ref={ref}
      className="grain relative flex h-[74svh] min-h-[32rem] items-end overflow-hidden bg-ink"
    >
      {category.hero && (
        <motion.div
          style={reduced ? undefined : { y: imageY }}
          className="absolute inset-0"
        >
          <Image
            src={category.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      <motion.div
        style={reduced ? undefined : { y: copyY }}
        className="relative mx-auto w-full max-w-[92rem] px-6 pb-16 md:px-10 md:pb-20"
      >
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-3 font-text text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-cream/60">
            <li>
              <Link href="/products" className="rule-link hover:text-cream">
                Products
              </Link>
            </li>
            <li aria-hidden className="text-signal">
              /
            </li>
            <li className="text-cream">{category.cardTitle.replace("\n", " ")}</li>
          </ol>
        </nav>

        <MaskedLines
          as="h1"
          lines={category.title.split(" and ")}
          className="font-display max-w-[18ch] text-[clamp(2.25rem,6.2vw,6rem)] font-extrabold text-cream"
        />

        <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-cream/20 pt-6 md:gap-x-16">
          <div>
            <dt className="font-text text-[0.68rem] uppercase tracking-[0.2em] text-cream/50">
              Product groups
            </dt>
            <dd className="font-display mt-1 text-lg font-semibold text-cream">
              {category.groups.length}
            </dd>
          </div>
          <div>
            <dt className="font-text text-[0.68rem] uppercase tracking-[0.2em] text-cream/50">
              Lines
            </dt>
            <dd className="font-display mt-1 text-lg font-semibold text-cream">
              {itemCount}
            </dd>
          </div>
          <div>
            <dt className="font-text text-[0.68rem] uppercase tracking-[0.2em] text-cream/50">
              Terms
            </dt>
            <dd className="font-display mt-1 text-lg font-semibold text-cream">
              FOB · CIF · CFR
            </dd>
          </div>
        </dl>
      </motion.div>
    </section>
  );
}

/** Sticky index that tracks whichever group is currently in view. */
function GroupIndex({ category, active }: { category: Category; active: string }) {
  return (
    <nav aria-label="Product groups" className="hidden lg:col-span-3 lg:block">
      <div className="sticky top-28">
        <p className="font-text text-[0.68rem] uppercase tracking-[0.2em] text-ink-50">
          In this range
        </p>
        <ul className="mt-5 space-y-1">
          {category.groups.map((g) => {
            const id = groupId(g.name);
            const isActive = id === active;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex items-center gap-3 py-1.5 font-text text-sm transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-ink-50 hover:text-ink-80"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-px transition-all duration-500 ease-[var(--ease-out-expo)] ${
                      isActive ? "w-8 bg-signal" : "w-3 bg-ink/25 group-hover:w-5"
                    }`}
                  />
                  {g.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

/** Below lg the sticky column is gone, so the groups become a scrolling rail. */
function GroupRail({ category, active }: { category: Category; active: string }) {
  const listRef = useRef<HTMLUListElement>(null);

  // Keep the active chip in view as the reader scrolls past each group.
  useEffect(() => {
    const chip = listRef.current?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    chip?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  return (
    <nav
      aria-label="Product groups"
      className="sticky top-20 z-30 border-b border-ink/10 bg-cream/90 backdrop-blur-md lg:hidden"
    >
      <ul
        ref={listRef}
        className="flex gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {category.groups.map((g) => {
          const id = groupId(g.name);
          const isActive = id === active;
          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                data-chip={id}
                aria-current={isActive ? "true" : undefined}
                className={`block whitespace-nowrap rounded-full border px-4 py-2 font-text text-xs font-semibold transition-colors duration-300 ${
                  isActive
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/20 text-ink-80"
                }`}
              >
                {g.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function CategoryPage({
  category,
  next,
}: {
  category: Category;
  next: Category;
}) {
  const [active, setActive] = useState(groupId(category.groups[0]?.name ?? ""));

  useEffect(() => {
    const sections = category.groups
      .map((g) => document.getElementById(groupId(g.name)))
      .filter((el): el is HTMLElement => el !== null);

    // Whichever section's heading sits nearest the top of the viewport wins.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [category]);

  return (
    <>
      <CategoryHero category={category} />

      <GroupRail category={category} active={active} />

      <section className="bg-cream pb-20 pt-12 md:pb-28 lg:pt-28">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
          <GroupIndex category={category} active={active} />

          <div className="lg:col-span-9">
            {category.groups.map((group, gi) => (
              <div
                key={group.name}
                id={groupId(group.name)}
                className="scroll-mt-36 border-t border-ink/15 pt-8 pb-16 first:border-t-0 first:pt-0 md:pb-24 lg:scroll-mt-28"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-sm font-semibold text-signal">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <MaskedLines
                    as="h2"
                    lines={[group.name]}
                    className="font-display text-[clamp(1.75rem,3.4vw,3rem)] font-extrabold text-ink"
                  />
                </div>

                <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
                  {group.items.map((item, i) => (
                    <li key={item.name}>
                      <Reveal delay={(i % 4) * 0.06}>
                        <Link
                          href={`/#contact`}
                          aria-label={`Enquire about ${item.name}`}
                          className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                        >
                          <div className="grain relative aspect-square overflow-hidden bg-ink">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt=""
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1280px) 30vw, 20vw"
                                className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-out-expo)] group-hover:scale-[1.08]"
                              />
                            )}
                            <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/20" />
                          </div>
                          <div className="relative mt-3 flex items-center justify-between border-t border-ink/15 pt-3">
                            <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                            <h3 className="font-text text-sm font-semibold text-ink">
                              {item.name}
                            </h3>
                            <span
                              aria-hidden
                              className="text-ink-50 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-signal"
                            >
                              &rarr;
                            </span>
                          </div>
                        </Link>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next desk — keeps the browse loop going instead of dead-ending. */}
      <section className="border-t border-ink/15 bg-cream">
        <Link
          href={`/products/${next.slug}`}
          className="group mx-auto flex max-w-[92rem] items-center justify-between gap-8 px-6 py-14 md:px-10 md:py-20"
        >
          <div>
            <p className="font-text text-[0.68rem] uppercase tracking-[0.2em] text-ink-50">
              Next desk
            </p>
            <p className="font-display mt-3 whitespace-pre-line text-[clamp(1.75rem,4vw,3.5rem)] font-extrabold uppercase leading-[1.02] text-ink transition-colors duration-500 group-hover:text-signal">
              {next.cardTitle}
            </p>
          </div>
          <span
            aria-hidden
            className="font-display shrink-0 text-3xl text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-hover:text-signal md:text-5xl"
          >
            &rarr;
          </span>
        </Link>
      </section>
    </>
  );
}
