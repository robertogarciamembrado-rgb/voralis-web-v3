import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SolicitudAltaForm } from "@/components/sections/SolicitudAltaForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Signup" });
  return { title: `${t("title")} — Voralis` };
}

export default async function SolicitudAltaPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ plan?: string }>;
}) {
  const resolvedParams = await params;
  if (!resolvedParams) return null;
  const { locale } = resolvedParams;
  const { plan } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("Signup");

  /* Solo se admiten los planes documentados; cualquier otro valor se ignora. */
  const validPlan =
    plan === "profesional" || plan === "observatorio" ? plan : undefined;

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <Container className="py-16 sm:py-20">
        <SolicitudAltaForm plan={validPlan} />
      </Container>
    </>
  );
}
