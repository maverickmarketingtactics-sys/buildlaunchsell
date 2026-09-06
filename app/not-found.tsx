import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24 md:px-8">
      <h1 className="font-display text-4xl font-semibold">Page not found</h1>
      <p className="mt-3 text-muted">That URL is not on BuildLaunchSell.</p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-signal px-5 py-3 font-medium text-white hover:bg-signal-hover"
      >
        Back to the offer
      </Link>
    </main>
  );
}
