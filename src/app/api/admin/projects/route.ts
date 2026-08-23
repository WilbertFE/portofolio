import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/auth-guard";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { emptyToNull, projectSchema, type ProjectInput } from "@/lib/schemas";
import { mapProject, type ProjectRow } from "@/lib/content";

export function projectToRow(input: ProjectInput) {
  return {
    slug: input.slug,
    title: input.title,
    description: input.description,
    href: input.href,
    year: input.year,
    image_url: emptyToNull(input.imageUrl),
    image_position: input.imagePosition,
    icons: input.icons,
    badges: input.badges,
    published: input.published,
  };
}

/** Admin listing includes unpublished rows, so it uses the service client. */
export async function GET() {
  const guard = await requireAdminApi();
  if (guard instanceof NextResponse) return guard;

  const { data, error } = await getSupabaseAdmin()
    .from("projects")
    .select("*")
    .order("year", { ascending: false });

  if (error) {
    console.error("Failed to list projects", error);
    return NextResponse.json(
      { error: "Failed to list projects" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    projects: (data as ProjectRow[]).map(mapProject),
  });
}

export async function POST(request: Request) {
  const guard = await requireAdminApi();
  if (guard instanceof NextResponse) return guard;

  const parsed = projectSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid project", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const { data, error } = await getSupabaseAdmin()
    .from("projects")
    .insert(projectToRow(parsed.data))
    .select("*")
    .single();

  if (error) {
    // 23505 is unique_violation - almost always a duplicate slug.
    const isDuplicate = error.code === "23505";
    console.error("Failed to create project", error);
    return NextResponse.json(
      { error: isDuplicate ? "That slug is already taken" : "Failed to create project" },
      { status: isDuplicate ? 409 : 500 }
    );
  }

  revalidatePath("/projects");

  return NextResponse.json(
    { project: mapProject(data as ProjectRow) },
    { status: 201 }
  );
}
