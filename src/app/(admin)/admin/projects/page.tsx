import { requireAdminPage } from "@/lib/auth-guard";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { mapProject, type ProjectRow } from "@/lib/content";
import { ProjectsManager } from "./components";

export default async function AdminProjectsPage() {
  await requireAdminPage();

  // Service-role read so unpublished rows show up here but not on /projects.
  const { data, error } = await getSupabaseAdmin()
    .from("projects")
    .select("*")
    .order("year", { ascending: false });

  if (error) console.error("Failed to load projects", error);

  const projects = ((data ?? []) as ProjectRow[]).map(mapProject);

  return <ProjectsManager projects={projects} />;
}
