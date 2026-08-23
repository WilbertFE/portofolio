import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { CertificateCard, Header } from "./components";
import { certificates } from "@/lib/certificates";

export const metadata: Metadata = {
  title: "Certificates - Wilbert Bernardi",
  description:
    "Courses completed by Wilbert Bernardi, with verifiable credentials.",
};

// Only the first row is above the fold, so the rest of the previews lazy-load.
const PRIORITY_PREVIEWS = 2;

export default function CertificatesPage() {
  return (
    <div className="p-6 space-y-4 mx-auto h-full container">
      <Header />
      <Separator className="my-4" />
      <div className="grid lg:grid-cols-2 gap-8 pb-32">
        {certificates.map((certificate, i) => (
          <CertificateCard
            key={certificate.slug}
            certificate={certificate}
            priority={i < PRIORITY_PREVIEWS}
          />
        ))}
      </div>
    </div>
  );
}
