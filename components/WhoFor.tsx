import { site } from "@/lib/site";

const yes = [
  "Founders with a software or app idea and at least one real user they can name",
  "Operators productizing a workflow — they want a product people pay for, not an internal dashboard",
  "Teams that need a priced path from idea → working version → launch, not another discovery retainer",
];

const no = [
  "Idea tourists collecting quotes they will not act on",
  "Day-one regulated cores (HIPAA clinic OS, banking, etc. as the first version)",
  "Landing-page-only or brochure sites with no product behind them",
];

export function WhoFor() {
  return (
    <section id="who-its-for" className="scroll-mt-24 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <p className="chip text-muted uppercase">Fit</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
          Who this is for — and who should not book.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-line bg-white p-7">
            <h3 className="font-display text-2xl font-medium text-steel">
              Book the call
            </h3>
            <ul className="mt-5 space-y-4">
              {yes.map((item) => (
                <li key={item} className="flex gap-3 text-[0.98rem] leading-relaxed">
                  <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-steel" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-line bg-paper-deep p-7">
            <h3 className="font-display text-2xl font-medium">Skip it</h3>
            <ul className="mt-5 space-y-4">
              {no.map((item) => (
                <li key={item} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink/85">
                  <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
              Need software for the business you already run on spreadsheets,
              texts, and PDFs? That is a different product.{" "}
              <a
                href={site.obsUrl}
                className="font-medium text-steel underline decoration-steel/30 underline-offset-3 hover:decoration-steel"
              >
                OwnerBuilt Software
              </a>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
