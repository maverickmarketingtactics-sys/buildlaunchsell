import { loadProposal, isValidSlug, normalizeSlug } from "@/lib/proposals";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const slug = normalizeSlug((await context.params).slug);
  if (!isValidSlug(slug)) {
    return new Response("Not found", { status: 404, headers: { "content-type": "text/plain" } });
  }

  const found = await loadProposal(slug);
  if (!found) {
    return new Response(notFoundHtml(slug), {
      status: 404,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "x-robots-tag": "noindex",
      },
    });
  }

  return new Response(found.html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex",
      "cache-control": found.source === "static" ? "public, max-age=60" : "no-store",
    },
  });
}

function notFoundHtml(slug: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Proposal not found — BuildLaunchSell</title>
  </head>
  <body style="font-family:system-ui,sans-serif;background:#F7F4EF;color:#0B1220;margin:0;padding:48px 24px">
    <p style="letter-spacing:.12em;text-transform:uppercase;font-size:12px;color:#5C6570">BuildLaunchSell</p>
    <h1 style="font-size:2rem">No proposal at /proposals/${slug}</h1>
    <p style="color:#5C6570;max-width:36rem">This URL is reserved for a live itemized proposal. If you were sent this link, ask for a republish.</p>
    <p><a href="/" style="color:#1B4332">Back to BuildLaunchSell</a></p>
  </body>
</html>`;
}
