"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { bookingLinkProps, site } from "@/lib/site";

const nav = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#the-offer", label: "The offer" },
  { href: "/#who-its-for", label: "Who it’s for" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const book = bookingLinkProps();

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="inline-flex items-center">
          <Logo className="h-7 md:h-8" />
        </Link>

        <nav className="hidden items-center gap-7 text-[0.92rem] text-ink/80 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            {...book}
            className="rounded-full bg-signal px-4 py-2 text-[0.9rem] font-medium text-white transition hover:bg-signal-hover"
          >
            Book free proposal
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
          </span>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-paper px-5 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-3 text-[1.05rem]">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-1"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              {...book}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-signal px-4 py-3 text-center font-medium text-white"
            >
              Book free proposal
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function BookButton({
  children,
  className,
  href = site.bookingUrl,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <Link {...bookingLinkProps(href)} className={className}>
      {children}
    </Link>
  );
}
