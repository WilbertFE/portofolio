import { requireAdminPage } from "@/lib/auth-guard";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { mapCertificate, type CertificateRow } from "@/lib/content";
import { CertificatesManager } from "./components";

export default async function AdminCertificatesPage() {
  await requireAdminPage();

  const { data, error } = await getSupabaseAdmin()
    .from("certificates")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) console.error("Failed to load certificates", error);

  const certificates = ((data ?? []) as CertificateRow[]).map(mapCertificate);

  return <CertificatesManager certificates={certificates} />;
}
