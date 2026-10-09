import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

const LEGAL_SLUGS = [
  "aviso-legal",
  "privacidad",
  "condiciones",
  "uso-de-ia",
  "cookies",
] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  const title = await safeT(t, `titles.${slug}`);
  return { title: title ?? slug };
}

async function safeT(
  t: Awaited<ReturnType<typeof getTranslations>>,
  key: string,
): Promise<string | undefined> {
  try {
    return t.has?.(key) ? t(key) : undefined;
  } catch {
    return undefined;
  }
}

/** Páginas legales con texto provisional hasta que Diana cierre los textos con eDefense. */
export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolvedParams = await params;
  if (!resolvedParams) return null;
  const { locale, slug } = resolvedParams;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");
  const titles = (await t.raw("titles")) as Record<string, string>;
  const title = titles[slug];
  if (!title) notFound();

  return (
    <>
      <PageHeader title={title} />
      <Container className="py-16 sm:py-20">
        <p className="max-w-[41rem] text-[0.9375rem] leading-relaxed text-muted">
          {t("placeholder")}
        </p>
      </Container>
    </>
  );
}
