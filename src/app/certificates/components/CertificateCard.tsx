"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { TiLocationArrow } from "react-icons/ti";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CERTIFICATE_ASPECT_RATIO,
  certificateFile,
  certificatePage,
  formatCertificateDate,
  type Certificate,
} from "@/lib/certificates";

export default function CertificateCard({
  certificate,
  priority,
}: {
  certificate: Certificate;
  priority: boolean;
}) {
  const {
    slug,
    title,
    issuer,
    issuedAt,
    validUntil,
    credentialId,
    credentialUrl,
    pageCount,
  } = certificate;

  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const hasMultiplePages = pageCount > 1;

  const goToPage = useCallback(
    (next: number) => {
      // Wrap around so the arrows never dead-end.
      setPage(((next - 1 + pageCount) % pageCount) + 1);
    },
    [pageCount]
  );

  // Arrow keys page through the certificate while the dialog is open.
  useEffect(() => {
    if (!isOpen || !hasMultiplePages) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goToPage(page - 1);
      if (event.key === "ArrowRight") goToPage(page + 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, hasMultiplePages, page, goToPage]);

  const openViewer = () => {
    setPage(1);
    setIsOpen(true);
  };

  return (
    <>
      <div className="border bg-transparent p-1 rounded-xl">
        <Card className="px-4 py-6 h-full gap-y-4">
          <button
            type="button"
            onClick={openViewer}
            aria-label={`View ${title} certificate`}
            className="group cursor-pointer rounded-lg"
          >
            <AspectRatio
              ratio={CERTIFICATE_ASPECT_RATIO}
              className="overflow-hidden rounded-lg border bg-white"
            >
              <Image
                src={certificatePage(slug, 1)}
                alt={`${title} certificate issued by ${issuer}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={priority}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </AspectRatio>
          </button>

          <CardHeader className="flex flex-col gap-y-4 px-1">
            <CardTitle className="text-lg tracking-wider w-full flex items-start gap-x-2">
              <div className="flex-1 space-y-1">
                <h2 className="line-clamp-2">{title}</h2>
                <span className="text-muted-foreground text-base font-normal">
                  {issuer}
                  {issuedAt && ` · ${formatCertificateDate(issuedAt)}`}
                </span>
              </div>
              {credentialUrl && (
                <CardAction className="self-center">
                  <Button
                    asChild
                    variant="link"
                    className="tracking-wider font-bold text-my-primary"
                  >
                    <Link
                      className="relative"
                      href={credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Verify{" "}
                      <TiLocationArrow className="absolute top-0 -right-1" />
                    </Link>
                  </Button>
                </CardAction>
              )}
            </CardTitle>
            <CardDescription className="space-x-2">
              {hasMultiplePages && (
                <Badge
                  variant="secondary"
                  className="bg-blue-500 text-white dark:bg-blue-600"
                >
                  {pageCount} pages
                </Badge>
              )}
              {credentialId && (
                <Badge variant="outline">{credentialId}</Badge>
              )}
            </CardDescription>
          </CardHeader>

          <CardFooter className="px-1">
            <Button
              variant="secondary"
              className="cursor-pointer"
              onClick={openViewer}
            >
              View certificate
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="lg:max-w-4xl max-h-[92dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="tracking-wider pr-6">{title}</DialogTitle>
            <DialogDescription>
              {issuer}
              {issuedAt && ` · Issued ${formatCertificateDate(issuedAt)}`}
              {validUntil && ` · Valid until ${formatCertificateDate(validUntil)}`}
            </DialogDescription>
          </DialogHeader>

          {/* Bounded by viewport height rather than aspect ratio, so the
              header, pager and footer always stay on screen. object-contain
              keeps the page whole inside it. */}
          <div className="relative w-full h-[42dvh] sm:h-[50dvh] lg:h-[55dvh] overflow-hidden rounded-lg border bg-white">
            <Image
              src={certificatePage(slug, page)}
              alt={`${title}, page ${page} of ${pageCount}`}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-contain"
            />
          </div>

          {hasMultiplePages && (
            <div className="flex items-center justify-center gap-x-4">
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer"
                onClick={() => goToPage(page - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft />
              </Button>
              <span className="text-muted-foreground tabular-nums">
                Page {page} of {pageCount}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer"
                onClick={() => goToPage(page + 1)}
                aria-label="Next page"
              >
                <ChevronRight />
              </Button>
            </div>
          )}

          <DialogFooter className="sm:justify-start gap-2">
            {credentialUrl && (
              <Button asChild className="font-bold tracking-wider">
                <Link
                  href={credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Verify credential
                  <TiLocationArrow />
                </Link>
              </Button>
            )}
            <Button asChild variant="outline">
              <Link
                href={certificateFile(slug)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText />
                Open PDF
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
