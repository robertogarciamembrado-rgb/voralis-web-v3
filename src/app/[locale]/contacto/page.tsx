import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactoForm } from "@/components/sections/ContactoForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: `${t("title")} — Voralis` };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ motivo?: string }>;
}) {
  const resolvedParams = await params;
  if (!resolvedParams) return null;
  const { locale } = resolvedParams;
  const { motivo } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  const tReasons = (await t.raw("reasons")) as Array<{ value: string; label: string }>;

  /* /contacto?motivo=… preselecciona el motivo si coincide con uno de la lista. */
  const defaultMotivo = tReasons.find((r) => r.value === motivo)?.value;

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <Container className="py-16 sm:py-20">
        <ContactoForm defaultMotivo={defaultMotivo} />
      </Container>
    </>
  );
}
