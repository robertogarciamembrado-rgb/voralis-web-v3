import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactoForm } from "@/components/sections/ContactoForm";
import { contact } from "@/content/pages";

export const metadata: Metadata = { title: "Contacto — Voralis" };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ motivo?: string }>;
}) {
  const { motivo } = await searchParams;
  /* /contacto?motivo=… preselecciona el motivo si coincide con uno de la lista. */
  const defaultMotivo = contact.reasons.find((r) => r.value === motivo)?.value;

  return (
    <>
      <PageHeader title={contact.title} lead={contact.lead} />
      <Container className="py-16 sm:py-20">
        <ContactoForm defaultMotivo={defaultMotivo} />
      </Container>
    </>
  );
}
