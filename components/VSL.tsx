import { BookButton } from "@/components/Header";
import { site } from "@/lib/site";

export function VSL() {
  const src = site.vslEmbedUrl.trim();

  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="chip text-muted uppercase">Watch</p>
            <h2 className="mt-3 font-display text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
              See the live proposal happen.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Forty-five minutes. You describe the product. We itemize and
              price it on a screenshare. Replace this slot with the Loom or
              VSL when it’s recorded.
            </p>
          </div>
          <BookButton className="inline-flex items-center justify-center rounded-full bg-signal px-5 py-3 text-sm font-medium text-white hover:bg-signal-hover">
            Book the call
          </BookButton>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-ink">
          {src ? (
            <div className="relative aspect-video">
              <iframe
                src={src}
                title="How the 45-minute proposal call works"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video flex-col items-center justify-center gap-2 px-6 text-center">
              <p className="font-display text-2xl text-paper">
                VSL / Loom embed
              </p>
              <p className="max-w-md text-sm text-paper/65">
                Placeholder — set{" "}
                <code className="chip text-paper/90">NEXT_PUBLIC_VSL_EMBED_URL</code>{" "}
                when the walkthrough is ready.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
