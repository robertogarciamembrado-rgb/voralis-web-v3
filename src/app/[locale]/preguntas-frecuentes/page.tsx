import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FAQ" });
  return { title: t("title") };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  if (!resolvedParams) return null;
  const { locale } = resolvedParams;
  setRequestLocale(locale);
  const t = await getTranslations("FAQ");
  const items = (await t.raw("items")) as Array<{ q: string; a: string }>;

  return (
    <>
      <PageHeader title={t("title")} />
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl divide-y divide-line rounded-card border border-line bg-raised">
          {items.map((item) => (
            <details key={item.q} className="group px-6 py-5">
              <summary className="cursor-pointer list-none text-base font-bold text-fg marker:hidden">
                {item.q}
              </summary>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </>
  );
}
