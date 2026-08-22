// Every certificate PDF is landscape A4 (841.89 x 595.28 pt), so one aspect
// ratio fits every preview and nothing has to be cropped.
export const CERTIFICATE_ASPECT_RATIO = 841.89 / 595.28;

// Intrinsic size of the files written by scripts/generate-certificate-previews.mjs.
export const CERTIFICATE_PAGE_WIDTH = 1600;
export const CERTIFICATE_PAGE_HEIGHT = 1131;

export type Certificate = {
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
  /** Page previews live at page-1..page-<pageCount>. */
  pageCount: number;
};

/** Preview image for a single page, produced by `npm run certs:preview`. */
export function certificatePage(slug: string, page: number) {
  return `/img/certificates/${slug}/page-${page}.webp`;
}

/** The original PDF, served straight out of public/. */
export function certificateFile(slug: string) {
  return `/certificates/${slug}.pdf`;
}

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

export const certificates: Certificate[] = [
  {
    slug: "dicoding-git-github",
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding",
    issuedAt: "2026-08-22",
    validUntil: "2029-08-22",
    credentialId: "4EXGJY23EXRL",
    credentialUrl: "https://www.dicoding.com/certificates/4EXGJY23EXRL",
    pageCount: 3,
  },
  {
    slug: "dicoding-programming-logic-101",
    title: "Pengenalan ke Logika Pemrograman (Programming Logic 101)",
    issuer: "Dicoding",
    issuedAt: "2026-08-22",
    validUntil: "2029-08-22",
    credentialId: "53XEME9M0PRN",
    credentialUrl: "https://www.dicoding.com/certificates/53XEME9M0PRN",
    pageCount: 2,
  },
  {
    slug: "dicoding-memulai-dasar-pemrograman",
    title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
    issuer: "Dicoding",
    issuedAt: "2026-08-21",
    validUntil: "2029-08-21",
    credentialId: "QLZ9N8N49Z5D",
    credentialUrl: "https://www.dicoding.com/certificates/QLZ9N8N49Z5D",
    pageCount: 3,
  },
  {
    slug: "kaggle-intro-to-programming",
    title: "Intro to Programming",
    issuer: "Kaggle",
    issuedAt: "2026-08-07",
    credentialUrl:
      "https://www.kaggle.com/learn/certification/bernardiwilbert/intro-to-programming",
    pageCount: 1,
  },
];
