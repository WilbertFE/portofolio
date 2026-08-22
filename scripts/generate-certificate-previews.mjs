/**
 * Renders every PDF in public/certificates/ into WebP page previews under
 * public/img/certificates/<slug>/page-<n>.webp
 *
 * The certificate PDFs draw their text with embedded fonts over a blank
 * background image, so the pages have to be rasterised properly - pulling the
 * embedded bitmap out of the PDF would only give you an empty template.
 *
 * Dev-only tooling: nothing here ends up in the production bundle. Re-run with
 * `npm run certs:preview` after adding or replacing a certificate, then update
 * the pageCount in src/lib/certificates.ts with the numbers it prints.
 */
import { readdir, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pdf } from "pdf-to-img";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PDF_DIR = path.join(ROOT, "public", "certificates");
const OUT_DIR = path.join(ROOT, "public", "img", "certificates");

// Render at 2x the PDF page size so the downscale to WIDTH stays crisp.
const SCALE = 2;
const WIDTH = 1600;
const QUALITY = 80;

async function main() {
  const files = (await readdir(PDF_DIR))
    .filter((file) => file.toLowerCase().endsWith(".pdf"))
    .sort();

  if (files.length === 0) {
    console.log(`No PDFs found in ${PDF_DIR}`);
    return;
  }

  const summary = [];

  for (const file of files) {
    const slug = path.basename(file, path.extname(file));
    const outDir = path.join(OUT_DIR, slug);

    // Clear first, so replacing a certificate with a shorter one does not
    // leave orphaned pages behind.
    await rm(outDir, { recursive: true, force: true });
    await mkdir(outDir, { recursive: true });

    console.log(`${slug}`);

    const document = await pdf(path.join(PDF_DIR, file), { scale: SCALE });

    let pageCount = 0;
    for await (const image of document) {
      pageCount += 1;
      const target = path.join(outDir, `page-${pageCount}.webp`);
      const info = await sharp(image)
        .resize({ width: WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(target);

      console.log(
        `  page-${pageCount}.webp  ${info.width}x${info.height}  ${Math.round(
          info.size / 1024
        )} KB`
      );
    }

    summary.push({ slug, pageCount });
  }

  console.log("\npageCount values for src/lib/certificates.ts:");
  for (const { slug, pageCount } of summary) {
    console.log(`  ${slug} -> pageCount: ${pageCount}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
