import {
  CERTIFICATE_PAGE_QUALITY,
  CERTIFICATE_PAGE_WIDTH,
} from "@/lib/certificates";

/**
 * Rasterises a PDF to one WebP blob per page, in the admin's browser.
 *
 * This replaces the server side of scripts/generate-certificate-previews.mjs
 * and produces the same thing (width 1600, quality 0.8). Doing it here rather
 * than in a route handler keeps @napi-rs/canvas - a large native binary - off
 * the serverless runtime entirely.
 *
 * pdfjs-dist is imported dynamically so it only loads when someone actually
 * picks a PDF, and never on a public page.
 */
export type RenderedPage = {
  pageNumber: number;
  blob: Blob;
  width: number;
  height: number;
};

export async function pdfToWebpPages(
  file: Blob,
  onProgress?: (done: number, total: number) => void
): Promise<RenderedPage[]> {
  const pdfjs = await import("pdfjs-dist");

  // Bundled by Turbopack rather than fetched from a CDN, so it works offline
  // and is not blocked by any CSP.
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const data = new Uint8Array(await file.arrayBuffer());
  // Keep the loading task: destroy() lives on it, not on the proxy.
  const loadingTask = pdfjs.getDocument({ data });
  const document = await loadingTask.promise;

  const pages: RenderedPage[] = [];

  try {
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber++) {
      const page = await document.getPage(pageNumber);

      // Render straight at the target width: the source is vector, so this is
      // sharper than rendering big and downscaling.
      const base = page.getViewport({ scale: 1 });
      const scale = Math.min(
        4,
        Math.max(1, CERTIFICATE_PAGE_WIDTH / base.width)
      );
      const viewport = page.getViewport({ scale });

      const canvas = window.document.createElement("canvas");
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);

      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not get a 2D canvas context");

      // Certificates are drawn on transparent backgrounds; without this they
      // rasterise with black behind the text.
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);

      await page.render({ canvas, viewport }).promise;

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/webp", CERTIFICATE_PAGE_QUALITY)
      );
      if (!blob) throw new Error(`Could not encode page ${pageNumber}`);

      pages.push({
        pageNumber,
        blob,
        width: canvas.width,
        height: canvas.height,
      });

      // Free the backing store now rather than waiting on GC - a 10-page PDF
      // at 1600px is a lot of bitmap to hold at once.
      canvas.width = 0;
      canvas.height = 0;
      page.cleanup();

      onProgress?.(pageNumber, document.numPages);
    }
  } finally {
    await loadingTask.destroy();
  }

  return pages;
}
