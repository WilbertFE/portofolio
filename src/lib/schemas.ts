import { z } from "zod";
import { PROJECT_ICON_KEYS } from "@/lib/icon-registry";

/**
 * Shared by the admin forms (via zodResolver) and the /api/admin routes, so
 * client and server can never disagree about what a valid row looks like.
 *
 * Deliberately no z.preprocess / z.coerce / .transform anywhere: those make a
 * schema's input type differ from its output type, and react-hook-form uses a
 * single type for both. Optional text fields therefore accept "" (what an
 * untouched input actually holds) and the API maps "" to null on the way in.
 */

const slug = z
  .string()
  .min(1, "Required")
  .max(80)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Lowercase letters, numbers and single hyphens only"
  );

const isUrl = (value: string) => /^https?:\/\/\S+$/.test(value);

// Accepts a full URL or a path under public/ - existing rows use the latter.
const isAssetUrl = (value: string) => value.startsWith("/") || isUrl(value);

const assetUrl = z.string().refine(isAssetUrl, {
  message: "Must be a URL or a path starting with /",
});

/** Optional text: "" means "not set" rather than "invalid". */
const optionalText = (max: number) => z.string().max(max).optional();

const optionalUrl = z
  .string()
  .refine((value) => value === "" || isUrl(value), "Must be a valid URL")
  .optional();

const optionalAssetUrl = z
  .string()
  .refine(
    (value) => value === "" || isAssetUrl(value),
    "Must be a URL or a path starting with /"
  )
  .optional();

const optionalIsoDate = z
  .string()
  .regex(/^(\d{4}-\d{2}-\d{2})?$/, "Use YYYY-MM-DD")
  .optional();

export const projectIconSchema = z.object({
  key: z.enum(PROJECT_ICON_KEYS as [string, ...string[]]),
  color: z.string().trim().min(1, "Required").max(32),
});

export const projectSchema = z.object({
  slug,
  title: z.string().trim().min(1, "Required").max(120),
  description: z.string().trim().min(1, "Required").max(500),
  href: z.string().refine(isUrl, "Must be a valid URL"),
  year: z
    .number("Enter a year")
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 5),
  imageUrl: optionalAssetUrl,
  icons: z.array(projectIconSchema).max(8, "At most 8 icons"),
  badges: z.array(z.string().trim().min(1).max(40)).max(8, "At most 8 badges"),
  published: z.boolean(),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export const certificateSchema = z.object({
  slug,
  title: z.string().trim().min(1, "Required").max(160),
  issuer: z.string().trim().min(1, "Required").max(80),
  issuedAt: optionalIsoDate,
  validUntil: optionalIsoDate,
  credentialId: optionalText(80),
  credentialUrl: optionalUrl,
  pdfUrl: optionalAssetUrl,
  pageUrls: z.array(assetUrl).min(1, "Upload a PDF to generate page images"),
  published: z.boolean(),
  sortOrder: z.number("Enter a number").int().min(0).max(999),
});

export type CertificateInput = z.infer<typeof certificateSchema>;

/** Partial updates: every field optional, but still validated when present. */
export const projectUpdateSchema = projectSchema.partial();
export const certificateUpdateSchema = certificateSchema.partial();

/** "" from an untouched optional input is the same as absent. */
export function emptyToNull(value: string | undefined | null) {
  return value === undefined || value === null || value.trim() === ""
    ? null
    : value;
}

export const uploadRequestSchema = z.object({
  /** Storage path within the `portfolio` bucket, e.g. "projects/foo-123.png". */
  path: z
    .string()
    .min(1)
    .max(200)
    // No traversal, no absolute paths, no surprises.
    .regex(
      /^(projects|certificates)\/[a-zA-Z0-9._\-/]+$/,
      "Path must sit under projects/ or certificates/"
    )
    .refine((value) => !value.includes(".."), "Path may not contain .."),
});
