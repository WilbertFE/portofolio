"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { Certificate } from "@/lib/content";
import { certificateSchema, type CertificateInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PdfDropzone from "./PdfDropzone";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CertificateForm({
  certificate,
  onSaved,
}: {
  certificate: Certificate | null;
  onSaved: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CertificateInput>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      slug: certificate?.slug ?? "",
      title: certificate?.title ?? "",
      issuer: certificate?.issuer ?? "",
      issuedAt: certificate?.issuedAt ?? undefined,
      validUntil: certificate?.validUntil ?? undefined,
      credentialId: certificate?.credentialId ?? undefined,
      credentialUrl: certificate?.credentialUrl ?? undefined,
      pdfUrl: certificate?.pdfUrl ?? undefined,
      pageUrls: certificate?.pageUrls ?? [],
      published: certificate?.published ?? true,
      sortOrder: certificate?.sortOrder ?? 0,
    },
  });

  const pageUrls = form.watch("pageUrls");
  const pdfUrl = form.watch("pdfUrl");
  const slug = form.watch("slug");

  const onSubmit = async (values: CertificateInput) => {
    setIsSubmitting(true);

    const response = await fetch(
      certificate
        ? `/api/admin/certificates/${certificate.id}`
        : "/api/admin/certificates",
      {
        method: certificate ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      toast.error(body.error ?? "Could not save the certificate");
      setIsSubmitting(false);
      return;
    }

    toast.success(certificate ? "Certificate updated" : "Certificate created");
    setIsSubmitting(false);
    onSaved();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onBlur={() => {
                    field.onBlur();
                    if (!certificate && !form.getValues("slug")) {
                      form.setValue("slug", slugify(field.value));
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="issuer-course-name" />
                </FormControl>
                <FormDescription>Also the storage folder name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="issuer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issuer</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Dicoding" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="issuedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issued</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="validUntil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valid until</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormDescription>Leave empty if it never expires.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="credentialId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credential ID</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="credentialUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verify URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder="https://…"
                  />
                </FormControl>
                <FormDescription>
                  Leave empty and no Verify button is shown.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <PdfDropzone
          slug={slug}
          pdfUrl={pdfUrl}
          pageUrls={pageUrls ?? []}
          onChange={(value) => {
            form.setValue("pdfUrl", value.pdfUrl, { shouldValidate: true });
            form.setValue("pageUrls", value.pageUrls, {
              shouldValidate: true,
            });
          }}
        />
        {form.formState.errors.pageUrls && (
          <p className="text-destructive text-sm">
            {form.formState.errors.pageUrls.message}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="sortOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={(event) =>
                      field.onChange(event.target.valueAsNumber)
                    }
                  />
                </FormControl>
                <FormDescription>Lower shows first.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel>Published</FormLabel>
                  <FormDescription>
                    Drafts stay hidden from /certificates.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-my-primary font-bold tracking-wider text-black hover:bg-my-secondary"
        >
          {isSubmitting && <Spinner />}
          {certificate ? "Save changes" : "Create certificate"}
        </Button>
      </form>
    </Form>
  );
}
