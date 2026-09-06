import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} handles information on ${site.domain}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="border-b border-line">
      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <p className="chip text-muted uppercase">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
          Privacy
        </h1>
        <p className="mt-4 text-sm text-muted">
          Stub page — replace with counsel-reviewed copy before paid traffic.
          Last updated September 2026.
        </p>

        <div className="mt-10 space-y-8 text-[1.02rem] leading-relaxed text-ink/90">
          <section>
            <h2 className="font-display text-2xl font-medium">Who we are</h2>
            <p className="mt-3 text-muted">
              {site.name} ({site.domain}) helps founders take a software or app
              idea to market. Contact:{" "}
              <a href={`mailto:${site.email}`} className="text-steel underline underline-offset-2">
                {site.email}
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-medium">What we collect</h2>
            <p className="mt-3 text-muted">
              If you book a call or email us, we receive the information you
              send — typically a name, email, and a short description of the
              idea. Payment for the working version is processed by the
              checkout provider linked from this site; we do not store card
              numbers on {site.domain}.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-medium">Analytics and ads</h2>
            <p className="mt-3 text-muted">
              A Meta Pixel placeholder lives in the site layout. It is inactive
              until <code className="chip">NEXT_PUBLIC_META_PIXEL_ID</code> is
              set. When configured, Meta may receive standard page-view events
              so we can measure ads. We do not sell your information.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-medium">Your choices</h2>
            <p className="mt-3 text-muted">
              Email {site.email} to ask what we have, or to ask us to delete
              it. Booking and checkout providers have their own policies.
            </p>
          </section>
        </div>

        <p className="mt-12">
          <Link href="/" className="text-steel underline underline-offset-2">
            ← Back to BuildLaunchSell
          </Link>
        </p>
      </article>
    </main>
  );
}
