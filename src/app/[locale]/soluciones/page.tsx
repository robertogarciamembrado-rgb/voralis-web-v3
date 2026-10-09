import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

type SolutionItem = {
  slug: string;
  name: string;
  headline: string;
  watches: string;
  value: string;
  hiring?: string;
  plan: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Solutions" });
  return { title: t("title") };
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  if (!resolvedParams) return null;
  const { locale } = resolvedParams;
  setRequestLocale(locale);
  const t = await getTranslations("Solutions");
  const items = (await t.raw("items")) as SolutionItem[];
  const l = {
    watches: t("labels.watches"),
    value: t("labels.value"),
    hiring: t("labels.hiring"),
    plan: t("labels.plan"),
  };

  return (
    <>
      <PageHeader title={t("title")} />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-5">
          {items.map((s) => (
            <article
              key={s.slug}
              id={s.slug}
              className="card-surface scroll-mt-28 p-7 sm:p-9"
            >
              <h2 className="text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] text-accent">
                {s.name}
              </h2>
              <p className="mt-3 max-w-[40rem] text-pretty text-2xl font-bold tracking-[-0.04em] text-fg">
                {s.headline}
              </p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6 text-[0.9375rem] leading-relaxed text-muted">
                <li>
                  <strong className="font-bold text-fg">{l.watches}:</strong> {s.watches}
                </li>
                <li>
                  <strong className="font-bold text-fg">{l.value}:</strong> {s.value}
                </li>
                {s.hiring ? (
                  <li>
                    <strong className="font-bold text-fg">{l.hiring}:</strong> {s.hiring}
                  </li>
                ) : null}
                <li>
                  <strong className="font-bold text-fg">{l.plan}:</strong> {s.plan}
                </li>
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
