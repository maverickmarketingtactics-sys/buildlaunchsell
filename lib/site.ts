export const site = {
  name: "BuildLaunchSell",
  domain: "buildlaunchsell.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://buildlaunchsell.com",
  email: "hello@buildlaunchsell.com",
  tagline: "Real price on call one. Working product in 48 hours.",
  description:
    "We turn a software or app idea into an itemized proposal on a live screenshare — then a fully refundable working version you can log into in 48 hours.",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "#book",
  acceptanceUrl:
    process.env.NEXT_PUBLIC_ACCEPTANCE_URL ||
    "https://whop.com/checkout/plan_Sz7TIXY8KaN4U",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  vslEmbedUrl: process.env.NEXT_PUBLIC_VSL_EMBED_URL || "",
  obsUrl: "https://ownerbuiltsoftware.com",
} as const;

export function isExternalUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function bookingLinkProps(href: string = site.bookingUrl) {
  if (isExternalUrl(href)) {
    return { href, target: "_blank", rel: "noopener noreferrer" as const };
  }
  return { href };
}
