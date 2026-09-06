import { NextResponse } from "next/server";
import {
  authorizeProposalWrite,
  isValidSlug,
  MAX_HTML_BYTES,
  normalizeSlug,
  saveProposal,
} from "@/lib/proposals";

export const runtime = "nodejs";

type Body = {
  html?: unknown;
  proposal?: unknown;
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
  if (
    body.proposal !== undefined &&
    body.proposal !== null &&
    (typeof body.proposal !== "object" || Array.isArray(body.proposal))
  ) {
    return NextResponse.json(
      { ok: false, error: "proposal must be a JSON object." },
      { status: 400 },
    );
  }

  const record = await saveProposal({
    slug,
    html: body.html,
    proposal: (body.proposal as Record<string, unknown> | null) ?? null,
  });

  return NextResponse.json({
    ok: true,
    slug: record.slug,
    url: `/proposals/${record.slug}`,
    updatedAt: record.updatedAt,
  });
}
