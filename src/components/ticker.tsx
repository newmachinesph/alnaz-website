import { TICKER } from "@/lib/content";

/** Pure CSS marquee. No JS, no layout thrash — just a duplicated track. */
export function Ticker() {
  const items = [...TICKER, ...TICKER];

  return (
    // Decorative repetition — the same claims are stated in About and Products,
    // so screen readers skip the duplicated track.
    <div aria-hidden className="overflow-hidden border-y border-ink/10 bg-ink py-5">
      <div className="ticker-track flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="font-display text-lg font-semibold uppercase tracking-[0.06em] text-cream/90 md:text-2xl">
              {item}
            </span>
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rotate-45 bg-signal"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
