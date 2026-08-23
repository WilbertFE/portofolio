"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import type { Certificate } from "@/lib/content";
import { formatCertificateDate } from "@/lib/certificates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CertificateForm from "./CertificateForm";

export default function CertificatesManager({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleting, setDeleting] = useState<Certificate | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const closeAndRefresh = () => {
    setEditing(null);
    setIsCreating(false);
    router.refresh();
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setIsDeleting(true);

    const response = await fetch(`/api/admin/certificates/${deleting.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      toast.error(body.error ?? "Could not delete the certificate");
    } else {
      toast.success(`Deleted "${deleting.title}"`);
      router.refresh();
    }

    setIsDeleting(false);
    setDeleting(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wider">Certificates</h1>
          <p className="text-muted-foreground">
            {certificates.length} total. Upload a PDF and the pages are
            generated for you.
          </p>
        </div>
        <Button
          className="cursor-pointer bg-my-primary font-bold tracking-wider text-black hover:bg-my-secondary"
          onClick={() => setIsCreating(true)}
        >
          <Plus />
          New certificate
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-32">Issuer</TableHead>
              <TableHead className="w-36">Issued</TableHead>
              <TableHead className="w-24">Pages</TableHead>
              <TableHead className="w-28">Status</TableHead>
              <TableHead className="w-28 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-muted-foreground py-10 text-center"
                >
                  No certificates yet. Create the first one.
                </TableCell>
              </TableRow>
            ) : (
              certificates.map((certificate) => (
                <TableRow key={certificate.id}>
                  <TableCell>
                    {certificate.pageUrls[0] ? (
                      <Image
                        src={certificate.pageUrls[0]}
                        alt=""
                        width={80}
                        height={57}
                        className="h-14 w-20 rounded border bg-white object-contain"
                      />
                    ) : (
                      <div className="bg-muted h-14 w-20 rounded" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="line-clamp-2 font-medium">
                      {certificate.title}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {certificate.slug}
                    </div>
                  </TableCell>
                  <TableCell>{certificate.issuer}</TableCell>
                  <TableCell className="text-sm">
                    {certificate.issuedAt
                      ? formatCertificateDate(certificate.issuedAt)
                      : "—"}
                  </TableCell>
                  <TableCell className="tabular-nums">
                    {certificate.pageUrls.length}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-start gap-1">
                      <Badge
                        variant={
                          certificate.published ? "secondary" : "outline"
                        }
                        className={
                          certificate.published
                            ? "bg-green-600 text-white"
                            : undefined
                        }
                      >
                        {certificate.published ? "Published" : "Draft"}
                      </Badge>
                      {certificate.credentialUrl && (
                        <Badge variant="outline" className="gap-1">
                          <ExternalLink className="size-3" />
                          Verify
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      aria-label={`Edit ${certificate.title}`}
                      onClick={() => setEditing(certificate)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive cursor-pointer"
                      aria-label={`Delete ${certificate.title}`}
                      onClick={() => setDeleting(certificate)}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={isCreating || editing !== null}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreating(false);
            setEditing(null);
          }
        }}
      >
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="tracking-wider">
              {editing ? "Edit certificate" : "New certificate"}
            </DialogTitle>
            <DialogDescription>
              Changes go live on /certificates as soon as you save.
            </DialogDescription>
          </DialogHeader>
          <CertificateForm certificate={editing} onSaved={closeAndRefresh} />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this certificate?</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{deleting?.title}&quot; and its uploaded PDF and page images
              will be removed. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90 text-white"
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault();
                confirmDelete();
              }}
            >
              {isDeleting && <Spinner />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
