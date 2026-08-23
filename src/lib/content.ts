import supabase from "@/lib/db";
import { isProjectIconKey, type ProjectIconKey } from "@/lib/icon-registry";

/**
 * Content that used to be hardcoded arrays in .tsx files and now lives in
 * Supabase. Reads use the anon client and are constrained by RLS to published
 * rows; every write goes through /api/admin/* with the service-role client.
 */

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export type ProjectIcon = {
  key: ProjectIconKey;
  color: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  href: string;
  year: number;
  /** null renders the <Skeleton> placeholder. */
  imageUrl: string | null;
  /** CSS object-position, chosen by the admin. Applied as an inline style. */
  imagePosition: string;
  icons: ProjectIcon[];
  badges: string[];
  published: boolean;
};

export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  href: string;
  year: number;
  image_url: string | null;
  image_position: string | null;
  icons: unknown;
  badges: string[] | null;
  published: boolean;
};

/**
 * icons is jsonb, so it arrives as `unknown`. Drop anything whose key is no
 * longer in the registry rather than rendering `undefined` as a component.
 */
function parseIcons(value: unknown): ProjectIcon[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry) => {
    if (typeof entry !== "object" || entry === null) return [];
    const { key, color } = entry as { key?: unknown; color?: unknown };
    if (typeof key !== "string" || !isProjectIconKey(key)) return [];
    return [{ key, color: typeof color === "string" ? color : "white" }];
  });
}

export function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    href: row.href,
    year: row.year,
    imageUrl: row.image_url ?? null,
    imagePosition: row.image_position ?? "center",
    icons: parseIcons(row.icons),
    badges: row.badges ?? [],
    published: row.published,
  };
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("year", { ascending: false });

  if (error) {
    console.error("Failed to load projects", error);
    return [];
  }

  return (data as ProjectRow[]).map(mapProject);
}

// ---------------------------------------------------------------------------
// Certificates
// ---------------------------------------------------------------------------

export type Certificate = {
  id: string;
  slug: string;
  title: string;
  issuer: string;
  /** ISO date. Omit to hide the issued line. */
  issuedAt?: string;
  /** ISO date. Omit to hide the expiry line. */
  validUntil?: string;
  credentialId?: string;
  /** Omit and the card renders no verify button. */
  credentialUrl?: string;
  /** Omit and the viewer renders no "Open PDF" button. */
  pdfUrl?: string;
  /** Ordered page previews; pageCount is derived from this. */
  pageUrls: string[];
  published: boolean;
  sortOrder: number;
};

export type CertificateRow = {
  id: string;
  slug: string;
  title: string;
  issuer: string;
  issued_at: string | null;
  valid_until: string | null;
  credential_id: string | null;
  credential_url: string | null;
  pdf_url: string | null;
  page_urls: string[] | null;
  published: boolean;
  sort_order: number;
};

export function mapCertificate(row: CertificateRow): Certificate {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    issuer: row.issuer,
    issuedAt: row.issued_at ?? undefined,
    validUntil: row.valid_until ?? undefined,
    credentialId: row.credential_id ?? undefined,
    credentialUrl: row.credential_url ?? undefined,
    pdfUrl: row.pdf_url ?? undefined,
    pageUrls: row.page_urls ?? [],
    published: row.published,
    sortOrder: row.sort_order,
  };
}

export async function getCertificates(): Promise<Certificate[]> {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load certificates", error);
    return [];
  }

  // A certificate with no page images has nothing to render and would crash
  // next/image on an undefined src, so it never reaches the page.
  return (data as CertificateRow[])
    .map(mapCertificate)
    .filter((certificate) => certificate.pageUrls.length > 0);
}
