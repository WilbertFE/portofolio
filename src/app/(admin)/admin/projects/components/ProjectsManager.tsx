"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Project } from "@/lib/content";
import { PROJECT_ICONS } from "@/lib/icon-registry";
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
import ProjectForm from "./ProjectForm";

export default function ProjectsManager({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleting, setDeleting] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const closeAndRefresh = () => {
    setEditing(null);
    setIsCreating(false);
    router.refresh();
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setIsDeleting(true);

    const response = await fetch(`/api/admin/projects/${deleting.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      toast.error(body.error ?? "Could not delete the project");
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
          <h1 className="text-3xl font-bold tracking-wider">Projects</h1>
          <p className="text-muted-foreground">
            {projects.length} total. These render on /projects.
          </p>
        </div>
        <Button
          className="cursor-pointer bg-my-primary font-bold tracking-wider text-black hover:bg-my-secondary"
          onClick={() => setIsCreating(true)}
        >
          <Plus />
          New project
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-20">Year</TableHead>
              <TableHead>Stack</TableHead>
              <TableHead className="w-28">Status</TableHead>
              <TableHead className="w-28 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground py-10 text-center"
                >
                  No projects yet. Create the first one.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt=""
                        width={80}
                        height={45}
                        className="h-11 w-20 rounded object-cover"
                      />
                    ) : (
                      <div className="bg-muted h-11 w-20 rounded" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{project.title}</div>
                    <div className="text-muted-foreground text-xs">
                      {project.slug}
                    </div>
                  </TableCell>
                  <TableCell className="tabular-nums">{project.year}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-2">
                      {project.icons.map((icon) => {
                        const Icon = PROJECT_ICONS[icon.key];
                        return (
                          <Icon key={icon.key} size={18} color={icon.color} />
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={project.published ? "secondary" : "outline"}
                      className={
                        project.published
                          ? "bg-green-600 text-white"
                          : undefined
                      }
                    >
                      {project.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      aria-label={`Edit ${project.title}`}
                      onClick={() => setEditing(project)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive cursor-pointer"
                      aria-label={`Delete ${project.title}`}
                      onClick={() => setDeleting(project)}
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
              {editing ? "Edit project" : "New project"}
            </DialogTitle>
            <DialogDescription>
              Changes go live on /projects as soon as you save.
            </DialogDescription>
          </DialogHeader>
          <ProjectForm project={editing} onSaved={closeAndRefresh} />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{deleting?.title}&quot; will be removed from /projects
              immediately. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90 text-white"
              disabled={isDeleting}
              onClick={(event) => {
                // Keep the dialog up until the request settles.
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
