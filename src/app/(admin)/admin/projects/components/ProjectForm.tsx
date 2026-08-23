"use client";

import { useState } from "react";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, Upload, X } from "lucide-react";
import type { Project } from "@/lib/content";
import { projectSchema, type ProjectInput } from "@/lib/schemas";
import {
  PROJECT_ICONS,
  PROJECT_ICON_DEFAULT_COLOR,
  PROJECT_ICON_KEYS,
  type ProjectIconKey,
} from "@/lib/icon-registry";
import { fileExtension, uploadFile } from "@/lib/upload-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProjectForm({
  project,
  onSaved,
}: {
  project: Project | null;
  onSaved: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [badgeText, setBadgeText] = useState(project?.badges.join(", ") ?? "");

  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      slug: project?.slug ?? "",
      title: project?.title ?? "",
      description: project?.description ?? "",
      href: project?.href ?? "",
      year: project?.year ?? new Date().getFullYear(),
      imageUrl: project?.imageUrl ?? undefined,
      icons: project?.icons ?? [],
      badges: project?.badges ?? [],
      published: project?.published ?? true,
    },
  });

  const icons = useFieldArray({ control: form.control, name: "icons" });
  const imageUrl = form.watch("imageUrl");

  const handleImage = async (file: File) => {
    const slug = form.getValues("slug") || slugify(form.getValues("title"));
    if (!slug) {
      toast.error("Give the project a title or slug first");
      return;
    }

    setIsUploading(true);
    try {
      const extension = fileExtension(file.name, "png");
      const url = await uploadFile(
        `projects/${slug}-${Date.now()}.${extension}`,
        file
      );
      form.setValue("imageUrl", url, { shouldValidate: true });
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not upload the image"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (values: ProjectInput) => {
    setIsSubmitting(true);

    const response = await fetch(
      project ? `/api/admin/projects/${project.id}` : "/api/admin/projects",
      {
        method: project ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      toast.error(body.error ?? "Could not save the project");
      setIsSubmitting(false);
      return;
    }

    toast.success(project ? "Project updated" : "Project created");
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
                  onChange={(event) => {
                    field.onChange(event);
                    // Only auto-fill the slug for new projects: changing an
                    // existing one would break its identity.
                    if (!project && !form.getValues("slug")) return;
                  }}
                  onBlur={() => {
                    field.onBlur();
                    if (!project && !form.getValues("slug")) {
                      form.setValue("slug", slugify(field.value));
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} placeholder="my-project" />
              </FormControl>
              <FormDescription>
                Unique identifier. Lowercase, hyphen separated.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="href"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Live URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  {/* valueAsNumber: the schema wants a number, and a bare
                      number input hands back a string. */}
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(event.target.valueAsNumber)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Mockup */}
        <div className="space-y-2">
          <Label>Mockup image</Label>
          <div className="flex items-center gap-4">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt=""
                width={128}
                height={72}
                className="h-18 w-32 rounded border object-cover"
              />
            ) : (
              <div className="bg-muted h-18 w-32 rounded border" />
            )}
            <div className="space-y-2">
              <Input
                type="file"
                accept="image/*"
                disabled={isUploading}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) handleImage(file);
                }}
              />
              <p className="text-muted-foreground text-xs">
                {isUploading ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="size-3" /> Uploading…
                  </span>
                ) : (
                  <>
                    <Upload className="mr-1 inline size-3" />
                    Leave empty to show a placeholder.
                  </>
                )}
              </p>
              {imageUrl && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() =>
                    form.setValue("imageUrl", undefined, {
                      shouldValidate: true,
                    })
                  }
                >
                  <X /> Remove image
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Tech icons */}
        <div className="space-y-2">
          <Label>Tech stack icons</Label>
          <div className="space-y-2">
            {icons.fields.map((field, index) => {
              const key = form.watch(`icons.${index}.key`) as ProjectIconKey;
              const Icon = PROJECT_ICONS[key];
              const color = form.watch(`icons.${index}.color`);

              return (
                <div key={field.id} className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border">
                    {Icon && <Icon size={20} color={color} />}
                  </div>
                  <Select
                    value={key}
                    onValueChange={(value) => {
                      form.setValue(
                        `icons.${index}.key`,
                        value as ProjectIconKey
                      );
                      form.setValue(
                        `icons.${index}.color`,
                        PROJECT_ICON_DEFAULT_COLOR[value as ProjectIconKey]
                      );
                    }}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Pick a technology" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_ICON_KEYS.map((iconKey) => (
                        <SelectItem key={iconKey} value={iconKey}>
                          {iconKey}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    className="w-32"
                    placeholder="colour"
                    {...form.register(`icons.${index}.color`)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                    aria-label="Remove icon"
                    onClick={() => icons.remove(index)}
                  >
                    <X />
                  </Button>
                </div>
              );
            })}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() =>
              icons.append({
                key: PROJECT_ICON_KEYS[0],
                color: PROJECT_ICON_DEFAULT_COLOR[PROJECT_ICON_KEYS[0]],
              })
            }
          >
            <Plus /> Add icon
          </Button>
          {form.formState.errors.icons && (
            <p className="text-destructive text-sm">
              {form.formState.errors.icons.message}
            </p>
          )}
        </div>

        {/* Badges */}
        <div className="space-y-2">
          <Label htmlFor="badges">Badges</Label>
          <Input
            id="badges"
            value={badgeText}
            placeholder="Fullstack, Responsive, SAAS"
            onChange={(event) => {
              setBadgeText(event.target.value);
              form.setValue(
                "badges",
                event.target.value
                  .split(",")
                  .map((badge) => badge.trim())
                  .filter(Boolean),
                { shouldValidate: true }
              );
            }}
          />
          <p className="text-muted-foreground text-xs">Comma separated.</p>
          {form.formState.errors.badges && (
            <p className="text-destructive text-sm">
              {form.formState.errors.badges.message}
            </p>
          )}
        </div>

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <FormLabel>Published</FormLabel>
                <FormDescription>
                  Drafts stay hidden from /projects.
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

        <Button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="w-full cursor-pointer bg-my-primary font-bold tracking-wider text-black hover:bg-my-secondary"
        >
          {isSubmitting && <Spinner />}
          {project ? "Save changes" : "Create project"}
        </Button>
      </form>
    </Form>
  );
}
