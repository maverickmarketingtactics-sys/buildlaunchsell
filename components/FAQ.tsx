const faqs = [
  {
    q: "How can you ship a working version in 48 hours?",
    a: "We are not building the entire product. The 48-hour working version is the core loop — the thing a user does over and over — with a real login and real data. Everything else is scoped and priced on the live proposal for the full build.",
  },
  {
    q: "What’s the catch on the $2,900 refund?",
    a: "There isn’t a fine-print trap. You pay $2,900. We deliver a working version you can log into within 48 hours of kickoff. If you do not want to continue, say so within 7 days of delivery and we refund the full amount. Any reason. The deposit credits to the full build if you go forward.",
  },
  {
    q: "Do I own the code?",
    a: "During the working-version phase, no — we host it and issue you logins. That keeps the refund clean: if you take the money back, you do not also walk with the build. On the full build, code and hosting transfer to you at final payment.",
  },
  {
    q: "What does the full build cost?",
    a: "Most land in the low five figures. 50% to start, 50% on delivery. The exact number is the one on your live proposal — not a range we published for someone else’s scope. The GTM shell is included in that build, not a later line item.",
  },
  {
    q: "What is the GTM shell?",
    a: "A landing page, a waitlist, and Meta ad angles for the product you are launching. It ships with the full build so you are not buying an app and then shopping for a marketer to invent the launch.",
  },
  {
    q: "I already tried building this with AI.",
    a: "Bring the project. You already know where it died — usually auth, data, edge cases, or launch. The call is to price the last 30% and decide whether the working version is a continuation or a clean core loop.",
  },
  {
    q: "Is this for software that runs my existing business?",
    a: "No. BuildLaunchSell is for founders and operators taking a software or app idea to market. If you need software for the business you already operate — spreadsheets, texts, PDFs — that is OwnerBuilt Software.",
  },
  {
    q: "What happens on the free call?",
    a: "Forty-five minutes on a screenshare. You describe the idea and the user. We itemize scope and price it live. You leave with the proposal. No cost, no commitment.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <p className="chip text-muted uppercase">FAQ</p>
        <h2 className="mt-3 font-display text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
          Straight answers.
        </h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((item) => (
            <details key={item.q} className="faq group py-5">
              <summary className="flex cursor-pointer items-start justify-between gap-6 text-left">
                <span className="font-display text-xl font-medium md:text-[1.35rem]">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="faq-plus mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-lg leading-none transition"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
