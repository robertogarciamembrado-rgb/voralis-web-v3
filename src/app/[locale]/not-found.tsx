import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";

/**
 * Página 404 localizada. Next.js la renderiza cuando `notFound()` se
 * llama dentro de una ruta bajo `[locale]`. La URL que se muestra al
 * visitante es la que escribió, pero el contenido del 404 respeta el
 * locale activo.
 */
export default async function NotFound({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  if (!resolvedParams) return null;
  const { locale } = resolvedParams;
  setRequestLocale(locale);
  const t = await getTranslations("NotFound");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
      <p className="text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] text-accent">
        {t("code")}
      </p>
      <h1 className="mt-3 text-balance text-title font-bold tracking-[-0.04em] text-fg">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-md text-pretty text-[0.9375rem] leading-relaxed text-muted">
        {t("body")}
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-[1.375rem] py-[0.9375rem] text-[0.9375rem] font-bold text-white shadow-brand transition-colors duration-300 hover:bg-accent-hover"
        >
          {t("actions.goHome")} →
        </Link>
        <Link
          href="/contacto"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-raised px-[1.375rem] py-[0.9375rem] text-[0.9375rem] font-bold text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          {t("actions.contact")}
        </Link>
      </div>
    </div>
  );
}
