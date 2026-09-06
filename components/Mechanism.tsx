import { BookButton } from "@/components/Header";
import { bookingLinkProps, site } from "@/lib/site";
import Link from "next/link";

const steps = [
  {
    id: "live-proposal",
    kicker: "Call one · 45 minutes · $0",
    title: "The live proposal",
    body: "We do not collect a brief and disappear. On a screenshare we turn the idea into an itemized, editable scope — features, phases, and a real total — while you watch the number move. You keep the proposal either way.",
  },
  {
    id: "working-version",
    kicker: "48 hours · $2,900 refundable",
    title: "The working version",
    body: "Not a mockup. A product you can log into: the core loop, real auth, real data. Seven days, any reason, full refund. If you continue, the deposit credits to the full build.",
  },
  {
    id: "full-build",
    kicker: "Low five-figures · 50 / 50",
    title: "Full build + GTM shell",
    body: "We finish what launch actually needs — the last 30%, the edges, the path to users. Landing page, waitlist, and Meta ad angles ship with the full build. Code and hosting transfer at final payment.",
  },
];

export function Mechanism() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-b border-line">
      <div id="the-offer" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-24">
        <p className="chip text-muted uppercase">How it works</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
          Three steps. No mystery pricing.
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Live proposal $0 / 45 minutes → working version $2,900 / 48 hours →
          full build + GTM shell.
        </p>
        <ol className="mt-12 grid gap-5 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.id}
              className="flex flex-col rounded-2xl border border-line bg-white p-7"
            >
              <span className="chip text-signal">0{i + 1}</span>
              <p className="mt-4 text-xs tracking-[0.08em] text-steel uppercase">
                {step.kicker}
              </p>
              <h3 className="mt-2 font-display text-2xl font-medium">
                {step.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <BookButton className="inline-flex items-center justify-center rounded-full bg-signal px-6 py-3.5 font-medium text-white hover:bg-signal-hover">
            Book free proposal
          </BookButton>
          <Link
            {...bookingLinkProps(site.acceptanceUrl)}
            className="inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3.5 font-medium text-ink hover:border-ink/30"
          >
            Start the $2,900 working version
          </Link>
        </div>
      </div>
    </section>
  );
}
