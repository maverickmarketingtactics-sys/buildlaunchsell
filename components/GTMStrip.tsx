const items = [
  {
    title: "Landing page",
    body: "A launch surface for the product — not a leftover placeholder site.",
  },
  {
    title: "Waitlist",
    body: "Capture demand while the full build finishes. You are not starting from zero users.",
  },
  {
    title: "Meta ad angles",
    body: "Positioning lines you can actually run. Included so launch is not a second vendor.",
  },
];

export function GTMStrip() {
  return (
    <section className="border-b border-line bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="chip text-paper/55 uppercase">Included in the full build</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
          The GTM shell ships with the product. Not as an add-on.
        </h2>
        <p className="mt-4 max-w-2xl text-paper/70">
          You are buying a path to market. Landing, waitlist, and Meta ad
          angles are scoped with the full build — not sold back to you after
          the app exists.
        </p>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/4 p-6"
            >
              <h3 className="font-display text-xl font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
