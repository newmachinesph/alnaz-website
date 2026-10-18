"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { NAV } from "@/lib/content";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();

  // "/products/foodstuffs" still lights up the Products link. Section links
  // (/#about) never count as active — they are anchors, not destinations.
  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled || open
            ? "bg-cream/85 backdrop-blur-xl shadow-[0_1px_0_0_rgba(12,33,60,0.12)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[92rem] items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            aria-label="ALNAZ International — home"
            className="relative z-10 flex items-center"
          >
            <Image
              src="/logo.avif"
              alt="ALNAZ International"
              width={200}
              height={70}
              priority
              className={`h-9 w-auto transition-[filter] duration-500 md:h-10 ${
                scrolled || open ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-12 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-active={isActive(item.href) ? "true" : undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rule-link font-text text-[0.9rem] font-medium tracking-wide transition-colors duration-300 hover:text-signal ${
                  scrolled ? "text-ink" : "text-cream"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/#contact"
              className={`hidden rounded-full px-6 py-3 font-text text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-all duration-500 ease-[var(--ease-out-expo)] hover:scale-[1.03] lg:inline-flex ${
                scrolled
                  ? "bg-ink text-cream hover:bg-signal"
                  : "bg-cream text-ink hover:bg-signal hover:text-cream"
              }`}
            >
              Request a quote
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden"
            >
              <span
                className={`block h-px w-7 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  scrolled || open ? "bg-ink" : "bg-cream"
                } ${open ? "translate-y-[4px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-7 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  scrolled || open ? "bg-ink" : "bg-cream"
                } ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Scroll progress hairline — the only always-on accent on the page. */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="h-px origin-left bg-signal"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-cream lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="flex h-full flex-col justify-center gap-2 px-8"
            >
              {NAV.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 * i + 0.1,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-3 text-[clamp(2.5rem,12vw,4.5rem)] font-extrabold text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-10 font-text text-sm text-ink-80"
              >
                Shanghai · info@alnazintl.com
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
