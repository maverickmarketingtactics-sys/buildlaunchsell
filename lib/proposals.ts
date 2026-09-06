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

function tmpDir() {
  return path.join("/tmp", "bls-proposals");
}

function dataDir() {
  return path.join(process.cwd(), "data", "proposals");
}

function publicFile(slug: string) {
  return path.join(process.cwd(), "public", "proposals", `${slug}.html`);
}

function recordFile(dir: string, slug: string) {
  return path.join(dir, `${slug}.json`);
}

async function readRecord(file: string): Promise<ProposalRecord | null> {
  try {
    const raw = await readFile(file, "utf8");
    const parsed = JSON.parse(raw) as ProposalRecord;
    if (!parsed?.html || typeof parsed.html !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

async function readPublicHtml(slug: string): Promise<string | null> {
  try {
    return await readFile(publicFile(slug), "utf8");
  } catch {
    return null;
  }
}

export async function loadProposal(
  slug: string,
): Promise<{ html: string; source: "api" | "static" } | null> {
  const fromTmp = await readRecord(recordFile(tmpDir(), slug));
  if (fromTmp) return { html: fromTmp.html, source: "api" };

  const fromData = await readRecord(recordFile(dataDir(), slug));
  if (fromData) return { html: fromData.html, source: "api" };

  const fromPublic = await readPublicHtml(slug);
  if (fromPublic) return { html: fromPublic, source: "static" };

  return null;
}

async function writeRecord(dir: string, record: ProposalRecord) {
  await mkdir(dir, { recursive: true });
  await writeFile(recordFile(dir, record.slug), JSON.stringify(record), "utf8");
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

  await writeRecord(tmpDir(), record);
  try {
    await writeRecord(dataDir(), record);
  } catch {
    // data/ is not writable on some hosts (e.g. Vercel). /tmp still serves the instant path.
  }

  return record;
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
  if (token !== secret) {
    return { ok: false as const, status: 401, error: "Invalid token." };
  }
  return { ok: true as const };
}
