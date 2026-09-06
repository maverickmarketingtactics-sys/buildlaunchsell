import { NextResponse } from "next/server";
import {
  authorizeProposalWrite,
  extractProposalJson,
  isValidSlug,
  MAX_HTML_BYTES,
  normalizeSlug,
  saveProposal,
} from "@/lib/proposals";

export const runtime = "nodejs";

type Body = {
  html?: unknown;
  proposal?: unknown;
  json?: unknown;
};

export async function PUT(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const auth = authorizeProposalWrite(request.headers.get("authorization"));
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  const { slug: rawSlug } = await context.params;
  const slug = normalizeSlug(rawSlug);
  if (!isValidSlug(slug)) {
    return NextResponse.json(
      { ok: false, error: "Slug must be lowercase letters, numbers, and hyphens." },
      { status: 400 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Expected JSON body." }, { status: 400 });
  }

  if (typeof body.html !== "string" || !body.html.trim()) {
    return NextResponse.json({ ok: false, error: "html is required." }, { status: 400 });
  }
  if (Buffer.byteLength(body.html, "utf8") > MAX_HTML_BYTES) {
    return NextResponse.json({ ok: false, error: "html exceeds 2MB." }, { status: 413 });
  }
  let proposal: Record<string, unknown> | null;
  try {
    proposal = extractProposalJson(body);
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Invalid proposal JSON." },
      { status: 400 },
    );
  }

  const record = await saveProposal({
    slug,
    html: body.html,
    proposal,
  });

  return NextResponse.json({
    ok: true,
    slug: record.slug,
    url: `/proposals/${record.slug}`,
    files: {
      html: `public/proposals/${record.slug}.html`,
      json: `public/proposals/${record.slug}.json`,
    },
    wrotePublic: record.wrotePublic,
    updatedAt: record.updatedAt,
  });
}
