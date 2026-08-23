import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/auth-guard";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { emptyToNull, projectUpdateSchema } from "@/lib/schemas";
import { mapProject, type ProjectRow } from "@/lib/content";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const guard = await requireAdminApi();
  if (guard instanceof NextResponse) return guard;

  const { id } = await params;
  const parsed = projectUpdateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid project", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const input = parsed.data;
  // Only send through the keys that were actually supplied, so a partial
  // update cannot blank out a column by omission.
  const row: Record<string, unknown> = {};
  if (input.slug !== undefined) row.slug = input.slug;
  if (input.title !== undefined) row.title = input.title;
  if (input.description !== undefined) row.description = input.description;
  if (input.href !== undefined) row.href = input.href;
  if (input.year !== undefined) row.year = input.year;
  if ("imageUrl" in input) row.image_url = emptyToNull(input.imageUrl);
  if (input.imagePosition !== undefined) row.image_position = input.imagePosition;
  if (input.icons !== undefined) row.icons = input.icons;
  if (input.badges !== undefined) row.badges = input.badges;
  if (input.published !== undefined) row.published = input.published;

  if (Object.keys(row).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 422 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("projects")
    .update(row)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    const isDuplicate = error.code === "23505";
    console.error("Failed to update project", error);
    return NextResponse.json(
      { error: isDuplicate ? "That slug is already taken" : "Failed to update project" },
      { status: isDuplicate ? 409 : 500 }
    );
  }
  if (!data) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  revalidatePath("/projects");

  return NextResponse.json({ project: mapProject(data as ProjectRow) });
}

export async function DELETE(_request: Request, { params }: Params) {
  const guard = await requireAdminApi();
  if (guard instanceof NextResponse) return guard;

  const { id } = await params;

  const { error } = await getSupabaseAdmin()
    .from("projects").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete project", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }

  revalidatePath("/projects");

  return NextResponse.json({ ok: true });
}
