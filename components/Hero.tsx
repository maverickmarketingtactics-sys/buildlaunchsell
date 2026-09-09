import { BookButton } from "@/components/Header";
import { bookingLinkProps, site } from "@/lib/site";
import Link from "next/link";

const chips = [
  "$0 proposal",
  "45 minutes",
  "$2,900 refundable",
  "48-hour working version",
  "Low five-figures full build",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_100%_0%,color-mix(in_srgb,var(--color-signal)_16%,transparent),transparent_55%),radial-gradient(42%_36%_at_88%_8%,color-mix(in_srgb,var(--color-highlight)_18%,transparent),transparent_52%),radial-gradient(50%_40%_at_0%_100%,color-mix(in_srgb,var(--color-steel)_12%,transparent),transparent_50%)]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] md:items-center md:px-8 md:py-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3 py-1 text-[0.72rem] tracking-[0.12em] text-steel uppercase">
            Idea to market — not another internal tool
          </p>
          <h1 className="font-display text-[2.35rem] leading-[1.08] font-semibold tracking-tight text-ink sm:text-5xl md:text-[3.35rem]">
            Total price on the first call. Working product in 48 hours.
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted md:text-lg">
            We turn a software or app idea into an itemized proposal on a live
            screenshare — then a fully refundable working version you can log
            into in 48 hours. Built to launch, not another abandoned AI weekend
            project.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="chip rounded-full border border-line bg-white px-3 py-1.5 text-ink/90"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookButton className="inline-flex items-center justify-center rounded-full bg-signal px-6 py-3.5 text-center text-base font-medium text-white transition hover:bg-signal-hover">
              Book free proposal
            </BookButton>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white px-6 py-3.5 text-base font-medium text-ink transition hover:border-ink/30"
            >
              See how it works
            </Link>
          </div>
        </div>

        <OfferCard />
      </div>
    </section>
  );
}

function OfferCard() {
  return (
    <aside
      aria-label="The offer at a glance"
      className="rounded-2xl border border-line bg-white p-6 shadow-[0_20px_50px_-28px_rgba(11,18,32,0.35)] md:p-7"
    >
      <p className="chip text-muted uppercase">The offer</p>
      <ol className="mt-5 divide-y divide-line">
        <li className="flex items-start justify-between gap-4 py-4 first:pt-0">
          <div>
            <p className="font-display text-xl font-medium">Live proposal</p>
            <p className="mt-1 text-sm text-muted">
              45 minutes · screenshare · yours to keep
            </p>
          </div>
          <p className="chip shrink-0 rounded-md bg-paper-deep px-2 py-1 text-ink">
            $0
          </p>
        </li>
        <li className="flex items-start justify-between gap-4 py-4">
          <div>
            <p className="font-display text-xl font-medium">Working version</p>
            <p className="mt-1 text-sm text-muted">
              48 hours · 7-day any-reason refund
            </p>
          </div>
          <p className="chip shrink-0 rounded-md bg-paper-deep px-2 py-1 text-ink">
            $2,900
          </p>
        </li>
        <li className="flex items-start justify-between gap-4 py-4 last:pb-0">
          <div>
            <p className="font-display text-xl font-medium">Full build + GTM</p>
            <p className="mt-1 text-sm text-muted">
              Low five-figures · 50/50 · code at final pay
            </p>
          </div>
          <p className="chip shrink-0 rounded-md bg-steel px-2 py-1 text-white">
            50 / 50
          </p>
        </li>
      </ol>
      <p className="mt-5 text-sm leading-relaxed text-muted">
        Deposit credits to the full build. GTM shell — landing, waitlist, Meta
        ad angles — is included, not an add-on.
      </p>
      <Link
        {...bookingLinkProps(site.acceptanceUrl)}
        className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-line px-4 py-2.5 text-sm font-medium text-ink transition hover:border-ink/30"
      >
        Accept $2,900 working version
      </Link>
    </aside>
  );
}
