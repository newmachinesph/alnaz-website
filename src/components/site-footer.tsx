import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion-primitives";
import { MARKETS, NAV } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="relative bg-ink">
      <div className="grain relative h-[42vh] min-h-[18rem] overflow-hidden">
        <Image
          src="/images/footer-loading.jpg"
          alt="Courier loading parcels into a delivery van"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-cream" />
      </div>

      <div className="bg-cream">
        <div className="mx-auto max-w-[92rem] px-6 pb-10 md:px-10">
          <Reveal>
            <div className="grid gap-10 border-b border-ink/15 pb-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Image
                  src="/logo.avif"
                  alt="ALNAZ International"
                  width={240}
                  height={84}
                  className="h-12 w-auto"
                />
                <p className="mt-6 max-w-sm font-text text-sm leading-relaxed text-ink-80">
                  Efficient global distribution built on trust, performance and
                  excellence. Serving manufacturers and wholesalers since 2004.
                </p>
              </div>

              <nav aria-label="Footer" className="lg:col-span-3">
                <p className="font-text text-[0.68rem] uppercase tracking-[0.2em] text-ink-50">
                  Navigate
                </p>
                <ul className="mt-5 space-y-3">
                  {NAV.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="rule-link font-display text-lg font-semibold text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="lg:col-span-4">
                <p className="font-text text-[0.68rem] uppercase tracking-[0.2em] text-ink-50">
                  Markets served
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
                  {MARKETS.map((m) => (
                    <li
                      key={m}
                      className="font-text text-sm font-medium text-ink-80"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Oversized wordmark as a closing plate. Purely typographic. */}
          <p
            aria-hidden
            className="font-display mt-12 w-full text-center text-[clamp(3.5rem,15.5vw,15rem)] font-extrabold leading-none tracking-[-0.045em] text-ink/10 select-none"
          >
            ALNAZ
          </p>

          <div className="mt-8 flex flex-col gap-3 border-t border-ink/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-text text-xs text-ink-50">
              © {new Date().getFullYear()} Alnaz International. All rights
              reserved.
            </p>
            <p className="font-text text-xs uppercase tracking-[0.18em] text-ink-50">
              Global sourcing &amp; distribution
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
