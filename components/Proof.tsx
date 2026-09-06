const rows = [
  {
    label: "Time to a real price",
    agency: "2–6 weeks of discovery",
    diy: "Never — just a vibe",
    bls: "45 minutes, on call one",
  },
  {
    label: "Time to software you can log into",
    agency: "90–180 days, if you start",
    diy: "Weekend demo, then stall",
    bls: "48-hour working version",
  },
  {
    label: "Money at risk to find out",
    agency: "$5k–$15k, usually stuck",
    diy: "Nights, weekends, and drift",
    bls: "$2,900, 7-day any-reason refund",
  },
  {
    label: "Path to market",
    agency: "“We’ll talk marketing later”",
    diy: "You figure out launch alone",
    bls: "GTM shell included in full build",
  },
];

export function Proof() {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <p className="chip text-muted uppercase">The comparison</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
          What you’re actually buying
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Same offer math, written down. No logos. No borrowed case studies.
        </p>

        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-line md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-deep text-[0.78rem] tracking-[0.06em] uppercase">
              <tr>
                <th className="px-5 py-4 font-medium text-muted"> </th>
                <th className="px-5 py-4 font-medium text-muted">
                  Typical agency
                </th>
                <th className="px-5 py-4 font-medium text-muted">DIY AI</th>
                <th className="bg-steel px-5 py-4 font-medium text-paper">
                  BuildLaunchSell
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <th className="px-5 py-5 align-top font-medium text-ink">
                    {row.label}
                  </th>
                  <td className="px-5 py-5 align-top text-muted">{row.agency}</td>
                  <td className="px-5 py-5 align-top text-muted">{row.diy}</td>
                  <td className="bg-steel/5 px-5 py-5 align-top font-medium text-steel">
                    {row.bls}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 md:hidden">
          {rows.map((row) => (
            <article key={row.label} className="rounded-2xl border border-line p-5">
              <h3 className="font-medium text-ink">{row.label}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="chip text-muted">Typical agency</dt>
                  <dd className="mt-1 text-muted">{row.agency}</dd>
                </div>
                <div>
                  <dt className="chip text-muted">DIY AI</dt>
                  <dd className="mt-1 text-muted">{row.diy}</dd>
                </div>
                <div className="rounded-xl bg-steel px-4 py-3 text-paper">
                  <dt className="chip text-paper/70">BuildLaunchSell</dt>
                  <dd className="mt-1 font-medium">{row.bls}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
