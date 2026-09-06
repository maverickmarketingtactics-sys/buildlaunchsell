import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Proposals",
  description: "Live itemized proposals published by BuildLaunchSell.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/proposals" },
};

export default function ProposalsIndexPage() {
  return (
    <main className="border-b border-line">
      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <p className="chip text-muted uppercase">Internal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
          Proposals
        </h1>
        <p className="mt-4 leading-relaxed text-muted">
          Live itemized proposals are published to{" "}
          <code className="chip">https://buildlaunchsell.com/proposals/&lt;slug&gt;</code>.
          This index is a stub — there is no public directory of client proposals.
        </p>
        <ul className="mt-8 list-disc space-y-3 pl-5 text-muted">
          <li>
            Instant publish:{" "}
            <code className="chip">PUT /api/proposals/&lt;slug&gt;</code> with Bearer{" "}
            <code className="chip">PROPOSAL_ADMIN_SECRET</code> and JSON{" "}
            <code className="chip">{`{ html, proposal }`}</code>.
          </li>
          <li>
            Git fallback: drop static HTML at{" "}
            <code className="chip">public/proposals/&lt;slug&gt;.html</code>. The same
            URL still serves it.
          </li>
        </ul>
        <p className="mt-10">
          <Link href="/" className="text-steel underline underline-offset-2">
            ← Back to BuildLaunchSell
          </Link>
        </p>
      </article>
    </main>
  );
}
