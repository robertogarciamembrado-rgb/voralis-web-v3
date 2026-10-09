import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CatalogCards } from "@/components/sections/CatalogCards";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Link } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Catalog" });
  return { title: t("title") };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  if (!resolvedParams) return null;
  const { locale } = resolvedParams;
  setRequestLocale(locale);
  const t = await getTranslations("Catalog");
  const tActions = await getTranslations("Actions");

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <Container className="py-16 sm:py-20">
        <CatalogCards />
        <p className="mt-12 text-lg font-semibold text-fg">
          {t("footer")}{" "}
          <Link
            href="/solicitar-alta"
            className="text-accent hover:text-accent-hover"
          >
            {tActions("requestOnboarding")}
          </Link>
        </p>
      </Container>
    </>
  );
}
