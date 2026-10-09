import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { IntelligenceDashboard } from "@/components/hero/IntelligenceDashboard";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { sampleExportDate } from "@/content/home";
import { Link } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Demo" });
  return { title: t("title") };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="mt-12">
      <h2 className="text-xl font-bold tracking-[-0.03em] text-fg">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Pending({ message }: { message: string }) {
  return (
    <div className="grid min-h-40 place-items-center rounded-card border border-dashed border-line bg-sunken px-6 text-center text-sm font-semibold text-muted">
      {message}
    </div>
  );
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  if (!resolvedParams) return null;
  const { locale } = resolvedParams;
  setRequestLocale(locale);
  const t = await getTranslations("Demo");
  const tActions = await getTranslations("Actions");

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")}>
        {/* Etiqueta fija: toda la demo es una edición de ejemplo. */}
        <p className="mt-6 inline-flex rounded-full border border-signal/30 bg-signal/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-signal-deep">
          {t("label", { date: sampleExportDate })}
        </p>
      </PageHeader>

      <Container className="py-12 sm:py-16">
        <Block title={t("blocks.radar")}>
          <div className="max-w-3xl">
            <IntelligenceDashboard />
          </div>
        </Block>
        <Block title={t("blocks.news")}>
          <Pending message={t("pending")} />
        </Block>
        <Block title={t("blocks.thumbnails")}>
          <Pending message={t("pending")} />
        </Block>
        <Block title={t("blocks.video")}>
          <Pending message={t("pending")} />
        </Block>

        <p className="mt-12 max-w-[46rem] text-sm leading-relaxed text-muted">{t("aiNote")}</p>

        <p className="mt-10 text-lg font-semibold text-fg">
          {t("closing")}{" "}
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
