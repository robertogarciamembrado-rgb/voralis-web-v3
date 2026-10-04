import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SolicitudAltaForm } from "@/components/sections/SolicitudAltaForm";
import { signup } from "@/content/pages";

export const metadata: Metadata = { title: "Solicitar alta — Voralis" };

export default async function SolicitudAltaPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  /* Solo se admiten los planes documentados; cualquier otro valor se ignora. */
  const validPlan =
    plan === "profesional" || plan === "observatorio" ? plan : undefined;

  return (
    <>
      <PageHeader title={signup.title} lead={signup.lead} />
      <Container className="py-16 sm:py-20">
        <SolicitudAltaForm plan={validPlan} />
      </Container>
    </>
  );
}
