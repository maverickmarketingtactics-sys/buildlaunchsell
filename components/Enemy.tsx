export function Enemy() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <p className="chip text-muted uppercase">The stall</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
          Two ways founders stall — and both feel productive.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-line bg-white p-7">
            <p className="chip text-signal">01</p>
            <h3 className="mt-3 font-display text-2xl font-medium">Agency fog</h3>
            <p className="mt-3 leading-relaxed text-muted">
              Months of discovery. Vague ranges. Still no product you can
              click. You paid for process and left with a deck — and a number
              that will move the first time someone says “also.”
            </p>
          </article>
          <article className="rounded-2xl border border-line bg-white p-7">
            <p className="chip text-signal">02</p>
            <h3 className="mt-3 font-display text-2xl font-medium">
              DIY AI dies at ~70%
            </h3>
            <p className="mt-3 leading-relaxed text-muted">
              Weekend demos die at auth, real data, edge cases, and launch. You
              have something you can show a friend and nothing you can put in
              front of a customer — or a charge.
            </p>
          </article>
        </div>
        <div className="mt-6 rounded-2xl bg-steel px-7 py-8 text-paper">
          <p className="font-display text-2xl leading-snug font-medium md:text-[1.7rem]">
            BuildLaunchSell prices on call one and ships a refundable core loop
            in 48 hours — with a path to market, not another prototype that
            dies in a Drive folder.
          </p>
        </div>
      </div>
    </section>
  );
}
