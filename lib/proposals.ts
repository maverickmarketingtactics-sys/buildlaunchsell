import { timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,80}$/;
export const MAX_HTML_BYTES = 2_000_000;

export type ProposalRecord = {
  slug: string;
  html: string;
  proposal: Record<string, unknown> | null;
  updatedAt: string;
};

export function normalizeSlug(raw: string) {
  return raw.trim().toLowerCase();
}

export function isValidSlug(slug: string) {
  return SLUG_PATTERN.test(slug);
}

/** Instant + git share this layout: public/proposals/{slug}.html (+ optional .json). */
function publicDir() {
  return path.join(process.cwd(), "public", "proposals");
}

function tmpDir() {
  return path.join("/tmp", "bls-proposals");
}

function htmlPath(dir: string, slug: string) {
  return path.join(dir, `${slug}.html`);
}

function jsonPath(dir: string, slug: string) {
  return path.join(dir, `${slug}.json`);
}

async function readText(file: string) {
  try {
    return await readFile(file, "utf8");
  } catch {
    return null;
  }
}

export async function loadProposal(
  slug: string,
): Promise<{ html: string; source: "api" | "static" } | null> {
  const tmpHtml = await readText(htmlPath(tmpDir(), slug));
  if (tmpHtml) return { html: tmpHtml, source: "api" };

  const publicHtml = await readText(htmlPath(publicDir(), slug));
  if (publicHtml) return { html: publicHtml, source: "static" };

  return null;
}

async function writeLayout(dir: string, record: ProposalRecord) {
  await mkdir(dir, { recursive: true });
  await writeFile(htmlPath(dir, record.slug), record.html, "utf8");
  await writeFile(
    jsonPath(dir, record.slug),
    JSON.stringify(
      {
        slug: record.slug,
        proposal: record.proposal,
        updatedAt: record.updatedAt,
      },
      null,
      2,
    ),
    "utf8",
  );
}

export async function saveProposal(input: {
  slug: string;
  html: string;
  proposal?: Record<string, unknown> | null;
}) {
  const record: ProposalRecord = {
    slug: input.slug,
    html: input.html,
    proposal: input.proposal ?? null,
    updatedAt: new Date().toISOString(),
  };

  await writeLayout(tmpDir(), record);

  let wrotePublic = false;
  try {
    await writeLayout(publicDir(), record);
    wrotePublic = true;
  } catch {
    // public/ is not writable on Vercel. /tmp still serves GET /proposals/[slug]
    // on this instance. Durable publish is the git fallback (commit the .html).
  }

  return { ...record, wrotePublic };
}

export function extractProposalJson(body: {
  proposal?: unknown;
  json?: unknown;
}): Record<string, unknown> | null {
  const raw = body.proposal ?? body.json;
  if (raw === undefined || raw === null) return null;
  if (typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error("proposal must be a JSON object.");
  }
  return raw as Record<string, unknown>;
}

export function authorizeProposalWrite(header: string | null) {
  const secret = process.env.PROPOSAL_ADMIN_SECRET?.trim();
  if (!secret) {
    return { ok: false as const, status: 503, error: "PROPOSAL_ADMIN_SECRET is not configured." };
  }
  if (!header?.startsWith("Bearer ")) {
    return { ok: false as const, status: 401, error: "Missing Bearer token." };
  }
  const token = header.slice("Bearer ".length).trim();
  const a = Buffer.from(token);
  const b = Buffer.from(secret);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false as const, status: 401, error: "Invalid token." };
  }
  return { ok: true as const };
}
