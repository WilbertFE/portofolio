/**
 * Presentation constants for certificate previews. The certificate data itself
 * lives in Supabase - see getCertificates() in src/lib/content.ts.
 */

// Every certificate PDF so far is landscape A4 (841.89 x 595.28 pt), so one
// aspect ratio fits every preview and nothing has to be cropped.
export const CERTIFICATE_ASPECT_RATIO = 841.89 / 595.28;

// Intrinsic size the admin uploader and scripts/generate-certificate-previews.mjs
// both render pages at.
export const CERTIFICATE_PAGE_WIDTH = 1600;
export const CERTIFICATE_PAGE_HEIGHT = 1131;
export const CERTIFICATE_PAGE_QUALITY = 0.8;

// Fixed to UTC so the server render and the client render always agree.
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatCertificateDate(isoDate: string) {
  return dateFormatter.format(new Date(isoDate));
}
