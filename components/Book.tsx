import { BookButton } from "@/components/Header";
import { bookingLinkProps, isExternalUrl, site } from "@/lib/site";
import Link from "next/link";

export function Book({ compact = false }: { compact?: boolean }) {
  const calendarReady = isExternalUrl(site.bookingUrl);

  return (
    <section
      id="book"
      className={`scroll-mt-24 ${compact ? "" : "border-b border-line bg-paper-deep"}`}
    >
      <div className={compact ? "" : "mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24"}>
        <p className="chip text-muted uppercase">Book</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
          Forty-five minutes. You leave with a real price.
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Live screenshare. Itemized proposal. $0, no commitment. If the working
          version is the right next step, you can accept the $2,900 refundable
          deposit when you are ready.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <BookButton className="inline-flex items-center justify-center rounded-full bg-signal px-6 py-3.5 font-medium text-white hover:bg-signal-hover">
            Book free proposal
          </BookButton>
          <Link
            {...bookingLinkProps(site.acceptanceUrl)}
            className="inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3.5 font-medium text-ink hover:border-ink/30"
          >
            Accept $2,900 working version
          </Link>
        </div>
        {!calendarReady ? (
          <div className="mt-8 rounded-2xl border border-dashed border-line bg-white px-6 py-10 text-center">
            <p className="font-display text-xl">Calendar embed goes here</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Booking URL is a placeholder. Set{" "}
              <code className="chip">NEXT_PUBLIC_BOOKING_URL</code> to your
              Calendly (or{" "}
              <a href="/apply" className="text-steel underline underline-offset-2">
                /apply
              </a>
              ) when the calendar is live. Until then, email{" "}
              <a href={`mailto:${site.email}`} className="text-steel underline underline-offset-2">
                {site.email}
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function CTABand() {
  return (
    <section className="border-b border-line bg-signal">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center md:px-8">
        <div>
          <h2 className="font-display text-3xl leading-tight font-semibold text-white md:text-4xl">
            Get the number on call one.
          </h2>
          <p className="mt-2 max-w-xl text-white/85">
            Free 45-minute proposal. Refundable working version in 48 hours.
            Full build with GTM shell when you continue.
          </p>
        </div>
        <BookButton className="inline-flex shrink-0 items-center justify-center rounded-full bg-ink px-6 py-3.5 font-medium text-white hover:bg-ink/90">
          Book free proposal
        </BookButton>
      </div>
    </section>
  );
}
