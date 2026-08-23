import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { Header, MainProjects } from "./components";
import { getProjects } from "@/lib/content";

// Admin writes call revalidatePath, so edits appear immediately. This is
// only a safety net: if the build cannot reach Supabase the page would
// otherwise ship empty and stay that way until the next edit.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Projects - Wilbert Bernardi",
  description: "Web development projects built by Wilbert Bernardi.",
};

// Server component so it can read Supabase directly. MainProjects has no
// hooks, so it renders on the server too and the icon registry never reaches
// the browser. Admin writes call revalidatePath, so this cache is dropped the
// moment content changes.
export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-wrap gap-y-16 px-8 pb-32 container mx-auto">
      <Header />
      <Separator className="my-12 lg:my-0" />
      <MainProjects projects={projects} />
    </div>
  );
}
