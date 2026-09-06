import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-2xl font-semibold text-ink">
            BuildLaunchSell
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Software and app ideas, priced on call one, shipped as a refundable
            working version in 48 hours, then taken to market.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
            On this site
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/#how-it-works" className="hover:text-steel">
                How it works
              </Link>
            </li>
            <li>
              <Link href="/#the-offer" className="hover:text-steel">
                The offer
              </Link>
            </li>
            <li>
              <Link href="/#who-its-for" className="hover:text-steel">
                Who it’s for
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-steel">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
            Not this product?
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/85">
            Building software for your existing business?{" "}
            <a
              href={site.obsUrl}
              className="font-medium text-steel underline decoration-steel/30 underline-offset-3 hover:decoration-steel"
            >
              Go to OwnerBuilt Software
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} BuildLaunchSell. {site.domain}</p>
          <p>
            <a href={`mailto:${site.email}`} className="hover:text-ink">
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
