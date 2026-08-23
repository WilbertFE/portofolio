"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { FileText, X } from "lucide-react";
import { pdfToWebpPages } from "@/lib/pdf-to-images";
import { uploadFile } from "@/lib/upload-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Stage =
  | { kind: "idle" }
  | { kind: "rendering"; done: number; total: number }
  | { kind: "uploading"; done: number; total: number };

/**
 * Takes a PDF, renders every page to WebP in the browser, uploads the PDF and
 * all page images to Supabase Storage, and hands the resulting URLs back.
 *
 * page_count is never typed by hand - it is however many images came out.
 */
export default function PdfDropzone({
  slug,
  pdfUrl,
  pageUrls,
  onChange,
}: {
  slug: string;
  pdfUrl?: string;
  pageUrls: string[];
  onChange: (value: { pdfUrl?: string; pageUrls: string[] }) => void;
}) {
  const [stage, setStage] = useState<Stage>({ kind: "idle" });
  const busy = stage.kind !== "idle";

  const handleFile = async (file: File) => {
    if (!slug) {
      toast.error("Give the certificate a slug first");
      return;
    }

    try {
      setStage({ kind: "rendering", done: 0, total: 0 });

      const pages = await pdfToWebpPages(file, (done, total) =>
        setStage({ kind: "rendering", done, total })
      );

      if (pages.length === 0) {
        throw new Error("That PDF has no pages");
      }

      setStage({ kind: "uploading", done: 0, total: pages.length + 1 });

      // The original PDF, so the viewer's "Open PDF" button still works.
      const uploadedPdf = await uploadFile(
        `certificates/${slug}/source.pdf`,
        file
      );
      setStage({ kind: "uploading", done: 1, total: pages.length + 1 });

      const uploadedPages: string[] = [];
      for (const page of pages) {
        uploadedPages.push(
          await uploadFile(
            `certificates/${slug}/page-${page.pageNumber}.webp`,
            page.blob
          )
        );
        setStage({
          kind: "uploading",
          done: uploadedPages.length + 1,
          total: pages.length + 1,
        });
      }

      onChange({ pdfUrl: uploadedPdf, pageUrls: uploadedPages });
      toast.success(
        `Uploaded ${uploadedPages.length} page${uploadedPages.length === 1 ? "" : "s"}`
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not process the PDF"
      );
    } finally {
      setStage({ kind: "idle" });
    }
  };

  return (
    <div className="space-y-3">
      <Label>Certificate PDF</Label>

      <Input
        type="file"
        accept="application/pdf"
        disabled={busy}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {stage.kind === "rendering" && (
        <p className="text-muted-foreground flex items-center gap-2 text-sm">
          <Spinner className="size-3" />
          Rendering page {stage.done}
          {stage.total > 0 && ` of ${stage.total}`}…
        </p>
      )}
      {stage.kind === "uploading" && (
        <p className="text-muted-foreground flex items-center gap-2 text-sm">
          <Spinner className="size-3" />
          Uploading {stage.done} of {stage.total}…
        </p>
      )}
      {stage.kind === "idle" && (
        <p className="text-muted-foreground text-xs">
          Every page is rendered to an image here in your browser, then
          uploaded. Nothing needs running by hand.
        </p>
      )}

      {pageUrls.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {pageUrls.length} page{pageUrls.length === 1 ? "" : "s"}
              {pdfUrl && (
                <span className="text-muted-foreground">
                  {" "}
                  <FileText className="inline size-3" /> PDF attached
                </span>
              )}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="cursor-pointer"
              disabled={busy}
              onClick={() => onChange({ pdfUrl: undefined, pageUrls: [] })}
            >
              <X /> Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {pageUrls.map((url, index) => (
              <Image
                key={url}
                src={url}
                alt={`Page ${index + 1}`}
                width={112}
                height={79}
                className="h-20 w-28 rounded border bg-white object-contain"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
